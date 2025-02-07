# Search Results for: How does PESTPP-OPT calculate the standard deviation of model outputs for δo adjustments?

Keywords: None


## Context

### Summary
**The five-point method with α and β from equations 3.5.4 and 3.5.5 is preferred when model outputs contain numerical noise from convergence difficulties or other factors.  This often motivates using four runs per parameter per iteration.**

### Header
**3.5.2 Forward, Central and Five-Point Differences**

### Content
The latter choice is far better where model outputs are contaminated by numerical noise that may arise from model solution convergence difficulties and other factors. It would normally be to address this problem that a modeller would even consider undertaking four runs per parameter per iteration.

### Source
- **File Name:** PEST Model-Independent Parameter Estimation. User Manual Part I: PEST, SENSAN and Global Optimisers
- **Main Section:** 3. What PEST Does
- **Subsection:** 3.5 The Calculation of Derivatives

### Additional Summaries
- **Higher-Level Summary:** This chapter introduces PEST, a tool for solving inverse problems in four modes: "estimation", "predictive analysis", "regularisation", and "pareto". It uses control files with specific sections and options for parameter adjustments, transformations, and derivative calculations. PEST generates Jacobian matrices and offers utilities for file manipulation and sensitivity analysis.
- **Detailed Summary:** PEST calculates Jacobian matrix elements using finite differences unless provided by the model. Accurate derivatives are crucial, managed by SVD or LSQR for ill-posedness. Parameters are grouped for derivative calculation management. PEST offers forward, central, and five-point finite-difference methods, with central methods providing higher accuracy. Model-calculated derivatives are preferred for accuracy and speed.

### Related Context
- **Previous Summary:** PEST calculates derivatives using forward (one model run per parameter), central (two runs), or five-point (four runs) finite-difference methods. Central methods (outside points, parabolic, least-squares) offer higher accuracy than forward differences. Five-point methods use equation 3.5.1, with α and β from equations 3.5.2-3.5.5 for precision or minimum error variance.
- **Next Summary:** PEST offers "absolute," "relative," and "rel_to_max" parameter increment types (INCTYP, DERINC).  "Relative" and "rel_to_max" adjust increments based on parameter values; DERINCLB provides a minimum increment.  Increments must allow distinguishing incremented and non-incremented parameter values in the model input file.  Increments cannot exceed the parameter range divided by 3.2.

### Metadata
- **Keywords:** 
- **Chunk ID:** 1813ccd458a7
- **Chunk Index:** 2
- **Previous Chunk ID:** 84d79eb825ab
- **Next Chunk ID:** 4b27f7aae10c

---
