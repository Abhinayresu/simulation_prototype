"""
Deterministic validation metrics comparing simulation results against experimental/benchmark datasets.
Computes relative error, root mean square error (RMSE), and validation credibility boundaries.
"""
import uuid
import numpy as np
from typing import List, Dict, Any, Optional
from engineering_engine.result_models import MultiValueCalculationResult
from engineering_engine.exceptions import ValidationError

def evaluate_validation_metrics(
    cfd_values: List[float],
    benchmark_values: List[float],
    benchmark_source: str = "Experimental wind tunnel data"
) -> MultiValueCalculationResult:
    """
    Computes deterministic statistical agreement between simulation data and physical benchmark measurements.
    """
    if len(cfd_values) != len(benchmark_values):
        raise ValidationError(f"CFD sample size ({len(cfd_values)}) must match benchmark sample size ({len(benchmark_values)}).")
    if len(cfd_values) == 0:
        raise ValidationError("Sample lists cannot be empty.")

    sim = np.array(cfd_values, dtype=np.float64)
    exp = np.array(benchmark_values, dtype=np.float64)

    # Discrepancy / error vector
    diff = sim - exp
    abs_errors = np.abs(diff)
    
    # Relative percentage error (guarded against division by zero)
    with np.errstate(divide='ignore', invalid='ignore'):
        rel_errors = np.where(np.abs(exp) > 1e-9, (abs_errors / np.abs(exp)) * 100.0, 0.0)

    mean_rel_error_pct = float(np.mean(rel_errors))
    max_rel_error_pct = float(np.max(rel_errors))
    rmse = float(np.sqrt(np.mean(diff ** 2)))

    # Correlation coefficient
    if len(sim) > 1 and np.std(sim) > 1e-12 and np.std(exp) > 1e-12:
        r_matrix = np.corrcoef(sim, exp)
        r_val = float(r_matrix[0, 1])
    else:
        r_val = 1.0

    warnings: List[str] = []
    if mean_rel_error_pct > 10.0:
        status = "CAUTION"
        warnings.append(f"Mean discrepancy ({mean_rel_error_pct:.2f}%) exceeds recommended 10% engineering margin.")
    elif mean_rel_error_pct > 25.0:
        status = "FAILED"
        warnings.append(f"Significant discrepancy ({mean_rel_error_pct:.2f}%) indicates physical modeling or mesh deficiency.")
    else:
        status = "PASSED"

    return MultiValueCalculationResult(
        calculation_id=str(uuid.uuid4()),
        calculation_name="Simulation-to-Benchmark Physical Validation",
        formula="RMSE = sqrt(mean((CFD - Exp)^2)); Mean Error % = mean(|CFD - Exp| / |Exp|) * 100",
        inputs={"sample_count": len(cfd_values), "benchmark_source": benchmark_source},
        input_units={"sample_count": "count"},
        results={
            "mean_relative_error_pct": mean_rel_error_pct,
            "max_relative_error_pct": max_rel_error_pct,
            "rmse": rmse,
            "pearson_correlation_r": r_val,
            "benchmark_source": benchmark_source
        },
        output_units={
            "mean_relative_error_pct": "%",
            "max_relative_error_pct": "%",
            "rmse": "quantity_unit",
            "pearson_correlation_r": "dimensionless"
        },
        assumptions=[
            "Direct point-to-point spatial or parametric correspondence between datasets",
            "Experimental benchmark uncertainty considered external"
        ],
        applicability="Deterministic verification and validation comparison against empirical or reference data.",
        warnings=warnings,
        validation_status=status
    )
