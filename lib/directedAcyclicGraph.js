'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var necessary = require('necessary');

var Edge = require('./edge'),
    Vertex = require('./vertex'),
    vertexUtilities = require('./utilities/vertex');

var arrayUtilities = necessary.arrayUtilities,
    last = arrayUtilities.last,
    vertexNamesFromVertices = vertexUtilities.vertexNamesFromVertices,
    topologicallyOrderVertices = vertexUtilities.topologicallyOrderVertices;

var DirectedAcyclicGraph = function () {
  function DirectedAcyclicGraph(vertexMap) {
    _classCallCheck(this, DirectedAcyclicGraph);

    this.vertexMap = vertexMap;
  }

  _createClass(DirectedAcyclicGraph, [{
    key: 'isEmpty',
    value: function isEmpty() {
      var vertices = this.getVertices(),
          verticesLength = vertices.length,
          empty = verticesLength === 0;

      return empty;
    }
  }, {
    key: 'getVertices',
    value: function getVertices() {
      var vertices = Object.values(this.vertexMap);

      return vertices;
    }
  }, {
    key: 'getVertexNames',
    value: function getVertexNames() {
      var vertexNames = Object.keys(this.vertexMap);

      return vertexNames;
    }
  }, {
    key: 'getVertexByVertexName',
    value: function getVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresentByVertexName(vertexName),
          vertex = vertexPresent ? this.vertexMap[vertexName] : null;

      return vertex;
    }
  }, {
    key: 'setVertexByVertexName',
    value: function setVertexByVertexName(vertexName, vertex) {
      this.vertexMap[vertexName] = vertex;
    }
  }, {
    key: 'unsetVertexByVertexName',
    value: function unsetVertexByVertexName(vertexName) {
      delete this.vertexMap[vertexName];
    }
  }, {
    key: 'isEdgePresent',
    value: function isEdgePresent(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);

      return edgePresent;
    }
  }, {
    key: 'isEdgePresentByVertexNames',
    value: function isEdgePresentByVertexNames(sourceVertexName, targetVertexName) {
      var edgePresent = false;

      var sourceVertex = this.getVertexByVertexName(sourceVertexName),
          targetVertex = this.getVertexByVertexName(targetVertexName),
          sourceVertexAndTargetVertexPresent = sourceVertex !== null && targetVertex !== null;

      if (sourceVertexAndTargetVertexPresent) {
        var targetVertexSourceVertexImmediateSuccessorVertex = sourceVertex.isVertexImmediateSuccessorVertex(targetVertex),
            sourceVertexTargetVertexImmediatePredecessorVertex = targetVertex.isVertexImmediatePredecessorVertex(sourceVertex);

        edgePresent = targetVertexSourceVertexImmediateSuccessorVertex && sourceVertexTargetVertexImmediatePredecessorVertex;
      }

      return edgePresent;
    }
  }, {
    key: 'isVertexPresentByVertexName',
    value: function isVertexPresentByVertexName(vertexName) {
      var vertexNames = this.getVertexNames(),
          vertexNamesIncludesVertexName = vertexNames.includes(vertexName),
          vertexPresent = vertexNamesIncludesVertexName; ///

      return vertexPresent;
    }
  }, {
    key: 'getPredecessorVertexNamesByVertexName',
    value: function getPredecessorVertexNamesByVertexName(vertexName) {
      var vertex = this.getVertexByVertexName(vertexName),
          predecessorVertexNames = vertex.getPredecessorVertexNames();

      return predecessorVertexNames;
    }
  }, {
    key: 'getSuccessorVertexNamesByVertexName',
    value: function getSuccessorVertexNamesByVertexName(vertexName) {
      var vertex = this.getVertexByVertexName(vertexName),
          successorVertexNames = vertex.getSuccessorVertexNames();

      return successorVertexNames;
    }
  }, {
    key: 'getTopologicallyOrderedVertexNames',
    value: function getTopologicallyOrderedVertexNames() {
      var vertices = this.getVertices();

      topologicallyOrderVertices(vertices);

      var topologicallyOrderedVertices = vertices,
          ///
      topologicallyOrderedVertexNames = vertexNamesFromVertices(topologicallyOrderedVertices);

      return topologicallyOrderedVertexNames;
    }
  }, {
    key: 'addEdge',
    value: function addEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          cyclicVertexNames = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);

      return cyclicVertexNames;
    }
  }, {
    key: 'removeEdge',
    value: function removeEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName();

      this.removeEdgeByVertexNames(sourceVertexName, targetVertexName);
    }
  }, {
    key: 'addEdgeByVertexNames',
    value: function addEdgeByVertexNames(sourceVertexName, targetVertexName) {
      var cyclicVertices = null;

      if (sourceVertexName === targetVertexName) {
        var cyclicVertexName = sourceVertexName,
            ///
        cyclicVertex = this.getVertexByVertexName(cyclicVertexName);

        cyclicVertices = [cyclicVertex];
      } else {
        var sourceVertex = this.addVertexByVertexName(sourceVertexName),
            targetVertex = this.addVertexByVertexName(targetVertexName),
            edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);

        if (!edgePresent) {
          var sourceVertexIndex = sourceVertex.getIndex(),
              targetVertexIndex = targetVertex.getIndex(),
              invalidatingEdge = sourceVertexIndex > targetVertexIndex;

          if (invalidatingEdge) {
            cyclicVertices = validateEdgeByVertices(sourceVertex, targetVertex);
          }

          var cycleMissing = cyclicVertices === null; ///

          if (cycleMissing) {
            var immediatePredecessorVertex = sourceVertex,
                ///
            immediateSuccessorVertex = targetVertex; ///

            immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

            immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
          }
        }
      }

      var cyclicVertexNames = cyclicVertices !== null ? vertexNamesFromVertices(cyclicVertices) : null;

      return cyclicVertexNames;
    }
  }, {
    key: 'removeEdgeByVertexNames',
    value: function removeEdgeByVertexNames(sourceVertexName, targetVertexName) {
      var edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);

      if (edgePresent) {
        var sourceVertex = this.getVertexByVertexName(sourceVertexName),
            targetVertex = this.getVertexByVertexName(targetVertexName);

        sourceVertex.removeImmediateSuccessorVertex(targetVertex);
        targetVertex.removeImmediatePredecessorVertex(sourceVertex);
      }
    }
  }, {
    key: 'removeEdgesBySourceVertexName',
    value: function removeEdgesBySourceVertexName(sourceVertexName) {
      var sourceVertexPresent = this.isVertexPresentByVertexName(sourceVertexName);

      if (sourceVertexPresent) {
        var sourceVertex = this.getVertexByVertexName(sourceVertexName);

        sourceVertex.removeOutgoingEdges();
      }
    }
  }, {
    key: 'removeEdgesByTargetVertexName',
    value: function removeEdgesByTargetVertexName(targetVertexName) {
      var targetVertexPresent = this.isVertexPresentByVertexName(targetVertexName);

      if (targetVertexPresent) {
        var targetVertex = this.getVertexByVertexName(targetVertexName);

        targetVertex.removeIncomingEdges();
      }
    }
  }, {
    key: 'addVertexByVertexName',
    value: function addVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresentByVertexName(vertexName);

      if (!vertexPresent) {
        var vertexNames = this.getVertexNames(),
            vertexNamesLength = vertexNames.length,
            name = vertexName,
            ///
        index = vertexNamesLength,
            ///
        _vertex = Vertex.fromNameAndIndex(name, index);

        this.setVertexByVertexName(vertexName, _vertex);
      }

      var vertex = this.getVertexByVertexName(vertexName);

      return vertex;
    }
  }, {
    key: 'removeVertexByVertexName',
    value: function removeVertexByVertexName(vertexName) {
      var removedEdges = null;

      var vertexPresent = this.isVertexPresentByVertexName(vertexName);

      if (vertexPresent) {
        removedEdges = [];

        var vertex = this.getVertexByVertexName(vertexName);

        vertex.forEachImmediateSuccessorVertex(function (immediateSuccessVertex) {
          var immediatePredecessorVertex = vertex,
              ///
          immediatePredecessorVertexName = immediatePredecessorVertex.getName(),
              immediateSuccessVertexName = immediateSuccessVertex.getName(),
              removedEdgeSourceVertexName = immediatePredecessorVertexName,
              ///
          removedEdgeTargetVertexName = immediateSuccessVertexName,
              ///
          removedEdge = new Edge(removedEdgeSourceVertexName, removedEdgeTargetVertexName);

          removedEdges.push(removedEdge);

          immediateSuccessVertex.removeImmediatePredecessorVertex(immediatePredecessorVertex);
        });

        vertex.forEachImmediatePredecessorVertex(function (immediatePredecessorVertex) {
          var immediateSuccessVertex = vertex,
              ///
          immediatePredecessorVertexName = immediatePredecessorVertex.getName(),
              immediateSuccessVertexName = immediateSuccessVertex.getName(),
              ///
          removedEdgeSourceVertexName = immediatePredecessorVertexName,
              ///
          removedEdgeTargetVertexName = immediateSuccessVertexName,
              ///
          removedEdge = new Edge(removedEdgeSourceVertexName, removedEdgeTargetVertexName);

          removedEdges.push(removedEdge);

          immediatePredecessorVertex.removeImmediateSuccessorVertex(immediateSuccessVertex);
        });

        this.unsetVertexByVertexName(vertexName);
      }

      return removedEdges;
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var vertexMap = {},
          directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);

      return directedAcyclicGraph;
    }
  }, {
    key: 'fromVertexNames',
    value: function fromVertexNames(vertexNames) {
      var vertexMap = vertexMapFromVertexNames(vertexNames);

      var directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);

      return directedAcyclicGraph;
    }
  }, {
    key: 'fromTopologicallyOrderedVertices',
    value: function fromTopologicallyOrderedVertices(topologicallyOrderedVertices) {
      var vertexMap = vertexMapFromTopologicallyOrderedVertices(topologicallyOrderedVertices);

      addEdgesToVertices(topologicallyOrderedVertices, vertexMap);

      var directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);

      return directedAcyclicGraph;
    }
  }]);

  return DirectedAcyclicGraph;
}();

