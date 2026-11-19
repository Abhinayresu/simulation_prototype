"""
Automated unit tests for EngineerMind AI Orchestration Layer.
Tests:
- Parameter extraction accuracy and unit conversion
- Missing parameter detection and clarification questions
- Tool-calling restrictions (preventing arbitrary execution)
- Deterministic math execution without LLM math fabrication
- Rule gating and blocking reason propagation
- RAG evidence retrieval and attachment to recommendations
"""
import pytest
from engineering_engine.orchestration import (
    EngineeringOrchestrator,
    ProjectContext,
    RestrictedToolRegistry,
)
from engineering_engine.rules import EngineeringRulesEngine
from engineering_engine.rag import (
    DocumentMetadata,
    ingest_text_document,
    HybridKnowledgeIndex,
    GroundedRAGSynthesizer,
)
from engineering_engine.exceptions import EngineeringEngineError
import os

@pytest.fixture
def orchestrator():
    rules_engine = EngineeringRulesEngine()
    metadata = DocumentMetadata(
        title="NASA Aerodynamics Best Practices Handbook",
        source_identifier="NASA-SP-2016-6105"
    )
    doc_path = os.path.join(os.path.dirname(__file__), "..", "rag", "knowledge_base", "aerodynamics_standard.md")
    chunks = ingest_text_document(doc_path, metadata)
    index = HybridKnowledgeIndex()
    index.add_chunks(chunks)
    rag_synth = GroundedRAGSynthesizer(index)
    return EngineeringOrchestrator(rules_engine, rag_synth)

def test_missing_parameter_detection(orchestrator):
    context = ProjectContext(objective="NACA 0012 airfoil simulation")
    resp = orchestrator.process_request("I want to run a simulation for a wing", context)
    
    assert resp.workflow_advance_permitted is False
    assert len(resp.clarification_questions) >= 2
    assert any("velocity" in q.lower() for q in resp.clarification_questions)
    assert any("chord" in q.lower() or "length" in q.lower() for q in resp.clarification_questions)

def test_parameter_extraction_and_deterministic_calculation(orchestrator):
    context = ProjectContext(objective="NACA 2412 wing aerodynamic analysis")
    user_msg = "Please analyze my wing at velocity 50 m/s with a chord of 1.2 m at temperature 288 K"
    resp = orchestrator.process_request(user_msg, context)
    
    assert resp.workflow_advance_permitted is True
    # Re = 1.225 * 50 * 1.2 / 1.7894e-5 = 4,107,522
    assert "reynolds_number" in resp.project_context.calculated_outputs
    assert resp.project_context.calculated_outputs["reynolds_number"] == pytest.approx(4107522.0, rel=1e-3)
    # Ma = 50 / sqrt(1.4 * 287.05 * 288) = 0.147
    assert resp.project_context.calculated_outputs["mach_number"] == pytest.approx(0.147, rel=1e-2)
    assert "verified" in resp.natural_language_summary.lower()

def test_blocking_rule_high_mach_detection(orchestrator):
    context = ProjectContext(objective="Transonic wing study")
    # 200 m/s at 288 K -> Mach ~ 0.588 > 0.3 for incompressible solver
    user_msg = "Run incompressible simulation at velocity 200 m/s with chord 1.0 m"
    resp = orchestrator.process_request(user_msg, context)
    
    assert resp.workflow_advance_permitted is False
    assert len(resp.blocking_reasons) > 0
    assert any("RULE-AERO-001" in reason for reason in resp.blocking_reasons)
    
    # Recommendation to switch to compressible solver
    assert len(resp.recommendations) > 0
    rec = resp.recommendations[0]
    assert "compressible" in rec.recommendation.lower()
    assert len(rec.evidence) > 0
    assert "NASA-SP-2016-6105" in rec.evidence[0].source_identifier

def test_restricted_tool_registry_security():
    registry = RestrictedToolRegistry()
    # Attempting to call an arbitrary or dangerous function must be blocked
    with pytest.raises(EngineeringEngineError) as exc_info:
        registry.execute_tool("os_system", {"command": "rm -rf /"})
    assert "Unauthorized or unknown tool" in str(exc_info.value)
