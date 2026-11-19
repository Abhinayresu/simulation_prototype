"""
State Machine models and SQLite/SQLAlchemy schemas for the Guided CFD Workflow.
Guarantees deterministic stage transitions, persistent audit history, and decision provenance.
"""
from enum import Enum
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
import uuid
from pydantic import BaseModel, Field

class WorkflowStage(str, Enum):
    PROBLEM_DEFINITION = "PROBLEM_DEFINITION"
    ENGINEERING_ASSESSMENT = "ENGINEERING_ASSESSMENT"
    SIMULATION_PLANNING = "SIMULATION_PLANNING"
    ENGINEER_REVIEW = "ENGINEER_REVIEW"
    SIMULATION_READINESS = "SIMULATION_READINESS"
    EXECUTION_OR_INGESTION = "EXECUTION_OR_INGESTION"
    RESULT_ANALYSIS = "RESULT_ANALYSIS"
    CREDIBILITY_ASSESSMENT = "CREDIBILITY_ASSESSMENT"
    DECISION_RECORD = "DECISION_RECORD"

# Permitted sequential and authorized backward state transitions
ALLOWED_TRANSITIONS: Dict[WorkflowStage, List[WorkflowStage]] = {
    WorkflowStage.PROBLEM_DEFINITION: [WorkflowStage.ENGINEERING_ASSESSMENT],
    WorkflowStage.ENGINEERING_ASSESSMENT: [WorkflowStage.PROBLEM_DEFINITION, WorkflowStage.SIMULATION_PLANNING],
    WorkflowStage.SIMULATION_PLANNING: [WorkflowStage.ENGINEERING_ASSESSMENT, WorkflowStage.ENGINEER_REVIEW],
    WorkflowStage.ENGINEER_REVIEW: [WorkflowStage.SIMULATION_PLANNING, WorkflowStage.SIMULATION_READINESS],
    WorkflowStage.SIMULATION_READINESS: [WorkflowStage.ENGINEER_REVIEW, WorkflowStage.EXECUTION_OR_INGESTION],
    WorkflowStage.EXECUTION_OR_INGESTION: [WorkflowStage.SIMULATION_READINESS, WorkflowStage.RESULT_ANALYSIS],
    WorkflowStage.RESULT_ANALYSIS: [WorkflowStage.EXECUTION_OR_INGESTION, WorkflowStage.CREDIBILITY_ASSESSMENT],
    WorkflowStage.CREDIBILITY_ASSESSMENT: [WorkflowStage.RESULT_ANALYSIS, WorkflowStage.DECISION_RECORD],
    WorkflowStage.DECISION_RECORD: [WorkflowStage.CREDIBILITY_ASSESSMENT],
}

class EngineerDecisionRecord(BaseModel):
    decision_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    decision_type: str = Field(..., description="ACCEPT, REJECT, EDIT, OVERRIDE, RECORD_ASSUMPTION, DEFER")
    item_id: str = Field(..., description="ID of recommendation, rule, or parameter")
    original_value: Any = None
    decided_value: Any = None
    engineer_justification: str = Field(..., description="Technical rationale for the decision")
    recorded_by: str = Field(default="engineer@company.com")
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class SimulationPlan(BaseModel):
    solver_choice: str
    turbulence_model: str
    target_y_plus: float
    estimated_first_cell_m: float
    boundary_conditions: Dict[str, str]
    mesh_strategy: str
    convergence_criteria: Dict[str, float]
    verification_method: str = "Grid Convergence Index (ASME V&V 20)"
    unresolved_decisions: List[str] = Field(default_factory=list)

class CredibilityAssessmentRecord(BaseModel):
    execution_success: bool = False
    iterative_convergence_status: str = "PENDING"
    numerical_verification_gci: Optional[Dict[str, Any]] = None
    physical_validation_status: str = "PENDING"
    uncertainty_level: str = "MODERATE"
    overall_credibility_summary: str = ""

class WorkflowState(BaseModel):
    case_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = "NACA 2412 External Aerodynamics"
    current_stage: WorkflowStage = WorkflowStage.PROBLEM_DEFINITION
    inputs: Dict[str, Any] = Field(default_factory=dict)
    calculated_physics: Dict[str, Any] = Field(default_factory=dict)
    evaluated_rules: Optional[Dict[str, Any]] = None
    simulation_plan: Optional[SimulationPlan] = None
    decisions: List[EngineerDecisionRecord] = Field(default_factory=list)
    simulation_artifacts: Dict[str, Any] = Field(default_factory=dict)
    results_summary: Dict[str, Any] = Field(default_factory=dict)
    credibility_record: Optional[CredibilityAssessmentRecord] = None
    blocking_gates: List[str] = Field(default_factory=list)
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