module.exports = DirectedAcyclicGraph;

function validateEdgeByVertices(sourceVertex, targetVertex) {
  var cyclicVertices = null;

  var forwardsAffectedVertices = targetVertex.getForwardsAffectedVertices(sourceVertex),
      lastForwardsAffectedVertex = last(forwardsAffectedVertices),
      cyclePresent = lastForwardsAffectedVertex === sourceVertex;

  if (cyclePresent) {
    cyclicVertices = forwardsAffectedVertices;
  } else {
    var backwardsAffectedVertices = sourceVertex.getBackwardsAffectedVertices();

    topologicallyOrderVertices(backwardsAffectedVertices);

    topologicallyOrderVertices(forwardsAffectedVertices);

    var affectedVertices = [].concat(backwardsAffectedVertices).concat(forwardsAffectedVertices),
        affectedVertexIndices = affectedVertices.map(function (affectedVertex) {
      var affectedVertexIndex = affectedVertex.getIndex();

      return affectedVertexIndex;
    });

    affectedVertexIndices.sort();

    affectedVertices.forEach(function (affectedVertex, index) {
      var affectedVertexIndex = affectedVertexIndices[index];

      affectedVertex.setIndex(affectedVertexIndex);
    });
  }

  return cyclicVertices;
}

function vertexMapFromVertexNames(vertexNames) {
  var vertexMap = {};

  vertexNames.forEach(function (vertexName, index) {
    var name = vertexName,
        ///
    vertex = Vertex.fromNameAndIndex(name, index);

    vertexMap[vertexName] = vertex;
  });

  return vertexMap;
}

