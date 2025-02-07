# Search Results for: How do I use pest-opt?

Keywords: None


## Context

### Summary
**PESTPP-OPT (described by White et al. 2018, and Wagner and Gorelick 1987) performs decision optimization under uncertainty using sequential linear programming.  Examples of its use are provided in White et al. (2018).**

### Header
**8.1.1 A Publication**

### Content
PESTPP-OPT is described by White et al (2018), where examples of its use are also provided. The following description summarizes information available from this source. See also Wagner and Gorelick (1987) where a similar methodology is described.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 8. PESTPP-OPT
- **Subsection:** 8.1 Introduction

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** In "predictive analysis" mode (Doherty 2015, section 8.4), PEST maximizes/minimizes a prediction while maintaining the objective function below a threshold, assessing post-calibration uncertainty.  This works best with few parameters and a well-posed inverse problem; otherwise, use linear analysis, Monte Carlo, or Pareto methods.  The method requires high-integrity derivatives and a prior calibration process.

### Related Context
- **Previous Summary:** PESTPP-SEN generates various output files (Table 7.3, case=control file base name):  case.msn/case.group.msn/case.mio/case.raw.csv/case.group.raw.csv (Morris method only), case.sobol.si.csv/case.sobol.sti.csv/Case.sobol.obs.csv/Case.sobol.par.csv/case.sbl (Sobol method only), case.rmr (parallel runs), and Case.sen.par.csv (Morris only).  case.rns is a binary run management file.  All files use comma-delimited data except case.rns.  If all observation weights are zero, PESTPP-SEN resets them to 1.0.
- **Next Summary:** PESTPP-OPT solves constrained optimization problems considering uncertainties in model outputs (chance constraints).  Constraints are applied to predictive values adjusted for uncertainty (often pessimistically), using a calibrated model (minimized error variance, Doherty 2015) where model outputs are near the center of their posterior distributions.  Model parameter uncertainty stems from prior uncertainty and calibration data.

### Metadata
- **Keywords:** 
- **Chunk ID:** 9eb7ce055068
- **Chunk Index:** 1
- **Previous Chunk ID:** de2e82e22185
- **Next Chunk ID:** e05099b5052d

---

## Context

### Summary
**Parallel PEST (ppest.exe, i64ppest.exe) and BEOPEST (beopest32.exe, beopest64.exe) are automatically installed.  PAGENT.exe is required for Parallel PEST on each agent machine; BEOPEST uses its own executable as the agent.  Model programs and files must also be copied to agent machines before running Parallel PEST or BEOPEST.**

### Header
**11.1.5 Installing Parallel PEST and BEOPEST**

### Content
The command line version of the Parallel PEST executable ppest.exe, and its 64 bit version i64ppest.exe, are automatically installed when you install PEST on your machine. The same applies to the BEOPEST executables beopest32.exe and beopest64.exe.
As is explained below, for Parallel PEST to run a model on another machine it must signal an agent, named PAGENT, residing on the other machine to generate the command to run the model. Thus pagent.exe must be installed on each machine engaged in the Parallel PEST parameter estimation process. To do this, copy pagent.exe (also provided with PEST) to an appropriate directory (i.e. folder) on each such machine. This folder can be the model working folder on that machine if desired; if not, it should be a folder whose name is cited in the PATH environment variable on that machine.
BEOPEST does not use a special agent program. Rather BEOPEST itself is the agent. Hence beopest32.exe or beopest64.exe must be copied to agent machines in the same way as was described above for pagent.exe.
As will be discussed below, not only PEST programs, but model programs and accompanying files must also be copied to agent machines prior to initiating a parallel PEST or BEOPEST run.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 11. Parallel PEST and BEOPEST (continuación)
- **Subsection:** 11.1 General (continuación)

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** Parallel PEST and BEOPEST parallelize model runs, reducing PEST run time. Parallel PEST requires a run management file, while BEOPEST's is optional. They distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Both store data in binary files for reduced memory needs.

