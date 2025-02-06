# Search Results for: What is ICOR?

Keywords: icor

## Variations
1. Could you explain what ICOR is?
2. What does the term ICOR refer to?
3. Can you describe the purpose of ICOR?
4. Please provide details about ICOR.
5. What is ICOR used for?


## Context

### Summary
**ICOV, ICOR, IEIG (0 or 1) control writing of covariance, correlation, and eigenvector matrices to a matrix file. IRES (0 or 1) controls writing of a resolution data file (case.rsd). JCOSAVE ("jcosave" or "nojcosave") controls Jacobian matrix file (case.jco) saving. JCOSAVEITN ("jcosaveitn" or "nojcosaveitn") saves a JCO file for each iteration. VERBOSEREC ("verboserec" or "noverboserec") controls run record file verbosity.**

### Header
**4.2.10 Ninth Line**

### Content
ICOV, ICOR and IEIG
If PEST is run in “estimation” mode, and if neither singular value decomposition nor LSQR is employed in solution of the inverse problem, then at the end of each iteration of the inversion process PEST can write a “matrix file” containing linear estimates of the posterior covariance and correlation coefficient matrices, as well as eigenvectors and eigenvalues of the posterior covariance matrix. Calculation of these matrices is based on the current Jacobian matrix. Settings of the ICOV, ICOR and IEIG variables determine which (if any) of these data are recorded in the matrix file. A setting of 1 for each of these variables will result in the corresponding information being recorded. On the other hand, a setting of 0 will result in the corresponding information not being recorded. Regardless of these settings, all of these matrices are recorded on the run record file at the end of the inversion process (provided, once again, that PEST is not run in “regularisation” mode and that neither singular value decomposition nor LSQR is used to solve the inverse problem.)
The posterior covariance matrix, together with its correlation coefficients and eigenvectors/eigenvalues, can be used to examine the “health” of an inverse problem in which regularisation is purely manual and therefore implied in the definition of the parameters themselves. This covariance matrix is computed using equation 5.2.13 of Doherty (2015). Note, however, that these matrices cannot be computed if an inverse problem is completely ill-posed.
A better way to compute a posterior covariance matrix is to use the PREDUNC7 utility; this is not troubled by problem ill-posedness. Other linear parameter and predictive uncertainty analysis possibilities are available through utilities discussed in part II of this manual. Furthermore, with mathematical regularisation in place, the information provided by eigenvector decomposition of the posterior covariance matrix, and by parameter correlation coefficients computed from this matrix, is not really needed, for the mathematical regularisation process, instead of the user, takes care of possible inverse problem ill-posedness. See Doherty (2015) for details.
IRES
This is an integer variable which controls the writing of a “resolution data file”. This is a binary file which is used by utilities such as RESPROC, RESWRIT and PARAMERR which compute the resolution matrix, and quantify post-calibration predictive error variance. The resolution data file is automatically named case.rsd, where case is the filename base of the PEST control file.
If omitted, IRES is set to 1. Writing of a resolution data file can therefore only be prevented if IRES is included in the PEST control file and specifically set to 0. This is its recommended setting, as the utility programs which use it are less informative than more recent programs such as those comprising the PREDVAR* and PREDUNC* suites which have superseded them; the latter programs do not read a resolution data file.
JCOSAVE
This optional text variable can be used to suppress recording of the binary Jacobian matrix file (i.e. JCO file). If supplied, it must be provided as “jcosave” or “nojcosave”. If omitted,
“jcosave” prevails. This variable can be placed anywhere following the mandatory IEIG or optional IRES variable on the ninth line of the “control data” section of the PEST control file. Its recommended value is “jcosave”, unless the inverse problem size is very large indeed and the MAXCOMPDIM variable has been employed to activate internal compressed Jacobian matrix storage; in the latter case the accessing of a large Jacobian matrix for the purpose of recording a JCO file can be computationally intensive.
JCOSAVEITN
JCOSAVEITN is an optional character variable which should be supplied as either “jcosaveitn” or “nojcosaveitn”. If the former string is supplied, PEST writes a JCO file at the end of every iteration, this containing the Jacobian matrix calculated during that iteration. The name of each such file is case.jco.N where N is the iteration number to which the JCO file pertains. Alternatively, if JCOSAVEITN is set to “nojcosaveitn”, or omitted altogether, PEST will not save a progression of JCO files in this manner. Note that the JCO file containing the Jacobian matrix corresponding to the best parameter set attained so far is saved to a file named case.jco in the usual manner, regardless of the setting of JCOSAVEITN. The JCOSAVEITN variable can be placed anywhere on the ninth line of the “control data” section of the PEST control file following ICOV, ICOR, IEIG and, optionally, IRES. JCOSAVEITN should be set to “jcosaveitn” if it is desired that the MULJCOSEN utility be employed for monitoring of changes to composite parameter and/or observation sensitivities during the inversion process. See part II of this manual for a description of this utility.
VERBOSEREC
Where parameter, observation and prior information numbers are high, the PEST run record file becomes voluminous - so voluminous that it is almost impossible for a user to obtain useful information from it. PEST will write a much shorter run record file if VERBOSEREC (a text variable) is set to “noverboserec”. The default value for this variable (i.e. the value that will prevail if it is not supplied at all) is “verboserec”. The VERBOSEREC variable can be placed anywhere following ICOV, ICOR, IEIG and, optionally, IRES on the ninth line of the “control data” section of the PEST control file.
REISAVEITN

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 4. The PEST Control File
- **Subsection:** 4.2 Control Data Section

