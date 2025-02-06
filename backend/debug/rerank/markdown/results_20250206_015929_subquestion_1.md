# Search Results for: What is noptmax?

Keywords: noptmax

## Variations
1. Can you explain what noptmax is?
2. What does noptmax refer to?
3. Could you describe what noptmax is?
4. Please clarify what noptmax means.
5. What is the definition of noptmax?


## Context

### Summary
**The utility software uses Equation 11.1.10 (Tk=0) for regularization; Equation 11.1.11 (Tk=j) is not supported.  Initial parameter values should reflect expert knowledge. For SVD-assisted inversion, use a Z matrix (case.jco) calculated using optimized parameters (PARREP, NOPTMAX=-1 or -2) for the resolution matrix calculation (Equation 11.1.9a).  The Z matrix refers to base, not super, parameters.**

### Header
**11.1.3 Some Special Considerations**

### Content
Regularisation Relationships
As mentioned above, where Tikhonov regularisation is employed it is assumed to be of the type
Tk = 0 (11.1.10)
In PEST, regularisation can be linear (supplied through prior information equations), or nonlinear (supplied as observations). In both cases these are identified as regularisation relationships through being assigned to an observation group whose name begins with “regul”. However, PEST also allows regularisation relationships of the following type to be supplied
Tk = j (11.1.11)
Calculation of the resolution matrix, as implemented in the utility software described below, cannot accommodate relationships of the type expressed by equation 11.1.11. In most cases, equation 11.1.11 can be transformed to equation 11.1.10 by appropriate parameter re-definition.
Initial Parameter Values
When using truncated singular value decomposition or SVD‑assisted inversion, the integrity of the predictive error variance analysis process requires that initial parameter estimates (provided in the “parameter data” section of the PEST control file) correspond to most likely parameters according to a user’s concept of parameter likelihood based on the current modelling context and the characteristics of the modelled area. That is, they constitute “minimum error variance” estimates of parameter values based on expert knowledge alone.
The Z Matrix in SVD-Assisted Inversion
As mentioned above, the Z matrix appearing in equation 11.1.9a provides the sensitivities of model outputs for which there are corresponding field measurements to base parameters. In SVD‑assisted inversion these can far outnumber super parameters; computation of the Z matrix can therefore be costly. Nevertheless, as described in part I of this manual, this matrix must be calculated (based on initial parameter values) prior to undertaking SVD‑assisted inversion, and so should be available for calculation of the resolution matrix upon completion of the SVD‑assisted parameter estimation process. A better matrix to use in equation 11.1.9a however is a Z matrix calculated on the basis of optimised parameter values. Thus, after an SVD‑assisted PEST run is complete, the PARREP utility can be used to build a new base PEST control file using optimised base parameter values. NOPTMAX can be set to ‑1 or ‑2 in this new file so that when PEST is run, it terminates execution as soon as the Jacobian matrix is filled. The resulting JCO file will then hold the Z matrix of base parameter sensitivities, calculated using optimised parameter values.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 11. Linear Error and Uncertainty – Part II
- **Subsection:** 11.1 Introduction

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** Parallel PEST and BEOPEST parallelize model runs, reducing PEST run time. Parallel PEST requires a run management file, while BEOPEST's is optional. They distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Both store data in binary files for reduced memory needs.

### Related Context
- **Previous Summary:** This chapter details utilities calculating R (resolution matrix) and G (parameter solution matrix) using case.jco (updated per improved parameter set, except for SVD-assist).  Equations for R and G are given for overdetermined systems (Equations 11.1.6a, 11.1.6b), Tikhonov regularization (Equations 11.1.7a, 11.1.7b), SVD (Equations 11.1.8a, 11.1.8b), and SVD-assist (Equations 11.1.9a, 11.1.9b).  Results apply to base (not super) parameters and their logs (for log-transformed parameters).  LSQR is not accommodated.
- **Next Summary:** IRES (0 or 1, default 1 for regularization or SVD) in the "control data" section controls creation of the binary resolution data file (case.rsd).  PEST deletes existing case.rsd files before creating a new one.  case.rsd (used by RESPROC) is updated whenever parameter estimates improve; it's automatically set to 0 in "predictive analysis" mode.

