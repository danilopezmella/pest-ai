# Search Results for: How do PESTPP-GLM and PESTPP-OPT handle poor numerical integrity of finite-difference derivatives?

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

## Context

### Summary
**Gradient methods may find local optima in nonlinear inverse problems.  However, parameter nonuniqueness due to null spaces is often mistaken for local optima.  Regularization and multi-component objective functions can mitigate this, as can improved model algorithms.**

### Header
**1.6.5 Local Optima**

### Content
Extreme inverse problem nonlinearity may lead to local optima in the calibration objective function. A common complaint made against gradient methods is that they may find a local optimum instead of the global optimum.
This assertion must be seen in context. While the existence of local optima in some calibration contexts is undeniable, there have been many occasions in the literature where parameter nonuniqueness born of the existence of a null space, has been mistaken for parameter nonuniqueness born of local optima. Gradient methods, with their ability to incorporate sophisticated regularisation schemes in the inversion process, work comfortably in the former context. Regularisation can help in the latter context as well, as can formulation of a multi-component objective function that reflects the information content of various components of the observation dataset; see White et al (2014) and Doherty (2015) for details. Furthermore, as Kavetski et al (2006) point out, sometimes local optima arise as an unwanted outcome of a poor model algorithm.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 1. Introduction
- **Subsection:** 1.6 Some Practical Considerations

### Additional Summaries
- **Higher-Level Summary:** To install PEST, copy its executables to a folder in the PATH variable for access from any directory. The suite includes PEST, Parallel PEST, BEOPEST, SENSAN, global optimizers, and utilities. PEST calibrates models by matching outputs to measurements, handling non-uniqueness through regularization. It quantifies uncertainties and supports decision-making by identifying unlikely events.
- **Detailed Summary:** PEST is a modeling tool that runs via system calls with command-line access, benefiting from the model's directory in the PATH variable. It supports batch files, pre- and post-processors, and multiple simulators. To avoid errors, batch files should delete intermediate files. PEST interacts with ASCII template and instruction files, converting binary files with a postprocessor. Gradient methods for inversion require calculable derivatives, with considerations for non-continuous model outputs and local optima. Regularization and multi-component objectives can address parameter nonuniqueness. PEST optimizes computational efficiency through parallel processing, super parameters, and surrogate models.

### Related Context
- **Previous Summary:** PEST uses gradient methods for inversion, requiring calculable derivatives computed via finite differences.  Non-continuous model outputs may necessitate using three or five-point derivatives or rejecting problematic ones.  For models with discontinuous outputs,  global methods (SCEUA_P and CMAES_P) are available, but have limitations compared to gradient methods.  Model output precision and solver convergence criteria impact derivative accuracy.
- **Next Summary:** PEST reads model outputs ("observations") from instruction files, including predictions (weighted zero) alongside calibration data.  Predictive analysis and Pareto modes utilize predictions, while sensitivity analysis may include them with or without affecting parameter estimation.

### Metadata
- **Keywords:** 
- **Chunk ID:** f08922aedd37
- **Chunk Index:** 1
- **Previous Chunk ID:** 3b21ee16db48
- **Next Chunk ID:** 1aeee8517360

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
