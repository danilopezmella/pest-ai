# Search Results for: What are the consequences of setting `opt_risk` to values significantly higher or lower than 0.5 on the outcomes of the optimization process?

Keywords: None


## Context

### Summary
**To increase PEST speed and reduce disk usage for many parameters, set RSTFLE to "norestart", JCOSAVE to "nojcosave", VERBOSEREC to "noverboserec", and ICOV, ICOR, IEIG, and IRES to 0.**

### Header
**15.10 Other Savings**

### Content
Where parameter numbers are large, the reading and writing of information pertaining to the inversion process can be a lengthy matter which can add to the time required for solution of the inverse problem. In some instances the following measures can accrue considerable savings in PEST speed (and in PEST’s disk footprint).
- Set the RSTFLE variable to “norestart”;
- Set JCOSAVE to “nojcosave”;
- Set VERBOSEREC to “noverboserec”;
- Set ICOV, ICOR, IEIG and IRES to 0.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 15. Large Numbers of Parameters
- **Subsection:** 

### Additional Summaries
- **Higher-Level Summary:** This chapter discusses efficient calibration methods for models with tens of thousands of parameters using PEST. Adjoint techniques are recommended for highly parameterized models. Use compressed binary external derivatives files, 64-bit versions of PEST for large problems, and optimize Jacobian matrix storage. Prioritize linearity of regularization constraints and activate memory conservation for improved efficiency.
- **Detailed Summary:** 

### Related Context
- **Previous Summary:** For faster processing of compressed external derivatives files, supply elements in the same order as PEST's compressed Jacobian matrix (column-major, omitting zeros).  Wise MAXCOMPDIM selection (section 15.4.2) may avoid this re-ordering. Using indexed prior information (previous subsection) or supplying regularization constraints as model-calculated observations avoids reordering issues.  Derivatives for log-transformed parameters require careful handling.
- **Next Summary:** CMAES_P, a PEST-compatible CMA-ES global optimizer (Hansen and Ostermeier 2001, Hansen et al 2003, Bayer and Finkel 2007), doesn't require derivatives, making it suitable for numerically unstable or highly nonlinear models.  It may outperform PEST when derivatives lack integrity but will likely be slower when they are reliable.  It's based on CMA-ES version 2.5.

### Metadata
- **Keywords:** ICOR, ICOV, IEIG, IRES, JCOSAVE, RSTFLE, VERBOSEREC
- **Chunk ID:** c331d6d1956a
- **Chunk Index:** 1
- **Previous Chunk ID:** a6d2a3a086ad
- **Next Chunk ID:** 294cf037e40d

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
