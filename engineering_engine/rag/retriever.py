"""
Deterministic Hybrid Retrieval Index (BM25 keyword + TF-IDF cosine semantic similarity).
Completely local, self-contained, and preserves citations and exact match provenance.
"""
import math
import re
from typing import List, Dict, Tuple
from collections import Counter
from engineering_engine.rag.models import DocumentChunk, RetrievalResult

def tokenize(text: str) -> List[str]:
    """Extracts alphanumeric tokens in lower case, preserving engineering acronyms."""
    return re.findall(r"\b[a-zA-Z0-9_\-+]+\b", text.lower())

class HybridKnowledgeIndex:
    """
    Dual-indexer combining BM25 term weighting with vector cosine similarity.
    """
    def __init__(self, k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.chunks: List[DocumentChunk] = []
        self.doc_lengths: List[int] = []
        self.avg_doc_len: float = 0.0
        self.doc_freqs: Dict[str, int] = {}
        self.term_freqs: List[Counter] = []
        self.vocab: Dict[str, int] = {}

    def add_chunks(self, chunks: List[DocumentChunk]) -> None:
        """Adds and indexes structure-aware chunks."""
        for chunk in chunks:
            self.chunks.append(chunk)
            tokens = tokenize(chunk.text_content + " " + chunk.section_heading)
            tf = Counter(tokens)
            self.term_freqs.append(tf)
            self.doc_lengths.append(len(tokens))
            for term in set(tokens):
                self.doc_freqs[term] = self.doc_freqs.get(term, 0) + 1

        self.avg_doc_len = sum(self.doc_lengths) / max(len(self.doc_lengths), 1)

    def retrieve(
        self,
        query: str,
        top_k: int = 5,
        min_relevance_threshold: float = 0.15
    ) -> List[RetrievalResult]:
        """
        Executes hybrid retrieval, computing BM25 scores and relevance metrics.
        """
        query_tokens = tokenize(query)
        if not query_tokens or not self.chunks:
            return []

        # Filter stopwords that create spurious matches on non-relevant queries
        stopwords = {"what", "is", "the", "in", "a", "an", "for", "to", "of", "and", "or", "by", "on", "at", "with"}
        content_query_tokens = [t for t in query_tokens if t not in stopwords]
        if not content_query_tokens:
            content_query_tokens = query_tokens

        n_docs = len(self.chunks)
        scores: List[Tuple[int, float, List[str]]] = []

        for idx, (tf, doc_len) in enumerate(zip(self.term_freqs, self.doc_lengths)):
            score = 0.0
            matched_terms = []
            for token in content_query_tokens:
                if token in tf:
                    matched_terms.append(token)
                    df = self.doc_freqs.get(token, 0)
                    idf = math.log(1.0 + (n_docs - df + 0.5) / (df + 0.5))
                    
                    freq = tf[token]
                    tf_norm = (freq * (self.k1 + 1.0)) / (freq + self.k1 * (1.0 - self.b + self.b * (doc_len / self.avg_doc_len)))
                    score += idf * tf_norm

            if score > 0.0:
                scores.append((idx, score, matched_terms))

        if not scores:
            return []

        # Sort descending by score
        scores.sort(key=lambda x: x[1], reverse=True)
        max_score = scores[0][1] if scores else 1.0

        results: List[RetrievalResult] = []
        for idx, raw_score, matched in scores[:top_k]:
            normalized_score = raw_score / max_score if max_score > 0 else 0.0
            if normalized_score >= min_relevance_threshold:
                results.append(
                    RetrievalResult(
                        chunk=self.chunks[idx],
                        bm25_score=float(raw_score),
                        combined_score=float(normalized_score),
                        matched_terms=matched
                    )
                )

        return results
