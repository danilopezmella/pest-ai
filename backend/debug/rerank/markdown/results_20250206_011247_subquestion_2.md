# Search Results for: Does it work?

Keywords: None


## Context

### Summary
**Parallel PEST continues execution even if an agent machine loses network connection;  overdue runs are reassigned.  Complete network failure doesn't stop PEST if one agent runs on the same machine.**

### Header
**11.3.6 Losing Agents**

### Content
If, during the course of a Parallel PEST run, an agent machine drops out of the network, PEST will continue execution. If communications are lost during the course of a model run, then PAGENT executing on the lost machine will not be able to inform PEST of the completion of that model run. PEST will soon grow tired of waiting and allocate that run to another agent. It will thus continue execution with less agents at its disposal.
Even complete network failure may not result in the termination of a Parallel PEST run, for if one agent is running on the same machine as Parallel PEST, Parallel PEST will be able to continue execution using just that single agent.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 11. Parallel PEST and BEOPEST (continuación)
- **Subsection:** 11.3 Using Parallel PEST

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** Prepare standard PEST input files and check them using PESTCHEK. Create a Parallel PEST run management file ensuring model runs correctly in each agent folder. Install PEST on each agent machine. Adjust WAIT in run management file to prevent file access conflicts. Parallel PEST manages runs intelligently, reassigning slow runs, and can be restarted mid-process.

### Related Context
- **Previous Summary:** Parallel PEST can start with only one active agent; all agents must be listed in the run management file.  PEST checks for agents upon startup and adds newly started agents to the process during the parameter estimation process, increasing flexibility.
- **Next Summary:** Shut down agents by pressing <Ctrl-C> in the agent window; restart by typing "PAGENT" and providing the model command.  Parallel PEST may not immediately detect a restarted agent if it restarts during the same iteration it was terminated.  An agent is only considered "dead" at the end of an iteration.

### Metadata
- **Keywords:** 
- **Chunk ID:** bc29b12baed2
- **Chunk Index:** 1
- **Previous Chunk ID:** c590ad10e57f
- **Next Chunk ID:** d53235dba9e4

---

## Context

### Summary
**This chapter details PEST utility programs for checking input dataset integrity (before and after manipulation for regularization or uncertainty analysis).  A SENSAN input dataset checker is also included.**

### Header
**3.1 Introduction**

### Content
This chapter documents utility programs that can be used to test the integrity of a PEST input dataset, and/or various components of that dataset. They are normally used prior to running PEST, either during the initial stages of inverse problem definition, or later in the process when PEST datasets are manipulated with addition or subtraction of Tikhonov regularisation and/or in preparation for post‑calibration linear or nonlinear uncertainty analysis. A utility for checking a SENSAN input dataset is also described in this chapter.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 3. Checking Utilities
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** PAROBS files begin like parameter value files (PRECIS, DPOINT, parameter names, values, SCALE, OFFSET).  They then list observation names and their model-calculated values (-1.11E35=model failure; -1.22E35=abandoned run). Figure 2.7 provides an example.
- **Next Summary:** TEMPCHEK checks PEST template files (Chapter 2, Part I) and generates model input files using a template file and optional parameter value file (section 2.2).  Use `tempchek tempfile [modfile [parfile]]`.  Errors are written to the screen or a specified file.  Parameter names must match between the template and parameter value files; extra parameters in the parameter value file are ignored.

### Metadata
- **Keywords:** 
- **Chunk ID:** 9e311a0e8819
- **Chunk Index:** 1
- **Previous Chunk ID:** c5ed6b80bb10
- **Next Chunk ID:** ebae9291ff98

---

## Context

### Summary
**JACTEST assesses finite-difference derivative integrity by running the model with incrementally varied parameters, monitoring model outputs.  Plots of these outputs versus parameter values reveal numerical noise.**

### Header
**6.2.1 General**

### Content
JACTEST is used to test the integrity of derivatives calculated by PEST. It runs the model a number of times with incrementally varied parameters. It monitors the same model outputs as those for which sensitivities with respect to the varied parameter must be calculated. By plotting the values of these outputs against the values of the varied parameter the presence of numerical noise can be easily detected.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 6. Integrity of Finite-Difference Derivatives
- **Subsection:** 6.2 JACTEST

