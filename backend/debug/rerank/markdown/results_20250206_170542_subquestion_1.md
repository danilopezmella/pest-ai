# Search Results for: What is Pest++?

Keywords: None


## Context

### Summary
**This chapter (reproducing text from the seventh PEST manual) describes template and instruction files used by both PEST and PEST++ for non-intrusive model interfacing.**

### Header
**2.1 Introduction**

### Content
This chapter reproduces material from the seventh edition of the PEST manual. This reflects the fact that programs of both the PEST and PEST++ suites employ template and instruction files as the basis for their non-intrusive model interface.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 2.  The PEST(++) Model Interface
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** PEST software uses template, instruction, and control files for model input and output. Templates, created with text editor or software, are validated with TEMPCHEK, INSCHEK, and PESTCHEK. Parameters are replaced in templates, and model input files should match for precision. Instruction files extract model outputs. Precision is crucial for accurate derivative calculations.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** PEST++ programs read "observations" (model outputs) from model output files.  A PEST control file provides measured counterparts ("observations" with zero weight are predictions).  Predictions are used in uncertainty analyses and data worth analyses.
- **Next Summary:** PEST and PEST++ use template files (per model input file with parameters/decision variables), instruction files (per model output file), and a control file.  These files (created via text editor or specialized software) are checked using TEMPCHEK, INSCHEK, and PESTCHEK (Part II, Doherty 2018b). "Parameter" denotes parameters/decision variables; "observation" denotes numbers from model output files (including predictions).

### Metadata
- **Keywords:** 
- **Chunk ID:** d958d12cdc96
- **Chunk Index:** 1
- **Previous Chunk ID:** 112773e58ce3
- **Next Chunk ID:** b52992d44304

---

## Context

### Summary
**PEST++ programs (Table 1.1) perform various functions (inversion, optimization, sensitivity analysis, data assimilation) using a PEST control file for parameters, observations, and algorithm control.  They use a modular parallel run manager and TCP/IP communication.  PEST++ programs use template and instruction files for non-intrusive model interaction and ignore PEST++-specific control variables (++).**

### Header
**1.1 PEST++ and PEST**

### Content
The name “PEST++” refers to a suite of programs which have some things in common but which are also very different from each other. The names of all programs which comprise the suite begin with “PESTPP”. PEST stands for “Parameter ESTimation”.
PEST was released in 1995; it has been continually improved since then. It undertakes highly parameterized inversion of environmental models. In doing so, it runs a model many times, either sequentially or in parallel. It does this in a non-intrusive manner. Before it runs a model, it records parameter values that it wishes the model to use on that particular run via input files required by the model. User-prepared template files of model input files guide it in this task. After the model run is complete, PEST reads numbers from model output files which it then compares with field measurements. User-prepared instruction files guide it in this task. All other information which PEST requires is recorded in a PEST control file.
PESTPP-GLM is the original member of the PEST++ suite; it was originally named “PEST++” itself. Like PEST, PESTPP-GLM undertakes non-intrusive, highly parameterized inversion of an environmental model. As such, it can be considered as a direct replacement for PEST. While omitting some PEST functionality, it includes significant functionality that is absent from PEST. It uses the same template and instruction files that PEST uses to interact with a model. It reads a PEST control file to acquire information on problem definition. Like PEST, it can conduct model runs in serial or in parallel.
For all members of the PEST++ suite, parallelization of model runs follows the “manager” and “agent” concept. A user must start up agents in all folders in which he/she wishes that model runs be carried out. Agents can run on the same computer as the manager, on network-connected personal computers, on nodes of a high-performance computing cluster, and on the cloud. Agents communicate with their manager using the TCP/IP protocol. If the manager’s machine can be “pinged” from the agent’s machine, and if an agent’s machine can be “pinged” from the manager’s machine, then communication channels are open for parallelization of model runs. Whenever a member of the PEST++ suite requires that a model run be undertaken, its parallel run manager chooses a agent for the task, and then sends to the agent the numbers that must be written to model input files. Using template files, the agent writes these numbers to model input files; then it commands its local operating system to run the model. When the model run is complete, it reads model output files using instruction files. It then sends the numbers which it reads from these files back to the manager using TCP/IP.
One of the original design specifications of PESTPP-GLM was that its parallel run manager be modular, and separate from PESTPP-GLM, so that it could be used by any program that conducts non-intrusive, parallelized model runs for any purpose. It is this facet of its design that has spawned the development of other members of the PEST++ suite. At the time of writing, the composition of the PEST++ suite is listed in table 1.1.
| Program Name | Function                                                                                                  |
|------------------|---------------------------------------------------------------------------------------------------------------|
| PESTPP           | Highly parameterized inversion, and global optimization using differential evolution                          |
| PESTPP-SEN       | Global sensitivity analysis using the methods of Morris and Saltelli                                          |
| PESTPP-OPT       | Decision optimization under uncertainty using sequential linear programming and linearized chance constraints |
| PESTPP-IES       | Iterative ensemble smoother for production of a suite of calibration-constrained parameter fields             |
| PESTPP-SWP       | Undertakes a suite of parallelized model runs for any reason                                                  |
| PESTPP-DA        | Iterative ensemble filter and smoother data assimilation                                                      |
| PESTPP-MOU       | Single and multiple constrained optimization under uncertainty using evolutionary heuristics                  |
Table 1.1 Programs comprising of the PEST++ suite.
As well as containing a build-in parallel run manager (and hence of template and instruction files as a mechanism for non-intrusive communication with a model), the programs listed in table 1.1 have other commonalities. They all manipulate model parameters (which sometimes play the roles of decision variables). Most of them quantify mismatch between model outputs and field data. Information on parameters and field data is obtained from a PEST control file. So too is information that controls the way in which their algorithms operate.
Use of a PEST control file for storage of parameter, observation and control data was an important design consideration for the original version of PESTPP-GLM. This allowed interchangeable use with PEST. This remains a consideration for many members of the PEST++ suite.
When reading a PEST control file, most programs of the PEST++ suite obtain the values of control variables that are unique to that program from lines within the PEST control file that begin with the “++” string. PEST, and most of its associated utility software, ignores these lines. Interoperability of the PEST and PEST++ suites is thereby maintained.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 1. Introduction
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** To install PEST, copy its executables to a folder in the PATH variable for access from any directory. The suite includes PEST, Parallel PEST, BEOPEST, SENSAN, global optimizers, and utilities. PEST calibrates models by matching outputs to measurements, handling non-uniqueness through regularization. It quantifies uncertainties and supports decision-making by identifying unlikely events.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** This document references: Belsley et al. (1980) (regression diagnostics), Cook and Weisberg (1982) (regression residuals), Doherty (2015) (calibration and uncertainty), Doherty and Hunt (2009) (parameter identifiability), Hadi (1992) (influence measure), Hill and Tiedeman (2007) (groundwater model calibration), Koch (1999) (linear models), Lima et al. (2022) (data-space inversion), Sun and Durlofsky (2017) (uncertainty quantification), White et al. (2014) (model error), and Yager (1998) (influential observations).
- **Next Summary:** PEST++ programs create PEST-compatible parameter value (PAR) and Jacobian matrix (JCO) files. This interoperability allows PEST utilities (Doherty et al. 2018c) to process PEST++ results.  The PEST control file is also compatible.

