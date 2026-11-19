"""
Deterministic unit conversions and dimensionality verification.
Converts provided input values to SI base units.
"""
from typing import Dict
from engineering_engine.exceptions import UnitConversionError

LENGTH_CONVERSIONS: Dict[str, float] = {
    "m": 1.0,
    "meter": 1.0,
    "meters": 1.0,
    "mm": 1e-3,
    "millimeter": 1e-3,
    "millimeters": 1e-3,
    "cm": 1e-2,
    "centimeter": 1e-2,
    "centimeters": 1e-2,
    "km": 1e3,
    "in": 0.0254,
    "inch": 0.0254,
    "inches": 0.0254,
    "ft": 0.3048,
    "foot": 0.3048,
    "feet": 0.3048,
}

VELOCITY_CONVERSIONS: Dict[str, float] = {
    "m/s": 1.0,
    "km/h": 1.0 / 3.6,
    "mph": 0.44704,
    "knot": 0.514444,
    "knots": 0.514444,
    "ft/s": 0.3048,
}

PRESSURE_CONVERSIONS: Dict[str, float] = {
    "pa": 1.0,
    "pascal": 1.0,
    "kpa": 1e3,
    "mpa": 1e6,
    "bar": 1e5,
    "mbar": 100.0,
    "atm": 101325.0,
    "psi": 6894.757,
}

DENSITY_CONVERSIONS: Dict[str, float] = {
    "kg/m^3": 1.0,
    "kg/m3": 1.0,
    "g/cm^3": 1000.0,
    "g/cm3": 1000.0,
    "slug/ft^3": 515.3788,
    "lbm/ft^3": 16.01846,
}

VISCOSITY_CONVERSIONS: Dict[str, float] = {
    "pa*s": 1.0,
    "pa.s": 1.0,
    "pas": 1.0,
    "kg/(m*s)": 1.0,
    "cp": 1e-3,
    "poise": 0.1,
}

TEMPERATURE_CONVERSIONS = ["k", "kelvin", "c", "celsius", "f", "fahrenheit"]

def convert_to_si(value: float, unit: str, quantity_type: str) -> float:
    """
    Converts a value from unit to standard SI unit.
    quantity_type must be one of: 'length', 'velocity', 'pressure', 'density', 'viscosity', 'temperature', 'force', 'area'.
    """
    u = unit.strip().lower()
    
    if quantity_type == "length":
        if u not in LENGTH_CONVERSIONS:
            raise UnitConversionError(f"Unsupported length unit: '{unit}'. Allowed: {list(LENGTH_CONVERSIONS.keys())}")
        return value * LENGTH_CONVERSIONS[u]
        
    elif quantity_type == "velocity":
        if u not in VELOCITY_CONVERSIONS:
            raise UnitConversionError(f"Unsupported velocity unit: '{unit}'. Allowed: {list(VELOCITY_CONVERSIONS.keys())}")
        return value * VELOCITY_CONVERSIONS[u]

    elif quantity_type == "pressure":
        if u not in PRESSURE_CONVERSIONS:
            raise UnitConversionError(f"Unsupported pressure unit: '{unit}'. Allowed: {list(PRESSURE_CONVERSIONS.keys())}")
        return value * PRESSURE_CONVERSIONS[u]

    elif quantity_type == "density":
        if u not in DENSITY_CONVERSIONS:
            raise UnitConversionError(f"Unsupported density unit: '{unit}'. Allowed: {list(DENSITY_CONVERSIONS.keys())}")
        return value * DENSITY_CONVERSIONS[u]

    elif quantity_type == "viscosity":
        if u not in VISCOSITY_CONVERSIONS:
            raise UnitConversionError(f"Unsupported viscosity unit: '{unit}'. Allowed: {list(VISCOSITY_CONVERSIONS.keys())}")
        return value * VISCOSITY_CONVERSIONS[u]

    elif quantity_type == "temperature":
        if u in ("k", "kelvin"):
            return value
        elif u in ("c", "celsius"):
            return value + 273.15
        elif u in ("f", "fahrenheit"):
            return (value - 32.0) * 5.0 / 9.0 + 273.15
        else:
            raise UnitConversionError(f"Unsupported temperature unit: '{unit}'. Allowed: {TEMPERATURE_CONVERSIONS}")

    elif quantity_type == "force":
        if u in ("n", "newton", "newtons"):
            return value
        elif u in ("kn", "kilonewton"):
            return value * 1000.0
        elif u in ("lbf", "pound-force"):
            return value * 4.448222
        else:
            raise UnitConversionError(f"Unsupported force unit: '{unit}'")

    elif quantity_type == "area":
        if u in ("m^2", "m2", "sq_m", "sqm"):
            return value
        elif u in ("mm^2", "mm2"):
            return value * 1e-6
        elif u in ("cm^2", "cm2"):
            return value * 1e-4
        elif u in ("ft^2", "ft2", "sq_ft"):
            return value * 0.092903
        else:
            raise UnitConversionError(f"Unsupported area unit: '{unit}'")

    else:
        raise UnitConversionError(f"Unknown quantity type: {quantity_type}")
