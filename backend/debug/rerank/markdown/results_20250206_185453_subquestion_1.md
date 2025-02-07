# Search Results for: Can you provide an example of how to use pest-opt?

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
**Verify the dataset using `pestchek twofit1` then run `pest twofit1`. Monitor the objective function (near 5.0E-3) and prediction values (increasing).  The final prediction is 0.786 (objective function 5.16E-3). Observation "o14" (prediction) is not listed with other observations because it's the only member of the "predict" group. Figure 18.16 shows the resulting line segments.**

### Header
**18.2.5 Running PEST**

### Content
Before running PEST, run PESTCHEK to check that the entire input dataset is consistent and correct. At the screen prompt type:
pestchek twofit1
Then run PEST using the command:
pest twofit1
There are two things to watch as PEST executes. The first is the value of the objective function and the second is the value of the prediction. Both of these are written to the screen on every occasion that PEST calculates a parameter upgrade vector (these are easily seen when running PEST if screen output from the composite model is disabled as discussed earlier). The objective function (i.e. phi) hovers around 5.0E-3 as it should (though values on either side of this are recorded). The value of the prediction slowly rises from iteration to iteration. Note that information written to the screen during the course of PEST’s execution is also recorded in the PEST run record file (in this case twofit1.rec).
When PEST ceases execution, open file twofit1.rec and go to the bottom of the file. Near the bottom of the file it is written that PEST achieved a maximum prediction value of 0.786 for a corresponding objective function value of 5.16E-3. This is a little above our target value of 5.0E-3, but is accepted due to the action of PD1. However due to the rather subjective way in which an objective function value was selected at which the model is said to be “calibrated” this matters little.
While inspecting the run record file, notice how observation “o14” is not listed with other observations in the section of this file which tabulates observed values, corresponding model-generated values and residuals. This is because observation “o14” is in fact the prediction, PEST recognising it as such because it is the only observation assigned to the observation group “predict”.
Figure 18.16 shows a plot of the line segments calculated on the basis of the parameters derived by PEST during the above predictive analysis process. The fit is not too bad, though obviously not as good as that obtained on the basis of best fit parameters.
| |1.0|0.8|0.6| |
|---|---|---|---|---|
| |Specific volume (cu m/Mg)|0.4| | |
| |0.0|0.2|0.4|0.6|
Figure 18.16 Soil clod shrinkage data with line segments superimposed.
In the present instance, the “worst case” model prediction of 0.786 is not too different from the “most likely” model prediction of 0.756. This is comforting to know. It is a frightening fact that in many instances of environmental modelling the worst case prediction can be hugely different from that calculated using parameters corresponding to the objective function minimum. It is under these circumstances that predictive analysis becomes an absolute necessity.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 18. A Simple PEST Example
- **Subsection:** 18.2 Predictive Analysis

### Additional Summaries
- **Higher-Level Summary:** The text describes using soil clod shrinkage data to fit two straight lines using Equation 18.1.1 with parameters s1, s2, y1, and xc in the pestex subfolder. The TWOLINE program reads parameters and water contents from in.dat, adjusts parameters using PEST, and generates input files for calculations. The final prediction value is 0.786.
- **Detailed Summary:** This text details the process of using soil clod shrinkage data for modeling. PEST software is employed to estimate parameters and generate input files for TWOLINE calculations. A composite model is run under calibration and prediction conditions, with specific steps outlined for predictive analysis. The final prediction value is 0.786.

### Related Context
- **Previous Summary:** in2.tpl and out2.ins (provided) are, respectively, a template for in2.dat and an instruction file for reading the prediction from out2.dat.  Both in.tpl and in2.tpl contain parameter spaces for parameters used in both calibration and prediction model runs; these parameters are written to both input files before running the composite model.
- **Next Summary:** This document references: Banta et al. (2006) (JUPITER API), Bayer and Finkel (2007) (evolution strategies), Burrows and Doherty (2015) (paired models), Christensen and Cooley (1999) (prediction intervals), Cooley (1983) (variably saturated flow), Cooley and Vecchia (1987) (nonlinear intervals), Doherty (2015) (calibration and uncertainty), Doherty and Simmons (2013) (groundwater modeling), Doherty and Vogwill (2015) (models and decision-making), Duan (1991) (global optimization), Duan et al. (1992, 1993, 1994) (SCE-UA), Hansen and Ostermeier (2001), Hansen et al. (2003) (CMA-ES), Hill (1992) (MODFLOWP), Kavetski et al. (2006) (hydrological model calibration), Nearing (2001) (mathematical tools), Paige and Saunders (1982a, 1982b) (LSQR), Vecchia and Cooley (1987) (prediction intervals), and White et al. (2014) (model error).

### Metadata
- **Keywords:** PD1
- **Chunk ID:** abf50450ab5d
- **Chunk Index:** 1
- **Previous Chunk ID:** c96a8534c7bf
- **Next Chunk ID:** 3dbb282f9572

---

## Context

### Summary
**Run PEST to find the minimum prediction satisfying calibration constraints. Rerun with finite-difference derivatives (JACFILE=0, DERCOM=1) to compare results. Pareto mode explores the tradeoff between two objective functions (Figure 13.1).  One objective function is the calibration objective function; the other is the prediction objective function (weights start at zero and increase).  The process ends when prediction weights reach a user-specified level.**

### Header
**12.8 An Example**

