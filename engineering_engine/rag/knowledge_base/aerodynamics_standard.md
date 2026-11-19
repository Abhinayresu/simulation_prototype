# NASA SP-2016-6105 Systems Engineering & Aerodynamics Best Practices
[PAGE:14]
## Incompressible Navier-Stokes Solvers and Mach Boundaries
For external aerodynamics applications, incompressible formulations of the Navier-Stokes equations (such as OpenFOAM simpleFoam) assume constant fluid density. This assumption holds rigorously when the freestream Mach number remains below 0.3. When Mach exceeds 0.3, fluid density variations exceed 5%, requiring a compressible solver (such as rhoSimpleFoam or rhoCentralFoam) to resolve pressure expansion gradients and avoid non-conservative kinetic head errors.

[PAGE:48]
## Boundary Layer Meshing and Near-Wall y+ Criteria
In wall-bounded aerodynamic flows, the choice of turbulence model dictates the required spatial resolution of the near-wall prism layer. For wall-resolved simulations using the k-omega SST model without wall functions, the first prism cell height must be chosen such that the dimensionless wall distance y+ is approximately 1.0 (y+ <= 1.0). Conversely, when standard log-law wall functions are employed, y+ must be maintained between 30 and 300 to avoid placing cell centroids in the buffer layer (5 < y+ < 30) where neither linear nor logarithmic velocity profiles are strictly valid.

[PAGE:72]
## Grid Convergence Index (ASME V&V 20 Standard)
Discretization uncertainty in CFD must be estimated using the Grid Convergence Index (GCI) based on the Richardson extrapolation method formalized by Roache and Celik et al. A minimum of three geometrically similar grid levels (fine, medium, coarse) with a constant refinement ratio r >= 1.3 is recommended. The apparent order of convergence p indicates whether the spatial discretization scheme achieves its asymptotic design order.
