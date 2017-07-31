'use strict';

const chai = require('chai');

const kahn = require('occam-kahn');

const DirectedAcyclicGraph = require('../../../es6/directedAcyclicGraph');

const { assert } = chai,
      { Graph } = kahn;

describe('es6/common/DirectedAcyclicGraph', function() {
  describe('#fromTopologicallyOrderedVertices', function() {
    describe('given an empty list of topologically sorted vertices', function() {
      const topologicallyOrderedVertices = [];

      it('Returns an instance of the DirectedAcyclicGraph class', function() {
        const directedAcyclicGraph = DirectedAcyclicGraph.fromTopologicallyOrderedVertices(topologicallyOrderedVertices);

        assert.instanceOf(directedAcyclicGraph, DirectedAcyclicGraph);
      });
    });

    describe('given a list of topologically sorted vertices', function() {
      const vertexLiterals = [

              [ 5, [ 4, 2 ]],
              [ 4, [ 3 ] ],
              [ 3, [ 1 ] ]

            ],
            graph = Graph.fromVertexLiterals(vertexLiterals),
            topologicallyOrderedVertices = graph.getTopologicallyOrderedVertices();

      it('Returns a directed acyclic graph with the requisite sorted vertices', function() {
        const directedAcyclicGraph = DirectedAcyclicGraph.fromTopologicallyOrderedVertices(topologicallyOrderedVertices);

        assert.instanceOf(directedAcyclicGraph, DirectedAcyclicGraph);
      });
    });
  });
});
