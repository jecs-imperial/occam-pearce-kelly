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
    key: "getOrderedVertexNames",
    value: function getOrderedVertexNames() {
      var vertices = this.getVertices();
      (0, _vertex3.orderVertices)(vertices);
      var orderedVertices = vertices,
          ///
      orderedVertexNames = (0, _vertex3.vertexNamesFromVertices)(orderedVertices);
      return orderedVertexNames;
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
    key: "fromOrderedVertices",
    value: function fromOrderedVertices(orderedVertices) {
      var vertexMap = vertexMapFromOrderedVertices(orderedVertices);
      addEdgesToVertices(orderedVertices, vertexMap);
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
    (0, _vertex3.orderVertices)(backwardsAffectedVertices);
    (0, _vertex3.orderVertices)(forwardsAffectedVertices);
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

function vertexMapFromOrderedVertices(orderedVertices) {
  var vertexMap = {};
  orderedVertices.forEach(function (orderedVertex, index) {
    var name = orderedVertex.getName(),
        vertex = _vertex2["default"].fromNameAndIndex(name, index),
        vertexName = name; ///


    vertexMap[vertexName] = vertex;
  });
  return vertexMap;
}

function addEdgesToVertices(orderedVertices, vertexMap) {
  orderedVertices.forEach(function (orderedVertex) {
    orderedVertex.forEachOutgoingEdge(function (outgoingEdge) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdGVkQWN5Y2xpY0dyYXBoLmpzIl0sIm5hbWVzIjpbImxhc3QiLCJhcnJheVV0aWxpdGllcyIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGljZXMiLCJnZXRWZXJ0aWNlcyIsInZlcnRpY2VzTGVuZ3RoIiwibGVuZ3RoIiwiZW1wdHkiLCJ2ZXJ0ZXhNYXBWYWx1ZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2ZXJ0ZXhNYXBLZXlzIiwia2V5cyIsInZlcnRleE5hbWVzIiwidmVydGV4TmFtZSIsInZlcnRleFByZXNlbnQiLCJpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUiLCJ2ZXJ0ZXgiLCJnZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzIiwiZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMiLCJwcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsInN1Y2Nlc3NvclZlcnRleE5hbWVzIiwiZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMiLCJ0YXJnZXRWZXJ0ZXhOYW1lIiwiZWRnZXMiLCJ0YXJnZXRWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhOYW1lcyIsImZvckVhY2giLCJzb3VyY2VWZXJ0ZXhOYW1lIiwiZWRnZSIsIkVkZ2UiLCJmcm9tU291cmNlVmVydGV4TmFtZUFuZFRhcmdldFZlcnRleE5hbWUiLCJwdXNoIiwic291cmNlVmVydGV4IiwidGFyZ2V0VmVydGV4TmFtZXMiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4IiwiZ2V0VmVydGV4TmFtZXMiLCJ2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZSIsImluY2x1ZGVzIiwib3JkZXJlZFZlcnRpY2VzIiwib3JkZXJlZFZlcnRleE5hbWVzIiwic3VjY2VzcyIsImFkZEVkZ2VCeVZlcnRleE5hbWVzIiwicmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMiLCJhZGRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJzb3VyY2VWZXJ0ZXhJbmRleCIsImdldEluZGV4IiwidGFyZ2V0VmVydGV4SW5kZXgiLCJpbnZhbGlkYXRpbmdFZGdlIiwiYWRkSW52YWxpZGF0aW5nRWRnZUJ5VmVydGljZXMiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwicmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwicmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhQcmVzZW50IiwicmVtb3ZlT3V0Z29pbmdFZGdlcyIsInRhcmdldFZlcnRleFByZXNlbnQiLCJyZW1vdmVJbmNvbWluZ0VkZ2VzIiwidmVydGV4TmFtZXNMZW5ndGgiLCJuYW1lIiwiaW5kZXgiLCJWZXJ0ZXgiLCJmcm9tTmFtZUFuZEluZGV4Iiwic2V0VmVydGV4QnlWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VzIiwiZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUiLCJnZXROYW1lIiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZSIsImZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImRlbGV0ZVZlcnRleEJ5VmVydGV4TmFtZSIsImRlbGV0ZWRWZXJ0ZXgiLCJkZWxldGVkVmVydGV4SW5kZXgiLCJhZmZlY3RlZFZlcnRpY2VzIiwicmVkdWNlIiwidmVydGV4SW5kZXgiLCJ2ZXJ0ZXhBZmZlY3RlZCIsImFmZmVjdGVkVmVydGV4IiwiZGVjcmVtZW50SW5kZXgiLCJkaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyIsInZlcnRleE1hcEZyb21PcmRlcmVkVmVydGljZXMiLCJhZGRFZGdlc1RvVmVydGljZXMiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJyZXRyaWV2ZUZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4IiwicmVzdWx0c0luQ3ljbGUiLCJiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwicmV0cmlldmVCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiY29uY2F0IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzIiwibWFwIiwiYWZmZWN0ZWRWZXJ0ZXhJbmRleCIsInNvcnQiLCJpbmRleEEiLCJpbmRleEIiLCJzZXRJbmRleCIsIm9yZGVyZWRWZXJ0ZXgiLCJmb3JFYWNoT3V0Z29pbmdFZGdlIiwib3V0Z29pbmdFZGdlIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7OztJQUVRQSxJLEdBQVNDLHlCLENBQVRELEk7O0lBRWFFLG9CO0FBQ25CLGdDQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBQ3JCLFNBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0Q7Ozs7OEJBRVM7QUFDUixVQUFNQyxRQUFRLEdBQUcsS0FBS0MsV0FBTCxFQUFqQjtBQUFBLFVBQ01DLGNBQWMsR0FBR0YsUUFBUSxDQUFDRyxNQURoQztBQUFBLFVBRU1DLEtBQUssR0FB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QUFBQSxTQUFTLENBQUNZLFVBQUQsQ0FBVCxHQUF3QkcsTUFBeEI7QUFDRCxHQU5EO0FBUUEsU0FBT2YsU0FBUDtBQUNEOztBQUVELFNBQVMrRixrQkFBVCxDQUE0QmpELGVBQTVCLEVBQTZDOUMsU0FBN0MsRUFBd0Q7QUFDdEQ4QyxFQUFBQSxlQUFlLENBQUNqQixPQUFoQixDQUF3QixVQUFDaUYsYUFBRCxFQUFtQjtBQUN6Q0EsSUFBQUEsYUFBYSxDQUFDQyxtQkFBZCxDQUFrQyxVQUFDQyxZQUFELEVBQWtCO0FBQ2xELFVBQU1sRixnQkFBZ0IsR0FBR2tGLFlBQVksQ0FBQzNFLG1CQUFiLEVBQXpCO0FBQUEsVUFDTVosZ0JBQWdCLEdBQUd1RixZQUFZLENBQUMxRSxtQkFBYixFQUR6QjtBQUFBLFVBRU1zQyw4QkFBOEIsR0FBRzlDLGdCQUZ2QztBQUFBLFVBRTBEO0FBQ3BEbUYsTUFBQUEsNEJBQTRCLEdBQUd4RixnQkFIckM7QUFBQSxVQUlNZ0MsMEJBQTBCLEdBQUd6RCxTQUFTLENBQUM0RSw4QkFBRCxDQUo1QztBQUFBLFVBSThFO0FBQ3hFbEIsTUFBQUEsd0JBQXdCLEdBQUcxRCxTQUFTLENBQUNpSCw0QkFBRCxDQUwxQyxDQURrRCxDQU13Qjs7QUFFMUV4RCxNQUFBQSwwQkFBMEIsQ0FBQ0UsMkJBQTNCLENBQXVERCx3QkFBdkQ7QUFFQUEsTUFBQUEsd0JBQXdCLENBQUNFLDZCQUF6QixDQUF1REgsMEJBQXZEO0FBQ0QsS0FYRDtBQVlELEdBYkQ7QUFjRCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IEVkZ2UgZnJvbSBcIi4vZWRnZVwiO1xuaW1wb3J0IFZlcnRleCBmcm9tIFwiLi92ZXJ0ZXhcIjtcblxuaW1wb3J0IHsgdmVydGV4TmFtZXNGcm9tVmVydGljZXMsIG9yZGVyVmVydGljZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvdmVydGV4XCI7XG5cbmNvbnN0IHsgbGFzdCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdGVkQWN5Y2xpY0dyYXBoIHtcbiAgY29uc3RydWN0b3IodmVydGV4TWFwKSB7XG4gICAgdGhpcy52ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXA7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5nZXRWZXJ0aWNlcygpLFxuICAgICAgICAgIHZlcnRpY2VzTGVuZ3RoID0gdmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKHZlcnRpY2VzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGdldFZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcFZhbHVlcyA9IE9iamVjdC52YWx1ZXModGhpcy52ZXJ0ZXhNYXApLFxuICAgICAgICAgIHZlcnRpY2VzID0gdmVydGV4TWFwVmFsdWVzOyAvLy9cblxuICAgIHJldHVybiB2ZXJ0aWNlcztcbiAgfVxuXG4gIGdldFZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgdmVydGV4TmFtZXMgPSB2ZXJ0ZXhNYXBLZXlzOyAgLy8vXG5cbiAgICByZXR1cm4gdmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0ZXhQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMoKTtcblxuICAgIHJldHVybiBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzKCk7XG5cbiAgICByZXR1cm4gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldFN1Y2Nlc3NvclZlcnRleE5hbWVzKCk7XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRFZGdlc0J5VGFyZ2V0VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZXMgPSBbXSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh0YXJnZXRWZXJ0ZXggIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB0YXJnZXRWZXJ0ZXguZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgc291cmNlVmVydGV4TmFtZXMgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzOyAgLy8vXG5cbiAgICAgIHNvdXJjZVZlcnRleE5hbWVzLmZvckVhY2goKHNvdXJjZVZlcnRleE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZWRnZSA9IEVkZ2UuZnJvbVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIGVkZ2VzLnB1c2goZWRnZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBnZXRFZGdlc0J5U291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZXMgPSBbXSxcbiAgICAgICAgICBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXggIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzID0gc291cmNlVmVydGV4LmdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lcyA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzOyAgLy8vXG5cbiAgICAgIHRhcmdldFZlcnRleE5hbWVzLmZvckVhY2goKHRhcmdldFZlcnRleE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZWRnZSA9IEVkZ2UuZnJvbVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIGVkZ2VzLnB1c2goZWRnZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBzZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSwgdmVydGV4KSB7XG4gICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH1cblxuICBkZWxldGVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnQoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICAgIFxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgZWRnZVByZXNlbnQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgIHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQgPSAoc291cmNlVmVydGV4ICE9PSBudWxsKSAmJiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgIHZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lID0gdmVydGV4TmFtZXMuaW5jbHVkZXModmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4UHJlc2VudCA9IHZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdmVydGV4UHJlc2VudDtcbiAgfVxuXG4gIGdldE9yZGVyZWRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKTtcblxuICAgIG9yZGVyVmVydGljZXModmVydGljZXMpO1xuXG4gICAgY29uc3Qgb3JkZXJlZFZlcnRpY2VzID0gdmVydGljZXMsIC8vL1xuICAgICAgICAgIG9yZGVyZWRWZXJ0ZXhOYW1lcyA9IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzKG9yZGVyZWRWZXJ0aWNlcyk7XG5cbiAgICByZXR1cm4gb3JkZXJlZFZlcnRleE5hbWVzO1xuICB9XG5cbiAgYWRkRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBzdWNjZXNzID0gdGhpcy5hZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKTtcblxuICAgIHRoaXMucmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gIH1cblxuICBhZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhOYW1lICE9PSB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXguaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICBcbiAgICAgIGlmIChlZGdlUHJlc2VudCkge1xuICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZVZlcnRleEluZGV4ID0gc291cmNlVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIHRhcmdldFZlcnRleEluZGV4ID0gdGFyZ2V0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIGludmFsaWRhdGluZ0VkZ2UgPSAoc291cmNlVmVydGV4SW5kZXggPiB0YXJnZXRWZXJ0ZXhJbmRleCk7XG5cbiAgICAgICAgc3VjY2VzcyA9IGludmFsaWRhdGluZ0VkZ2UgP1xuICAgICAgICAgICAgICAgICAgICBhZGRJbnZhbGlkYXRpbmdFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkgOlxuICAgICAgICAgICAgICAgICAgICAgIHRydWU7XG5cbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleCwgLy8vXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4OyAvLy9cblxuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAoZWRnZVByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlTb3VyY2VWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVPdXRnb2luZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRWRnZXNCeVRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHRhcmdldFZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh0YXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUluY29taW5nRWRnZXMoKTtcbiAgICB9XG4gIH1cblxuICBhZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICghdmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdmVydGV4TmFtZXMgPSB0aGlzLmdldFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgICB2ZXJ0ZXhOYW1lc0xlbmd0aCA9IHZlcnRleE5hbWVzLmxlbmd0aCxcbiAgICAgICAgICAgIG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbmRleCA9IHZlcnRleE5hbWVzTGVuZ3RoLCAvLy9cbiAgICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgICAgdGhpcy5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSwgdmVydGV4KTtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICByZW1vdmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGxldCByZW1vdmVkRWRnZXMgPSBudWxsO1xuXG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHZlcnRleFByZXNlbnQpIHtcbiAgICAgIHJlbW92ZWRFZGdlcyA9IFtdO1xuXG4gICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoKGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpID0+IHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkgPT4ge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSwgIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kZWxldGVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIGNvbnN0IGRlbGV0ZWRWZXJ0ZXggPSB2ZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgZGVsZXRlZFZlcnRleEluZGV4ID0gZGVsZXRlZFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgICAgICBhZmZlY3RlZFZlcnRpY2VzID0gdmVydGljZXMucmVkdWNlKChhZmZlY3RlZFZlcnRpY2VzLCB2ZXJ0ZXgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgdmVydGV4SW5kZXggPSB2ZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgICAgICAgdmVydGV4QWZmZWN0ZWQgPSAodmVydGV4SW5kZXggPiBkZWxldGVkVmVydGV4SW5kZXgpO1xuXG4gICAgICAgICAgICAgIGlmICh2ZXJ0ZXhBZmZlY3RlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4ID0gdmVydGV4OyAgLy8vXG5cbiAgICAgICAgICAgICAgICBhZmZlY3RlZFZlcnRpY2VzLnB1c2goYWZmZWN0ZWRWZXJ0ZXgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGljZXM7XG4gICAgICAgICAgICB9LCBbXSk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaCgoYWZmZWN0ZWRWZXJ0ZXgpID0+IGFmZmVjdGVkVmVydGV4LmRlY3JlbWVudEluZGV4KCkpO1xuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVkRWRnZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0ge30sXG4gICAgICAgICAgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcyk7XG5cbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG5cbiAgc3RhdGljIGZyb21PcmRlcmVkVmVydGljZXMob3JkZXJlZFZlcnRpY2VzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbU9yZGVyZWRWZXJ0aWNlcyhvcmRlcmVkVmVydGljZXMpO1xuICAgIFxuICAgIGFkZEVkZ2VzVG9WZXJ0aWNlcyhvcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCk7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcbiAgICBcbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkSW52YWxpZGF0aW5nRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpIHtcbiAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0YXJnZXRWZXJ0ZXgucmV0cmlldmVGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMoc291cmNlVmVydGV4KSxcbiAgICAgICAgbGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPSBsYXN0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgIHJlc3VsdHNJbkN5Y2xlID0gKGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuXG4gIGlmICghcmVzdWx0c0luQ3ljbGUpIHtcbiAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gc291cmNlVmVydGV4LnJldHJpZXZlQmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcygpO1xuXG4gICAgb3JkZXJWZXJ0aWNlcyhiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgIG9yZGVyVmVydGljZXMoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgIGNvbnN0IGFmZmVjdGVkVmVydGljZXMgPSBbXS5jb25jYXQoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcykuY29uY2F0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzID0gYWZmZWN0ZWRWZXJ0aWNlcy5tYXAoKGFmZmVjdGVkVmVydGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGV4SW5kZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICBhZmZlY3RlZFZlcnRleEluZGljZXMuc29ydCgoaW5kZXhBLCBpbmRleEIpID0+IChpbmRleEEgLSBpbmRleEIpKTtcblxuICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaCgoYWZmZWN0ZWRWZXJ0ZXgsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzW2luZGV4XTtcblxuICAgICAgYWZmZWN0ZWRWZXJ0ZXguc2V0SW5kZXgoYWZmZWN0ZWRWZXJ0ZXhJbmRleCk7XG4gICAgfSk7XG5cbiAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBzdWNjZXNzO1xufVxuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB2ZXJ0ZXhOYW1lcy5mb3JFYWNoKCh2ZXJ0ZXhOYW1lLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcbiAgXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21PcmRlcmVkVmVydGljZXMob3JkZXJlZFZlcnRpY2VzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgb3JkZXJlZFZlcnRpY2VzLmZvckVhY2goKG9yZGVyZWRWZXJ0ZXgsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IG9yZGVyZWRWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lID0gbmFtZTsgIC8vL1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcblxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiBhZGRFZGdlc1RvVmVydGljZXMob3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApIHtcbiAgb3JkZXJlZFZlcnRpY2VzLmZvckVhY2goKG9yZGVyZWRWZXJ0ZXgpID0+IHtcbiAgICBvcmRlcmVkVmVydGV4LmZvckVhY2hPdXRnb2luZ0VkZ2UoKG91dGdvaW5nRWRnZSkgPT4ge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXhOYW1lLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSwgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZV07IC8vL1xuXG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=