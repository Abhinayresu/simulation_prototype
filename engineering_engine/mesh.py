"""
Deterministic mesh quality analysis and OpenFOAM checkMesh log parsers.
"""
import re
import uuid
from typing import Dict, Any, List
from engineering_engine.result_models import MultiValueCalculationResult
from engineering_engine.exceptions import ValidationError

def parse_check_mesh_log(log_text: str) -> MultiValueCalculationResult:
    """
    Parses OpenFOAM checkMesh output deterministically to extract:
    - Number of cells, faces, points
    - Maximum non-orthogonality and average non-orthogonality
    - Maximum skewness
    - Maximum aspect ratio
    """
    if not log_text or not isinstance(log_text, str):
        raise ValidationError("checkMesh log text must be a non-empty string.")

    cells_match = re.search(r"cells:\s*([0-9]+)", log_text)
    faces_match = re.search(r"faces:\s*([0-9]+)", log_text)
    points_match = re.search(r"points:\s*([0-9]+)", log_text)

    # Max non-orthogonality
    non_ortho_match = re.search(r"Mesh non-orthogonality Max:\s*([0-9.]+)\s+average:\s*([0-9.]+)", log_text)
    # Skewness
    skew_match = re.search(r"Max skewness =?\s*([0-9.]+)", log_text)
    # Aspect ratio
    aspect_match = re.search(r"Max aspect ratio =?\s*([0-9.]+)", log_text)

    cells = int(cells_match.group(1)) if cells_match else 0
    faces = int(faces_match.group(1)) if faces_match else 0
    points = int(points_match.group(1)) if points_match else 0

    max_non_ortho = float(non_ortho_match.group(1)) if non_ortho_match else None
    avg_non_ortho = float(non_ortho_match.group(2)) if non_ortho_match else None
    max_skewness = float(skew_match.group(1)) if skew_match else None
    max_aspect = float(aspect_match.group(1)) if aspect_match else None

    warnings: List[str] = []
    status = "PASSED"

    if max_non_ortho is not None:
        if max_non_ortho > 70.0:
            warnings.append(f"High non-orthogonality: {max_non_ortho}° (recommend non-orthogonal corrector loops >= 2).")
            status = "CAUTION"
        if max_non_ortho > 85.0:
            warnings.append(f"Severe non-orthogonality: {max_non_ortho}° > 85° (risk of divergence).")
            status = "FAILED"

    if max_skewness is not None and max_skewness > 4.0:
        warnings.append(f"High skewness: {max_skewness} > 4.0.")
        status = "CAUTION"

    return MultiValueCalculationResult(
        calculation_id=str(uuid.uuid4()),
        calculation_name="Mesh Quality Analysis",
        formula="OpenFOAM checkMesh topological quality metrics",
        inputs={"log_length_chars": len(log_text)},
        input_units={"log_length_chars": "count"},
        results={
            "cells": cells,
            "faces": faces,
            "points": points,
            "max_non_orthogonality_deg": max_non_ortho,
            "avg_non_orthogonality_deg": avg_non_ortho,
            "max_skewness": max_skewness,
            "max_aspect_ratio": max_aspect,
            "overall_quality_assessment": status
        },
        output_units={
            "cells": "count",
            "max_non_orthogonality_deg": "deg",
            "max_skewness": "dimensionless",
            "max_aspect_ratio": "dimensionless"
        },
        assumptions=["Standard OpenFOAM checkMesh stdout formatting"],
        applicability="Quality assurance screening prior to Navier-Stokes solver execution.",
        warnings=warnings,
        validation_status=status
    )
