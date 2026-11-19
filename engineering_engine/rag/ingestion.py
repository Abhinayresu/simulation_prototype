"""
Deterministic document ingestion, parsing, and structure-aware chunking.
Supports text and PDF documents without silently discarding failed extractions.
"""
import os
import re
from typing import List, Optional
import pypdf
from engineering_engine.rag.models import DocumentMetadata, DocumentChunk

class DocumentIngestionError(Exception):
    """Raised when ingestion or text parsing of an engineering document fails."""
    pass

def ingest_text_document(
    file_path: str,
    metadata: DocumentMetadata
) -> List[DocumentChunk]:
    """
    Ingests a structured markdown or plain text file with heading-aware chunking.
    Preserves sections (e.g. '# Heading', '## Subheading'), equations, and conditions.
    """
    if not os.path.exists(file_path):
        raise DocumentIngestionError(f"Document file not found at: {file_path}")

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception as e:
        raise DocumentIngestionError(f"Failed to read file {file_path}: {str(e)}")

    if not content.strip():
        raise DocumentIngestionError(f"Document at {file_path} is empty.")

    # Split by markdown headings (#, ##, ###)
    lines = content.splitlines()
    chunks: List[DocumentChunk] = []
    
    current_section = "Introduction"
    current_lines: List[str] = []
    current_page = 1
    next_page = 1

    for line in lines:
        if line.startswith("[PAGE:") and line.endswith("]"):
            try:
                next_page = int(line.replace("[PAGE:", "").replace("]", "").strip())
            except ValueError:
                pass
            continue

        if re.match(r"^#{1,3}\s+", line):
            # Save previous chunk if text exists
            if current_lines:
                chunk_text = "\n".join(current_lines).strip()
                if chunk_text:
                    eqs = re.findall(r"\$\$(.*?)\$\$|\$([^$]+)\$", chunk_text)
                    flat_eqs = [e[0] or e[1] for e in eqs if e[0] or e[1]]
                    chunks.append(
                        DocumentChunk(
                            document_id=metadata.document_id,
                            document_title=metadata.title,
                            section_heading=current_section,
                            page_number=current_page,
                            text_content=chunk_text,
                            equations=flat_eqs,
                            metadata={"source": metadata.source_identifier}
                        )
                    )
                current_lines = []
            current_section = line.lstrip("#").strip()
            current_page = next_page
        else:
            current_lines.append(line)

    if current_lines:
        chunk_text = "\n".join(current_lines).strip()
        if chunk_text:
            eqs = re.findall(r"\$\$(.*?)\$\$|\$([^$]+)\$", chunk_text)
            flat_eqs = [e[0] or e[1] for e in eqs if e[0] or e[1]]
            chunks.append(
                DocumentChunk(
                    document_id=metadata.document_id,
                    document_title=metadata.title,
                    section_heading=current_section,
                    page_number=current_page,
                    text_content=chunk_text,
                    equations=flat_eqs,
                    metadata={"source": metadata.source_identifier}
                )
            )

    return chunks

def ingest_pdf_document(
    file_path: str,
    metadata: DocumentMetadata
) -> List[DocumentChunk]:
    """
    Ingests a PDF document using pypdf, extracting text per page and preserving page numbers.
    """
    if not os.path.exists(file_path):
        raise DocumentIngestionError(f"PDF file not found at: {file_path}")

    chunks: List[DocumentChunk] = []
    try:
        reader = pypdf.PdfReader(file_path)
        if len(reader.pages) == 0:
            raise DocumentIngestionError(f"PDF document at {file_path} contains 0 pages.")

        for page_idx, page in enumerate(reader.pages):
            page_num = page_idx + 1
            text = page.extract_text() or ""
            text = text.strip()
            if not text:
                continue

            # Detect headings (first non-empty line or capital title)
            lines = [l.strip() for l in text.splitlines() if l.strip()]
            heading = lines[0] if lines else f"Page {page_num}"

            chunks.append(
                DocumentChunk(
                    document_id=metadata.document_id,
                    document_title=metadata.title,
                    section_heading=heading,
                    page_number=page_num,
                    text_content=text,
                    metadata={"source": metadata.source_identifier, "page": page_num}
                )
            )
    except Exception as e:
        raise DocumentIngestionError(f"Failed to ingest PDF {file_path}: {str(e)}")

    if not chunks:
        raise DocumentIngestionError(f"No extractable text was found in PDF: {file_path}")

    return chunks
