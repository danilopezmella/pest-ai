# Search Results for: What are the specific optimization control variables that can be used in a PEST control file for PESTPP-OPT?

Keywords: None


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
**This section details PESTPP-GLM control variables.  Chapter 4 fully describes PEST control variables; Table 6.3 lists PEST++-specific control variables, which are described below.**

### Header
**6.4.1 General**

### Content
This section summarizes variables that control the operation of PESTPP-GLM. First those that feature in the PEST control file are discussed; see chapter 4 of this manual for a full description of the functions that they perform. The roles of PEST++ variables which control the operation of PESTPP-GLM are listed in table 6.3.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 6. PESTPP-GLM
- **Subsection:** 6.4 Summary of PESTPP-GLM Control Variables

### Additional Summaries
- **Higher-Level Summary:** Chapter 6 discusses automatic user intervention in PEST for regularization methods in parameter estimation. It suggests identifying and temporarily fixing insensitive parameters to improve matrix condition number and objective function. Parameters like DOAUI and MAXAUI customize intervention behavior, with options for mitigating bad derivatives and improving sensitivity.
- **Detailed Summary:** Corrupted Jacobian matrix elements hinder parameter upgrades. An algorithm removes parameters with high sensitivity to improve the objective function, differing from AUI by removing parameters in decreasing sensitivity order. Setting DOAUI to "auid" activates an algorithm that mitigates bad derivatives by iteratively removing parameters starting with the most sensitive. SVD or LSQR disallow this, except for SVD-assisted estimation without SVD/LSQR for super parameters. Lowering MAXAUI reduces AUI iterations.

### Related Context
- **Previous Summary:** In PESTPP-GLM's differential evolution (DE) mode,  only case.par (best parameters), case.rec (optimization history), and case.de1 (binary file for model run outcomes) are populated (Table 6.2, case=control file base name).  Run management files (section 6.2.13) are also produced.
- **Next Summary:** PESTMODE ("regularization" or "estimation") sets the PESTPP-GLM mode. Termination criteria (NOPTMAX, etc.) and derivative calculation settings (INCTYP, DERINC, etc.) are from the PEST control file.  MAXSING and EIGTHRESH (from the "singular value decomposition" section or defaults if absent) control SVD truncation.

### Metadata
- **Keywords:** 
- **Chunk ID:** 312ce692a044
- **Chunk Index:** 1
- **Previous Chunk ID:** da181e85469e
- **Next Chunk ID:** 7dfa0bbfe845

---

## Context

### Summary
**Table 8.2 lists optional PESTPP-OPT control variables (with defaults):  `opt_dec_var_groups`, `opt_external_dec_var_groups`, `opt_constraint_groups`, `opt_obj_func`, `opt_direction`, `opt_risk`, `opt_recalc_chance_every`, `parcov`, `par_sigma_range`, `opt_iter_tol`, `base_jacobian`, `hotstart_resfile`, `opt_coin_log`, `opt_std_weights`, `opt_skip_final`, `tie_by_group`, `enforce_tied_bounds`, `opt_stack_size`, and `opt_par_stack`/`opt_obs_stack`.  Parallel run variables are in section 5.3.6.**

### Header
**8.4 Summary of Control Variables**