### Additional Summaries
- **Higher-Level Summary:** Figure 4.2 in PEST software displays control data section variables. The text details options for writing matrices, files, and parameters, including settings for matrix and file saving, operational modes, precision, derivative handling, and convergence criteria. Optional features like sensitivity reuse and LSQR algorithm for solving inverse problems are discussed.
- **Detailed Summary:** Figure 4.2 shows "control data" section variables (from Appendix A, Figure A1.1).  Some variables are discussed later. The first line must be "* control data";  some variables are optional (in brackets).

### Related Context
- **Previous Summary:** PHISTOPTHRESH, PHIABANDON, and LASTRUN control null space Monte Carlo.  PHIABANDON (high value or file) stops calibration if the objective function is too high; LASTRUN (0 or 1) controls the final model run.  A PHIABANDON schedule file provides iteration-specific thresholds.  If the objective function exceeds the threshold, the parameter adjustment process is abandoned.
- **Next Summary:** REISAVEITN ("reisaveitn" or "noreisaveitn") controls saving interim residuals files (case.rei, case.rei.N). PARSAVEITN ("parsaveitn" or "noparsaveitn") saves parameter values (case.par.N) per iteration. PARSAVERUN ("parsaverun" or "noparsaverun") saves run-specific parameter values (BEOPEST only, case.par.N_M).  An optional "sensitivity reuse" section (Chapter 7) governs sensitivity reuse.  An optional "singular value decomposition" section is recommended for most applications.

### Metadata
- **Keywords:** ICOR, ICOV, IEIG, IRES, JCOSAVE, JCOSAVEITN, MAXCOMPDIM, REISAVEITN, VERBOSEREC
- **Chunk ID:** 626d16643148
- **Chunk Index:** 1
- **Previous Chunk ID:** 421e7b0896aa
- **Next Chunk ID:** 70b3867d696b

---

## Context

### Summary
**EIGPROC summarizes information from case.rec and case.sen files.  It requires PESTMODE="estimation", ICOV=ICOR=IEIG=1,  a completed or "stop with statistics" run, and a well-posed problem (invertible JtQJ matrix). Use `eigproc case`.**

### Header
**8.2.1 General**

### Content
EIGPROC reads a PEST run record file and a PEST sensitivity file. It extracts and summarises information from these files. Recall that a PEST run record file is always named case.rec where case is the filename base of the PEST control file; a sensitivity file is named case.sen.
Use of EIGPROC (which stands for “eigenstuff processor”) is predicated on the following assumptions.
- PEST has been run in “estimation” mode.
- The ICOV, ICOR and IEIG variables in the “control data” section of the PEST control file are all set to 1.
- PEST has run to completion, or has been stopped using the “stop with statistics option”. (This will happen if the PSTOPST program has been run in another window).
- The parameter estimation problem is well posed so that the JtQJ matrix (often referred to as the “normal matrix”) inverted by PEST to obtain the parameter covariance matrix is not singular; thus a post‑calibration covariance matrix (and associated correlation coefficient and eigendata matrices) are recorded at the end of the run record file.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 8. PEST Statistical Postprocessing
- **Subsection:** 8.2 EIGPROC

