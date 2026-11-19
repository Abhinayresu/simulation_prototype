"""
Restricted, typed tool registry for EngineerMind AI Orchestration.
Exposes ONLY deterministic calculation functions and RAG retrieval.
The LLM cannot execute arbitrary Python, system commands, or raw SQL queries.
"""
from typing import Dict, Any, Callable
from pydantic import BaseModel, Field

from engineering_engine.fluid_mechanics import (
    calculate_reynolds_number,
    calculate_mach_number,
    calculate_dynamic_pressure,
)
from engineering_engine.aerodynamics import (
    calculate_lift_coefficient,
    calculate_drag_coefficient,
    estimate_first_cell_height_y_plus,
)
from engineering_engine.gci import calculate_gci_three_grids
from engineering_engine.validation import evaluate_validation_metrics
from engineering_engine.exceptions import EngineeringEngineError

class ToolDefinition(BaseModel):
    name: str
    purpose: str
    required_parameters: list[str]
    parameter_types: Dict[str, str]
    execution_permission: str = "SAFE_DETERMINISTIC"

class RestrictedToolRegistry:
    """
    Whitelist of approved engineering computational tools.
    """
    def __init__(self):
        self._tools: Dict[str, Callable[..., Any]] = {
            "calculate_reynolds_number": calculate_reynolds_number,
            "calculate_mach_number": calculate_mach_number,
            "calculate_dynamic_pressure": calculate_dynamic_pressure,
            "calculate_lift_coefficient": calculate_lift_coefficient,
            "calculate_drag_coefficient": calculate_drag_coefficient,
            "estimate_first_cell_height_y_plus": estimate_first_cell_height_y_plus,
            "calculate_gci_three_grids": calculate_gci_three_grids,
            "evaluate_validation_metrics": evaluate_validation_metrics,
        }

    def list_tools(self) -> list[str]:
        return list(self._tools.keys())

    def execute_tool(self, tool_name: str, parameters: Dict[str, Any]) -> Any:
        if tool_name not in self._tools:
            raise EngineeringEngineError(f"Unauthorized or unknown tool: '{tool_name}'. LLM tool execution is strictly restricted.")

        tool_func = self._tools[tool_name]
        try:
            return tool_func(**parameters)
        except TypeError as te:
            raise EngineeringEngineError(f"Parameter mismatch for tool '{tool_name}': {str(te)}")
        except Exception as e:
            raise EngineeringEngineError(f"Deterministic calculation execution failed: {str(e)}")