### Metadata
- **Keywords:** NOPTMAX
- **Chunk ID:** 5873d08caf3d
- **Chunk Index:** 1
- **Previous Chunk ID:** ab1abc08f45b
- **Next Chunk ID:** f19de2b4f988

---

## Context

### Summary
**LHS2PEST facilitates multiple PEST runs using LHS-generated parameter samples.  PEST runs can calculate objective functions (NOPTMAX=0), Jacobian matrices (NOPTMAX=-1 or -2), or perform parameter estimation (NOPTMAX>0, using LHS samples as initial values). The `/i` switch reuses Jacobian matrices for efficiency. ADDREG1 adds Tikhonov constraints.  LHS and PEST datasets must have matching parameter names (≤12 characters). LHS2PEST creates PEST parameter value files from the LHS output file.**

### Header
**13.3.1 General**

### Content
LHS2PEST provides a linkage between PEST and the LHS program written by Sandia National Laboratories. It facilitates the undertaking of multiple PEST runs, each based on a different set of Latin hypercube parameter value samples generated by LHS.
PEST runs can be undertaken for a number of purposes. If the NOPTMAX control variable is set to 0, then PEST will simply run the model once, calculate the objective function and different components thereof, calculate and record some statistics, and then cease execution.
If NOPTMAX is set to ‑1 or ‑2, PEST will calculate the Jacobian matrix, this comprising sensitivities of members of the observation dataset to the different parameters. If NOPTMAX is set to a positive number, then PEST will undertake parameter estimation; for each parameter estimation run, initial parameter values can thus be Latin hypercube samples of the various parameters.
For NOPTMAX not set to zero, the following should be noted.
• If a model is linear with respect to its parameters, sensitivities recorded in the Jacobian matrix are independent of parameter values.
• If undertaking repeated parameter estimation based on different LHS‑generated initial parameter values, and this process does not employ the SVD‑assist methodology (do not confuse this with singular value decomposition as a solution device for the inverse problem), consider running PEST with the “/i” switch so that it can re‑use the same Jacobian matrix on its first iteration for each of these parameter estimation exercises. Presumably this matrix will have been calculated using a representative set of parameter values ‑ ideally prior expected parameter values. (Note that in the batch file written by LHS2PEST ‑ see below ‑ the command to run PEST is not accompanied by this switch; you must add it to the pertinent command yourself.)
• Through use of the ADDREG1 utility, Tikhonov constraints can be implemented which promulgate maximum adherence of adjusted parameter values to initial parameter values; maximum respect for LHS samples as parameters are adjusted to satisfy calibration constraints is thereby maintained.
Use of LHS2PEST is predicated on the assumption that a PEST input dataset and corresponding LHS input dataset exist. It is also assumed that the same parameters have the same names in both of these datasets. (As will be discussed, either of the files comprising these dataset can possess other parameters as well.) Adherence to this protocol will require that parameter name lengths be restricted to 12 characters or less in the LHS input dataset, as this is the character length limit for a parameter name employed by PEST.
It is further assumed that LHS has been run, and that an LHS output file with parameter sample values has thus been recorded. LHS2PEST reads these samples, and builds a set of PEST parameter values files, each recording the values associated with one sample set. (Parameter value files are described in section 2.2 of this manual.) These files can be used in similar ways to those written by the RANDPAR utility. In particular, through sequential use of the PARREP utility, parameter sets contained in these files can be used as initial values in a sequence of PEST control files. PEST can then use these control files to undertake sequential runs for any of the reasons discussed above.
The tasks performed by LHS2PEST depend on the command that is used to run it. The commands, and the tasks that correspond to these commands, are now described.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 13. Latin Hypercube Sampling
- **Subsection:** 13.3 LHS2PEST

