# Search Results for: Can you explain the relationship between model calibration and linear uncertainty analysis?

Keywords: None


## Context

### Summary
**REGERR calculates the covariance matrix of regularization-induced model output error (τ, Equation 11.9.2) using a RESPROC output file (R matrix) and JCO file (Z matrix), checking only that the number of parameters is the same in both files. It  omits measurement noise and is similar to the predictive error covariance matrix.**

### Header
**11.9.1 General**

### Content
REGERR evaluates the covariance matrix of regularisation‑induced model output error. For present purposes this is defined as
τ = Z(I – R)k
(11.9.1)
so that
C(τ) = Z(I – R)C(k)(I – R)tZ t
(11.9.2)
In this equation C(k) is, as usual, the pre‑calibration parameter covariance matrix, R is the resolution matrix for the current inverse problem, and Z is the Jacobian matrix. REGERR obtains R from a RESPROC output file and Z from a Jacobian matrix file (i.e. a JCO file). Presumably these will both pertain to the same PEST input dataset. However REGERR only tests that the number of parameters cited in the RESPROC output file and the number of parameters cited in the Jacobian matrix file are the same. The number of observations can differ between these two files. Thus the Jacobian matrix file can pertain to model outputs that differ from those employed in the calibration process if desired; the covariance matrix of regularisation‑induced predictive error can thereby be calculated. The latter is very similar to the covariance matrix of predictive error; however it lacks the contribution to this error from measurement noise.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 11. Linear Error and Uncertainty – Part II
- **Subsection:** 11.9 REGERR

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** REGERR calculates regularization-induced model output error covariance matrices by processing RESPROC output file (R matrix) and JCO file (Z matrix), ensuring the same number of parameters in both files. It is similar to the predictive error covariance matrix and prompts for specific input files and output filename in PEST matrix format. Use `regerr`.

### Related Context
- **Previous Summary:** PREDERR3 is like PREDERR2 but reads R and G matrices from a single, unformatted RESPROC output file, instead of separate files.
- **Next Summary:** REGERR calculates regularization-induced output error covariance matrices. It prompts for a RESPROC output file, parameter uncertainty file (section 2.5), and JCO file, and an output covariance matrix filename (PEST matrix format, section 2.4). Use `regerr`.

### Metadata
- **Keywords:** 
- **Chunk ID:** e1f7f096604a
- **Chunk Index:** 1
- **Previous Chunk ID:** 86f409062ddb
- **Next Chunk ID:** 4e44efceef23

---

## Context

### Summary
**DSI uses an optional observation transformation file (Figure 18.1) to transform model outputs (scale, offset, log transformation with an emergency base value) before calculating C₂₂ and C₁₂. Transformations can differ per output and prediction; zero-weighted predictions ignore transformation file values.  Gaussian transformation (normal score transformation then mean=0, standard deviation=1.0) is also supported.  For transient conditions, ensure initial states match prediction parameter sets.**

### Header
**18.1.2 Some Usage Details**

