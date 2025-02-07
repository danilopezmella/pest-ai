# Search Results for: How is Pest++ related to maxcompdim?

Keywords: maxcompdim

## Variations
1. How does Pest++ relate to maxcompdim?
2. In what way is Pest++ connected to maxcompdim?
3. Can you explain the relationship between Pest++ and maxcompdim?
4. What is the connection between Pest++ and maxcompdim?
5. How is maxcompdim associated with Pest++?


## Context

### Summary
**For faster processing of compressed external derivatives files, supply elements in the same order as PEST's compressed Jacobian matrix (column-major, omitting zeros).  Wise MAXCOMPDIM selection (section 15.4.2) may avoid this re-ordering. Using indexed prior information (previous subsection) or supplying regularization constraints as model-calculated observations avoids reordering issues.  Derivatives for log-transformed parameters require careful handling.**

### Header
**15.9 Accelerating Input of External Derivatives**

### Content
As described in section 15.8, if PEST stores the Jacobian matrix internally in compressed form then it is stored in column order; that is, all elements pertaining to the first parameter are stored first, then for the second, etc.; zero-valued elements are omitted. As was explained in section 15.2, if derivatives are supplied in an external derivatives file, and if the compressed protocol is employed for this file, then the time required to read and process the elements of the derivatives matrix may be reduced if these elements are supplied in the same order as that in which PEST stores elements of the compressed Jacobian matrix. This will especially be the case on the first occasion that the matrix is read, for on that occasion a constant rearrangement of compressed storage elements within PEST’s memory will be the inevitable.
result of supplying these elements in random order. However no such re-arrangement is necessary if all derivative matrix elements for parameter number 1 are supplied first (in order of increasing observation number), followed by all elements for parameter 2, etc.
Recall from section 15.4.2 however, that problems with Jacobian matrix access can also be reduced if the value for MAXCOMPDIM is chosen wisely. Recall that a suitable choice for MAXCOMPDIM may promulgate storage of the observation submatrix of the overall Jacobian submatrix in the more easily accessible standard form. However memory resources must be large enough to allow this. If they are not, then loss of efficiency incurred through compressed Jacobian element rearrangement on the first occasion on which the external derivatives file is read by PEST will occur if prior information is used in the inversion process (for derivatives pertaining to prior information equations are stored at the lower rows of the Jacobian matrix). This problem can be overcome through the use of the indexed prior information protocol discussed in the previous subsection. However if you do not wish to do this, you may wish to consider supplying all regularisation constraints (even linear constraints) as “observations” (computed by the model) rather than as prior information equations in the “prior information” section of the PEST control file, for then the respective elements of the Jacobian matrix can be supplied in correct order. When doing this, care must be taken when supplying derivatives for log-transformed parameters. For example the derivative with respect to par1 of the relationship log(par1) – log(par2) = 0 is 1.0/par1/2.303. If the parameter par1 is log-transformed by PEST, this relationship becomes linear internally to PEST.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 15. Large Numbers of Parameters
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter discusses efficient calibration methods for models with tens of thousands of parameters using PEST. Adjoint techniques are recommended for highly parameterized models. Use compressed binary external derivatives files, 64-bit versions of PEST for large problems, and optimize Jacobian matrix storage. Prioritize linearity of regularization constraints and activate memory conservation for improved efficiency.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** For indexed prior information (NPRIOR<0), the "prior information" section lists PILBL, PIVAL, WEIGHT, OBGNME per equation, followed by NUMINDEX lines specifying Jacobian matrix indices (column, row, value) for non-zero elements.  Faster compressed storage requires that the observation number varies most quickly and parameter numbers never decrease.  The value represents the parameter's factor in the equation.
- **Next Summary:** To increase PEST speed and reduce disk usage for many parameters, set RSTFLE to "norestart", JCOSAVE to "nojcosave", VERBOSEREC to "noverboserec", and ICOV, ICOR, IEIG, and IRES to 0.

### Metadata
- **Keywords:** MAXCOMPDIM
- **Chunk ID:** a6d2a3a086ad
- **Chunk Index:** 1
- **Previous Chunk ID:** 8f648caef927
- **Next Chunk ID:** c331d6d1956a

---

## Context

### Summary
**These are the control variables in the "control data" section.  All are optional with defaults;  some are used only by PEST.  PEST++ uses "++" prefixed keywords.  Integer variables (except NPRIOR) must be >0.  Real variables have specific ranges.  The latest variables are on the PEST++ website.  Parallel run variables (section 5.3.6) are not included.**