### Additional Summaries
- **Higher-Level Summary:** In "predictive analysis" mode, PEST optimizes predictions while maintaining the objective function below a threshold, considering post-calibration uncertainty. It requires accurate derivatives, a prior calibration process, and parameter consistency with the estimation run. Users can adjust Marquardt lambda, search parameters, and incorporate predictive noise for improved analysis.
- **Detailed Summary:** In "predictive analysis" mode, PEST maximizes/minimizes a prediction (in the "predict" group) while keeping the objective function ≤ Φ0 (requires a prior "estimation" run).  It uses the same parameters, transformations, and observations as the estimation run.  Restarting uses `/r`, `/j`, `/d`, or `/s` (parallel runs).  Change limits remain important.  Screen output shows prediction values per iteration.  Results include the optimal prediction and parameter values.

### Related Context
- **Previous Summary:** This chapter details post-PEST run utilities analyzing calibration dataset information content and parameter estimability.  Some utilities (EIGPROC, PCOV2MAT, INFSTAT, INFSTAT1) are for well-posed problems; others (SUPCALC, IDENTPAR, SSSTAT) handle ill-posed problems.  GENLINPRED (analyzes prediction uncertainties, separate chapter) provides further insights.
- **Next Summary:** EIGPROC analyzes the parameter covariance matrix from a PEST run record file (case.rec) and sensitivity file (case.sen), requiring a well-posed "estimation" mode run (ICOV=ICOR=IEIG=1). Use `eigproc case N exlim outfile`: case specifies the control file, N is the number of eigenvalues, exlim is the eigenvector component threshold, and outfile is the output file.  Output includes eigenvalues, eigenvectors (components >exlim), sensitivities, and a correlation coefficient submatrix.

### Metadata
- **Keywords:** ICOR, ICOV, IEIG
- **Chunk ID:** 5e652b0adadc
- **Chunk Index:** 1
- **Previous Chunk ID:** c5265fbb0e72
- **Next Chunk ID:** cf26a67b407b

---

## Context

### Summary
**REISAVEITN ("reisaveitn" or "noreisaveitn") controls saving interim residuals files (case.rei, case.rei.N). PARSAVEITN ("parsaveitn" or "noparsaveitn") saves parameter values (case.par.N) per iteration. PARSAVERUN ("parsaverun" or "noparsaverun") saves run-specific parameter values (BEOPEST only, case.par.N_M).  An optional "sensitivity reuse" section (Chapter 7) governs sensitivity reuse.  An optional "singular value decomposition" section is recommended for most applications.**

### Header
**4.2.10 Ninth Line**