### Additional Summaries
- **Higher-Level Summary:** PPD2ASC converts case.ppd to a textfile with objective function components, model outputs, and parameter values for spreadsheets. PPD2PAR extracts parameters from ppdfile to parfile for PEST utilities, matching objective function values in case.pod and case.par.N. Specific commands are required for each task.
- **Detailed Summary:** LHS2PEST facilitates multiple PEST runs using LHS-generated parameter samples. It can calculate objective functions, Jacobian matrices, or perform parameter estimation. The `/i` switch reuses Jacobian matrices for efficiency. ADDREG1 adds Tikhonov constraints. Parameter names must be ≤12 characters. It creates PEST parameter value files from LHS output.

### Related Context
- **Previous Summary:** PHISTATS reports PEST run objective function information (initial and final, per observation group;  measurement/regularization or prediction/error terms as appropriate) from a run record file (recfile) and loop index (N). It does not work for "pareto" mode runs. Use `phistats recfile N`.
- **Next Summary:** LHS2PEST creates PEST parameter value files (parfilebaseN.par) from LHS output (lhsoutfile). Parameter names must be ≤12 characters; otherwise, execution stops.  SCALE=1, OFFSET=0, PRECIS="single", DPOINT="point" are used. The number of files equals the number of LHS sample sets.  Use `lhs2pest lhsoutfile parfilebase`.

### Metadata
- **Keywords:** NOPTMAX
- **Chunk ID:** 1c679819e0a7
- **Chunk Index:** 1
- **Previous Chunk ID:** 578d27a8ea30
- **Next Chunk ID:** e09851a2d028

---

## Context

### Summary
**PARREP replaces initial parameter values in a PEST control file (pestfile1) with those from a parameter value file (parfile, section 2.2), creating a new control file (pestfile2).  Optional new_noptmax sets NOPTMAX.  It doesn't check bounds; use PESTCHEK afterwards. Tied/fixed parameters omitted from parfile retain their original values/ratios. Use `parrep parfile pestfile1 pestfile2 [new_noptmax]`.**

### Header
**4.4 PARREP**

### Content
Program PARREP replaces initial parameter values provided in a PEST control file by another set of values, the latter being supplied in a PEST parameter value file. See section 2.2 of this manual for specifications of a parameter value file.
Recall from Section 5.3.2 of part I of this manual that in the course of the inversion process PEST writes a parameter value file every time it improves its parameter estimates. After a PEST run has finished (either of its own accord or manually halted), optimised parameter values can be found in the parameter value file. The parameter value file possesses the same filename base as the PEST control file but has an extension of “.par”. Because it has such a simple structure, a parameter value file can also be easily built by the user with the help of a text editor.
PARREP is useful when commencing a new PEST run where an old run finished. An updated PEST control file can be produced by replacing parameter values in the old file with the best parameter values determined during the previous PEST run as recorded in the parameter value file written during that run. Recommencing a PEST run in this way, rather than through use of the “/r”, “/j”, “/s” or “/d” switches, allows you to alter certain PEST control variables, fix or tie certain parameters, or adjust PEST’s management of the parameter estimation process in other ways, prior to commencement of the new run.
PARREP is also useful when undertaking a single model run on the basis of a certain set of parameters in order to calculate the objective function. Simply create a new PEST control file using PARREP as described above, and set NOPTMAX to zero in that file.
PARREP is run using the command
parrep parfile pestfile1 pestfile2 [new_noptmax]
where
|parfile|is the name of a parameter value file,|
|---|---|
|pestfile1|is the name of an existing PEST control file,|
|pestfile2|is the name for the new PEST control file, and|
|new_noptmax|optionally provides a new value for NOPTMAX.|
When PARREP replaces parameter values in the existing PEST control file by those read from the parameter value file, it does not check that each parameter value lies between its upper and lower bounds, that log‑transformed parameters are positive, etc. Hence, especially if using a manually‑created parameter value file, it is a good idea to run PESTCHEK before running PEST to ensure that all is consistent and correct.
A special aspect of PARREP’s behaviour is worthy of note. If a parameter is tied or fixed in the existing PEST control file which PARREP reads, PARREP will not object if that parameter is omitted from the parameter value file that is provided to PARREP. The value of a fixed parameter is simply transferred from the existing PEST control file to the new PEST control file. The value of a tied parameter omitted from the parameter value file is calculated from the new value assigned to its parent parameter on the assumption that the ratio between the two remains the same in new PEST control file as it was in the old PEST control file.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 4. Building and Altering a PEST Control File
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** Figure 4.2 in PEST software displays control data section variables. The text details options for writing matrices, files, and parameters, including settings for matrix and file saving, operational modes, precision, derivative handling, and convergence criteria. Optional features like sensitivity reuse and LSQR algorithm for solving inverse problems are discussed.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** Run TPL2PST using `tpl2pst infile pestfile`; infile is the input file, and pestfile is the name of the output partial PEST control file (recommended extension: .pst).
- **Next Summary:** OBSREP replaces observed values in a PEST control file (pestfile1) with model outputs from a PEST residuals file (resfile, .res or .rei), creating a new control file (pestfile2).  All observations/prior information in pestfile1 must be in resfile; otherwise, OBSREP halts with an error. Use `obsrep resfile pestfile1 pestfile2`.

