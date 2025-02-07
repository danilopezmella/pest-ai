# Search Results for: How does PESTPP-GLM utilize the NOPTMAX setting in calculating the Jacobian matrix?

Keywords: noptmax

## Variations
1. How is the NOPTMAX setting used by PESTPP-GLM to calculate the Jacobian matrix?
2. In what way does PESTPP-GLM apply the NOPTMAX setting during Jacobian matrix computation?
3. What role does the NOPTMAX setting play in the Jacobian matrix calculation in PESTPP-GLM?
4. Can you explain the use of the NOPTMAX setting in PESTPP-GLM for Jacobian matrix calculations?
5. How does PESTPP-GLM implement the NOPTMAX setting when calculating the Jacobian matrix?


## Context

### Summary
**PESTPP-GLM starts inversion with an initial model run (calculating the objective function and reference outputs) followed by Jacobian matrix calculations.  *hotstart_resfile()* reuses results from a previous initial run (case.res). *base_jacobian()* reuses a pre-calculated Jacobian matrix (case.jco or case.jcb, created using NOPTMAX=-1 or -2).  Using both options eliminates initial model runs.  Parallel runs are discussed in section 5.3.**

### Header
**6.2.7 Expediting the First Iteration**

### Content
In the normal course of events, PESTPP-GLM commences an inversion process by running the model in order to determine the value of the objective function based on initial parameter values. In doing this, it also determines the reference values of all model outputs for use in finite difference derivatives calculation. It then commences the long process of filling the Jacobian matrix. As has been explained, this requires at least as many model runs as there are adjustable parameters.
If model runs are parallelized (see section 5.3), then the first batch of parallelized model runs commissioned by PESTPP-GLM actually includes the initial model run, as well as those required for filling of the initial Jacobian matrix. However, if this initial model run has already been completed, then PESTPP-GLM can use the outcomes of this already-completed run rather than having to repeat it at the start of the inversion process. This action is instigated through use of the *hotstart_resfile()* control variable. The argument for this variable is the name of the residuals file (see below) which PESTPP-GLM recorded when it completed the initial model run. As is explained elsewhere in this manual, PESTPP-GLM can be run with the NOPTMAX termination control variable set to 0 specifically to undertake a single model run for the purpose of writing this (and other) files. A residuals file is named *case.res* where *case* is the filename base of the PEST control file.
Significant savings can also be made by employing an already-calculated Jacobian matrix for the first iteration of an inversion process. The *base_jacobian()* control variable instructs PESTPP-GLM to take this action. The value of this variable is the name of a Jacobian matrix (i.e., JCO) file. This file is named *case.jco* or *case.jcb* where *case* is the filename base of the PEST control file on which its calculation was based. This file can be produced by running PESTPP-GLM with the NOPTMAX control variable set to -1 or -2. (NOPTMAX is the first variable appearing on the eighth line of the “control data” section of a PEST control file.)
If both of the *hotstart_resfile()* and *base_jacobian()* options are selected at the same time, PESTPP-GLM does not need to run the model at all prior to calculating and testing parameter upgrades. This can sometimes be useful when fine-tuning PESTPP-GLM settings for optimal inversion performance.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 6. PESTPP-GLM
- **Subsection:** 6.2

### Additional Summaries
- **Higher-Level Summary:** Chapter 6 discusses automatic user intervention in PEST for regularization methods in parameter estimation. It suggests identifying and temporarily fixing insensitive parameters to improve matrix condition number and objective function. Parameters like DOAUI and MAXAUI customize intervention behavior, with options for mitigating bad derivatives and improving sensitivity.
- **Detailed Summary:** In unregularized inversions, insensitive parameters can lead to large adjustments beyond set limits, resulting in minimal objective function improvement. Increasing limits may not help; regularization or adjusting parameter sensitivity is recommended. Use the parameter sensitivity file to identify insensitive parameters and consider temporarily holding them at current values using the case.hld file.

