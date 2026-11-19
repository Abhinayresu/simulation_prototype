"""
Data schemas for EngineerMind Engineering Knowledge and RAG System.
Preserves document identity, structure, page provenance, and retrieval metrics.
"""
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
import uuid
from pydantic import BaseModel, Field

class DocumentMetadata(BaseModel):
    """
    Metadata describing an engineering document or handbook.
    """
    document_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    author: Optional[str] = None
    version_or_edition: Optional[str] = None
    publication_year: Optional[int] = None
    source_type: str = "handbook"  # standard, paper, handbook, report, user_doc
    source_identifier: str  # ISBN, DOI, AGARD report number, or file path
    governance_level: str = "TRUSTED_ENGINEERING_CORE"  # TRUSTED_ENGINEERING_CORE, PEER_REVIEWED, EXPERIMENTAL, UNVERIFIED

class DocumentChunk(BaseModel):
    """
    Structure-aware chunk preserving section, page, equations, and applicability.
    """
    chunk_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    document_id: str
    document_title: str
    section_heading: str
    page_number: int
    text_content: str
    equations: List[str] = Field(default_factory=list)
    applicability_conditions: List[str] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)

class RetrievalResult(BaseModel):
    """
    Structured passage returned from hybrid retrieval with explicit relevance score.
    """
    chunk: DocumentChunk
    bm25_score: float = 0.0
    dense_score: float = 0.0
    combined_score: float = 0.0
    matched_terms: List[str] = Field(default_factory=list)

class EvidenceCitation(BaseModel):
    """
    Exact evidence citation attached to generated engineering recommendations.
    """
    document_title: str
    version_or_edition: Optional[str] = None
    section: str
    page_number: int
    source_identifier: str
    extracted_passage: str
    relevance_score: float

class RAGGenerationResponse(BaseModel):
    """
    Faithful engineering response generated strictly with evidence backing.
    """
    response_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    query: str
    answer: str
    facts: List[str] = Field(default_factory=list)
    assumptions_and_limitations: List[str] = Field(default_factory=list)
    evidence_citations: List[EvidenceCitation] = Field(default_factory=list)
    is_sufficient_evidence: bool = True
    uncertainty_level: str = "LOW"  # LOW, MODERATE, HIGH, UNVERIFIED
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