### Metadata
- **Keywords:** NOPTMAX
- **Chunk ID:** d131ce523618
- **Chunk Index:** 1
- **Previous Chunk ID:** 51cac29a6097
- **Next Chunk ID:** 05375a187143

---

## Context

### Summary
**PESTPP-GLM starts inversion with an initial model run (calculating the objective function and reference outputs) followed by Jacobian matrix calculations.  *hotstart_resfile()* reuses results from a previous initial run (case.res). *base_jacobian()* reuses a pre-calculated Jacobian matrix (case.jco or case.jcb, created using NOPTMAX=-1 or -2).  Using both options eliminates initial model runs.  Parallel runs are discussed in section 5.3.**

### Header
**6.2.7 Expediting the First Iteration**

### Content
In the normal course of events, PESTPP-GLM commences an inversion process by running the model in order to determine the value of the objective function based on initial parameter values. In doing this, it also determines the reference values of all model outputs for use in finite difference derivatives calculation. It then commences the long process of filling the Jacobian matrix. As has been explained, this requires at least as many model runs as there are adjustable parameters.
If model runs are parallelized (see section 5.3), then the first batch of parallelized model runs commissioned by PESTPP-GLM actually includes the initial model run, as well as those required for filling of the initial Jacobian matrix. However, if this initial model run has already been completed, then PESTPP-GLM can use the outcomes of this already-completed run rather than having to repeat it at the start of the inversion process. This action is instigated through use of the *hotstart_resfile()* control variable. The argument for this variable is the name of the residuals file (see below) which PESTPP-GLM recorded when it completed the initial model run. As is explained elsewhere in this manual, PESTPP-GLM can be run with the NOPTMAX termination control variable set to 0 specifically to undertake a single model run for the purpose of writing this (and other) files. A residuals file is named *case.res* where *case* is the filename base of the PEST control file.
Significant savings can also be made by employing an already-calculated Jacobian matrix for the first iteration of an inversion process. The *base_jacobian()* control variable instructs PESTPP-GLM to take this action. The value of this variable is the name of a Jacobian matrix (i.e., JCO) file. This file is named *case.jco* or *case.jcb* where *case* is the filename base of the PEST control file on which its calculation was based. This file can be produced by running PESTPP-GLM with the NOPTMAX control variable set to -1 or -2. (NOPTMAX is the first variable appearing on the eighth line of the “control data” section of a PEST control file.)
If both of the *hotstart_resfile()* and *base_jacobian()* options are selected at the same time, PESTPP-GLM does not need to run the model at all prior to calculating and testing parameter upgrades. This can sometimes be useful when fine-tuning PESTPP-GLM settings for optimal inversion performance.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 6. PESTPP-GLM
- **Subsection:** 6.2