### Header
**14. References**

### Content
| NPAR           | integer      | greater than zero                                          | number of parameters                                                                                                            |
| NOBS           | integer      | greater than zero                                          | number of observations                                                                                                          |
| NPARGP         | integer      | greater than zero                                          | number of parameter groups                                                                                                      |
| NPRIOR         | integer      | any integer value                                          | absolute value is number of prior information equations; negative value indicates supply of prior information in indexed format |
| NOBSGP         | integer      | greater than zero                                          | number of observation groups                                                                                                    |
| MAXCOMPDIM     | integer      | zero or greater                                            | number of elements in compressed Jacobian matrix                                                                                |
| NTPLFLE        | integer      | greater than zero                                          | number of template files                                                                                                        |
| NINSFLE        | integer      | greater than zero                                          | number of instruction files                                                                                                     |
| PRECIS         | text         | “single” or “double”                                       | format for writing parameter values to model input files                                                                        |
| DPOINT         | text         | “point” or “nopoint”                                       | omit decimal point in parameter values if possible                                                                              |
| NUMCOM         | integer      | greater than zero                                          | number of command lines used to run model                                                                                       |
| JACFILE        | integer      | 0, 1 or -1                                                 | indicates whether model provides external derivatives file                                                                      |
| MESSFILE       | integer      | zero or one                                                | indicates whether PEST writes PEST-to-model message file                                                                        |
| OBSREREF       | text         | “obsreref”, “obsreref_N” or “noobsreref”                   | activates or de-activates observation re-referencing (with an optional pause after re-referencing runs)                         |
| RLAMBDA1       | real         | zero or greater                                            | initial Marquardt lambda                                                                                                        |
| RLAMFAC        | real         | positive or negative, but not zero                         | dictates Marquardt lambda adjustment process                                                                                    |
| PHIRATSUF      | real         | between zero and one                                       | fractional objective function sufficient for end of current iteration                                                           |
| PHIREDLAM      | real         | between zero and one                                       | termination criterion for Marquardt lambda search                                                                               |
| NUMLAM         | integer      | one or greater; possibly negative with Parallel or BEOPEST | maximum number of Marquardt lambdas to test                                                                                     |
| JACUPDATE      | integer      | zero or greater                                            | activation of Broyden’s Jacobian update procedure                                                                               |
| LAMFORGIVE     | text         | “lamforgive” or “nolamforgive”                             | treat model run failure during lambda search as high objective function                                                         |
| DERFORGIVE     | text         | “derforgive” or “noderforgive”                             | accommodates model failure during Jacobian runs by setting pertinent sensitivities to zero                                      |
| RELPARMAX      | real         | greater than zero                                          | parameter relative change limit                                                                                                 |
| FACPARMAX      | real         | greater than one                                           | parameter factor change limit                                                                                                   |
| FACORIG        | real         | between zero and one                                       | minimum fraction of original parameter value in evaluating relative change                                                      |
| ABSPARMAX(*N*) | real         | greater than zero                                          | parameter absolute change limit – *N’*th instance                                                                               |
| IBOUNDSTICK    | integer      | zero or greater                                            | instructs PEST not to compute derivatives for parameter at its bounds                                                           |
| UPVECBEND      | integer      | zero or one                                                | instructs PEST to bend parameter upgrade vector if parameter hits bounds                                                        |
| PHIREDSWH      | real         | between zero and one                                       | sets objective function change for introduction of central derivatives                                                          |
| NOPTSWITCH     | integer      | one or greater                                             | iteration before which PEST will not switch to central derivatives computation                                                  |
| SPLITSWH       | real         | zero or greater                                            | the factor by which the objective function rises to invoke split slope derivatives analysis until end of run                    |
| DOAUI          | text         | “aui”, “auid”, or “noaui”                                  | instructs PEST to implement automatic user intervention                                                                         |
| DOSENREUSE     | text         | “senreuse” or “nosenreuse”                                 | instructs PEST to reuse parameter sensitivities                                                                                 |
| BOUNDSCALE     | text         | “boundscale” or “noboundscale”                             | parameters are scaled by the inter-bounds interval if using singular value decomposition, LSQR or SVDA                          |
| NOPTMAX        | integer      | -2, -1, 0, or any number greater than zero                 | number of optimization iterations                                                                                               |
| PHIREDSTP      | real         | greater than zero                                          | relative objective function reduction triggering termination                                                                    |
| NPHISTP        | integer      | greater than zero                                          | number of successive iterations over which PHIREDSTP applies                                                                    |
| NPHINORED      | integer      | greater than zero                                          | number of iterations since last drop in objective function to trigger termination                                               |
| RELPARSTP      | real         | greater than zero                                          | maximum relative parameter change triggering termination                                                                        |
| NRELPAR        | integer      | greater than zero                                          | number of successive iterations over which RELPARSTP applies                                                                    |
| PHISTOPTHRESH  | real         | zero or greater                                            | objective function threshold triggering termination                                                                             |
| LASTRUN        | integer      | zero or one                                                | instructs PEST to undertake (or not) final model run with best parameters                                                       |
| PHIABANDON     | real or text | a positive number or name of a file                        | objective function value at which to abandon optimization process or filename containing abandonment schedule                   |
| ICOV           | integer      | zero or one                                                | record covariance matrix in matrix file                                                                                         |
| ICOR           | integer      | zero or one                                                | record correlation coefficient matrix in matrix file                                                                            |
| IEIG           | integer      | zero or one                                                | record eigenvectors in matrix file                                                                                              |
| IRES           | integer      | zero or one                                                | record resolution data                                                                                                          |
| JCOSAVE        | text         | “jcosave” or “nojcosave”                                   | save best Jacobian file as a JCO file - overwriting previously saved files of the same name as the inversion process progresses |