### Additional Summaries
- **Higher-Level Summary:** Chapter 6 discusses automatic user intervention in PEST for regularization methods in parameter estimation. It suggests identifying and temporarily fixing insensitive parameters to improve matrix condition number and objective function. Parameters like DOAUI and MAXAUI customize intervention behavior, with options for mitigating bad derivatives and improving sensitivity.
- **Detailed Summary:** In unregularized inversions, insensitive parameters can lead to large adjustments beyond set limits, resulting in minimal objective function improvement. Increasing limits may not help; regularization or adjusting parameter sensitivity is recommended. Use the parameter sensitivity file to identify insensitive parameters and consider temporarily holding them at current values using the case.hld file.

### Related Context
- **Previous Summary:** Poor PEST performance usually stems from inaccurate finite-difference derivatives caused by model numerical issues.  Mitigation strategies (Part I) include split slope analysis and five-point stencils;  otherwise, use surrogate models or a global optimizer. JACTEST and MULJCOSEN (this chapter) assess derivative integrity to inform inversion strategies.
- **Next Summary:** JACTEST assesses derivative integrity. Use `jactest case parname n outfile [/p]`. It runs the model n+1 times with incremental changes to parname (using PEST's increment from the "parameter groups" section), saving results to outfile. Plots of outputs vs. parameter values highlight derivative issues.  It respects parameter transformations, SCALEs, OFFSETs, and bounds; it handles tied parameters appropriately, and does not include prior information.

### Metadata
- **Keywords:** 
- **Chunk ID:** e8f006b9dde3
- **Chunk Index:** 1
- **Previous Chunk ID:** df8de08ae3d3
- **Next Chunk ID:** 3c3384ca0085

---

## Context

### Summary
**Parallel PEST (ppest.exe, i64ppest.exe) and BEOPEST (beopest32.exe, beopest64.exe) are automatically installed.  PAGENT.exe is required for Parallel PEST on each agent machine; BEOPEST uses its own executable as the agent.  Model programs and files must also be copied to agent machines before running Parallel PEST or BEOPEST.**

### Header
**11.1.5 Installing Parallel PEST and BEOPEST**

### Content
The command line version of the Parallel PEST executable ppest.exe, and its 64 bit version i64ppest.exe, are automatically installed when you install PEST on your machine. The same applies to the BEOPEST executables beopest32.exe and beopest64.exe.
As is explained below, for Parallel PEST to run a model on another machine it must signal an agent, named PAGENT, residing on the other machine to generate the command to run the model. Thus pagent.exe must be installed on each machine engaged in the Parallel PEST parameter estimation process. To do this, copy pagent.exe (also provided with PEST) to an appropriate directory (i.e. folder) on each such machine. This folder can be the model working folder on that machine if desired; if not, it should be a folder whose name is cited in the PATH environment variable on that machine.
BEOPEST does not use a special agent program. Rather BEOPEST itself is the agent. Hence beopest32.exe or beopest64.exe must be copied to agent machines in the same way as was described above for pagent.exe.
As will be discussed below, not only PEST programs, but model programs and accompanying files must also be copied to agent machines prior to initiating a parallel PEST or BEOPEST run.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 11. Parallel PEST and BEOPEST (continuación)
- **Subsection:** 11.1 General (continuación)

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** Parallel PEST and BEOPEST parallelize model runs, reducing PEST run time. Parallel PEST requires a run management file, while BEOPEST's is optional. They distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Both store data in binary files for reduced memory needs.

### Related Context
- **Previous Summary:** Parallel PEST's efficiency decreases with short model run times due to file I/O and message passing latency. BEOPEST, using TCP/IP, minimizes these overheads because agents perform file I/O locally.
- **Next Summary:** Parallel PEST and BEOPEST store parameter and model output values in binary, direct access files (pest###.dap, pest###.dao), reducing memory needs. These files are deleted after a run but are needed for restarting using the "/s" switch.  Parallel PEST is described below, followed by BEOPEST.

### Metadata
- **Keywords:** 
- **Chunk ID:** 3de0f3c0071a
- **Chunk Index:** 1
- **Previous Chunk ID:** cb0f0bfcff07
- **Next Chunk ID:** d5b1ed60ac37

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