function vertexMapFromTopologicallyOrderedVertices(topologicallyOrderedVertices) {
  var vertexMap = {};

  topologicallyOrderedVertices.forEach(function (topologicallyOrderedVertex, index) {
    var name = topologicallyOrderedVertex.getName(),
        vertex = Vertex.fromNameAndIndex(name, index),
        vertexName = name; ///

    vertexMap[vertexName] = vertex;
  });

  return vertexMap;
}

function addEdgesToVertices(topologicallyOrderedVertices, vertexMap) {
  topologicallyOrderedVertices.forEach(function (topologicallyOrderedVertex) {
    topologicallyOrderedVertex.forEachOutgoingEdge(function (outgoingEdge) {
      var sourceVertexName = outgoingEdge.getSourceVertexName(),
          targetVertexName = outgoingEdge.getTargetVertexName(),
          immediatePredecessorVertexName = sourceVertexName,
          ///
      immediateSuccessorVertexName = targetVertexName,
          immediatePredecessorVertex = vertexMap[immediatePredecessorVertexName],
          ///
      immediateSuccessorVertex = vertexMap[immediateSuccessorVertexName]; ///

      immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

      immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsInZlcnRleFV0aWxpdGllcyIsImFycmF5VXRpbGl0aWVzIiwibGFzdCIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJEaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcCIsInZlcnRpY2VzIiwiZ2V0VmVydGljZXMiLCJ2ZXJ0aWNlc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwiT2JqZWN0IiwidmFsdWVzIiwidmVydGV4TmFtZXMiLCJrZXlzIiwidmVydGV4TmFtZSIsInZlcnRleFByZXNlbnQiLCJpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUiLCJ2ZXJ0ZXgiLCJlZGdlIiwic291cmNlVmVydGV4TmFtZSIsImdldFNvdXJjZVZlcnRleE5hbWUiLCJ0YXJnZXRWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXgiLCJnZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJ0YXJnZXRWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50IiwidGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJnZXRWZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lIiwiaW5jbHVkZXMiLCJwcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsInN1Y2Nlc3NvclZlcnRleE5hbWVzIiwiZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcyIsImN5Y2xpY1ZlcnRleE5hbWVzIiwiYWRkRWRnZUJ5VmVydGV4TmFtZXMiLCJyZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyIsImN5Y2xpY1ZlcnRpY2VzIiwiY3ljbGljVmVydGV4TmFtZSIsImN5Y2xpY1ZlcnRleCIsImFkZFZlcnRleEJ5VmVydGV4TmFtZSIsImlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCIsInNvdXJjZVZlcnRleEluZGV4IiwiZ2V0SW5kZXgiLCJ0YXJnZXRWZXJ0ZXhJbmRleCIsImludmFsaWRhdGluZ0VkZ2UiLCJ2YWxpZGF0ZUVkZ2VCeVZlcnRpY2VzIiwiY3ljbGVNaXNzaW5nIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJhZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJhZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4Iiwic291cmNlVmVydGV4UHJlc2VudCIsInJlbW92ZU91dGdvaW5nRWRnZXMiLCJ0YXJnZXRWZXJ0ZXhQcmVzZW50IiwicmVtb3ZlSW5jb21pbmdFZGdlcyIsInZlcnRleE5hbWVzTGVuZ3RoIiwibmFtZSIsImluZGV4IiwiZnJvbU5hbWVBbmRJbmRleCIsInNldFZlcnRleEJ5VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlcyIsImZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4IiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lIiwiZ2V0TmFtZSIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2UiLCJwdXNoIiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwidW5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJkaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyIsInZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwiYWRkRWRnZXNUb1ZlcnRpY2VzIiwibW9kdWxlIiwiZXhwb3J0cyIsImZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImdldEZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4IiwiY3ljbGVQcmVzZW50IiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJhZmZlY3RlZFZlcnRpY2VzIiwiY29uY2F0IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzIiwibWFwIiwiYWZmZWN0ZWRWZXJ0ZXgiLCJhZmZlY3RlZFZlcnRleEluZGV4Iiwic29ydCIsImZvckVhY2giLCJzZXRJbmRleCIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4IiwiZm9yRWFjaE91dGdvaW5nRWRnZSIsIm91dGdvaW5nRWRnZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZQyxRQUFRLFdBQVIsQ0FBbEI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNNRSxTQUFTRixRQUFRLFVBQVIsQ0FEZjtBQUFBLElBRU1HLGtCQUFrQkgsUUFBUSxvQkFBUixDQUZ4Qjs7QUFJTSxJQUFFSSxjQUFGLEdBQXFCTCxTQUFyQixDQUFFSyxjQUFGO0FBQUEsSUFDRUMsSUFERixHQUNVRCxjQURWLENBQ0VD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YixFQUR6QjtBQUFBLFVBRU1vRCxpQ0FBaUN2RCxnQkFGdkM7QUFBQSxVQUUwRDtBQUNwRHdGLHFDQUErQnRGLGdCQUhyQztBQUFBLFVBSU1tQyw2QkFBNkJwRCxVQUFVc0UsOEJBQVYsQ0FKbkM7QUFBQSxVQUk4RTtBQUN4RWpCLGlDQUEyQnJELFVBQVV1Ryw0QkFBVixDQUxqQyxDQURvRSxDQU1NOztBQUUxRW5ELGlDQUEyQkUsMkJBQTNCLENBQXVERCx3QkFBdkQ7O0FBRUFBLCtCQUF5QkUsNkJBQXpCLENBQXVESCwwQkFBdkQ7QUFDRCxLQVhEO0FBWUQsR0FiRDtBQWNEIiwiZmlsZSI6ImRpcmVjdGVkQWN5Y2xpY0dyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgRWRnZSA9IHJlcXVpcmUoJy4vZWRnZScpLFxuICAgICAgVmVydGV4ID0gcmVxdWlyZSgnLi92ZXJ0ZXgnKSxcbiAgICAgIHZlcnRleFV0aWxpdGllcyA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL3ZlcnRleCcpO1xuXG5jb25zdCB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IGxhc3R9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzLCB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyB9ID0gdmVydGV4VXRpbGl0aWVzO1xuXG5jbGFzcyBEaXJlY3RlZEFjeWNsaWNHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleE1hcCkge1xuICAgIHRoaXMudmVydGV4TWFwID0gdmVydGV4TWFwO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKSxcbiAgICAgICAgdmVydGljZXNMZW5ndGggPSB2ZXJ0aWNlcy5sZW5ndGgsXG4gICAgICAgIGVtcHR5ID0gKHZlcnRpY2VzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGdldFZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gdmVydGljZXM7XG4gIH1cblxuICBnZXRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKTtcblxuICAgIHJldHVybiB2ZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleCA9IHZlcnRleFByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gOlxuICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIHNldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lLCB2ZXJ0ZXgpIHtcbiAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfVxuXG4gIHVuc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50KGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gdGhpcy5pc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgICBcbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IGVkZ2VQcmVzZW50ID0gZmFsc2U7XG5cbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgIHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQgPSAoc291cmNlVmVydGV4ICE9PSBudWxsKSAmJiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXguaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KSxcbiAgICAgICAgICBzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleC5pc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCk7XG5cbiAgICAgIGVkZ2VQcmVzZW50ID0gKHRhcmdldFZlcnRleFNvdXJjZVZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCAmJiBzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IHRoaXMuZ2V0VmVydGV4TmFtZXMoKSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZSA9IHZlcnRleE5hbWVzLmluY2x1ZGVzKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleFByZXNlbnQgPSB2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZTsgIC8vL1xuXG4gICAgcmV0dXJuIHZlcnRleFByZXNlbnQ7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldFN1Y2Nlc3NvclZlcnRleE5hbWVzKCk7XG4gICAgXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHZlcnRpY2VzKTtcblxuICAgIGNvbnN0IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMgPSB2ZXJ0aWNlcywgLy8vXG4gICAgICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcyA9IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXM7XG4gIH1cblxuICBhZGRFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGN5Y2xpY1ZlcnRleE5hbWVzID0gdGhpcy5hZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIHJlbW92ZUVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCk7XG5cbiAgICB0aGlzLnJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICB9XG5cbiAgYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBpZiAoc291cmNlVmVydGV4TmFtZSA9PT0gdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgICAgY29uc3QgY3ljbGljVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGN5Y2xpY1ZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKGN5Y2xpY1ZlcnRleE5hbWUpO1xuXG4gICAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gW2N5Y2xpY1ZlcnRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcblxuICAgICAgaWYgKCFlZGdlUHJlc2VudCkge1xuICAgICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbmRleCA9IHNvdXJjZVZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICB0YXJnZXRWZXJ0ZXhJbmRleCA9IHRhcmdldFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICBpbnZhbGlkYXRpbmdFZGdlID0gKHNvdXJjZVZlcnRleEluZGV4ID4gdGFyZ2V0VmVydGV4SW5kZXgpO1xuXG4gICAgICAgIGlmIChpbnZhbGlkYXRpbmdFZGdlKSB7XG4gICAgICAgICAgY3ljbGljVmVydGljZXMgPSB2YWxpZGF0ZUVkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN5Y2xlTWlzc2luZyA9IChjeWNsaWNWZXJ0aWNlcyA9PT0gbnVsbCk7IC8vL1xuXG4gICAgICAgIGlmIChjeWNsZU1pc3NpbmcpIHtcbiAgICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleCwgLy8vXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4OyAvLy9cblxuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBjeWNsaWNWZXJ0ZXhOYW1lcyA9IChjeWNsaWNWZXJ0aWNlcyAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyhjeWNsaWNWZXJ0aWNlcykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZXM7XG4gIH1cblxuICByZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgc291cmNlVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRWRnZXNCeVNvdXJjZVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcblxuICAgICAgc291cmNlVmVydGV4LnJlbW92ZU91dGdvaW5nRWRnZXMoKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVFZGdlc0J5VGFyZ2V0VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdGFyZ2V0VmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHRhcmdldFZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW5jb21pbmdFZGdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKCF2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IHRoaXMuZ2V0VmVydGV4TmFtZXMoKSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lc0xlbmd0aCA9IHZlcnRleE5hbWVzLmxlbmd0aCxcbiAgICAgICAgICBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgIGluZGV4ID0gdmVydGV4TmFtZXNMZW5ndGgsIC8vL1xuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgICAgdGhpcy5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSwgdmVydGV4KTtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICByZW1vdmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGxldCByZW1vdmVkRWRnZXMgPSBudWxsO1xuXG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHZlcnRleFByZXNlbnQpIHtcbiAgICAgIHJlbW92ZWRFZGdlcyA9IFtdO1xuXG4gICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCkge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksICAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudW5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZWRFZGdlcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fSxcbiAgICAgICAgICBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKTtcblxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpO1xuICAgIFxuICAgIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0ZWRBY3ljbGljR3JhcGg7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpIHtcbiAgbGV0IGN5Y2xpY1ZlcnRpY2VzID0gbnVsbDtcblxuICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0YXJnZXRWZXJ0ZXguZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCksXG4gICAgICAgIGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID0gbGFzdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICBjeWNsZVByZXNlbnQgPSAobGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPT09IHNvdXJjZVZlcnRleCk7XG5cbiAgaWYgKGN5Y2xlUHJlc2VudCkge1xuICAgIGN5Y2xpY1ZlcnRpY2VzID0gZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMgPSBzb3VyY2VWZXJ0ZXguZ2V0QmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcygpO1xuXG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgY29uc3QgYWZmZWN0ZWRWZXJ0aWNlcyA9IFtdLmNvbmNhdChiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKS5jb25jYXQoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgICBhZmZlY3RlZFZlcnRleEluZGljZXMgPSBhZmZlY3RlZFZlcnRpY2VzLm1hcChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCkge1xuICAgICAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4LmdldEluZGV4KCk7XG5cbiAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRleEluZGV4O1xuICAgICAgICAgIH0pO1xuXG4gICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzLnNvcnQoKTtcblxuICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCwgaW5kZXgpIHtcbiAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleEluZGljZXNbaW5kZXhdO1xuXG4gICAgICBhZmZlY3RlZFZlcnRleC5zZXRJbmRleChhZmZlY3RlZFZlcnRleEluZGV4KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBjeWNsaWNWZXJ0aWNlcztcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbih2ZXJ0ZXhOYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcbiAgXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCksXG4gICAgICAgICAgdmVydGV4TmFtZSA9IG5hbWU7ICAvLy9cblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCkge1xuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgpIHtcbiAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5mb3JFYWNoT3V0Z29pbmdFZGdlKGZ1bmN0aW9uKG91dGdvaW5nRWRnZSkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXhOYW1lLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSwgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZV07IC8vL1xuXG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=