"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _necessary = require("necessary");

var _edge = _interopRequireDefault(require("./edge"));

var _vertex2 = _interopRequireDefault(require("./vertex"));

var _vertex3 = require("./utilities/vertex");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var last = _necessary.arrayUtilities.last;

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
    key: "getImmediatePredecessorVertexNamesByVertexName",
    value: function getImmediatePredecessorVertexNamesByVertexName(vertexName) {
      var vertex = this.getVertexByVertexName(vertexName),
          immediatePredecessorVertexNames = vertex.getImmediatePredecessorVertexNames();
      return immediatePredecessorVertexNames;
    }
  }, {
    key: "getImmediateSuccessorVertexNamesByVertexName",
    value: function getImmediateSuccessorVertexNamesByVertexName(vertexName) {
      var vertex = this.getVertexByVertexName(vertexName),
          immediateSuccessorVertexNames = vertex.getImmediateSuccessorVertexNames();
      return immediateSuccessorVertexNames;
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
      (0, _vertex3.topologicallyOrderVertices)(vertices);
      var topologicallyOrderedVertices = vertices,
          ///
      topologicallyOrderedVertexNames = (0, _vertex3.vertexNamesFromVertices)(topologicallyOrderedVertices);
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
          return affectedVertex.decrementIndex();
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

exports["default"] = DirectedAcyclicGraph;

function addInvalidatingEdgeByVertices(sourceVertex, targetVertex) {
  var success = false;
  var forwardsAffectedVertices = targetVertex.retrieveForwardsAffectedVertices(sourceVertex),
      lastForwardsAffectedVertex = last(forwardsAffectedVertices),
      resultsInCycle = lastForwardsAffectedVertex === sourceVertex;

  if (!resultsInCycle) {
    var backwardsAffectedVertices = sourceVertex.retrieveBackwardsAffectedVertices();
    (0, _vertex3.topologicallyOrderVertices)(backwardsAffectedVertices);
    (0, _vertex3.topologicallyOrderVertices)(forwardsAffectedVertices);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGVkQWN5Y2xpY0dyYXBoLmpzIl0sIm5hbWVzIjpbImxhc3QiLCJhcnJheVV0aWxpdGllcyIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGljZXMiLCJnZXRWZXJ0aWNlcyIsInZlcnRpY2VzTGVuZ3RoIiwibGVuZ3RoIiwiZW1wdHkiLCJ2ZXJ0ZXhNYXBWYWx1ZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2ZXJ0ZXhNYXBLZXlzIiwia2V5cyIsInZlcnRleE5hbWVzIiwidmVydGV4TmFtZSIsInZlcnRleFByZXNlbnQiLCJpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUiLCJ2ZXJ0ZXgiLCJnZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzIiwiZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMiLCJwcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsInN1Y2Nlc3NvclZlcnRleE5hbWVzIiwiZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMiLCJ0YXJnZXRWZXJ0ZXhOYW1lIiwiZWRnZXMiLCJ0YXJnZXRWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhOYW1lcyIsImZvckVhY2giLCJzb3VyY2VWZXJ0ZXhOYW1lIiwiZWRnZSIsIkVkZ2UiLCJmcm9tU291cmNlVmVydGV4TmFtZUFuZFRhcmdldFZlcnRleE5hbWUiLCJwdXNoIiwic291cmNlVmVydGV4IiwidGFyZ2V0VmVydGV4TmFtZXMiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4IiwiZ2V0VmVydGV4TmFtZXMiLCJ2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZSIsImluY2x1ZGVzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMiLCJzdWNjZXNzIiwiYWRkRWRnZUJ5VmVydGV4TmFtZXMiLCJyZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyIsImFkZFZlcnRleEJ5VmVydGV4TmFtZSIsInNvdXJjZVZlcnRleEluZGV4IiwiZ2V0SW5kZXgiLCJ0YXJnZXRWZXJ0ZXhJbmRleCIsImludmFsaWRhdGluZ0VkZ2UiLCJhZGRJbnZhbGlkYXRpbmdFZGdlQnlWZXJ0aWNlcyIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleFByZXNlbnQiLCJyZW1vdmVPdXRnb2luZ0VkZ2VzIiwidGFyZ2V0VmVydGV4UHJlc2VudCIsInJlbW92ZUluY29taW5nRWRnZXMiLCJ2ZXJ0ZXhOYW1lc0xlbmd0aCIsIm5hbWUiLCJpbmRleCIsIlZlcnRleCIsImZyb21OYW1lQW5kSW5kZXgiLCJzZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZXMiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlIiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lIiwiZGVsZXRlZFZlcnRleCIsImRlbGV0ZWRWZXJ0ZXhJbmRleCIsImFmZmVjdGVkVmVydGljZXMiLCJyZWR1Y2UiLCJ2ZXJ0ZXhJbmRleCIsInZlcnRleEFmZmVjdGVkIiwiYWZmZWN0ZWRWZXJ0ZXgiLCJkZWNyZW1lbnRJbmRleCIsImRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwRnJvbVZlcnRleE5hbWVzIiwidmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJhZGRFZGdlc1RvVmVydGljZXMiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJyZXRyaWV2ZUZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4IiwicmVzdWx0c0luQ3ljbGUiLCJiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwicmV0cmlldmVCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiY29uY2F0IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzIiwibWFwIiwiYWZmZWN0ZWRWZXJ0ZXhJbmRleCIsInNvcnQiLCJpbmRleEEiLCJpbmRleEIiLCJzZXRJbmRleCIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4IiwiZm9yRWFjaE91dGdvaW5nRWRnZSIsIm91dGdvaW5nRWRnZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7SUFFUUEsSSxHQUFTQyx5QixDQUFURCxJOztJQUVhRSxvQjtBQUNuQixnQ0FBWUMsU0FBWixFQUF1QjtBQUFBOztBQUNyQixTQUFLQSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEOzs7OzhCQUVTO0FBQ1IsVUFBTUMsUUFBUSxHQUFHLEtBQUtDLFdBQUwsRUFBakI7QUFBQSxV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RUFBOEJDLEtBQTlCLENBRGY7QUFBQSxRQUVNekQsVUFBVSxHQUFHd0QsSUFGbkIsQ0FEMEUsQ0FHaEQ7OztBQUUxQnBFLElBQUFBLFNBQVMsQ0FBQ1ksVUFBRCxDQUFULEdBQXdCRyxNQUF4QjtBQUNELEdBTkQ7QUFRQSxTQUFPZixTQUFQO0FBQ0Q7O0FBRUQsU0FBUytGLGtCQUFULENBQTRCakQsNEJBQTVCLEVBQTBEOUMsU0FBMUQsRUFBcUU7QUFDbkU4QyxFQUFBQSw0QkFBNEIsQ0FBQ2pCLE9BQTdCLENBQXFDLFVBQUNpRiwwQkFBRCxFQUFnQztBQUNuRUEsSUFBQUEsMEJBQTBCLENBQUNDLG1CQUEzQixDQUErQyxVQUFDQyxZQUFELEVBQWtCO0FBQy9ELFVBQU1sRixnQkFBZ0IsR0FBR2tGLFlBQVksQ0FBQzNFLG1CQUFiLEVBQXpCO0FBQUEsVUFDTVosZ0JBQWdCLEdBQUd1RixZQUFZLENBQUMxRSxtQkFBYixFQUR6QjtBQUFBLFVBRU1zQyw4QkFBOEIsR0FBRzlDLGdCQUZ2QztBQUFBLFVBRTBEO0FBQ3BEbUYsTUFBQUEsNEJBQTRCLEdBQUd4RixnQkFIckM7QUFBQSxVQUlNZ0MsMEJBQTBCLEdBQUd6RCxTQUFTLENBQUM0RSw4QkFBRCxDQUo1QztBQUFBLFVBSThFO0FBQ3hFbEIsTUFBQUEsd0JBQXdCLEdBQUcxRCxTQUFTLENBQUNpSCw0QkFBRCxDQUwxQyxDQUQrRCxDQU1XOztBQUUxRXhELE1BQUFBLDBCQUEwQixDQUFDRSwyQkFBM0IsQ0FBdURELHdCQUF2RDtBQUVBQSxNQUFBQSx3QkFBd0IsQ0FBQ0UsNkJBQXpCLENBQXVESCwwQkFBdkQ7QUFDRCxLQVhEO0FBWUQsR0FiRDtBQWNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgRWRnZSBmcm9tIFwiLi9lZGdlXCI7XG5pbXBvcnQgVmVydGV4IGZyb20gXCIuL3ZlcnRleFwiO1xuXG5pbXBvcnQgeyB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcywgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvdmVydGV4XCI7XG5cbmNvbnN0IHsgbGFzdCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdGVkQWN5Y2xpY0dyYXBoIHtcbiAgY29uc3RydWN0b3IodmVydGV4TWFwKSB7XG4gICAgdGhpcy52ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXA7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5nZXRWZXJ0aWNlcygpLFxuICAgICAgICAgIHZlcnRpY2VzTGVuZ3RoID0gdmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKHZlcnRpY2VzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGdldFZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcFZhbHVlcyA9IE9iamVjdC52YWx1ZXModGhpcy52ZXJ0ZXhNYXApLFxuICAgICAgICAgIHZlcnRpY2VzID0gdmVydGV4TWFwVmFsdWVzOyAvLy9cblxuICAgIHJldHVybiB2ZXJ0aWNlcztcbiAgfVxuXG4gIGdldFZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgdmVydGV4TmFtZXMgPSB2ZXJ0ZXhNYXBLZXlzOyAgLy8vXG5cbiAgICByZXR1cm4gdmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0ZXhQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMoKTtcblxuICAgIHJldHVybiBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzKCk7XG5cbiAgICByZXR1cm4gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldFN1Y2Nlc3NvclZlcnRleE5hbWVzKCk7XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRFZGdlc0J5VGFyZ2V0VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZXMgPSBbXSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh0YXJnZXRWZXJ0ZXggIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB0YXJnZXRWZXJ0ZXguZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgc291cmNlVmVydGV4TmFtZXMgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzOyAgLy8vXG5cbiAgICAgIHNvdXJjZVZlcnRleE5hbWVzLmZvckVhY2goKHNvdXJjZVZlcnRleE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZWRnZSA9IEVkZ2UuZnJvbVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIGVkZ2VzLnB1c2goZWRnZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBnZXRFZGdlc0J5U291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZXMgPSBbXSxcbiAgICAgICAgICBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXggIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzID0gc291cmNlVmVydGV4LmdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lcyA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzOyAgLy8vXG5cbiAgICAgIHRhcmdldFZlcnRleE5hbWVzLmZvckVhY2goKHRhcmdldFZlcnRleE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZWRnZSA9IEVkZ2UuZnJvbVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIGVkZ2VzLnB1c2goZWRnZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBzZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSwgdmVydGV4KSB7XG4gICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH1cblxuICBkZWxldGVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnQoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICAgIFxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgZWRnZVByZXNlbnQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgIHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQgPSAoc291cmNlVmVydGV4ICE9PSBudWxsKSAmJiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgIHZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lID0gdmVydGV4TmFtZXMuaW5jbHVkZXModmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4UHJlc2VudCA9IHZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdmVydGV4UHJlc2VudDtcbiAgfVxuXG4gIGdldFRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyh2ZXJ0aWNlcyk7XG5cbiAgICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzID0gdmVydGljZXMsIC8vL1xuICAgICAgICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMgPSB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKTtcblxuICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzO1xuICB9XG5cbiAgYWRkRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBzdWNjZXNzID0gdGhpcy5hZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKTtcblxuICAgIHRoaXMucmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gIH1cblxuICBhZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhOYW1lICE9PSB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXguaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICBcbiAgICAgIGlmIChlZGdlUHJlc2VudCkge1xuICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZVZlcnRleEluZGV4ID0gc291cmNlVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIHRhcmdldFZlcnRleEluZGV4ID0gdGFyZ2V0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIGludmFsaWRhdGluZ0VkZ2UgPSAoc291cmNlVmVydGV4SW5kZXggPiB0YXJnZXRWZXJ0ZXhJbmRleCk7XG5cbiAgICAgICAgc3VjY2VzcyA9IGludmFsaWRhdGluZ0VkZ2UgP1xuICAgICAgICAgICAgICAgICAgICBhZGRJbnZhbGlkYXRpbmdFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkgOlxuICAgICAgICAgICAgICAgICAgICAgIHRydWU7XG5cbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleCwgLy8vXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4OyAvLy9cblxuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAoZWRnZVByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlTb3VyY2VWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVPdXRnb2luZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRWRnZXNCeVRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHRhcmdldFZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh0YXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUluY29taW5nRWRnZXMoKTtcbiAgICB9XG4gIH1cblxuICBhZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICghdmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdmVydGV4TmFtZXMgPSB0aGlzLmdldFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgICB2ZXJ0ZXhOYW1lc0xlbmd0aCA9IHZlcnRleE5hbWVzLmxlbmd0aCxcbiAgICAgICAgICAgIG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbmRleCA9IHZlcnRleE5hbWVzTGVuZ3RoLCAvLy9cbiAgICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgICAgdGhpcy5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSwgdmVydGV4KTtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICByZW1vdmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGxldCByZW1vdmVkRWRnZXMgPSBudWxsO1xuXG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHZlcnRleFByZXNlbnQpIHtcbiAgICAgIHJlbW92ZWRFZGdlcyA9IFtdO1xuXG4gICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoKGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpID0+IHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkgPT4ge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSwgIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kZWxldGVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIGNvbnN0IGRlbGV0ZWRWZXJ0ZXggPSB2ZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgZGVsZXRlZFZlcnRleEluZGV4ID0gZGVsZXRlZFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgICAgICBhZmZlY3RlZFZlcnRpY2VzID0gdmVydGljZXMucmVkdWNlKChhZmZlY3RlZFZlcnRpY2VzLCB2ZXJ0ZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmVydGV4SW5kZXggPSB2ZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QWZmZWN0ZWQgPSAodmVydGV4SW5kZXggPiBkZWxldGVkVmVydGV4SW5kZXgpO1xuXG4gICAgICAgICAgICAgIGlmICh2ZXJ0ZXhBZmZlY3RlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4ID0gdmVydGV4OyAgLy8vXG5cbiAgICAgICAgICAgICAgICBhZmZlY3RlZFZlcnRpY2VzLnB1c2goYWZmZWN0ZWRWZXJ0ZXgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGljZXM7XG4gICAgICAgICAgICB9LCBbXSk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaCgoYWZmZWN0ZWRWZXJ0ZXgpID0+IGFmZmVjdGVkVmVydGV4LmRlY3JlbWVudEluZGV4KCkpO1xuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVkRWRnZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0ge30sXG4gICAgICAgICAgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcyk7XG5cbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKTtcbiAgICBcbiAgICBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKTtcbiAgICBcbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRJbnZhbGlkYXRpbmdFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkge1xuICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRhcmdldFZlcnRleC5yZXRyaWV2ZUZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgpLFxuICAgICAgICBsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9IGxhc3QoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgcmVzdWx0c0luQ3ljbGUgPSAobGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPT09IHNvdXJjZVZlcnRleCk7XG5cbiAgaWYgKCFyZXN1bHRzSW5DeWNsZSkge1xuICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMgPSBzb3VyY2VWZXJ0ZXgucmV0cmlldmVCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKCk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICBjb25zdCBhZmZlY3RlZFZlcnRpY2VzID0gW10uY29uY2F0KGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpLmNvbmNhdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcyA9IGFmZmVjdGVkVmVydGljZXMubWFwKChhZmZlY3RlZFZlcnRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4LmdldEluZGV4KCk7XG5cbiAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRleEluZGV4O1xuICAgICAgICAgIH0pO1xuXG4gICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzLnNvcnQoKGluZGV4QSwgaW5kZXhCKSA9PiAoaW5kZXhBIC0gaW5kZXhCKSk7XG5cbiAgICBhZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goKGFmZmVjdGVkVmVydGV4LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4SW5kaWNlc1tpbmRleF07XG5cbiAgICAgIGFmZmVjdGVkVmVydGV4LnNldEluZGV4KGFmZmVjdGVkVmVydGV4SW5kZXgpO1xuICAgIH0pO1xuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gc3VjY2Vzcztcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdmVydGV4TmFtZXMuZm9yRWFjaCgodmVydGV4TmFtZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG4gIFxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKCh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBuYW1lID0gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lID0gbmFtZTsgIC8vL1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcblxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKSB7XG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaCgodG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgpID0+IHtcbiAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5mb3JFYWNoT3V0Z29pbmdFZGdlKChvdXRnb2luZ0VkZ2UpID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lID0gdGFyZ2V0VmVydGV4TmFtZSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZV0sIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVdOyAvLy9cblxuICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19