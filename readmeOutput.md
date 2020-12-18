# Output: 

## Information for Users

User receives via e-mail the clicklable **url link** to his/her specific project results, which conduces directly to the web app results. 

Parameters section has collapsible content (models and processes), clicking on each model or process shows the specific parameters calculated by Maximum Likelihood, and optimized via **bppml** (see references).

Complete results folder can be downloaded in .zip format.  Please feel free to contact the mantainers team, the application is in continuous evolution as well as its core software: Bio++ and BppSuite. Posibilities for re-entering results (as chosen by user) into a new calculation by **bppml** are under consideration, and hopefully will be available progressively in the future.

Buttons to visualize calculated Phylogenetic tree(s) allow to display one tree at the time. In our application, thanks to the integration of advanced phylotree.js functions (see references)  it is possible to:
 - Zoom : once tree is displayed, scroll up or down to zoom in or out.
 - Rebranch: click on desired node, a menu will show this option.
 - Select a sub-tree: click on desired node, then click option  'Copy Subtree as Newick'.

Regarding to alternative tree manipulation, we kindly invite you to check http://phylotree.hyphy.org/. 

## Notes for developpers:

Files/paths required for results delivery:
```
├── output_fun.py
├── routes_sc.py
├── static
│   ├── optionalStyles.css
│   └── resphyloapp.js
└── templates
	└── results_sc.html
```
`output_fun` contains all functions imported by `routes_sc.py` to preprocess results that are going to be visualized. Not all file results are subject to visualization, only phylogenies, relevant input parameters and ML calculated parameters are passed in JSON string format to template (through flask file `routes_sc.py`) into "hidden" tags to be extracted by `resphyloapp.js`. This javascript file dynamically adds fields and objects to results_sc view, and imports third party software and css styles, as well as inhome css styles. To mention, tree interaction uses phylotree software https://github.com/veg/phylotree.js, a reactive team is available in their github repository to answer developers questions, for example: https://github.com/veg/phylotree.js/issues/253.

### References:

- Guéguen, L., Gaillard, S., Boussau, B., Gouy, M., Groussin, M., Rochette, N. C., ... & Bernard, A. (2013). Bio++: efficient extensible libraries and tools for computational molecular evolution. Molecular biology and evolution, 30(8), 1745-1750.

- Shank SD, Weaver S, Kosakovsky Pond SL. phylotree.js - a JavaScript library for application development and interactive data visualization in phylogenetics. BMC Bioinformatics. 2018 Jul 25;19(1):276. doi: 10.1186/s12859-018-2283-2. PMID: 30045713; PMCID: PMC6060545.

- Dutheil J, Boussau B. Non-homogeneous models of sequence evolution in the Bio++ suite of libraries and programs. MC evolutionary biology, 2008 - Springer