### Source
- **File Name:** PEST Model-Independent Parameter Estimation: PEST++ a Software Suite for Parameter Estimation, Uncertainty Analysis, Management Optimization and Sensitivity Analysis
- **Main Section:** 
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** 
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** This appendix specifies the PEST control file format (Figure A1.1).  Variables are position-based, space/tab-delimited; strings with spaces are quoted.  Blank lines and comments (#) are allowed (PEST versions ≥15).  Optional variables are in brackets.  PEST++ uses "++" prefixed keywords; PEST ignores these.  The first line is "pcf".
- **Next Summary:** This appendix details PEST control file variables (Figures A1.1, A1.2-A1.7).  All PEST++ variables are "++" prefixed keywords.  Variable types (integer, real, text) and values are specified.  Some variables are optional (with defaults).  Some sections/variables are ignored by PEST++.  Parameter group variables control finite-difference derivative calculations (section 3.3).

### Metadata
- **Keywords:** BOUNDSCALE, DERFORGIVE, DOAUI, DOSENREUSE, DPOINT, FACORIG, FACPARMAX, IBOUNDSTICK, ICOR, ICOV, IEIG, IRES, JACFILE, JACUPDATE, JCOSAVE, LAMFORGIVE, LASTRUN, MAXCOMPDIM, MESSFILE, NINSFLE, NOBS, NOBSGP, NOPTMAX, NOPTSWITCH, NPAR, NPARGP, NPHINORED, NPHISTP, NPRIOR, NRELPAR, NTPLFLE, NUMCOM, NUMLAM, OBSREREF, PHIABANDON, PHIRATSUF, PHIREDLAM, PHIREDSTP, PHIREDSWH, PHISTOPTHRESH, PRECIS, RELPARMAX, RELPARSTP, RLAMBDA1, RLAMFAC, SPLITSWH, UPVECBEND, lambdas
- **Chunk ID:** ec06f012104f
- **Chunk Index:** 3
- **Previous Chunk ID:** 36260bc07205
- **Next Chunk ID:** 29df72298597

---

## Context

### Summary
**For highly parameterized models with compressed Jacobian storage (MAXCOMPDIM > 1), using indexed prior information improves efficiency.  A negative NPRIOR value in the "control data" section activates this. The "prior information" section then lists PILBL, PIVAL, WEIGHT, OBGNME per equation, followed by NUMINDEX lines (≥NPRIOR) specifying Jacobian matrix indices (column, row, value) for non-zero elements.**

### Header
**15.8 Accelerated Input of Prior Information**

### Content
When estimating values for a large number of parameters (for example ten thousand or more parameters), the handling of prior information that may provide Tikhonov constraints for these parameters may become problematical if compressed Jacobian storage is employed (i.e. if the MAXCOMPDIM variable in the “control data” section of the PEST control file is set to greater than 1). As has already been discussed, the Jacobian submatrix which holds this prior information is likely to be sparse; hence considerable benefits are to be gained from storing it in compressed form. However storage and retrieval of items that are stored in compressed format requires calculations to be carried out which may increase the computational burden of the overall inversion process.
Considerable computational advantage can be gained if prior information is provided to PEST in the same order as that in which it is stored internally in the compressed Jacobian array. Elements of the compressed Jacobian matrix are stored in row order, with zero-valued elements excluded. That is, elements are stored in the order J(i,j), J(i+1,j), J(i+2,j) etc., with the jump made to column j+1 when all non-zero values in column j have been stored. The row number is the observation (including prior information) number (i in this example), while the parameter number is the column number (j in this example).
In the “prior information” section of the PEST control file, the user supplies prior information in the form of equations. If more than one parameter is cited in any of these equations, the above ordering is not respected. Where many prior information equations are supplied in order to provide regularisation constraints for many estimated parameters, PEST may require a considerable amount of time to read and store this prior information when compressed Jacobian matrix storage is employed.
In order to overcome this problem, PEST provides an alternative means through which prior information can be supplied. This is referred to as “indexed prior information” herein.
PEST is informed that prior information is provided in indexed form in the “prior information” section of the PEST control file if the NPRIOR variable in the “control data” section of the PEST control file is supplied as negative. As usual, the absolute value of NPRIOR must indicate the number of prior information equations that are featured in the
current inverse problem.
When the indexed prior information protocol is adopted, the “prior information” section of the PEST control file is subdivided into two sections. There are no headers between these subsections. The first subsection should contain NPRIOR lines of data. Each line of this subsection must contain four entries. These are as follows.
- The name of the prior information equation (12 characters or less without quotes or blanks); this is the PILBL variable.
- The “observed value” of the prior information equation (a real number); this is the PIVAL variable.
- The weight associated with the prior information equation (a real number); this is the WEIGHT variable.
- The observation group to which the prior information equation belongs (12 characters or less citing a group that has already been named in the “observation groups” section of the PEST control file); this is the OBGNME variable.
Part of this subsection of the “prior information” section is exemplified in figure 15.5.
* prior information
pr_r1      0.0     1.0 regul_row
pr_r2      0.0     1.0 regul_row
pr_r3      0.0     1.0 regul_row
pr_r4      0.0     1.0 regul_row
pr_r5      0.0     1.0 regul_row
pr_r6      0.0     1.0 regul_row
pr_r7      0.0     1.0 regul_row
pr_r8      0.0     1.0 regul_row
pr_r9      0.0     1.0 regul_row
pr_r10 0.0         1.0 regul_row
pr_r11 0.0         1.0 regul_row
pr_r12 0.0         1.0 regul_row
pr_r13 0.0         1.0 regul_row
pr_r14 0.0         1.0 regul_row
pr_r15 0.0         1.0 regul_row
etc
Figure 15.5 Part of the first subsection of the “prior information” section of a PEST control file in which prior information is supplied in indexed format.
Following NPRIOR items supplied as above is the second subsection of the “prior information” section of the PEST control file. This subsection begins with a line containing a single integer, this specifying the number of lines to follow. This integer must equal or exceed NPRIOR; it will be referred to as NUMINDEX herein.
Each of the following NUMINDEX lines must contain three entries. These are, in order:
- a column number of the Jacobian matrix (an integer);
- a row number of the Jacobian matrix (an integer);
- the value of the element of the Jacobian matrix corresponding to the nominated row and column numbers.
A Jacobian matrix column number is obtained by counting parameters in order of their appearance in the “parameter data” section of the PEST control file; fixed and tied parameters are omitted from this count. A row number is obtained by counting first observations, and then prior information equations, in order of their appearance in the PEST control file. For prior information equations, the row number must exceed NOBS (where NOBS is the number of observations featured in the PEST control file), and must be less than or equal to
NOBS+NPRIOR. It is the user’s task to calculate these indices him/herself; normally a PEST control file which features indexed prior information will be written by utility software which undertakes these calculations as part of its processing services.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 15. Large Numbers of Parameters
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter discusses efficient calibration methods for models with tens of thousands of parameters using PEST. Adjoint techniques are recommended for highly parameterized models. Use compressed binary external derivatives files, 64-bit versions of PEST for large problems, and optimize Jacobian matrix storage. Prioritize linearity of regularization constraints and activate memory conservation for improved efficiency.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** MEMSAVE ("memsave" or "nomemsave", Figure 15.4, after FRACPHIM or PHIMACCEPT in the "regularisation" section) activates memory conservation.  "memsave" sets ICOV, ICOR, and IEIG to 0 (disabling covariance matrix calculations and case.mtt files) and LINREG to "nonlinreg", potentially increasing runtime.
- **Next Summary:** For indexed prior information (NPRIOR<0), the "prior information" section lists PILBL, PIVAL, WEIGHT, OBGNME per equation, followed by NUMINDEX lines specifying Jacobian matrix indices (column, row, value) for non-zero elements.  Faster compressed storage requires that the observation number varies most quickly and parameter numbers never decrease.  The value represents the parameter's factor in the equation.

### Metadata
- **Keywords:** * prior information, MAXCOMPDIM, NOBS, NPRIOR, OBGNME, PILBL, PIVAL
- **Chunk ID:** 31964a4bdbf5
- **Chunk Index:** 1
- **Previous Chunk ID:** c0a006bd61b4
- **Next Chunk ID:** 8f648caef927

---

## Context

### Summary
**MAXCOMPDIM (integer, >1 in "control data" section, Figure 15.1) activates Jacobian matrix compression, potentially reducing memory usage but slowing inversion.  PEST prioritizes compressing the prior information submatrix; if MAXCOMPDIM is insufficient, it stops with an error message.  Restarting via `/s` or `/d` is possible after editing MAXCOMPDIM.**

### Header
**15.4.2 The MAXCOMPDIM Control Variable**

### Content
To address this issue, PEST supports compressed internal storage of the Jacobian matrix. This compressed storage mechanism is supplemented by programming within PEST that accesses elements of the compressed Jacobian matrix in ways that are most efficient for the types of Jacobian matrix calculations normally undertaken by PEST. There is some loss in inversion speed incurred by the use of compressed Jacobian matrix storage; however the cost of compression has been reduced as much as possible.
Jacobian matrix compression is activated through use of an optional variable which resides on the third line of the “control data” section of the PEST control file. This variable is named MAXCOMPDIM; see figure 15.1 for its location. If MAXCOMPDIM is omitted from the PEST control file, or is set to 1 or less, no Jacobian compression takes place. If it is set to greater than 1, the vector which holds the compressed form of the Jacobian matrix is dimensioned as MAXCOMPDIM, and Jacobian compression takes place. If, in the course of its execution, PEST discovers that MAXCOMPDIM has not been set large enough to hold the compressed Jacobian matrix, it will cease execution with an appropriate error message.
* control data
RSTFLE PESTMODE
NPAR NOBS NPARGP NPRIOR NOBSGP [MAXCOMPDIM] [DERZEROLIM]
NTPLFLE NINSFLE PRECIS DPOINT [NUMCOM JACFILE MESSFILE] [OBSREREF]
RLAMBDA1 RLAMFAC PHIRATSUF PHIREDLAM NUMLAM [JACUPDATE] [LAMFORGIVE] [DERFORGIVE]
RELPARMAX FACPARMAX FACORIG [IBOUNDSTICK UPVECBEND] [ABSPARMAX]
PHIREDSWH [NOPTSWITCH] [SPLITSWH] [DOAUI] [DOSENREUSE] [BOUNDSCALE]
NOPTMAX PHIREDSTP NPHISTP NPHINORED RELPARSTP NRELPAR [PHISTOPTHRESH] [LASTRUN] [PHIABANDON]
ICOV ICOR IEIG [IRES] [JCOSAVE] [VERBOSEREC] [JCOSAVEITN] [REISAVEITN] [PARSAVEITN] [PARSAVERUN]
Figure 15.1 “Control data” section of the PEST control file with the optional MAXCOMPDIM variable highlighted.
The exact manner in which PEST stores the compressed Jacobian matrix depends on the value that is supplied for MAXCOMPDIM. If it is possible, PEST tries to subdivide the Jacobian matrix into two submatrices. The first (with dimensions no×m) pertains only to observations; the second (with dimensions np×m) pertains only to prior information. Not only is the second submatrix normally much sparser than the first. Its elements need to be calculated only once.
If the user-supplied value for MAXCOMPDIM is greater than no×m + nnz + 10 where nnz, then number of non-zero elements in the prior information submatrix of the Jacobian matrix is the PEST will store the observation submatrix of the Jacobian matrix in standard form (to allow easy access to elements of this matrix). Meanwhile it stores the prior information submatrix of the Jacobian matrix in compressed format wherein internal indexing is such as to allow rapid access to neighbouring nonzero elements where nonzero elements are very sparse. In many inversion contexts nnz is easily calculated. For example if there are np prior information equations, and each such equation cites nc parameters, then nnz is readily calculated as np × n. c PEST knows soon after commencement of execution whether it can adopt this second.
protocol for storage of the Jacobian matrix. If it cannot, then it adopts the first protocol wherein compressed storage is implemented for the entirety of the Jacobian matrix. However this brings with it the problem that PEST does not have foreknowledge of how many zero-valued elements the observation component of the Jacobian matrix will contain. This can only be known as the Jacobian matrix is actually filled, either through the undertaking of model runs for the purposes of finite-difference derivatives calculation or through reading a model-produced external derivatives file. Under the former circumstances, a large number of model runs need to be undertaken before PEST ceases execution with an error message that MAXCOMPDIM needs to be set higher.
If PEST does indeed inform you that MAXCOMPDIM needs to be set higher, then the PEST control file must be edited accordingly and PEST re-started. Fortunately execution of PEST can then be re-commenced with the “/s” or “/d” switches (depending on whether it is being run in parallel or serial mode). Previous model runs are therefore not wasted.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 15. Large Numbers of Parameters
- **Subsection:** 15.4 Compressed Internal Jacobian Storage

### Additional Summaries
- **Higher-Level Summary:** This chapter discusses efficient calibration methods for models with tens of thousands of parameters using PEST. Adjoint techniques are recommended for highly parameterized models. Use compressed binary external derivatives files, 64-bit versions of PEST for large problems, and optimize Jacobian matrix storage. Prioritize linearity of regularization constraints and activate memory conservation for improved efficiency.
- **Detailed Summary:** In highly parameterized inversions, excessive Jacobian matrix storage can be reduced by omitting zero-valued elements. MAXCOMPDIM in PEST activates Jacobian matrix compression, prioritizing compressing the prior information submatrix. DERZEROLIM sets a threshold for omitting near-zero finite-difference derivatives, filtering numerical noise in compressed Jacobian storage.

### Related Context
- **Previous Summary:** In highly parameterized inversions, Jacobian matrix storage (dimensions (no+np)×m) can be excessive.  Many sensitivities and Tikhonov regularization elements are often zero. A data storage mechanism that omits zero-valued elements significantly reduces PEST's memory requirements.
- **Next Summary:** DERZEROLIM (real, optional, after MAXCOMPDIM in "control data" section) sets a threshold for omitting near-zero finite-difference derivatives from compressed Jacobian storage (MAXCOMPDIM > 1). It filters numerical noise but does not affect externally calculated derivatives.

### Metadata
- **Keywords:** * control data, BOUNDSCALE, DERFORGIVE, DOAUI, DOSENREUSE, DPOINT, FACORIG, FACPARMAX, IBOUNDSTICK, ICOR, ICOV, IEIG, IRES, JACFILE, JACUPDATE, JCOSAVE, JCOSAVEITN, LAMFORGIVE, LASTRUN, MAXCOMPDIM, MESSFILE, NINSFLE, NOBS, NOBSGP, NOPTMAX, NOPTSWITCH, NPAR, NPARGP, NPHINORED, NPHISTP, NPRIOR, NRELPAR, NTPLFLE, NUMCOM, NUMLAM, OBSREREF, PARSAVEITN, PARSAVERUN, PESTMODE, PHIABANDON, PHIRATSUF, PHIREDLAM, PHIREDSTP, PHIREDSWH, PHISTOPTHRESH, PRECIS, REISAVEITN, RELPARMAX, RELPARSTP, RLAMBDA1, RLAMFAC, RSTFLE, SPLITSWH, UPVECBEND, VERBOSEREC
- **Chunk ID:** 43c6e8ea67dc
- **Chunk Index:** 1
- **Previous Chunk ID:** 8c1f42813f75
- **Next Chunk ID:** 73127b7a589f

---

## Context

### Summary
**NPAR (total parameters), NOBS (observations, excluding dummy), NPARGP (parameter groups), NPRIOR (prior information items), and NOBSGP (observation groups) are integer variables in the PEST control file.  In "estimation" mode, adjustable parameters should not exceed weighted observations plus prior information, unless using SVD or LSQR. MAXCOMPDIM (optional) activates compressed Jacobian matrix storage.**

### Header
**4.2.4 Third Line**

### Content
NPAR
This is the total number of parameters featured in the current PEST case, including adjustable, fixed and tied parameters; NPAR must be supplied as an integer.
NOBS
This integer variable represents the total number of observations featured in the current case. Note that, when counting the number of observations, dummy observations (see chapter 2) that may be featured in one or a number of instruction files are ignored.
NPARGP
This is the number of parameter groups. Recall from the previous chapter that the variables which govern the operation of finite-difference derivatives are assigned to parameter groups. Parameter grouping can also be of importance where the ADDREG1 utility described in part II of this manual is employed to add preferred value Tikhonov regularisation to a PEST control file. NPARGP is an integer variable.
NPRIOR
NPRIOR, another integer variable, is the number of articles of prior information that are included in the parameter estimation process. If there are no articles of prior information, NPRIOR must be zero. If PEST is running in “estimation” mode, then you should ensure that the number of adjustable parameters is less than or equal to the number of observations for which there are non-zero weights plus the number of articles of prior information for which there are non-zero weights. If this is not the case, then the inverse problem cannot possibly have a unique solution. Furthermore, unless solution of this nonunique inverse problem is sought using singular value decomposition or LSQR, PEST may make little progress in lowering the objective function because the XtQX matrix appearing in equation 5.2.9 of Doherty (2015) will be singular and hence non-invertible. Sadly, nonuniqueness is the rule rather than the exception when calibrating environmental models. PEST is not troubled by parameter nonuniqueness if Tikhonov regularisation is introduced to the inverse problem, and if singular value decomposition or LSQR is used in solution of that problem. Because of the prevalence of nonuniqueness in environmental model calibration, this should be done as a matter of course. (The outnumbering of observations by parameters does not create a numerical problem if singular value decomposition or LSQR are used to solve the inverse problem, despite the noninvertability of XtQX.)
NOBSGP
NOBSGP, another integer variable, is the number of observation groups featured in the PEST control file. Each observation and each prior information equation must be assigned to an observation group (they can all be assigned to the same group if desired). When PEST evaluates the total objective function it also evaluates the contribution made to this total by each observation group.
MAXCOMPDIM
MAXCOMPDIM is an optional integer variable. It is used to activate compressed internal storage of the Jacobian matrix by PEST. This can slow PEST execution. At the same time it can allow PEST to undertake very highly parameterized inversion wherein adjustable parameters may number in the tens of thousands. This is further discussed in section 15.4.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 4. The PEST Control File
- **Subsection:** 4.2 Control Data Section

### Additional Summaries
- **Higher-Level Summary:** Figure 4.2 in PEST software displays control data section variables. The text details options for writing matrices, files, and parameters, including settings for matrix and file saving, operational modes, precision, derivative handling, and convergence criteria. Optional features like sensitivity reuse and LSQR algorithm for solving inverse problems are discussed.
- **Detailed Summary:** Figure 4.2 shows "control data" section variables (from Appendix A, Figure A1.1).  Some variables are discussed later. The first line must be "* control data";  some variables are optional (in brackets).

### Related Context
- **Previous Summary:** RSTFLE ("restart" or "norestart") enables PEST's restart capability (Appendix B). PESTMODE ("estimation", "prediction", "regularisation", or "pareto") selects the operational mode;  additional mode-specific sections may be included.
- **Next Summary:** DERZEROLIM (optional) defines a Jacobian matrix zero threshold for compressed storage. NTPLFLE is the number of template files; NINSFLE is the number of instruction files. PRECIS ("single" or "double") sets precision. DPOINT ("point" or "nopoint") controls decimal point inclusion. NUMCOM, JACFILE, MESSFILE (Chapter 12) handle model-calculated derivatives. OBSREREF (Chapter 14) activates observation re-referencing.

### Metadata
- **Keywords:** MAXCOMPDIM, NOBS, NOBSGP, NPAR, NPARGP, NPRIOR
- **Chunk ID:** 26873b456a9c
- **Chunk Index:** 1
- **Previous Chunk ID:** 9b2451e25955
- **Next Chunk ID:** e611a7673cad

---
