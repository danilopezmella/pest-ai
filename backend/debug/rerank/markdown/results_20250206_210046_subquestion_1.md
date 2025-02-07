# Search Results for: What specific settings should be adjusted in a model to enhance the reliability of derivatives calculation when using PESTPP-GLM and PESTPP-OPT?

Keywords: None


## Context

### Summary
**Poor PESTPP-GLM or PESTPP-OPT performance may indicate issues with finite-difference derivatives.  Use JACTEST, POSTJACTEST, and MULJCOSEN (Part II of the PEST manual) to assess derivative integrity.**

### Header
**3.3.6 Looking at Model Outputs under the Magnifying Glass**

### Content
If PESTPP-GLM or PESTPP-OPT does not perform as well as you think it should, then bad numerical derivatives may be the cause of the problem. The PEST suite includes a number of utility programs which allow you to explore the integrity of finite-difference derivatives. See documentation for JACTEST, POSTJACTEST and MULJCOSEN in part II of the PEST manual.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 3. Some Important PEST++ Features
- **Subsection:** 3.3 Calculation of Derivatives

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** PEST is a tool that iteratively solves inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses Jacobian matrices and Marquardt lambda for parameter estimation. Different methods are employed based on problem types, with options for uncertainty analysis and parallel processing to reduce computational costs.

### Related Context
- **Previous Summary:** Maximize model output precision (especially for PESTPP-GLM/PESTPP-OPT) by adjusting model control variables to prioritize precision over speed. Tighten solver convergence criteria but avoid excessively long runtimes. Larger parameter increments and three-point derivative methods (parabolic or best-fit) can mitigate granular outputs from adaptive time-stepping or model algorithms.  Precise inter-submodel data transfer is also crucial for composite models.
- **Next Summary:** PEST and PEST++ programs store Jacobian matrices (sensitivities of model outputs to parameters) in binary JCO files (case.jco).  Columns represent parameters; rows represent observations. Log-transformed parameters use log-based derivatives. Utilities (JACWRIT, JCO2MAT, JROW2VEC, JCO2JCO, and PyEMU) provide ASCII conversion, manipulation, and subsetting. JCO files are used for sensitivity analysis, calibration (using the `/i` switch in PEST or *base_jacobian()* in PESTPP-GLM), and linear analyses (identifiability, uncertainty, data worth, model defects).  NOPTMAX=-1 or -2 generates JCO files only.

### Metadata
- **Keywords:** 
- **Chunk ID:** 906e5691bc49
- **Chunk Index:** 1
- **Previous Chunk ID:** 1bd7e570c0b5
- **Next Chunk ID:** 4b9812b58a08

---

## Context

### Summary
**Without "regularization" mode, PESTPP-GLM omits regularization terms but retains prior information (without weight factor adjustment). The `glm_normal_form(prior)` option uses Hanke's (1996) regularized Gauss-Levenburg-Marquardt method, requiring a prior covariance matrix (*parcov* option, otherwise uses bounds and *par_sigma_range*) and using MAXSING/EIGTHRESH for regularization. "regularization" mode and its associated variables are not allowed.**

### Header
**6.2.1 Basic Equations**

### Content
If PESTPP-GLM is not run in “regularization” mode then, or course, regularization terms in the above equations are omitted. This does not preclude the use of prior information in the inversion process; however, the ability of PESTPP-GLM to adjust the importance that it gives to prior information through the regularization weight factor *μ*2 is lost.
PESTPP-GLM also offers users the option of using “regularized Gauss Levenburg Marquardt” of Hanke (1996), where prior parameter covariance matrix based regularization is “baked in” to the upgrade calculation process. This form of upgrade calculations is activated with the *glm_normal_form(prior)* option. Users can specify a prior parameter covariance matrix via the *parcov* option; if a covariance matrix is not supplied, then one is constructed on the fly using the parameter bounds and the optional *par_sigma_range* argument. In this case, MAXSING and EIGTHRESH become the “knobs” to control regularization – “regularization” mode and the associated variables in the “\* regularization” section are not allowed in this mode of operation.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 6. PESTPP-GLM
- **Subsection:** 6.2

