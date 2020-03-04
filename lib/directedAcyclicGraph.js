'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var necessary = require('necessary');

var Edge = require('./edge'),
    Vertex = require('./vertex'),
    vertexUtilities = require('./utilities/vertex');

var arrayUtilities = necessary.arrayUtilities,
    last = arrayUtilities.last,
    vertexNamesFromVertices = vertexUtilities.vertexNamesFromVertices,
    topologicallyOrderVertices = vertexUtilities.topologicallyOrderVertices;

var DirectedAcyclicGraph = /*#__PURE__*/function () {
  function DirectedAcyclicGraph(vertexMap) {
    _classCallCheck(this, DirectedAcyclicGraph);

    this.vertexMap = vertexMap;
  }

  _createClass(DirectedAcyclicGraph, [{
    key: "isEmpty",
    value: function isEmpty() {
      var vertices = this.getVertices(),
          verticesLength = vertices.length,
          empty = verticesLength === 0;
      return empty;
    }
  }, {
    key: "getVertices",
    value: function getVertices() {
      var vertexMapValues = Object.values(this.vertexMap),
          vertices = vertexMapValues; ///

      return vertices;
    }
  }, {
    key: "getVertexNames",
    value: function getVertexNames() {
      var vertexMapKeys = Object.keys(this.vertexMap),
          vertexNames = vertexMapKeys; ///

      return vertexNames;
    }
  }, {
    key: "getVertexByVertexName",
    value: function getVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresentByVertexName(vertexName),
          vertex = vertexPresent ? this.vertexMap[vertexName] : null;
      return vertex;
    }
  }, {
    key: "getPredecessorVertexNamesByVertexName",
    value: function getPredecessorVertexNamesByVertexName(vertexName) {
      var vertex = this.getVertexByVertexName(vertexName),
          predecessorVertexNames = vertex.getPredecessorVertexNames();
      return predecessorVertexNames;
    }
  }, {
    key: "getSuccessorVertexNamesByVertexName",
    value: function getSuccessorVertexNamesByVertexName(vertexName) {
      var vertex = this.getVertexByVertexName(vertexName),
          successorVertexNames = vertex.getSuccessorVertexNames();
      return successorVertexNames;
    }
  }, {
    key: "getEdgesByTargetVertexName",
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
    key: "getEdgesBySourceVertexName",
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
    key: "setVertexByVertexName",
    value: function setVertexByVertexName(vertexName, vertex) {
      this.vertexMap[vertexName] = vertex;
    }
  }, {
    key: "deleteVertexByVertexName",
    value: function deleteVertexByVertexName(vertexName) {
      delete this.vertexMap[vertexName];
    }
  }, {
    key: "isEdgePresent",
    value: function isEdgePresent(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);
      return edgePresent;
    }
  }, {
    key: "isEdgePresentByVertexNames",
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
    key: "isVertexPresentByVertexName",
    value: function isVertexPresentByVertexName(vertexName) {
      var vertexNames = this.getVertexNames(),
          vertexNamesIncludesVertexName = vertexNames.includes(vertexName),
          vertexPresent = vertexNamesIncludesVertexName; ///

      return vertexPresent;
    }
  }, {
    key: "getTopologicallyOrderedVertexNames",
    value: function getTopologicallyOrderedVertexNames() {
      var vertices = this.getVertices();
      topologicallyOrderVertices(vertices);
      var topologicallyOrderedVertices = vertices,
          ///
      topologicallyOrderedVertexNames = vertexNamesFromVertices(topologicallyOrderedVertices);
      return topologicallyOrderedVertexNames;
    }
  }, {
    key: "addEdge",
    value: function addEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          success = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);
      return success;
    }
  }, {
    key: "removeEdge",
    value: function removeEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName();
      this.removeEdgeByVertexNames(sourceVertexName, targetVertexName);
    }
  }, {
    key: "addEdgeByVertexNames",
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
    key: "removeEdgeByVertexNames",
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
    key: "removeEdgesBySourceVertexName",
    value: function removeEdgesBySourceVertexName(sourceVertexName) {
      var sourceVertexPresent = this.isVertexPresentByVertexName(sourceVertexName);

      if (sourceVertexPresent) {
        var sourceVertex = this.getVertexByVertexName(sourceVertexName);
        sourceVertex.removeOutgoingEdges();
      }
    }
  }, {
    key: "removeEdgesByTargetVertexName",
    value: function removeEdgesByTargetVertexName(targetVertexName) {
      var targetVertexPresent = this.isVertexPresentByVertexName(targetVertexName);

      if (targetVertexPresent) {
        var targetVertex = this.getVertexByVertexName(targetVertexName);
        targetVertex.removeIncomingEdges();
      }
    }
  }, {
    key: "addVertexByVertexName",
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
    key: "removeVertexByVertexName",
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
    key: "fromNothing",
    value: function fromNothing() {
      var vertexMap = {},
          directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);
      return directedAcyclicGraph;
    }
  }, {
    key: "fromVertexNames",
    value: function fromVertexNames(vertexNames) {
      var vertexMap = vertexMapFromVertexNames(vertexNames);
      var directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);
      return directedAcyclicGraph;
    }
  }, {
    key: "fromTopologicallyOrderedVertices",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGVkQWN5Y2xpY0dyYXBoLmpzIl0sIm5hbWVzIjpbIm5lY2Vzc2FyeSIsInJlcXVpcmUiLCJFZGdlIiwiVmVydGV4IiwidmVydGV4VXRpbGl0aWVzIiwiYXJyYXlVdGlsaXRpZXMiLCJsYXN0IiwidmVydGV4TmFtZXNGcm9tVmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGljZXMiLCJnZXRWZXJ0aWNlcyIsInZlcnRpY2VzTGVuZ3RoIiwibGVuZ3RoIiwiZW1wdHkiLCJ2ZXJ0ZXhNYXBWYWx1ZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2ZXJ0ZXhNYXBLZXlzIiwia2V5cyIsInZlcnRleE5hbWVzIiwidmVydGV4TmFtZSIsInZlcnRleFByZXNlbnQiLCJpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUiLCJ2ZXJ0ZXgiLCJnZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJwcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsInN1Y2Nlc3NvclZlcnRleE5hbWVzIiwiZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMiLCJ0YXJnZXRWZXJ0ZXhOYW1lIiwiZWRnZXMiLCJ0YXJnZXRWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsInNvdXJjZVZlcnRleE5hbWVzIiwiZm9yRWFjaCIsInNvdXJjZVZlcnRleE5hbWUiLCJlZGdlIiwiZnJvbVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lIiwicHVzaCIsInNvdXJjZVZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzIiwiZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMiLCJ0YXJnZXRWZXJ0ZXhOYW1lcyIsImdldFNvdXJjZVZlcnRleE5hbWUiLCJnZXRUYXJnZXRWZXJ0ZXhOYW1lIiwiZWRnZVByZXNlbnQiLCJpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyIsInNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQiLCJpc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgiLCJnZXRWZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lIiwiaW5jbHVkZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcyIsInN1Y2Nlc3MiLCJhZGRFZGdlQnlWZXJ0ZXhOYW1lcyIsInJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzIiwiYWRkVmVydGV4QnlWZXJ0ZXhOYW1lIiwic291cmNlVmVydGV4SW5kZXgiLCJnZXRJbmRleCIsInRhcmdldFZlcnRleEluZGV4IiwiaW52YWxpZGF0aW5nRWRnZSIsImFkZEludmFsaWRhdGluZ0VkZ2VCeVZlcnRpY2VzIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJhZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJhZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4Iiwic291cmNlVmVydGV4UHJlc2VudCIsInJlbW92ZU91dGdvaW5nRWRnZXMiLCJ0YXJnZXRWZXJ0ZXhQcmVzZW50IiwicmVtb3ZlSW5jb21pbmdFZGdlcyIsInZlcnRleE5hbWVzTGVuZ3RoIiwibmFtZSIsImluZGV4IiwiZnJvbU5hbWVBbmRJbmRleCIsInNldFZlcnRleEJ5VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlcyIsImZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4IiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lIiwiZ2V0TmFtZSIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2UiLCJmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJkZWxldGVWZXJ0ZXhCeVZlcnRleE5hbWUiLCJkZWxldGVkVmVydGV4IiwiZGVsZXRlZFZlcnRleEluZGV4IiwiYWZmZWN0ZWRWZXJ0aWNlcyIsInJlZHVjZSIsInZlcnRleEluZGV4IiwidmVydGV4QWZmZWN0ZWQiLCJhZmZlY3RlZFZlcnRleCIsImRlY3JlbWVudEluZGV4IiwiZGlyZWN0ZWRBY3ljbGljR3JhcGgiLCJ2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXMiLCJ2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsImFkZEVkZ2VzVG9WZXJ0aWNlcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJyZXRyaWV2ZUZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4IiwicmVzdWx0c0luQ3ljbGUiLCJiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwicmV0cmlldmVCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiY29uY2F0IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzIiwibWFwIiwiYWZmZWN0ZWRWZXJ0ZXhJbmRleCIsInNvcnQiLCJpbmRleEEiLCJpbmRleEIiLCJzZXRJbmRleCIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4IiwiZm9yRWFjaE91dGdvaW5nRWRnZSIsIm91dGdvaW5nRWRnZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLFNBQVMsR0FBR0MsT0FBTyxDQUFDLFdBQUQsQ0FBekI7O0FBRUEsSUFBTUMsSUFBSSxHQUFHRCxPQUFP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LHdCQUF2RDtBQUVBQSxNQUFBQSx3QkFBd0IsQ0FBQ0UsNkJBQXpCLENBQXVESCwwQkFBdkQ7QUFDRCxLQVhEO0FBWUQsR0FiRDtBQWNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgRWRnZSA9IHJlcXVpcmUoJy4vZWRnZScpLFxuICAgICAgVmVydGV4ID0gcmVxdWlyZSgnLi92ZXJ0ZXgnKSxcbiAgICAgIHZlcnRleFV0aWxpdGllcyA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL3ZlcnRleCcpO1xuXG5jb25zdCB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IGxhc3QgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcywgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMgfSA9IHZlcnRleFV0aWxpdGllcztcblxuY2xhc3MgRGlyZWN0ZWRBY3ljbGljR3JhcGgge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhNYXApIHtcbiAgICB0aGlzLnZlcnRleE1hcCA9IHZlcnRleE1hcDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgICAgdmVydGljZXNMZW5ndGggPSB2ZXJ0aWNlcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAodmVydGljZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgZ2V0VmVydGljZXMoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwVmFsdWVzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgdmVydGljZXMgPSB2ZXJ0ZXhNYXBWYWx1ZXM7IC8vL1xuXG4gICAgcmV0dXJuIHZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0VmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lcyA9IHZlcnRleE1hcEtleXM7ICAvLy9cblxuICAgIHJldHVybiB2ZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleCA9IHZlcnRleFByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gOlxuICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXguZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRTdWNjZXNzb3JWZXJ0ZXhOYW1lc0J5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXguZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMoKTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldEVkZ2VzQnlUYXJnZXRWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlcyA9IFtdLFxuICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHRhcmdldFZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHRhcmdldFZlcnRleC5nZXRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzKCksXG4gICAgICAgICAgICBzb3VyY2VWZXJ0ZXhOYW1lcyA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXM7ICAvLy9cblxuICAgICAgc291cmNlVmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSBFZGdlLmZyb21Tb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICBlZGdlcy5wdXNoKGVkZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VzO1xuICB9XG5cbiAgZ2V0RWRnZXNCeVNvdXJjZVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSkge1xuICAgIGNvbnN0IGVkZ2VzID0gW10sXG4gICAgICAgICAgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHNvdXJjZVZlcnRleC5nZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZXMgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lczsgIC8vL1xuXG4gICAgICB0YXJnZXRWZXJ0ZXhOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICAgICAgY29uc3QgZWRnZSA9IEVkZ2UuZnJvbVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIGVkZ2VzLnB1c2goZWRnZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBzZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSwgdmVydGV4KSB7XG4gICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH1cblxuICBkZWxldGVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnQoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICAgIFxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgZWRnZVByZXNlbnQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgIHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQgPSAoc291cmNlVmVydGV4ICE9PSBudWxsKSAmJiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgIHZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lID0gdmVydGV4TmFtZXMuaW5jbHVkZXModmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4UHJlc2VudCA9IHZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdmVydGV4UHJlc2VudDtcbiAgfVxuXG4gIGdldFRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyh2ZXJ0aWNlcyk7XG5cbiAgICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzID0gdmVydGljZXMsIC8vL1xuICAgICAgICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMgPSB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKTtcblxuICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzO1xuICB9XG5cbiAgYWRkRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBzdWNjZXNzID0gdGhpcy5hZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKTtcblxuICAgIHRoaXMucmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gIH1cblxuICBhZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhOYW1lICE9PSB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXguaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICBcbiAgICAgIGlmIChlZGdlUHJlc2VudCkge1xuICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZVZlcnRleEluZGV4ID0gc291cmNlVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIHRhcmdldFZlcnRleEluZGV4ID0gdGFyZ2V0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIGludmFsaWRhdGluZ0VkZ2UgPSAoc291cmNlVmVydGV4SW5kZXggPiB0YXJnZXRWZXJ0ZXhJbmRleCk7XG5cbiAgICAgICAgc3VjY2VzcyA9IGludmFsaWRhdGluZ0VkZ2UgP1xuICAgICAgICAgICAgICAgICAgICBhZGRJbnZhbGlkYXRpbmdFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkgOlxuICAgICAgICAgICAgICAgICAgICAgIHRydWU7XG5cbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleCwgLy8vXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4OyAvLy9cblxuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAoZWRnZVByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlTb3VyY2VWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVPdXRnb2luZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRWRnZXNCeVRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHRhcmdldFZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh0YXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUluY29taW5nRWRnZXMoKTtcbiAgICB9XG4gIH1cblxuICBhZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICghdmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdmVydGV4TmFtZXMgPSB0aGlzLmdldFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgICB2ZXJ0ZXhOYW1lc0xlbmd0aCA9IHZlcnRleE5hbWVzLmxlbmd0aCxcbiAgICAgICAgICAgIG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbmRleCA9IHZlcnRleE5hbWVzTGVuZ3RoLCAvLy9cbiAgICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgICAgdGhpcy5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSwgdmVydGV4KTtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICByZW1vdmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGxldCByZW1vdmVkRWRnZXMgPSBudWxsO1xuXG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHZlcnRleFByZXNlbnQpIHtcbiAgICAgIHJlbW92ZWRFZGdlcyA9IFtdO1xuXG4gICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCkge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksICAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgICBjb25zdCBkZWxldGVkVmVydGV4ID0gdmVydGV4LCAvLy9cbiAgICAgICAgICAgIGRlbGV0ZWRWZXJ0ZXhJbmRleCA9IGRlbGV0ZWRWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgIHZlcnRpY2VzID0gdGhpcy5nZXRWZXJ0aWNlcygpLFxuICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0aWNlcyA9IHZlcnRpY2VzLnJlZHVjZShmdW5jdGlvbihhZmZlY3RlZFZlcnRpY2VzLCB2ZXJ0ZXgpIHtcbiAgICAgICAgICAgICAgY29uc3QgdmVydGV4SW5kZXggPSB2ZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QWZmZWN0ZWQgPSAodmVydGV4SW5kZXggPiBkZWxldGVkVmVydGV4SW5kZXgpO1xuXG4gICAgICAgICAgICAgIGlmICh2ZXJ0ZXhBZmZlY3RlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4ID0gdmVydGV4OyAgLy8vXG5cbiAgICAgICAgICAgICAgICBhZmZlY3RlZFZlcnRpY2VzLnB1c2goYWZmZWN0ZWRWZXJ0ZXgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGljZXM7XG4gICAgICAgICAgICB9LCBbXSk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCkge1xuICAgICAgICBhZmZlY3RlZFZlcnRleC5kZWNyZW1lbnRJbmRleCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZWRFZGdlcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fSxcbiAgICAgICAgICBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKTtcblxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpO1xuICAgIFxuICAgIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0ZWRBY3ljbGljR3JhcGg7XG5cbmZ1bmN0aW9uIGFkZEludmFsaWRhdGluZ0VkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KSB7XG4gIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGFyZ2V0VmVydGV4LnJldHJpZXZlRm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCksXG4gICAgICAgIGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID0gbGFzdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICByZXN1bHRzSW5DeWNsZSA9IChsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9PT0gc291cmNlVmVydGV4KTtcblxuICBpZiAoIXJlc3VsdHNJbkN5Y2xlKSB7XG4gICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHNvdXJjZVZlcnRleC5yZXRyaWV2ZUJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgIGNvbnN0IGFmZmVjdGVkVmVydGljZXMgPSBbXS5jb25jYXQoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcykuY29uY2F0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzID0gYWZmZWN0ZWRWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleC5nZXRJbmRleCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gYWZmZWN0ZWRWZXJ0ZXhJbmRleDtcbiAgICAgICAgICB9KTtcblxuICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcy5zb3J0KChpbmRleEEsIGluZGV4QikgPT4gKGluZGV4QSAtIGluZGV4QikpO1xuXG4gICAgYWZmZWN0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4LCBpbmRleCkge1xuICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4SW5kaWNlc1tpbmRleF07XG5cbiAgICAgIGFmZmVjdGVkVmVydGV4LnNldEluZGV4KGFmZmVjdGVkVmVydGV4SW5kZXgpO1xuICAgIH0pO1xuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gc3VjY2Vzcztcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbih2ZXJ0ZXhOYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcbiAgXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCksXG4gICAgICAgICAgdmVydGV4TmFtZSA9IG5hbWU7ICAvLy9cblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCkge1xuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgpIHtcbiAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5mb3JFYWNoT3V0Z29pbmdFZGdlKGZ1bmN0aW9uKG91dGdvaW5nRWRnZSkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXhOYW1lLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSwgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZV07IC8vL1xuXG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=