### Metadata
- **Keywords:** 
- **Chunk ID:** 00e24a2e92bb
- **Chunk Index:** 1
- **Previous Chunk ID:** 6a90459bf216
- **Next Chunk ID:** 46d56be441df

---

## Context

### Summary
**This chapter, drawing from the seventh PEST manual, describes common features of PEST and PEST++ control files to facilitate understanding of control variable settings.**

### Header
**3.1 General**

### Content
Before describing the PEST control file, certain features that programs of the PEST++ suite have in common are discussed. This will make the task of explaining the settings of PEST and PEST++ control variables somewhat easier.
As for the previous and ensuing chapters of this manual, parts of the present chapter are taken from version 7 of the PEST manual.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 3. Some Important PEST++ Features
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** Instruction files are created using a text editor, model GUI, PEST utilities, or pyEMU.  Incorrect instructions may cause run-time errors or undetected issues. PEST++ programs check instruction/control file consistency (*check_tplins* disables this). PESTCHEK verifies all instruction files in a control file; INSCHEK verifies individual files and tests output reading. Observation names are limited to 20 characters.
- **Next Summary:** PEST++ programs adjust parameter values or their base-10 logarithms (specified by PARTRANS in the "parameter data" section), improving stability and speed.  Prior information must use log-transformed values for log-transformed parameters.  Programs report errors for invalid log transformations (initial value or lower bound ≤0). PAR2PAR (Part II) handles complex transformations.

### Metadata
- **Keywords:** 
- **Chunk ID:** 2a3314cb00c1
- **Chunk Index:** 1
- **Previous Chunk ID:** c6acc3e4e825
- **Next Chunk ID:** ae4f52f7b5a7

---

## Context

### Summary
**PESTPP-IES performs iterative ensemble smoothing (described by White 2018, including examples, and Chen and Oliver 2013, including theory and examples).  Refer to these sources for details.**

### Header
**9.1.1 Publications**

### Content
PESTPP-IES is described by White (2018). The reader is referred to that paper for a description of what it does and how it works, together with an example of its use. Chen and Oliver (2013) describe in detail the theory on which the iterative ensemble smoother methodology implemented by PESTPP-IES rests; they also provide deployment examples.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 9. PESTPP-IES
- **Subsection:** 9.1 Introduction

