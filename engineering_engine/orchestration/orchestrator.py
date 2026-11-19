"""
EngineerMind AI Orchestration Layer.
Coordinates structured parameter extraction, deterministic calculations, RAG evidence retrieval,
engineering rules evaluation, and explanation generation without allowing LLM math fabrication.
"""
import re
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone

from engineering_engine.orchestration.models import (
    ProjectContext,
    EngineeringRecommendation,
    OrchestrationResponse,
)
from engineering_engine.orchestration.tools import RestrictedToolRegistry
from engineering_engine.rules import EngineeringRulesEngine
from engineering_engine.rag import GroundedRAGSynthesizer
from engineering_engine.exceptions import EngineeringEngineError

class EngineeringOrchestrator:
    """
    Coordinates AI interactions with the verified deterministic engineering backend.
    """
    def __init__(
        self,
        rules_engine: EngineeringRulesEngine,
        rag_synthesizer: GroundedRAGSynthesizer,
        tool_registry: Optional[RestrictedToolRegistry] = None
    ):
        self.rules_engine = rules_engine
        self.rag_synthesizer = rag_synthesizer
        self.tool_registry = tool_registry or RestrictedToolRegistry()

    def process_request(
        self,
        user_message: str,
        context: ProjectContext
    ) -> OrchestrationResponse:
        """
        Executes a deterministic pipeline:
          1. Extract structured parameters (velocity, chord, temperature, solver).
          2. Identify missing required engineering information.
          3. Execute deterministic fluid & aerodynamic computations.
          4. Retrieve citations from the knowledge base for identified regimes.
          5. Evaluate engineering rules and determine workflow gating.
          6. Generate evidence-backed recommendations and explanations.
        """
        # 1. Parameter extraction (regex / deterministic parser)
        extracted = self._extract_parameters(user_message)
        
        # Categorize: Only add to confirmed_inputs if explicitly verified, else unconfirmed_assumptions
        for k, v in extracted.items():
            if k not in context.confirmed_inputs:
                context.unconfirmed_assumptions[k] = v

        # Required parameters for aerodynamics study
        required_keys = ["velocity", "characteristic_length"]
        missing = [k for k in required_keys if k not in context.confirmed_inputs and k not in context.unconfirmed_assumptions]
        context.missing_inputs = missing

        clarification_questions: List[str] = []
        if "velocity" in missing:
            clarification_questions.append("What is the operating freestream velocity (or speed) of the simulation?")
        if "characteristic_length" in missing:
            clarification_questions.append("What is the reference characteristic length (e.g. airfoil chord length in meters)?")

        # 2. Deterministic calculations (Executed ONLY via restricted tools, never by LLM)
        active_params = {**context.unconfirmed_assumptions, **context.confirmed_inputs}
        recommendations: List[EngineeringRecommendation] = []
        blocking_reasons: List[str] = []

        if "velocity" in active_params and "characteristic_length" in active_params:
            try:
                # Reynolds number calculation
                re_res = self.tool_registry.execute_tool(
                    "calculate_reynolds_number",
                    {
                        "velocity": active_params["velocity"],
                        "characteristic_length": active_params["characteristic_length"],
                        "density": active_params.get("density", 1.225),
                        "dynamic_viscosity": active_params.get("dynamic_viscosity", 1.7894e-5)
                    }
                )
                context.calculated_outputs["reynolds_number"] = re_res.result
                active_params["reynolds_number"] = re_res.result

                # Mach number calculation
                t_k = active_params.get("temperature_kelvin", 288.15)
                ma_res = self.tool_registry.execute_tool(
                    "calculate_mach_number",
                    {"velocity": active_params["velocity"], "temperature_kelvin": t_k}
                )
                context.calculated_outputs["mach_number"] = ma_res.result
                active_params["mach_number"] = ma_res.result

                # Dynamic pressure
                q_res = self.tool_registry.execute_tool(
                    "calculate_dynamic_pressure",
                    {"density": active_params.get("density", 1.225), "velocity": active_params["velocity"]}
                )
                context.calculated_outputs["dynamic_pressure_Pa"] = q_res.result

            except EngineeringEngineError as ee:
                blocking_reasons.append(f"Calculation failed: {str(ee)}")

        # 3. RAG Knowledge Retrieval for evidence
        retrieved_evidence = []
        if "mach_number" in active_params:
            rag_res = self.rag_synthesizer.answer_query("incompressible solver Mach limit simpleFoam")
            if rag_res.is_sufficient_evidence:
                retrieved_evidence.extend(rag_res.evidence_citations)

        context.retrieved_evidence = retrieved_evidence

        # 4. Rules Evaluation
        # Default solver to incompressible if not specified
        if "solver_type" not in active_params:
            active_params["solver_type"] = "incompressible"
        
        rule_summary = self.rules_engine.evaluate(active_params)
        context.evaluated_rules = rule_summary

        for block in rule_summary.blocking_issues:
            blocking_reasons.append(f"[{block.rule_id}] {block.message}")

        # 5. Build structured recommendations
        if "mach_number" in context.calculated_outputs:
            ma = context.calculated_outputs["mach_number"]
            if ma > 0.3 and active_params.get("solver_type") == "incompressible":
                recommendations.append(
                    EngineeringRecommendation(
                        recommendation="Switch to compressible CFD solver (e.g. rhoSimpleFoam).",
                        reason=f"Calculated Mach number is {ma:.3f}, which exceeds the 0.3 incompressible threshold.",
                        engineering_principle="Fluid density changes exceed 5% at Ma > 0.3; constant-density equations underpredict pressure drag.",
                        evidence=retrieved_evidence,
                        assumptions=["Standard atmospheric temperature T = 288.15 K"],
                        confidence="HIGH",
                        limitations=["Assumes ideal gas equation of state."],
                        required_engineer_action="Approve changing solver from simpleFoam to rhoSimpleFoam."
                    )
                )

        workflow_permitted = (len(missing) == 0 and len(blocking_reasons) == 0)

        # 6. Natural language synthesis summary
        if missing:
            summary = f"Identified {len(missing)} missing parameter(s) required to formulate the simulation plan."
        elif blocking_reasons:
            summary = f"Workflow blocked by {len(blocking_reasons)} engineering rule violation(s). Review required."
        else:
            re_val = context.calculated_outputs.get("reynolds_number", 0)
            ma_val = context.calculated_outputs.get("mach_number", 0)
            summary = (
                f"Engineering setup verified. Calculated Re = {re_val:.2e}, Mach = {ma_val:.3f}. "
                f"All {rule_summary.passed_rules_count} evaluated rules passed. Case is eligible for simulation planning."
            )

        context.last_updated = datetime.now(timezone.utc).isoformat()

        return OrchestrationResponse(
            natural_language_summary=summary,
            clarification_questions=clarification_questions,
            recommendations=recommendations,
            project_context=context,
            workflow_advance_permitted=workflow_permitted,
            blocking_reasons=blocking_reasons
        )

    def _extract_parameters(self, text: str) -> Dict[str, Any]:
        """
        Deterministic extraction of numerical values and units from text.
        """
        params: Dict[str, Any] = {}
        
        # Velocity matches: e.g. "50 m/s", "120 km/h", "velocity is 45"
        vel_match = re.search(r"(?:velocity|speed)(?:\s*(?:is|=|:)?\s*)?([0-9.]+)\s*(m/s|km/h)?", text, re.IGNORECASE)
        if vel_match:
            val = float(vel_match.group(1))
            unit = vel_match.group(2) or "m/s"
            params["velocity"] = val if unit == "m/s" else val / 3.6

        # Chord / characteristic length: e.g. "chord of 1.2 m", "chord of 1.2m", "length = 0.5 m", "chord: 1m"
        chord_match = re.search(r"(?:chord|length|span)(?:\s*(?:of|is|=|:)?\s*)?([0-9.]+)\s*(m|mm|cm)?", text, re.IGNORECASE)
        if chord_match:
            val = float(chord_match.group(1))
            unit = chord_match.group(2) or "m"
            if unit == "mm":
                val *= 1e-3
            elif unit == "cm":
                val *= 1e-2
            params["characteristic_length"] = val

        # Temperature: e.g. "300 K", "25 C"
        temp_match = re.search(r"(?:temperature|temp)(?:\s*(?:is|=|:)?\s*)?([0-9.]+)\s*(K|C)?", text, re.IGNORECASE)
        if temp_match:
            val = float(temp_match.group(1))
            unit = temp_match.group(2) or "K"
            params["temperature_kelvin"] = val if unit == "K" else val + 273.15

        # Solver type
        if "incompressible" in text.lower():
            params["solver_type"] = "incompressible"
        elif "compressible" in text.lower():
            params["solver_type"] = "compressible"

        return params
