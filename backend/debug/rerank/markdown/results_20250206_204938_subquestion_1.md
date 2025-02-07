# Search Results for: How does PEST manage the calculation of derivatives for grouped parameters?

Keywords: None


## Context

### Summary
**PEST calculates Jacobian matrix elements (partial derivatives) using finite differences, unless the model provides them.  Accurate derivatives are crucial;  ill-posedness is handled by SVD or LSQR, but poor model numerics can hinder PEST performance.  Parameters are grouped to manage derivative calculations; individual parameter treatment is possible.**

### Header
**3.5.1 General**

### Content
The ability to calculate partial derivatives of all observations with respect to all adjustable parameters is fundamental to implementation of the inversion methodologies supported by PEST. These derivatives are stored as the elements of the Jacobian matrix. Because PEST is independent of any model of which it takes control, it cannot calculate these derivatives using formulae specific to the model. Hence it must evaluate the derivatives itself using model outputs calculated on the basis of incrementally varied parameter values. Note, however, that there may be occasions where a model can calculate derivatives of its outputs with respect to its adjustable parameters itself. If this is the case, PEST can make direct use of these derivatives if they are provided to it in the correct format. This is further discussed later in this manual.
Accuracy in derivatives calculation is fundamental to good PEST performance. In early versions of PEST, failure to minimise an objective function may sometimes have been attributable to ill-posedness of an inverse problem. The Gauss-Marquardt-Levenberg method relies on inversion of the so-called “normal” matrix (enhanced by the addition of the Marquardt lambda to its diagonals) to calculate an updated parameter set. Where an inversion problem is ill-posed this matrix is singular and hence cannot be inverted. Hence progress of the parameter estimation process becomes impossible.
These days things are very different. Use of singular value decomposition or LSQR to solve the inverse problem guarantees unconditional numerical stability of the solution process, whether the problem is well-posed or not. The addition of Tikhonov regularisation guarantees achievement of a parameter set of minimum error variance in solution of that problem. The only thing that can prevent PEST from solving an inverse problem is lack of integrity of partial derivatives contained in the Jacobian matrix. This can be caused by the presence of round-off errors in taking differences of small quantities, as is required for computation of partial derivatives using finite differences. It can also be an outcome of poor model numerical performance whereby changes to model outputs following incremental changes in parameters are caused not only by alterations to parameter values, but also by problematic convergence of the model’s solver, or by the presence of artificial thresholds and discontinuities in its simulation algorithm.
Fortunately, as the present section shows, it may still be possible to use PEST with a model even if it falls victim to numerical idiosyncrasies which compromise differentiability of model outputs with respect to adjustable parameters. However if its numerical behaviour is too degraded, then PEST’s performance may suffer to the point where it cannot be used with that model. In this case a global optimiser must be used to calibrate the model; access is thereby lost to the advanced regularisation features provided by PEST.
The PEST input variables which govern finite-difference derivatives calculation are assigned to parameter “groups”. In the PEST control file, each parameter must be assigned to a group. The assignment of derivative-pertinent variables to groups, rather than to individual parameters, introduces savings in memory and complexity of the PEST input dataset. Furthermore, in many instances, parameters naturally fall into one or more categories. For example, if the domain of a two- or three-dimensional spatial model is parameterized using
pilot points, pilot-point parameters which describe system properties of the same type would normally be assigned to the same group. However, if you wish to treat each parameter differently as far as derivatives calculation is concerned, this can be achieved by assigning each parameter to a group of its own.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 3. What PEST Does
- **Subsection:** 3.5 The Calculation of Derivatives

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** PEST calculates Jacobian matrix elements using finite differences unless provided by the model. Accurate derivatives are crucial, managed by SVD or LSQR for ill-posedness. Parameters are grouped for derivative calculation management. PEST offers forward, central, and five-point finite-difference methods, with central methods providing higher accuracy. Model-calculated derivatives are preferred for accuracy and speed.

### Related Context
- **Previous Summary:** PEST mitigates parameter over-adjustment using a dampening method (Cooley 1983, Hill 1992).  A dampening factor ρ is calculated based on the maximum relative (p), absolute (a), and factor (q) changes compared to the previous iteration (p0i, a0m, q0l, u0k).  ρ modifies the parameter upgrade vector to reduce oscillations.
- **Next Summary:** PEST calculates derivatives using forward (one model run per parameter), central (two runs), or five-point (four runs) finite-difference methods. Central methods (outside points, parabolic, least-squares) offer higher accuracy than forward differences. Five-point methods use equation 3.5.1, with α and β from equations 3.5.2-3.5.5 for precision or minimum error variance.

