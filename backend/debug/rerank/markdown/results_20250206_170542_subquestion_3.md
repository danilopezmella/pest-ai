# Search Results for: What is noptmax?

Keywords: noptmax

## Variations
1. Could you explain what noptmax is?
2. What does noptmax refer to?
3. Can you describe what noptmax is?
4. Please explain what noptmax means
5. What exactly is noptmax?


## Context

### Summary
**PESTPP-MOU (like other PEST++ tools, Section 5) runs models serially or in parallel;  restarts use a decision variable population file. NOPTMAX=0 runs the model once; NOPTMAX=-1 evaluates the initial population. Constraints/objectives are defined by group names ("less_than," "greater_than") and *mou_objectives*. Decision variables are specified by *opt_dec_var_groups* (defaults to all adjustable parameters);  high dimensionality is not recommended.**

### Header
**13.2.5 Running PESTPP-MOU**

### Content
PESTPP-MOU is run exactly like all other tools in the PEST++ suite – See section 5 of this manual for how to run the tools in the PEST++ suite. As is described in that section, model runs can be undertaken in series or in parallel. In either case, a prematurely terminated PESTPP-MOU run can be restarted by supplying the requisite decision variable population file.
As previously discussed, if NOPTMAX is set to zero, PESTPP-MOU will run the model once using the values listed in the parameter data section of the control file. Furthermore, if NOPTMAX is set to -1, PESTPP-MOU will evaluate the initial decision variable population, and, optionally and chance runs, record outputs and then quit.
Constraints/objectives are identified in exactly the same way as PESTPP-OPT: via the observation/prior information equation group names. Group names that start with “less_than” are identified as less-than constraints/minimization objectives; group names that start with “greater_than” are identified as greater-than constraints/maximization objectives. The distinction between constraints and objectives is made via the *mou_objectives* argument. Any observation and prior information equation names (not group names) passed via *MOU_OBJECTIVES* are treated as objectives, not constraints. While it may seem tempting to make all constraints objectives, in practice, the algorithm elements encoded in PESTPP-MOU can tolerate up to 5 objectives, and, more realistically, 2-3 objectives may be a better choice.
Decision variables are distinguished from parameters through the *opt_dec_var_groups* option which lists parameter groups whose members should be treated as decision variables. If this option is not specified, then all adjustable parameters as treated as decision variables. As with the number of objectives, it is important to point out the global evolutionary optimization methods do not scale to high dimensions; a maximum realistic number of decision variables is likely hundreds.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 13. PESTPP-MOU
- **Subsection:** 13.2 Theory

### Additional Summaries
- **Higher-Level Summary:** PPD2ASC converts case.ppd to a textfile with objective function components, model outputs, and parameter values for spreadsheets. PPD2PAR extracts parameters from ppdfile to parfile for PEST utilities, matching objective function values in case.pod and case.par.N. Specific commands are required for each task.
- **Detailed Summary:** PHISTATS reports PEST run objective function information (initial and final, per observation group;  measurement/regularization or prediction/error terms as appropriate) from a run record file (recfile) and loop index (N). It does not work for "pareto" mode runs. Use `phistats recfile N`.

### Related Context
- **Previous Summary:** PESTPP-MOU optionally treats risk as an objective (*mou_risk_objective*=true), adding "\_risk\_" as a decision variable, to explore objective-risk trade-offs.  Self-adaptive differential evolution is automatically activated using decision variables "\_DE\_F", "\_CR\_", and/or "\_MR\_", but requires careful range specification.  This may increase complexity/nonlinearity.
- **Next Summary:** PESTPP-MOU outputs (Table 13.1, case=control file base name, <iter>=iteration number): case.rec (run history), case.rmr (parallel run management), case.log (performance log), case.pareto.summary.csv (Pareto solutions), and current/iteration-specific ensembles (case.chance.obs_pop.csv/jcb, case.chance.dv_pop.csv/jcb, case.obs_pop.csv/jcb, case.dv_pop.csv/jcb, case.<iter>.obs_pop.csv/jcb, case.<iter>.dv_pop.csv/jcb, case.<iter>.chance.obs_pop.csv/jcb, case.<iter>.chance.dv_pop.csv/jcb), and case.lineage.csv.  Files may be CSV or JCB depending on *SAVE_BINARY*.