### Content
As is documented in the next section, PEST writes an “interim residuals file” at the end of every iteration. This file records observations and corresponding model outputs computed using the best parameters achieved in the inversion process up to that iteration. Regardless of the setting of REISAVEITN, this file is saved (and the previous one overwritten) at the end of every iteration; its name is case.rei where case is the filename base of the PEST control file. If the text variable REISAVEITN is set to “reisaveitn”, then this same file is also saved as case.rei.N where N is the current iteration number. Thus at the end of the inversion process, a sequence of files remains in the PEST working directory which collectively document the history of model-to-measurement misfit for every observation comprising the PEST input dataset. The REISAVEITN variable can be placed anywhere following ICOV, ICOR, IEIG and the optional IRES variable on the ninth line of the “control data” section of the PEST control file.
PARSAVEITN and PARSAVERUN
If supplied, the optional “PARSAVEITN” variable must be recorded as either “parsaveitn” or “noparsaveitn”. In the former case PEST will save a parameter value file at the end of every iteration of the inversion process, this containing best parameter values achieved during that iteration, irrespective of whether they improved the overall objective function or not. This file is named case.par.N where case is the filename base of the PEST control file and N is the iteration number. A “parameter history” of the inversion process is thus recorded. Alternatively, if PARSAVEITN is set to “noparsaveitn” or omitted altogether, an iteration-specific parameter value file is not recorded. Neither option interferes with PEST’s normal behaviour of recording and refreshing a parameter value file (named case.par) containing best parameters achieved to date at the end of every iteration. See chapter 5 for further discussion of this file.
In a similar vein, the variable PARSAVERUN can be used to instruct PEST to record run-specific parameter value files. At the time of writing this functionality is only available if PEST is run as BEOPEST. PARSAVERUN must be set to “parsaverun” or “noparsaverun”; the latter is assumed if it is omitted from the PEST control file.
If PARSAVERUN is set to “parsaverun” then PEST creates a series of parameter value files named case.par.N_M where N is the run packet index and M is the run number within that packet. For identification purposes, run packet indices are also recorded on the run management record file. This file also records run numbers and the nodes to which runs were allocated. Hence a user can associate parameter values with the runs performed by different nodes involved in PEST parallelisation.
Note that if PARSAVERUN is set to “parsaverun” the number of parameter value files that are thereby recorded may be very large indeed.
The PARSAVEITN and PARSAVERUN variables can be placed anywhere following ICOV, ICOR, IEIG and the optional IRES variable on the ninth line of the “control data” section of the PEST control file.
Sensitivity Reuse Section
PEST’s sensitivity reuse functionality, as well as the contents of the “sensitivity reuse” section of the PEST control file, are described in chapter 7 of this manual. This section is optional. It does not need to be supplied if sensitivity reuse is not implemented. Even if it is implemented, (through setting the DOSENREUSE variable in the “control data” section of the PEST control file to “dosenreuse”), this section can be omitted. Under these circumstances PEST uses default values for all variables which govern implementation of sensitivity reuse functionality.
Singular Value Decomposition Section
General
Singular value decomposition (i.e. SVD) as a regularisation device, and as a means of introducing numerical stability to solution of an ill-posed inverse problem, is discussed at length in Doherty (2015). The reader is referred to that book for details. There is really no good reason not to use singular value decomposition as a matter of course.
in solving an inverse problem. If a problem is ill-posed then numerical stability of its solution is still guaranteed. Meanwhile, complementary use of Tikhonov regularisation can guarantee sensibility of estimated parameter fields. Hence a “singular value decomposition” section (or an LSQR section) should appear in most, if not all, PEST control files (except when PEST is run in “predictive analysis” mode, where the constrained predictive maximisation/minimisation process that is implemented in this mode is better served by using PEST’s default solver).
Variables appearing in the “singular value decomposition” section of the PEST control file are shown in figure 4.5. They are now described in detail.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 4. The PEST Control File
- **Subsection:** 4.2 Control Data Section

### Additional Summaries
- **Higher-Level Summary:** Figure 4.2 in PEST software displays control data section variables. The text details options for writing matrices, files, and parameters, including settings for matrix and file saving, operational modes, precision, derivative handling, and convergence criteria. Optional features like sensitivity reuse and LSQR algorithm for solving inverse problems are discussed.
- **Detailed Summary:** Figure 4.2 shows "control data" section variables (from Appendix A, Figure A1.1).  Some variables are discussed later. The first line must be "* control data";  some variables are optional (in brackets).

### Related Context
- **Previous Summary:** ICOV, ICOR, IEIG (0 or 1) control writing of covariance, correlation, and eigenvector matrices to a matrix file. IRES (0 or 1) controls writing of a resolution data file (case.rsd). JCOSAVE ("jcosave" or "nojcosave") controls Jacobian matrix file (case.jco) saving. JCOSAVEITN ("jcosaveitn" or "nojcosaveitn") saves a JCO file for each iteration. VERBOSEREC ("verboserec" or "noverboserec") controls run record file verbosity.
- **Next Summary:** SVDMODE (0, 1, or 2) controls singular value decomposition use.  SVDMODE=0 uses the default solver (prone to numerical issues if (JtQJ + λI) is non-invertible); SVDMODE=1 uses SVD; SVDMODE=2 uses SVD of Q1/2J (faster for many observations).  Numerical stability is ensured via singular value truncation or damping.

### Metadata
- **Keywords:** DOSENREUSE, ICOR, ICOV, IEIG, IRES, PARSAVEITN, PARSAVERUN, REISAVEITN
- **Chunk ID:** 70b3867d696b
- **Chunk Index:** 2
- **Previous Chunk ID:** 626d16643148
- **Next Chunk ID:** 379473b7ecf7

---

## Context

### Summary
**ICOV, ICOR, and IEIG (integers) in the "control data" section are not used by PESTPP-GLM. Set them to 0 for PESTCHEK compatibility.**

### Header
**4.6.10 Ninth Line**

### Content
The integer ICOV, ICOR and IEIG variables recorded on the 9th line of the control data section of a PEST control file are not used by any members of the PESTPP-GLM suite. Set all of these to 0 for PESTCHEK-friendliness.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 4. The PEST Control File
- **Subsection:** 4.6 Control Data Section

