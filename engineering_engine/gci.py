"""
Deterministic Grid Convergence Index (GCI) calculations.
Implements the Celik et al. / Roache ASME Standard for Numerical Uncertainty and Discretization Error Estimation.
ASME Journal of Fluids Engineering (Celik et al., 2008).
"""
import math
import uuid
from typing import Dict, Any, List
from engineering_engine.exceptions import GCIComputationError
from engineering_engine.result_models import MultiValueCalculationResult

def calculate_gci_three_grids(
    r21: float,
    r32: float,
    phi1: float,
    phi2: float,
    phi3: float,
    formal_order: float = 2.0,
    fs: float = 1.25
) -> MultiValueCalculationResult:
    """
    Computes apparent order of convergence and Grid Convergence Index (GCI) across 3 grid levels.
    
    Conventions:
        - Grid 1: Fine grid (representative spacing h1)
        - Grid 2: Medium grid (representative spacing h2 > h1)
        - Grid 3: Coarse grid (representative spacing h3 > h2)
        - r21 = h2 / h1 > 1.0 (refinement ratio fine-medium)
        - r32 = h3 / h2 > 1.0 (refinement ratio medium-coarse)
        - phi1, phi2, phi3: Numerical solution values (e.g., C_L, C_D, or pressure drop)
        - fs: Factor of safety (1.25 for 3 grids as per ASME V&V standard)
    """
    if r21 <= 1.0 or r32 <= 1.0:
        raise GCIComputationError(f"Grid refinement ratios must be strictly greater than 1.0. Got r21={r21}, r32={r32}")

    eps32 = phi3 - phi2
    eps21 = phi2 - phi1

    if abs(eps21) < 1e-15:
        raise GCIComputationError("Identical solutions between fine and medium grids. Convergence error cannot be calculated.")

    # Celik et al. (2008) ASME Standard:
    # R = eps21 / eps32
    # 0 < R < 1: Monotonic convergence (solution change decreases as grid is refined)
    # -1 < R < 0: Oscillatory convergence
    # |R| > 1: Divergence
    # Notice ratio for apparent order is eps32 / eps21, but convergence check examines R = eps21 / eps32:
    convergence_ratio = eps21 / eps32 if abs(eps32) > 1e-15 else 0.0

    warnings: List[str] = []
    
    if convergence_ratio < 0:
        convergence_mode = "Oscillatory convergence"
        warnings.append("Oscillatory convergence detected. Apparent order p cannot be computed via standard logarithmic formulation.")
        p = formal_order
    elif abs(convergence_ratio) > 1.0:
        convergence_mode = "Monotonic divergence"
        warnings.append("Monotonic divergence detected: error is growing as grid is refined.")
        p = formal_order
    else:
        convergence_mode = "Monotonic convergence"
        # Standard ASME formula uses ratio = eps32 / eps21 for apparent order
        order_ratio = abs(eps32 / eps21)
        if abs(r21 - r32) < 1e-4:
            p = math.log(order_ratio) / math.log(r21)
        else:
            p_curr = formal_order
            for _ in range(30):
                term1 = (r21 ** p_curr) - 1.0
                term2 = (r32 ** p_curr) - 1.0
                if abs(term2) < 1e-12:
                    break
                q_p = math.log(abs(term1 / term2))
                p_next = (1.0 / math.log(r21)) * abs(math.log(order_ratio) + q_p)
                if abs(p_next - p_curr) < 1e-6:
                    p_curr = p_next
                    break
                p_curr = 0.5 * (p_curr + p_next)
            p = max(0.1, min(p_curr, 8.0))

    # Extrapolated fine value (Richardson extrapolation)
    denom = (r21 ** p) - 1.0
    if abs(denom) < 1e-12:
        denom = 1e-12
    phi_ext_21 = ( (r21 ** p) * phi1 - phi2 ) / denom

    # Relative errors
    ea_21 = abs(eps21 / phi1) if abs(phi1) > 1e-15 else abs(eps21)
    
    # GCI for fine grid
    gci_fine_21 = (fs * ea_21) / denom

    # GCI for medium grid
    gci_medium_32 = (fs * abs(eps32 / phi2)) / ((r32 ** p) - 1.0) if abs(phi2) > 1e-15 else 0.0

    # Asymptotic range check: ratio should approach 1.0
    asymptotic_ratio = gci_medium_32 / ( (r21 ** p) * gci_fine_21 ) if gci_fine_21 > 0 else None
    if asymptotic_ratio is not None and not (0.95 <= asymptotic_ratio <= 1.05):
        warnings.append(f"Asymptotic range of convergence not fully achieved (ratio={asymptotic_ratio:.3f}, target ~ 1.0). Additional grid refinement recommended.")

    return MultiValueCalculationResult(
        calculation_id=str(uuid.uuid4()),
        calculation_name="Grid Convergence Index (ASME V&V 20)",
        formula="GCI_fine = (Fs * |e_a|) / (r^p - 1); p = ln(e32/e21)/ln(r)",
        inputs={"r21": r21, "r32": r32, "phi1": phi1, "phi2": phi2, "phi3": phi3, "fs": fs},
        input_units={"r": "dimensionless", "phi": "quantity_unit"},
        results={
            "apparent_order_p": float(p),
            "convergence_mode": convergence_mode,
            "extrapolated_value": float(phi_ext_21),
            "fine_grid_relative_error": float(ea_21),
            "gci_fine_percent": float(gci_fine_21 * 100.0),
            "gci_medium_percent": float(gci_medium_32 * 100.0),
            "asymptotic_ratio": float(asymptotic_ratio) if asymptotic_ratio is not None else None
        },
        output_units={
            "apparent_order_p": "dimensionless",
            "extrapolated_value": "quantity_unit",
            "gci_fine_percent": "%",
            "gci_medium_percent": "%"
        },
        assumptions=[
            "Solutions are within the asymptotic convergence range of the discretization scheme",
            "Uniform geometrical refinement across all 3 grid levels",
            "Factor of safety Fs = 1.25 per ASME standard for 3 grids"
        ],
        applicability="Rigorous numerical discretization uncertainty evaluation for CFD spatial grids.",
        warnings=warnings
    )