### Related Context
- **Previous Summary:** In PESTPP-GLM's SVD-assisted inversion, *n_iter_base*=-1 performs one base iteration (for super parameter definition only). *max_n_super* controls the number of super parameters (efficient with RedSVD).  It saves base parameter values in case.par and case.bpa (identical to case.parb) for each iteration.  It saves JCO files as case.jco (super parameters) and case.jcb (base parameters).  Without SVD-assist, only case.jco (base parameters) is saved.
- **Next Summary:** PESTPP-GLM performs FOSM analysis (Fienen et al. 2010, Doherty 2015) if *uncertainty()* is true (default), using the last base parameter Jacobian matrix. It assumes linear model outputs, multi-Gaussian prior parameter/measurement uncertainties, and that observation noise standard deviation is proportional to the residual.  Prior parameter uncertainties are from *parcov* (covariance matrix file, *.unc*, *.cov*, *.jco*, *.jcb*) or default bounds.  It outputs a posterior covariance matrix (case.N.post.cov) and scaled weights (case.fosm_reweight.rei). Regularization information is ignored.

### Metadata
- **Keywords:** NOPTMAX, base_jacobian, hotstart_resfile
- **Chunk ID:** 91bd148bd25f
- **Chunk Index:** 1
- **Previous Chunk ID:** f1894a6f2c71
- **Next Chunk ID:** 1533e624167f

---

## Context

### Summary
**PEST and PEST++ programs store Jacobian matrices (sensitivities of model outputs to parameters) in binary JCO files (case.jco).  Columns represent parameters; rows represent observations. Log-transformed parameters use log-based derivatives. Utilities (JACWRIT, JCO2MAT, JROW2VEC, JCO2JCO, and PyEMU) provide ASCII conversion, manipulation, and subsetting. JCO files are used for sensitivity analysis, calibration (using the `/i` switch in PEST or *base_jacobian()* in PESTPP-GLM), and linear analyses (identifiability, uncertainty, data worth, model defects).  NOPTMAX=-1 or -2 generates JCO files only.**

### Header
**3.4 The Jacobian Matrix File**

### Content
Elements of a Jacobian matrix represent partial derivatives of model outputs with respect to model parameters. In the present context, “model outputs” are model-calculated numbers that are named in the “observation data” section of a PEST control file; these are read from model output files using instruction files. “Parameters” are those which are declared as adjustable in the “parameter data” section of a PEST control file.
Each column of the Jacobian matrix contains partial derivatives of model outputs with respect to a particular parameter. Each row of a Jacobian matrix contains partial derivatives of a particular model output with respect to all adjustable parameters. If a parameter is denoted as log-transformed in a PEST control file, then partial derivatives contained in a Jacobian matrix file are with respect to the log of that parameter.
In common with PEST, programs PESTPP-GLM and PESTPP-OPT of the PEST++ suite record the Jacobian matrix which they calculate in a binary, compressed file named *case.jco* where *case* is the filename base of a PEST control file. (This is commonly referred to as a “JCO file” in PEST parlance.) The protocol used by programs of the PEST++ suite for storage of a Jacobian matrix in a JCO file is identical to that used by PEST; see appendix 3.5. Hence this type of file is interchangeable between the two suites.
A number of utility programs provided with PEST record part or all of the contents of a JCO file in ASCII format where it can be read by a human being. See the JACWRIT, JCO2MAT and JROW2VEC utilities in particular. Another useful PEST utility is JCO2JCO. This builds a JCO file corresponding to a new PEST control file from that corresponding to an existing PEST control file, provided that the contents of the former file are a subset of those of the latter file. Other PEST utilities support the construction of a large JCO file from component JCO files built on the basis of smaller PEST (and hence PEST++) datasets. See part II of the PEST manual for details. PyEMU provides similar capabilities for JCO file manipulation within a Python environment.
A JCO file has many uses. Many of these uses are as important as the model calibration process itself. Hence it is not unusual for PEST or PESTPP-GLM to be run purely for the purpose of filling a Jacobian matrix and writing a JCO file. For either of these programs, this is achieved by setting the NOPTMAX variable in the “control data” section of the PEST control file to -1 or ‑2.
Uses to which a JCO file may be put include the following.
- Examination of local sensitivities of model outputs to parameters and/or decision variables.
- Giving PEST or PESTPP-GLM a “head start” in calibrating a model by providing it with a pre-calculated Jacobian matrix to use in its first iteration. PEST uses this matrix if started with the “/i” switch. For PESTPP-GLM this is achieved through use of the *base_jacobian()* control variable.
- To support the many types of linear analysis implemented by utility programs supplied with PEST, and functions provided by pyEMU; these calculate
  - parameter identifiability;
  - parameter and predictive uncertainty;
  - parameter contributions to predictive uncertainty;
  - data worth;
  - the effects of model defects.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 3. Some Important PEST++ Features
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** Poor PESTPP-GLM or PESTPP-OPT performance may indicate issues with finite-difference derivatives.  Use JACTEST, POSTJACTEST, and MULJCOSEN (Part II of the PEST manual) to assess derivative integrity.
- **Next Summary:** PEST and PEST++ programs typically minimize a least-squares objective function (Φ = Σ(wᵢrᵢ)²). Zero weights exclude observations.  Observations are grouped;  objective functions are calculated per group to balance contributions.  Tikhonov regularization adds measurement and regularization objective functions (Doherty 2015). Weighting considers measurement and structural noise (Doherty 2015, Doherty and Welter 2010, White et al. 2014).  PEST++, unlike PEST, doesn't support covariance matrices in objective functions.

