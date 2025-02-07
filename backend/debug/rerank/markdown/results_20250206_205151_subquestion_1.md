# Search Results for: What is the difference between PEST and PEST-GLM?

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
**This section introduces PEST's capabilities by listing tasks and associated programs,  even referencing concepts explained later in the manual.  It aims to familiarize new users with PEST and its utilities.**

### Header
**1.7.1 General**

### Content
The purpose of this section is to identify a number of tasks that can be undertaken using the PEST family of software, and to list the PEST-suite programs which can be used to carry out these tasks. Even though reference is made to files and concepts which are explained later in this manual, this section introduces a new user to the capabilities offered by PEST and its ancillary utility software.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 1. Introduction
- **Subsection:** 1.7 Some Common Tasks

### Additional Summaries
- **Higher-Level Summary:** To install PEST, copy its executables to a folder in the PATH variable for access from any directory. The suite includes PEST, Parallel PEST, BEOPEST, SENSAN, global optimizers, and utilities. PEST calibrates models by matching outputs to measurements, handling non-uniqueness through regularization. It quantifies uncertainties and supports decision-making by identifying unlikely events.
- **Detailed Summary:** This section introduces PEST's capabilities, including utilities like PESTGEN for file creation, TEMPCHEK for file integrity, and EIGPROC for inversion results. Other utilities adjust weights, analyze worth, and manipulate matrices. Part II covers additional matrix operations and global optimizers if needed. Groundwater and Surface Water Utilities are documented separately.

### Related Context
- **Previous Summary:** PEST reduces computational burden via parallel processing (Parallel PEST, BEOPEST), using super parameters (SVD-assist) for efficient sensitivity calculations, and employing surrogate models (observation re-referencing) for faster derivative calculations, all potentially parallelized.
- **Next Summary:** PESTGEN, Groundwater/Surface Water utilities aid PEST input file creation; TEMPCHEK, INSCHEK, and PESTCHEK check file integrity. PWTADJ1 and WTFACTOR adjust weights. EIGPROC and PHISTATS summarize inversion results; PARREP populates new control files.

### Metadata
- **Keywords:** 
- **Chunk ID:** 41dda665a758
- **Chunk Index:** 1
- **Previous Chunk ID:** 30652bfd50c7
- **Next Chunk ID:** 4d55e9e38ac5

---

## Context

### Summary
**Henceforth, "PESTPP-XXX" denotes any program in the PEST++ suite (Table 1.1).**

### Header
**5.1 General**

### Content
To simplify the following discussion, let PESTPP-XXX signify the name of a program belonging to the PEST++ suite. This can be any of the programs listed in table 1.1.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 5. Running PEST++ Programs
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** The text stresses the importance of post-inversion analysis with PEST utility software. It advocates for multiple runs, model revision for poor fits, and subjective evaluation of model-measurement misfit. Regularization, parameter reasonableness, and removal of insensitive parameters are crucial. Tools like EIGPROC, SSSTAT, and GENLINPRED assist in analysis, culminating in a final model run with optimized parameters or manual adjustments.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** Figure 4.13 shows an enhanced PEST++ control file using external files for parameter data, observation data, model input, model output, and prior information.  File locations are relative to the control file.  Optional parsing instructions ("sep", "missing_values") are included.  It uses  `ies_par_en` to specify the parameter ensemble file.
- **Next Summary:** PEST++ programs run models serially or in parallel via system calls using a command from the "model command line" section.  Ideally, the model and related files are in the PEST++ working directory or a PATH directory; otherwise, use full/relative pathnames in the control file.  This applies to executables in batch/shell scripts as well.

### Metadata
- **Keywords:** 
- **Chunk ID:** 5f317df4eb08
- **Chunk Index:** 1
- **Previous Chunk ID:** 9fa90ab599ae
- **Next Chunk ID:** 5a50a27769f9

---

## Context

### Summary
**This chapter details methods for efficiently calibrating models with tens of thousands of parameters using PEST;  these methods are necessary for optimal performance.**

### Header
**15.1 Introduction**

### Content
This chapter discusses a number of devices that are offered by PEST for calibration of models that employ tens of thousands of parameters. PEST can performed well in these settings, but will not do so unless at least some of the measures outlined herein are adopted.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 15. Large Numbers of Parameters
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter discusses efficient calibration methods for models with tens of thousands of parameters using PEST. Adjoint techniques are recommended for highly parameterized models. Use compressed binary external derivatives files, 64-bit versions of PEST for large problems, and optimize Jacobian matrix storage. Prioritize linearity of regularization constraints and activate memory conservation for improved efficiency.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** Normal restart functionality and the `/i` and `/p1` switches work with observation re-referencing, except that the `/p1` switch is not allowed with BEOPEST when model run partitioning is activated because of management complexity.
- **Next Summary:** For highly parameterized models (tens of thousands), model-calculated derivatives (adjoint techniques, Chapter 12) are necessary due to the excessive number of model runs and imprecision of finite differences.  Compressed binary external derivatives files are recommended; elements should be ordered by observation then parameter for optimal efficiency.

### Metadata
- **Keywords:** 
- **Chunk ID:** b40a94d10b5e
- **Chunk Index:** 1
- **Previous Chunk ID:** 516682e612d8
- **Next Chunk ID:** 5d358602f4e2

---