### Metadata
- **Keywords:** 
- **Chunk ID:** 1ef28549994c
- **Chunk Index:** 1
- **Previous Chunk ID:** ab6526c6143e
- **Next Chunk ID:** 84d79eb825ab

---

## Context

### Summary
**PESTPP-GLM and PESTPP-OPT require accurate derivatives (calculated via finite differences),  sensitive to model numerical issues (round-off errors, solver convergence, discontinuities).  Poor derivatives may prevent use;  consider PESTPP-GLM's differential evolution or PESTPP-IES's randomized Jacobian as alternatives. Derivative control variables are assigned to parameter groups (reducing dataset complexity).**

### Header
**3.3.1 General**

### Content
The ability to calculate partial derivatives of model outputs with respect to adjustable parameters and/or decision variables is fundamental to implementation of the inversion and linear uncertainty analysis methodologies implemented by PESTPP-GLM, and to management optimization under chance constraints implemented by PESTPP-OPT. Because programs of the PEST++ suite interact with a model non-intrusively, they must evaluate these derivatives themselves, using model outputs calculated on the basis of incrementally varied parameters and/or decision variables.
Accuracy in derivatives calculation is fundamental to good performance of numerical methods that solve an inversion or optimization problem through a series of local linear approximations. Solution of the overall problem is then achieved iteratively. Methods which rely on successive local linearization are often referred to as “gradient methods”.
Reduction of the numerical integrity of finite-difference derivatives may arise from the presence of round-off errors in numbers that are recorded on model output files. It can also be an outcome of poor model numerical performance, whereby changes in model outputs following incremental changes in the value of a parameter are caused not only by alterations to the parameter’s value, but also by problematic convergence of the model’s solver, or by the presence of artificial thresholds and discontinuities in the model’s simulation algorithm. Fortunately, many algorithms which rely on finite-difference derivatives have a moderate tolerance for errors in these derivatives. However, if the numerical behaviour of a model is too degraded, then the performance of programs which require finite difference derivatives may suffer to the point where they cannot be used with that model. In this case alternative estimation/optimization tools must be sought. The differential evolution process supported by PESTPP-GLM, and the randomized Jacobian process supported by PESTPP-IES provide such alternatives.
The variables which control finite-difference derivatives calculation are assigned to parameter groups rather than to individual parameters. Parameters are assigned to groups in a PEST control file. The assignment of derivative-pertinent control variables to groups, rather than to individual parameters, reduces the complexity of a PEST++ input dataset. Furthermore, in many instances, parameters naturally fall into a small number of categories. For example, if the domain of a two- or three-dimensional spatial model is parameterized using pilot points, pilot-point parameters which describe system properties of the same type would normally be assigned to the same group. However, if you wish to treat each parameter differently as far as derivatives calculation is concerned, this can be achieved by assigning each parameter to a group of its own.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 3. Some Important PEST++ Features
- **Subsection:** 3.3 Calculation of Derivatives

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** PEST is a tool that iteratively solves inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses Jacobian matrices and Marquardt lambda for parameter estimation. Different methods are employed based on problem types, with options for uncertainty analysis and parallel processing to reduce computational costs.

### Related Context
- **Previous Summary:** PESTPP-GLM limits parameter changes per iteration using relative (Equation 3.2, |b – b₀|/|b₀| ≤ r) and factor (Equation 3.1, b₀/f ≤ b ≤ fb₀ if b₀>0; fb₀ ≤ b ≤ b₀/f if b₀<0) limits (PARCHGLIM in "parameter data" section; RELPARMAX, FACPARMAX in "control data" section).  FACORIG prevents very small parameters from overly restricting changes.  Suitable OFFSET values can also mitigate issues with low parameter values.
- **Next Summary:** PEST++ programs calculate derivatives using forward differences (one run per parameter) or central differences (two runs). Central difference methods include outside points, parabolic (high precision needed), and least-squares (best for low precision). Each iteration requires at least one to twice the number of adjustable parameters, depending on the method used.  Log-transformed parameters require an additional calculation.

### Metadata
- **Keywords:** 
- **Chunk ID:** c600067e6196
- **Chunk Index:** 1
- **Previous Chunk ID:** b884d9cac001
- **Next Chunk ID:** b9994d920798

---

## Context

