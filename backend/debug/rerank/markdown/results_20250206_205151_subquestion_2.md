# Search Results for: What does GLM stand for?

Keywords: None


## Context

### Summary
**Each prior information line includes PILBL, a prior information equation (PIFAC*PARNME or PIFAC*log(PARNME)), PIVAL (real), WEIGHT (real, ≥0), and OBGNME (≤12 characters).  Equations must be unique.  Use "&" for line continuation between items.  Covariance matrices (section 3.7) can replace weights in the objective function calculation.**

### Header
**4.15 Prior Information Section**

### Content
To the right of the “=” sign of each article of prior information are two real variables and a character variable, namely PIVAL, WEIGHT and OBGNME. The first of these is the “observed value” of the prior information equation. The second is the weight assigned to the article of prior information in the parameter estimation process. This can be zero if you wish (thereby removing the prior information equation from consideration), but must not be negative.
The final item on each line of prior information must be the observation group to which the prior information belongs. Recall that each observation, and each element of prior information, cited in a PEST control file must be assigned to an observation group. In the course of implementing the inversion process, PEST calculates the contribution made to the objective function by each such observation group. The name of any observation group to which an item of prior information is assigned, must also be cited in the “observation groups” section of the PEST control file. As was discussed above, the name of an observation group must be twelve characters or less in length. Optionally, the name of a covariance matrix can be placed alongside that of the observation group in the “observation groups” section of the PEST control file. This replaces prior information weights in computing the component of the objective function associated with that group.
When writing articles of prior information you should note that no two prior information
Equations should say the same thing. Thus the following pair of prior information lines is illegal.
pi1 2.0 * log(par1) + 2.5 * log(par2) - 3.5 * log(par3) = 1.342 1.00 obgp1
pi2 4.0 * log(par1) + 5.0 * log(par2) - 7.0 * log(par3) = 2.684 1.00 obgp2
If you wish to break a single prior information article into more than one line, use the continuation character “&”. This must be placed at the beginning of each continuation line, separated from the item which follows it by a space. The line break must be placed between individual items of a prior information article; not within an item. Thus the following lines convey the same information as does the first of the above pair of prior information lines.
pi1
& 2.0
& *
& log(par1)
& +
& 2.5
& *
& log(par2)
& -
& 3.5
& *
& log(par3)
& =
& 1.342
& 1.00
& obgp1
However the following article of prior information is illegal because of the break between “log” and “par2":
pi1 2.0 * log(par1) + 2.5 * log
& (par2) - 3.5 * log(par3) = 1.342 1.00 obgp1

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 4. The PEST Control File
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** Figure 4.2 in PEST software displays control data section variables. The text details options for writing matrices, files, and parameters, including settings for matrix and file saving, operational modes, precision, derivative handling, and convergence criteria. Optional features like sensitivity reuse and LSQR algorithm for solving inverse problems are discussed.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** The "prior information" section contains prior information equations (≤300 characters, use "&" for continuation). Each equation starts with PILBL (≤20 characters, unique), followed by linear combinations of PIFAC*PARNME (or PIFAC*log(PARNME)), =PIVAL, WEIGHT, OBGNME.  Parameters must be adjustable; log-transformed parameters require log-based prior information.  ADDREG1 (Part II) automates prior information addition.
- **Next Summary:** A "predictive analysis" section is required in the PEST control file only when PESTMODE is set to "prediction" (Chapter 8).

### Metadata
- **Keywords:** OBGNME, PIVAL
- **Chunk ID:** f8d1a69b5ed5
- **Chunk Index:** 2
- **Previous Chunk ID:** f269beb59daa
- **Next Chunk ID:** 5c5b488c3e40

---

## Context

### Summary
**The "observation groups" section (Figure 4.9) lists observation group names (≤12 characters, unique), including prior information groups.  In "predictive analysis" mode, one group must be "predict"; in "regularisation" mode, at least one must start with "regul".  Optional COVFLE (covariance matrix file) and GTARG (target objective function, section 9.5) may follow the group name.  Observations and prior information must belong to separate groups.**

