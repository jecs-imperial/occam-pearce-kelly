# Pearce-Kelly

An implementation of the Pearce-Kelly algorithm.

### Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Building](#building)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Introduction

This algorithm maintains a topological ordering of a directed acyclic graph. It does this by rearranging the topological ordering whenever an edge is added, if possible, or reporting the cycle that breaks the topological ordering if not. An empty directed acyclic graph can be created with the `fromNothing()` factory method which is trivially acyclic and then edges and vertices can be added to it incrementally: 

    const pearckelly = require('occam-pearce-kelly');

    const { DirectedAcyclicGraph } = pearcekelly;

    const directedAcyclicGraph = DirectedAcyclicGraph.fromNothing(),
          vertexName = 'i',
          sourceVertexName = 'j',
          targetVertexName = 'k';
            
    directedAcyclicGraph.addVertexByName(vertexName);    
    
    directedAcyclicGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);

Note that there is no need to added vertices explicitly, they will be added whenever necessary when edges that reference them are added. 

A better way to create a directed acyclic graph is to a create graph and topologically order its vertices using the [Kahn](https://github.com/occam-proof-assistant/Kahn) algorithm. These topologically ordered vertices, complete with edge information, can then be used as the input for a directed acyclic graph:
    
    const kahn = require('occam-kahn');

    const { Graph } = kahn;

    const vertexLiterals = [
                               
             ['a', ['b']],
             ['b', ['c']],
             ['d', ['c']],
             ['e', []],
             ['f', ['g']],
             ['h', ['g']]
             
           ],
           graph = Graph.fromVertexLiterals(vertexLiterals);
           directedAcyclicGraph = 
           
             DirectedAcyclicGraph.fromTopologicallyOrderedVertices(topologicallyOrderedVertices);
            
From this point on, edges and vertices can again be added incrementally:

    const cyclicVertexNames = 
    
     directedAcyclicGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
        
The return value of the `addEdgeByVertexNames()` will be `null` if the edge does not break the topological ordering. If it does, the cycle that breaks the ordering will be returned in the form of an array of vertex names. 

At any point the `mapVertex()` and `forEachVertex()` methods can be invoked to make use of the graph vertices. There are also methods on the vertices that can be used to recover pertinent information about them. For example, in what follows the topologically ordered predecessors of each vertex are recovered:

    directedAcyclicGraph.forEachVertex(function(vertex) {
      const vertexName = vertex.getName(),
            predecessorVertices = vertex.getPredecessorVertices();
    
      DirectedAcyclicGraph.orderVertices(predecessorVertices);
      
      ...
    
    });
    
Note that the predecessor vertices are effectively already sorted in that each carries a unique index that is indicative of the underlying topological ordering. All the static `sortVertices()` method of the `DirectedAcyclicGraph` class itself does is to sort the array that is returned according to this ordering.  

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

This implementation is based on the Peace-Kelly algorithm as given in the following paper:

http://homepages.ecs.vuw.ac.nz/~djp/files/PK-JEA07.pdf

## Contact

* jecs@imperial.ac.uk
* http://djalbat.com