### Summary
**For highly parameterized models (tens of thousands), model-calculated derivatives (adjoint techniques, Chapter 12) are necessary due to the excessive number of model runs and imprecision of finite differences.  Compressed binary external derivatives files are recommended; elements should be ordered by observation then parameter for optimal efficiency.**

### Header
**15.2 Derivatives Calculation**

### Content
Where a large number of parameters is being estimated (in the tens of thousands) it becomes mandatory that derivatives be calculated by the model itself using algorithms such as adjoint techniques which have been developed specifically for this purpose. Use of the finite-difference methodology for calculation of derivatives becomes impossible under these circumstances for two reasons. These are:
- the large number of model runs that this requires; and
- the lack of numerical precision that accompanies finite-difference calculation of derivatives with respect to parameters whose individual sensitivities may be low because of their large collective number.
As was discussed in chapter 12 of this manual, a model can supply self-calculated derivatives to PEST using an external derivatives file. Disk space and reading time can be saved if the compressed storage protocol is used for this file, and if binary, rather than ASCII storage is employed.
If using the compressed option for storage of external derivatives, and if using compressed Jacobian matrix storage within PEST itself (see below), maximum efficiency in reading the external derivatives file is achieved if indexed derivative matrix elements listed in the external derivatives file are cited in the same order as that in which they are stored internally by PEST in its Jacobian matrix. Storage order within the PEST Jacobian matrix is column by column; hence indexing in the external derivatives file should progresses firstly by observation, and then by parameter.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 15. Large Numbers of Parameters
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter discusses efficient calibration methods for models with tens of thousands of parameters using PEST. Adjoint techniques are recommended for highly parameterized models. Use compressed binary external derivatives files, 64-bit versions of PEST for large problems, and optimize Jacobian matrix storage. Prioritize linearity of regularization constraints and activate memory conservation for improved efficiency.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** This chapter details methods for efficiently calibrating models with tens of thousands of parameters using PEST;  these methods are necessary for optimal performance.
- **Next Summary:** For large problems, use 64-bit versions of PEST, Parallel PEST, BEOPEST, and their utilities for faster execution and increased memory capacity.

### Metadata
- **Keywords:** 
- **Chunk ID:** 5d358602f4e2
- **Chunk Index:** 1
- **Previous Chunk ID:** b40a94d10b5e
- **Next Chunk ID:** 99e9db574a30

---

## Context

### Summary
**Maximize model output precision (especially for PESTPP-GLM/PESTPP-OPT) by adjusting model control variables to prioritize precision over speed. Tighten solver convergence criteria but avoid excessively long runtimes. Larger parameter increments and three-point derivative methods (parabolic or best-fit) can mitigate granular outputs from adaptive time-stepping or model algorithms.  Precise inter-submodel data transfer is also crucial for composite models.**

### Header
**3.3.5 How to Obtain Derivatives You Can Trust**

### Content
Reliability of derivatives calculation can suffer if the model which you are trying to calibrate, or which you are employing for management optimization, does not write its outcomes to its output file(s) using many significant figures. If you have any control over the precision with which a model writes its output data, you should request that the maximum possible precision of representation be used. Although PESTPP-GLM and PESTPP-OPT will happily attempt adjustment of parameters or decision variables on the basis of limited-precision model outputs, their ability to perform their parameter estimation or decision variable optimization tasks decreases as the precision of model outputs decreases.
If a model is comprised of multiple sub-model executables run through a batch or script file, then you should also ensure that numbers are transferred between these various sub-models with maximum precision. Thus, every sub-model comprising the composite model should record numbers to those of its output files which are read by other sub-models with full numerical precision.
Many models employ finite difference or finite element approximations to partial differential equations. Through these models, problems which are continuous in space and time are approximated by discrete representations of the same problem in order that the partial differential equation(s) describing the original problem can be cast as a matrix equation of high order. The resulting matrix equation is then often solved by an iterative technique in which the system state solution vector is successively approximated until “convergence” is judged to have been attained. Most iterative solvers deem a solution to be acceptable when no element of the solution vector varies by more than a user-specified tolerance between successive iterations. If this threshold is set too large, model output precision is reduced. This may not matter for some model applications. However, it may seriously compromise the numerical integrity of finite-difference derivatives calculated by programs of the PEST++ suite. Hence a model’s solution convergence criterion may need to be set tighter than normal when that model is being used with PESTPP-GLM or PESTPP-OPT than when it is being used on its own. Caution must be exercised, however. If the closure criterion is set too small, this may result in excessively long run times, or even model-perceived failure of the iterative solution process.
Sometimes the adaptive time-stepping scheme employed by a highly non-linear model can contribute to numerical granularity of its outputs. An incremental variation in the value of a particular parameter may lead to adoption of a different time-stepping strategy by a model from that which it employed for the non-incremented parameter. Differences in model outputs at a particular simulation time may then partially reflect the solution trajectory; they may not therefore be a unique function of the difference in parameter values.
If numerical models of these types are to be used with PESTPP-GLM and PESTPP-OPT whose algorithms rely on finite difference derivatives, it is important that model control variables that govern its numerical solution procedure be set in favour of precision over execution speed. Although the model run-time may increase as a result, the time spent in solving an inversion or optimization problem may actually be reduced.
Even after you have instructed the model to write to its output file(s) with as much precision as possible, and you have adjusted the model’s solution settings for heightened precision, model outputs may still be “granular” because of the nature of a simulator’s algorithm. In this case it may be wise to set parameter increments larger than you normally would, in order that local “bumps” in model outputs are bridged by these increments. While use of a large increment incurs penalties due to poor representation of a derivative by a finite difference (especially for highly nonlinear models), this can be mitigated by the use of one of the three-point methods of derivatives calculation offered by programs of the PEST++ suite. Because of its second order representation of the relationship between model output and parameter values, the parabolic method can generate reliable derivatives even for large parameter increments. However, if model outputs are really bumpy, the best-fit method may be more accurate.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 3. Some Important PEST++ Features
- **Subsection:** 3.3 Calculation of Derivatives

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** PEST is a tool that iteratively solves inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses Jacobian matrices and Marquardt lambda for parameter estimation. Different methods are employed based on problem types, with options for uncertainty analysis and parallel processing to reduce computational costs.

