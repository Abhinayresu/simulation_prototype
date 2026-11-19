"""
FastAPI router for EngineerMind Deterministic Engineering Computation Engine.
Provides clean, synchronous endpoints with strict validation, SI conversion, and provenance tracking.
Never calls an LLM to evaluate numerical physics formulas.
"""
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, APIRouter, HTTPException, Query, status
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

from engineering_engine.fluid_mechanics import (
    calculate_reynolds_number,
    calculate_mach_number,
    calculate_dynamic_pressure,
    calculate_sutherland_viscosity,
)
from engineering_engine.aerodynamics import (
    calculate_lift_coefficient,
    calculate_drag_coefficient,
    calculate_pressure_coefficient,
    estimate_first_cell_height_y_plus,
)
from engineering_engine.mesh import parse_check_mesh_log
from engineering_engine.convergence import parse_openfoam_residuals, evaluate_convergence
from engineering_engine.gci import calculate_gci_three_grids
from engineering_engine.validation import evaluate_validation_metrics
from engineering_engine.exceptions import EngineeringEngineError, ValidationError
from engineering_engine.rules import EngineeringRulesEngine, RuleEvaluationSummary
from engineering_engine.rag import (
    DocumentMetadata,
    ingest_text_document,
    HybridKnowledgeIndex,
    GroundedRAGSynthesizer,
    RAGGenerationResponse,
)
from engineering_engine.orchestration import (
    EngineeringOrchestrator,
    ProjectContext,
    OrchestrationResponse,
)
from engineering_engine.workflow import (
    GuidedCFDWorkflowManager,
    WorkflowStorage,
    WorkflowStage,
    WorkflowState,
    EngineerDecisionRecord,
    WorkflowTransitionError,
)
import os

rules_engine_instance = EngineeringRulesEngine()
workflow_manager_instance = GuidedCFDWorkflowManager()

# Initialize Knowledge Base RAG
kb_metadata = DocumentMetadata(
    title="NASA Aerodynamics Best Practices Handbook",
    source_identifier="NASA-SP-2016-6105",
    governance_level="TRUSTED_ENGINEERING_CORE"
)
kb_path = os.path.join(os.path.dirname(__file__), "rag", "knowledge_base", "aerodynamics_standard.md")
kb_index = HybridKnowledgeIndex()
if os.path.exists(kb_path):
    kb_chunks = ingest_text_document(kb_path, kb_metadata)
    kb_index.add_chunks(kb_chunks)

rag_synthesizer_instance = GroundedRAGSynthesizer(kb_index)
orchestrator_instance = EngineeringOrchestrator(rules_engine_instance, rag_synthesizer_instance)

app = FastAPI(
    title="EngineerMind AI - Engineering Computation API",
    description="Deterministic engineering computation engine for aerodynamics and CFD decision-support.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api/v1/compute", tags=["Engineering Computation"])

# --- Request Schemas ---

class ReynoldsRequest(BaseModel):
    velocity: float = Field(..., description="Flow speed")
    characteristic_length: float = Field(..., description="Reference length scale (e.g. chord)")
    density: Optional[float] = Field(None, description="Fluid density")
    dynamic_viscosity: Optional[float] = Field(None, description="Dynamic viscosity")
    kinematic_viscosity: Optional[float] = Field(None, description="Kinematic viscosity")
    velocity_unit: str = Field("m/s", description="SI or engineering unit for velocity")
    length_unit: str = Field("m", description="SI or engineering unit for length")
    density_unit: str = Field("kg/m^3", description="SI or engineering unit for density")
    viscosity_unit: str = Field("Pa*s", description="SI or engineering unit for dynamic viscosity")

class MachRequest(BaseModel):
    velocity: float = Field(..., description="Flow speed")
    temperature_kelvin: Optional[float] = Field(None, description="Static temperature in Kelvin")
    speed_of_sound: Optional[float] = Field(None, description="Speed of sound if known")
    gamma: float = Field(1.4, description="Specific heat ratio (default 1.4 for air)")
    velocity_unit: str = Field("m/s", description="Velocity unit")

class DynamicPressureRequest(BaseModel):
    density: float = Field(..., description="Fluid density")
    velocity: float = Field(..., description="Flow velocity")
    density_unit: str = Field("kg/m^3", description="Density unit")
    velocity_unit: str = Field("m/s", description="Velocity unit")

