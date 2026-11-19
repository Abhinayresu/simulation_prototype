"""
Deterministic fluid mechanics calculations.
Never delegates mathematics to LLM.
"""
import math
import uuid
from typing import Optional, List
from engineering_engine.constants import (
    R_SPECIFIC_AIR,
    GAMMA_AIR,
    SUTHERLAND_C1,
    SUTHERLAND_S0
)
from engineering_engine.exceptions import ValidationError
from engineering_engine.units import convert_to_si
from engineering_engine.validators import validate_positive, validate_temperature
from engineering_engine.result_models import CalculationResult

def calculate_reynolds_number(
    velocity: float,
    characteristic_length: float,
    density: Optional[float] = None,
    dynamic_viscosity: Optional[float] = None,
    kinematic_viscosity: Optional[float] = None,
    velocity_unit: str = "m/s",
    length_unit: str = "m",
    density_unit: str = "kg/m^3",
    viscosity_unit: str = "Pa*s",
    kinematic_viscosity_unit: str = "m^2/s"
) -> CalculationResult:
    """
    Governing Equation:
        Re = (rho * U * L) / mu = (U * L) / nu
    
    Inputs:
        - velocity: flow speed U
        - characteristic_length: reference length L (e.g. chord, hydraulic diameter)
        - density: fluid density rho (optional if kinematic_viscosity provided)
        - dynamic_viscosity: dynamic shear viscosity mu
        - kinematic_viscosity: kinematic viscosity nu = mu / rho
    """
    u_si = validate_positive("velocity", convert_to_si(velocity, velocity_unit, "velocity"), strict=False)
    l_si = validate_positive("characteristic_length", convert_to_si(characteristic_length, length_unit, "length"), strict=True)
    
    warnings: List[str] = []
    
    if kinematic_viscosity is not None:
        nu_si = validate_positive("kinematic_viscosity", kinematic_viscosity, strict=True)
        re = (u_si * l_si) / nu_si
        converted = {"velocity_m_s": u_si, "length_m": l_si, "kinematic_viscosity_m2_s": nu_si}
        formula_str = "Re = (U * L) / nu"
    else:
        if density is None or dynamic_viscosity is None:
            raise ValidationError("Either kinematic_viscosity or both density and dynamic_viscosity must be provided.")
        rho_si = validate_positive("density", convert_to_si(density, density_unit, "density"), strict=True)
        mu_si = validate_positive("dynamic_viscosity", convert_to_si(dynamic_viscosity, viscosity_unit, "viscosity"), strict=True)
        re = (rho_si * u_si * l_si) / mu_si
        converted = {"velocity_m_s": u_si, "length_m": l_si, "density_kg_m3": rho_si, "dynamic_viscosity_Pa_s": mu_si}
        formula_str = "Re = (rho * U * L) / mu"

    if re < 2300:
        regime = "Laminar (assuming standard internal channel/pipe benchmark) or low Reynolds number external flow"
    elif re > 5e5:
        regime = "Turbulent boundary layer likely dominant for standard external aerodynamic flat plate / airfoil"
    else:
        regime = "Transitional regime"

    return CalculationResult(
        calculation_id=str(uuid.uuid4()),
        calculation_name="Reynolds Number",
        formula=formula_str,
        inputs={
            "velocity": velocity,
            "characteristic_length": characteristic_length,
            "density": density,
            "dynamic_viscosity": dynamic_viscosity,
            "kinematic_viscosity": kinematic_viscosity
        },
        input_units={
            "velocity": velocity_unit,
            "characteristic_length": length_unit,
            "density": density_unit,
            "dynamic_viscosity": viscosity_unit
        },
        converted_inputs=converted,
        result=float(re),
        output_unit="dimensionless",
        assumptions=[
            "Continuum fluid hypothesis holds (Knudsen number Kn << 0.01)",
            "Newtonian fluid behavior with constant local viscosity across reference scale"
        ],
        applicability="Applicable to any Newtonian fluid flow to quantify the ratio of inertial forces to viscous forces.",
        warnings=warnings + [f"Flow regime indication: {regime}"]
    )