### Related Context
- **Previous Summary:** FORCEN ("always_2", "always_3", or "switch") selects the derivative method (forward, central, or switching from forward to central based on PHIREDSTP).  DERMTHD ("outside_pts", "parabolic", or "best_fit") specifies the central difference method. DERINCMUL multiplies DERINC for central differences. DERINCLB sets a minimum absolute increment for "relative" and "rel_to_max" methods (not multiplied by DERINCMUL).
- **Next Summary:** Poor PESTPP-GLM or PESTPP-OPT performance may indicate issues with finite-difference derivatives.  Use JACTEST, POSTJACTEST, and MULJCOSEN (Part II of the PEST manual) to assess derivative integrity.

### Metadata
- **Keywords:** 
- **Chunk ID:** 1bd7e570c0b5
- **Chunk Index:** 1
- **Previous Chunk ID:** dc6e99c4d13d
- **Next Chunk ID:** 906e5691bc49

---

## Context

### Summary
**In PEST's "predictive analysis" mode with external derivatives, the "predict" group's observation must be last in the PEST control file and derivatives matrix; otherwise, errors may occur.**

### Header
**12.4.9 Predictive Analysis Mode**

### Content
It is very important to note that if PEST is used in “predictive analysis” mode and at least some derivatives are supplied externally, then the sole member of the observation group “predict” must be the last observation cited in the PEST control file. Because the ordering of observations in the PEST control and external derivatives files must be the same, then derivatives for this observation must also comprise the last row of the derivatives matrix contained in the external derivatives file.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 12. Model-Calculated Derivatives (continuación)
- **Subsection:** 12.4 Externally-Supplied Derivatives

### Additional Summaries
- **Higher-Level Summary:** PEST uses pest.mmf to send messages before each run, indicating run type and parameter details. Different commands can be used for regular and derivative-calculating model runs, potentially reducing run time. Models can provide PEST with derivatives more efficiently, supporting various file formats. PEST control file variables manage model commands, messaging, and external derivatives.
- **Detailed Summary:** Models can provide PEST with derivatives more efficiently than PEST's finite difference method. PEST can utilize these model-calculated derivatives via specially formatted external files, supporting ASCII, compressed ASCII, and binary formats. Models must be modified to create these files, which differ from PEST's Jacobian matrix and do not consider parameter transformations.

### Related Context
- **Previous Summary:** The name of the external derivatives file, which must not conflict with existing PEST files (Appendix B), is specified in the "derivatives command line" section of the PEST control file.
- **Next Summary:** Parallel PEST and BEOPEST do not support receiving derivatives via external files.

### Metadata
- **Keywords:** 
- **Chunk ID:** e6d19a8d52fb
- **Chunk Index:** 1
- **Previous Chunk ID:** 366cd1c9d7d8
- **Next Chunk ID:** 151b01f8fd63

---