### Header
**4.10 Observation Groups Section**

### Content
Specifications for the “observation groups” section of a PEST control file are provided in figure 4.9.
* observation groups
OBGNME [GTARG] [COVFLE] (one such line for each of NOBSGP observation groups)
Figure 4.9 Specifications of the “observation groups” section of the PEST control file.
In the “observation groups” section of the PEST control file a name is supplied for every observation group. Observation group names must be twelve characters or less in length and are case insensitive. A name assigned to one observation group must not be assigned to any other observation group.
Note that prior information equations are also collected into groups; these groups are also referred to as “observation groups” as they perform an identical role to the groups that represent collected observations. The two are not distinguished in the discussion that follows.
All of these groups must be listed in the “observation groups” section of the PEST control file.
Observation group names are written one to a line. NOBSGP such names must be provided, where NOBSGP is listed on the third line of the “control data” section of the PEST control file. If PEST is running in “predictive analysis” mode, one of these group names must be “predict”. If it is running in “regularisation” mode at least one of these group names must begin with the “regul” character string.
If a covariance matrix is used for observation weights assignment for a particular observation group, the name of the file holding the covariance matrix for that group must be provided following the group name in the “observation groups” section of the PEST control file. The roles of observation and prior information covariance matrices are discussed in section 3.7 of this manual and in Doherty (2015). The formatting of observation covariance matrix files is
discussed in section 4.19 below. If the name of the file which holds a covariance matrix contains a space (not recommended practice), then the name must be enclosed in quotes. Optionally, the value of a group-specific target measurement objective function can be specified; this variable is named GTARG. If supplied, GTARG must follow the observation group name; it must precede the name of an optional covariance matrix file. GTARG must not be supplied unless PEST is run in “regularisation” mode; even then, this variable is optional. Its role is discussed in section 9.5 of this manual.
As is discussed below, all observations and prior information equations must be assigned to an observation group. However the same observation group cannot contain both observations and prior information equations. These two different components of a calibration dataset must belong to separate groups (and possibly multiple groups in each case).

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 4. The PEST Control File
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** Figure 4.2 in PEST software displays control data section variables. The text details options for writing matrices, files, and parameters, including settings for matrix and file saving, operational modes, precision, derivative handling, and convergence criteria. Optional features like sensitivity reuse and LSQR algorithm for solving inverse problems are discussed.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** The optional second part of the "parameter data" section lists tied parameters. Each line contains PARNME (tied parameter name, already listed in the first part with PARTRANS="tied") and PARTIED (parent parameter name, which cannot be fixed or tied).  Multiple tied parameters can share one parent parameter.
- **Next Summary:** The "observation data" section (Figure 4.10) lists observations (OBSNME, ≤20 characters, unique; OBSVAL, real; WEIGHT, real; OBGNME, ≤12 characters).  Zero weights remove observations; covariance matrices override weights (section 3.7).  Observations are grouped (OBGNME) to balance contributions to the objective function.

### Metadata
- **Keywords:** * observation groups, GTARG, NOBSGP, OBGNME
- **Chunk ID:** 4c9a640e3680
- **Chunk Index:** 1
- **Previous Chunk ID:** e38ec6f40144
- **Next Chunk ID:** 5728d66e5480

---

## Context

### Summary
**The "observation groups" section (Figure 4.6) lists unique group names (≤12 characters in PEST, ≤200 in PEST++, case-insensitive).  Prior information groups are also observation groups; observations and prior information cannot be in the same group. "regul" groups are for regularization constraints (used when PESTMODE="regularization"), creating regularization and measurement objective functions.**

### Header
**4.10 Observation Groups Section**

