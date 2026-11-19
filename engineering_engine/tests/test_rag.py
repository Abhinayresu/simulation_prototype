"""
Evaluation dataset and automated test suite for EngineerMind Engineering Knowledge & RAG system.
Tests ingestion, structure-aware chunking, hybrid retrieval, citation correctness, and abstention on adversarial questions.
"""
import os
import pytest
from engineering_engine.rag import (
    DocumentMetadata,
    ingest_text_document,
    HybridKnowledgeIndex,
    GroundedRAGSynthesizer,
    DocumentIngestionError
)

@pytest.fixture
def populated_synthesizer():
    metadata = DocumentMetadata(
        title="NASA Aerodynamics Best Practices Handbook",
        source_identifier="NASA-SP-2016-6105",
        governance_level="TRUSTED_ENGINEERING_CORE"
    )
    doc_path = os.path.join(os.path.dirname(__file__), "..", "rag", "knowledge_base", "aerodynamics_standard.md")
    chunks = ingest_text_document(doc_path, metadata)
    index = HybridKnowledgeIndex()
    index.add_chunks(chunks)
    return GroundedRAGSynthesizer(index)

def test_document_ingestion_and_chunking():
    metadata = DocumentMetadata(
        title="NASA Aerodynamics Best Practices Handbook",
        source_identifier="NASA-SP-2016-6105"
    )
    doc_path = os.path.join(os.path.dirname(__file__), "..", "rag", "knowledge_base", "aerodynamics_standard.md")
    chunks = ingest_text_document(doc_path, metadata)
    assert len(chunks) == 3
    # Verify section headings and page tracking
    assert chunks[0].section_heading == "Incompressible Navier-Stokes Solvers and Mach Boundaries"
    assert chunks[0].page_number == 14
    assert chunks[1].section_heading == "Boundary Layer Meshing and Near-Wall y+ Criteria"
    assert chunks[1].page_number == 48

def test_retrieval_relevance_and_citation(populated_synthesizer):
    query = "What is the maximum Mach number limit for an incompressible solver like simpleFoam?"
    resp = populated_synthesizer.answer_query(query)
    
    assert resp.is_sufficient_evidence is True
    assert len(resp.evidence_citations) > 0
    top_citation = resp.evidence_citations[0]
    assert top_citation.page_number == 14
    assert "NASA-SP-2016-6105" in top_citation.source_identifier
    assert "0.3" in resp.answer
    assert resp.uncertainty_level in ("LOW", "MODERATE")

def test_retrieval_y_plus_resolution(populated_synthesizer):
    query = "What target y+ value should be used for wall-resolved k-omega SST simulations?"
    resp = populated_synthesizer.answer_query(query)
    
    assert resp.is_sufficient_evidence is True
    assert "y+ <= 1.0" in resp.answer or "1.0" in resp.answer
    top_citation = resp.evidence_citations[0]
    assert top_citation.page_number == 48

def test_adversarial_abstention_on_missing_evidence(populated_synthesizer):
    # Query about a topic not in the knowledge base
    query = "What is the nuclear reactor core temperature limit in a pressurized water submarine?"
    resp = populated_synthesizer.answer_query(query)
    
    # Must abstain and report insufficient evidence, never fabricate answers
    assert resp.is_sufficient_evidence is False
    assert resp.uncertainty_level == "UNVERIFIED"
    assert "Insufficient engineering evidence" in resp.answer
    assert len(resp.evidence_citations) == 0

def test_missing_file_ingestion_error():
    metadata = DocumentMetadata(title="Missing", source_identifier="none")
    with pytest.raises(DocumentIngestionError):
        ingest_text_document("non_existent_file.pdf", metadata)
