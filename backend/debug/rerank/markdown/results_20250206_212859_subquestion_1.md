# Search Results for: How does the choice of a risk-averse setting affect the calculation of δo in PESTPP-OPT?

Keywords: None

## Variations
1. How is the calculation of δo in PESTPP-OPT affected by selecting a risk-averse setting?
2. In what way does a risk-averse setting impact the calculation of δo in PESTPP-OPT?
3. What influence does a risk-averse setting have on the computation of δo in PESTPP-OPT?
4. How does setting a risk-averse environment alter the calculation of δo in PESTPP-OPT?
5. In PESTPP-OPT, how does a risk-averse choice modify the calculation of δo?


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
**PESTPP-OPT handles chance constraints (risk neutral, averse, or tolerant) by shifting constraint values based on a user-specified risk value (0.0-1.0) and the model output's standard deviation (σo).  A value of 0.5 ignores uncertainty; 0.95 applies constraints to the upper 95% confidence level.  This is based on chance-constraint programming (Charnes and Cooper 1959, etc.).**

### Header
**8.1.5 Chance Constraints**

### Content
A user of PESTPP-OPT can inform it whether he/she would like the optimization process which it implements to be risk neutral, risk averse, or risk tolerant. In the latter two cases he/she can specify the degree of aversion or tolerance that should characterize that process. Tolerance or aversion is introduced through the way in which model output uncertainty affects the imposition of optimization constraints.
Suppose that a user specifies that a model output *o* shall have a value no greater than *b*. Suppose also that the standard deviation of post-calibration uncertainty associated with model output *o* is *σ*o (*σ*o is calculated by PESTPP-OPT using equations 8.1 to 8.3). PESTPP-OPT assumes that model output uncertainties are characterized by a normal distribution. A user can specify, in recognition of the uncertainty associated with *o*, that he/she must be 95% sure that the constraint is not violated. In this case PESTPP-OPT applies the constraint to the model output *o* plus an amount δ*o* calculated to ensure that, according to the normal probability distribution, the chances of *o* being smaller than *o*+ δ*o* are 95%. Alternatively, a user may adopt a risk tolerant strategy by specifying that he/she will be happy as long as there is a 5% chance that the constraint is respected. In that case PESTPP-OPT applies the constraint to *o* minus this same δ*o*. A risk neutral approach results in the constraint being applied to *o*. This technique of shifting model-simulated values to which constraints are applied up or down in accordance with risk tolerance or risk aversion is referred to as chance-constraint programming (Charnes and Cooper, 1959; Miller and Wagner, 1965; Tung, 1986; Wagner and Gorelick, 1987; Hantush and Marino, 1989; Chan, 1994).
A PESTPP-OPT user must provide one number to characterize his/her approach to risk. This number must be between zero and one. A model-output-specific number, representing the uncertainty of that output, is then added or subtracted from it prior to imposition of optimization constraints on that output. Provision of a value of 0.5 for this variable (signifying risk neutrality) is equivalent to ignoring parameter, and hence predictive, uncertainty. Under these circumstances, PESTPP-OPT does not calculate model output uncertainties at all. This reduces input requirements, at the same time as it accelerates the optimization process by foregoing the need to (re)calculate the J matrix and/or y vectors of equations 8.1 to 8.3. On the other hand, a value of 0.95 specifies that constraints are applied to model outputs which are corrected to represent the upper end of the 95% one-sided confidence level of that prediction.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 8. PESTPP-OPT
- **Subsection:** 8.1 Introduction

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** In "predictive analysis" mode (Doherty 2015, section 8.4), PEST maximizes/minimizes a prediction while maintaining the objective function below a threshold, assessing post-calibration uncertainty.  This works best with few parameters and a well-posed inverse problem; otherwise, use linear analysis, Monte Carlo, or Pareto methods.  The method requires high-integrity derivatives and a prior calibration process.

### Related Context
- **Previous Summary:** PESTPP-OPT minimizes a linear objective function (φ=cᵀx, Equation 8.4a) subject to linear constraints (Ax≤b, Equation 8.5).  The  c vector contains constants (often costs); x contains decision variables.  A (response matrix) is calculated using finite differences or user-supplied values.  It uses sequential linear programming (SLP, Forrest et al. 2016, Lougee-Heimer 2003, Ahlfield and Mulligan 2000) for efficient optimization, recomputing A iteratively.  The model is assumed to be calibrated.
- **Next Summary:** PESTPP-OPT uses a PEST control file (Chapter 5) defining parameters, calibration data (with noise), decision variables, constraints, objective function, and optimization control variables (keyword-value pairs, "++" prefix).  It requires a calibrated model.  The details of each of these are discussed below.

### Metadata
- **Keywords:** 
- **Chunk ID:** 135c3f141f17
- **Chunk Index:** 1
- **Previous Chunk ID:** 1af4c91b72e5
- **Next Chunk ID:** 1eb4698ae37e

---

## Context

### Summary
**The five-point method with α and β from equations 3.5.4 and 3.5.5 is preferred when model outputs contain numerical noise from convergence difficulties or other factors.  This often motivates using four runs per parameter per iteration.**

### Header
**3.5.2 Forward, Central and Five-Point Differences**

### Content
The latter choice is far better where model outputs are contaminated by numerical noise that may arise from model solution convergence difficulties and other factors. It would normally be to address this problem that a modeller would even consider undertaking four runs per parameter per iteration.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 3. What PEST Does
- **Subsection:** 3.5 The Calculation of Derivatives

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** PEST calculates Jacobian matrix elements using finite differences unless provided by the model. Accurate derivatives are crucial, managed by SVD or LSQR for ill-posedness. Parameters are grouped for derivative calculation management. PEST offers forward, central, and five-point finite-difference methods, with central methods providing higher accuracy. Model-calculated derivatives are preferred for accuracy and speed.

### Related Context
- **Previous Summary:** PEST calculates derivatives using forward (one model run per parameter), central (two runs), or five-point (four runs) finite-difference methods. Central methods (outside points, parabolic, least-squares) offer higher accuracy than forward differences. Five-point methods use equation 3.5.1, with α and β from equations 3.5.2-3.5.5 for precision or minimum error variance.
- **Next Summary:** PEST offers "absolute," "relative," and "rel_to_max" parameter increment types (INCTYP, DERINC).  "Relative" and "rel_to_max" adjust increments based on parameter values; DERINCLB provides a minimum increment.  Increments must allow distinguishing incremented and non-incremented parameter values in the model input file.  Increments cannot exceed the parameter range divided by 3.2.

### Metadata
- **Keywords:** 
- **Chunk ID:** 1813ccd458a7
- **Chunk Index:** 2
- **Previous Chunk ID:** 84d79eb825ab
- **Next Chunk ID:** 4b27f7aae10c

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
