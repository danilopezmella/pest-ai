# Search Results for: How does PESTPP-OPT manage the calculation of Jacobian matrix elements?

Keywords: None

## Variations
1. Can you explain how PESTPP-OPT calculates the elements of the Jacobian matrix?
2. What method does PESTPP-OPT use to calculate the elements of the Jacobian matrix?
3. How is the Jacobian matrix elements computation handled by PESTPP-OPT?
4. In what way does PESTPP-OPT perform the calculation of Jacobian matrix elements?
5. What process does PESTPP-OPT follow to compute the elements of the Jacobian matrix?


## Context

### Summary
**PESTPP-OPT calculates derivatives of constraint-relevant model outputs using finite differences (controlled by parameter group settings), unless using external derivatives (*base_jacobian*).  The J matrix (calibration outputs vs. parameters) and y vector (constraint outputs vs. parameters) are updated every *opt_recalc_fosm_every* iterations (default 1).  If all calibration observation weights are zero or there are no calibration observations,  PESTPP-OPT uses prior parameter uncertainties (*parcov*) for δo calculations.**

### Header
**8.2.9 Jacobian and Response Matrices**

### Content
During every iteration of the constrained optimization process, PESTPP-OPT calculates derivatives of model outputs to which constraints are applied to decision variables whose values are optimized. In accordance with the normal PEST/PEST++ protocol, control variables which govern calculation of finite-difference derivatives are read from the “parameter data” section of the PEST control file.
Unless *opt_risk()* is set to 0.5, PESTPP-OPT must obtain partial derivatives which comprise the J and y vectors appearing in equations 8.1 to 8.3. The J matrix contains partial derivatives of calibration-relevant model outputs to parameters featured in the PEST control file which are not decision variables. The y vector contains partial derivatives of model outputs to which constraints are applied to these same parameters. These partial derivatives are also calculated using finite parameter differences.
Unlike derivatives of model outputs with respect to decision variables, derivatives of model outputs with respect to model parameters do not necessarily need to be re-calculated during every iteration of the PESTPP-OPT optimization process. In fact, PESTPP-OPT can calculate values for δ*o* using a set of derivatives that are supplied externally, at the start of the optimization process (see below). It is possible, however, that sensitivities of model outputs to parameters will change with the values of decision variables. If a user is worried about this, he/she can inform PESTPP-OPT that it should update the J matrix and y vector every now and then. The iteration update interval is set through the *opt_recalc_fosm_every()* control variable. This must be provided as an integer. If it is set to 1, then J and y are updated at the beginning of every iteration of the constrained optimization process. If it is set to 2, then J and y are calculated at the beginning of the constrained optimization process (if they are not supplied externally), and then at the beginning of every second iteration of that process. A similar protocol applies for higher values of this variable. On the other hand, if *opt_recalc_fosm_every()*is set to an exceedingly high value, then J and y are not updated at all. Nor, therefore, is the value for δ*o* updated for all model outputs to which chance constraints are applied.
It may be possible to avoid calculation of at least some partial derivatives through use of the *base_jacobian()* control variable that is described in documentation for PESTPP-GLM (see section 6.2.7). Recall that the value of this variable is the name of a binary Jacobian matrix file (with extension *.jco* or *.jcb*). If this file provides sensitivities for all calibration-relevant model outputs with respect to all model parameters, then PESTPP-OPT does not need to undertake any model runs for calculation of J during the first iteration of the optimization process. If it also includes sensitivities of constraint-relevant model outputs to all model parameters, then calculation of y during the first iteration of the optimization process is also avoided. If it also includes sensitivities of constraint-relevant model outputs to all decision variables, then calculation of optimization sensitivities during the first iteration of the optimization process is precluded. After reading an external Jacobian matrix, PESTPP-OPT works out for itself what model runs must be undertaken during the first iteration of the optimization process to calculate partial derivatives that are missing from this matrix.
Filling of the J matrix of equations 8.1 and 8.2 can also be avoided if weights assigned to all calibration-relevant observations in the “observation data” section of the PEST control file are set to zero, or if no calibration-relevant observations are included in this section at all. This signifies to PESTPP-OPT that the model is uncalibrated. PESTPP-OPT then uses prior parameter uncertainties, rather than posterior parameter uncertainties, for calculation of δ*o* values for constraint-relevant model outputs. Using the *parcov()* control variable, a user may wish to supply a covariance matrix to PESTPP-OPT instead of letting PESTPP-OPT calculate prior parameter uncertainties itself from parameter bounds (and/or optional *standard_deviation* in external files). Under these circumstances he/she may wish to provide PESTPP-OPT with a posterior parameter covariance matrix instead of a prior covariance matrix. Because PESTPP-OPT “thinks” that this is a prior parameter covariance matrix, and because it has been informed that this matrix does not need modification in accordance with the notional calibration exercise that is embedded in equations 8.1 and 8.2, it simply uses this matrix for calculation of δ*o*; it does not expend model runs to calculate J. This strategy can speed up the optimization process considerably, at the same time as it ensures that δ*o* is calculated using post-calibration uncertainties.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 8. PESTPP-OPT
- **Subsection:** 8.2 Using PESTPP-OPT

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** In "predictive analysis" mode, PEST maximizes/minimizes a prediction (in the "predict" group) while keeping the objective function ≤ Φ0 (requires a prior "estimation" run).  It uses the same parameters, transformations, and observations as the estimation run.  Restarting uses `/r`, `/j`, `/d`, or `/s` (parallel runs).  Change limits remain important.  Screen output shows prediction values per iteration.  Results include the optimal prediction and parameter values.