### Content
- Suppose that a calibration dataset pertains to transient conditions. Suppose also that the PEST control file that features model predictions is different from that which features calibration outputs. Suppose also that PEST was run using the “/f” switch once to calculate model outputs used in the calibration process, and once to calculate predictions. Calibration and prediction model outputs will therefore be stored in separate RRF files. When undertaking a particular predictive model run, it is important to ensure that the system initial state for that run was computed using the same parameter set as that on which the prediction is based. In many cases these states will have been computed during the calibration model run undertaken using the same parameter set.
18.1.2.3 Model Output Transformations
The theory on which the DSI algorithm is based is correct only if model outputs under both calibration and predictive conditions, as well as the noise associated with measurements comprising a calibration dataset, have Gaussian distributions. Rarely will this be the case in practice. To accommodate this (at least to some extent) DSI allows model outputs (as well as observations to which they correspond) to undergo primitive transformation before formulation of the C22 and C12 matrices discussed above. Optionally, the prediction can be similarly transformed. Note however that different transformations can be assigned to different model outputs, and to the prediction.
DSI prompts for the name of an “observation transformation file”. An example of such a file is shown in figure 18.1. (Note that it is not essential that such a file be provided to DSI.)
|observation|scale|offset|trans|baseval|
|---|---|---|---|---|
|well01_1|2.0|2.0|1|1e-5|
|well02_1|2.0|2.0|1|1e-5|
|well03_1|2.0|2.0|1|1e-5|
|well04_1|2.0|2.0|1|1e-5|
|well05_1|2.0|2.0|1|1e-5|
|well06_1|2.0|2.0|1|1e-5|
|well07_1|2.0|2.0|1|1e-5|
|well08_1|2.0|2.0|1|1e-5|
|well09_1|2.0|2.0|1|1e-5|
|well10_1|2.0|2.0|1|1e-5|
|well11_1|2.0|2.0|1|1e-5|
|well12_1|2.0|2.0|1|1e-5|
|part_time|0.0|1.0|0|1e-5|
|part_east|0.0|1.0|0|1e-5|
Figure 18.1 Part of an observation transformation file.
The first line shown in the above example of an observation transformation file is optional. The first column of an observation transformation file must list observations featured in the PEST control file. These must be recorded in the same order as in the PEST control file itself. Observations featured in a PEST control file cannot be omitted from an observation transformation file even if they have a weight of zero in the PEST control file.
The next two columns of an observation transformation file must contain values of “scale” and “offset”. These are applied to each observation recorded in the PEST control file, as well as to all model output realizations that correspond to that observation (after a realization of measurement noise has been added to each such output). When applying scale and offset, DSI first multiplies by the scale, and then adds the offset.
The next column of an observation transformation file must be comprised of integers. Each integer must be either 0 or 1. If its value is 1 for a particular observation, then the value of the observation and the values of corresponding noise-supplemented model outputs are log-transformed after application of the scale and offset. Under these circumstances, a number must fill the fifth column of the observation transformation file. If the value of the observation or a corresponding noise-supplemented model output, after multiplication by the scale and addition of the offset, is less than the value recorded in this column then it is elevated to this number before log transformation. This number is referred to as the “emergency base value”; its value must exceed zero.
Optionally, values for these same transformation variables can be supplied for the prediction whose uncertainty is being analyzed through a particular DSI run. However, for a prediction, the values of these transformation variables are provided in response to pertinent DSI prompts. If a prediction is featured in a PEST control file, then transformation variables associated with this model output in the observation transformation file are ignored if the prediction has a weight of zero (which is normally the case). The values of predictive transformation variables (if any) supplied through screen prompts take precedence when a particular model output fills a predictive role in calculation of the C12 matrix.
18.1.2.4 Gaussian Transformation
Instead of (or as well as) undertaking scale, offset and/or log transformation, model outputs and predictions can be individually subjected to Gaussian transformation; first they are subjected to normal score transformation, and then to transformation to a normal distribution with a mean of zero and a standard deviation of 1.0. This can sometimes be a more effective
means of achieving Gaussianality than the transformations discussed above. However problems may be encountered when field observations are incompatible with an assumed description of prior parameter uncertainty. This is further discussed below.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 18. Data Space Inversion
- **Subsection:** 18.1 DSI

### Additional Summaries
- **Higher-Level Summary:** The text describes using soil clod shrinkage data to fit two straight lines using Equation 18.1.1 with parameters s1, s2, y1, and xc in the pestex subfolder. The TWOLINE program reads parameters and water contents from in.dat, adjusts parameters using PEST, and generates input files for calculations. The final prediction value is 0.786.
- **Detailed Summary:** The example in the pestex subfolder fits two straight lines to soil clod shrinkage data for residual and normal shrinkage. The model uses Equation 18.1.1 with parameters s1, s2, y1, and xc. Program TWOLINE in the pestex folder reads parameters and water contents from in.dat, calculates specific volumes, and adjusts parameters using PEST to minimize discrepancies with laboratory data.

### Related Context
- **Previous Summary:** DSI conditions a prediction's uncertainty using a PEST control file ("observation data" section only, ignoring prior information and weights=inverse measurement standard deviations) and a run results file (RRF file, created using PEST, BEOPEST, or PEST_HP with the `/f` switch). If using two RRF files (calibration and prediction), realization order must match; DSI requires the number of calibration realizations.  It ignores parameter names and high model output values. DSI1 uses CSV files instead of RRF files.
- **Next Summary:** For Gaussian transformation, DSI creates an array of normal quantiles (using many samples, M) for normal score transformation and back-transformation.  DSI then adds realization ranks (0, 1-NREAL, or NREAL+1) of calibration observations to its output, and counts out-of-bounds ranks (0 and NREAL+1).  This assesses prior distribution compatibility with measurements.

### Metadata
- **Keywords:** 
- **Chunk ID:** 45fc593be7c0
- **Chunk Index:** 2
- **Previous Chunk ID:** 1df223015d02
- **Next Chunk ID:** 63fda7b18ffc

---

## Context

### Summary
**RRF2JCO creates a JCO file from a run results file by calculating a Jacobian matrix based on the parameter and model output values in the run results file.**

### Header
**16.14.1 General**

### Content
RRF2JCO reads a run results file. It calculates a binary Jacobian matrix file (i.e. a JCO file) based on parameters and model outputs that are recorded in this file.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 16. RRF and PAROBS Files
- **Subsection:** 16.14 RRF2JCO

