# Search Results for: What is pest-opt?

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
**PESTPP-OPT solves constrained optimization problems considering uncertainties in model outputs (chance constraints).  Constraints are applied to predictive values adjusted for uncertainty (often pessimistically), using a calibrated model (minimized error variance, Doherty 2015) where model outputs are near the center of their posterior distributions.  Model parameter uncertainty stems from prior uncertainty and calibration data.**

### Header
**8.1.2 Overview**

### Content
Sustainable management of a natural system often requires that an optimization problem be solved. Something must be maximized or minimized through adjustment of so-called “decision variables”, subject to certain constraints. For example, it may be desirable to maximize the amount of water extracted from a number of wells (where pumping rates are the decision variables), subject to the constraints that flow in an adjacent stream does not fall below a specified rate, and that groundwater levels in certain observation wells are maintained above certain levels. Design of a contaminant remediation system may attempt to ensure that the cost of water extraction and treatment is minimized subject to the constraint that the contaminant is captured; pumping and injection rates, and the locations of pumping and injection wells, comprise the decision variables in this example.
Models are used to predict the response of a natural system to natural and management-imposed stresses. Where management is optimized, some of the quantities which the model calculates comprise system behaviour on which constraints must be imposed. These outputs are normally uncertain, reflecting the fact that the model’s parameters are uncertain. (Model outputs to which constraints are applied have this in common with any other predictions made by a model.) The question then arises as to whether imposition of constraints should take account of these uncertainties. Where violation of a constraint can result in an unacceptable cost, the answer to that question is obvious: respect for valuable societal and/or environmental assets requires that model-calculated quantities to which constraints are applied be adjusted to include the range of possibilities that are compatible with the range of reasonable parameters that a model can employ. For example, in the stream flow example discussed above, exercise of the precautionary principle may dictate that the constraint be applied to the lowest streamflow that would be calculated by the model if it were parameterized with the most pessimistic set of parameters (with respect to that particular model output) that are compatible with expert knowledge on the one hand, and the necessity to fit the model calibration dataset on the other hand.
In most environmental modelling contexts, a model is calibrated before it is deployed. As is described by Doherty (2015), if properly undertaken, the calibration process yields a parameter field of minimized error variance. This is its “passport to uniqueness”. The parameter field is not correct; its potential for wrongness (which may be large) is merely minimized. Any prediction that the model makes inherits this status. That is, the prediction is not correct; however, its potential for wrongness has been minimized. Hence a prediction made by a calibrated model lies somewhere near the centre of the posterior probability distribution of that prediction. The same concept can be extended to model outputs that describe environmental behaviour to which constraints must be applied.
If uncertainty is to be taken into account in imposition of an optimization constraint, the width of the probability distribution associated with the model output to which the constraint is applied must be calculated so that the constraint can be applied to a predictive value that is adjusted in order to accommodate its uncertainty. Often (but not always – see below) it will be adjusted towards the pessimistic end of its probability range.
PESTPP-OPT not only solves a constrained optimization problem. It solves a constrained optimization problem that accommodates uncertainties in model outputs to which constraints are applied. These are often referred to as “chance constraints”. In applying chance constraints, PESTPP-OPT assumes that model predictive uncertainty is an outcome of model parameter uncertainty. The latter is, in turn, an outcome of prior parameter uncertainty (i.e., the uncertainty range that emerges from the stochastic nature of expert knowledge), and the extent to which this uncertainty is reduced through the model calibration process. Parameter uncertainty reduction is a function of the information content of the calibration dataset, and the extent to which flow of this information is hampered by the presence of noise within that dataset.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 8. PESTPP-OPT
- **Subsection:** 8.1 Introduction

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** In "predictive analysis" mode (Doherty 2015, section 8.4), PEST maximizes/minimizes a prediction while maintaining the objective function below a threshold, assessing post-calibration uncertainty.  This works best with few parameters and a well-posed inverse problem; otherwise, use linear analysis, Monte Carlo, or Pareto methods.  The method requires high-integrity derivatives and a prior calibration process.

### Related Context
- **Previous Summary:** PESTPP-OPT (described by White et al. 2018, and Wagner and Gorelick 1987) performs decision optimization under uncertainty using sequential linear programming.  Examples of its use are provided in White et al. (2018).
- **Next Summary:** PESTPP-OPT handles chance constraints via weights (as standard deviations, *opt_std_weights(true)*), linear methods (FOSM, using Jacobian matrices and prior parameter/measurement uncertainties), or stack-based methods.  FOSM uses Equations 8.1a or 8.1b (Doherty 2015) to calculate prediction variance;  Equations 8.2a or 8.2b calculate the posterior parameter covariance matrix; Equation 8.3 calculates output uncertainty variance.  The Jacobian matrix can be user-supplied or calculated by PESTPP-OPT.

### Metadata
- **Keywords:** 
- **Chunk ID:** e05099b5052d
- **Chunk Index:** 1
- **Previous Chunk ID:** 9eb7ce055068
- **Next Chunk ID:** 0a9e459f4e6c

---

## Context

### Summary
**PESTPP-MOU performs single/multi-objective optimization under uncertainty using evolutionary algorithms (simulated binary crossover, differential evolution, particle swarm optimization) and Pareto dominance concepts (NSGA-II, SPEA-2). It uses PESTPP-OPT's chance constraints for model outputs in both objectives and constraints.**

### Header
**13.1 Introduction**

### Content
PESTPP-MOU is a tool for constrained single and multiple objective optimization under uncertainty (CMOU) with evolutionary heuristics. It implements several popular “global” evolutionary optimization algorithms including simulated binary cross over, differential evolution (including self-adaptive differential evolution), and particle swarm optimization. PESTPP-MOU uses the pareto dominance concepts and processes available in NSGA-II and SPEA-2 to seek multidimensional pareto frontiers. More importantly, PESTPP-MOU implements the same “chance” concepts and mechanics as PESTPP-OPT for model output quantities used in the optimization problem, which includes both model-based constraints and model-based objectives.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 13. PESTPP-MOU
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** PPD2ASC converts case.ppd to a textfile with objective function components, model outputs, and parameter values for spreadsheets. PPD2PAR extracts parameters from ppdfile to parfile for PEST utilities, matching objective function values in case.pod and case.par.N. Specific commands are required for each task.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** Table 12.2 lists optional PESTPP-DA control variables (with defaults):  *da_observation_cycle_table*, *da_weight_cycle_table* (CSV files, cycle numbers as rows, observation names as columns), *da_hotstart_cycle* (starting cycle number), *da_stop_cycle* (stopping cycle number), *da_use_simulated_states* (Boolean), and *da_noptmax_schedule* (CSV file with cycle number and noptmax value per cycle).  Parallel run variables are in section 5.3.6;  all other PESTPP-IES variables are also supported.
- **Next Summary:** PESTPP-MOU performs single or multi-objective optimization under uncertainty.  It uses objectives (model outputs or prior information), constraints (≤ or ≥, model outputs or prior information), decision variables, and parameters (inducing uncertainty). A parameter stack (PESTPP-OPT section) is used;  it evolves populations across generations using generators (differential evolution, etc.) and selectors.

### Metadata
- **Keywords:** 
- **Chunk ID:** d85ab9b616d0
- **Chunk Index:** 1
- **Previous Chunk ID:** 9ee9d4cf5933
- **Next Chunk ID:** 39e97ce245bf

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
