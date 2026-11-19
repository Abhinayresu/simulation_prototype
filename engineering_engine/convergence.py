"""
Deterministic solver convergence and residual history analysis.
Never fabricates convergence or residual trends.
"""
import re
import uuid
import numpy as np
from typing import Dict, List, Any
from engineering_engine.result_models import MultiValueCalculationResult
from engineering_engine.exceptions import ConvergenceAnalysisError

def parse_openfoam_residuals(log_text: str) -> Dict[str, List[float]]:
    """
    Deterministically extracts initial residuals from OpenFOAM solver logs.
    Handles p, Ux, Uy, Uz, k, omega, epsilon.
    """
    residuals: Dict[str, List[float]] = {}
    pattern = re.compile(r"Solving for (\w+), Initial residual = ([0-9.eE+-]+)")
    
    for line in log_text.splitlines():
        match = pattern.search(line)
        if match:
            field = match.group(1)
            val = float(match.group(2))
            if field not in residuals:
                residuals[field] = []
            residuals[field].append(val)
            
    return residuals

def evaluate_convergence(
    residuals: Dict[str, List[float]],
    target_threshold: float = 1e-4,
    stability_window: int = 50
) -> MultiValueCalculationResult:
    """
    Evaluates iterative convergence based on:
    - Current final residual vs target threshold
    - Residual slope / stability over the recent iterations
    """
    if not residuals:
        raise ConvergenceAnalysisError("No residual fields provided for convergence analysis.")

    fields_status: Dict[str, Any] = {}
    all_converged = True
    warnings: List[str] = []

    for field, history in residuals.items():
        if len(history) < 2:
            fields_status[field] = {"converged": False, "final_residual": history[-1] if history else None, "note": "Insufficient iterations"}
            all_converged = False
            continue

        arr = np.array(history, dtype=np.float64)
        final_val = float(arr[-1])
        below_target = final_val <= target_threshold

        # Compute slope over the last stability_window iterations (log10 scale)
        window = min(len(arr), stability_window)
        recent = arr[-window:]
        recent_log = np.log10(np.clip(recent, 1e-15, None))
        x = np.arange(window)
        slope = float(np.polyfit(x, recent_log, 1)[0])

        is_stable = slope <= 0.001  # non-diverging
        is_converged = below_target and is_stable

        if not is_converged:
            all_converged = False
            if slope > 0.05:
                warnings.append(f"Field '{field}' residual is rising (slope={slope:.4f}), potential divergence detected.")

        fields_status[field] = {
            "final_residual": final_val,
            "target_threshold": target_threshold,
            "converged": is_converged,
            "log10_slope": slope,
            "iterations_evaluated": len(history)
        }

    status = "PASSED" if all_converged else "CAUTION"

    return MultiValueCalculationResult(
        calculation_id=str(uuid.uuid4()),
        calculation_name="Iterative Convergence Evaluation",
        formula="Residual < Target Threshold AND d(log10(Residual))/d(Iteration) <= 0",
        inputs={"target_threshold": target_threshold, "stability_window": stability_window},
        input_units={"target_threshold": "dimensionless"},
        results={
            "overall_converged": all_converged,
            "fields": fields_status
        },
        output_units={"residuals": "dimensionless"},
        assumptions=["Standard CFD finite volume residual definition"],
        applicability="Evaluates iterative convergence of discrete linear equation system.",
        warnings=warnings,
        validation_status=status
    )