### Additional Summaries
- **Higher-Level Summary:** CMAES_P is a global optimizer for unstable/nonlinear models without derivatives, using PEST input files, supporting multiple observation groups, and running in serial/parallel mode. It lacks IREGADJ and sensitivity calculations but prompts for hybridization parameters. SCEUA_P is a PEST-compatible optimizer for discontinuous/noisy models, with termination criteria and parallelization via `/p` switch.
- **Detailed Summary:** RRF2JCO calculates a Jacobian matrix (Z) from a run results file using Equation 16.14.5. It handles singular matrices by ignoring zero singular values. Users can provide values for Equation 16.14.7. It generates a JCO file from input files and prompts for additional files, with default values available. Use `rrf2jco pestfile mfile/nul/pst ufile/nul rrffile jcofile [sthresh]`.

### Related Context
- **Previous Summary:** RRFCALCPSI calculates objective functions for parameter sets in a run results file (rrffile) using weights, covariance matrices, and prior information from a PEST control file (pestfile), writing results to psifile.  It handles failed (-1.11E35) and abandoned (-1.22E35) runs and uses initial weight factors for "regularization" mode and no weight factors for "pareto" mode.  Use `rrfcalcpsi rrffile pestfile psifile`.
- **Next Summary:** RRF2JCO calculates a Jacobian matrix (Z) from a run results file, using Equation 16.14.5 (Z=C<sub>hk</sub>C(k)⁻¹). C<sub>hk</sub> is calculated empirically (Equation 16.14.7) from model runs using random parameter sets (C(k)). C(k)⁻¹ is computed using SVD (Equation 16.14.6).  Users can optionally supply values for Equation 16.14.7.  Singular matrices are handled by ignoring zero singular values.

### Metadata
- **Keywords:** 
- **Chunk ID:** d55a5f63eded
- **Chunk Index:** 1
- **Previous Chunk ID:** 0fe2d2801739
- **Next Chunk ID:** 023ba2c50273

---

## Context

### Summary
**REGERR calculates regularization-induced output error covariance matrices. It prompts for a RESPROC output file, parameter uncertainty file (section 2.5), and JCO file, and an output covariance matrix filename (PEST matrix format, section 2.4). Use `regerr`.**

### Header
**11.9.2 Running REGERR**

### Content
REGERR is run simply by typing its name at the screen prompt; it then prompts the user specifically for its input data requirements. Prompts, and typical replies, are illustrated below.
Enter name of RESPROC output file: pestcase.rpo
Enter name of parameter uncertainty file: param.unc
Enter name of Jacobian matrix file: pestcase.jco
Enter name for output covariance matrix file: cov.mat
- reading RESPROC output file pestcase.rpo...
- file pestcase.rpo read ok.
- reading Jacobian matrix file pestcase.jco...
- Jacobian matrix file pestcase.jco read ok.
- reading parameter uncertainty data...
- parameter uncertainty data read ok.
calculating regularisation-induced output error covariance matrix...
file cov.mat written ok.
The format of a parameter uncertainty file is discussed in section 2.5 of this manual. The covariance matrix file written by REGERR employs the matrix file protocol discussed in section 2.4 of this manual.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 11. Linear Error and Uncertainty – Part II
- **Subsection:** 11.9 REGERR

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** REGERR calculates regularization-induced model output error covariance matrices by processing RESPROC output file (R matrix) and JCO file (Z matrix), ensuring the same number of parameters in both files. It is similar to the predictive error covariance matrix and prompts for specific input files and output filename in PEST matrix format. Use `regerr`.

### Related Context
- **Previous Summary:** REGERR calculates the covariance matrix of regularization-induced model output error (τ, Equation 11.9.2) using a RESPROC output file (R matrix) and JCO file (Z matrix), checking only that the number of parameters is the same in both files. It  omits measurement noise and is similar to the predictive error covariance matrix.
- **Next Summary:** This chapter details utilities for nonlinear error/uncertainty analysis, using random parameter sets (RANDPAR, sampling prior/posterior distributions or using PNULPAR for null-space projection) and processing prediction values (RDMULRES, MULPARTAB, COMFILNME).  Alternatives include PEST's predictive analyzer (inefficient for many parameters, aided by REGPRED) and Pareto mode (using ASSESPAR for expert knowledge assessment).  Latin hypercube sampling (next chapter) can complement these utilities.

### Metadata
- **Keywords:** 
- **Chunk ID:** 4e44efceef23
- **Chunk Index:** 1
- **Previous Chunk ID:** e1f7f096604a
- **Next Chunk ID:** c636408696fc

---

