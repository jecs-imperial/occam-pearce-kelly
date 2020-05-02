"use strict";

var _necessary = require("necessary");

var _edge = _interopRequireDefault(require("./edge"));

var _vertex2 = _interopRequireDefault(require("./vertex"));

var _vertex3 = _interopRequireDefault(require("./utilities/vertex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var last = _necessary.arrayUtilities.last,
    vertexNamesFromVertices = _vertex3["default"].vertexNamesFromVertices,
    topologicallyOrderVertices = _vertex3["default"].topologicallyOrderVertices;

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
          var edge = _edge["default"].fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);

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
          var edge = _edge["default"].fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);

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
        _vertex = _vertex2["default"].fromNameAndIndex(name, index);

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
          removedEdge = new _edge["default"](removedEdgeSourceVertexName, removedEdgeTargetVertexName);
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
          removedEdge = new _edge["default"](removedEdgeSourceVertexName, removedEdgeTargetVertexName);
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
    vertex = _vertex2["default"].fromNameAndIndex(name, index);

    vertexMap[vertexName] = vertex;
  });
  return vertexMap;
}

function vertexMapFromTopologicallyOrderedVertices(topologicallyOrderedVertices) {
  var vertexMap = {};
  topologicallyOrderedVertices.forEach(function (topologicallyOrderedVertex, index) {
    var name = topologicallyOrderedVertex.getName(),
        vertex = _vertex2["default"].fromNameAndIndex(name, index),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGVkQWN5Y2xpY0dyYXBoLmpzIl0sIm5hbWVzIjpbImxhc3QiLCJhcnJheVV0aWxpdGllcyIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidmVydGV4VXRpbGl0aWVzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJEaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcCIsInZlcnRpY2VzIiwiZ2V0VmVydGljZXMiLCJ2ZXJ0aWNlc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwidmVydGV4TWFwVmFsdWVzIiwiT2JqZWN0IiwidmFsdWVzIiwidmVydGV4TWFwS2V5cyIsImtleXMiLCJ2ZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWUiLCJ2ZXJ0ZXhQcmVzZW50IiwiaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lIiwidmVydGV4IiwiZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lIiwicHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsImdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJzdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsImdldFN1Y2Nlc3NvclZlcnRleE5hbWVzIiwidGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VzIiwidGFyZ2V0VmVydGV4IiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsImdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXhOYW1lcyIsImZvckVhY2giLCJzb3VyY2VWZXJ0ZXhOYW1lIiwiZWRnZSIsIkVkZ2UiLCJmcm9tU291cmNlVmVydGV4TmFtZUFuZFRhcmdldFZlcnRleE5hbWUiLCJwdXNoIiwic291cmNlVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMiLCJnZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsInRhcmdldFZlcnRleE5hbWVzIiwiZ2V0U291cmNlVmVydGV4TmFtZSIsImdldFRhcmdldFZlcnRleE5hbWUiLCJlZGdlUHJlc2VudCIsImlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzIiwic291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCIsImlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCIsImdldFZlcnRleE5hbWVzIiwidmVydGV4TmFtZXNJbmNsdWRlc1ZlcnRleE5hbWUiLCJpbmNsdWRlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzIiwic3VjY2VzcyIsImFkZEVkZ2VCeVZlcnRleE5hbWVzIiwicmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMiLCJhZGRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJzb3VyY2VWZXJ0ZXhJbmRleCIsImdldEluZGV4IiwidGFyZ2V0VmVydGV4SW5kZXgiLCJpbnZhbGlkYXRpbmdFZGdlIiwiYWRkSW52YWxpZGF0aW5nRWRnZUJ5VmVydGljZXMiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwicmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwicmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhQcmVzZW50IiwicmVtb3ZlT3V0Z29pbmdFZGdlcyIsInRhcmdldFZlcnRleFByZXNlbnQiLCJyZW1vdmVJbmNvbWluZ0VkZ2VzIiwidmVydGV4TmFtZXNMZW5ndGgiLCJuYW1lIiwiaW5kZXgiLCJWZXJ0ZXgiLCJmcm9tTmFtZUFuZEluZGV4Iiwic2V0VmVydGV4QnlWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VzIiwiZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUiLCJnZXROYW1lIiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZSIsImZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImRlbGV0ZVZlcnRleEJ5VmVydGV4TmFtZSIsImRlbGV0ZWRWZXJ0ZXgiLCJkZWxldGVkVmVydGV4SW5kZXgiLCJhZmZlY3RlZFZlcnRpY2VzIiwicmVkdWNlIiwidmVydGV4SW5kZXgiLCJ2ZXJ0ZXhBZmZlY3RlZCIsImFmZmVjdGVkVmVydGV4IiwiZGVjcmVtZW50SW5kZXgiLCJkaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyIsInZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwiYWRkRWRnZXNUb1ZlcnRpY2VzIiwibW9kdWxlIiwiZXhwb3J0cyIsImZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsInJldHJpZXZlRm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwibGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXgiLCJyZXN1bHRzSW5DeWNsZSIsImJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJyZXRyaWV2ZUJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJjb25jYXQiLCJhZmZlY3RlZFZlcnRleEluZGljZXMiLCJtYXAiLCJhZmZlY3RlZFZlcnRleEluZGV4Iiwic29ydCIsImluZGV4QSIsImluZGV4QiIsInNldEluZGV4IiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgiLCJmb3JFYWNoT3V0Z29pbmdFZGdlIiwib3V0Z29pbmdFZGdlIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFFTSxJQUFFQSxJQUFGLEdBQVdDLHlCQUFYLENBQUVELElBQUY7QUFBQSxJQUNFRSx1QkFERixHQUMwREMsbUJB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T0MsZ0JBQVAsQ0FBd0JILElBQXhCLEVBQThCQyxLQUE5QixDQURmO0FBQUEsUUFFTXpELFVBQVUsR0FBR3dELElBRm5CLENBRCtFLENBR3JEOzs7QUFFMUJwRSxJQUFBQSxTQUFTLENBQUNZLFVBQUQsQ0FBVCxHQUF3QkcsTUFBeEI7QUFDRCxHQU5EO0FBUUEsU0FBT2YsU0FBUDtBQUNEOztBQUVELFNBQVMrRixrQkFBVCxDQUE0QmpELDRCQUE1QixFQUEwRDlDLFNBQTFELEVBQXFFO0FBQ25FOEMsRUFBQUEsNEJBQTRCLENBQUNuQixPQUE3QixDQUFxQyxVQUFTcUYsMEJBQVQsRUFBcUM7QUFDeEVBLElBQUFBLDBCQUEwQixDQUFDQyxtQkFBM0IsQ0FBK0MsVUFBU0MsWUFBVCxFQUF1QjtBQUNwRSxVQUFNdEYsZ0JBQWdCLEdBQUdzRixZQUFZLENBQUM3RSxtQkFBYixFQUF6QjtBQUFBLFVBQ01oQixnQkFBZ0IsR0FBRzZGLFlBQVksQ0FBQzVFLG1CQUFiLEVBRHpCO0FBQUEsVUFFTXNDLDhCQUE4QixHQUFHaEQsZ0JBRnZDO0FBQUEsVUFFMEQ7QUFDcER1RixNQUFBQSw0QkFBNEIsR0FBRzlGLGdCQUhyQztBQUFBLFVBSU1vQywwQkFBMEIsR0FBR3pELFNBQVMsQ0FBQzRFLDhCQUFELENBSjVDO0FBQUEsVUFJOEU7QUFDeEVsQixNQUFBQSx3QkFBd0IsR0FBRzFELFNBQVMsQ0FBQ21ILDRCQUFELENBTDFDLENBRG9FLENBTU07O0FBRTFFMUQsTUFBQUEsMEJBQTBCLENBQUNFLDJCQUEzQixDQUF1REQsd0JBQXZEO0FBRUFBLE1BQUFBLHdCQUF3QixDQUFDRSw2QkFBekIsQ0FBdURILDBCQUF2RDtBQUNELEtBWEQ7QUFZRCxHQWJEO0FBY0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFZGdlIGZyb20gXCIuL2VkZ2VcIjtcbmltcG9ydCBWZXJ0ZXggZnJvbSBcIi4vdmVydGV4XCI7XG5pbXBvcnQgdmVydGV4VXRpbGl0aWVzIGZyb20gXCIuL3V0aWxpdGllcy92ZXJ0ZXhcIjtcblxuY29uc3QgeyBsYXN0IH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgdmVydGV4TmFtZXNGcm9tVmVydGljZXMsIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzIH0gPSB2ZXJ0ZXhVdGlsaXRpZXM7XG5cbmNsYXNzIERpcmVjdGVkQWN5Y2xpY0dyYXBoIHtcbiAgY29uc3RydWN0b3IodmVydGV4TWFwKSB7XG4gICAgdGhpcy52ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXA7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5nZXRWZXJ0aWNlcygpLFxuICAgICAgICAgIHZlcnRpY2VzTGVuZ3RoID0gdmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKHZlcnRpY2VzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGdldFZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcFZhbHVlcyA9IE9iamVjdC52YWx1ZXModGhpcy52ZXJ0ZXhNYXApLFxuICAgICAgICAgIHZlcnRpY2VzID0gdmVydGV4TWFwVmFsdWVzOyAvLy9cblxuICAgIHJldHVybiB2ZXJ0aWNlcztcbiAgfVxuXG4gIGdldFZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgdmVydGV4TmFtZXMgPSB2ZXJ0ZXhNYXBLZXlzOyAgLy8vXG5cbiAgICByZXR1cm4gdmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0ZXhQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldFN1Y2Nlc3NvclZlcnRleE5hbWVzKCk7XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRFZGdlc0J5VGFyZ2V0VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZXMgPSBbXSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh0YXJnZXRWZXJ0ZXggIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB0YXJnZXRWZXJ0ZXguZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgc291cmNlVmVydGV4TmFtZXMgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzOyAgLy8vXG5cbiAgICAgIHNvdXJjZVZlcnRleE5hbWVzLmZvckVhY2goZnVuY3Rpb24oc291cmNlVmVydGV4TmFtZSkge1xuICAgICAgICBjb25zdCBlZGdlID0gRWRnZS5mcm9tU291cmNlVmVydGV4TmFtZUFuZFRhcmdldFZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgZWRnZXMucHVzaChlZGdlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBlZGdlcztcbiAgfVxuXG4gIGdldEVkZ2VzQnlTb3VyY2VWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlcyA9IFtdLFxuICAgICAgICAgIHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMgPSBzb3VyY2VWZXJ0ZXguZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMoKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleE5hbWVzID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXM7ICAvLy9cblxuICAgICAgdGFyZ2V0VmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbih0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSBFZGdlLmZyb21Tb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICBlZGdlcy5wdXNoKGVkZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VzO1xuICB9XG5cbiAgc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUsIHZlcnRleCkge1xuICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9XG5cbiAgZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50KGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gdGhpcy5pc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgICBcbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IGVkZ2VQcmVzZW50ID0gZmFsc2U7XG5cbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50ID0gKHNvdXJjZVZlcnRleCAhPT0gbnVsbCkgJiYgKHRhcmdldFZlcnRleCAhPT0gbnVsbCk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXguaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IHRoaXMuZ2V0VmVydGV4TmFtZXMoKSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZSA9IHZlcnRleE5hbWVzLmluY2x1ZGVzKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleFByZXNlbnQgPSB2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZTsgIC8vL1xuXG4gICAgcmV0dXJuIHZlcnRleFByZXNlbnQ7XG4gIH1cblxuICBnZXRUb3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5nZXRWZXJ0aWNlcygpO1xuXG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXModmVydGljZXMpO1xuXG4gICAgY29uc3QgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyA9IHZlcnRpY2VzLCAvLy9cbiAgICAgICAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzID0gdmVydGV4TmFtZXNGcm9tVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyk7XG5cbiAgICByZXR1cm4gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGFkZEVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgc3VjY2VzcyA9IHRoaXMuYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHJlbW92ZUVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCk7XG5cbiAgICB0aGlzLnJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICB9XG5cbiAgYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgICBpZiAoc291cmNlVmVydGV4TmFtZSAhPT0gdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4LmlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuICAgICAgXG4gICAgICBpZiAoZWRnZVByZXNlbnQpIHtcbiAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbmRleCA9IHNvdXJjZVZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICB0YXJnZXRWZXJ0ZXhJbmRleCA9IHRhcmdldFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICBpbnZhbGlkYXRpbmdFZGdlID0gKHNvdXJjZVZlcnRleEluZGV4ID4gdGFyZ2V0VmVydGV4SW5kZXgpO1xuXG4gICAgICAgIHN1Y2Nlc3MgPSBpbnZhbGlkYXRpbmdFZGdlID9cbiAgICAgICAgICAgICAgICAgICAgYWRkSW52YWxpZGF0aW5nRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpIDpcbiAgICAgICAgICAgICAgICAgICAgICB0cnVlO1xuXG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleDsgLy8vXG5cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICByZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVFZGdlc0J5U291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlT3V0Z29pbmdFZGdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlUYXJnZXRWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAodGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbmNvbWluZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAoIXZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgdmVydGV4TmFtZXNMZW5ndGggPSB2ZXJ0ZXhOYW1lcy5sZW5ndGgsXG4gICAgICAgICAgICBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW5kZXggPSB2ZXJ0ZXhOYW1lc0xlbmd0aCwgLy8vXG4gICAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICAgIHRoaXMuc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUsIHZlcnRleCk7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlZEVkZ2VzID0gbnVsbDtcblxuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICByZW1vdmVkRWRnZXMgPSBbXTtcblxuICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLCAgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRlbGV0ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgICAgY29uc3QgZGVsZXRlZFZlcnRleCA9IHZlcnRleCwgLy8vXG4gICAgICAgICAgICBkZWxldGVkVmVydGV4SW5kZXggPSBkZWxldGVkVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKSxcbiAgICAgICAgICAgIGFmZmVjdGVkVmVydGljZXMgPSB2ZXJ0aWNlcy5yZWR1Y2UoZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0aWNlcywgdmVydGV4KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHZlcnRleEluZGV4ID0gdmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleEFmZmVjdGVkID0gKHZlcnRleEluZGV4ID4gZGVsZXRlZFZlcnRleEluZGV4KTtcblxuICAgICAgICAgICAgICBpZiAodmVydGV4QWZmZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleCA9IHZlcnRleDsgIC8vL1xuXG4gICAgICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0aWNlcy5wdXNoKGFmZmVjdGVkVmVydGV4KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRpY2VzO1xuICAgICAgICAgICAgfSwgW10pO1xuXG4gICAgICBhZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgpIHtcbiAgICAgICAgYWZmZWN0ZWRWZXJ0ZXguZGVjcmVtZW50SW5kZXgoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVkRWRnZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0ge30sXG4gICAgICAgICAgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcyk7XG5cbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKTtcbiAgICBcbiAgICBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKTtcbiAgICBcbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuXG5mdW5jdGlvbiBhZGRJbnZhbGlkYXRpbmdFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkge1xuICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRhcmdldFZlcnRleC5yZXRyaWV2ZUZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgpLFxuICAgICAgICBsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9IGxhc3QoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgcmVzdWx0c0luQ3ljbGUgPSAobGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPT09IHNvdXJjZVZlcnRleCk7XG5cbiAgaWYgKCFyZXN1bHRzSW5DeWNsZSkge1xuICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMgPSBzb3VyY2VWZXJ0ZXgucmV0cmlldmVCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKCk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICBjb25zdCBhZmZlY3RlZFZlcnRpY2VzID0gW10uY29uY2F0KGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpLmNvbmNhdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcyA9IGFmZmVjdGVkVmVydGljZXMubWFwKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4KSB7XG4gICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGV4SW5kZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICBhZmZlY3RlZFZlcnRleEluZGljZXMuc29ydCgoaW5kZXhBLCBpbmRleEIpID0+IChpbmRleEEgLSBpbmRleEIpKTtcblxuICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCwgaW5kZXgpIHtcbiAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleEluZGljZXNbaW5kZXhdO1xuXG4gICAgICBhZmZlY3RlZFZlcnRleC5zZXRJbmRleChhZmZlY3RlZFZlcnRleEluZGV4KTtcbiAgICB9KTtcblxuICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHN1Y2Nlc3M7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIHZlcnRleE5hbWVzLmZvckVhY2goZnVuY3Rpb24odmVydGV4TmFtZSwgaW5kZXgpIHtcbiAgICBjb25zdCBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG4gIFxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpLFxuICAgICAgICAgIHZlcnRleE5hbWUgPSBuYW1lOyAgLy8vXG5cbiAgICB2ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH0pO1xuXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApIHtcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4KSB7XG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZm9yRWFjaE91dGdvaW5nRWRnZShmdW5jdGlvbihvdXRnb2luZ0VkZ2UpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lID0gdGFyZ2V0VmVydGV4TmFtZSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZV0sIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVdOyAvLy9cblxuICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19