### Additional Summaries
- **Higher-Level Summary:** Chapter 6 discusses automatic user intervention in PEST for regularization methods in parameter estimation. It suggests identifying and temporarily fixing insensitive parameters to improve matrix condition number and objective function. Parameters like DOAUI and MAXAUI customize intervention behavior, with options for mitigating bad derivatives and improving sensitivity.
- **Detailed Summary:** In unregularized inversions, insensitive parameters can lead to large adjustments beyond set limits, resulting in minimal objective function improvement. Increasing limits may not help; regularization or adjusting parameter sensitivity is recommended. Use the parameter sensitivity file to identify insensitive parameters and consider temporarily holding them at current values using the case.hld file.

### Related Context
- **Previous Summary:** In PESTPP-GLM's SVD-assisted inversion, *n_iter_base*=-1 performs one base iteration (for super parameter definition only). *max_n_super* controls the number of super parameters (efficient with RedSVD).  It saves base parameter values in case.par and case.bpa (identical to case.parb) for each iteration.  It saves JCO files as case.jco (super parameters) and case.jcb (base parameters).  Without SVD-assist, only case.jco (base parameters) is saved.
- **Next Summary:** PESTPP-GLM performs FOSM analysis (Fienen et al. 2010, Doherty 2015) if *uncertainty()* is true (default), using the last base parameter Jacobian matrix. It assumes linear model outputs, multi-Gaussian prior parameter/measurement uncertainties, and that observation noise standard deviation is proportional to the residual.  Prior parameter uncertainties are from *parcov* (covariance matrix file, *.unc*, *.cov*, *.jco*, *.jcb*) or default bounds.  It outputs a posterior covariance matrix (case.N.post.cov) and scaled weights (case.fosm_reweight.rei). Regularization information is ignored.

### Metadata
- **Keywords:** NOPTMAX, base_jacobian, hotstart_resfile
- **Chunk ID:** 91bd148bd25f
- **Chunk Index:** 1
- **Previous Chunk ID:** f1894a6f2c71
- **Next Chunk ID:** 1533e624167f

---

## Context

### Summary
**In PESTPP-PSO's Pareto mode, NOBJGP=2,  PTOGPNME links objectives to Pareto groups (PTONME), and PTOW sets weights.  INITP=2 uses an external file (Figure 11.4, 11.5) for initial swarm positions (NPOP values).  Other variables include NREP (repository size), REPMODE (2 only), RFIT, and RRAMP.  This file can also be used to run many model simulations or restart from a previous run (*case.pbs* or *case.par*).**

### Header
**11.2.3. Pareto mode**