### Additional Summaries
- **Higher-Level Summary:** Figure 4.2 in PEST software displays control data section variables. The text details options for writing matrices, files, and parameters, including settings for matrix and file saving, operational modes, precision, derivative handling, and convergence criteria. Optional features like sensitivity reuse and LSQR algorithm for solving inverse problems are discussed.
- **Detailed Summary:** The optional "automatic user intervention" section (section 6.3) governs automatic user intervention, activated by setting DOAUI to "doaui" in the "control data" section.  If omitted, default values are used.

### Related Context
- **Previous Summary:** NOPTMAX (integer, 50 recommended) sets maximum iterations; 0 runs one model; -1 or -2 generates a JCO file.  PESTPP-GLM uses PHIREDSTP (real, 0.005), NPHISTP (integer, 4), NPHINORED (integer, 4), RELPARSTP (real, 0.005), and NRELPAR (integer, 4) for termination; PESTPP-IES uses all except RELPARSTP and NRELPAR. Other PEST++ programs use only NOPTMAX.
- **Next Summary:** PESTPP-GLM uses SVD for inversion, with settings overridable via a "singular value decomposition" section (MAXSING, EIGTHRESH). MAXSING directly sets dimensionality; EIGTHRESH sets it implicitly (ratio of squared singular values of Q½J).  Omit this section to use PESTPP-GLM defaults.  MAXSING should equal or exceed the number of parameters unless dimensionality reduction is desired.  *max_n_super*/ *super_eigthresh* (PEST++) control super parameter numbers in SVD-assisted inversion;  MAXSING/EIGTHRESH control SVD regardless of base/super parameter estimation.  PESTPP-IES and PESTPP-DA also use internal SVD defaults, which are overridden if the "singular value decomposition" section is present.

### Metadata
- **Keywords:** ICOR, ICOV, IEIG
- **Chunk ID:** e93b50160cd8
- **Chunk Index:** 1
- **Previous Chunk ID:** cbb14971764f
- **Next Chunk ID:** 1815f651636e

---

## Context

### Summary
**PESTPP-PSO (parallel only) uses a PEST control file (Chapter 4) and a PSO control file (specified via "++PSO(case.pso)") for multi-objective optimization (Siade et al. 2019, Coello et al. 2004). PESTPP-GLM starts agents.  PESTPP-PSO uses data from the PEST control file (Figure 11.1, shaded variables) and is compatible with PEST and its utilities.  Dummy values are needed for unused PEST variables.**

### Header
**11.1.1 General**

