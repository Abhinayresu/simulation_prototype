"""
Physical and aerodynamic constants with explicit units and standards.
"""

# Universal Gas Constant for dry air (J/(kg*K))
R_SPECIFIC_AIR = 287.05287

# Ratio of specific heats (gamma) for standard dry air at ambient conditions
GAMMA_AIR = 1.4

# Standard sea-level temperature (K) - ISA (ISO 2533:1975)
T_STANDARD_SL = 288.15

# Standard sea-level pressure (Pa) - ISA
P_STANDARD_SL = 101325.0

# Standard sea-level air density (kg/m^3) - ISA
RHO_STANDARD_SL = 1.225

# Standard sea-level dynamic viscosity (Pa*s or kg/(m*s)) - Sutherland's law reference
MU_STANDARD_SL = 1.7894e-5

# Standard acceleration due to gravity (m/s^2)
G_STANDARD = 9.80665

# Sutherland's law constants for air
SUTHERLAND_C1 = 1.458e-6  # kg / (m * s * K^0.5)
SUTHERLAND_S0 = 110.4     # Sutherland temperature (K)
