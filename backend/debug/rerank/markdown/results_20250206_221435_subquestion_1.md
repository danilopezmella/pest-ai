# Search Results for: Explain in pedagogical terms what is the Marquat Lambda method?

Keywords: None

## Variations
1. Could you clarify the Marquat Lambda method in educational terms?
2. What does the Marquat Lambda method entail, explained in pedagogical terms?
3. In teaching terms, what is the Marquat Lambda method?
4. Can you describe the Marquat Lambda method using pedagogical language?
5. Please explain what the Marquat Lambda method is, using educational terminology.


## Context

### Summary
**Parallel PEST partially parallelizes Marquardt lambda testing.  It runs models with multiple lambdas concurrently; however, runs exceeding 1.8 times the fastest run are excluded.  The "packet" size equals the number of fast agents.  Decision-making occurs after each packet, potentially wasting some runs. The process differs from serial lambda testing, potentially leading to different paths to the solution.  Limiting the number of agents is recommended to prevent problems from widely varying lambdas.**

### Header
**11.2.6 Alternative PARLAM Settings**

### Content
The algorithm used by Parallel PEST to undertake parallel model runs as part of its lambda testing procedure if the PARLAM control variable is set to 1 bears some resemblance to that used for parallelisation of the Jacobian matrix calculation process. However there are some important differences. One such difference is that if any agent carries out model runs with a run time which is greater than 1.8 times that of the fastest agent, then that agent is not used in the partial parallelisation process. This is because PEST sends model runs to its agents in “run packets”; it will not resume its normal execution until all runs in the packet are completed. The size of a “run packet” at any stage of the lambda testing procedure is equal to the number of available agents whose execution speed is roughly equivalent to that of the fastest agent. The “packet” is limited to this size because if one particular agent can complete two model runs in the same or less time than that required for another agent to complete only one model run, then it would be more efficient to undertake these model runs in serial, with the proper decision-making process taking place after each such run.
The principle difference between parallelised Jacobian runs and parallelised lambda testing runs is that in the former case PEST knows the number of runs that must be carried out before the Jacobian calculation process is complete. In contrast, the lambda testing procedure is deemed to be complete when PEST judges that the overall parameter estimation process is better served by terminating the current lambda testing procedure and moving on to the next iteration of the inversion process. The criteria by which this decision is made are supplied through the variables appearing on the fifth line of the “control data” section of the PEST control file. Hence the size of the “packet” of parallel model runs ordered by PEST is determined on the basis of the number and speed of available agents, and not on the basis of foreknowledge of the number of parallel runs required for completion of the lambda testing procedure, for this knowledge is not available. The decision-making process involved in the lambda testing procedure is activated only after each packet of model runs is complete, a process that may result in some of these runs being ignored. The fact that the lambda adjustment procedure then becomes a combination of parallelisation with intermittent.
Decision-making is the basis for its classification as a “partial parallelisation” procedure. During any iteration of the inversion process, upon commencement of the lambda testing procedure for that iteration, PEST’s first packet of model runs is based on Marquardt lambdas which are generally lower than the optimal lambda determined during the previous iteration. However, if there are enough agents at its disposal, PEST also initiates model runs based on one or a number of higher Marquardt lambda values as well. On subsequent occasions during the same lambda testing procedure on which PEST orders packets of model runs to be completed, parameters used for such runs are all calculated on the basis of decreasing Marquardt lambdas or on increasing Marquardt lambdas, depending on the results of the previous package of parallel runs.
The lambda testing procedure is such that parallelisation inevitably results in some model runs being wasted. Hence, although PEST might inform the user through its screen output that n parallel model runs are being carried out, it may not display the results (i.e. the objective function and perhaps the model prediction) of all of these n model runs. It simply processes the results of that “packet” of runs in accordance with a lambda testing algorithm that is similar (but not identical) to that which would be used if these lambda testing runs had not been parallelised at all. If the demands of that algorithm are such that more Marquardt lambdas must then be tested, another “packet” of runs is initiated.
Nevertheless, there will be some occasions on which the path taken by the inversion process is slightly different when the lambda search procedure is parallelised from that which would be taken if the lambda search is conducted on the basis of serial model runs. This will occur if an unexpected and significant advance in the inversion process is achieved in a run that would not have been undertaken on the basis of the usual Marquardt lambda testing procedure based on serial model runs.
Where the number of agents involved in the parallelisation process is high, it is wise to limit the number of agents which actually become involved in the Marquardt lambda testing procedure. One reason for this is that, with so many different lambdas being simultaneously tested, it is possible for some to yield upgrade vectors containing parameters which create problems for the model. In general, the further is a tested lambda from the current lambda, the more likely is this to happen. Problems could include slower model convergence or even model failure.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 11. Parallel PEST and BEOPEST (continuación)
- **Subsection:** 11.2 Parallel PEST – Concepts and Specifications

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** Parallel PEST distributes model runs across networked machines, using a PAGENT agent program on each machine. It requires separate folders for agents to avoid file conflicts and uses shared signal files for communication. The run management file lists agents, runtimes, and filenames. Parallel PEST partially parallelizes Marquardt lambda testing, potentially leading to different solution paths.

