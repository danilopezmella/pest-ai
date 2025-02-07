# Search Results for: What are the implications of using a risk-averse setting greater than 0.5 on the optimization outcome in PESTPP-OPT?

Keywords: None


## Context

### Summary
**PESTPP-OPT uses observation groups ("l_" or "less_" for ≤ constraints, "g_" or "greater_" for ≥ constraints) to define constraints on model outputs/prior information.  The *opt_constraint_groups* variable (comma-separated list) can override this. Zero weights disable constraints;  positive weights (if *opt_std_weights(true)*) are treated as standard deviations. At least one model output constraint is required; otherwise, PESTPP-OPT halts.**

### Header
**8.2.4 Constraints**

### Content
Constraints can be applied on model outputs (read from model output files using instruction files) or on prior information equations. PESTPP-OPT allows constraints to be either “less than” or “greater than” constraints; the latter are internally reformulated as “less than” constraints to meet the demands of the linear programming algorithm that it implements. Constraints are identified using observation groups. If an observation group contains “less than” constraints, then its name must begin with “l\_” (that is, the letter “el” followed by an underscore) or “less\_”; if an observation group contains “greater than” constraints then its name must begin with “g\_” or “greater\_”. Do not forget that prior information equations are also assigned to observation groups.
While the naming of observation groups in this way is sufficient to denote them as containing constraints, you can also nominate groups which contain constraints using the *opt_constraint_groups()* control variable. The value of this control variable is a comma-delimited set of observation groups. The name of each such group must begin with “l\_” or “g\_” (or “less\_” or “greater\_”) in accordance with the protocol described above so that PESTPP-OPT knows what type of constraints they are. If an *opt_constraint_groups()* keyword is supplied, and if a group name that begins with “l\_” or “g\_” (or “less\_” or “greater”) is omitted from the list of groups supplied through this variable, then members of that group do not comprise optimization constraints. They are therefore observations which comprise part of the calibration dataset (unless the pertinent observations are assigned weights of zero in the PEST control file).
It is important to note that weights assigned in the PEST control file to model outputs to which constraints are applied have no bearing on their operation, unless they are set to zero. If the weight associated with a constraint is set to zero, then the constraint is disabled. However, if the weight is positive, its value does not affect the strength with which the constraint is applied, with one exception: if the *opt_std_weights()* option is used, then the weight values for the non-zero weight constraints are treated as standard deviations (uncertainty) for use in the chance constraint process. This option can help speed up the repeated application of PESTPP-OPT by allowing users to pre-calculate constraint uncertainty through application of PREDUNC, pyEMU or through empirical constraint uncertainty estimation via ensembles. In this way, PESTPP-OPT does not need to solve any linear analysis equations and instead simply uses these standard deviations directly.
In the simplex algorithm, all constraints are “hard”. It is the nature of most constrained optimization problems that the solution to that problem lies at a “corner” of decision variable space that is defined by the intersection of constraint surfaces. In that corner, at least one constraint specification is exactly met.
In addition to constraints applied to model outputs and prior information equations, the upper and lower bounds on decision variables supplied in the “parameter data” section of a PEST control file comprise a further set of constraints which are respected by the constrained optimization process that is implemented by PESTPP-OPT. Obviously, these are applied to each decision variable individually.
As presently programmed, PESTPP-OPT requires that at least one constraint be applied to a model output. Hence if the only constraints that are specified in a PEST control file that is read by PESTPP-OPT are those on individual decision variables through their bounds, and/or on prior information equations that feature those decision variables, PESTPP-OPT will cease execution with an appropriate message.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 8. PESTPP-OPT
- **Subsection:** 8.2 Using PESTPP-OPT

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** In "predictive analysis" mode, PEST maximizes/minimizes a prediction (in the "predict" group) while keeping the objective function ≤ Φ0 (requires a prior "estimation" run).  It uses the same parameters, transformations, and observations as the estimation run.  Restarting uses `/r`, `/j`, `/d`, or `/s` (parallel runs).  Change limits remain important.  Screen output shows prediction values per iteration.  Results include the optimal prediction and parameter values.

### Related Context
- **Previous Summary:** *opt_obj_func* (prior information equation, file—Figure 8.1, or observation) defines PESTPP-OPT's objective function (Equation 8.4). *opt_direction* ("min" or "max") sets optimization direction.  If *opt_obj_func* is absent, coefficients default to 1.0.  The file must list all decision variables and their coefficients (space, tab, or comma-delimited; comment lines are ignored).
- **Next Summary:** PESTPP-OPT uses observations (excluding zero-weighted ones) and sensitivities (from the JCO file) for notional calibration (Equations 8.1-8.3), calculating posterior parameter uncertainties. Weights are inversely proportional to measurement noise standard deviations (PWTADJ2 can adjust weights); the objective function should approximate the number of non-zero-weighted observations.  Prior information equations are ignored unless they contain decision variables.  Zero weights omit observations from calibration;  a user-supplied posterior covariance matrix can replace the prior one.

### Metadata
- **Keywords:** 
- **Chunk ID:** 3d0667287a5c
- **Chunk Index:** 1
- **Previous Chunk ID:** 4dcf3c55ac23
- **Next Chunk ID:** e7440583ae79

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
**PESTPP-SEN performs global sensitivity analysis (GSA) using Morris' (Morris 1991, Campolongo et al 2005) or Sobol's (Sobol 2001) methods (Saltelli et al 2004, 2008). Morris' method (efficient for slow models) provides mean and variance of parameter effects; Sobol's method (computationally expensive) reveals parameter nonlinearity and interactions.  GSA helps simplify models, identify important parameters, and improve intuition.  If all observation weights are zero, PESTPP-SEN resets them to 1.0 before calculating phi and group phi sensitivities.**

