# Search Results for: What is a pest?

Keywords: None


## Context

### Summary
**PEST is advanced software for environmental model calibration and uncertainty analysis.  It acknowledges model parameter and prediction uncertainties, supporting decisions by identifying unlikely future events rather than predicting certain outcomes.  Used with other software, PEST quantifies uncertainties and helps decision-making by embracing real-world complexity.  Doherty (2015) provides theoretical background.**

### Header
**1.4 Philosophy**

### Content
At the time of writing, the PEST suite is by far the most advanced software available for environmental model calibration, and for post-calibration uncertainty analysis. As such, it holds a unique place in the environmental industry – not just for what it can do, but for what it can teach us about environmental modelling.
PEST, and its ancillary software, embraces the fact that environmental systems are complex, and that a model’s parameters and predictions are uncertain. Its use supports the critical notion that a model can never tell us what will happen in the future following adoption of a certain environmental management practice; this is an outcome of the uncertainties associated with most model predictions of environmental interest. However a model may tell us, with a high degree of confidence, what will NOT happen in the future. In order to accomplish this, it cannot be deployed on its own; instead it must be deployed in conjunction with high-end inversion software such as PEST. Under these circumstances models may then provide invaluable support to the decision-making process by allowing rejection of hypotheses that unwanted events will occur if certain courses of management action are taken. (These courses of management action will often include installation of monitoring systems which trigger responses to the crossing of pre-defined measurement thresholds.)
It follows that a model, as a simulator, does not constitute a decision-support tool. In contrast, the model, as a simulator, should constitute one of a number of software packages, which are used in partnership to
- quantify the uncertainties associated with predictions of management interest, and
- reduce those uncertainties to a level that is commensurate with information available from expert knowledge on the one hand and the historical behaviour of a system on the other hand.
Software packages used in concert to achieve these ends collectively constitute an indispensable tool for decision-support – a tool which embraces the complexity of the real world at the same time as it provides decision-makers with an understanding of the ramifications of that complexity for the decisions that they must make.
For a full discussion of the role of models in decision-making see Doherty and Simmons (2013) and Doherty and Vogwill (2016).
1.5 PEST- The Book
The following book can be downloaded from the PEST web site:
Doherty, J., 2015. Calibration and uncertainty analysis for complex environmental models. Published by Watermark Numerical Computing, Brisbane, Australia. 227pp, ISBN: 978-0-9943786-0-6
The numerous references to Doherty (2015) throughout this manual are to this text.
Doherty (2015) covers in details all of the theory embodied in PEST and its utility support software. It also discusses the ramifications of this theory for how models should be used in real-world environmental decision-making. It provides an extensive discussion on the theory and practice of regularisation – whether this is done manually through parameter simplification, or mathematically using subspace or Tikhonov methods. It also provides a critique of manual regularisation, and provides an in-depth discussion on why it is important to reflect environmental system complexity in model parameterisation complexity if models are to play a useful role in support of environmental decision-making. It shows how parameter nonuniqueness is not something to run away from, but something to embrace; after all, it is the parameters that cannot be estimated that contribute most to predictive uncertainty - generally much more than those which can be estimated. It demonstrates that the use of many parameters in an inversion problem does not necessarily lead to over-fitting; nor does it promulgate numerical instability, or result in solutions to the inverse problem which are unnecessarily complex. The book shows that parameter simplification is fundamental to achievement of a unique solution to an inverse problem, and that achievement of parameter simplification through mathematical means leads to reduction of potential for model predictive error at the same time as it allows quantification of this potential for error.
Parts I and II of this manual refer to the above book extensively. They do not repeat the theory presented in the book; nor do they discuss the ramifications of that theory for model deployment in the decision-making context. This enables these manuals to be somewhat shorter than they would otherwise be; it also enables them to concentrate on implementation details. As a PEST user, you are strongly advised to read the book, for this will provide you with the theoretical basis that you need to get the most out of PEST.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 1. Introduction
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** To install PEST, copy its executables to a folder in the PATH variable for access from any directory. The suite includes PEST, Parallel PEST, BEOPEST, SENSAN, global optimizers, and utilities. PEST calibrates models by matching outputs to measurements, handling non-uniqueness through regularization. It quantifies uncertainties and supports decision-making by identifying unlikely events.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** PEST, a model-independent parameter estimation program, calibrates models by matching outputs to measurements.  It handles model calibration's inherent non-uniqueness through regularization.  The suite also assesses parameter and predictive uncertainty using linear and nonlinear methods, including null space Monte Carlo, and analyzes model defects' effects on predictions.
- **Next Summary:** PEST runs models via system calls, requiring command-line accessibility; ideally, the model's directory should be in the PATH variable.  PEST can handle models run via batch files or scripts, including pre- and post-processors and multiple simulators.  To prevent errors, batch files should delete intermediate files.  The "start /w" command (Windows) prevents premature PEST output file checks, and keyboard input can be redirected from a text file.

