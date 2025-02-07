# Search Results for: What is jactest?

Keywords: None


## Context

### Summary
**WTSENOUT processes a PEST control file, JCO file, and RES file. It calculates Q<sup>1/2</sup>J and Q<sup>1/2</sup>o (Q=weight matrix, J=Jacobian matrix, o=model outputs), saving Q<sup>1/2</sup>J to a JCO file and Q<sup>1/2</sup>o to an ASCII matrix file (section 2.4). It requires PESTMODE="estimation" and handles observation group covariance matrices. Use  `wtsenout case`.**

### Header
**5.21.1 General**

### Content
“WTSENOUT” stands for “weighted sensitivity and model outputs”. WTSENOUT undertakes the following tasks.
1. It reads a PEST control file and corresponding JCO and RES files (these being the binary Jacobian matrix file and the ASCII residuals file respectively produced as an outcome of running PEST).
2. It calculates Q1/2J where Q is the weight matrix and J is the Jacobian matrix for the current problem. As is explained in part I of this manual, sensitivities comprising elements of the Jacobian matrix pertain only to adjustable parameters; the sensitivities
associated with each particular parameter reflect the transformation status of the parameter, and whether or not any other parameters are tied to it.
1. It computes Q1/2o where o is the model output vector corresponding to best-fit parameters.
2. It records Q1/2J in a binary JCO file (from which an ASCII version can be obtained using the JACWRIT or JCO2MAT utilities).
3. It writes the Q1/2o vector to an ASCII file in PEST matrix file format (see section 2.4 of this manual for specifications of this format).
The following features of WTSENOUT should be noted.
1. WTSENOUT will cease execution with an appropriate error message if the PEST control file which it is asked to read does not inform PEST to run in “estimation” mode. (If the previous PEST run employed another mode, it is a simple matter to create a new PEST control file in which PESTMODE is set to “estimation”, and then use the PARREP utility to populate it with previously estimated parameters as initial parameters. The JCO2JCO utility can then be used to create a corresponding JCO file. PEST can then be run with NOPTMAX set to ‑1, and with the “/i” switch employed on the command line to compute a RES file pertaining to initial parameters; the existing Jacobian matrix is then read by PEST, this saving it the trouble of having to re‑compute it.)
2. It is possible that the best set of parameters, and the model outputs corresponding to these recorded in the residuals file, will have been calculated on the very last PEST upgrade attempt, immediately prior to cessation of PEST execution. The Jacobian matrix stored in the JCO file will then correspond to the iteration just prior to this, and hence will not correspond exactly to the optimised parameter set. If this is the case, and if you would like exact correspondence between the JCO file and the set of model outputs calculated on the basis of best‑fit parameters, a new PEST control file can be created containing optimised parameters using the PARREP utility. PEST can then be run with NOPTMAX set to ‑1 to build the pertinent JCO and RES files.
3. WTSENOUT will accommodate the provision of covariance matrices for one or more observation groups in the PEST control file which it is asked to read.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 5. JCO File Construction and Manipulation
- **Subsection:** 5.21 WTSENOUT

### Additional Summaries
- **Higher-Level Summary:** The text stresses the importance of post-inversion analysis with PEST utility software. It advocates for multiple runs, model revision for poor fits, and subjective evaluation of model-measurement misfit. Regularization, parameter reasonableness, and removal of insensitive parameters are crucial. Tools like EIGPROC, SSSTAT, and GENLINPRED assist in analysis, culminating in a final model run with optimized parameters or manual adjustments.
- **Detailed Summary:** WTSENOUT processes PEST, JCO, and RES files to calculate Q<sup>1/2</sup>J and Q<sup>1/2</sup>o. It saves Q<sup>1/2</sup>J to a JCO file and Q<sup>1/2</sup>o to an ASCII matrix file. PESTMODE="estimation" is required, handling observation group covariance matrices. Use `wtsenout case` or `wtsenout pestfile matfile jcofile` to generate files, ensuring the jcofile is different from the existing JCO file.

### Related Context
- **Previous Summary:** This chapter documents JCOCHEK (Chapter 3), used to verify compatibility between a PEST control file and its corresponding Jacobian matrix file after modification.
- **Next Summary:** WTSENOUT generates weighted model output (matfile) and Jacobian (jcofile) files from a PEST control file (pestfile), JCO file, and RES file.  Use `wtsenout pestfile matfile jcofile`.  Ensure jcofile differs from the existing JCO file.