### Header
**7.1.1 General**

### Content
The purpose of global sensitivity analysis (GSA) is to characterize how model parameters affect model outputs (or a function of model outputs such as an objective function) over a wide range of acceptable parameter values. In doing this, it strives for greater robustness, and for the provision of more information, than local sensitivity analysis based on partial derivatives of model outputs with respect to model parameters. Because local sensitivity analysis pertains to a single point in parameter space, the information that it yields is often insufficient to support an understanding of the behavior of nonlinear models whose outputs depend on combinations of model parameters in complicated and parameter-value-dependent ways.
The information provided by global sensitivity analysis differs widely between the different methodologies that implement it. In general, the more information that a global sensitivity analysis method provides, the greater is its computational burden. This information can vary from a simple measure of the influence that each parameter has on selected model outputs, to a complete description of how a parameter’s influence varies with its value, and the values of other model parameters. See Saltelli et al (2004; 2008) for an excellent coverage of these methods.
Global sensitivity analysis can support environmental modeling in at least the following ways.
1.  Once it is recognized that some parameters affect model outputs to only a limited extent, these parameters can be fixed at user-specified values while others are estimated through calibration. This can accrue considerable numerical savings in the calibration of models whose run times are long.
2.  Global sensitivity analysis may support construction of a simple model in place of a more complex one for use in calibration, uncertainty analysis and decision support.
3.  By establishing the parameters that are important, and the interactions between parameters that are important, much can be learned about the system which a model attempts to simulate. This information can sharpen the intuition of those who must manage that system.
PESTPP-SEN currently supports two GSA methods. These are
1.  the Method of Morris (Morris, 1991), with extensions proposed by Campolongo et al (2005), and
2.  the Method of Sobol (Sobol, 2001).
The Method of Morris is a “one-at-a-time” method (Saltelli et al, 2004). It is computationally efficient and is therefore suitable for use with models whose run times are high. It provides estimates of the first two moments (mean and variance) of the effect that each parameter has on a model output of interest. These statistics acknowledge that a parameter’s sensitivity may be a function not just of its own value, but of the values of other parameters. In doing so, they reveal those parameters that have the most influence on model outputs of interest, and the consistency of these influences over parameter space. The information that it provides may justify the omission of some parameters from a calibration exercise; and/or it may support the design of a simple, fast-running, surrogate model. In contrast, the Method of Sobol has the potential to provide much more detailed information than the Method of Morris. Because it is based on decomposition of variance (Saltelli et al, 2004), it can reveal details of parameter nonlinearity that are beyond the reach of other methods. It can also reveal complex parameter interactions and, by inference, interaction of the processes to which these parameters pertain. Unfortunately, this information comes with a high computational cost. Hence unless Sobol-based global sensitivity analysis is restricted to only a few parameters and a relatively fast-running model, it is generally computationally unaffordable.
IMPORTANT: Note that PESTPP-SEN records phi and group phi sensitivity metrics and these phi metrics rely on the weights in the \* observation data section of the control file. As such, if all observations have zero weight, then the phi and group phi summary metrics will be zero. PESTPP-SEN tries to counter this problem by resetting all weights to 1.0 if all weights are zero. Otherwise, it is up to users to make sure the weights are appropriate for summarizing phi sensitivities.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 7. PESTPP-SEN
- **Subsection:** 7.1 Introduction

### Additional Summaries
- **Higher-Level Summary:** PEST's sensitivity reuse feature in Chapter 7 reduces model runs by skipping low-sensitivity parameter recalculations, but is cautioned against for nonlinear problems. SVD-assist is a preferable alternative, with sensitivities recomputed every N iterations. Broyden updating remains active. DOSENREUSE in "control data" toggles this feature, with SENRELTHRESH, SENMAXREUSE, SENALLCALCINT, SENPREDWEIGHT, and SENPIEXCLUDE offering customization options.
- **Detailed Summary:** PEST's sensitivity reuse functionality (Chapter 7) reduces model runs by skipping recalculation of low-sensitivity parameters, but is not generally recommended, especially for nonlinear problems;  SVD-assist offers a better alternative. Sensitivities are recomputed every N iterations (user-defined).  Broyden updating still occurs regardless of the setting.

### Related Context
- **Previous Summary:** Table 6.3 shows optional PESTPP-GLM control variables (with defaults):  `der_forgive()`, `enforce_tied_bounds()`, `glm_accept_mc_phi()`, `rand_seed()`, `glm_rebase_super()`, `glm_iter_mc()`, `ensemble_output_precision()`, and `glm_norm_form()`.  These control derivative handling, bound enforcement, Monte Carlo acceptance, random seed, super parameter re-basing, iterative Monte Carlo, ensemble output precision, and normal matrix form.  Parallel run management variables (section 5.3.6) can also be used.
- **Next Summary:** To analyze parameter group sensitivities, tie all but one group member to the remaining parameter (the parent).  Alternatively, use the *tie_by_group()* control variable.  Ensure tied parameter values are realistic;  tied parameters' bounds are calculated at the start (reported to the run record file) to maintain bounds.  Global sensitivity analysis assesses joint sensitivity.

### Metadata
- **Keywords:** * observation data
- **Chunk ID:** 29e5bbaa408c
- **Chunk Index:** 1
- **Previous Chunk ID:** 84e093247de5
- **Next Chunk ID:** 3a16626e5778

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