### Metadata
- **Keywords:** NOPTMAX
- **Chunk ID:** 4910e03afcfa
- **Chunk Index:** 1
- **Previous Chunk ID:** 8e1a78f2d303
- **Next Chunk ID:** 05b85a679d12

---

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
**For SVD-assisted Pareto analysis, perform a standard Pareto run (NOPTMAX=-1 or -2), generate a JCO file, then use SVDAPREP to create a super-parameter control file.  SVDA_MULBPA=1 automatically saves multiple case.bpa.N files.  case.svda.ppd contains base parameter values. SVDA_PAR_EXCL (0, 1, or -1) controls super parameter definition; 1 is recommended for manual regularization.  To reduce parameter variability, use expert knowledge observations as PARETO_OBSGROUP and run from overfit parameters. JCO2JCO adds prior information sensitivities to a JCO file.**

### Header
**12.8 An Example**

### Content
3. Run PEST. The information in the case.pod, case.ppd and case.par files produced on this new run then supplements information contained in files of similar name produced on the previous run.
13.4.3 Special Considerations for SVD-Assist
If you wish to use SVD-assist for exploration of the Pareto front, this is easily accomplished. As is normal protocol for SVD-assisted inversion, the following steps should be taken.
1. Set up a Pareto run in the manner described above.
2. Set NOPTMAX to -1 or -2 in the PEST control file.
3. Run PEST to produce a JCO file.
4. Run SVDAPREP in order to produce a PEST control file for SVD-assisted Pareto front exploration.
When PEST is run in “pareto” mode when undertaking SVD-assisted inversion, the SVDA_MULBPA variable is automatically set to 1. Thus multiple case.bpa.N files are saved – one at the end of each iteration. As usual, these are named after the base parameter PEST control file; they contain base parameter values corresponding to points along the Pareto front as defined in file case-svda.pod; note how the filename base of the “.pod” file corresponds to that of the super parameter PEST control file, this being the PEST control file that is actually used for Pareto front traversal. Under these circumstances, PEST does not leave a succession of “.par” files, as the super parameter values that would be recorded in files case-svda.par.N are of no real use to the modeller.
When undertaken SVD-assisted traversal of the Pareto front, parameter values recorded in the “.ppd” file (i.e. in file case-svda.ppd) are actually base parameter values. This makes it easy for the user to link points on the Pareto front (as defined by objective functions listed in file case-svda.pod) to parameter values as actually used by the model.
An extra setting is available when implementing SVD-assisted exploration of the Pareto front. This is supplied through the SVDA_PAR_EXCL control variable which resides in the “svd assist” section of the PEST control file immediately following the SVDA_SUPDERCALC variable. SVDA_PAR_EXCL must be set to 0, 1 or -1. If it is set to 1, super parameters are defined using only sensitivities of model outputs that comprise the observation group whose weight factor is adjusted during the Pareto front exploration process; this is the observation group whose name is provided as the PARETO_OBSGROUP variable in the “pareto” section of the PEST control file. In the regularisation context, members of this observation group are the measurements that are fitted during the calibration process. Prior information equations and observations which express expert knowledge are thus ignored in defining super parameters. Limited experience to date suggests that SVDA_PAR_EXCL is best set to 1 when using the Pareto process as a manual regularization device.
If SVDA_PAR_EXCL is set to 0, super parameter definition is based on all observations and prior information equations cited in the base PEST control file (using the weights provided in that file).
If SVDA_PAR_EXCL is set to -1, then super parameters are computed on the basis of all observation groups in the PEST control file other than that named as the Pareto-adjustable group in the super parameter PEST control file. This is useful if traversal of the Pareto front takes place in the opposite direction – that is, from a fit which is initially too good (based on parameters which are too heterogeneous) to a fit which is not as good but which is based on more acceptable parameters (see below).
When SVDAPREP is used in order to build a super parameter PEST control file, it checks the setting of the PESTMODE variable in the base parameter PEST control file. If this is set to “pareto” SVDAPREP asks the user for an appropriate setting for SVDA_PAR_EXCL. Its prompt (SVDAPREP’s final prompt) is:
Provide setting for SVDA_PAR_EXCL [0, 1, or -1] (&lt;Enter&gt; if 0):
The default is 0 (for this is the best setting to use when using the Pareto concept to explore predictive uncertainty). Respond with “1” to set SVDA_PAR_EXCL to 1 in the super PEST control file written by SVDAPREP, “0” to set SVDA_PAR_EXCL to 0 in this file, or “-1” to set it to -1.
13.4.4 Going the Other Way
Suppose that you have just calibrated a model and that the calibrated parameter field contains too much variability. Suppose that you would like to remove some of this variability by slowly introducing stronger and stronger enforcement of regularisation constraints, thereby maintaining as good a fit with measurements as possible while removing some of the more unsightly aspects of the calibrated parameter field. This is easily achieved by assigning all expert knowledge prior information equations and expert knowledge observations to a single observation group, and assigning the name of that group to the PARETO_OBSGROUP variable in the “pareto” section of the PEST control file. Initial parameter values should be those that provided “too good a fit” with the data. PEST can then reduce variability of this parameter field by moving towards the end-point of the Pareto front where expert knowledge observations dominate measurement observations.
In doing this, it may be helpful to remember that if prior information is added to a PEST control file after a JCO file has been computed for that file, the JCO2JCO utility will automatically include the sensitivities for the additional prior information in the new JCO file which it constructs for the new PEST control file.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 12. Model-Calculated Derivatives (continuación)
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** PEST uses pest.mmf to send messages before each run, indicating run type and parameter details. Different commands can be used for regular and derivative-calculating model runs, potentially reducing run time. Models can provide PEST with derivatives more efficiently, supporting various file formats. PEST control file variables manage model commands, messaging, and external derivatives.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** In Pareto mode (PESTMODE="pareto"),  assign all observations to one group (PARETO_OBSGROUP) and set initial parameters to achieve a zero expert knowledge objective function.  Use weights inversely proportional to parameter standard deviations or covariance matrices.  Set PARETO_WTFAC_START to 0, PARETO_WTFAC_FIN to 1.5-2.0, NUM_WTFAC_INC to 15-20, NUM_ITER_START to 0, NUM_ITER_GEN to 2, and NUM_ITER_FIN to 2.  Plot case.pod to visualize the Pareto front; case.ppd and case.par.N contain parameter values.  Parallel PEST and BEOPEST are supported;  normal restart functionality applies.
- **Next Summary:** In Pareto mode, PEST reports the current PARETO_OBSGROUP weight factor per iteration.  Unlike other modes, it produces multiple parameter files (case.par.N), omits case.res, case.rsr, and case.rei (unless REISAVEITN="reisaveitn"), and saves the JCO file only after the first iteration.  Termination criteria are from the "pareto" section;  NOPTMAX still applies.  FORCEN cannot be "switch" or "switch_5".  SVD, LSQR, and AUI are supported.

### Metadata
- **Keywords:** NOPTMAX, PARETO_OBSGROUP, PESTMODE, SVDA_MULBPA, SVDA_PAR_EXCL, SVDA_SUPDERCALC
- **Chunk ID:** 27a8375f23d2
- **Chunk Index:** 9
- **Previous Chunk ID:** 32d7e046d625
- **Next Chunk ID:** 68e82e019e36

---