### Related Context
- **Previous Summary:** *opt_risk* (0.0-1.0) controls risk in PESTPP-OPT. 0.5 is risk-neutral (δo=0, no uncertainty calculations).  >0.5 is risk-averse; constraints are applied to *o* ± δ*o* (upper/lower bound of the confidence interval, respectively). <0.5 is risk-tolerant; constraints are applied to *o* ∓ δ*o*.  δ*o* is calculated based on the model output's standard deviation.
- **Next Summary:** PESTPP-OPT uses sequential linear programming (SLP), iteratively solving a linearized problem.  Termination occurs when objective function/decision variable changes are ≤ *opt_iter_tol* (default 0.001).  *opt_coin_log* (1-4) controls the verbosity of the SLP solution history (case.coin_log).  J and y matrices are recalculated every *opt_recalc_fosm_every* iterations to partially accommodate nonlinearities.

### Metadata
- **Keywords:** base_jacobian, parcov
- **Chunk ID:** f37e2862cb8c
- **Chunk Index:** 1
- **Previous Chunk ID:** 0d422662ecd4
- **Next Chunk ID:** ec6be79c7073

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
**Utilities manipulate Jacobian matrices (JCO files): JCO2JCO, JCOCOMB create new JCO files; JCOPCAT, JCOORDER, JCOSUB, JCOADDZ combine partial matrices; JROW2VEC extracts rows; JACWRIT converts to ASCII; JCOCHEK checks compatibility; JCO2MAT/MAT2JCO convert between formats; WTSENOUT weights the matrix.  Part II includes further matrix operations.**

### Header
**1.7.6 Jacobian and General Matrix Manipulation**

### Content
The filling of a Jacobian matrix may require that many model runs be undertaken. A number of utilities are provided that manipulate, transform, decompose and re-compose this matrix. Among other benefits, these can reduce the need to waste model runs in re-computing this matrix if the parameter and/or observation composition of the inverse problem is altered. JCO2JCO and JCOCOMB can be used to build a Jacobian matrix file (i.e. a “JCO file”) for a new PEST control file which features the same, or fewer, observations and/or parameters as an existing PEST control file. JCOPCAT, JCOORDER, JCOSUB and JCOADDZ assist in formulating a new Jacobian matrix from partial Jacobian matrices. JROW2VEC can be used to extract a single row from a Jacobian matrix. This can be useful in linear predictive uncertainty analysis where that row contains sensitivities of a prediction to adjustable parameters. JACWRIT rewrites a binary Jacobian matrix file as an ASCII file. JCOCHEK checks the compatibility of a Jacobian matrix file with a PEST control file. JCO2MAT rewrites a Jacobian matrix contained in a JCO file in PEST matrix file format where it can be subjected to matrix-based analysis and/or transferred between WINDOWS and UNIX platforms. MAT2JCO does the opposite to this. WTSENOUT replaces a Jacobian matrix with a weighted Jacobian matrix. Utility software documented in part II of this manual also includes a collection of programs which perform a suite of inversion-relevant matrix operations that include singular value decomposition, and formulation of a so-called “normal matrix” from a Jacobian matrix.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 1. Introduction
- **Subsection:** 1.7 Some Common Tasks

### Additional Summaries
- **Higher-Level Summary:** To install PEST, copy its executables to a folder in the PATH variable for access from any directory. The suite includes PEST, Parallel PEST, BEOPEST, SENSAN, global optimizers, and utilities. PEST calibrates models by matching outputs to measurements, handling non-uniqueness through regularization. It quantifies uncertainties and supports decision-making by identifying unlikely events.
- **Detailed Summary:** This section introduces PEST's capabilities, including utilities like PESTGEN for file creation, TEMPCHEK for file integrity, and EIGPROC for inversion results. Other utilities adjust weights, analyze worth, and manipulate matrices. Part II covers additional matrix operations and global optimizers if needed. Groundwater and Surface Water Utilities are documented separately.

