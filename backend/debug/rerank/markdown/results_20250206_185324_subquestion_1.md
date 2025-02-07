# Search Results for: What are the steps to use pest-opt?

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

## Context

### Summary
**PESTPP-OPT minimizes a linear objective function (φ=cᵀx, Equation 8.4a) subject to linear constraints (Ax≤b, Equation 8.5).  The  c vector contains constants (often costs); x contains decision variables.  A (response matrix) is calculated using finite differences or user-supplied values.  It uses sequential linear programming (SLP, Forrest et al. 2016, Lougee-Heimer 2003, Ahlfield and Mulligan 2000) for efficient optimization, recomputing A iteratively.  The model is assumed to be calibrated.**

### Header
**8.1.4 Optimization**

### Content
An optimization problem can be formulated in many ways. For the moment it will be characterized as minimizing an objective function. (A maximization problem can be turned into a minimization problem simply through reversing the sign of the objective function.) The objective function which PESTPP-OPT minimizes must be distinguished from that which is minimized through model calibration. Use of PESTPP-OPT assumes that the model has already been calibrated (or, if not, it assumes that it does not need to be calibrated). The set of parameters that it uses must therefore be those that emerge from the calibration process or (if the model has not been calibrated) those that are of minimized error variance from an expert knowledge point of view. Hence the objective function that is the focus of model calibration is not considered when using PESTPP-OPT. Nevertheless, as will be discussed below, it is implicitly taken into account through the weights that are assigned to observations comprising the calibration dataset that are featured in the PEST control file on which PESTPP-OPT’s operations are based.
PESTPP-OPT minimizes a linear objective function φ defined as follows:
φ = ctx (8.4a)
In equation 8.4 both c and x are vectors. The vector x contains the current values of decision-variables. As stated above, these are management related quantities (such as pumping or injection rates in various wells at various times) that PESTPP-OPT adjusts in order to achieve system management goals. For constrained optimization to make sense, all of the elements of c and x must be positive. In practice they do not need to be provided as such; PESTPP-OPT makes the necessary transformations internally.
The vector c contains constants which must be supplied by the user. These are often factors by which decision variables must be multiplied to obtain monetary units, which are then used to express costs. Hence the *i*th element of c is the cost associated with the *i*th element of x. This is clear if equation 8.4a is re-written as
φ= sumdcixi (8.4b)
where *d* is the number of decision variables.
While undergoing adjustment to minimize φ, the elements of x are subject to one or more linear constraints. Because they are linear they can be expressed through a matrix equation such as
Ax ≤ b (8.5)
A is often referred to as a “response matrix”. For constraints applied to model-calculated quantities, Ax represents model outputs calculated on the basis of current values of decision variables. Representation of the model’s action on decision variables as a matrix is an approximation. PESTPP-OPT accommodates this approximation in ways discussed below. Meanwhile, the elements of b must be supplied by the user. They are specific to his/her management problem. For example, one particular element of b may represent the rate of flow in a stream that must be maintained. This is actually a “greater than” constraint rather than the “less than” constraints embodied in equation 8.5. PESTPP-OPT handles “greater than” constraints through appropriate internal transformation.
The *i*th constrain (i.e., the *i*th row of A) can be written as
*ai*1*x*1 + *ai*2*x*2 + *ai*3*x*3 + …. + *aidxd* ≤ *bi* (8.6)
where *aij* is the element of A that occupies its *i*th row and *j*th column. Where a constraint represents the action of the model, the coefficients in equation 8.6 are calculated by PESTPP-OPT using finite differences under an assumption of local model linearity with respect to decision variables. This is similar to the way in which programs like PEST and PESTPP-GLM calculate sensitivities when estimating parameters. However, in this case, finite differences are taken of decision variables rather than parameters in order to calculate sensitivities of model outputs to which constraints are applied rather than outputs corresponding to field measurements comprising a calibration dataset. As will be discussed, PESTPP-OPT offers the same range of options in calculating these derivatives as PEST and PESTPP-GLM offer for calculation of derivatives with respect to model parameters. The response matrix which is formed in this way is used in place of all or part of the matrix A appearing in equation 8.5. For other constraints (i.e., constraints which are directly applied to decision variables), the coefficients appearing in equation 8.5 can be supplied directly by the user.
The optimization algorithm employed by PESTPP-OPT employs a so-called “linear programming” or “simplex” methodology that is accessed through the open-source CLP optimization library (Forrest et al., 2016), developed through the Computational Infrastructure for Operations Research (COIN-OR) project; see Lougee-Heimer (2003). This algorithm is fast and efficient; it can handle hundreds of thousands of decision-variables. The assumption of a linear relationship between model outputs and decision variables is accommodated by repeating the linear optimization process in a series of iterations in which the decision variable response matrix (i.e., A of equation 8.5) is re-computed on each occasion. Where decision-variables are many, this can be a time-consuming process. The iterative nature of the optimization process earns it the name “sequential linear programming”, or simply SLP for short. See Ahlfield and Mulligan (2000) for further details.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 8. PESTPP-OPT
- **Subsection:** 8.1 Introduction

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** In "predictive analysis" mode (Doherty 2015, section 8.4), PEST maximizes/minimizes a prediction while maintaining the objective function below a threshold, assessing post-calibration uncertainty.  This works best with few parameters and a well-posed inverse problem; otherwise, use linear analysis, Monte Carlo, or Pareto methods.  The method requires high-integrity derivatives and a prior calibration process.

### Related Context
- **Previous Summary:** PESTPP-OPT's stack-based chance constraints (updated every *opt_recalc_chance_every* iterations) use a parameter ensemble to sample model-based constraint uncertainties, selecting values based on the specified risk.  For reused stacks, anomalies are added to the current constraint value.  This method is more rigorous and relaxes Gaussian distribution assumptions.
- **Next Summary:** PESTPP-OPT handles chance constraints (risk neutral, averse, or tolerant) by shifting constraint values based on a user-specified risk value (0.0-1.0) and the model output's standard deviation (σo).  A value of 0.5 ignores uncertainty; 0.95 applies constraints to the upper 95% confidence level.  This is based on chance-constraint programming (Charnes and Cooper 1959, etc.).

### Metadata
- **Keywords:** 
- **Chunk ID:** 1af4c91b72e5
- **Chunk Index:** 1
- **Previous Chunk ID:** c942f94f575d
- **Next Chunk ID:** 135c3f141f17

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