### Related Context
- **Previous Summary:** Parallel PEST's efficiency decreases with short model run times due to file I/O and message passing latency. BEOPEST, using TCP/IP, minimizes these overheads because agents perform file I/O locally.
- **Next Summary:** Parallel PEST and BEOPEST store parameter and model output values in binary, direct access files (pest###.dap, pest###.dao), reducing memory needs. These files are deleted after a run but are needed for restarting using the "/s" switch.  Parallel PEST is described below, followed by BEOPEST.

### Metadata
- **Keywords:** 
- **Chunk ID:** 3de0f3c0071a
- **Chunk Index:** 1
- **Previous Chunk ID:** cb0f0bfcff07
- **Next Chunk ID:** d5b1ed60ac37

---

## Context

### Summary
**PESTPP-OPT uses a PEST control file (Chapter 5) defining parameters, calibration data (with noise), decision variables, constraints, objective function, and optimization control variables (keyword-value pairs, "++" prefix).  It requires a calibrated model.  The details of each of these are discussed below.**

### Header
**8.2.1The PEST Control File **

### Content
Like other members of the PEST++ suite, execution of PESTPP-OPT is initiated using a command line that references a PEST control file. See chapter 5 of this manual for details. The PEST control file supplied to PESTPP-OPT must define the optimization problem that it must solve. In particular, this PEST control file must inform it of the following:
- model parameters whose post-calibration uncertainties are responsible for the uncertainties of model outputs;
- model outputs for which there are counterparts in the calibration dataset;
- the noise associated with members of the calibration dataset;
- decision variables that must be optimized;
- model outputs to which constraints are applied during the optimization process;
- constraints that are exerted on linear combinations of parameters that do not require a model run to calculate;
- how the decision objective function is defined;
- the values of control variables that govern the constrained optimization process.
As is the normal protocol for members of the PEST++ suite, variables which control the optimization process that is implemented by PESTPP-OPT are supplied through keywords that can be placed anywhere within a PEST control file on lines that begin with the “++” string.
Each of the above issues is now discussed in detail.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 8. PESTPP-OPT
- **Subsection:** 8.2 Using PESTPP-OPT

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** In "predictive analysis" mode, PEST maximizes/minimizes a prediction (in the "predict" group) while keeping the objective function ≤ Φ0 (requires a prior "estimation" run).  It uses the same parameters, transformations, and observations as the estimation run.  Restarting uses `/r`, `/j`, `/d`, or `/s` (parallel runs).  Change limits remain important.  Screen output shows prediction values per iteration.  Results include the optimal prediction and parameter values.

### Related Context
- **Previous Summary:** PESTPP-OPT handles chance constraints (risk neutral, averse, or tolerant) by shifting constraint values based on a user-specified risk value (0.0-1.0) and the model output's standard deviation (σo).  A value of 0.5 ignores uncertainty; 0.95 applies constraints to the upper 95% confidence level.  This is based on chance-constraint programming (Charnes and Cooper 1959, etc.).
- **Next Summary:** In PESTPP-OPT, parameter groups define decision variables (*opt_dec_var_groups*) and model parameters.  *opt_external_dev_var_groups* (subset of *opt_dec_var_groups*) specifies external decision variables (requiring template files).  Finite-difference derivatives (using parameter group settings) may be needed for calculating the response matrix. Decision variables cannot be log-transformed but can be tied or fixed;  FACPARMAX and RELPARMAX limits do not apply.

### Metadata
- **Keywords:** 
- **Chunk ID:** 1eb4698ae37e
- **Chunk Index:** 1
- **Previous Chunk ID:** 135c3f141f17
- **Next Chunk ID:** 48b7d94626ad

---

## Context

### Summary
**PESTPP-OPT uses a PEST control file  (section 5.3 details parallel run management variables) to manage parallel model runs, similar to other PEST++ suite programs.**

### Header
**8.2.11 Other Control Variables**

### Content
In common with all other members of the PEST++ suite, a PEST control file used by PESTPP-OPT can include variables that govern parallel run management. See section 5.3 of this manual.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 8. PESTPP-OPT
- **Subsection:** 8.2 Using PESTPP-OPT

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** In "predictive analysis" mode, PEST maximizes/minimizes a prediction (in the "predict" group) while keeping the objective function ≤ Φ0 (requires a prior "estimation" run).  It uses the same parameters, transformations, and observations as the estimation run.  Restarting uses `/r`, `/j`, `/d`, or `/s` (parallel runs).  Change limits remain important.  Screen output shows prediction values per iteration.  Results include the optimal prediction and parameter values.

### Related Context
- **Previous Summary:** PESTPP-OPT uses sequential linear programming (SLP), iteratively solving a linearized problem.  Termination occurs when objective function/decision variable changes are ≤ *opt_iter_tol* (default 0.001).  *opt_coin_log* (1-4) controls the verbosity of the SLP solution history (case.coin_log).  J and y matrices are recalculated every *opt_recalc_fosm_every* iterations to partially accommodate nonlinearities.
- **Next Summary:** After optimization, PESTPP-OPT performs a final model run using optimized decision variables unless *opt_skip_final()* is used.  Optimized decision variable values remain in model input files.

### Metadata
- **Keywords:** 
- **Chunk ID:** 878845b6c3b0
- **Chunk Index:** 1
- **Previous Chunk ID:** ec6be79c7073
- **Next Chunk ID:** 2c0a945abae1

---

## Context

### Summary
**For large problems, use 64-bit versions of PEST, Parallel PEST, BEOPEST, and their utilities for faster execution and increased memory capacity.**

### Header
**15.3 Versions of PEST**

### Content
Where problem sizes are large, use 64 bit versions of PEST, Parallel PEST and BEOPEST (and of PEST support utilities for which 64 bit versions are provided). Execution is generally faster. Much more memory can be addressed.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 15. Large Numbers of Parameters
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter discusses efficient calibration methods for models with tens of thousands of parameters using PEST. Adjoint techniques are recommended for highly parameterized models. Use compressed binary external derivatives files, 64-bit versions of PEST for large problems, and optimize Jacobian matrix storage. Prioritize linearity of regularization constraints and activate memory conservation for improved efficiency.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** For highly parameterized models (tens of thousands), model-calculated derivatives (adjoint techniques, Chapter 12) are necessary due to the excessive number of model runs and imprecision of finite differences.  Compressed binary external derivatives files are recommended; elements should be ordered by observation then parameter for optimal efficiency.
- **Next Summary:** In highly parameterized inversions, Jacobian matrix storage (dimensions (no+np)×m) can be excessive.  Many sensitivities and Tikhonov regularization elements are often zero. A data storage mechanism that omits zero-valued elements significantly reduces PEST's memory requirements.

### Metadata
- **Keywords:** 
- **Chunk ID:** 99e9db574a30
- **Chunk Index:** 1
- **Previous Chunk ID:** 5d358602f4e2
- **Next Chunk ID:** 8c1f42813f75

---
