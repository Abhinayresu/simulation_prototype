"""
Data schemas for the EngineerMind AI Orchestration Layer.
Preserves strict separation between confirmed inputs, unconfirmed AI assumptions,
deterministic calculations, retrieved evidence, and rule evaluations.
"""
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
import uuid
from pydantic import BaseModel, Field

from engineering_engine.result_models import CalculationResult, MultiValueCalculationResult
from engineering_engine.rules.models import RuleEvaluationSummary, EvaluatedRuleResult
from engineering_engine.rag.models import EvidenceCitation

class ProjectContext(BaseModel):
    """
    State container for an engineering session or simulation study.
    Strictly separates confirmed values from unverified AI assumptions.
    """
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    objective: str = Field(..., description="Engineering objective, e.g. 'NACA 2412 wing aerodynamic characterization'")
    confirmed_inputs: Dict[str, Any] = Field(default_factory=dict, description="Parameters explicitly verified by an engineer")
    unconfirmed_assumptions: Dict[str, Any] = Field(default_factory=dict, description="AI-extracted hypotheses pending confirmation")
    missing_inputs: List[str] = Field(default_factory=list, description="Parameters required but not yet provided")
    calculated_outputs: Dict[str, Any] = Field(default_factory=dict, description="Results from the deterministic engine")
    evaluated_rules: Optional[RuleEvaluationSummary] = None
    retrieved_evidence: List[EvidenceCitation] = Field(default_factory=list)
    recorded_decisions: List[Dict[str, Any]] = Field(default_factory=list)
    unresolved_issues: List[str] = Field(default_factory=list)
    last_updated: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class EngineeringRecommendation(BaseModel):
    """
    Structured, evidence-backed engineering recommendation.
    Never fabricated; always derived from verified calculations or cited standards.
    """
    recommendation: str
    reason: str
    engineering_principle: str
    evidence: List[EvidenceCitation] = Field(default_factory=list)
    assumptions: List[str] = Field(default_factory=list)
    confidence: str = "HIGH"  # HIGH, MODERATE, LOW, UNVERIFIED
    limitations: List[str] = Field(default_factory=list)
    required_engineer_action: Optional[str] = None

class OrchestrationResponse(BaseModel):
    """
    Unified response returned by the AI Orchestration Layer to the engineer or frontend.
    """
    response_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    natural_language_summary: str
    clarification_questions: List[str] = Field(default_factory=list)
    recommendations: List[EngineeringRecommendation] = Field(default_factory=list)
    project_context: ProjectContext
    workflow_advance_permitted: bool
    blocking_reasons: List[str] = Field(default_factory=list)
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