class FirstCellHeightRequest(BaseModel):
    target_y_plus: float = Field(..., description="Target dimensionless wall distance y+")
    velocity: float = Field(..., description="Freestream flow velocity (m/s)")
    chord_length: float = Field(..., description="Characteristic length / chord (m)")
    density: float = Field(1.225, description="Fluid density (kg/m^3)")
    dynamic_viscosity: float = Field(1.7894e-5, description="Dynamic viscosity (Pa*s)")

class ForceCoefficientRequest(BaseModel):
    force: float = Field(..., description="Lift or Drag force value")
    reference_area: float = Field(..., description="Reference area S")
    dynamic_pressure: Optional[float] = Field(None, description="Dynamic pressure q")
    density: Optional[float] = Field(None, description="Fluid density")
    velocity: Optional[float] = Field(None, description="Flow velocity")
    force_unit: str = Field("N", description="Unit of force")
    area_unit: str = Field("m^2", description="Unit of area")

class CheckMeshLogRequest(BaseModel):
    log_text: str = Field(..., description="Raw text output from OpenFOAM checkMesh utility")

class ResidualLogRequest(BaseModel):
    log_text: str = Field(..., description="Raw solver log containing residual outputs")
    target_threshold: float = Field(1e-4, description="Convergence target residual")

class GCIRequest(BaseModel):
    r21: float = Field(..., description="Grid refinement ratio fine-to-medium (> 1.0)")
    r32: float = Field(..., description="Grid refinement ratio medium-to-coarse (> 1.0)")
    phi1: float = Field(..., description="Solution value on fine grid (Grid 1)")
    phi2: float = Field(..., description="Solution value on medium grid (Grid 2)")
    phi3: float = Field(..., description="Solution value on coarse grid (Grid 3)")
    formal_order: float = Field(2.0, description="Formal spatial order of solver schemes")

class ValidationRequest(BaseModel):
    cfd_values: List[float] = Field(..., description="CFD simulation sample points")
    benchmark_values: List[float] = Field(..., description="Benchmark experimental sample points")
    benchmark_source: str = Field("Wind tunnel experiment", description="Citation / provenance")


# --- Endpoints ---

@api_router.post("/reynolds-number")
def api_reynolds_number(req: ReynoldsRequest):
    try:
        return calculate_reynolds_number(
            velocity=req.velocity,
            characteristic_length=req.characteristic_length,
            density=req.density,
            dynamic_viscosity=req.dynamic_viscosity,
            kinematic_viscosity=req.kinematic_viscosity,
            velocity_unit=req.velocity_unit,
            length_unit=req.length_unit,
            density_unit=req.density_unit,
            viscosity_unit=req.viscosity_unit
        )
    except EngineeringEngineError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/mach-number")
def api_mach_number(req: MachRequest):
    try:
        return calculate_mach_number(
            velocity=req.velocity,
            temperature_kelvin=req.temperature_kelvin,
            speed_of_sound=req.speed_of_sound,
            gamma=req.gamma,
            velocity_unit=req.velocity_unit
        )
    except EngineeringEngineError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/dynamic-pressure")
def api_dynamic_pressure(req: DynamicPressureRequest):
    try:
        return calculate_dynamic_pressure(
            density=req.density,
            velocity=req.velocity,
            density_unit=req.density_unit,
            velocity_unit=req.velocity_unit
        )
    except EngineeringEngineError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/first-cell-height")
def api_first_cell_height(req: FirstCellHeightRequest):
    try:
        return estimate_first_cell_height_y_plus(
            target_y_plus=req.target_y_plus,
            velocity=req.velocity,
            chord_length=req.chord_length,
            density=req.density,
            dynamic_viscosity=req.dynamic_viscosity
        )
    except EngineeringEngineError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/lift-coefficient")
def api_lift_coefficient(req: ForceCoefficientRequest):
    try:
        return calculate_lift_coefficient(
            lift_force=req.force,
            reference_area=req.reference_area,
            dynamic_pressure=req.dynamic_pressure,
            density=req.density,
            velocity=req.velocity,
            force_unit=req.force_unit,
            area_unit=req.area_unit
        )
    except EngineeringEngineError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/drag-coefficient")
def api_drag_coefficient(req: ForceCoefficientRequest):
    try:
        return calculate_drag_coefficient(
            drag_force=req.force,
            reference_area=req.reference_area,
            dynamic_pressure=req.dynamic_pressure,
            density=req.density,
            velocity=req.velocity,
            force_unit=req.force_unit,
            area_unit=req.area_unit
        )
    except EngineeringEngineError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/parse-checkmesh")