### Content
PESTPP-PSO was developed using the FORTRAN interface provided within the PEST++ source code. Currently, PESTPP-PSO is only designed to operate in parallel, and the command to execute the “manager” is as follows (which differs slightly from the other PEST++ calling programs),
| pestpp-pso case*.*pst port |
|----------------------------|
where, *case* represents the base name for the modeling study and *port* is the port number over which communications occur (please see previous documentation in this manual on the general usage of PEST++, e.g., Chapter 5). The main control file follows the format of a standard PEST control file (see Chapter 4). The calling program, PESTPP-PSO, will obtain most of the data regarding the optimization problem from this PEST control file. That is, it will collect some control, parameter and observation data; Figure 11.1 displays which data is actually used by PESTPP-PSO (shaded in grey). Some of this differs from most other PEST++ programs. It is important to note that PESTPP-PSO is designed to be compatible with PEST and its utilities (e.g., PESTCHEK). So, even if PESTPP-PSO is not using some of the variables listed in Figure 11.1, a dummy value must be entered in their place; this can be anything the user wants so long as it’s consistent with the format of the variable as defined by PEST (i.e., the dummy value for an integer variable should still be an integer, a character string should be a character string, etc.).
PESTPP-PSO must use another PEST++ calling program to initiate the “agents”. It is recommended that the PESTPP-GLM is used for this with the following command (see Chapter 5 for more details). In addition to the information contained in the main control file, PESTPP-PSO will need additional PSO-specific control variables. These will be contained in a separate PSO control file, which is defined by entering a line in the main control file that provides the path to the PSO specs file, and begins with the “++” identifier, i.e.,
++PSO(*case*.pso)
pcf
* control data
RSTFLE PESTMODE
NPAR NOBS NPARGP NPRIOR NOBSGP
NTPLFLE NINSFLE PRECIS DPOINT
RLAMBDA1 RLAMFAC PHIRATSUF PHIREDLAM NUMLAM
RELPARMAX FACPARMAX FACORIG
PHIREDSWH
NOPTMAX PHIREDSTP NPHISTP NPHINORED RELPARSTP NRELPAR
ICOV ICOR IEIG
* singular value decomposition
SVDMODE
MAXSING EIGTHRESH
EIGWRITE
* parameter groups
PARGPNME INCTYP DERINC DERINCLB FORCEN DERINCMUL DERMTHD
(one such line for each parameter group)
* parameter data
PARNME PARTRANS PARCHGLIM PARVAL1 PARLBND PARUBND PARGP SCALE OFFSET DERCOM
(one such line for each parameter)
PARNME PARTIED
(one such line for each tied parameter)
* observation groups
OBGNME
(one such line for each observation group)
* observation data
OBSNME OBSVAL WEIGHT OBGNME
(one such line for each observation)
* model command line
COMLINE
(one such line for each model command line)
* model input
TEMPFLE INFLE
(one such line for each template file)
* model output
INSFLE OUTFLE
(one such line for each instruction file)
* prior information
PILBL PIFAC * PARNME + PIFAC * log(PARNME) ... = PIVAL WEIGHT OBGNME
(one such line for each article of prior information)
* regularization
PHIMLIM PHIMACCEPT [FRACPHIM]
WFINIT WFMIN WFMAX
WFFAC WFTOL [IREGADJ]
++
++PSO(case.pst)
Figure 11.1. Variables comprising a minimalist PEST control file (see Figure 4.1), where the control variables used by PESTPP-PSO are shaded in grey. Note that the very last line designates the PSO control file.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 11
- **Subsection:** 11.1 Using PESTPP-PSO

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** Parallel PEST and BEOPEST parallelize model runs, reducing PEST run time. Parallel PEST requires a run management file, while BEOPEST's is optional. They distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Both store data in binary files for reduced memory needs.

### Related Context
- **Previous Summary:** PESTPP-PSO's *eqlog* transforms decision variables, using base 10 for the widest-range variable and scaling others to match its range. This equalizes variability for enhanced PSO performance.  Some variables may be untransformed or have expanded ranges. See *Siade et al*, (2019) for details.
- **Next Summary:** In PESTPP-PSO estimation mode (Figure 11.2),  PSO-specific control variables include RSTPSO (0=new, 1=restart), NOBJGP (always 1), NCON (number of constraints), NFORG (allowed failures), VERBOSE (verbosity level), NPOP (swarm size), C1/C2 (cognitive/social constants, ≤4.0), ISEED (random seed), INITP (0=random, 1=PARVAL1 + random, 2=external file, Section 11.2.3), VMAX (maximum velocity, 0<VMAX≤1), IINERT/FINERT/INITER (inertia parameters).

### Metadata
- **Keywords:** * control data, * model command line, * observation data, * observation groups, * parameter data, * parameter groups, * prior information, * regularization, * singular value decomposition, COMLINE, DERCOM, DERINC, DERINCLB, DERINCMUL, DERMTHD, DPOINT, EIGTHRESH, EIGWRITE, FACORIG, FACPARMAX, FORCEN, FRACPHIM, ICOR, ICOV, IEIG, INCTYP, INFLE, INSFLE, IREGADJ, MAXSING, NINSFLE, NOBS, NOBSGP, NOPTMAX, NPAR, NPARGP, NPHINORED, NPHISTP, NPRIOR, NRELPAR, NTPLFLE, NUMLAM, OBGNME, OBSNME, OBSVAL, OFFSET, OUTFLE, PARCHGLIM, PARGP, PARGPNME, PARLBND, PARNME, PARTIED, PARTRANS, PARUBND, PARVAL1, PESTMODE, PHIMACCEPT, PHIMLIM, PHIRATSUF, PHIREDLAM, PHIREDSTP, PHIREDSWH, PIFAC, PILBL, PIVAL, PRECIS, RELPARMAX, RELPARSTP, RLAMBDA1, RLAMFAC, RSTFLE, SCALE, SVDMODE, TEMPFLE, WFFAC, WFINIT, WFMAX, WFMIN, WFTOL
- **Chunk ID:** e0889828dd60
- **Chunk Index:** 1
- **Previous Chunk ID:** c66ecb1eac1c
- **Next Chunk ID:** 13fe2c26bb4f

---
