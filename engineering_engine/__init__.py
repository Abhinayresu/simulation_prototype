"""
EngineerMind AI Engineering Computation Engine.
Deterministic, validated engineering mechanics, aerodynamics, geometry, and CFD analysis library.
"""

from engineering_engine.fluid_mechanics import (
    calculate_reynolds_number,
    calculate_mach_number,
    calculate_dynamic_pressure,
    calculate_sutherland_viscosity,
)
from engineering_engine.aerodynamics import (
    calculate_lift_coefficient,
    calculate_drag_coefficient,
    calculate_pressure_coefficient,
    estimate_first_cell_height_y_plus,
)
from engineering_engine.geometry import analyze_triangular_mesh
from engineering_engine.mesh import parse_check_mesh_log
from engineering_engine.convergence import parse_openfoam_residuals, evaluate_convergence
from engineering_engine.gci import calculate_gci_three_grids
from engineering_engine.validation import evaluate_validation_metrics

__all__ = [
    "calculate_reynolds_number",
    "calculate_mach_number",
    "calculate_dynamic_pressure",
    "calculate_sutherland_viscosity",
    "calculate_lift_coefficient",
    "calculate_drag_coefficient",
    "calculate_pressure_coefficient",
    "estimate_first_cell_height_y_plus",
    "analyze_triangular_mesh",
    "parse_check_mesh_log",
    "parse_openfoam_residuals",
    "evaluate_convergence",
    "calculate_gci_three_grids",
    "evaluate_validation_metrics",
]
