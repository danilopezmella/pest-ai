# Search Results for: define a basic workflow for pest-opt process

Keywords: None

## Variations
1. What are the fundamental steps in the pest-opt process?
2. Can you outline the basic workflow of the pest-opt process?
3. What comprises the basic workflow for the pest-opt process?
4. Could you describe the primary steps involved in the pest-opt process?
5. What does the basic workflow for a pest-opt process entail?


## Context

### Summary
**Post-inversion analysis is crucial. This section provides guidance and suggests using PEST utility software (Part II) for processing and inspecting inversion results.**

### Header
**5.6.1 General**

### Content
Upon completion of an inversion process, the outcomes of that process must be carefully inspected. The purpose of this section is to provide a few ideas of how best to accomplish this, and to suggest a few of the processing options available through PEST utility software described in part II of this manual.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 5. Running PEST (continuación)
- **Subsection:** 5.6 PEST Postprocessing

### Additional Summaries
- **Higher-Level Summary:** The text stresses the importance of post-inversion analysis with PEST utility software. It advocates for multiple runs, model revision for poor fits, and subjective evaluation of model-measurement misfit. Regularization, parameter reasonableness, and removal of insensitive parameters are crucial. Tools like EIGPROC, SSSTAT, and GENLINPRED assist in analysis, culminating in a final model run with optimized parameters or manual adjustments.
- **Detailed Summary:** This section emphasizes the importance of post-inversion analysis using PEST utility software for processing and inspecting results. It highlights the need for multiple PEST runs, model revision based on poor fits, and subjective analysis of model-measurement misfit. Regularization, parameter reasonableness, and manual removal of insensitive parameters for ill-posed problems are key. Various tools like EIGPROC, SSSTAT, GENLINPRED, PREDUNC7, SUPCALC, INFSTAT, INFSTAT1, PREDUNC5, SUPOBSPAR, and SUPOBSPAR1 aid in analysis. The process concludes with a final model run using optimized parameters or manual intervention if necessary.

### Related Context
- **Previous Summary:** For highly parameterized models, excessive model runs for derivative calculations can be reduced by preventing premature higher-order derivative calculations (NOPTSWITCH), widening parameter bounds, using Tikhonov regularization, and setting an appropriate target objective function (Chapter 9).  Discontinuous model outputs may require global optimization methods (Chapter 16).  Parameter correlation/insensitivity (JtQJ non-invertible) is addressed by regularization, SVD, or LSQR.
- **Next Summary:** Inversion yields minimum error variance solutions, not necessarily "correct" parameter values.  Multiple PEST runs may be needed; poor initial fits suggest model revision.  Subjective analysis of model-measurement misfit (plots, contour comparisons) is crucial, acknowledging model imperfections and structural noise.  Regularization (PHIMLIM) controls fit, and parameter reasonableness is key for null-space-dependent predictions.

### Metadata
- **Keywords:** 
- **Chunk ID:** 204808680b1f
- **Chunk Index:** 1
- **Previous Chunk ID:** 993e9ef91c80
- **Next Chunk ID:** ad357e3d4a76

---

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
**This is not an exhaustive list of PEST and utility tasks;  Part II documents PEST utilities.  Groundwater and Surface Water Utilities, and PLPROC, are documented separately for further tasks and usage details.**

### Header
**1.7.9 In Conclusion**

### Content
The above list of tasks that can be accomplished using PEST and its associated utility suite is
far from complete. Furthermore, this list of tasks would be expanded greatly if those that can
be accomplished using the PEST Groundwater and Surface Water Utilities are taken into account.
See part II of this manual for documentation of utility programs supplied with PEST. Refer to
the manuals of the Groundwater and Surface Water Utilities, and of the PLPROC parameter list
processor, for a complete description of roles that these inversion-support utilities play in
model calibration, and for complete usage details.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 1. Introduction
- **Subsection:** 1.7 Some Common Tasks

### Additional Summaries
- **Higher-Level Summary:** To install PEST, copy its executables to a folder in the PATH variable for access from any directory. The suite includes PEST, Parallel PEST, BEOPEST, SENSAN, global optimizers, and utilities. PEST calibrates models by matching outputs to measurements, handling non-uniqueness through regularization. It quantifies uncertainties and supports decision-making by identifying unlikely events.
- **Detailed Summary:** This section introduces PEST's capabilities, including utilities like PESTGEN for file creation, TEMPCHEK for file integrity, and EIGPROC for inversion results. Other utilities adjust weights, analyze worth, and manipulate matrices. Part II covers additional matrix operations and global optimizers if needed. Groundwater and Surface Water Utilities are documented separately.

### Related Context
- **Previous Summary:** RANDPAR generates random parameter sets from covariance matrices (PREDUNC7, COVCOND). COMFILNME and RDMULRES process Monte Carlo results; PARREP places parameters in PEST control files. PNULPAR implements null space Monte Carlo, removing the non-calibrating component of random parameter fields.
- **Next Summary:** PEST uses template files (for model input), instruction files (for model output), and a control file (detailed later).  Template and instruction files, created via text editor or specialized software, are checked using TEMPCHEK, INSCHEK, and PESTCHEK.  "Observation" refers to numbers from model output files, including weighted zero predictions.

### Metadata
- **Keywords:** 
- **Chunk ID:** d34297c89b9e
- **Chunk Index:** 1
- **Previous Chunk ID:** 0d61ccf57d35
- **Next Chunk ID:** bd339777af3f

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