### Metadata
- **Keywords:** 
- **Chunk ID:** 98ea592f521d
- **Chunk Index:** 1
- **Previous Chunk ID:** 8d302ce6af24
- **Next Chunk ID:** 6ad562368195

---

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
**PEST, a model-independent parameter estimation program, calibrates models by matching outputs to measurements.  It handles model calibration's inherent non-uniqueness through regularization.  The suite also assesses parameter and predictive uncertainty using linear and nonlinear methods, including null space Monte Carlo, and analyzes model defects' effects on predictions.**

### Header
**1.3 Concepts**

### Content
Historically, the first program that comprised the PEST suite was PEST itself. PEST stands for “parameter estimation”. It was originally written to expedite the process of model calibration wherein values for model parameters are back-calculated by matching model outputs to measurements of system state. “Parameters” employed by a model can represent the properties of the materials in which processes simulated by the model take place, the stresses which initiate and support those processes, or both. What made PEST different from parameter estimation software which preceded it was the fact that PEST operates in a model-independent manner; it interacts with a model through the model’s own input and output files. Hence no programming is required to use PEST to calibrate a model.
Model calibration falls into a broad class of numerical methods which mathematicians describe as “inversion”. In general, solution of an inverse problem is nonunique. However it can be re-caste as unique if only a small number of parameters is estimated. The process of parameter simplification that is a necessary precondition for attainment of uniqueness is known as “regularisation”. This can be done manually prior to estimating parameters. Or it can be done by the inversion process itself. In general it is better to do it the latter way. PEST accommodates both.
Because of the generally nonunique status of the inverse problem whose solution is required for calibration of a model, and because the observation dataset which is used for model calibration is generally noisy, parameters estimated through the model calibration process are uncertain. Furthermore the relationships between parameters estimated through inversion and the actual system properties which they represent can be unclear. One of the benefits of adopting a highly parameterized approach to inversion, in which the regularisation required for attainment of inverse problem solution uniqueness is accomplished as part of the solution process itself, is that the issues of parameter uncertainty, and of the relationships between estimated parameters and their real-world counterparts, can then be explored. In fact, where the relationship between model parameters and model outputs can be approximated as linear, exploration of these issues becomes easy. The PEST suite includes a number of programs which are designed for this purpose. Some of these programs have their roots in Bayes equation; others employ subspace methods based on singular value decomposition. All of them provide interesting insights into the inversion process.
The PEST suite also provides methods for exploration of pre- and post-calibration parameter uncertainty which do not require an assumption of model linearity. PEST input files can be populated with random parameter sets; model runs can then be undertaken using each of these sets so that the variability of model outputs of interest can be explored. Random parameter sets can be constrained, using the so-called “null space Monte Carlo” method which is unique to PEST, so that model outputs fit calibration datasets; the null space Monte Carlo methodology uses subspace concepts to accomplish the normally difficult task of enforcing parameter constraints on random parameter values in a numerically efficient manner.
If a model’s parameters are uncertain, then so too are its predictions. Quantification of model predictive uncertainty is essential to model-supported environmental decision-making; if predictive uncertainty cannot be assessed, then it is not possible to include the vital element of risk in the decision-making process. The PEST suite provides both linear and nonlinear methodologies for quantification of predictive uncertainty. Some are extensions of the
parameter uncertainty assessment methods mentioned above. Others are more “prediction focussed”. The latter include PEST’s predictive analysis functionality and PEST’s Pareto capabilities. Both of these can be used to directly test the hypothesis that the value of a particular model prediction is compatible with both expert knowledge (as encapsulated in reasonableness of parameter values) and the historical behaviour of a system (as encapsulated in a calibration dataset).
Further functionality provided through the PEST suite allows a modeller to explore the effects of model defects on predictions made by a model, both before and after the model’s parameters have been subjected to history-matching constraints. All environmental models are defective because all environmental models are simplifications of reality. This has important repercussion for the way in which a model should be calibrated, and for assessing the credibility of the different types of predictions which a model is asked to make.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 1. Introduction
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** To install PEST, copy its executables to a folder in the PATH variable for access from any directory. The suite includes PEST, Parallel PEST, BEOPEST, SENSAN, global optimizers, and utilities. PEST calibrates models by matching outputs to measurements, handling non-uniqueness through regularization. It quantifies uncertainties and supports decision-making by identifying unlikely events.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** The PEST suite includes PEST, Parallel PEST, BEOPEST, SENSAN, global optimizers, and utility programs.  Part I of this manual details PEST, Parallel PEST, BEOPEST, SENSAN, and the optimizers. Part II covers utilities for dataset construction, checking, processing, and various analyses.  Additional utilities for groundwater and surface water modeling are documented separately.
- **Next Summary:** PEST is advanced software for environmental model calibration and uncertainty analysis.  It acknowledges model parameter and prediction uncertainties, supporting decisions by identifying unlikely future events rather than predicting certain outcomes.  Used with other software, PEST quantifies uncertainties and helps decision-making by embracing real-world complexity.  Doherty (2015) provides theoretical background.