def api_parse_checkmesh(req: CheckMeshLogRequest):
    try:
        return parse_check_mesh_log(req.log_text)
    except EngineeringEngineError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/evaluate-residuals")
def api_evaluate_residuals(req: ResidualLogRequest):
    try:
        res = parse_openfoam_residuals(req.log_text)
        return evaluate_convergence(res, target_threshold=req.target_threshold)
    except EngineeringEngineError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/gci")
def api_gci(req: GCIRequest):
    try:
        return calculate_gci_three_grids(
            r21=req.r21,
            r32=req.r32,
            phi1=req.phi1,
            phi2=req.phi2,
            phi3=req.phi3,
            formal_order=req.formal_order
        )
    except EngineeringEngineError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/validation-metrics")
def api_validation_metrics(req: ValidationRequest):
    try:
        return evaluate_validation_metrics(
            cfd_values=req.cfd_values,
            benchmark_values=req.benchmark_values,
            benchmark_source=req.benchmark_source
        )
    except EngineeringEngineError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/evaluate-rules", response_model=RuleEvaluationSummary)
def api_evaluate_rules(context: Dict[str, Any]):
    """
    Evaluates engineering rules against input conditions deterministically.
    Returns passed rules, failed rules, blocking issues, citations, and required engineer actions.
    """
    try:
        return rules_engine_instance.evaluate(context)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.get("/rules")
def api_list_rules():
    """Returns metadata for all registered engineering rules with literature references."""
    return rules_engine_instance.list_rules()

class QueryKnowledgeRequest(BaseModel):
    query: str = Field(..., description="Engineering question regarding CFD setup or aerodynamics")
    top_k: int = Field(3, description="Number of supporting passages to retrieve")

@api_router.post("/query-knowledge", response_model=RAGGenerationResponse)
def api_query_knowledge(req: QueryKnowledgeRequest):
    """
    Retrieves evidence-backed engineering documentation and answers queries with citations.
    Abstains if evidence is insufficient.
    """
    return rag_synthesizer_instance.answer_query(req.query, top_k=req.top_k)

class OrchestrationRequest(BaseModel):
    message: str = Field(..., description="Natural language prompt from engineer")
    context: Optional[ProjectContext] = Field(None, description="Existing project context")

@api_router.post("/orchestrate", response_model=OrchestrationResponse)
def api_orchestrate(req: OrchestrationRequest):
    """
    Orchestration endpoint coordinating parameter extraction, calculations, rules gating, and RAG.
    """
    ctx = req.context or ProjectContext(objective="Aerodynamic simulation investigation")
    return orchestrator_instance.process_request(req.message, ctx)

# --- Guided Workflow Endpoints ---

class CreateCaseRequest(BaseModel):
    title: str = Field(..., description="Title of the aerodynamic CFD case")
    initial_inputs: Optional[Dict[str, Any]] = Field(None, description="Initial operating parameters")

class TransitionStageRequest(BaseModel):
    target_stage: WorkflowStage = Field(..., description="Target stage enum")

@api_router.post("/workflow/case", response_model=WorkflowState)
def api_create_workflow_case(req: CreateCaseRequest):
    return workflow_manager_instance.create_case(req.title, req.initial_inputs)

@api_router.get("/workflow/case/{case_id}", response_model=WorkflowState)
def api_get_workflow_state(case_id: str):
    state = workflow_manager_instance.storage.get_state(case_id)
    if not state:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Case '{case_id}' not found.")
    return state

@api_router.post("/workflow/case/{case_id}/transition", response_model=WorkflowState)
def api_transition_workflow_stage(case_id: str, req: TransitionStageRequest):
    try:
        return workflow_manager_instance.transition_stage(case_id, req.target_stage)
    except WorkflowTransitionError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/workflow/case/{case_id}/assess", response_model=WorkflowState)
def api_run_assessment(case_id: str):
    try:
        return workflow_manager_instance.run_engineering_assessment(case_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/workflow/case/{case_id}/plan", response_model=WorkflowState)
def api_generate_plan(case_id: str):
    try:
        return workflow_manager_instance.generate_simulation_plan(case_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@api_router.post("/workflow/case/{case_id}/decision", response_model=WorkflowState)
def api_record_decision(case_id: str, decision: EngineerDecisionRecord):
    try:
        return workflow_manager_instance.record_engineer_decision(case_id, decision)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

app.include_router(api_router)