### Additional Summaries
- **Higher-Level Summary:** Chapter 6 discusses automatic user intervention in PEST for regularization methods in parameter estimation. It suggests identifying and temporarily fixing insensitive parameters to improve matrix condition number and objective function. Parameters like DOAUI and MAXAUI customize intervention behavior, with options for mitigating bad derivatives and improving sensitivity.
- **Detailed Summary:** In unregularized inversions, insensitive parameters can lead to large adjustments beyond set limits, resulting in minimal objective function improvement. Increasing limits may not help; regularization or adjusting parameter sensitivity is recommended. Use the parameter sensitivity file to identify insensitive parameters and consider temporarily holding them at current values using the case.hld file.

### Related Context
- **Previous Summary:** PESTPP-GLM uses gradient methods (repeated linearization, Doherty 2015) to calibrate models (Equation 6.1: h=Zk+ε).  Tikhonov regularization (PESTMODE="regularization", "regul" groups) adds constraints (Equation 6.2).  Parameter estimates (k) are calculated iteratively (Equation 6.3, incorporating Marquardt lambda in Equation 6.5 for nonlinear models). The objective function (Փ, Equation 6.6) sums weighted squared discrepancies,  including measurement (Փm) and regularization (Փr) components (Equation 6.7).
- **Next Summary:** PESTPP-GLM automatically calculates the regularization weight factor (*μ*²) based on the target measurement objective function (PHIMLIM, in the "regularization" section).  A low PHIMLIM (e.g., 1.0E-10, with FRACPHIM=0.1) helps determine achievable fit; subsequently, increase PHIMLIM by ~5% to avoid overfitting.  PHIMACCEPT, WFINIT, WFMIN, WFMAX, WFFAC, and WFTOL control the iterative procedure.

### Metadata
- **Keywords:** * regularization, EIGTHRESH, MAXSING, par_sigma_range, parcov
- **Chunk ID:** 5fdad33bf76d
- **Chunk Index:** 2
- **Previous Chunk ID:** f6bcfffaff4d
- **Next Chunk ID:** daa2fe0705a8

---

## Context

### Summary
**PESTPP-GLM's iterative inversion process has two parts: derivative calculation and parameter upgrade testing.  The `der_forgive()` variable (default true) controls responses to model failures during derivative calculations:  true freezes the parameter; false halts execution.  Model failures during parameter upgrades result in a high objective function.**

### Header
**6.2.9 Model Run Failure**

### Content
The inversion process implemented by PESTPP-GLM is an iterative procedure. Each iteration is subdivided into two parts. Finite-difference derivatives are calculated in the first part of each iteration; parameter upgrades are calculated and tested in the second part. Model run failure is much more likely to occur during the second of these parts than in the first of these parts as parameter values may vary significantly from model run to model run in the latter case. Where an updated parameter set precipitates model run failure, PESTPP-GLM deems the objective function to be very high; the offending parameter set is therefore judged to be far from optimal.
Model run failure during finite difference derivatives calculation is more worrisome, for a single parameter undergoes only an incremental change from its current value for each model run. A strategy for handling failed model runs under these circumstances is to prevent adjustment of that parameter for the remainder of the current iteration, effectively freezing it at its current value. On some occasions, this may be a shortsighted strategy, for if incremental variation of one parameter instigates model run failure, incremental variation of another parameter may do the same. An alternative strategy is to abandon the inversion process as the likelihood of further parameter improvement has been caste into doubt.
The *der_forgive()* control variable can be used to govern PESTPP’s behavior under these circumstances. It must be supplied as either *true* or *false*. If it is supplied as *true* (its default value) then model run failure when finite difference derivatives are being calculated is accommodated using the first of the above alternatives, that is through temporary freezing of the parameter at its current value. However, if it supplied as *false*, then model run failure during calculation of finite-difference derivatives precipitates cessation of PESTPP-GLM execution.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 6. PESTPP-GLM
- **Subsection:** 6.2