### Metadata
- **Keywords:** 
- **Chunk ID:** 8d302ce6af24
- **Chunk Index:** 1
- **Previous Chunk ID:** e258adc9d3c0
- **Next Chunk ID:** 98ea592f521d

---

## Context

### Summary
**This chapter provides a PEST overview, referencing Doherty (2015) for theoretical details.  Control variables (detailed later) affect PEST's operation.  Part I covers PEST, SCEUA_P, CMAES_P, and SENSAN; Part II covers supporting utilities.**

### Header
**3.1 General**

### Content
This chapter provides an overview of what PEST does. A general understanding of its operations is required before its operational details can be explained, and before descriptions can be provided of ways in which you can alter its operational details to suit your own modelling and inversion purposes.
All of the theory on which PEST and its utility support software is based is presented in Doherty (2015) (i.e. the “PEST book”) and will not be repeated in this manual. However, where necessary, equations from the PEST book will be cited herein so that you can easily relate aspects of PEST’s operations to the theory which supports them.
Where applicable, variables which control the way in which PEST performs will be mentioned in the following overview. These variables reside in the PEST control file. While later chapters will describe this file in detail, it is introduced below to set a context for the subject matter of the present chapter.
As was discussed in the introduction to this text, utility software which supports and compliments the use of PEST is documented in part II of this manual. Part I of the PEST manual (i.e. the document that you are reading right now) describes PEST itself, the global SCEUA_P and CMAES_P optimisers, and the very basic SENSAN sensitivity analyser.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 3. What PEST Does
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** Instruction files are created via text editor or specialized software.  Errors cause run-time errors or unexpected results. PESTCHEK (for all instruction files) and INSCHEK (for a single file) verify instruction file syntax and can test output reading.
- **Next Summary:** PEST uses template and instruction files (discussed previously), and a single control file (detailed in Chapter 5 and Appendix A). The control file uses free-field formatting; text is case-insensitive and begins with "pcf".  Some sections and variables are optional.

### Metadata
- **Keywords:** 
- **Chunk ID:** 75f6986ebb4a
- **Chunk Index:** 1
- **Previous Chunk ID:** 9d367608c018
- **Next Chunk ID:** 89599948116e

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