### Metadata
- **Keywords:** NOPTMAX, base_jacobian
- **Chunk ID:** 4b9812b58a08
- **Chunk Index:** 1
- **Previous Chunk ID:** 906e5691bc49
- **Next Chunk ID:** f8904ba9b030

---

## Context

### Summary
**NOPTMAX (integer, 50 recommended) sets maximum iterations; 0 runs one model; -1 or -2 generates a JCO file.  PESTPP-GLM uses PHIREDSTP (real, 0.005), NPHISTP (integer, 4), NPHINORED (integer, 4), RELPARSTP (real, 0.005), and NRELPAR (integer, 4) for termination; PESTPP-IES uses all except RELPARSTP and NRELPAR. Other PEST++ programs use only NOPTMAX.**

### Header
**4.6.9 Eighth Line**

### Content
The eighth line of the “control data” section of a PEST control file holds variables which control termination of an inversion process. These are NOPTMAX, PHIREDSTP, NPHISTP, NPHINORED, RELPARSTP and NRELPAR. Suitable (PESTCHEK-friendly) values for these variables are provided in figure 4.2, namely 50, 0.005, 4, 4, 0.005 and 4. PESTPP-GLM uses all of these variables; PESTPP-IES uses all except RELPARSTP and NRELPAR. Other programs of the PEST++ suite use only NOPTMAX.
NOPTMAX, an integer variable, sets the maximum number of iterations that an inversion or optimization process is allowed to run. However, values of 0, -1 and -2 trigger behaviour that is dependent on the PEST++ program that reads the PEST control file.
If NOPTMAX is set to 0, PESTPP-GLM does not estimate parameters. Instead it completes one model run using parameter values supplied in the “parameter data” section of the PEST control file. It computes objective function components based on the result of this single model run. This can be used to ensure that PESTPP-GLM setup is correct, and that weights assigned to observations in the “observation data” section of the PEST control file are suitable.
If NOPTMAX is set to -1 or -2, PESTPP-GLM calculates a Jacobian matrix and stores it in a Jacobian matrix file (i.e., a JCO file). If asked to do so, it also calculates linear statistics based on that Jacobian matrix. It then ceases execution. The same Jacobian matrix is available for more complex linear analysis using pertinent PEST utilities, as well as PyEMU. The Jacobian matrix that is stored in the JCO file can also be put to other uses; see section 3.4.
PHIREDSTP is a real variable whereas NPHISTP is an integer variable. If, in the course of a PESTPP-GLM inversion process, there have been NPHISTP optimization iterations for which (Φ*i* - Φ*min* )/Φ*i* ≤ PHIREDSTP (Φ*i* being the objective function value at the end of the *i*th optimization iteration and Φmin being the lowest objective function achieved to date), PESTPP-GLM considers that the inversion process is at an end. Alternatively, if PESTPP-GLM has failed to lower the objective function over NPHINORED successive iterations, it ceases execution. PESTPP-IES supplies these same termination criteria to ensemble-mean objective functions.
If the magnitude of the maximum relative parameter change is less than RELPARSTP over NRELPAR successive iterations, then PESTPP-GLM ceases execution. The relative parameter change between iterations for any parameter is calculated using equation 3.2. PESTPP-GLM evaluates this change for all adjustable parameters at the end of all iterations, and determines the relative parameter change with the highest magnitude. If this maximum relative change is less than RELPARSTP, a counter is advanced by one; if it is greater than RELPARSTP, the counter is zeroed.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 4. The PEST Control File
- **Subsection:** 4.6 Control Data Section

