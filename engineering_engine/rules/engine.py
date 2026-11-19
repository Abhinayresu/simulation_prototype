"""
Deterministic Engineering Rules Evaluation Engine.
Evaluates input configurations against standard or custom rules.
Aggregates passed, failed, warning, error, and blocking issues.
"""
from typing import Dict, Any, List, Optional
from engineering_engine.rules.models import (
    RuleDefinition,
    RuleSeverity,
    EvaluatedRuleResult,
    RuleEvaluationSummary,
)
from engineering_engine.rules.definitions import STANDARD_RULES

class EngineeringRulesEngine:
    """
    Deterministic rules evaluator.
    Maintains registered rules, evaluates active context, detects missing inputs, and prevents blocked workflows.
    """
    def __init__(self):
        self._rules: Dict[str, RuleDefinition] = dict(STANDARD_RULES)

    def register_rule(self, rule: RuleDefinition) -> None:
        """Registers a new or custom engineering rule."""
        self._rules[rule.rule_id] = rule

    def get_rule(self, rule_id: str) -> Optional[RuleDefinition]:
        return self._rules.get(rule_id)

    def list_rules(self) -> List[RuleDefinition]:
        return list(self._rules.values())

    def evaluate(self, context: Dict[str, Any]) -> RuleEvaluationSummary:
        """
        Evaluates all applicable rules against the provided engineering context dictionary.
        
        Context can include:
            - solver_type: 'incompressible' | 'compressible'
            - mach_number: float
            - target_y_plus: float
            - near_wall_treatment: 'low_reynolds_resolved' | 'standard_wall_functions'
            - max_non_orthogonality: float
            - model_frontal_area: float
            - domain_cross_sectional_area: float
            - velocity: float
            - characteristic_length: float
            - reynolds_number: float
            - turbulence_model: str
            - max_final_residual: float
        """
        evaluated_results: List[EvaluatedRuleResult] = []

        for rule in self._rules.values():
            # 1. Check applicable conditions
            conditions_met = True
            for cond_k, cond_v in rule.applicable_conditions.items():
                if context.get(cond_k) != cond_v:
                    conditions_met = False
                    break
            if not conditions_met:
                continue

            # 2. Check required inputs
            missing_inputs = [inp for inp in rule.required_inputs if inp not in context or context[inp] is None]
            if missing_inputs:
                evaluated_results.append(
                    EvaluatedRuleResult(
                        rule_id=rule.rule_id,
                        rule_name=rule.rule_name,
                        domain=rule.domain,
                        passed=False,
                        severity=RuleSeverity.BLOCKING if rule.severity == RuleSeverity.BLOCKING else RuleSeverity.WARNING,
                        message=f"Missing required parameter(s): {', '.join(missing_inputs)}",
                        evidence_reference=rule.source_reference,
                        recommended_action=f"Provide values for: {', '.join(missing_inputs)}",
                        assumptions=rule.assumptions
                    )
                )
                continue

            # 3. Deterministic evaluation logic per rule
            passed, msg, evaluated_dict = self._evaluate_rule_logic(rule.rule_id, context)
            
            evaluated_results.append(
                EvaluatedRuleResult(
                    rule_id=rule.rule_id,
                    rule_name=rule.rule_name,
                    domain=rule.domain,
                    passed=passed,
                    severity=rule.severity,
                    message=msg,
                    evidence_reference=rule.source_reference,
                    recommended_action=rule.recommended_action if not passed else None,
                    evaluated_inputs=evaluated_dict,
                    assumptions=rule.assumptions
                )
            )

        # 4. Aggregation and workflow eligibility
        blocking_issues = [r for r in evaluated_results if not r.passed and r.severity == RuleSeverity.BLOCKING]
        errors = [r for r in evaluated_results if not r.passed and r.severity == RuleSeverity.ERROR]
        warnings = [r for r in evaluated_results if not r.passed and r.severity == RuleSeverity.WARNING]
        info = [r for r in evaluated_results if r.passed or r.severity == RuleSeverity.INFO]

        passed_count = sum(1 for r in evaluated_results if r.passed)
        failed_count = sum(1 for r in evaluated_results if not r.passed)
        
        workflow_eligible = (len(blocking_issues) == 0 and len(errors) == 0)

        required_actions: List[str] = []
        for issue in blocking_issues + errors + warnings:
            if issue.recommended_action and issue.recommended_action not in required_actions:
                required_actions.append(issue.recommended_action)

        return RuleEvaluationSummary(
            total_rules_evaluated=len(evaluated_results),
            passed_rules_count=passed_count,
            failed_rules_count=failed_count,
            workflow_eligible=workflow_eligible,
            blocking_issues=blocking_issues,
            errors=errors,
            warnings=warnings,
            info=info,
            all_results=evaluated_results,
            required_engineer_actions=required_actions
        )

    def _evaluate_rule_logic(self, rule_id: str, context: Dict[str, Any]) -> (bool, str, Dict[str, Any]):
        """Evaluates concrete logic for each registered rule ID."""
        
        if rule_id == "RULE-AERO-001":
            ma = float(context["mach_number"])
            passed = ma <= 0.3
            msg = f"Mach number is {ma:.3f}. " + ("Below incompressible limit (0.3)." if passed else "Exceeds incompressible threshold (0.3). Compressibility effects present.")
            return passed, msg, {"mach_number": ma}

        elif rule_id == "RULE-MESH-001":
            yp = float(context["target_y_plus"])
            passed = yp <= 1.0
            msg = f"Target y+ is {yp:.2f}. " + ("Within wall-resolved sublayer criteria (<= 1.0)." if passed else "Exceeds wall-resolved threshold of 1.0. Near-wall velocity gradient will not be resolved.")
            return passed, msg, {"target_y_plus": yp}

        elif rule_id == "RULE-MESH-002":
            yp = float(context["target_y_plus"])
            passed = (30.0 <= yp <= 300.0)
            msg = f"Target y+ is {yp:.2f}. " + ("Within standard log-law buffer zone (30 - 300)." if passed else "Outside standard log-law region (30 - 300). Accuracy may degrade in buffer layer (y+ < 30) or wake (y+ > 300).")
            return passed, msg, {"target_y_plus": yp}

        elif rule_id == "RULE-AERO-002":
            a_front = float(context["model_frontal_area"])
            a_domain = float(context["domain_cross_sectional_area"])
            ratio = a_front / a_domain if a_domain > 0 else 1.0
            passed = ratio <= 0.05
            msg = f"Domain blockage ratio is {ratio * 100.0:.2f}%. " + ("Within recommended < 5% boundary." if passed else "Exceeds 5% threshold. False solid wall constriction may accelerate airflow around model.")
            return passed, msg, {"model_frontal_area": a_front, "domain_cross_sectional_area": a_domain, "blockage_ratio": ratio}

        elif rule_id == "RULE-MESH-003":
            ortho = float(context["max_non_orthogonality"])
            passed = ortho <= 70.0
            msg = f"Max non-orthogonality is {ortho:.1f}°. " + ("Acceptable mesh quality." if passed else "Exceeds 70° limit. Severe non-orthogonality may lead to solution divergence or unphysical diffusion.")
            return passed, msg, {"max_non_orthogonality": ortho}

        elif rule_id == "RULE-INPUT-001":
            u = float(context["velocity"])
            l = float(context["characteristic_length"])
            passed = (u > 0.0 and l > 0.0)
            msg = "Velocity and characteristic length are non-zero positive numbers." if passed else "Velocity or characteristic length is non-positive."
            return passed, msg, {"velocity": u, "characteristic_length": l}

        elif rule_id == "RULE-SOLV-001":
            re = float(context["reynolds_number"])
            turb = str(context["turbulence_model"]).lower()
            if re > 5e5 and turb in ("laminar", "none", "inviscid"):
                passed = False
                msg = f"Re = {re:.2e} indicates turbulent flow, but '{turb}' model was selected."
            else:
                passed = True
                msg = f"Turbulence model '{turb}' is physically appropriate for Re = {re:.2e}."
            return passed, msg, {"reynolds_number": re, "turbulence_model": turb}

        elif rule_id == "RULE-CONV-001":
            res = float(context["max_final_residual"])
            passed = res <= 1e-4
            msg = f"Max final residual is {res:.2e}. " + ("Below convergence target 1e-4." if passed else "Above convergence target 1e-4. Simulation has not reached acceptable iterative precision.")
            return passed, msg, {"max_final_residual": res}

        return True, "Rule evaluated without special logic.", {}