### Content
PTGPNME is a character variable that tells PESTPP-PSO which Pareto group the corresponding objective function belongs to. This allows for composite objective functions, i.e., the scalarization of multiple objectives into a single composite objective function. Each objective function must correspond to a Pareto group whose name is defined as PTONME, i.e., each instance of PTOGPNME must match with a PTONME. Accordingly, there must be at least one objective function assigned to each Pareto group; and, as with *estimation* mode, there must be at least one observation (in the PEST control file) assigned to each objective function (see description of OBJNME and OBJMETH in the previous section). PTOW is a real variable representing the weight assigned to each objective group when calculating the value of the composite objective function.
**PESTPP-PSO**
When using PESTPP-PSO, in either *estimation* or *pareto* mode, the initial swarm must be determined before commencement of the algorithm. The user can either chose to have the swarm developed randomly (i.e., uniformly distributed between transformed upper and lower bounds), or alternatively, the user can provide a pre-determined list of decision variables (or parameters) for which the user has already developed in any manner they wish, e.g., via a Latin Hypercube sampling (LHS) algorithm; this is termed as an external initial-swarm file. This is actually encouraged, as basic uniform random sampling is inefficient, and using LHS, for example, to define the initial swarm positions may significantly reduce the number of iterations required for convergence.
To supply PESTPP-PSO with user-defined set of initial swarm positions, the user must supply a value of 2 for the control variable INITP (see Section 11.2.2), along with the path to an external text file containing these initial values. An example of a PSO control file for doing this is shown in Figure 11.4 (this is taken from the *Kursawe* (1991) benchmark problem),
* control data
0 2 0 10 2
100 1.00E+00 1.00E+00 171
2 9.00E-01 4.00E-01 4.00E-01 1
lhs-initial-swarm.txt
100 2 5.0 3.0
0
2 -1
* pareto groups
obj01 0.00E+00
obj02 1.00E+03
* objective data
objfun01 2 obj01 1.00
objfun02 2 obj02 1.00
Figure 11.4. An example PSO control file where the initial swarm is set with an external file named *lhs-initial-swarm.txt*.
The number of parameter values listed in the external initial-swarm file must be the same as the swarm size defined through the control variable NPOP. The format for this file is described in Figure 11.5; however, this format is likely to be extended to more flexible formats in the future, e.g., comma-separated-value files.
NPOP
PARNME PARVAL-1 PARVAL-2 … PARVAL-NPOP
(one such line for each decision variable (or parameter))
Figure 11.5. Format of the (optional) initial-swarm external file that the user can use to define the initial swarm of the PSO algorithm, either in estimation or in Pareto modes.
The external initial-swarm file can also be used in other ways. For example, if the user simply wishes to execute a large number of model-runs, e.g., from the output of a Monte Carlo algorithm, the user could develop an external initial-swarm file with these realizations listed. Then the user would set NPOP accordingly, along with NOPTMAX set to 0. Another example could be the case where the user wishes to restart the PSO algorithm from some iteration of a previous PSO run. In this case, the user could use the *case.pbs* (*estimation* mode) or the *case.par* (*pareto* mode) output file from a previous PSO run as the external initial-swarm file, as these output files use the same format as described in Figure 11.5.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 11
- **Subsection:** 11.2 PESTPP-PSO Output Files

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** Parallel PEST distributes model runs across networked machines, using a PAGENT agent program on each machine. It requires separate folders for agents to avoid file conflicts and uses shared signal files for communication. The run management file lists agents, runtimes, and filenames. Parallel PEST partially parallelizes Marquardt lambda testing, potentially leading to different solution paths.

### Related Context
- **Previous Summary:** PESTPP-PSO's Pareto mode (Figure 11.3) uses a modified PSO algorithm (Siade et al. 2019) with NOBJGP=2.  Control variables include NREP (repository size), REPMODE (2=lexicographical ordering), RFIT (maximum fitness exponent, Equation 11.5), RRAMP (Equation 11.6, controls α adjustment), PTONME (objective function names), and PTOLIM (upper objective function limits).  It iteratively updates a swarm and repository.
- **Next Summary:** PESTPP-PSO outputs (Table X.1, case=control file base name): case.rec (run history), case.pbs/case.gbs (*estimation* mode,  *p*/ *g*-best positions, Figure 11.5 format), case.obs (simulated observations), case.rst (restart file), case.rep/case_x.rep (*pareto* mode, Pareto front), and case.par (*pareto* mode, decision variable values, Figure 11.5 format).  Files are updated per iteration.

### Metadata
- **Keywords:** * control data, NOPTMAX, PARNME
- **Chunk ID:** 9adc35db39f2
- **Chunk Index:** 2
- **Previous Chunk ID:** d90439a9ae40
- **Next Chunk ID:** c443d62f7289

---
