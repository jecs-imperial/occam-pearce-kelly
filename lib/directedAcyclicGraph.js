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
      var vertexMapValues = Object.values(this.vertexMap),
          vertices = vertexMapValues; ///

      return vertices;
    }
  }, {
    key: 'getVertexNames',
    value: function getVertexNames() {
      var vertexMapKeys = Object.keys(this.vertexMap),
          vertexNames = vertexMapKeys; ///

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
    key: 'getEdgesByTargetVertexName',
    value: function getEdgesByTargetVertexName(targetVertexName) {
      var edges = [],
          targetVertex = this.getVertexByVertexName(targetVertexName);

      if (targetVertex !== null) {
        var immediatePredecessorVertexNames = targetVertex.getImmediatePredecessorVertexNames(),
            sourceVertexNames = immediatePredecessorVertexNames; ///

        sourceVertexNames.forEach(function (sourceVertexName) {
          var edge = Edge.fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);

          edges.push(edge);
        });
      }

      return edges;
    }
  }, {
    key: 'getEdgesBySourceVertexName',
    value: function getEdgesBySourceVertexName(sourceVertexName) {
      var edges = [],
          sourceVertex = this.getVertexByVertexName(sourceVertexName);

      if (sourceVertex !== null) {
        var immediateSuccessorVertexNames = sourceVertex.getImmediateSuccessorVertexNames(),
            targetVertexNames = immediateSuccessorVertexNames; ///

        targetVertexNames.forEach(function (targetVertexName) {
          var edge = Edge.fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);

          edges.push(edge);
        });
      }

      return edges;
    }
  }, {
    key: 'setVertexByVertexName',
    value: function setVertexByVertexName(vertexName, vertex) {
      this.vertexMap[vertexName] = vertex;
    }
  }, {
    key: 'deleteVertexByVertexName',
    value: function deleteVertexByVertexName(vertexName) {
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
        edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);
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
          success = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);

      return success;
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
      var success = false;

      if (sourceVertexName !== targetVertexName) {
        var sourceVertex = this.addVertexByVertexName(sourceVertexName),
            targetVertex = this.addVertexByVertexName(targetVertexName),
            edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);

        if (edgePresent) {
          success = true;
        } else {
          var sourceVertexIndex = sourceVertex.getIndex(),
              targetVertexIndex = targetVertex.getIndex(),
              invalidatingEdge = sourceVertexIndex > targetVertexIndex;

          success = invalidatingEdge ? addInvalidatingEdgeByVertices(sourceVertex, targetVertex) : true;

          if (success) {
            var immediatePredecessorVertex = sourceVertex,
                ///
            immediateSuccessorVertex = targetVertex; ///

            immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

            immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
          }
        }
      }

      return success;
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

        this.deleteVertexByVertexName(vertexName);

        var deletedVertex = vertex,
            ///
        deletedVertexIndex = deletedVertex.getIndex(),
            vertices = this.getVertices(),
            affectedVertices = vertices.reduce(function (affectedVertices, vertex) {
          var vertexIndex = vertex.getIndex(),
              vertexAffected = vertexIndex > deletedVertexIndex;

          if (vertexAffected) {
            var affectedVertex = vertex; ///

            affectedVertices.push(affectedVertex);
          }

          return affectedVertices;
        }, []);

        affectedVertices.forEach(function (affectedVertex) {
          affectedVertex.decrementIndex();
        });
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

