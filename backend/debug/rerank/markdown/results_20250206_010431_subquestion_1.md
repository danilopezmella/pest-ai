# Search Results for: Can you explain the general structure of a pest?

Keywords: None


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
**The "parameter data" section of the PEST control file contains variables controlling parameter adjustments.  Additional, general variables are in the "control data" section;  some of their roles are described below.**

### Header
**3.4.1 General**

### Content
Many of the variables which govern the ways in which parameters are adjusted are featured in the “parameter data” section of the PEST control file. Additionally some variables which apply to all parameters, and/or to the inversion process in general, are featured in the “control data” section of the PEST control file. The roles of some of these variables are now discussed.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 3. What PEST Does
- **Subsection:** 3.4 Parameter Adjustment

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** The PEST control file's "parameter data" section manages parameter adjustments, including logarithmic transformations for stability. PARTRANS specifies parameter transformations, with options for fixed, log-transformed, or tied parameters. Bounds, scaling, and offsetting are used to prevent model errors and enhance stability. Parameter changes are limited to prevent over-adjustment. Dampening methods reduce oscillations during optimization.

### Related Context
- **Previous Summary:** Using the "/f" command line switch, PEST performs model runs for different parameter sets without undertaking parameter estimation (details in section 5.1.4).
- **Next Summary:** PEST can adjust parameters or their logarithms (improving numerical stability).  The PARTRANS variable specifies untransformed, log-transformed, fixed, or tied parameters. Log-transformed parameters require log-based prior information and covariance matrices.  PAR2PAR (Part II) handles complex transformations.

### Metadata
- **Keywords:** 
- **Chunk ID:** 659bb97d3636
- **Chunk Index:** 1
- **Previous Chunk ID:** 785a790ad6e4
- **Next Chunk ID:** 2561a12f4553

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
