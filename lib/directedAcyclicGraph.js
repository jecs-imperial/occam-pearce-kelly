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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGVkQWN5Y2xpY0dyYXBoLmpzIl0sIm5hbWVzIjpbImxhc3QiLCJhcnJheVV0aWxpdGllcyIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGljZXMiLCJnZXRWZXJ0aWNlcyIsInZlcnRpY2VzTGVuZ3RoIiwibGVuZ3RoIiwiZW1wdHkiLCJ2ZXJ0ZXhNYXBWYWx1ZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2ZXJ0ZXhNYXBLZXlzIiwia2V5cyIsInZlcnRleE5hbWVzIiwidmVydGV4TmFtZSIsInZlcnRleFByZXNlbnQiLCJpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUiLCJ2ZXJ0ZXgiLCJnZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJwcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsInN1Y2Nlc3NvclZlcnRleE5hbWVzIiwiZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMiLCJ0YXJnZXRWZXJ0ZXhOYW1lIiwiZWRnZXMiLCJ0YXJnZXRWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsInNvdXJjZVZlcnRleE5hbWVzIiwiZm9yRWFjaCIsInNvdXJjZVZlcnRleE5hbWUiLCJlZGdlIiwiRWRnZSIsImZyb21Tb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZSIsInB1c2giLCJzb3VyY2VWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsImdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzIiwidGFyZ2V0VmVydGV4TmFtZXMiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4IiwiZ2V0VmVydGV4TmFtZXMiLCJ2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZSIsImluY2x1ZGVzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMiLCJzdWNjZXNzIiwiYWRkRWRnZUJ5VmVydGV4TmFtZXMiLCJyZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyIsImFkZFZlcnRleEJ5VmVydGV4TmFtZSIsInNvdXJjZVZlcnRleEluZGV4IiwiZ2V0SW5kZXgiLCJ0YXJnZXRWZXJ0ZXhJbmRleCIsImludmFsaWRhdGluZ0VkZ2UiLCJhZGRJbnZhbGlkYXRpbmdFZGdlQnlWZXJ0aWNlcyIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleFByZXNlbnQiLCJyZW1vdmVPdXRnb2luZ0VkZ2VzIiwidGFyZ2V0VmVydGV4UHJlc2VudCIsInJlbW92ZUluY29taW5nRWRnZXMiLCJ2ZXJ0ZXhOYW1lc0xlbmd0aCIsIm5hbWUiLCJpbmRleCIsIlZlcnRleCIsImZyb21OYW1lQW5kSW5kZXgiLCJzZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZXMiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlIiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lIiwiZGVsZXRlZFZlcnRleCIsImRlbGV0ZWRWZXJ0ZXhJbmRleCIsImFmZmVjdGVkVmVydGljZXMiLCJyZWR1Y2UiLCJ2ZXJ0ZXhJbmRleCIsInZlcnRleEFmZmVjdGVkIiwiYWZmZWN0ZWRWZXJ0ZXgiLCJkZWNyZW1lbnRJbmRleCIsImRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwRnJvbVZlcnRleE5hbWVzIiwidmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJhZGRFZGdlc1RvVmVydGljZXMiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJyZXRyaWV2ZUZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4IiwicmVzdWx0c0luQ3ljbGUiLCJiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwicmV0cmlldmVCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiY29uY2F0IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzIiwibWFwIiwiYWZmZWN0ZWRWZXJ0ZXhJbmRleCIsInNvcnQiLCJpbmRleEEiLCJpbmRleEIiLCJzZXRJbmRleCIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4IiwiZm9yRWFjaE91dGdvaW5nRWRnZSIsIm91dGdvaW5nRWRnZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7SUFFUUEsSSxHQUFTQyx5QixDQUFURCxJOztJQUVhRSxvQjtBQUNuQixnQ0FBWUMsU0FBWixFQUF1QjtBQUFBOztBQUNyQixTQUFLQSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEOzs7OzhCQUVTO0FBQ1IsVUFBTUMsUUFBUSxHQUFHLEtBQUtDLFdBQUwsRUFBakI7QUFBQSxV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QTBCLENBQUNDLG1CQUEzQixDQUErQyxVQUFDQyxZQUFELEVBQWtCO0FBQy9ELFVBQU1wRixnQkFBZ0IsR0FBR29GLFlBQVksQ0FBQzNFLG1CQUFiLEVBQXpCO0FBQUEsVUFDTWhCLGdCQUFnQixHQUFHMkYsWUFBWSxDQUFDMUUsbUJBQWIsRUFEekI7QUFBQSxVQUVNc0MsOEJBQThCLEdBQUdoRCxnQkFGdkM7QUFBQSxVQUUwRDtBQUNwRHFGLE1BQUFBLDRCQUE0QixHQUFHNUYsZ0JBSHJDO0FBQUEsVUFJTW9DLDBCQUEwQixHQUFHekQsU0FBUyxDQUFDNEUsOEJBQUQsQ0FKNUM7QUFBQSxVQUk4RTtBQUN4RWxCLE1BQUFBLHdCQUF3QixHQUFHMUQsU0FBUyxDQUFDaUgsNEJBQUQsQ0FMMUMsQ0FEK0QsQ0FNVzs7QUFFMUV4RCxNQUFBQSwwQkFBMEIsQ0FBQ0UsMkJBQTNCLENBQXVERCx3QkFBdkQ7QUFFQUEsTUFBQUEsd0JBQXdCLENBQUNFLDZCQUF6QixDQUF1REgsMEJBQXZEO0FBQ0QsS0FYRDtBQVlELEdBYkQ7QUFjRCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IEVkZ2UgZnJvbSBcIi4vZWRnZVwiO1xuaW1wb3J0IFZlcnRleCBmcm9tIFwiLi92ZXJ0ZXhcIjtcblxuaW1wb3J0IHsgdmVydGV4TmFtZXNGcm9tVmVydGljZXMsIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL3ZlcnRleFwiO1xuXG5jb25zdCB7IGxhc3QgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3RlZEFjeWNsaWNHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleE1hcCkge1xuICAgIHRoaXMudmVydGV4TWFwID0gdmVydGV4TWFwO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKSxcbiAgICAgICAgICB2ZXJ0aWNlc0xlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9ICh2ZXJ0aWNlc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBnZXRWZXJ0aWNlcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXBWYWx1ZXMgPSBPYmplY3QudmFsdWVzKHRoaXMudmVydGV4TWFwKSxcbiAgICAgICAgICB2ZXJ0aWNlcyA9IHZlcnRleE1hcFZhbHVlczsgLy8vXG5cbiAgICByZXR1cm4gdmVydGljZXM7XG4gIH1cblxuICBnZXRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXBLZXlzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApLFxuICAgICAgICAgIHZlcnRleE5hbWVzID0gdmVydGV4TWFwS2V5czsgIC8vL1xuXG4gICAgcmV0dXJuIHZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4ID0gdmVydGV4UHJlc2VudCA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA6XG4gICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lc0J5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHZlcnRleC5nZXRQcmVkZWNlc3NvclZlcnRleE5hbWVzKCk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBzdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHZlcnRleC5nZXRTdWNjZXNzb3JWZXJ0ZXhOYW1lcygpO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0RWRnZXNCeVRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IGVkZ2VzID0gW10sXG4gICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdGFyZ2V0VmVydGV4LmdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSxcbiAgICAgICAgICAgIHNvdXJjZVZlcnRleE5hbWVzID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lczsgIC8vL1xuXG4gICAgICBzb3VyY2VWZXJ0ZXhOYW1lcy5mb3JFYWNoKChzb3VyY2VWZXJ0ZXhOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSBFZGdlLmZyb21Tb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICBlZGdlcy5wdXNoKGVkZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VzO1xuICB9XG5cbiAgZ2V0RWRnZXNCeVNvdXJjZVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSkge1xuICAgIGNvbnN0IGVkZ2VzID0gW10sXG4gICAgICAgICAgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHNvdXJjZVZlcnRleC5nZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZXMgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lczsgIC8vL1xuXG4gICAgICB0YXJnZXRWZXJ0ZXhOYW1lcy5mb3JFYWNoKCh0YXJnZXRWZXJ0ZXhOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSBFZGdlLmZyb21Tb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICBlZGdlcy5wdXNoKGVkZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VzO1xuICB9XG5cbiAgc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUsIHZlcnRleCkge1xuICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9XG5cbiAgZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50KGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gdGhpcy5pc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgICBcbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IGVkZ2VQcmVzZW50ID0gZmFsc2U7XG5cbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50ID0gKHNvdXJjZVZlcnRleCAhPT0gbnVsbCkgJiYgKHRhcmdldFZlcnRleCAhPT0gbnVsbCk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXguaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IHRoaXMuZ2V0VmVydGV4TmFtZXMoKSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZSA9IHZlcnRleE5hbWVzLmluY2x1ZGVzKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleFByZXNlbnQgPSB2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZTsgIC8vL1xuXG4gICAgcmV0dXJuIHZlcnRleFByZXNlbnQ7XG4gIH1cblxuICBnZXRUb3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5nZXRWZXJ0aWNlcygpO1xuXG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXModmVydGljZXMpO1xuXG4gICAgY29uc3QgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyA9IHZlcnRpY2VzLCAvLy9cbiAgICAgICAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzID0gdmVydGV4TmFtZXNGcm9tVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyk7XG5cbiAgICByZXR1cm4gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGFkZEVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgc3VjY2VzcyA9IHRoaXMuYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHJlbW92ZUVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCk7XG5cbiAgICB0aGlzLnJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICB9XG5cbiAgYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgICBpZiAoc291cmNlVmVydGV4TmFtZSAhPT0gdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4LmlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuICAgICAgXG4gICAgICBpZiAoZWRnZVByZXNlbnQpIHtcbiAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbmRleCA9IHNvdXJjZVZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICB0YXJnZXRWZXJ0ZXhJbmRleCA9IHRhcmdldFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICBpbnZhbGlkYXRpbmdFZGdlID0gKHNvdXJjZVZlcnRleEluZGV4ID4gdGFyZ2V0VmVydGV4SW5kZXgpO1xuXG4gICAgICAgIHN1Y2Nlc3MgPSBpbnZhbGlkYXRpbmdFZGdlID9cbiAgICAgICAgICAgICAgICAgICAgYWRkSW52YWxpZGF0aW5nRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpIDpcbiAgICAgICAgICAgICAgICAgICAgICB0cnVlO1xuXG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleDsgLy8vXG5cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICByZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVFZGdlc0J5U291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlT3V0Z29pbmdFZGdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlUYXJnZXRWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAodGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbmNvbWluZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAoIXZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgdmVydGV4TmFtZXNMZW5ndGggPSB2ZXJ0ZXhOYW1lcy5sZW5ndGgsXG4gICAgICAgICAgICBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW5kZXggPSB2ZXJ0ZXhOYW1lc0xlbmd0aCwgLy8vXG4gICAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICAgIHRoaXMuc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUsIHZlcnRleCk7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlZEVkZ2VzID0gbnVsbDtcblxuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICByZW1vdmVkRWRnZXMgPSBbXTtcblxuICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KChpbW1lZGlhdGVTdWNjZXNzVmVydGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksICAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgICBjb25zdCBkZWxldGVkVmVydGV4ID0gdmVydGV4LCAvLy9cbiAgICAgICAgICAgIGRlbGV0ZWRWZXJ0ZXhJbmRleCA9IGRlbGV0ZWRWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgIHZlcnRpY2VzID0gdGhpcy5nZXRWZXJ0aWNlcygpLFxuICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0aWNlcyA9IHZlcnRpY2VzLnJlZHVjZSgoYWZmZWN0ZWRWZXJ0aWNlcywgdmVydGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZlcnRleEluZGV4ID0gdmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleEFmZmVjdGVkID0gKHZlcnRleEluZGV4ID4gZGVsZXRlZFZlcnRleEluZGV4KTtcblxuICAgICAgICAgICAgICBpZiAodmVydGV4QWZmZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleCA9IHZlcnRleDsgIC8vL1xuXG4gICAgICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0aWNlcy5wdXNoKGFmZmVjdGVkVmVydGV4KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRpY2VzO1xuICAgICAgICAgICAgfSwgW10pO1xuXG4gICAgICBhZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goKGFmZmVjdGVkVmVydGV4KSA9PiBhZmZlY3RlZFZlcnRleC5kZWNyZW1lbnRJbmRleCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlZEVkZ2VzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHt9LFxuICAgICAgICAgIGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpO1xuXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyk7XG4gICAgXG4gICAgYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCk7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcbiAgICBcbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkSW52YWxpZGF0aW5nRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpIHtcbiAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0YXJnZXRWZXJ0ZXgucmV0cmlldmVGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMoc291cmNlVmVydGV4KSxcbiAgICAgICAgbGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPSBsYXN0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgIHJlc3VsdHNJbkN5Y2xlID0gKGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuXG4gIGlmICghcmVzdWx0c0luQ3ljbGUpIHtcbiAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gc291cmNlVmVydGV4LnJldHJpZXZlQmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcygpO1xuXG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgY29uc3QgYWZmZWN0ZWRWZXJ0aWNlcyA9IFtdLmNvbmNhdChiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKS5jb25jYXQoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgICBhZmZlY3RlZFZlcnRleEluZGljZXMgPSBhZmZlY3RlZFZlcnRpY2VzLm1hcCgoYWZmZWN0ZWRWZXJ0ZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleC5nZXRJbmRleCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gYWZmZWN0ZWRWZXJ0ZXhJbmRleDtcbiAgICAgICAgICB9KTtcblxuICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcy5zb3J0KChpbmRleEEsIGluZGV4QikgPT4gKGluZGV4QSAtIGluZGV4QikpO1xuXG4gICAgYWZmZWN0ZWRWZXJ0aWNlcy5mb3JFYWNoKChhZmZlY3RlZFZlcnRleCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleEluZGljZXNbaW5kZXhdO1xuXG4gICAgICBhZmZlY3RlZFZlcnRleC5zZXRJbmRleChhZmZlY3RlZFZlcnRleEluZGV4KTtcbiAgICB9KTtcblxuICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHN1Y2Nlc3M7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIHZlcnRleE5hbWVzLmZvckVhY2goKHZlcnRleE5hbWUsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICB2ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH0pO1xuICBcbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaCgodG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCksXG4gICAgICAgICAgdmVydGV4TmFtZSA9IG5hbWU7ICAvLy9cblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCkge1xuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4KSA9PiB7XG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZm9yRWFjaE91dGdvaW5nRWRnZSgob3V0Z29pbmdFZGdlKSA9PiB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSA9IHRhcmdldFZlcnRleE5hbWUsXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVdLCAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lXTsgLy8vXG5cbiAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==