### Additional Summaries
- **Higher-Level Summary:** Figure 4.2 in PEST software displays control data section variables. The text details options for writing matrices, files, and parameters, including settings for matrix and file saving, operational modes, precision, derivative handling, and convergence criteria. Optional features like sensitivity reuse and LSQR algorithm for solving inverse problems are discussed.
- **Detailed Summary:** The optional "automatic user intervention" section (section 6.3) governs automatic user intervention, activated by setting DOAUI to "doaui" in the "control data" section.  If omitted, default values are used.

### Related Context
- **Previous Summary:** PHIREDSWH (real, often 0.1) in the "control data" section controls switching from forward to central differences in PESTPP-GLM (FORCEN="switch") if the relative objective function reduction between iterations is ≤ PHIREDSWH.  It's ignored if differential evolution is used.  Equation 4.1 shows the condition for switching.
- **Next Summary:** ICOV, ICOR, and IEIG (integers) in the "control data" section are not used by PESTPP-GLM. Set them to 0 for PESTCHEK compatibility.

### Metadata
- **Keywords:** NOPTMAX, NPHINORED, NPHISTP, NRELPAR, PHIREDSTP, RELPARSTP
- **Chunk ID:** cbb14971764f
- **Chunk Index:** 1
- **Previous Chunk ID:** e113dd2e0863
- **Next Chunk ID:** e93b50160cd8

---

## Context

### Summary
**PESTLIN creates a linearized model from an existing PEST dataset (control and JCO files, requiring a PEST run with NOPTMAX=-1). It generates a GENLIN input file and a new PEST control file for faster linearized inversion or predictive uncertainty analysis.  Alternatively, it can be run after parameter estimation to use optimized parameter sensitivities.**

### Header
**14.5.1 General**

### Content
Use of PESTLIN assumes that a complete PEST input dataset exists for parameter estimation (regularised or otherwise), or predictive uncertainty analysis. It also assumes that a Jacobian matrix file exists for this dataset, together with a run record file in which parameter values pertinent to this Jacobian matrix are recorded. On the basis of this Jacobian matrix PESTLIN writes a GENLIN (see above) input dataset, encapsulating a linearised form of the model. It also writes a new PEST control file so that (regularised) inversion or predictive uncertainty analysis can be undertaken on the basis of the linearised model. Because this linearised model will generally run much faster than the real model, concepts can be tested and/or approximate solutions to these types of problems can be obtained, very quickly indeed.
In most cases the easiest way to build a linearised equivalent of a PEST input dataset (including a linearised equivalent of the model) is as follows.
1. As stated above, build an entire PEST input dataset based on the real model. Ensure that this dataset is correct and consistent using the PESTCHEK utility.
2. Set NOPTMAX to ‑1 in the pertinent PEST control file.
3. Run PEST. PEST will undertake enough model runs to calculate the Jacobian matrix. Then it will cease execution, recording initial parameter values, together with uncertainty statistics (if these are calculable), on its run record file.
4. Run PESTLIN.
Alternatively, PESTLIN can be run at the end of an entire parameter estimation process. In this case the Jacobian matrix file will contain sensitivities with respect to optimised parameter values (or, if a minor improvement in parameter estimates occurred on the last iteration, with respect to near‑optimised parameter values). Meanwhile the run record file will record optimised parameter values, together with model‑generated counterparts to measurements comprising the calibration dataset calculated on the basis of these optimised parameter values (unless PEST is run using SVD‑assist, in which case the PARREP utility should be employed to construct such a run record file by first constructing a new PEST control file on the basis of optimised parameters and then running PEST in the manner described above).

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 14. Miscellaneous Utilities
- **Subsection:** 14.5 PESTLIN

### Additional Summaries
- **Higher-Level Summary:** Observation re-referencing simplifies derivative calculations by adjusting initial model conditions based on upgraded parameters, improving solver convergence time. It involves creating reference model outputs for accurate derivatives, with specific commands and activation steps. SVDAPREP and BEOPEST support this feature, enhancing model accuracy and efficiency.
- **Detailed Summary:** SVDAPREP supports observation re-referencing (mode 1 only) by creating r_svdabatch.bat and d_svdabatch.bat from existing "r_" and "d_" prefixed files (adding PARCALC and PICALC commands). The new control file activates observation re-referencing and is ready for use.  Mode 2 is not supported with SVD-assisted parameter estimation.

