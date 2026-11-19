"""
Pydantic schemas for deterministic engineering calculation results.
Preserves calculation provenance, traceability, assumptions, and validation status.
"""
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class CalculationResult(BaseModel):
    """
    Standard structured output for any deterministic engineering computation.
    """
    calculation_id: str = Field(description="Unique identifier for the calculation instance")
    calculation_name: str = Field(description="Descriptive name of the computation")
    formula: str = Field(description="Mathematical formula in standard notation")
    formula_version: str = Field(default="1.0.0", description="Semantic version of formula implementation")
    inputs: Dict[str, Any] = Field(description="Raw user-supplied inputs")
    input_units: Dict[str, str] = Field(description="Units associated with the raw inputs")
    converted_inputs: Dict[str, float] = Field(description="SI normalized values used in the calculation")
    result: float = Field(description="Calculated numerical result in SI unit")
    output_unit: str = Field(description="SI unit of the computed result, or 'dimensionless'")
    assumptions: List[str] = Field(default_factory=list, description="Explicit physics or engineering assumptions")
    applicability: str = Field(description="Conditions under which this calculation is physically valid")
    warnings: List[str] = Field(default_factory=list, description="Physical warnings (e.g. compressibility limits)")
    validation_status: str = Field(default="PASSED", description="PASSED, CAUTION, or FAILED")
    calculation_timestamp: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat(),
        description="ISO 8601 UTC timestamp of execution"
    )

class MultiValueCalculationResult(BaseModel):
    """
    Standard structured output for calculations returning multiple vector/scalar fields (e.g., GCI, mesh metrics).
    """
    calculation_id: str
    calculation_name: str
    formula: str
    formula_version: str = "1.0.0"
    inputs: Dict[str, Any]
    input_units: Dict[str, str]
    results: Dict[str, Any]
    output_units: Dict[str, str]
    assumptions: List[str] = Field(default_factory=list)
    applicability: str
    warnings: List[str] = Field(default_factory=list)
    validation_status: str = "PASSED"
    calculation_timestamp: str = Field(
        default_factory=lambda: datetime.now(timezone.utc).isoformat()
    )