### Related Context
- **Previous Summary:** The Parallel PEST run management file (case.rmf) lists agents (AGENTNAME, AGENTDIR), estimated runtimes, and (if IFLETYP=1) input (INFLE) and output (OUTFLE) filenames per agent.  AGENTDIR (folder name ending in \) can be a full or abbreviated path.  Overestimating runtimes is recommended. If IFLETYP=0, filenames are omitted; PEST adds the agent's working directory.
- **Next Summary:** PARLAM (non-zero negative integer) limits agents in parallel lambda testing; -9999 runs one cycle (NUMLAM runs), using a wider range of lambdas (RLAMFAC becomes its negative), and processes all results regardless of trends. This is recommended with many nodes but may increase model failure risk (mitigated by LAMFORGIVE); parameter freezing is also affected.

### Metadata
- **Keywords:** lambdas
- **Chunk ID:** e4b1d5dd3fcb
- **Chunk Index:** 1
- **Previous Chunk ID:** 23f53ad6a8b2
- **Next Chunk ID:** bdc8c3cc13a0

---

## Context

### Summary
**MATQUAD computes y<sup>T</sup>My (from vecfile and matfile, section 2.4), outputting the scalar result as a 1x1 matrix to matoutfile and displaying it on the screen.  Warnings are issued if vector/matrix row names or matrix row/column names do not match. Use `matquad vecfile matfile matoutfile`.**

### Header
**15.17 MATQUAD**

### Content
MATQUAD evaluates the quadratic form ytMy where y is a vector and M is a square matrix. It is run using the command
matquad vecfile matfile matoutfile
where
- vecfile is the name of a matrix file holding the vector y,
matfile is the name of a matrix file holding the matrix M, and matoutfile is the output matrix file. The following should be noted.
1. MATQUAD requires an input vector y. However this vector is actually read as a n×1 matrix from a standard matrix file.
2. Even though ytMy is a scalar, MATQUAD writes this scalar as a 1×1 matrix to the matrix file outfile. However it also writes it to the screen.
3. MATQUAD will issue a warning message if the names of the rows of the vector y are not the same as those of the rows of M. It will also issue a warning message if the rows of M are named differently from the columns of M.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation User Manual Part II: PEST Utility Support Software
- **Main Section:** 15. Matrix Manipulation Programs
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter discusses efficient calibration methods for models with tens of thousands of parameters using PEST. Adjoint techniques are recommended for highly parameterized models. Use compressed binary external derivatives files, 64-bit versions of PEST for large problems, and optimize Jacobian matrix storage. Prioritize linearity of regularization constraints and activate memory conservation for improved efficiency.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** MATPROD calculates the matrix product C=AB (from matfile1 and matfile2, section 2.4), writing the result to matoutfile.  The number of columns in matfile1 must equal the number of rows in matfile2. A warning is issued if row names of matfile1 and column names of matfile2 do not match. Use `matprod matfile1 matfile2 matoutfile`.
- **Next Summary:** MATROW extracts a matrix row (rowname from matfile, section 2.4) as a 1xn matrix to matoutfile, retaining the original row name and using "col1" for the column name. Use `matrow matfile rowname matoutfile`.  It's useful for visualizing resolution matrix rows (using MATTRANS for vertical orientation).

### Metadata
- **Keywords:** 
- **Chunk ID:** d0afbdbf6d07
- **Chunk Index:** 1
- **Previous Chunk ID:** b9ec52af517d
- **Next Chunk ID:** e4fdeea853cc

---

## Context

