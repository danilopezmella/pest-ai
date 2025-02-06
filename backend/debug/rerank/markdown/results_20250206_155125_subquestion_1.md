# Search Results for: What is maxcompdim?

Keywords: maxcompdim

## Variations
1. Can you explain what maxcompdim is?
2. What does maxcompdim refer to?
3. Could you describe what maxcompdim is?
4. Please define maxcompdim.
5. What is meant by maxcompdim?


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
**DERZEROLIM (optional) defines a Jacobian matrix zero threshold for compressed storage. NTPLFLE is the number of template files; NINSFLE is the number of instruction files. PRECIS ("single" or "double") sets precision. DPOINT ("point" or "nopoint") controls decimal point inclusion. NUMCOM, JACFILE, MESSFILE (Chapter 12) handle model-calculated derivatives. OBSREREF (Chapter 14) activates observation re-referencing.**

### Header
**4.2.5 Fourth Line**

### Content
DERZEROLIM
Like MAXCOMPDIM, DERZEROLIM is optional. If supplied, it supports the use of MAXCOMPDIM, defining a threshold below which the value of an element of the Jacobian matrix can be considered to be zero, and hence omitted from compressed storage.
NTPLFLE
This is an integer variable, informing PEST of the number of model input files which contain parameters; PEST must write each of these files prior to a model run. As there must be one template file for each such model input file, NTPLFLE is also equal to the number of template files which PEST must use in writing the current parameter set. A model may have many input files; however PEST is concerned only with those which it needs to rewrite prior to each model run, i.e. those for which there are template files. As explained later, a single template file may, under some circumstances, be used to write more than one model input file. In such a case you must count each template file - model input file pair separately in determining NTPLFLE.
NINSFLE
This is the number of instruction files. There must be one instruction file for each model output file containing model-generated observations which PEST reads. (In some circumstances, a single model output file may be read by more than one instruction file; however each instruction file - model output file pair is counted separately in determining NINSFLE).
PRECIS
PRECIS is a character variable which must be either “single” or “double”. If it is supplied to PEST as “single”, PEST writes parameters to model input files using single precision protocol; hence parameter values will never be greater than 13 characters in length (even if the parameter space allows for a greater length) and the exponentiation character is “e”. If PRECIS is supplied as “double”, parameter values are written to model input files using double precision protocol; the maximum parameter value length is 23 characters and the exponentiation symbol is “d”. See section 2.2.6.
DPOINT
This character variable must be either “point” or “nopoint”. If DPOINT is provided with the value “nopoint” PEST will omit the decimal point from representations of parameter values on model input files if the decimal point is redundant, thus making room for the use of one extra significant figure. If DPOINT is supplied as “point” (which is normally recommended), PEST will ensure that the decimal point is always present. See section 2.2.6.
NUMCOM, JACFILE and MESSFILE
These variables are used to control the manner in which PEST can obtain derivatives directly from the model if these are available; see chapter 12. For normal operation these should be set to 1, 0 and 0 respectively. Alternatively, all of them can be omitted. However if one of
them is cited in the PEST control file then all of them must be cited. Also if a value is supplied for NUMCOM, then a DERCOM value must be supplied for all parameters in the “parameter data” section of the PEST control file; If NUMCOM is 1, then all of these DERCOMs must also be 1.
OBSREREF
Observation re-referencing is activated by adding the string “obsreref” to the fourth line of the “control data” section of the PEST control file. The “obsreref” string can be placed anywhere on this line. Observation re-referencing can be de-activated (the default condition) by omitting this string, or by placing the string “noobsreref” on this line. Observation re-referencing is discussed in chapter 14 of this manual.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 4. The PEST Control File
- **Subsection:** 4.2 Control Data Section

### Additional Summaries
- **Higher-Level Summary:** Figure 4.2 in PEST software displays control data section variables. The text details options for writing matrices, files, and parameters, including settings for matrix and file saving, operational modes, precision, derivative handling, and convergence criteria. Optional features like sensitivity reuse and LSQR algorithm for solving inverse problems are discussed.
- **Detailed Summary:** Figure 4.2 shows "control data" section variables (from Appendix A, Figure A1.1).  Some variables are discussed later. The first line must be "* control data";  some variables are optional (in brackets).