### Content
Specifications for the “observation groups” section of a PEST control file are provided in figure 4.6.
* observation groups
OBGNME
(one such line for each observation group)
Figure 4.6 Specifications of the “observation groups” section of a PEST control file.
In the “observation groups” section of a PEST control file, a name is supplied for every observation group. These names must be provided one to a line. Observation group names must be 12 characters or less in length for PEST-suite programs. In contrast, for programs of the PEST++ suite, observation group names can extend to 200 characters in length. In both cases these names are case insensitive. A name assigned to one observation group must not be assigned to any other observation group.
Note that prior information equations are also collected into groups; these groups are also referred to as “observation groups” as they perform an identical role to the groups that represent collected observations.
The same observation group cannot contain both observations and prior information equations.
Observation groups whose name begins with “regul” are special. Observations belonging to these groups are considered to comprise regularization constraints on an inverse problem. Programs of the PEST++ suite (and PEST itself), give these groups special treatment when PESTMODE is set to “regularization”. At a minimum, two objective functions are computed. One of these is named the “regularization objective function”; it is calculated using observations that belong to regularization groups, i.e., observation groups whose names begin with “regul”. The other objective function (i.e., that computed using members of observation groups whose names do not begin with “regul”) is named the “measurement objective function”.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 4. The PEST Control File
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** Figure 4.2 in PEST software displays control data section variables. The text details options for writing matrices, files, and parameters, including settings for matrix and file saving, operational modes, precision, derivative handling, and convergence criteria. Optional features like sensitivity reuse and LSQR algorithm for solving inverse problems are discussed.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** The "parameter data" section's second part lists tied parameters (PARNME, with PARTRANS="tied", and PARTIED, the parent parameter, which cannot be tied or fixed). Multiple parameters can be tied to one parent. The *tie_by_groups()* option ties all parameters within a group to a single group member, while respecting user-defined tied parameters.
- **Next Summary:** The "observation data" section (Figure 4.7) lists observations (one per instruction file line): OBSNME (≤200 characters in PEST++, ≤20 in PEST, unique, no spaces, case-insensitive), OBSVAL (real, field/lab measurement), WEIGHT (real), and OBGNME (≤200 characters in PEST++, ≤12 in PEST, group name). Group observations by type to avoid dominance in objective function calculations (section 3.5, Chapter 6).

### Metadata
- **Keywords:** * observation groups, OBGNME, PESTMODE
- **Chunk ID:** 3786957d8798
- **Chunk Index:** 1
- **Previous Chunk ID:** 0639100624e6
- **Next Chunk ID:** 2568608af5d0

---

## Context

### Summary
**Placing all "regul" group observations after other observations in the "observation data" section improves efficiency in PEST's regularization process when regularization constraints are supplied through observations.  PEST automatically detects and utilizes this arrangement.**

### Header
**15.5 Ordering of Observation Groups**

### Content
If regularisation constraints are supplied through observations rather than prior information, then potentially large savings in the time required to perform certain matrix operations required by the regularisation process can be achieved if all regularisation information follows all other observations in the “observation data” section of the PEST control file. That is, all observations belonging to observation groups whose names begin with “regul” should be supplied together; furthermore these should follow observations pertaining to all other observation groups. PEST detects this situation when it reads the PEST control file; subsequent manipulation of observation data takes numerical advantage of this.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 15. Large Numbers of Parameters
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter discusses efficient calibration methods for models with tens of thousands of parameters using PEST. Adjoint techniques are recommended for highly parameterized models. Use compressed binary external derivatives files, 64-bit versions of PEST for large problems, and optimize Jacobian matrix storage. Prioritize linearity of regularization constraints and activate memory conservation for improved efficiency.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** DERZEROLIM (real, optional, after MAXCOMPDIM in "control data" section) sets a threshold for omitting near-zero finite-difference derivatives from compressed Jacobian storage (MAXCOMPDIM > 1). It filters numerical noise but does not affect externally calculated derivatives.
- **Next Summary:** LINREG ("linreg" or "nonlinreg", Figure 15.2, 15.3, after WFMAX in the "regularisation" section) specifies linearity of regularization constraints.  The default is "nonlinreg" unless all constraints are prior information (then "linreg"). Linearity is determined by the Jacobian matrix, considering parameter transformations.  It improves efficiency for many linear constraints.