### Summary
**The line advance instruction "ln" (l=el, n=number of lines) moves the cursor n lines down.  A primary marker locates a string; a secondary marker (not the first item) locates a string on the current line.  Unmatched secondary markers preceded by non-marker instructions cause errors.  Sequential secondary markers are allowed.**

### Header
**2.3.6 The Instruction Set**

### Content
The syntax for the line advance item is “ln” where n is the number of lines to advance; note that “l” is “el”, the twelfth letter of the alphabet, not “one”. The line advance item must be the first item of an instruction line; it and the primary marker are the only two instruction items which can occupy this initial spot. As was explained above, the initial item in an instruction line is always a directive to PEST to move at least one line further in its perusal of the model output file (unless it is a continuation character). In the case of the primary marker, PEST stops reading new lines when it finds the pertinent text string. However in implementing a line advance PEST does not need to examine model output file lines as it advances. It simply moves forward n lines, placing its processing cursor just before the beginning of this new line, this point becoming the new reference point for further processing of the model output file.
Normally a line advance item is followed by other instructions. However if the line advance item is the only item on an instruction line this does not break any syntax rules. In figure 2.6 model-calculated apparent resistivities are written on consecutive lines. Hence before reading each observation, PEST is instructed to move to the beginning of a new line using the “l1” line advance item; see figure 2.7.
If a line advance item leads the first instruction line of a PEST instruction file, the reference
Point for line advance is taken as a “dummy” line just above the first line of the model output file. Thus if the first instruction line begins with “l1”, processing of the model output file begins on its first line; similarly, if the first instruction line begins with “l8”, processing of the model output file begins at its eighth line.
Secondary Marker
A secondary marker is a marker which does not occupy the first position of a PEST instruction line. Hence it does not direct PEST to move downwards on the model output file (though it can be instrumental in this - see below); rather it instructs PEST to move its cursor along the current model output file line until it finds the secondary marker string, and to place its cursor on the last character of that string ready for subsequent processing of that line.
Figure 2.10 shows an extract from a model output file while figure 2.11 shows the instructions necessary to read the potassium concentration from this output file. A primary marker is used to place the PEST cursor on the line above that on which the calculated concentrations are recorded for the distance in which we are interested. Then PEST is directed to advance one line and read the number following the “K:” string in order to find an observation named “kc”; the exclamation marks surrounding “kc” will be discussed shortly.
DISTANCE = 20.0: CATION CONCENTRATIONS:-
Na: 3.49868E-2 Mg: 5.987638E-2 K: 9.987362E-3
Figure 2.10 Extract from a model output file.
pif ~
~DISTANCE = 20.0~
l1 ~K:~ !kc!
Figure 2.11 Extract from an instruction file.
A useful feature of the secondary marker is illustrated in figures 2.12 and 2.13 which represent a model output file extract and a corresponding instruction file extract, respectively. If a particular secondary marker is preceded only by other markers (including, perhaps, one or a number of secondary markers and certainly a primary marker), and the text string corresponding to that secondary marker is not found on a model output file line on which the previous markers’ strings have been located, PEST will assume that it has not yet found the correct model output line and resume its search for a line which holds the text from all three markers. Thus the instruction “%TIME STEP 10%” will cause PEST to pause on its downward journey through the model output file at the first line illustrated in figure 2.12. However, when it does not find the string “STRAIN” on the same line it re-commences its perusal of the model output file, looking for the string “TIME STEP 10” again. Eventually it finds a line containing both the primary and secondary markers and, having done so, commences execution of the next instruction line.
27
TIME STEP 10 (13 ITERATIONS REQUIRED) STRESS ---&gt;
|X = 1.05|STRESS = 4.35678E+03|
|---|---|
|X = 1.10|STRESS = 4.39532E+03|
TIME STEP 10 (BACK SUBSTITUTION) STRAIN ---&gt;
|X = 1.05|STRAIN = 2.56785E-03|
|---|---|
|X = 1.10|STRAIN = 2.34564E-03|
Figure 2.12 Extract from a model output file.
It is important to note that if any instruction items other than markers precede an unmatched secondary marker, PEST will assume that the mismatch is an error condition and cease execution with an appropriate error message. Note also that secondary markers may be used sequentially. For example if the STRAIN variable is always in position 2, then the pertinent line in the instruction file of figure 2.13 could be replaced by "l1 %=% %=% !str1!". This is handy for comma-delimited output files.
pif %
%TIME STEP 10% %STRAIN%
l1 %STRAIN =% !str1!
l1 %STRAIN =% !str2!
Figure 2.13 Extract from an instruction file.
Whitespace

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 2. The Model-PEST Interface
- **Subsection:** 2.3 Instruction Files