### Additional Summaries
- **Higher-Level Summary:** Chapter 6 discusses automatic user intervention in PEST for regularization methods in parameter estimation. It suggests identifying and temporarily fixing insensitive parameters to improve matrix condition number and objective function. Parameters like DOAUI and MAXAUI customize intervention behavior, with options for mitigating bad derivatives and improving sensitivity.
- **Detailed Summary:** In unregularized inversions, insensitive parameters can lead to large adjustments beyond set limits, resulting in minimal objective function improvement. Increasing limits may not help; regularization or adjusting parameter sensitivity is recommended. Use the parameter sensitivity file to identify insensitive parameters and consider temporarily holding them at current values using the case.hld file.

### Related Context
- **Previous Summary:** PESTPP-GLM outputs parameter uncertainties (case.par.usum.csv, log-transformed parameters use log-based statistics) and, optionally (*glm_num_reals(N)*),  posterior parameter/model output ensembles (case.N.paren.csv/case.N.obsen.csv or JCB files if *save_binary(true)*).  *glm_accept_mc_phi* accepts the lowest-phi Monte Carlo realization (base iterations only).  *forecasts()* enables prediction uncertainty calculations (zero-weighted observations in the control file are treated as forecasts if *forecasts()* is not specified and *uncertainty* is true), outputting results to case.N.pred.usum.csv.
- **Next Summary:** PESTPP-GLM saves composite parameter sensitivities (case.sen) per iteration: Doherty's (2015) *csp* statistic (Equation 6.18) and Hill and Tiedeman's (2007) statistic.  Regularization information is included/excluded in separate calculations; regularization weights are multiplied by the current regularization weight factor if included.

### Metadata
- **Keywords:** der_forgive
- **Chunk ID:** 590bf96e462a
- **Chunk Index:** 1
- **Previous Chunk ID:** 3dd1990de2b8
- **Next Chunk ID:** 4eac766fcaca

---

## Context

### Summary
**Table 6.3 shows optional PESTPP-GLM control variables (with defaults):  `der_forgive()`, `enforce_tied_bounds()`, `glm_accept_mc_phi()`, `rand_seed()`, `glm_rebase_super()`, `glm_iter_mc()`, `ensemble_output_precision()`, and `glm_norm_form()`.  These control derivative handling, bound enforcement, Monte Carlo acceptance, random seed, super parameter re-basing, iterative Monte Carlo, ensemble output precision, and normal matrix form.  Parallel run management variables (section 5.3.6) can also be used.**

### Header
**6.4.3 PEST++ Control Variables**