def calculate_mach_number(
    velocity: float,
    temperature_kelvin: Optional[float] = None,
    speed_of_sound: Optional[float] = None,
    gamma: float = GAMMA_AIR,
    r_specific: float = R_SPECIFIC_AIR,
    velocity_unit: str = "m/s"
) -> CalculationResult:
    """
    Governing Equation:
        Ma = U / a, where a = sqrt(gamma * R * T) for an ideal gas
    """
    u_si = validate_positive("velocity", convert_to_si(velocity, velocity_unit, "velocity"), strict=False)
    warnings: List[str] = []

    if speed_of_sound is not None:
        a_si = validate_positive("speed_of_sound", speed_of_sound, strict=True)
        converted = {"velocity_m_s": u_si, "speed_of_sound_m_s": a_si}
        formula_str = "Ma = U / a"
    else:
        if temperature_kelvin is None:
            raise ValidationError("Either speed_of_sound or temperature_kelvin must be provided.")
        t_si = validate_temperature(temperature_kelvin)
        gamma_si = validate_positive("gamma", gamma, strict=True)
        r_si = validate_positive("r_specific", r_specific, strict=True)
        a_si = math.sqrt(gamma_si * r_si * t_si)
        converted = {"velocity_m_s": u_si, "temperature_K": t_si, "gamma": gamma_si, "r_specific_J_kgK": r_si, "computed_speed_of_sound_m_s": a_si}
        formula_str = "Ma = U / sqrt(gamma * R * T)"

    mach = u_si / a_si

    if mach < 0.3:
        regime = "Incompressible flow regime (density variation < 5%). Incompressible Navier-Stokes / simpleFoam valid."
    elif 0.3 <= mach < 0.8:
        regime = "Subsonic compressible flow regime. Compressibility effects cannot be ignored."
        warnings.append("Mach >= 0.3: Incompressible CFD solvers will underpredict pressure gradients.")
    elif 0.8 <= mach < 1.2:
        regime = "Transonic flow regime. Expect mixed subsonic/supersonic regions and shock waves."
        warnings.append("Transonic conditions require compressible shock-capturing schemes (e.g. rhoCentralFoam).")
    elif 1.2 <= mach < 5.0:
        regime = "Supersonic flow regime. Oblique/bow shocks and expansion fans present."
    else:
        regime = "Hypersonic flow regime. High-temperature gas dynamics and dissociation effects active."

    return CalculationResult(
        calculation_id=str(uuid.uuid4()),
        calculation_name="Mach Number",
        formula=formula_str,
        inputs={"velocity": velocity, "temperature_kelvin": temperature_kelvin, "speed_of_sound": speed_of_sound, "gamma": gamma},
        input_units={"velocity": velocity_unit, "temperature": "K"},
        converted_inputs=converted,
        result=float(mach),
        output_unit="dimensionless",
        assumptions=[
            "Calorically perfect ideal gas assumption for speed of sound calculation (h = Cp * T)",
            "Uniform local static temperature"
        ],
        applicability="Quantifies flow compressibility and proximity to acoustic propagation speed.",
        warnings=warnings + [f"Flow regime: {regime}"]
    )

def calculate_dynamic_pressure(
    density: float,
    velocity: float,
    density_unit: str = "kg/m^3",
    velocity_unit: str = "m/s"
) -> CalculationResult:
    """
    Governing Equation:
        q = 0.5 * rho * U^2
    """
    rho_si = validate_positive("density", convert_to_si(density, density_unit, "density"), strict=True)
    u_si = validate_positive("velocity", convert_to_si(velocity, velocity_unit, "velocity"), strict=False)

    q = 0.5 * rho_si * (u_si ** 2)

    return CalculationResult(
        calculation_id=str(uuid.uuid4()),
        calculation_name="Dynamic Pressure",
        formula="q = 0.5 * rho * U^2",
        inputs={"density": density, "velocity": velocity},
        input_units={"density": density_unit, "velocity": velocity_unit},
        converted_inputs={"density_kg_m3": rho_si, "velocity_m_s": u_si},
        result=float(q),
        output_unit="Pa",
        assumptions=["Incompressible kinetic energy per unit fluid volume formulation"],
        applicability="Represents dynamic pressure head in Bernoulli formulation and aerodynamic force normalization."
    )

def calculate_sutherland_viscosity(temperature_kelvin: float) -> CalculationResult:
    """
    Governing Equation:
        mu = C1 * T^(3/2) / (T + S0)
    """
    t_si = validate_temperature(temperature_kelvin)
    mu = (SUTHERLAND_C1 * (t_si ** 1.5)) / (t_si + SUTHERLAND_S0)

    return CalculationResult(
        calculation_id=str(uuid.uuid4()),
        calculation_name="Dynamic Viscosity (Sutherland's Law)",
        formula="mu = C1 * T^(3/2) / (T + S0)",
        inputs={"temperature_kelvin": temperature_kelvin},
        input_units={"temperature": "K"},
        converted_inputs={"temperature_K": t_si},
        result=float(mu),
        output_unit="Pa*s",
        assumptions=["Standard Sutherland 3-constant model for dry atmospheric air"],
        applicability="Valid for dry air in moderate temperature ranges (100 K to 1900 K)."
    )