### Metadata
- **Keywords:** 
- **Chunk ID:** bc1acb013ea3
- **Chunk Index:** 1
- **Previous Chunk ID:** 73127b7a589f
- **Next Chunk ID:** feb79b59f209

---

## Context

### Summary
**GENLINPRED uses a parameter uncertainty file (section 2.5) to obtain the prior parameter covariance matrix C(k) (Doherty 2015).  Non-zero diagonal elements represent approximate parameter knowledge; off-diagonal elements represent spatial correlation.  PARCOV and PPCOV utilities (PEST Groundwater Data Utilities suite) aid file creation for pilot point parameterizations. Log-transformed parameters require log-based uncertainties.**

### Header
**10.17.4 The Prior Covariance Matrix**

### Content
As is discussed by Doherty (2015), highly‑parameterized error/uncertainty analysis requires that the user provide a covariance matrix of innate parameter variability; this is referred to as the C(k) matrix in Doherty (2015) and in equations provided in this manual. This can also be viewed as a covariance matrix of pre‑calibration parameter uncertainty. As such, this matrix provides a statistical encapsulation of what is known, and of what is unknown, about system properties before an attempt is made to refine that knowledge through matching model outputs to historical observations of system state. Lack of knowledge of system parameters is expressed by the fact that the C(k) matrix has non‑zero diagonal elements, thereby demonstrating that parameter values are only approximately known. Knowledge is expressed by the fact that these diagonal elements are finite, and that non‑zero off‑diagonal elements may depict a propensity for spatial correlation of heterogeneous parameter fields.
The C(k) matrix is supplied to GENLINPRED through a parameter uncertainty file. The format of this file is discussed in section 2.5 of this manual. This file can be easily prepared using a text editor. Where pilot points parameterisation is employed, assistance in its preparation can be obtained from the PARCOV utility and from the PPCOV family of utilities supplied with the PEST Groundwater Data Utilities suite.
It is important to note that if a parameter is designated as log‑transformed in the PEST control file supplied to GENLINPRED, its pre‑calibration uncertainty, as provided in the uncertainty file, must pertain to the log (to base 10) of that parameter.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 10. Linear Error and Uncertainty – Part I
- **Subsection:** 10.17 GENLINPRED

### Additional Summaries
- **Higher-Level Summary:** SVD-assist optimizes inversions by estimating "super parameters" instead of native parameters, reducing computational cost. Use standard procedures, PEST, and SVDAPREP for optimal results. Create a base PEST control file, run PEST to generate a Jacobian matrix, and use PARCALC and PICALC for parameter translation and prior information calculation.
- **Detailed Summary:** GENLINPRED automates parameter and prediction uncertainty analyses using various programs. It simplifies the process for users, compiling results into a single output file. It calculates parameter group contributions to prediction error and uncertainty, selecting predictive uncertainty equations based on parameters and observations in the PEST control file. The tool offers prompts for input and analysis options, with the ability to customize settings for improved performance and accuracy.

### Related Context
- **Previous Summary:** PREDVAR and PREDUNC suites calculate prediction error variance and uncertainty variance, respectively (Doherty 2015, section 7.4.1.3).  GENLINPRED uses these, requiring sensitivities but not predictions or model calibration. Results may be parameter-dependent for nonlinear models; however broad conclusions are generally robust.  Uncertainty ≤ error variance.
- **Next Summary:** GENLINPRED analyzes parameter/prediction uncertainty/error variance using a PEST control file (with JCO file, possibly created by setting NOPTMAX=-1 or -2) and a sensitivity file (PEST matrix format, section 2.4) or JCO file.  The prediction can be any parameter or function of parameters;  predictions in the control file can be used with zero weights.  Regularization information is ignored.

### Metadata
- **Keywords:** parcov
- **Chunk ID:** e35c57575e11
- **Chunk Index:** 1
- **Previous Chunk ID:** b93d8c3a5722
- **Next Chunk ID:** 65248c9e5d43

---