### Additional Summaries
- **Higher-Level Summary:** Tikhonov regularization in PEST enhances stability by reducing error variance and incorporating expert knowledge. Use IREGADJ, SVD, or LSQR with MAXSING and EIGTHRESH settings for stability. PEST stops after NOPTMAX iterations, reaching target objectives, minimal parameter changes, or slow improvement. Regularization mode categorizes observations into "regul" groups, adjusting weights with a regularization weight factor.
- **Detailed Summary:** Tikhonov regularization enhances stability by reducing error variance and incorporating expert knowledge. To ensure stability, use IREGADJ, SVD, or LSQR with MAXSING and EIGTHRESH settings. PEST stops after NOPTMAX iterations, reaching target objectives, minimal parameter changes, or slow improvement. User termination is recommended, especially in early calibration.

### Related Context
- **Previous Summary:** Table 8.2 lists optional PESTPP-OPT control variables (with defaults):  `opt_dec_var_groups`, `opt_external_dec_var_groups`, `opt_constraint_groups`, `opt_obj_func`, `opt_direction`, `opt_risk`, `opt_recalc_chance_every`, `parcov`, `par_sigma_range`, `opt_iter_tol`, `base_jacobian`, `hotstart_resfile`, `opt_coin_log`, `opt_std_weights`, `opt_skip_final`, `tie_by_group`, `enforce_tied_bounds`, `opt_stack_size`, and `opt_par_stack`/`opt_obs_stack`.  Parallel run variables are in section 5.3.6.
- **Next Summary:** PESTPP-IES quantifies model prediction uncertainties (arising from parameter uncertainty) by sampling the posterior parameter distribution (Equation 9.1: P(k\|h) = P(h\|k)P(k)), which is more useful than the prior distribution P(k) in decision-making contexts.  It uses an iterative ensemble smoother (less computationally expensive than MCMC, especially for many parameters),  handling parameter sets generated internally (using *parcov*) or externally (e.g., RANDPAR3, PyEMU, or SGEMS).  It does not assume model linearity.

### Metadata
- **Keywords:** 
- **Chunk ID:** 723c76593a2c
- **Chunk Index:** 1
- **Previous Chunk ID:** bc706cf8a1bc
- **Next Chunk ID:** 7172af38ed19

---

## Context

### Summary
**PESTPP-GLM (originally PESTPP) is a modular, object-oriented C++ program offering PEST's functionality and improved performance. It performs highly parameterized inversion and (optionally) global optimization using differential evolution, controlled by control variables. It uses a built-in parallel run manager.**

### Header
**6.1 Introduction**

### Content
PESTPP-GLM was the original member of the PEST++ suite; its original name was “PESTPP”. The intention behind its creation was to reproduce much of the functionality of PEST in code that is modular, object oriented and supportive of collaborative programming. At the same time, it was hoped that certain aspects of PEST’s performance could be improved by taking advantage of the “new slate” that was offered by PESTPP-GLM.
Like all versions of the PEST++ suite, PESTPP-GLM is written in C++. PESTPP-GLM uses a built-in parallel run manager.
Like PEST, PESTPP-GLM undertakes highly parameterized inversion. However, if requested, it can also undertake global optimization using the differential evolution (DE) method. The task that it implements on any given run is determined by the values that are supplied for pertinent control variables.
 6.2 Highly Parameterized Inversion

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 6. PESTPP-GLM
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** Chapter 6 discusses automatic user intervention in PEST for regularization methods in parameter estimation. It suggests identifying and temporarily fixing insensitive parameters to improve matrix condition number and objective function. Parameters like DOAUI and MAXAUI customize intervention behavior, with options for mitigating bad derivatives and improving sensitivity.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** PEST++ programs create temporary binary run storage files (case.rns, case.rnu, case.rnj, case=control file base name) for parallel run management and restarts. These files are deleted on graceful exit and can be processed using pyEMU.
- **Next Summary:** PESTPP-GLM uses gradient methods (repeated linearization, Doherty 2015) to calibrate models (Equation 6.1: h=Zk+ε).  Tikhonov regularization (PESTMODE="regularization", "regul" groups) adds constraints (Equation 6.2).  Parameter estimates (k) are calculated iteratively (Equation 6.3, incorporating Marquardt lambda in Equation 6.5 for nonlinear models). The objective function (Փ, Equation 6.6) sums weighted squared discrepancies,  including measurement (Փm) and regularization (Փr) components (Equation 6.7).

### Metadata
- **Keywords:** 
- **Chunk ID:** 5856de1d97ed
- **Chunk Index:** 1
- **Previous Chunk ID:** 8f7c85ac1a26
- **Next Chunk ID:** f6bcfffaff4d

---
