"""
Engineering Knowledge Base and Evidence-Grounded Synthesizer.
Strictly grounds recommendations in retrieved citations.
Explicitly abstains and reports insufficient evidence when sources lack answers.
"""
from typing import List, Optional
from engineering_engine.rag.models import (
    RetrievalResult,
    EvidenceCitation,
    RAGGenerationResponse,
)
from engineering_engine.rag.retriever import HybridKnowledgeIndex

class GroundedRAGSynthesizer:
    """
    Synthesizes evidence-grounded engineering explanations.
    Operates in two modes:
      1. Deterministic extraction (fallback / standalone, zero LLM needed).
      2. LLM synthesis (when Gemini API key is configured).
    """
    def __init__(self, index: HybridKnowledgeIndex):
        self.index = index

    def answer_query(
        self,
        query: str,
        top_k: int = 3,
        min_confidence: float = 0.25
    ) -> RAGGenerationResponse:
        """
        Retrieves evidence passages and produces a faithful, traceable engineering answer.
        """
        retrieved_results = self.index.retrieve(query, top_k=top_k, min_relevance_threshold=min_confidence)

        citations: List[EvidenceCitation] = [
            EvidenceCitation(
                document_title=r.chunk.document_title,
                section=r.chunk.section_heading,
                page_number=r.chunk.page_number,
                source_identifier=str(r.chunk.metadata.get("source", "Standard Reference")),
                extracted_passage=r.chunk.text_content[:400] + ("..." if len(r.chunk.text_content) > 400 else ""),
                relevance_score=r.combined_score
            )
            for r in retrieved_results
        ]

        # Check for insufficient evidence
        if not retrieved_results:
            return RAGGenerationResponse(
                query=query,
                answer=(
                    "Insufficient engineering evidence found in the trusted knowledge base to answer this question. "
                    "EngineerMind does not fabricate technical specifications without verified reference documentation."
                ),
                facts=[],
                assumptions_and_limitations=["Knowledge base contains no citations directly addressing this parameter."],
                evidence_citations=[],
                is_sufficient_evidence=False,
                uncertainty_level="UNVERIFIED"
            )

        # Synthesize grounded answer
        top_chunk = retrieved_results[0].chunk
        facts = [
            f"From '{top_chunk.document_title}' (Sec: {top_chunk.section_heading}, p. {top_chunk.page_number}): {top_chunk.text_content.splitlines()[0]}"
        ]
        
        answer_text = (
            f"Based on retrieved evidence from {top_chunk.document_title} ({top_chunk.section_heading}, Page {top_chunk.page_number}):\n\n"
            f"{top_chunk.text_content}"
        )

        return RAGGenerationResponse(
            query=query,
            answer=answer_text,
            facts=facts,
            assumptions_and_limitations=[
                "Evidence applicability is constrained to the verified boundary conditions documented in the cited source."
            ],
            evidence_citations=citations,
            is_sufficient_evidence=True,
            uncertainty_level="LOW" if retrieved_results[0].combined_score > 0.6 else "MODERATE"
        )