### Additional Summaries
- **Higher-Level Summary:** PEST software uses template, instruction, and control files for model input and output. Templates, created with text editor or software, are validated with TEMPCHEK, INSCHEK, and PESTCHEK. Parameters are replaced in templates, and model input files should match for precision. Instruction files extract model outputs. Precision is crucial for accurate derivative calculations.
- **Detailed Summary:** PEST uses instruction files to extract "observations" (model outputs) from model output files (maximum width: 2000 characters).  Observations may be calibration data, predictions, or sensitivity targets.  Terminal output can be redirected to a file for PEST processing; instruction files are suggested to use a ".ins" extension.

### Related Context
- **Previous Summary:** PEST instruction files use "pif" followed by a marker delimiter. Instructions are separated by spaces; "&" continues lines.  PEST reads sequentially; instructions cannot backtrack. Each line starts with a primary marker (delimited string) or line advance item, locating a point for subsequent instructions.  Primary markers are time-consuming; line advance is preferred for consistent output.
- **Next Summary:** The whitespace instruction "w" moves the cursor to the last space before a non-space character. The tab instruction "tn" moves the cursor to column n. Fixed observations "[obsname]n1:n2" read values from columns n1 to n2;  no space is allowed between the name and column numbers.  Line advance or primary markers must precede observation instructions.

### Metadata
- **Keywords:** 
- **Chunk ID:** b2392d18549f
- **Chunk Index:** 2
- **Previous Chunk ID:** 1d3b653b312e
- **Next Chunk ID:** 37fec0451fa1

---

## Context

### Summary
**In Parallel PEST, agents can be assigned to groups (Figure 11.6), listed after AGENTDIR in the run management file. All agents must be grouped; group names (case-insensitive) are quoted if they contain spaces.  PEST prioritizes allocating runs to different groups when the number of runs is less than the number of agents to minimize load per machine.**

### Header
**11.2.8 Agent Groups**

### Content
Parallel PEST optionally allows agents to be gathered into groups. If this is done, the name of the group to which each agent is assigned must follow the name of its working directory in the Parallel PEST run management file. Figure 11.6 shows an example.
prf
3    0      0.10000           -2 0
pest_agent_1           .\test1         "group1"
pest_agent_2           .\test2         "group1"
pest_agent_3           .\test3         "group2"
1.0 1.0 1.0 1.0
Figure 11.6 Example of a Parallel PEST run management file showing agent groups.
The following rules must be followed when assigning agents to groups:
1. If any agent is allocated to a group, all agents must be allocated to a group.
2. If a group name contains a space, this name must be surrounded by quotes when supplied in the run management file. If not, quotes are optional.
3. Agent group names are case-insensitive; these names are converted to lower case internally.
The group concept is used to allocate runs to agents. When undertaking model runs on the basis of different Marquardt lambdas, the number of runs that must be undertaken through any run packet may be considerably less than the number of agents at PEST’s disposal. The reasons for this have been discussed above. In this case, PEST attempts to allocate runs preferentially to agents belonging to different groups; it will not allocate two model runs to a particular agent group as long as all agents belonging to another group are idle. Thus, for example, where agents are designed to use different nodes on a relatively small number of different machines, and are subdivided into groups on the basis of the machine to which each node belongs, this strategy minimises the run load on any single machine. Hence if agents are allocated to machine-specific groups, then if a machine is available on which no model run is taking place, this will be allocated a model run instead of a machine on which a run is already taking place.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 11. Parallel PEST and BEOPEST (continuación)
- **Subsection:** 11.2 Parallel PEST – Concepts and Specifications

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** Parallel PEST distributes model runs across networked machines, using a PAGENT agent program on each machine. It requires separate folders for agents to avoid file conflicts and uses shared signal files for communication. The run management file lists agents, runtimes, and filenames. Parallel PEST partially parallelizes Marquardt lambda testing, potentially leading to different solution paths.

### Related Context
- **Previous Summary:** In Parallel PEST, a negative NUMLAM value in the PEST control file automatically sets PARLAM to -9999, overriding the run management file's PARLAM value. The number of parallel model runs then equals the absolute value of NUMLAM.
- **Next Summary:** Prepare standard PEST input files (control, template, instruction) and check them using PESTCHEK.  Create a Parallel PEST run management file. Ensure the model runs correctly in each agent folder; model input files without adjustable parameters must be identical across all agents or commonly accessible.  The model must be installed on each agent machine.  If IFLETYP=1, model file names are specified in the run management file.