## Context

### Summary
**The RDMULRES control file (Figure 12.4) includes sections for observations (≤100, unique names, ≤20 characters), instruction file, model output file (with "*"), and an integer list (single integers or ranges).  The model output filenames are created by replacing "*" with integers from the list.  Comment lines (#) and blank lines are ignored.  An output filename is specified.**

### Header
**12.8.2 The RDMULRES Input File**

### Content
RDMULRES requires a control file, an example of which is shown in figure 12.4.
An example RDMULRES input control file.
* observations
initobj
finalobj
* instruction file
obj.ins
* model output file
case_svda*.rec
* integer list
1
4 - 10
12
15
16-100
* rdmulres output file
rdmulres.rec
Figure 12.4 An example RDMULRES control file.
The RDMULRES input control file is subdivided into a number of sections, each of which begins with a section header. Section headers are as shown in the above example; in each case their name is preceded by the “*” character followed by a space.
The “observations” section must contain a list of names for the numbers that must be read from model (or PEST) output files. These must be provided one to a line. As is the normal PEST protocol, these names must be 20 characters or less in length (and are case insensitive); names must be unique. Up to 100 such names can be provided. This limit is set in order to keep the RDMULRES output file (see below) from being too wide.
The “instruction file” section of the RDMULRES control file must contain a single entry, this being the name of an instruction file. This instruction file must cite all observations named in the “observations” section of the RDMULRES input file (and no more). Instruction files must follow the normal PEST protocol; see chapter 2 of part I of this manual. An instruction file suitable for reading the initial and optimised measurement objective function values from a PEST run record file is illustrated in figure 12.5.
pif $
$INITIAL CONDITIONS:$
$measurement$           $=$ !initobj!
$OPTIMISATION RESULTS$
$Optimised measurement$ $=$ !finalobj!
Figure 12.5 An instruction file which reads a PEST run record file.
The model output file which the instruction file is designed to read must be listed as the sole filename cited in the “model output file” section which immediately follows the “instruction file” section of the RDMULRES control file. RDMULRES requires that this filename contain at least one “*” character. In fact, many such output files are read by the same instruction file; the name of each is obtained by replacing the “*” character with an appropriate integer on each occasion.
The integers to employ in formulation of model output filenames in this fashion are listed in the “integer list” section of the RDMULRES control file. Either one or two integers can be listed on each line of this section. If two are listed, the second must be larger than the first, and must be separated from the first integer by a “‑” (i.e. dash) character. (Negative numbers are not allowed.) In this case the “*” character is progressively replaced by all integers between and including the two nominated integers.
The final section of the RDMULRES control file is the “RDMULRES output file” section. Numbers read from model output files are recorded in tabular fashion in this file. See below. If any line within a RDMULRES control file contains no characters, or begins with the “#” character, it is ignored.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 12. Nonlinear Error and Uncertainty
- **Subsection:** 12.8 RDMULRES

### Additional Summaries
- **Higher-Level Summary:** PEST uses pest.mmf to send messages before each run, indicating run type and parameter details. Different commands can be used for regular and derivative-calculating model runs, potentially reducing run time. Models can provide PEST with derivatives more efficiently, supporting various file formats. PEST control file variables manage model commands, messaging, and external derivatives.
- **Detailed Summary:** In Pareto mode, PEST reports the current PARETO_OBSGROUP weight factor per iteration.  Unlike other modes, it produces multiple parameter files (case.par.N), omits case.res, case.rsr, and case.rei (unless REISAVEITN="reisaveitn"), and saves the JCO file only after the first iteration.  Termination criteria are from the "pareto" section;  NOPTMAX still applies.  FORCEN cannot be "switch" or "switch_5".  SVD, LSQR, and AUI are supported.

### Related Context
- **Previous Summary:** RDMULRES reads data from multiple files (e.g., model1.out, model2.out, etc., from a batch file, Figure 12.2, or PEST runs using parval1.par, parval2.par, etc., and pestcase_svda.pst, Figure 12.3).  File names use an indicial integer.  -1.1E35 in model outputs indicates model failure; -1.22E35 indicates an abandoned run. A global record file (record.dat) can track results across multiple PEST runs.
- **Next Summary:** RDMULRES reads multiple model output files (specified in the control file) using an instruction file, reporting progress and errors to the screen. Missing files are noted but don't halt execution. Results are written to an output file (Figure 12.6), easily imported into spreadsheets or graphing programs. Use `rdmulres infile`.

### Metadata
- **Keywords:** 
- **Chunk ID:** 8cc9961ab25c
- **Chunk Index:** 1
- **Previous Chunk ID:** 15d6e85d239c
- **Next Chunk ID:** 297382be569e

---