### Related Context
- **Previous Summary:** GENLIN optionally creates a derivatives file (for use with PEST, Chapter 12, Part I) containing derivatives with respect to native (not log-transformed) parameters. This file can replace finite-difference derivatives, reducing PEST's computational burden.  Log-transformed parameters require additional calculations.
- **Next Summary:** PESTLIN linearizes a PEST dataset (pestincase.pst, .jco, .rec), creating a GENLIN dataset (linbasename.in, .out, .ins, .tpl) and a new PEST control file (pestoutcase.pst).  The `/d` switch enables external derivatives.  It handles tied parameters. Use `pestlin pestincase pestoutcase linbasename [/d]`.

### Metadata
- **Keywords:** NOPTMAX
- **Chunk ID:** ff1b7fa73d29
- **Chunk Index:** 1
- **Previous Chunk ID:** 9993028820b6
- **Next Chunk ID:** fe9c86ccbde4

---

## Context

### Summary
**In PESTPP-DA, *NOPTMAX* controls iterations; 0 performs a single model run using control file parameters; -1 performs a prior Monte Carlo analysis.  Both evaluate the control file parameters, simulated outputs, and update dynamic states per cycle.**

### Header
**12.2.1 Background and Basic Equations**

### Content
As with PESTPP-IES, PESTPP-DA uses the *NOPTMAX* control variable to define the number of iterations to apply the solution equation. And, as with PESTPP-IES, PESTPP-DA uses the *NOPTMAX* values of 0 and -1 to define a “control file parameter value” run (a single model run) and a prior Monte Carlo run, respectively. For the control file parameter value run, PESTPP-DA uses the values of parameters listed in the control file, along with the cycle information to advance through each cycle, evaluating the control file parameters, recording simulated outputs and updating dynamic states. As the name implies, the prior Monte Carlo analysis with PESTPP-DA evaluates the prior parameter ensemble for each cycle, recording the simulated outputs and updating the dynamic states.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 12. PESTPP-DA
- **Subsection:** 12.2 Theory

### Additional Summaries
- **Higher-Level Summary:** PEST uses pest.mmf to send messages before each run, indicating run type and parameter details. Different commands can be used for regular and derivative-calculating model runs, potentially reducing run time. Models can provide PEST with derivatives more efficiently, supporting various file formats. PEST control file variables manage model commands, messaging, and external derivatives.
- **Detailed Summary:** PEST sends messages (pest.mmf) to the model before each run.  The first line ("forward_model_run", "derivative_increment", or "external_derivatives") indicates the run type.  For "derivative_increment", the second line specifies the incremented parameter. Subsequent lines list parameter names, values, and status codes (0=adjustable untransformed, 1=adjustable log-transformed, -n=tied to parameter n, -1000000=fixed).  The message file is written to the working directory (or agent directory for Parallel PEST/BEOPEST).

### Related Context
- **Previous Summary:** Data assimilation combines uncertain model inputs (dynamic/static parameters, dynamic states) and observations to estimate parameters and states.  The forecast stage simulates an ensemble of model responses using the prior uncertainty of inputs. The update stage uses solution techniques (Evensen 2003, Emerick and Reynolds 2013, Chen and Oliver 2013) and observation noise to create a posterior ensemble. PESTPP-DA uses cycles to discretize the assimilation process and propagate dynamic states, unlike PESTPP-IES (batch estimation only).
- **Next Summary:** PESTPP-DA uses "time cycles" to control data assimilation frequency (hourly to decades).  Each observation/parameter/template/instruction file is assigned a cycle.  A cycle can be a single or multiple time steps or the entire simulation.  This allows flexible combinations of EnKF, EnKS, and ES.  Template and instruction files define model restarts.

### Metadata
- **Keywords:** NOPTMAX
- **Chunk ID:** 3ee6b985698a
- **Chunk Index:** 2
- **Previous Chunk ID:** 021b2391a5bb
- **Next Chunk ID:** 501a8163cf43

---
