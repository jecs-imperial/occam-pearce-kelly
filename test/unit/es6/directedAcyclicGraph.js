'use strict';

const chai = require('chai');

const DirectedAcyclicGraph = require('../../../es6/directedAcyclicGraph');

const { assert } = chai;

describe('es6/common/DirectedAcyclicGraph', function() {
  describe('#fromTopologicallyOrderedVertices', function() {
    describe('given an empty list of topologically sorted vertices', function() {
      const topologicallyOrderedVertices = [];

      xit('Returns an instance of the DirectedAcyclicGraph class', function() {
        const directedAcyclicGraph = DirectedAcyclicGraph.fromTopologicallyOrderedVertices(topologicallyOrderedVertices);

        assert.instanceOf(directedAcyclicGraph, DirectedAcyclicGraph);
      });
    });

    describe('given a list of topologically sorted vertices', function() {
      const vertexLiterals = [

          
        [ 5, [ 4, 2 ]],
        [ 4, [ 3 ] ],
        [ 3, [ 1 ] ]
          
      ];

      it('Returns a directed acyclic graph with the requisite sorted vertices', function() {
        const directedAcyclicGraph = DirectedAcyclicGraph.fromTopologicallyOrderedVertices(topologicallyOrderedVertices);

        assert.instanceOf(directedAcyclicGraph, DirectedAcyclicGraph);
      });
    });
  });
});
