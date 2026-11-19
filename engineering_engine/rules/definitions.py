"""
Curated library of standard aerodynamic and CFD engineering rules.
Every threshold has an explicit engineering reference and applicability condition.
"""
from typing import Dict, Any, Tuple
from engineering_engine.rules.models import RuleDefinition, RuleDomain, RuleSeverity

# --- RULE DEFINITIONS ---

RULE_INCOMPRESSIBLE_MACH = RuleDefinition(
    rule_id="RULE-AERO-001",
    rule_name="Incompressible Solver Mach Limit Check",
    description="Verifies that flow speed remains below Mach 0.3 for incompressible CFD solvers (e.g., simpleFoam).",
    domain=RuleDomain.SOLVER_SELECTION,
    applicable_conditions={"solver_type": "incompressible"},
    required_inputs=["mach_number"],
    severity=RuleSeverity.BLOCKING,
    source_reference="Anderson, J. D., 'Fundamentals of Aerodynamics', 6th Edition, Sec. 8.2; White, F. M., 'Fluid Mechanics', Sec. 9.1",
    source_version="6th Ed.",
    assumptions=["Air behaves as an ideal gas with constant density for Ma < 0.3 (density change < 5%)"],
    recommended_action="Switch solver to a compressible formulation (e.g., rhoSimpleFoam) if Mach exceeds 0.3."
)

RULE_Y_PLUS_WALL_RESOLVED = RuleDefinition(
    rule_id="RULE-MESH-001",
    rule_name="Wall-Resolved Boundary Layer y+ Target",
    description="Verifies target y+ <= 1.0 for wall-resolved low-Reynolds turbulence models (e.g. k-omega SST without wall functions).",
    domain=RuleDomain.MESHING,
    applicable_conditions={"near_wall_treatment": "low_reynolds_resolved"},
    required_inputs=["target_y_plus"],
    severity=RuleSeverity.ERROR,
    source_reference="NASA Turbulence Modeling Resource (TMR), Wilcox, D. C., 'Turbulence Modeling for CFD', 3rd Ed.",
    source_version="3rd Ed.",
    assumptions=["Viscous sublayer resolution requires the first cell centroid to reside at y+ ~ 1.0 or less"],
    recommended_action="Refine first prism layer cell height to achieve target y+ <= 1.0."
)

RULE_Y_PLUS_WALL_FUNCTION = RuleDefinition(
    rule_id="RULE-MESH-002",
    rule_name="Standard Wall Function y+ Validity Buffer",
    description="Verifies target y+ is within the log-law region (30 < y+ < 300) when standard wall functions are selected.",
    domain=RuleDomain.MESHING,
    applicable_conditions={"near_wall_treatment": "standard_wall_functions"},
    required_inputs=["target_y_plus"],
    severity=RuleSeverity.WARNING,
    source_reference="Schlichting, H. and Gersten, K., 'Boundary-Layer Theory', 9th Ed., Springer; Launder & Spalding (1974)",
    source_version="9th Ed.",
    assumptions=["Logarithmic overlap region is physically valid between 30 and 300; buffer zone (5 < y+ < 30) leads to inaccuracies."],
    recommended_action="Ensure first cell height places y+ safely in the range 30 to 300."
)

RULE_DOMAIN_BLOCKAGE_RATIO = RuleDefinition(
    rule_id="RULE-AERO-002",
    rule_name="External Wind Tunnel / Computational Domain Blockage Ratio",
    description="Verifies that frontal projected model area does not exceed 3% - 5% of domain cross-sectional area to avoid false wall confinement acceleration.",
    domain=RuleDomain.AERODYNAMICS,
    applicable_conditions={"flow_type": "external_aerodynamics"},
    required_inputs=["model_frontal_area", "domain_cross_sectional_area"],
    severity=RuleSeverity.WARNING,
    source_reference="Barlow, J. B., Rae, W. H., Pope, A., 'Low-Speed Wind Tunnel Testing', 3rd Edition, Wiley (1999)",
    source_version="3rd Ed.",
    assumptions=["Solid blockage and wake blockage corrections become non-linear when blockage ratio exceeds 0.05"],
    recommended_action="Increase domain cross-sectional width and height such that frontal blockage is less than 3% (0.03)."
)