### Content
Table 8.2 tabulates PEST++ control variables used by PESTPP-OPT. All of these are optional. If a particular control variable is not supplied, then PESTPP-OPT provides a default value. Where appropriate, the value of the default is presented with the name of the variable in the table below. Variables discussed in section 5.3.6 that control parallel run management are not listed in the following table.
Note also that the number of control variables may change with time. Refer to the PEST++ web site for variables used by the latest version of PESTPP-OPT.
| Variable                    | Type | Role                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|---------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| *opt_dec_var_groups()*          | text     | Comma-delimited string identifying which parameter groups are to be treated as decision variables. If not supplied, all adjustable parameters are treated as decision variables.                                                                                                                                                                                                                                                                              |
| *opt_external_dec_var_groups()* | text     | Comma-delimited string identifying which parameter groups are to be treated as "external" decision variables, that is decision variables that do not influence model outputs and that therefore do not require a finite-difference run of the model to fill the pertinent column of the response matrix.                                                                                                                                                      |
| *opt_constraint_groups()*       | text     | Comma- delimited string identifying which observation and prior information groups are to be treated as constraints. Group names for "less than" constraints must start with "l\_" or “less\_”; group names for "greater than" constraints must start with "g\_" or “greater\_”. If this control variable is omitted, all observation and prior information groups that meet these naming conventions are treated as constraints.                             |
| *opt_obj_func()*                | text     | String identifying the prior information equation or two-column ASCII file that contains coefficients used in formulation of the objective function (see equation 8.4). If this control variable is not supplied, then each decision variable is given a coefficient of 1.0 in formulation of the objective function.                                                                                                                                         |
| *opt_direction(min)*            | text     | Either "min" or "max". “min” specifies that the objective function be minimized, while “max” specifies that it be maximized.                                                                                                                                                                                                                                                                                                                                  |
| *opt_risk(0.5)*                 | real     | A number between 0.0 and 1.0. A value of 0.5 signifies risk neutrality. A value of 0.95 seeks a 95% risk averse application of optimization constraints, while a value of 0.05 seeks a 5% risk tolerant application of optimization constraints.                                                                                                                                                                                                              |
| *opt_recalc_chance_every(1)*    | integer  | Number of iterations of the SLP process over which chance constraints are re-used. If set to 1, a calibration Jacobian matrix is calculated during every iteration of the SLP constrained optimization process if fosm-based chance constraints are used or the stack is re-evaluated if stack-based chance constraints are being used                                                                                                                        |
| *parcov()*                      | text     | Provide the name of a JCO, JCB, UNC or COV file from which the prior covariance matrix used in FOSM analysis is read.                                                                                                                                                                                                                                                                                                                                         |
| *par_sigma_range(4.0)*          | real     | The difference between a parameter’s upper and lower bounds expressed as standard deviations.                                                                                                                                                                                                                                                                                                                                                                 |
| *opt_iter_toll(0.001)*          | real     | Solution closure criterion applied to objective function and decision variables.                                                                                                                                                                                                                                                                                                                                                                              |
| *base_jacobian()*               | text     | Provide the name of a Jacobian matrix file (with extension *.jco* or *.jcb*). Sensitivities read from this file are used for the first iteration of the constrained optimization process.                                                                                                                                                                                                                                                                     |
| *hotstart_resfile()*            | text     | The name of a residuals file produced by PESTPP-GLM or PESTPP-OPT. PESTPP-OPT assumes that model output values contained in this file correspond to the values of parameters (including decision variables) listed in the PEST control file. Hence it does not carry out the initial model run.                                                                                                                                                               |
| *opt_coin_log(1)*               | integer  | Level of verbosity of solution information recorded by optimization library functions.                                                                                                                                                                                                                                                                                                                                                                        |
| *opt_std_weights(false)*        | Boolean  | Flag that identifies constraint weights as standard deviations. If set to *true*, PESTPP-OPT skips FOSM-based constraint uncertainty calculation and uses observation weights directly as standard deviations in the calculation of risk. These standard deviations can be calculated externally via PREDUNC or pyEMU, or can be derived empirically from an ensemble. Setting this flag to true will override all other chance constraint flags and options. |
| *opt_skip_final(false)*         | Boolean  | Flag to skip the final model run.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| *tie_by_group(false)*           | Boolean  | Flag to tie all adjustable parameters together within each parameter group. Initial parameter ratios are maintained as parameters are adjusted. Parameters that are designated as already tied, or that have parameters tied to them, are not affected.                                                                                                                                                                                                       |
| *enforce_tied_bounds(false)*    | Boolean  | Flag to enforce parameter bounds on any tied parameters                                                                                                                                                                                                                                                                                                                                                                                                       |
| *opt_stack_size(0)*             | integer  | Number of realizations to use in the stack. If positive, stack-based chance constraints are used. If *opt_par_stack* is not supplied, *opt_stack_size* realizations are drawn from the Prior. If *opt_par_stack* is supplied and the stack in that file is larger than *opt_stack_size*, the stack is truncated to *opt_stack_size*.                                                                                                                          |
| *opt_par_stack()*               | string   | File containing a parameter stack. The file extension is used to determining CSV for binary (JCB) format. The stack in this file must constrain all adjustable parameters.                                                                                                                                                                                                                                                                                    |
| *opt_obs_stack()*               | string   | File containing an observation stack. The file extension is used to determining CSV for binary (JCB) format. Supplying this file will forego evaluating the stack for the first iteration and possibly subsequent iterations depending on the value if *opt_recalc_chance_every*                                                                                                                                                                              |
Table 8.2 PESTPP-OPT control variables. Parallel run management variables can be supplied in addition to these. See section 5.3.6.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 8. PESTPP-OPT
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** PESTPP-OPT generates various files (Table 8.1, case=control file base name): case.rec (run history), case.par (best parameters), case.N.par (iteration N parameters), case.res (final residuals), case.N.jcb.rei/case.N.sim.rei/case.N.est.rei/case.N.sim+fosm.rei/case.N.est+fosm.rei (residuals, if chance constraints are used), case.log (performance log), case.coin_log (SLP algorithm log), case.rmr (parallel runs), case.rnj (run manager file), and optional case.N.par_stack.csv/case.N.obs_stack.csv (parameter/observation stacks).  Calibration outputs are unchanged throughout the optimization process.
- **Next Summary:** PESTPP-IES performs iterative ensemble smoothing (described by White 2018, including examples, and Chen and Oliver 2013, including theory and examples).  Refer to these sources for details.

