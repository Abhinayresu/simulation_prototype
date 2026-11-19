"""
Comprehensive automated tests for Guided CFD Workflow state machine and decision records.
Tests:
- Case creation and SQLite persistence
- Valid sequential stage progression
- Prevention of illegal stage jumping
- Blocking condition evaluation at Stage 5 readiness
- Decision tracking and recovery after simulated session reset
- Result ingestion and credibility assessment
"""
import os
import pytest
from engineering_engine.workflow import (
    GuidedCFDWorkflowManager,
    WorkflowStorage,
    WorkflowStage,
    WorkflowTransitionError,
    EngineerDecisionRecord,
)

@pytest.fixture
def workflow_mgr(tmp_path):
    db_file = tmp_path / "test_workflows.db"
    storage = WorkflowStorage(str(db_file))
    return GuidedCFDWorkflowManager(storage)

def test_workflow_lifecycle_and_transitions(workflow_mgr):
    # Stage 1: Problem Definition
    state = workflow_mgr.create_case("NACA 2412 Wing Study", {"velocity": 45.0, "characteristic_length": 1.0})
    assert state.current_stage == WorkflowStage.PROBLEM_DEFINITION

    # Prevent illegal transition directly to Execution
    with pytest.raises(WorkflowTransitionError) as exc:
        workflow_mgr.transition_stage(state.case_id, WorkflowStage.EXECUTION_OR_INGESTION)
    assert "Illegal transition" in str(exc.value)

    # Valid transition: Stage 1 -> Stage 2
    state = workflow_mgr.transition_stage(state.case_id, WorkflowStage.ENGINEERING_ASSESSMENT)
    assert state.current_stage == WorkflowStage.ENGINEERING_ASSESSMENT

    # Stage 2: Assessment execution
    state = workflow_mgr.run_engineering_assessment(state.case_id)
    assert "reynolds_number" in state.calculated_physics
    assert state.calculated_physics["mach_number"] < 0.3

    # Valid transition: Stage 2 -> Stage 3
    state = workflow_mgr.transition_stage(state.case_id, WorkflowStage.SIMULATION_PLANNING)
    state = workflow_mgr.generate_simulation_plan(state.case_id)
    assert state.simulation_plan.solver_choice.startswith("simpleFoam")

    # Valid transition: Stage 3 -> Stage 4 (Review)
    state = workflow_mgr.transition_stage(state.case_id, WorkflowStage.ENGINEER_REVIEW)
    assert state.current_stage == WorkflowStage.ENGINEER_REVIEW

    # Attempt to transition to Stage 6 without engineer approval decision -> must be blocked
    state = workflow_mgr.transition_stage(state.case_id, WorkflowStage.SIMULATION_READINESS)
    with pytest.raises(WorkflowTransitionError) as exc:
        workflow_mgr.transition_stage(state.case_id, WorkflowStage.EXECUTION_OR_INGESTION)
    assert "Progression blocked" in str(exc.value)

    # Record engineer approval
    decision = EngineerDecisionRecord(
        decision_type="ACCEPT",
        item_id="plan_approval",
        engineer_justification="Verified y+ <= 1.0 prism layer and simpleFoam solver settings."
    )
    state = workflow_mgr.record_engineer_decision(state.case_id, decision)
    assert len(state.decisions) == 1

    # Now transition to Stage 6 succeeds
    state = workflow_mgr.transition_stage(state.case_id, WorkflowStage.EXECUTION_OR_INGESTION)
    assert state.current_stage == WorkflowStage.EXECUTION_OR_INGESTION

    # Ingest genuine results
    residuals = {"p": [0.8, 0.05, 0.00004], "Ux": [0.9, 0.02, 0.00002]}
    forces = {"lift_N": 980.5, "drag_N": 48.2}
    state = workflow_mgr.ingest_simulation_results(state.case_id, residuals, forces)
    assert "residuals_history" in state.simulation_artifacts

    # Transition to Stage 7 (Result Analysis) and Stage 8 (Credibility)
    state = workflow_mgr.transition_stage(state.case_id, WorkflowStage.RESULT_ANALYSIS)
    state = workflow_mgr.transition_stage(state.case_id, WorkflowStage.CREDIBILITY_ASSESSMENT)
    state = workflow_mgr.assess_simulation_credibility(state.case_id, {"benchmark": "wind_tunnel"})
    assert state.credibility_record.iterative_convergence_status == "PASSED"
    assert state.credibility_record.numerical_verification_gci["grid_independence_verified"] is True

    # Transition to Stage 9 (Decision Record)
    state = workflow_mgr.transition_stage(state.case_id, WorkflowStage.DECISION_RECORD)
    assert state.current_stage == WorkflowStage.DECISION_RECORD

def test_recovery_from_database_after_restart(tmp_path):
    db_file = tmp_path / "persistent_test.db"
    storage1 = WorkflowStorage(str(db_file))
    mgr1 = GuidedCFDWorkflowManager(storage1)
    
    # Create and advance case
    case = mgr1.create_case("Recovery Test", {"velocity": 60.0, "characteristic_length": 1.5})
    mgr1.transition_stage(case.case_id, WorkflowStage.ENGINEERING_ASSESSMENT)
    mgr1.run_engineering_assessment(case.case_id)

    # Simulate fresh manager instance / page refresh
    storage2 = WorkflowStorage(str(db_file))
    mgr2 = GuidedCFDWorkflowManager(storage2)
    recovered = storage2.get_state(case.case_id)

    assert recovered is not None
    assert recovered.title == "Recovery Test"
    assert recovered.current_stage == WorkflowStage.ENGINEERING_ASSESSMENT
    assert "reynolds_number" in recovered.calculated_physics
    assert recovered.inputs["velocity"] == 60.0