RULE_MESH_NON_ORTHOGONALITY = RuleDefinition(
    rule_id="RULE-MESH-003",
    rule_name="Mesh Non-Orthogonality Solver Convergence Safety",
    description="Flags meshes with maximum non-orthogonality exceeding 70 degrees, requiring non-orthogonal correctors or remeshing if > 85 degrees.",
    domain=RuleDomain.MESHING,
    applicable_conditions={"mesh_present": True},
    required_inputs=["max_non_orthogonality"],
    severity=RuleSeverity.BLOCKING,
    source_reference="Jasak, H., 'Error Analysis and Estimation for the Finite Volume Method with Applications to Fluid Flows', PhD Thesis, Imperial College (1996)",
    source_version="1996",
    assumptions=["Finite volume flux gradient interpolation error diverges as face non-orthogonality approaches 90 degrees"],
    recommended_action="Increase non-orthogonal corrector iterations in fvSolution if > 70 deg, or remesh boundary prism transitions if > 85 deg."
)

RULE_REQUIRED_PHYSICS_PARAMS = RuleDefinition(
    rule_id="RULE-INPUT-001",
    rule_name="Essential Problem Definition Completeness",
    description="Ensures freestream velocity, reference chord length, and fluid kinematic/dynamic viscosity are defined.",
    domain=RuleDomain.PROBLEM_DEFINITION,
    applicable_conditions={},
    required_inputs=["velocity", "characteristic_length"],
    severity=RuleSeverity.BLOCKING,
    source_reference="EngineerMind Engineering Standard Core Spec v1.0",
    source_version="1.0.0",
    assumptions=["Simulation cannot formulate nondimensional Navier-Stokes boundary conditions without characteristic scales"],
    recommended_action="Provide freestream velocity and characteristic model dimensions before simulation planning."
)

RULE_TURBULENCE_MODEL_APPLICABILITY = RuleDefinition(
    rule_id="RULE-SOLV-001",
    rule_name="Laminar vs Turbulent Model Verification",
    description="Warns if an aerodynamic external flow with Re > 5e5 is run under laminar assumptions without transition models.",
    domain=RuleDomain.SOLVER_SELECTION,
    applicable_conditions={"flow_type": "external_aerodynamics"},
    required_inputs=["reynolds_number", "turbulence_model"],
    severity=RuleSeverity.WARNING,
    source_reference="AGARD Report AR-303, 'A Selection of Experimental Test Cases for the Validation of CFD Codes'",
    source_version="1994",
    assumptions=["Airfoil boundary layer transition occurs well before Re = 1e6 under typical surface roughness"],
    recommended_action="Select a validated turbulence closure model (e.g., k-omega SST or Spalart-Allmaras) for Re > 5e5."
)

RULE_ITERATIVE_RESIDUAL_TARGET = RuleDefinition(
    rule_id="RULE-CONV-001",
    rule_name="Residual Convergence Criterion Standard",
    description="Verifies that all velocity and pressure equation residuals drop below 1e-4 for engineering accuracy.",
    domain=RuleDomain.CONVERGENCE,
    applicable_conditions={"simulation_completed": True},
    required_inputs=["max_final_residual"],
    severity=RuleSeverity.ERROR,
    source_reference="AIAA G-077-1998, 'Guide for the Verification and Validation of Computational Fluid Dynamics Simulations'",
    source_version="1998",
    assumptions=["Residuals must decrease by at least 3 to 4 orders of magnitude to guarantee spatial discrete error dominance over iterative error"],
    recommended_action="Run additional solver iterations or refine relaxation factors to drive residuals below 1e-4."
)

# Registry of standard rules
STANDARD_RULES: Dict[str, RuleDefinition] = {
    RULE_INCOMPRESSIBLE_MACH.rule_id: RULE_INCOMPRESSIBLE_MACH,
    RULE_Y_PLUS_WALL_RESOLVED.rule_id: RULE_Y_PLUS_WALL_RESOLVED,
    RULE_Y_PLUS_WALL_FUNCTION.rule_id: RULE_Y_PLUS_WALL_FUNCTION,
    RULE_DOMAIN_BLOCKAGE_RATIO.rule_id: RULE_DOMAIN_BLOCKAGE_RATIO,
    RULE_MESH_NON_ORTHOGONALITY.rule_id: RULE_MESH_NON_ORTHOGONALITY,
    RULE_REQUIRED_PHYSICS_PARAMS.rule_id: RULE_REQUIRED_PHYSICS_PARAMS,
    RULE_TURBULENCE_MODEL_APPLICABILITY.rule_id: RULE_TURBULENCE_MODEL_APPLICABILITY,
    RULE_ITERATIVE_RESIDUAL_TARGET.rule_id: RULE_ITERATIVE_RESIDUAL_TARGET,
}
