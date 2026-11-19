"""
EngineerMind Deterministic Engineering Rules Engine.
Evaluates engineering setups, model applicability, physics bounds, and decision completeness.
Traceable, versioned, strictly deterministic without LLM overrides.
"""
from enum import Enum
from typing import Any, Callable, Dict, List, Optional
from datetime import datetime, timezone
import uuid
from pydantic import BaseModel, Field

class RuleSeverity(str, Enum):
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    BLOCKING = "BLOCKING"

class RuleDomain(str, Enum):
    PROBLEM_DEFINITION = "PROBLEM_DEFINITION"
    FLUID_MECHANICS = "FLUID_MECHANICS"
    AERODYNAMICS = "AERODYNAMICS"
    MESHING = "MESHING"
    SOLVER_SELECTION = "SOLVER_SELECTION"
    CONVERGENCE = "CONVERGENCE"
    VALIDATION = "VALIDATION"

class RuleDefinition(BaseModel):
    """
    Standard schema for a deterministic engineering rule.
    Thresholds and equations must have traceable sources and applicability conditions.
    """
    rule_id: str
    rule_name: str
    description: str
    domain: RuleDomain
    applicable_conditions: Dict[str, Any] = Field(
        default_factory=dict,
        description="Conditions under which this rule applies (e.g. {'flow_type': 'external'})"
    )
    required_inputs: List[str]
    severity: RuleSeverity
    source_reference: str
    source_version: str = "1.0.0"
    assumptions: List[str] = Field(default_factory=list)
    recommended_action: str
    rule_version: str = "1.0.0"

class EvaluatedRuleResult(BaseModel):
    """
    Output record of an individual evaluated rule.
    """
    rule_id: str
    rule_name: str
    domain: RuleDomain
    passed: bool
    severity: RuleSeverity
    message: str
    evidence_reference: str
    recommended_action: Optional[str] = None
    evaluated_inputs: Dict[str, Any] = Field(default_factory=dict)
    assumptions: List[str] = Field(default_factory=list)

class RuleEvaluationSummary(BaseModel):
    """
    Aggregated result of rule engine evaluation for a problem or configuration state.
    """
    evaluation_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    total_rules_evaluated: int
    passed_rules_count: int
    failed_rules_count: int
    workflow_eligible: bool
    blocking_issues: List[EvaluatedRuleResult]
    errors: List[EvaluatedRuleResult]
    warnings: List[EvaluatedRuleResult]
    info: List[EvaluatedRuleResult]
    all_results: List[EvaluatedRuleResult]
    required_engineer_actions: List[str]