function addInvalidatingEdgeByVertices(sourceVertex, targetVertex) {
  var success = false;

  var forwardsAffectedVertices = targetVertex.retrieveForwardsAffectedVertices(sourceVertex),
      lastForwardsAffectedVertex = last(forwardsAffectedVertices),
      resultsInCycle = lastForwardsAffectedVertex === sourceVertex;

  if (!resultsInCycle) {
    var backwardsAffectedVertices = sourceVertex.retrieveBackwardsAffectedVertices();

    topologicallyOrderVertices(backwardsAffectedVertices);

    topologicallyOrderVertices(forwardsAffectedVertices);

    var affectedVertices = [].concat(backwardsAffectedVertices).concat(forwardsAffectedVertices),
        affectedVertexIndices = affectedVertices.map(function (affectedVertex) {
      var affectedVertexIndex = affectedVertex.getIndex();

      return affectedVertexIndex;
    });

    affectedVertexIndices.sort(function (indexA, indexB) {
      return indexA - indexB;
    });

    affectedVertices.forEach(function (affectedVertex, index) {
      var affectedVertexIndex = affectedVertexIndices[index];

      affectedVertex.setIndex(affectedVertexIndex);
    });

    success = true;
  }

  return success;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsInZlcnRleFV0aWxpdGllcyIsImFycmF5VXRpbGl0aWVzIiwibGFzdCIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJEaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcCIsInZlcnRpY2VzIiwiZ2V0VmVydGljZXMiLCJ2ZXJ0aWNlc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwidmVydGV4TWFwVmFsdWVzIiwiT2JqZWN0IiwidmFsdWVzIiwidmVydGV4TWFwS2V5cyIsImtleXMiLCJ2ZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWUiLCJ2ZXJ0ZXhQcmVzZW50IiwiaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lIiwidmVydGV4IiwiZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lIiwicHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsImdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJzdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsImdldFN1Y2Nlc3NvclZlcnRleE5hbWVzIiwidGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VzIiwidGFyZ2V0VmVydGV4IiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsImdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXhOYW1lcyIsImZvckVhY2giLCJzb3VyY2VWZXJ0ZXhOYW1lIiwiZWRnZSIsImZyb21Tb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZSIsInB1c2giLCJzb3VyY2VWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsImdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzIiwidGFyZ2V0VmVydGV4TmFtZXMiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4IiwiZ2V0VmVydGV4TmFtZXMiLCJ2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZSIsImluY2x1ZGVzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMiLCJzdWNjZXNzIiwiYWRkRWRnZUJ5VmVydGV4TmFtZXMiLCJyZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyIsImFkZFZlcnRleEJ5VmVydGV4TmFtZSIsInNvdXJjZVZlcnRleEluZGV4IiwiZ2V0SW5kZXgiLCJ0YXJnZXRWZXJ0ZXhJbmRleCIsImludmFsaWRhdGluZ0VkZ2UiLCJhZGRJbnZhbGlkYXRpbmdFZGdlQnlWZXJ0aWNlcyIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleFByZXNlbnQiLCJyZW1vdmVPdXRnb2luZ0VkZ2VzIiwidGFyZ2V0VmVydGV4UHJlc2VudCIsInJlbW92ZUluY29taW5nRWRnZXMiLCJ2ZXJ0ZXhOYW1lc0xlbmd0aCIsIm5hbWUiLCJpbmRleCIsImZyb21OYW1lQW5kSW5kZXgiLCJzZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZXMiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlIiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lIiwiZGVsZXRlZFZlcnRleCIsImRlbGV0ZWRWZXJ0ZXhJbmRleCIsImFmZmVjdGVkVmVydGljZXMiLCJyZWR1Y2UiLCJ2ZXJ0ZXhJbmRleCIsInZlcnRleEFmZmVjdGVkIiwiYWZmZWN0ZWRWZXJ0ZXgiLCJkZWNyZW1lbnRJbmRleCIsImRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwRnJvbVZlcnRleE5hbWVzIiwidmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJhZGRFZGdlc1RvVmVydGljZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwicmV0cmlldmVGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCIsInJlc3VsdHNJbkN5Y2xlIiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsInJldHJpZXZlQmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImNvbmNhdCIsImFmZmVjdGVkVmVydGV4SW5kaWNlcyIsIm1hcCIsImFmZmVjdGVkVmVydGV4SW5kZXgiLCJzb3J0IiwiaW5kZXhBIiwiaW5kZXhCIiwic2V0SW5kZXgiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCIsImZvckVhY2hPdXRnb2luZ0VkZ2UiLCJvdXRnb2luZ0VkZ2UiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWUMsUUFBUSxXQUFSLENBQWxCOztBQUVBLElBQU1DLE9BQU9ELFFBQVEsUUFBUixDQUFi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LFVBQVYsSUFBd0JHLE1BQXhCO0FBQ0QsR0FORDs7QUFRQSxTQUFPZixTQUFQO0FBQ0Q7O0FBRUQsU0FBUzZGLGtCQUFULENBQTRCaEQsNEJBQTVCLEVBQTBEN0MsU0FBMUQsRUFBcUU7QUFDbkU2QywrQkFBNkJsQixPQUE3QixDQUFxQyxVQUFTbUYsMEJBQVQsRUFBcUM7QUFDeEVBLCtCQUEyQkMsbUJBQTNCLENBQStDLFVBQVNDLFlBQVQsRUFBdUI7QUFDcEUsVUFBTXBGLG1CQUFtQm9GLGFBQWE1RSxtQkFBYixFQUF6QjtBQUFBLFVBQ01mLG1CQUFtQjJGLGFBQWEzRSxtQkFBYixFQUR6QjtBQUFBLFVBRU1xQyxpQ0FBaUM5QyxnQkFGdkM7QUFBQSxVQUUwRDtBQUNwRHFGLHFDQUErQjVGLGdCQUhyQztBQUFBLFVBSU1tQyw2QkFBNkJ4RCxVQUFVMEUsOEJBQVYsQ0FKbkM7QUFBQSxVQUk4RTtBQUN4RWpCLGlDQUEyQnpELFVBQVVpSCw0QkFBVixDQUxqQyxDQURvRSxDQU1NOztBQUUxRXpELGlDQUEyQkUsMkJBQTNCLENBQXVERCx3QkFBdkQ7O0FBRUFBLCtCQUF5QkUsNkJBQXpCLENBQXVESCwwQkFBdkQ7QUFDRCxLQVhEO0FBWUQsR0FiRDtBQWNEIiwiZmlsZSI6ImRpcmVjdGVkQWN5Y2xpY0dyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgRWRnZSA9IHJlcXVpcmUoJy4vZWRnZScpLFxuICAgICAgVmVydGV4ID0gcmVxdWlyZSgnLi92ZXJ0ZXgnKSxcbiAgICAgIHZlcnRleFV0aWxpdGllcyA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL3ZlcnRleCcpO1xuXG5jb25zdCB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IGxhc3QgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcywgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMgfSA9IHZlcnRleFV0aWxpdGllcztcblxuY2xhc3MgRGlyZWN0ZWRBY3ljbGljR3JhcGgge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhNYXApIHtcbiAgICB0aGlzLnZlcnRleE1hcCA9IHZlcnRleE1hcDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgICAgdmVydGljZXNMZW5ndGggPSB2ZXJ0aWNlcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAodmVydGljZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgZ2V0VmVydGljZXMoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwVmFsdWVzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgdmVydGljZXMgPSB2ZXJ0ZXhNYXBWYWx1ZXM7IC8vL1xuXG4gICAgcmV0dXJuIHZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0VmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lcyA9IHZlcnRleE1hcEtleXM7ICAvLy9cblxuICAgIHJldHVybiB2ZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleCA9IHZlcnRleFByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gOlxuICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXguZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRTdWNjZXNzb3JWZXJ0ZXhOYW1lc0J5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXguZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMoKTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldEVkZ2VzQnlUYXJnZXRWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlcyA9IFtdLFxuICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHRhcmdldFZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHRhcmdldFZlcnRleC5nZXRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzKCksXG4gICAgICAgICAgICBzb3VyY2VWZXJ0ZXhOYW1lcyA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXM7ICAvLy9cblxuICAgICAgc291cmNlVmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSBFZGdlLmZyb21Tb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICBlZGdlcy5wdXNoKGVkZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VzO1xuICB9XG5cbiAgZ2V0RWRnZXNCeVNvdXJjZVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSkge1xuICAgIGNvbnN0IGVkZ2VzID0gW10sXG4gICAgICAgICAgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHNvdXJjZVZlcnRleC5nZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZXMgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lczsgIC8vL1xuXG4gICAgICB0YXJnZXRWZXJ0ZXhOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICAgICAgY29uc3QgZWRnZSA9IEVkZ2UuZnJvbVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIGVkZ2VzLnB1c2goZWRnZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBzZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSwgdmVydGV4KSB7XG4gICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH1cblxuICBkZWxldGVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnQoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICAgIFxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgZWRnZVByZXNlbnQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgIHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQgPSAoc291cmNlVmVydGV4ICE9PSBudWxsKSAmJiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgIHZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lID0gdmVydGV4TmFtZXMuaW5jbHVkZXModmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4UHJlc2VudCA9IHZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdmVydGV4UHJlc2VudDtcbiAgfVxuXG4gIGdldFRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyh2ZXJ0aWNlcyk7XG5cbiAgICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzID0gdmVydGljZXMsIC8vL1xuICAgICAgICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMgPSB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKTtcblxuICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzO1xuICB9XG5cbiAgYWRkRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBzdWNjZXNzID0gdGhpcy5hZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKTtcblxuICAgIHRoaXMucmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gIH1cblxuICBhZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhOYW1lICE9PSB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXguaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICBcbiAgICAgIGlmIChlZGdlUHJlc2VudCkge1xuICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZVZlcnRleEluZGV4ID0gc291cmNlVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIHRhcmdldFZlcnRleEluZGV4ID0gdGFyZ2V0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIGludmFsaWRhdGluZ0VkZ2UgPSAoc291cmNlVmVydGV4SW5kZXggPiB0YXJnZXRWZXJ0ZXhJbmRleCk7XG5cbiAgICAgICAgc3VjY2VzcyA9IGludmFsaWRhdGluZ0VkZ2UgP1xuICAgICAgICAgICAgICAgICAgICBhZGRJbnZhbGlkYXRpbmdFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkgOlxuICAgICAgICAgICAgICAgICAgICAgIHRydWU7XG5cbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleCwgLy8vXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4OyAvLy9cblxuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAoZWRnZVByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlTb3VyY2VWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVPdXRnb2luZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRWRnZXNCeVRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHRhcmdldFZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh0YXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUluY29taW5nRWRnZXMoKTtcbiAgICB9XG4gIH1cblxuICBhZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICghdmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdmVydGV4TmFtZXMgPSB0aGlzLmdldFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgICB2ZXJ0ZXhOYW1lc0xlbmd0aCA9IHZlcnRleE5hbWVzLmxlbmd0aCxcbiAgICAgICAgICAgIG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbmRleCA9IHZlcnRleE5hbWVzTGVuZ3RoLCAvLy9cbiAgICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgICAgdGhpcy5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSwgdmVydGV4KTtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICByZW1vdmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGxldCByZW1vdmVkRWRnZXMgPSBudWxsO1xuXG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHZlcnRleFByZXNlbnQpIHtcbiAgICAgIHJlbW92ZWRFZGdlcyA9IFtdO1xuXG4gICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCkge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksICAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgICBjb25zdCBkZWxldGVkVmVydGV4ID0gdmVydGV4LCAvLy9cbiAgICAgICAgICAgIGRlbGV0ZWRWZXJ0ZXhJbmRleCA9IGRlbGV0ZWRWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgIHZlcnRpY2VzID0gdGhpcy5nZXRWZXJ0aWNlcygpLFxuICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0aWNlcyA9IHZlcnRpY2VzLnJlZHVjZShmdW5jdGlvbihhZmZlY3RlZFZlcnRpY2VzLCB2ZXJ0ZXgpIHtcbiAgICAgICAgICAgICAgY29uc3QgdmVydGV4SW5kZXggPSB2ZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QWZmZWN0ZWQgPSAodmVydGV4SW5kZXggPiBkZWxldGVkVmVydGV4SW5kZXgpO1xuXG4gICAgICAgICAgICAgIGlmICh2ZXJ0ZXhBZmZlY3RlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4ID0gdmVydGV4OyAgLy8vXG5cbiAgICAgICAgICAgICAgICBhZmZlY3RlZFZlcnRpY2VzLnB1c2goYWZmZWN0ZWRWZXJ0ZXgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGljZXM7XG4gICAgICAgICAgICB9LCBbXSk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCkge1xuICAgICAgICBhZmZlY3RlZFZlcnRleC5kZWNyZW1lbnRJbmRleCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZWRFZGdlcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fSxcbiAgICAgICAgICBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKTtcblxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpO1xuICAgIFxuICAgIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0ZWRBY3ljbGljR3JhcGg7XG5cbmZ1bmN0aW9uIGFkZEludmFsaWRhdGluZ0VkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KSB7XG4gIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGFyZ2V0VmVydGV4LnJldHJpZXZlRm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCksXG4gICAgICAgIGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID0gbGFzdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICByZXN1bHRzSW5DeWNsZSA9IChsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9PT0gc291cmNlVmVydGV4KTtcblxuICBpZiAoIXJlc3VsdHNJbkN5Y2xlKSB7XG4gICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHNvdXJjZVZlcnRleC5yZXRyaWV2ZUJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgIGNvbnN0IGFmZmVjdGVkVmVydGljZXMgPSBbXS5jb25jYXQoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcykuY29uY2F0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzID0gYWZmZWN0ZWRWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleC5nZXRJbmRleCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gYWZmZWN0ZWRWZXJ0ZXhJbmRleDtcbiAgICAgICAgICB9KTtcblxuICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcy5zb3J0KChpbmRleEEsIGluZGV4QikgPT4gKGluZGV4QSAtIGluZGV4QikpO1xuXG4gICAgYWZmZWN0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4LCBpbmRleCkge1xuICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4SW5kaWNlc1tpbmRleF07XG5cbiAgICAgIGFmZmVjdGVkVmVydGV4LnNldEluZGV4KGFmZmVjdGVkVmVydGV4SW5kZXgpO1xuICAgIH0pO1xuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gc3VjY2Vzcztcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbih2ZXJ0ZXhOYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcbiAgXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCksXG4gICAgICAgICAgdmVydGV4TmFtZSA9IG5hbWU7ICAvLy9cblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCkge1xuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgpIHtcbiAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5mb3JFYWNoT3V0Z29pbmdFZGdlKGZ1bmN0aW9uKG91dGdvaW5nRWRnZSkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXhOYW1lLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSwgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZV07IC8vL1xuXG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=