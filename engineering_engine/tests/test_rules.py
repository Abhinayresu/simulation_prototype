"""
Automated unit tests for EngineerMind Deterministic Rules Engine.
"""
import pytest
from engineering_engine.rules import (
    EngineeringRulesEngine,
    RuleSeverity,
    RuleDomain,
    RuleDefinition
)

@pytest.fixture
def rules_engine():
    return EngineeringRulesEngine()

def test_missing_required_inputs(rules_engine):
    # Empty context: should report missing required inputs on universally applicable rules
    summary = rules_engine.evaluate({})
    assert summary.workflow_eligible is False
    assert len(summary.blocking_issues) > 0
    # RULE-INPUT-001 requires velocity and characteristic_length
    missing_input_rule = next((r for r in summary.blocking_issues if r.rule_id == "RULE-INPUT-001"), None)
    assert missing_input_rule is not None
    assert "Missing required parameter" in missing_input_rule.message

def test_incompressible_mach_limit_blocking(rules_engine):
    context = {
        "solver_type": "incompressible",
        "mach_number": 0.55,  # Exceeds 0.3
        "velocity": 180.0,
        "characteristic_length": 1.2
    }
    summary = rules_engine.evaluate(context)
    assert summary.workflow_eligible is False
    blocking = [r for r in summary.blocking_issues if r.rule_id == "RULE-AERO-001"]
    assert len(blocking) == 1
    assert blocking[0].severity == RuleSeverity.BLOCKING
    assert "Exceeds incompressible threshold" in blocking[0].message
    assert "Anderson" in blocking[0].evidence_reference

def test_incompressible_mach_limit_passed(rules_engine):
    context = {
        "solver_type": "incompressible",
        "mach_number": 0.15,  # <= 0.3
        "velocity": 50.0,
        "characteristic_length": 1.0
    }
    summary = rules_engine.evaluate(context)
    passed = [r for r in summary.info if r.rule_id == "RULE-AERO-001"]
    assert len(passed) == 1
    assert passed[0].passed is True

def test_y_plus_wall_resolved(rules_engine):
    # Low-Re resolved setup requires y+ <= 1.0
    context_fail = {
        "near_wall_treatment": "low_reynolds_resolved",
        "target_y_plus": 3.5,
        "velocity": 30.0,
        "characteristic_length": 1.0
    }
    summary_fail = rules_engine.evaluate(context_fail)
    err = [r for r in summary_fail.errors if r.rule_id == "RULE-MESH-001"]
    assert len(err) == 1
    assert err[0].passed is False

    context_pass = {
        "near_wall_treatment": "low_reynolds_resolved",
        "target_y_plus": 0.8,
        "velocity": 30.0,
        "characteristic_length": 1.0
    }
    summary_pass = rules_engine.evaluate(context_pass)
    ok = [r for r in summary_pass.info if r.rule_id == "RULE-MESH-001"]
    assert len(ok) == 1
    assert ok[0].passed is True

def test_mesh_non_orthogonality(rules_engine):
    context = {
        "mesh_present": True,
        "max_non_orthogonality": 78.5,  # > 70 deg
        "velocity": 25.0,
        "characteristic_length": 1.0
    }
    summary = rules_engine.evaluate(context)
    blocking = [r for r in summary.blocking_issues if r.rule_id == "RULE-MESH-003"]
    assert len(blocking) == 1
    assert "Exceeds 70° limit" in blocking[0].message

def test_custom_rule_registration(rules_engine):
    custom_rule = RuleDefinition(
        rule_id="RULE-CUSTOM-099",
        rule_name="Custom Aspect Ratio Check",
        description="Limits aspect ratio to 10 for structured quad cells.",
        domain=RuleDomain.MESHING,
        applicable_conditions={"mesh_type": "structured"},
        required_inputs=["max_aspect_ratio"],
        severity=RuleSeverity.WARNING,
        source_reference="Internal Aerodynamics Guidelines v2",
        recommended_action="Refine streamwise spacing."
    )
    rules_engine.register_rule(custom_rule)
    assert rules_engine.get_rule("RULE-CUSTOM-099") is not None

    # Context without 'mesh_type': structured should skip this rule
    summary = rules_engine.evaluate({"max_aspect_ratio": 20.0})
    assert not any(r.rule_id == "RULE-CUSTOM-099" for r in summary.all_results)
