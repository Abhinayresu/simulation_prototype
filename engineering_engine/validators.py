"""
Deterministic input validators for engineering domain boundaries.
"""
import math
from engineering_engine.exceptions import ValidationError

def validate_positive(name: str, value: float, strict: bool = True) -> float:
    """Validates that a numerical value is strictly positive (> 0) or non-negative (>= 0)."""
    if not isinstance(value, (int, float)):
        raise ValidationError(f"Parameter '{name}' must be a numerical value, got {type(value).__name__}.")
    if math.isnan(value) or math.isinf(value):
        raise ValidationError(f"Parameter '{name}' cannot be NaN or Infinite.")
    if strict and value <= 0.0:
        raise ValidationError(f"Parameter '{name}' must be strictly positive (> 0), got {value}.")
    if not strict and value < 0.0:
        raise ValidationError(f"Parameter '{name}' cannot be negative, got {value}.")
    return float(value)

def validate_temperature(t_kelvin: float) -> float:
    """Validates temperature against absolute zero."""
    if t_kelvin <= 0.0:
        raise ValidationError(f"Temperature must be above absolute zero (0 K), got {t_kelvin} K.")
    return float(t_kelvin)

def validate_range(name: str, value: float, min_val: float, max_val: float) -> float:
    """Validates that a value lies within an inclusive range [min_val, max_val]."""
    if not (min_val <= value <= max_val):
        raise ValidationError(f"Parameter '{name}' must be within [{min_val}, {max_val}], got {value}.")
    return float(value)