### Content
| *der_forgive(true)*             | Boolean                | If set to *true*, then if model run failure occurs when calculating finite-difference derivatives with respect to a certain parameter, that parameter is frozen at its current value for the remainder of the iteration. If set to *false*, PESTPP-GLM terminates execution with an appropriate message if this occurs.                                                                                                                                                                                                                                                  |
| *Enforce_tied_bounds(false)*    | Boolean                | Flag to enforce parameter bounds on any tied parameters                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| *glm_accept_mc_phi(false)*      | Boolean                | Flag to accept FOSM-based realization phi each base iteration if the phi is lower than the lambda-testing phi. Default is false.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| *rand_seed(358183147)*          | unsigned integer       | Seed for the random number generator. Used for FOSM-basd Monte Carlo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| *glm_rebase_super(true)*        | boolean                | A flag to run the super-parameter truncated values once at the start of the first super parameter iteration to provide a more accurate “base” run for calculating sensitivity numerators. Only applies if *n_iter_base* = -1 and *base_jacobian* is supplied. Default is False, which indicates use either the *hotstart_resfile* residuals or use the base run previously completed                                                                                                                                                                                     |
| *glm_iter_mc(false)*            | Boolean                | Flag to undertake FOSM-based posterior Monte Carlo during each iteration of PESTPP-GLM. Default is False, which will result in Monte Carlo only after iterations are done (depending on the *glm_num_reals* and *uncertainty* flags)                                                                                                                                                                                                                                                                                                                                     |
| *ensemble_output_precision*     | int                    | Number of significant digits to use in ASCII format ensemble files. Default is 6                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| *glm_norm_form(diag)*           | string                 | The form of the normal matrix to use. Can be “ident” (identity matrix lambda scaling), “diag” (use the diagonal of XtQX for lambda scaling) or “prior” (scale with the inverse of the prior parameter covariance matrix. Default is diag.s                                                                                                                                                                                                                                                                                                                    |
Table 6.3 PESTPP-GLM control variables. Variables which control parallel run management can be supplied in addition to these. See section 5.3.6.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 6. PESTPP-GLM
- **Subsection:** 6.4 Summary of PESTPP-GLM Control Variables

### Additional Summaries
- **Higher-Level Summary:** Chapter 6 discusses automatic user intervention in PEST for regularization methods in parameter estimation. It suggests identifying and temporarily fixing insensitive parameters to improve matrix condition number and objective function. Parameters like DOAUI and MAXAUI customize intervention behavior, with options for mitigating bad derivatives and improving sensitivity.
- **Detailed Summary:** Corrupted Jacobian matrix elements hinder parameter upgrades. An algorithm removes parameters with high sensitivity to improve the objective function, differing from AUI by removing parameters in decreasing sensitivity order. Setting DOAUI to "auid" activates an algorithm that mitigates bad derivatives by iteratively removing parameters starting with the most sensitive. SVD or LSQR disallow this, except for SVD-assisted estimation without SVD/LSQR for super parameters. Lowering MAXAUI reduces AUI iterations.

### Related Context
- **Previous Summary:** Table 6.3 lists optional PESTPP-GLM control variables (with defaults).  `PESTMODE` sets the mode.  Termination criteria, derivative settings, and SVD controls (MAXSING, EIGTHRESH) are from the PEST control file.  `glm_num_reals()` creates parameter/observation ensembles (CSV or JCB files if *save_binary(true)*). `glm_accept_mc_phi`, *jac_scale*, *tie_by_group*, and *iteration_summary* control other aspects of the inversion process.  Prior parameter uncertainties are from *parcov*. *forecasts()* enables forecast uncertainty analysis.
- **Next Summary:** PESTPP-SEN performs global sensitivity analysis (GSA) using Morris' (Morris 1991, Campolongo et al 2005) or Sobol's (Sobol 2001) methods (Saltelli et al 2004, 2008). Morris' method (efficient for slow models) provides mean and variance of parameter effects; Sobol's method (computationally expensive) reveals parameter nonlinearity and interactions.  GSA helps simplify models, identify important parameters, and improve intuition.  If all observation weights are zero, PESTPP-SEN resets them to 1.0 before calculating phi and group phi sensitivities.

### Metadata
- **Keywords:** base_jacobian, der_forgive, enforce_tied_bounds, ensemble_output_precision, glm_accept_mc_phi, glm_iter_mc, glm_norm_form, glm_num_reals, glm_rebase_super, hotstart_resfile, n_iter_base, rand_seed
- **Chunk ID:** 84e093247de5
- **Chunk Index:** 2
- **Previous Chunk ID:** 6a53bdc88a91
- **Next Chunk ID:** 29e5bbaa408c

---

## Context

### Summary
**Corrupted Jacobian matrix elements (unusually high values or entire columns affected by parameter thresholds) hinder parameter upgrades.  An algorithm iteratively removes parameters with maximum composite sensitivity until the objective function improves or further removal is unproductive;  it differs from AUI by removing parameters in decreasing sensitivity order.**

### Header
**6.4.1 General**

### Content
As was discussed in section 3.5 of this manual, calculation of finite-difference derivatives of model outputs with respect to adjustable parameters can be corrupted if the numerical behaviour of a model is poor. Corrupted elements of the Jacobian matrix are often recognised by the fact that their values are unusually high. However it is very difficult to know how high these values must be to qualify as being corrupted.
Another feature of corrupted derivatives is that if variation of one particular parameter causes a certain aspect of model functionality to cross an internal threshold that causes a discontinuity to arise in the relationship between that parameter and model outputs, then an entire column of the Jacobian will be corrupted because all model outputs will be affected. It follows that the parameter upgrade process may benefit from removal of this column from the Jacobian matrix. With its removal, other parameters may then be free to alter their values in ways that benefit the parameter upgrade process.
The following algorithm accommodates the presence of a corrupted column of the Jacobian matrix, mitigating its effect on parameter upgrade calculations.
1. Attempt a parameter upgrade.
2. If the objective function does not improve, identify the parameter with maximum composite sensitivity and remove that parameter from parameter upgrade calculations.
3. Attempt another parameter upgrade.
4. Repeat steps 2 and 3 until either the objective function is lowered, or until it becomes obvious that it will not be lowered through a continuation of this process.
5. During the next iteration of the parameter estimation process (when a fresh Jacobian matrix is available) repeat this process.
This sequence of steps is very similar to that discussed in the previous section through which PEST’s automatic user intervention functionality is implemented. The major difference is that instead of temporarily removing parameters from the parameter upgrade process in order of increasing composite sensitivity (starting from that of lowest composite sensitivity), parameters are removed in order of decreasing composite sensitivity, starting from that of highest composite sensitivity.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 6. Intervention
- **Subsection:** 6.4 Bad Derivatives Mitigation

### Additional Summaries
- **Higher-Level Summary:** Chapter 6 discusses automatic user intervention in PEST for regularization methods in parameter estimation. It suggests identifying and temporarily fixing insensitive parameters to improve matrix condition number and objective function. Parameters like DOAUI and MAXAUI customize intervention behavior, with options for mitigating bad derivatives and improving sensitivity.
- **Detailed Summary:** Corrupted Jacobian matrix elements hinder parameter upgrades. An algorithm removes parameters with high sensitivity to improve the objective function, differing from AUI by removing parameters in decreasing sensitivity order. Setting DOAUI to "auid" activates an algorithm that mitigates bad derivatives by iteratively removing parameters starting with the most sensitive. SVD or LSQR disallow this, except for SVD-assisted estimation without SVD/LSQR for super parameters. Lowering MAXAUI reduces AUI iterations.

### Related Context
- **Previous Summary:** AUIPHIRATSUF (real, default 0.8) determines when to stop automatic user intervention (AUI) iterations. AUIPHIRATACCEPT (real, default 0.99) sets the objective function improvement threshold for accepting AUI results. NAUINOACCEPT (integer, default 0.75*MAXAUI) sets the maximum number of AUI iterations without sufficient improvement before stopping.  AUI iterations are only performed if the objective function does not fall below NOAUIPHIRAT of its value for the previous iteration.
- **Next Summary:** Setting DOAUI to "auid" activates an algorithm that mitigates bad derivatives by iteratively removing parameters from upgrade calculations, starting with the most sensitive. This is disallowed if SVD or LSQR are used (except for SVD-assisted estimation without SVD/LSQR for super parameters). Table 6.1 lists default values for AUI variables when DOAUI="auid";  AUIPHIRATSUF compares objective functions differently than when DOAUI="aui".  Lowering MAXAUI reduces AUI iterations.

### Metadata
- **Keywords:** 
- **Chunk ID:** ee8deb37d116
- **Chunk Index:** 1
- **Previous Chunk ID:** 5ade76761954
- **Next Chunk ID:** 74f8d107a352

---