### Metadata
- **Keywords:** lambdas
- **Chunk ID:** 22a1387338d9
- **Chunk Index:** 1
- **Previous Chunk ID:** c666fa5fe8ca
- **Next Chunk ID:** b5582513a10f

---

## Context

### Summary
**The `/p1` switch in Parallel PEST parallelizes the initial model run (calculating the initial objective function and reference model outputs) with Jacobian matrix calculations.  It reports completed runs and continues with parameter upgrades after all runs are finished.  `/s` restarts an interrupted run package (without `/p1`).**

### Header
**11.3.8 Parallelisation of First Model Run**

### Content
In its normal mode of operation Parallel PEST begins an inversion process by undertaking a single, non-parallelised model run in order to compute the objective function corresponding to initial parameters, and in order to obtain model output reference values for subsequent finite-difference derivatives calculation. Then it undertakes a series of parallel runs in which parameters are incrementally varied in order to fill the Jacobian matrix. However while the initial, pre-Jacobian run is underway, agents are standing idle. Depending on the number of available agents, and on whether computer time is being paid for (for example on the cloud), this can constitute a waste of time and of money.
This problem can be overcome by initiating execution of Parallel PEST using the “/p1” command line switch. The first model run is then undertaken in parallel with model runs required for the filling of the Jacobian matrix. (“p1” stands for “parameter values #1” or “initial parameter values”).
Suppose that Parallel PEST is estimating 100 parameters. If its execution is initiated with the “/p1” switch, Parallel PEST will immediately inform the user that it will undertake 101 model runs (more than this if higher order finite-difference derivatives calculation is being employed). It will then report to the screen (and to its run management file) the number of runs that are finished as it receives news of their completion from its agents. When all 101 runs have been completed it writes to the screen the value of the initial objective function, together with other information that it would normally record once the initial run was completed. It also announces that the Jacobian matrix for iteration 1 has been calculated. Shortly thereafter, it commences computation of parameter upgrades, initiating a sequence of model runs based on different Marquardt lambdas.
If Parallel PEST is interrupted during computation of this initial run package, it can be restarted using the “/s” command line switch. It will then re-commence execution at the same spot at which its previous execution was interrupted. Parallel PEST should not, however, be restarted with both the “/s” and “/p1” command line switches together. Parallel PEST can figure out for itself the contents of a previously interrupted run package; hence the “/p1” switch is not required for restarting of the previous run.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 11. Parallel PEST and BEOPEST (continuación)
- **Subsection:** 11.3 Using Parallel PEST

### Additional Summaries
- **Higher-Level Summary:** Parallel PEST and BEOPEST parallelize model runs to reduce run time. Parallel PEST needs a run management file, while BEOPEST's is optional. Both distribute runs to available machines, with BEOPEST using faster TCP/IP communication. Parallel PEST uses PAGENT agents, requires separate folders for agents, and shared signal files for communication. BEOPEST offers ease of use, faster communication, flexibility, and support for multiple command lines and surrogate models.
- **Detailed Summary:** Prepare standard PEST input files and check them using PESTCHEK. Create a Parallel PEST run management file ensuring model runs correctly in each agent folder. Install PEST on each agent machine. Adjust WAIT in run management file to prevent file access conflicts. Parallel PEST manages runs intelligently, reassigning slow runs, and can be restarted mid-process.

### Related Context
- **Previous Summary:** Shut down agents by pressing <Ctrl-C> in the agent window; restart by typing "PAGENT" and providing the model command.  Parallel PEST may not immediately detect a restarted agent if it restarts during the same iteration it was terminated.  An agent is only considered "dead" at the end of an iteration.
- **Next Summary:** Parallel PEST creates a run record file (case.rec) identical to standard PEST and a run management record file (case.rmr).  case.rmr echoes run management file information and records manager-agent communication.  Restarting overwrites case.rmr but appends to case.rec;  agents may differ between runs.

### Metadata
- **Keywords:** lambdas
- **Chunk ID:** adacebf9dc84
- **Chunk Index:** 1
- **Previous Chunk ID:** d53235dba9e4
- **Next Chunk ID:** 7e770e60ef48

---
