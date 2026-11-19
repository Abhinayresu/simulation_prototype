"""
Exceptions for EngineerMind Engineering Computation Engine.
"""

class EngineeringEngineError(Exception):
    """Base exception for all engineering calculation errors."""
    pass

class ValidationError(EngineeringEngineError):
    """Raised when calculation inputs violate physical or mathematical domain boundaries."""
    pass

class UnitConversionError(EngineeringEngineError):
    """Raised when an unrecognized or incompatible unit is provided."""
    pass

class ConvergenceAnalysisError(EngineeringEngineError):
    """Raised when residual data or convergence history is invalid or insufficient."""
    pass

class GeometryAnalysisError(EngineeringEngineError):
    """Raised when geometry or mesh data is corrupted, degenerate, or cannot be processed."""
    pass

class GCIComputationError(EngineeringEngineError):
    """Raised when Grid Convergence Index calculation prerequisites are not met."""
    pass
