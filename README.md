# Pearce-Kelly

An implementation of the Pearce-Kelly algorithm.

### Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Building](#building)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Introduction

This algorithm will topologically sort a graph, if there are no cycles, otherwise it will report the cycles. The [Wikipedia page on topological sorting](https://en.wikipedia.org/wiki/Topological_sorting) has a brief explanation.
    
A graph can be constructed with the `fromVertexLiterals()` factory method as follows:

    const kahn = require('occam-kahn');

    const { Graph } = kahn;

    const graph = Graph.fromVertexLiterals(
    
      ['a', ['b']],
      ['b', ['c']],
      ['d', ['c']],
      ['e', []],
      ['f', ['g']],
      ['h', ['g']]
      
    );
    
Note that the array of names that is the second element of each literal gives the *ancestors* of the vertex and not its descendants. This is the preferred method when constructing a dependency tree, because a resource's dependencies are usually stipulated whereas the converse is not usually true.
   
It is possible to check whether there are any cycles present:

    const cyclesPresent = graph.areCyclesPresent();
    
If there are no cycles present, the topologically sorted vertices of the graph are available:
    
    const topologicallySortedVertices = graph.getTopologicallySortedVertices();
    
If there are cycles present, they will be amongst the remaining edges:

    const remainingEdges = graph.getRemainingEdges();
    
The algorithm will also leave both the incoming and outgoing edges of the topologically sorted vertices intact and these are available by way of the requisite getters:
  
    const firstTopologicallySortedVertex = first(topologicallySortedVertices),
          incomingEdges = firstTopologicallySortedVertex.getIncomingEdges(),
          outgoingEdges = firstTopologicallySortedVertex.getOutgoingEdges();
    
## Installation

With [npm](https://www.npmjs.com/):

    npm install occam-pearce-kelly

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone git@github.com:occam-proof-assistant/Pearce-Kelly.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

## Building

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Acknowledgements

This implementation was closely based on the following:

http://homepages.ecs.vuw.ac.nz/~djp/files/PK-JEA07.pdf

## Contact

* jecs@imperial.ac.uk
* http://djalbat.com