### Related Context
- **Previous Summary:** NPAR (total parameters), NOBS (observations, excluding dummy), NPARGP (parameter groups), NPRIOR (prior information items), and NOBSGP (observation groups) are integer variables in the PEST control file.  In "estimation" mode, adjustable parameters should not exceed weighted observations plus prior information, unless using SVD or LSQR. MAXCOMPDIM (optional) activates compressed Jacobian matrix storage.
- **Next Summary:** RLAMBDA1 (initial Marquardt lambda, ~10.0) and RLAMFAC (Marquardt lambda adjustment factor, ~2.0 or -3.0) control lambda adjustments during iterations.  PHIRATSUF (objective function reduction ratio, ~0.3) determines iteration completion; if not met, PHIREDLAM is used.

### Metadata
- **Keywords:** DERCOM, DPOINT, JACFILE, MAXCOMPDIM, MESSFILE, NINSFLE, NTPLFLE, NUMCOM, OBSREREF, PRECIS
- **Chunk ID:** e611a7673cad
- **Chunk Index:** 1
- **Previous Chunk ID:** 26873b456a9c
- **Next Chunk ID:** 9b975b5255bb

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
**DERZEROLIM (real, optional, after MAXCOMPDIM in "control data" section) sets a threshold for omitting near-zero finite-difference derivatives from compressed Jacobian storage (MAXCOMPDIM > 1). It filters numerical noise but does not affect externally calculated derivatives.**

### Header
**15.4.3 The DERZEROLIM Control Variable**

### Content
A PEST variable named DERZEROLIM can optionally follow MAXCOMPDIM on the third line of the “control data” section of the PEST control file. This should be entered as a low number or zero. A finite-difference derivative is assumed to be zero (and hence not stored in the compressed Jacobian matrix) if its absolute value is less than this number. This allows numerical noise in finite-difference derivatives incurred, for example, by problematic simulator solver convergence, to be filtered out to at least some extent at the same time as it reduces Jacobian matrix storage requirements. Note that the DERZEROLIM threshold is not applied to externally-calculated derivatives; nor is it applied to finite-difference derivatives unless MAXCOMPDIM is greater than one, and hence compressed Jacobian storage is activated.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 15. Large Numbers of Parameters
- **Subsection:** 15.4 Compressed Internal Jacobian Storage

### Additional Summaries
- **Higher-Level Summary:** This chapter discusses efficient calibration methods for models with tens of thousands of parameters using PEST. Adjoint techniques are recommended for highly parameterized models. Use compressed binary external derivatives files, 64-bit versions of PEST for large problems, and optimize Jacobian matrix storage. Prioritize linearity of regularization constraints and activate memory conservation for improved efficiency.
- **Detailed Summary:** In highly parameterized inversions, excessive Jacobian matrix storage can be reduced by omitting zero-valued elements. MAXCOMPDIM in PEST activates Jacobian matrix compression, prioritizing compressing the prior information submatrix. DERZEROLIM sets a threshold for omitting near-zero finite-difference derivatives, filtering numerical noise in compressed Jacobian storage.

### Related Context
- **Previous Summary:** MAXCOMPDIM (integer, >1 in "control data" section, Figure 15.1) activates Jacobian matrix compression, potentially reducing memory usage but slowing inversion.  PEST prioritizes compressing the prior information submatrix; if MAXCOMPDIM is insufficient, it stops with an error message.  Restarting via `/s` or `/d` is possible after editing MAXCOMPDIM.
- **Next Summary:** Placing all "regul" group observations after other observations in the "observation data" section improves efficiency in PEST's regularization process when regularization constraints are supplied through observations.  PEST automatically detects and utilizes this arrangement.

### Metadata
- **Keywords:** MAXCOMPDIM
- **Chunk ID:** 73127b7a589f
- **Chunk Index:** 1
- **Previous Chunk ID:** 43c6e8ea67dc
- **Next Chunk ID:** bc1acb013ea3

---

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
