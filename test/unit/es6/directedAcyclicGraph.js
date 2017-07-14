'use strict';

const chai = require('chai');

const DirectedAcyclicGraph = require('../../../es6/directedAcyclicGraph');

const { assert } = chai;

describe('es6/common/DirectedAcyclicGraph', function() {
  describe('#fromTopologicallySortedVertices', function() {
    describe('given an empty list of topologically sorted vertices', function() {
      const topologicallySortedVertices = [];

      xit('Returns an instance of the DirectedAcyclicGraph class', function() {
        const directedAcyclicGraph = DirectedAcyclicGraph.fromTopologicallySortedVertices(topologicallySortedVertices);

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
        const directedAcyclicGraph = DirectedAcyclicGraph.fromTopologicallySortedVertices(topologicallySortedVertices);

        assert.instanceOf(directedAcyclicGraph, DirectedAcyclicGraph);
      });
    });
  });
});