### Metadata
- **Keywords:** NOPTMAX, PESTMODE
- **Chunk ID:** ac9e7c717956
- **Chunk Index:** 1
- **Previous Chunk ID:** bae599b2b687
- **Next Chunk ID:** 89a424d0a596

---

## Context

### Summary
**CALMAINTAIN compensates for changes (δk₂) in a subset of parameters (k₂) by adjusting another subset (k₁), aiming to maintain calibration (Equation 14.3.3: Z₁δk₁=-Z₂δk₂). It solves exactly if possible; otherwise, it minimizes the right side of Equation 14.3.4.  It uses Equation 14.3.5 (Q<sup>1/2</sup>h=Q<sup>1/2</sup>Zk+Q<sup>1/2</sup>ε) instead of Equation 14.3.1.**

### Header
**14.3.2 Theory**

### Content
Let the action of a (linearized) model Z on its parameters k under calibration conditions be described by the equation
h = Zk + ε (14.3.1)
where ε is a vector of measurement noise. If the parameter set k is partitioned into two sets of parameters k1 and k2, and if measurement noise is neglected, this equation becomes
h = Z1 Z2 k2 k1 = Z1k1 + Z2k2 (14.3.2)
If parameters k2 are altered by δk2, the model will remain in a calibrated state if a set of alterations δk1 to k1 can be found such that
Z1δk1 = -Z2δk2 (14.3.3)
This can only occur if
Z1 Z2 δk2 δk1 = 0 (14.3.4)
That is, if the matrix Z has a null space. If it does not have a null space, or if equation 14.3.3 cannot be solved because one or a number of elements of δk2 lies entirely within the solution space, then δk1 should be chosen such that the right side of equation 14.3.4 is minimized. If this is done, then the model maintains respect for the calibration dataset as much as possible following user‑alterations to k.
CALMAINTAIN solves equation 14.3.3 in the exact sense if it can, and in the least squares sense if it cannot. Thus it finds a δk1 to compensate for a user‑imposed δk2.
Note that the starting equation for CALMAINTAIN’s calculations is actually not equation 14.3.1 at all; instead it uses the following equation, where Q is the weight matrix.
Q1/2h = Q1/2Zk + Q1/2ε (14.3.5)

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 14. Miscellaneous Utilities
- **Subsection:** 14.3 CALMAINTAIN

### Additional Summaries
- **Higher-Level Summary:** Observation re-referencing simplifies derivative calculations by adjusting initial model conditions based on upgraded parameters, improving solver convergence time. It involves creating reference model outputs for accurate derivatives, with specific commands and activation steps. SVDAPREP and BEOPEST support this feature, enhancing model accuracy and efficiency.
- **Detailed Summary:** Observation re-referencing with NUMCOM=1, DERCOM=1 involves three commands: main model command for objective function calculations and parameter upgrades, "d_" command for derivatives, and "r_" command for reference model outputs. For NUMCOM > 1, additional "r_" commands are needed before derivative calculations, except for the first command (index 1). Users create these "r_" commands.

### Related Context
- **Previous Summary:** CALMAINTAIN adjusts parameters to maintain model calibration after altering other parameter values.  It uses linear theory; success depends on model linearity, degree of de-calibration, and null space dimensionality.  It requires a PEST control file with calibrated parameters and a corresponding JCO file.
- **Next Summary:** CALMAINTAIN adjusts parameters to maintain calibration after changes (specified in a parameter adjustment file, Figure 14.2) to other parameters. It prompts for a PEST control file (with JCO file), parameter adjustment file, output parameter value file, solution method ("l" or "s"), number of singular values, and upgrade vector fraction (0.0-1.0).  It uses linear theory (Equation 14.3.3).  Use PARREP and set NOPTMAX=0 to test calibration.

### Metadata
- **Keywords:** 
- **Chunk ID:** 91cc4af72d4e
- **Chunk Index:** 1
- **Previous Chunk ID:** ce978b182871
- **Next Chunk ID:** 1fd4a5136d77

---