### Content
Check the PEST input dataset using PESTCHEK and then run PEST to obtain the minimum model prediction that satisfies calibration constraints. This should be about 8.60.
You can repeat these PEST runs with derivatives calculated by PEST using finite differences if you wish. For each of the two PEST control files, do the following:
1. Alter the value of JACFILE (sixth variable on the fifth line) to 0.
2. Alter the value of DERCOM for each parameter (last variable on each line of the “parameter data” section) to 1.
Check your work with PESTCHEK and then run PEST.
13. Pareto Mode
13.1 The Pareto Front
When an objective function possesses two components it may not be possible to minimise both components simultaneously by varying parameters, because minimisation of one may compromise minimisation of the other, and vice versa. Under these circumstances it is possible to define a “tradeoff curve” between the two objective functions by varying parameters appropriately; see figure 13.1.
|Objective function #2| |
|---|---|
| |Objective function #1|
Figure 13.1 A Pareto front defining the tradeoff between two objective functions.
The “Pareto front” is defined as the locus of points in parameter space along which it is not possible to lower one objective function without raising the other. At one end of the Pareto front, one of the two objective functions is minimised, while at the other end of the Pareto front the other objective function is minimised. (Note that a Pareto front can exist between more than two objective function components, in which case its definition is multi-dimensional rather than two-dimensional as in the above case. However only two components are considered in the present discussion, and only two components are supported by PEST’s “pareto” mode.)
When run in “pareto” mode, PEST’s task is to start at one end of the Pareto front and work its way along the front towards its other end. In most cases of practical interest, there is no need for PEST to actually reach the other end of this front, for much can often be learned through traversing just a part of it.
There are two main uses for PEST’s “pareto” mode. One is exploration of predictive uncertainty. The other is exploration of the tradeoff between expert knowledge on the one hand and goodness of fit on the other hand. As such it can implement a “manual” form of
Tikhonov regularisation whereby the user gets to decide him/herself where the loss of expert knowledge in informing parameters is no longer worth the gains in goodness of fit with the calibration dataset.
PEST’s Pareto functionality will be described in the context of predictive uncertainty analysis first. Following that, some aspects of its application in the regularised inversion context will be presented. Theory underpinning its use in both of these contexts is provided by Doherty (2015). See section 8.5 of Doherty (2015) in particular. This focusses on model-predictive hypothesis testing, an application to which PEST’s Pareto functionality is well suited.
13.2 Exploration of Predictive Credibility
13.2.1 Concepts
The concept of the Pareto front can prove useful in calibration-constrained model predictive uncertainty analysis. In this case one objective function is comprised of members of the calibration dataset. In an ill-posed calibration context this will need to include (extensive) prior information, similar to that used in Tikhonov regularisation. This ensures that parameters remain realistic throughout the ensuing Pareto front traversal process; it also ensures uniqueness of that end of the front. The other objective function component can pertain to one or a number of appropriately-weighted “observations” comprising a prediction of future system behaviour. To the extent that the making of this prediction incurs model-to-measurement misfit, and/or the necessity for parameters to assume unrealistic values, the prediction becomes unlikely, this being measured by the increase in the calibration component of the objective function, the latter rising as the prediction objective function component falls. Through exploration of the tradeoff between the two objective function components, as can be done through definition and traversal of the Pareto front, various predictions can be provided with formal or informal confidence levels.
In exploring the predictive Pareto front, PEST starts at one end of the front (the calibration end) and slowly moves towards the other end. It is assumed that the model has already been calibrated, and that the objective function minimised through this calibration exercise is the same as that defining the calibration end of the Pareto front. (This will be referred to as “the calibration objective function” from now on.) Hence it is assumed that one end of the Pareto front has thereby been located. The other objective function component (henceforth referred to as the “prediction objective function”) is then slowly introduced to the inversion process. Weights associated with the observation or observations which contribute to this objective function are zero at first, but then slowly increase at a user-specified rate. As PEST undertakes a sequence of inversion iterations, in each of which the total objective function is minimised (as is its usual behaviour), the prediction objective function thus receives a greater and greater “hearing” in the overall objective function. Hence as the iteration count increases, PEST’s location on the Pareto front changes from its original location at the calibration end as it moves towards the prediction end. When the weight associated with the prediction objective function rises to a user-specified level, the journey ends.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 12. Model-Calculated Derivatives (continuación)
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** PEST uses pest.mmf to send messages before each run, indicating run type and parameter details. Different commands can be used for regular and derivative-calculating model runs, potentially reducing run time. Models can provide PEST with derivatives more efficiently, supporting various file formats. PEST control file variables manage model commands, messaging, and external derivatives.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** POLYMOD calculates a third-degree polynomial (Equation 12.8.1), a prediction (Equation 12.8.2), and a Jacobian matrix, writing them to poly_val.out and poly_der.out.  poly.pst (estimation mode) and polyp.pst (predictive analysis mode) use poly_der.out for the Jacobian matrix (JACFILE=1, DERCOM=0).  poly.pst aims to minimize the objective function; polyp.pst minimizes the prediction while keeping the objective function ≤1.0.
- **Next Summary:** To use Pareto mode, set PESTMODE to "pareto", include a "pareto" section (Figure 13.2), and use calibrated parameter values as initial values.  PARETO_OBSGROUP names the group whose weights are adjusted (often a single prediction). PARETO_WTFAC_START and PARETO_WTFAC_FIN set the initial and final weight factors; NUM_WTFAC_INC sets the number of increments.  Utilities (Part II) aid visualization.

### Metadata
- **Keywords:** DERCOM, JACFILE
- **Chunk ID:** 95041fee0c49
- **Chunk Index:** 2
- **Previous Chunk ID:** 91d83a0865d6
- **Next Chunk ID:** 1e38e45dfce7

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
