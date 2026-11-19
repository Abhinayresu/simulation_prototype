"""
Deterministic geometry inspection and statistics.
Processes vertices, faces, bounding boxes, surface area, and checks for degenerate geometry.
"""
import uuid
import numpy as np
from typing import List, Tuple, Dict, Any, Optional
from engineering_engine.exceptions import GeometryAnalysisError
from engineering_engine.result_models import MultiValueCalculationResult

def analyze_triangular_mesh(
    vertices: np.ndarray,
    faces: np.ndarray
) -> MultiValueCalculationResult:
    """
    Computes deterministic geometric properties from 3D surface mesh arrays.
    
    Inputs:
        - vertices: (N, 3) float array of 3D coordinates
        - faces: (M, 3) int array of triangular vertex indices
    """
    if len(vertices) < 3:
        raise GeometryAnalysisError("Mesh must contain at least 3 vertices.")
    if len(faces) < 1:
        raise GeometryAnalysisError("Mesh must contain at least 1 triangle face.")

    v = np.asarray(vertices, dtype=np.float64)
    f = np.asarray(faces, dtype=np.int64)

    # 1. Bounding box
    min_bound = v.min(axis=0)
    max_bound = v.max(axis=0)
    dimensions = max_bound - min_bound  # [dx, dy, dz]

    # Check for degenerate bounding box (zero dimension)
    warnings: List[str] = []
    if np.any(dimensions < 1e-9):
        warnings.append(f"Degenerate geometry: bounding box has near-zero thickness along axis {np.where(dimensions < 1e-9)[0]}.")

    # 2. Face vectors and surface areas
    p0 = v[f[:, 0]]
    p1 = v[f[:, 1]]
    p2 = v[f[:, 2]]

    v01 = p1 - p0
    v02 = p2 - p0
    cross_prod = np.cross(v01, v02)
    face_areas = 0.5 * np.linalg.norm(cross_prod, axis=1)

    total_surface_area = float(np.sum(face_areas))
    zero_area_faces = int(np.sum(face_areas < 1e-12))
    if zero_area_faces > 0:
        warnings.append(f"Degenerate faces detected: {zero_area_faces} faces have near-zero area (< 1e-12).")

    # 3. Check for closed/watertight volume via divergence theorem (signed volume of tetrahedra to origin)
    # Vol = 1/6 * sum(dot(p0, cross(p1, p2)))
    signed_volume = float(np.sum(np.einsum('ij,ij->i', p0, np.cross(p1, p2))) / 6.0)

    return MultiValueCalculationResult(
        calculation_id=str(uuid.uuid4()),
        calculation_name="Mesh Geometry Statistics",
        formula="Bounding Box = max(V) - min(V); Area = sum(0.5 * ||(p1-p0) x (p2-p0)||); Volume = (1/6)*sum(p0 . (p1 x p2))",
        inputs={"num_vertices": int(len(vertices)), "num_faces": int(len(faces))},
        input_units={"vertices": "m", "faces": "indices"},
        results={
            "bounding_box_min": min_bound.tolist(),
            "bounding_box_max": max_bound.tolist(),
            "dimensions_dx_dy_dz": dimensions.tolist(),
            "total_surface_area": total_surface_area,
            "signed_volume": abs(signed_volume),
            "zero_area_faces_count": zero_area_faces,
            "min_face_area": float(np.min(face_areas)),
            "max_face_area": float(np.max(face_areas)),
            "is_watertight_candidate": (signed_volume > 1e-9 and zero_area_faces == 0)
        },
        output_units={
            "bounding_box": "m",
            "total_surface_area": "m^2",
            "signed_volume": "m^3"
        },
        assumptions=["Oriented triangular surface mesh"],
        applicability="Deterministic calculation of surface bounding dimensions and topological validity for CFD.",
        warnings=warnings
    )