### Metadata
- **Keywords:** base_jacobian, enforce_tied_bounds, hotstart_resfile, par_sigma_range, parcov, tie_by_group
- **Chunk ID:** bc706cf8a1bc
- **Chunk Index:** 1
- **Previous Chunk ID:** 7bf8e0f47aa6
- **Next Chunk ID:** 723c76593a2c

---

## Context

### Summary
**PEST uses template and instruction files (discussed previously), and a single control file (detailed in Chapter 5 and Appendix A). The control file uses free-field formatting; text is case-insensitive and begins with "pcf".  Some sections and variables are optional.**

### Header
**3.2.1 General**

### Content
PEST requires three types of input file. Two of these were discussed in the previous chapter, namely template and instruction files. For any particular PEST run, as many of each of these must be provided as there are model input files on which parameters reside and model output files from which numbers must be read, respectively. However there is only one PEST control file.
Specifications of the PEST control file, together with the names of all variables which can appear in this file, are provided in appendix A of this text and discussed in detail in chapter 5. The PEST control file is divided into sections. Some of these sections are optional. Some of the variables which reside in some of these sections are optional. Optional variables are enclosed in square brackets in figure A1.1 of appendix A.
Numbers and text strings appearing in the PEST control file which provide the values of PEST control variables must be separated by one or more spaces. They are read by PEST using free-field formatting. All text is case insensitive, whether it denotes a section header or the value of a control variable.
The first line of a PEST control file must contain only the characters “pcf”, this standing for “PEST control file”.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 3. What PEST Does
- **Subsection:** 3.2 The PEST Control File

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** PEST utilizes template and instruction files along with a control file that follows free-field formatting rules. The control file, starting with "pcf", includes mandatory sections like control data, parameter groups, and observation data. Optional sections exist, with specific order requirements for sections in the control file. PEST-generated files share a base filename.

### Related Context
- **Previous Summary:** This chapter provides a PEST overview, referencing Doherty (2015) for theoretical details.  Control variables (detailed later) affect PEST's operation.  Part I covers PEST, SCEUA_P, CMAES_P, and SENSAN; Part II covers supporting utilities.
- **Next Summary:** PEST control file sections (*space text) must appear in the order shown in Table 3.1.  Mandatory sections include control data, parameter groups, parameter data, observation groups, observation data, and model command line and input/output.  Other sections are optional.

### Metadata
- **Keywords:** 
- **Chunk ID:** 89599948116e
- **Chunk Index:** 1
- **Previous Chunk ID:** 75f6986ebb4a
- **Next Chunk ID:** 412785153c28

---