### Related Context
- **Previous Summary:** SUBREG1 removes regularization; PWTADJ2 adjusts weights for linear analysis. PREDUNC utilities and PREDVAR utilities (also accessible via GENLINPRED) explore parameter and predictive uncertainty/variance. INFSTAT, INFSTAT1, SUPOSBPAR, SUPOBSPAR1 analyze observation worth.  PREDVAR1B and PREDVAR1C analyze model defect effects.
- **Next Summary:** JACTEST runs a model to check finite-difference derivative integrity; POSTJACTEST processes and plots results.  If inadequate integrity is found, SCEUA_P and CMAES_P global optimizers can be used instead of PEST.

### Metadata
- **Keywords:** 
- **Chunk ID:** e094acef5618
- **Chunk Index:** 1
- **Previous Chunk ID:** bb396329cf52
- **Next Chunk ID:** 2ce26efff70a

---

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
**PESTPP-OPT uses sequential linear programming (SLP), iteratively solving a linearized problem.  Termination occurs when objective function/decision variable changes are ≤ *opt_iter_tol* (default 0.001).  *opt_coin_log* (1-4) controls the verbosity of the SLP solution history (case.coin_log).  J and y matrices are recalculated every *opt_recalc_fosm_every* iterations to partially accommodate nonlinearities.**

### Header
**8.2.10 Solution Convergence**

### Content
Notwithstanding the nonlinear nature of most models, the constrained optimization problem that is solved by PESTPP-OPT is formulated as a linear problem. Model nonlinearities are accommodated by solving this problem in a progressive fashion through a series of iterations in which sensitivities to decision variables are re-calculated during every iteration. This sequential linear programming (SLP) process is deemed to be complete when neither the objective function, nor any decision variable, changes by more than a certain (small) amount from one iteration to the next. This amount is supplied by the user as the value of the *opt_iter_tol()* control variable. PESTPP-OPT provides a default value of 0.001 for this variable.
As was stated above, PESTPP-OPT uses the open source CLP library supplied by the Computational Infrastructure for Operational Research (COIN-OR) project. This algorithm provides a history of the SLP solution process, with a level of detail that is set by the calling program. A PESTPP-OPT user can gain access to this history using the *opt_coin_log()* control variable. An integer in the range 1 to 4 must be supplied for its value, with a higher value requesting greater verbosity. The record is written to a file named *case.coin_log* where *case.pst* is the PEST control file whose name is supplied on the PESTPP-OPT command line.
Nonlinearities of constraint-relevant model outputs with respect to parameters which are not decision variables can be accommodated through intermittent re-calculation of J and y during the SLP process. However, it is important to keep in mind that this strategy constitutes only partial accommodation of this type of nonlinearity, as model parameters which are not decision-variables are not actually varied from iteration to iteration of the SLP process. Re-calculation of J and y accommodates only the effect that changes in the values of decision variables have on these sensitivities. It does not accommodate changes in J and y that may be incurred by variability of model parameters over ranges denoted by their posterior uncertainties. Nor does it accommodate the fact that equations 8.1 to 8.3 assume model linearity with respect to these parameters.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 8. PESTPP-OPT
- **Subsection:** 8.2 Using PESTPP-OPT

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** In "predictive analysis" mode, PEST maximizes/minimizes a prediction (in the "predict" group) while keeping the objective function ≤ Φ0 (requires a prior "estimation" run).  It uses the same parameters, transformations, and observations as the estimation run.  Restarting uses `/r`, `/j`, `/d`, or `/s` (parallel runs).  Change limits remain important.  Screen output shows prediction values per iteration.  Results include the optimal prediction and parameter values.

### Related Context
- **Previous Summary:** PESTPP-OPT calculates derivatives of constraint-relevant model outputs using finite differences (controlled by parameter group settings), unless using external derivatives (*base_jacobian*).  The J matrix (calibration outputs vs. parameters) and y vector (constraint outputs vs. parameters) are updated every *opt_recalc_fosm_every* iterations (default 1).  If all calibration observation weights are zero or there are no calibration observations,  PESTPP-OPT uses prior parameter uncertainties (*parcov*) for δo calculations.
- **Next Summary:** PESTPP-OPT uses a PEST control file  (section 5.3 details parallel run management variables) to manage parallel model runs, similar to other PEST++ suite programs.

### Metadata
- **Keywords:** 
- **Chunk ID:** ec6be79c7073
- **Chunk Index:** 1
- **Previous Chunk ID:** f37e2862cb8c
- **Next Chunk ID:** 878845b6c3b0

---
