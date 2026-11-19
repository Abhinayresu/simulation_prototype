"""
Comprehensive automated test suite for EngineerMind Engineering Computation Engine.
Tests normal, edge-case, boundary, and regression scenarios.
"""
import pytest
import math
import numpy as np
from engineering_engine.constants import (
    RHO_STANDARD_SL,
    T_STANDARD_SL,
    GAMMA_AIR,
    R_SPECIFIC_AIR,
)
from engineering_engine.exceptions import (
    ValidationError,
    UnitConversionError,
    GCIComputationError,
)
from engineering_engine.units import convert_to_si
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

# --- UNIT CONVERSION TESTS ---
def test_unit_conversions():
    assert convert_to_si(100.0, "mm", "length") == pytest.approx(0.1)
    assert convert_to_si(36.0, "km/h", "velocity") == pytest.approx(10.0)
    assert convert_to_si(1.0, "bar", "pressure") == pytest.approx(100000.0)
    assert convert_to_si(25.0, "c", "temperature") == pytest.approx(298.15)
    
    with pytest.raises(UnitConversionError):
        convert_to_si(10.0, "lightyears", "length")

# --- FLUID MECHANICS TESTS ---
def test_reynolds_number_standard_air():
    # Air at standard sea level: rho=1.225, U=50 m/s, L=1.0 m, mu=1.7894e-5
    # Re = 1.225 * 50 * 1.0 / 1.7894e-5 = 3,422,935.06
    res = calculate_reynolds_number(velocity=50.0, characteristic_length=1.0, density=1.225, dynamic_viscosity=1.7894e-5)
    assert res.result == pytest.approx(3422935.06, rel=1e-3)
    assert res.output_unit == "dimensionless"
    assert "Turbulent" in res.warnings[0]

def test_reynolds_number_invalid_inputs():
    with pytest.raises(ValidationError):
        calculate_reynolds_number(velocity=-10.0, characteristic_length=1.0, density=1.225, dynamic_viscosity=1.7894e-5)
    with pytest.raises(ValidationError):
        calculate_reynolds_number(velocity=10.0, characteristic_length=0.0, density=1.225, dynamic_viscosity=1.7894e-5)

def test_mach_number_ideal_gas():
    # Air at 288.15 K: a = sqrt(1.4 * 287.05287 * 288.15) = 340.294 m/s
    # U = 102.088 m/s -> Ma = 0.3
    res = calculate_mach_number(velocity=102.088, temperature_kelvin=288.15)
    assert res.result == pytest.approx(0.3, rel=1e-2)

def test_dynamic_pressure():
    # q = 0.5 * 1.225 * 10^2 = 61.25 Pa
    res = calculate_dynamic_pressure(density=1.225, velocity=10.0)
    assert res.result == pytest.approx(61.25)
    assert res.output_unit == "Pa"

def test_sutherland_viscosity():
    # At T = 288.15 K, Sutherland should yield ~ 1.789e-5 Pa*s
    res = calculate_sutherland_viscosity(288.15)
    assert res.result == pytest.approx(1.7894e-5, rel=1e-3)

# --- AERODYNAMICS TESTS ---
def test_lift_and_drag_coefficients():
    # S = 2.0 m^2, q = 500 Pa
    # L = 1000 N -> C_L = 1000 / (500 * 2.0) = 1.0
    # D = 50 N -> C_D = 50 / (500 * 2.0) = 0.05
    cl_res = calculate_lift_coefficient(lift_force=1000.0, reference_area=2.0, dynamic_pressure=500.0)
    assert cl_res.result == pytest.approx(1.0)
    
    cd_res = calculate_drag_coefficient(drag_force=50.0, reference_area=2.0, dynamic_pressure=500.0)
    assert cd_res.result == pytest.approx(0.05)

def test_first_cell_height():
    # y+ = 1.0, U = 50 m/s, chord = 1.0 m
    res = estimate_first_cell_height_y_plus(target_y_plus=1.0, velocity=50.0, chord_length=1.0)
    assert 1e-6 < res.result < 1e-4
    assert res.output_unit == "m"

# --- GEOMETRY TESTS ---
def test_mesh_geometry_analysis():
    # Simple rectangular box surface: 8 vertices, 12 triangles
    vertices = np.array([
        [0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0],
        [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]
    ], dtype=np.float64)
    
    faces = np.array([
        [0, 1, 2], [0, 2, 3], # Bottom
        [4, 6, 5], [4, 7, 6], # Top
        [0, 5, 1], [0, 4, 5], # Front
        [1, 6, 2], [1, 5, 6], # Right
        [2, 7, 3], [2, 6, 7], # Back
        [3, 4, 0], [3, 7, 4]  # Left
    ], dtype=np.int64)

    stats = analyze_triangular_mesh(vertices, faces)
    assert stats.results["total_surface_area"] == pytest.approx(6.0)
    assert stats.results["dimensions_dx_dy_dz"] == [1.0, 1.0, 1.0]
    assert stats.results["zero_area_faces_count"] == 0

# --- CFD LOG AND RESIDUAL TESTS ---
def test_openfoam_residual_parsing():
    sample_log = """
    Time = 1
    Solving for Ux, Initial residual = 0.8523, Final residual = 0.0432
    Solving for Uy, Initial residual = 0.7612, Final residual = 0.0321
    Solving for p, Initial residual = 0.9981, Final residual = 0.0812
    Time = 2
    Solving for Ux, Initial residual = 0.00005, Final residual = 0.000005
    Solving for Uy, Initial residual = 0.00004, Final residual = 0.000004
    Solving for p, Initial residual = 0.00008, Final residual = 0.000008
    """
    res = parse_openfoam_residuals(sample_log)
    assert len(res["Ux"]) == 2
    assert res["Ux"][0] == 0.8523
    assert res["Ux"][1] == 0.00005

    eval_res = evaluate_convergence(res, target_threshold=1e-4)
    assert eval_res.results["overall_converged"] is True

def test_check_mesh_parsing():
    sample_checkmesh = """
    Mesh stats
        points:           125000
        faces:            365000
        internal faces:   350000
        cells:            120000
    Mesh non-orthogonality Max: 42.5 average: 8.2
    Max skewness = 1.85
    Max aspect ratio = 6.2
    """
    result = parse_check_mesh_log(sample_checkmesh)
    assert result.results["cells"] == 120000
    assert result.results["max_non_orthogonality_deg"] == 42.5
    assert result.results["overall_quality_assessment"] == "PASSED"

# --- GCI (GRID CONVERGENCE INDEX) TESTS ---
def test_gci_three_grids_asme():
    # Test case from standard literature: r21 = 1.3, r32 = 1.3
    # Solutions monotonic convergence: phi3 = 6.0, phi2 = 6.08, phi1 = 6.12
    res = calculate_gci_three_grids(
        r21=1.3,
        r32=1.3,
        phi1=6.12,
        phi2=6.08,
        phi3=6.00,
        formal_order=2.0
    )
    assert res.results["convergence_mode"] == "Monotonic convergence"
    assert res.results["gci_fine_percent"] > 0.0
    assert res.results["extrapolated_value"] > 6.12

# --- VALIDATION BENCHMARK TESTS ---
def test_validation_metrics():
    cfd = [1.02, 1.48, 1.95, 2.42]
    exp = [1.00, 1.50, 2.00, 2.40]
    val = evaluate_validation_metrics(cfd, exp, "NACA 0012 experimental polar")
    assert val.results["mean_relative_error_pct"] < 3.0
    assert val.validation_status == "PASSED"
