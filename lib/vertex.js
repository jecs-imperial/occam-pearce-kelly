"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vertex = require("./utilities/vertex");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vertex = /*#__PURE__*/function () {
  function Vertex(name, index, visited, immediatePredecessorVertices, immediateSuccessorVertices) {
    _classCallCheck(this, Vertex);

    this.name = name;
    this.index = index;
    this.visited = visited;
    this.immediatePredecessorVertices = immediatePredecessorVertices;
    this.immediateSuccessorVertices = immediateSuccessorVertices;
  }

  _createClass(Vertex, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index;
    }
  }, {
    key: "isVisited",
    value: function isVisited() {
      return this.visited;
    }
  }, {
    key: "isStranded",
    value: function isStranded() {
      var immediatePredecessorVerticesLength = this.immediatePredecessorVertices.length,
          immediateSuccessorVerticesLength = this.immediateSuccessorVertices.length,
          stranded = immediatePredecessorVerticesLength === 0 && immediateSuccessorVerticesLength === 0;
      return stranded;
    }
  }, {
    key: "getImmediatePredecessorVertexNames",
    value: function getImmediatePredecessorVertexNames() {
      var immediatePredecessorVertexNames = this.immediatePredecessorVertices.map(function (immediatePredecessorVertex) {
        var immediatePredecessorVertexName = immediatePredecessorVertex.getName();
        return immediatePredecessorVertexName;
      });
      return immediatePredecessorVertexNames;
    }
  }, {
    key: "getImmediateSuccessorVertexNames",
    value: function getImmediateSuccessorVertexNames() {
      var immediateSuccessorVertexNames = this.immediateSuccessorVertices.map(function (immediateSuccessorVertex) {
        var immediateSuccessorVertexName = immediateSuccessorVertex.getName();
        return immediateSuccessorVertexName;
      });
      return immediateSuccessorVertexNames;
    }
  }, {
    key: "getImmediatePredecessorVertices",
    value: function getImmediatePredecessorVertices() {
      return this.immediatePredecessorVertices;
    }
  }, {
    key: "getImmediateSuccessorVertices",
    value: function getImmediateSuccessorVertices() {
      return this.immediateSuccessorVertices;
    }
  }, {
    key: "getPredecessorVertexMap",
    value: function getPredecessorVertexMap() {
      var predecessorVertexMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.forEachImmediatePredecessorVertex(function (immediatePredecessorVertex) {
        var predecessorVertex = immediatePredecessorVertex,
            ///
        predecessorVertexName = predecessorVertex.getName();
        predecessorVertexMap[predecessorVertexName] = predecessorVertex;
        predecessorVertex.getPredecessorVertexMap(predecessorVertexMap);
      });
      return predecessorVertexMap;
    }
  }, {
    key: "getSuccessorVertexMap",
    value: function getSuccessorVertexMap() {
      var successorVertexMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.forEachImmediateSuccessorVertex(function (immediateSuccessorVertex) {
        var successorVertex = immediateSuccessorVertex,
            ///
        successorVertexName = successorVertex.getName();
        successorVertexMap[successorVertexName] = successorVertex;
        successorVertex.getSuccessorVertexMap(successorVertexMap);
      });
      return successorVertexMap;
    }
  }, {
    key: "getPredecessorVertexNames",
    value: function getPredecessorVertexNames() {
      var predecessorVertices = this.getPredecessorVertices(),
          predecessorVertexNames = predecessorVertices.map(function (predecessorVertex) {
        var predecessorVertexName = predecessorVertex.getName();
        return predecessorVertexName;
      });
      return predecessorVertexNames;
    }
  }, {
    key: "getSuccessorVertexNames",
    value: function getSuccessorVertexNames() {
      var successorVertices = this.getSuccessorVertices(),
          successorVertexNames = successorVertices.map(function (successorVertex) {
        var successorVertexName = successorVertex.getName();
        return successorVertexName;
      });
      return successorVertexNames;
    }
  }, {
    key: "getPredecessorVertices",
    value: function getPredecessorVertices() {
      var predecessorVertexMap = this.getPredecessorVertexMap(),
          predecessorVertexNames = Object.keys(predecessorVertexMap),
          predecessorVertices = predecessorVertexNames.map(function (predecessorVertexName) {
        var predecessorVertex = predecessorVertexMap[predecessorVertexName];
        return predecessorVertex;
      });
      return predecessorVertices;
    }
  }, {
    key: "getSuccessorVertices",
    value: function getSuccessorVertices() {
      var successorVertexMap = this.getSuccessorVertexMap(),
          successorVertexNames = Object.keys(successorVertexMap),
          successorVertices = successorVertexNames.map(function (successorVertexName) {
        var successorVertex = successorVertexMap[successorVertexName];
        return successorVertex;
      });
      return successorVertices;
    }
  }, {
    key: "getOrderedPredecessorVertexNames",
    value: function getOrderedPredecessorVertexNames() {
      var predecessorVertices = this.getPredecessorVertices();
      (0, _vertex.orderVertices)(predecessorVertices);
      var orderedPredecessorVertices = predecessorVertices,
          ///
      orderedPredecessorVertexNames = (0, _vertex.vertexNamesFromVertices)(orderedPredecessorVertices);
      return orderedPredecessorVertexNames;
    }
  }, {
    key: "retrieveForwardsAffectedVertices",
    value: function retrieveForwardsAffectedVertices(sourceVertex) {
      var forwardsAffectedVertices = this.forwardsDepthFirstSearch(function (visitedVertex) {
        var terminate = visitedVertex === sourceVertex;

        if (terminate) {
          return true;
        }
      });
      return forwardsAffectedVertices;
    }
  }, {
    key: "retrieveBackwardsAffectedVertices",
    value: function retrieveBackwardsAffectedVertices() {
      var backwardsAffectedVertices = this.backwardsDepthFirstSearch(function (visitedVertex) {
        var terminate = false;

        if (terminate) {
          return true;
        }
      });
      return backwardsAffectedVertices;
    }
  }, {
    key: "isVertexImmediatePredecessorVertex",
    value: function isVertexImmediatePredecessorVertex(vertex) {
      var vertexImmediatePredecessorVertex = this.immediatePredecessorVertices.includes(vertex);
      return vertexImmediatePredecessorVertex;
    }
  }, {
    key: "isVertexImmediateSuccessorVertex",
    value: function isVertexImmediateSuccessorVertex(vertex) {
      var vertexImmediateSuccessorVertex = this.immediateSuccessorVertices.includes(vertex);
      return vertexImmediateSuccessorVertex;
    }
  }, {
    key: "isEdgePresentBySourceVertex",
    value: function isEdgePresentBySourceVertex(sourceVertex) {
      var sourceVertexImmediatePredecessorVertex = this.isVertexImmediatePredecessorVertex(sourceVertex),
          edgePresent = sourceVertexImmediatePredecessorVertex; ///

      return edgePresent;
    }
  }, {
    key: "isEdgePresentByTargetVertex",
    value: function isEdgePresentByTargetVertex(targetVertex) {
      var targetVertexImmediateSuccessorVertex = this.isVertexImmediateSuccessorVertex(targetVertex),
          edgePresent = targetVertexImmediateSuccessorVertex; ///

      return edgePresent;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: "setIndex",
    value: function setIndex(index) {
      this.index = index;
    }
  }, {
    key: "setVisited",
    value: function setVisited(visited) {
      this.visited = visited;
    }
  }, {
    key: "decrementIndex",
    value: function decrementIndex() {
      this.index--;
    }
  }, {
    key: "removeImmediatePredecessorVertex",
    value: function removeImmediatePredecessorVertex(immediatePredecessorVertex) {
      var index = this.immediatePredecessorVertices.indexOf(immediatePredecessorVertex),
          start = index,
          ///
      deleteCount = 1;
      this.immediatePredecessorVertices.splice(start, deleteCount);
    }
  }, {
    key: "removeImmediateSuccessorVertex",
    value: function removeImmediateSuccessorVertex(immediateSuccessorVertex) {
      var index = this.immediateSuccessorVertices.indexOf(immediateSuccessorVertex),
          start = index,
          ///
      deleteCount = 1;
      this.immediateSuccessorVertices.splice(start, deleteCount);
    }
  }, {
    key: "removeIncomingEdges",
    value: function removeIncomingEdges() {
      var immediateSuccessorVertex = this; ///

      this.immediatePredecessorVertices.forEach(function (immediatePredecessorVertex) {
        return immediatePredecessorVertex.removeImmediateSuccessorVertex(immediateSuccessorVertex);
      });
      this.immediatePredecessorVertices = [];
    }
  }, {
    key: "removeOutgoingEdges",
    value: function removeOutgoingEdges() {
      var immediatePredecessorVertex = this; ///

      this.immediateSuccessorVertices.forEach(function (immediateSuccessorVertex) {
        return immediateSuccessorVertex.removeImmediateSuccessorVertex(immediatePredecessorVertex);
      });
      this.immediateSuccessorVertices = [];
    }
  }, {
    key: "addImmediatePredecessorVertex",
    value: function addImmediatePredecessorVertex(immediatePredecessorVertex) {
      this.immediatePredecessorVertices.push(immediatePredecessorVertex);
    }
  }, {
    key: "addImmediateSuccessorVertex",
    value: function addImmediateSuccessorVertex(immediateSuccessorVertex) {
      this.immediateSuccessorVertices.push(immediateSuccessorVertex);
    }
  }, {
    key: "forwardsDepthFirstSearch",
    value: function forwardsDepthFirstSearch(callback) {
      var visitedVertices = [];
      this.retrieveForwardsVisitedVertices(function (visitedVertex) {
        var terminate = callback(visitedVertex); ///

        visitedVertices.push(visitedVertex);
        return terminate;
      });
      visitedVertices.forEach(function (visitedVertex) {
        return visitedVertex.resetVisited();
      });
      return visitedVertices;
    }
  }, {
    key: "backwardsDepthFirstSearch",
    value: function backwardsDepthFirstSearch(callback) {
      var visitedVertices = [];
      this.retrieveBackwardsVisitedVertices(function (visitedVertex) {
        var terminate = callback(visitedVertex); ///

        visitedVertices.push(visitedVertex);
        return terminate;
      });
      visitedVertices.forEach(function (visitedVertex) {
        return visitedVertex.resetVisited();
      });
      return visitedVertices;
    }
  }, {
    key: "retrieveForwardsVisitedVertices",
    value: function retrieveForwardsVisitedVertices(callback) {
      var terminate = false;

      if (this.visited === false) {
        this.visited = true;
        var visitedVertex = this; ///

        terminate = callback(visitedVertex);

        if (terminate !== true) {
          visitedVertex.someImmediateSuccessorVertex(function (immediateSuccessorVertex) {
            terminate = immediateSuccessorVertex.retrieveForwardsVisitedVertices(callback);

            if (terminate) {
              return true;
            }
          });
        }
      }

      return terminate;
    }
  }, {
    key: "retrieveBackwardsVisitedVertices",
    value: function retrieveBackwardsVisitedVertices(callback) {
      var terminate = false;

      if (this.visited === false) {
        this.visited = true;
        var visitedVertex = this; ///

        terminate = callback(visitedVertex);

        if (terminate !== true) {
          visitedVertex.someImmediatePredecessorVertex(function (immediatePredecessorVertex) {
            terminate = immediatePredecessorVertex.retrieveBackwardsVisitedVertices(callback);

            if (terminate) {
              return true;
            }
          });
        }
      }

      return terminate;
    }
  }, {
    key: "forEachImmediatePredecessorVertex",
    value: function forEachImmediatePredecessorVertex(callback) {
      this.immediatePredecessorVertices.forEach(callback);
    }
  }, {
    key: "forEachImmediateSuccessorVertex",
    value: function forEachImmediateSuccessorVertex(callback) {
      this.immediateSuccessorVertices.forEach(callback);
    }
  }, {
    key: "someImmediatePredecessorVertex",
    value: function someImmediatePredecessorVertex(callback) {
      this.immediatePredecessorVertices.some(callback);
    }
  }, {
    key: "someImmediateSuccessorVertex",
    value: function someImmediateSuccessorVertex(callback) {
      this.immediateSuccessorVertices.some(callback);
    }
  }, {
    key: "resetVisited",
    value: function resetVisited() {
      this.visited = false;
    }
  }], [{
    key: "fromNameAndIndex",
    value: function fromNameAndIndex(name, index) {
      var visited = false,
          ///
      immediatePredecessorVertices = [],
          immediateSuccessorVertices = [],
          dependencyVertex = new Vertex(name, index, visited, immediatePredecessorVertices, immediateSuccessorVertices);
      return dependencyVertex;
    }
  }]);

  return Vertex;
}();

exports["default"] = Vertex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnRleC5qcyJdLCJuYW1lcyI6WyJWZXJ0ZXgiLCJuYW1lIiwiaW5kZXgiLCJ2aXNpdGVkIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlc0xlbmd0aCIsImxlbmd0aCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzTGVuZ3RoIiwic3RyYW5kZWQiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwibWFwIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUiLCJnZXROYW1lIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lIiwicHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJwcmVkZWNlc3NvclZlcnRleCIsInByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldFByZWRlY2Vzc29yVmVydGV4TWFwIiwic3VjY2Vzc29yVmVydGV4TWFwIiwiZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInN1Y2Nlc3NvclZlcnRleCIsInN1Y2Nlc3NvclZlcnRleE5hbWUiLCJnZXRTdWNjZXNzb3JWZXJ0ZXhNYXAiLCJwcmVkZWNlc3NvclZlcnRpY2VzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcyIsInByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJzdWNjZXNzb3JWZXJ0aWNlcyIsImdldFN1Y2Nlc3NvclZlcnRpY2VzIiwic3VjY2Vzc29yVmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwib3JkZXJlZFByZWRlY2Vzc29yVmVydGljZXMiLCJvcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsInNvdXJjZVZlcnRleCIsImZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImZvcndhcmRzRGVwdGhGaXJzdFNlYXJjaCIsInZpc2l0ZWRWZXJ0ZXgiLCJ0ZXJtaW5hdGUiLCJiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaCIsInZlcnRleCIsInZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW5jbHVkZXMiLCJ2ZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJlZGdlUHJlc2VudCIsInRhcmdldFZlcnRleCIsInRhcmdldFZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW5kZXhPZiIsInN0YXJ0IiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJmb3JFYWNoIiwicmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwicHVzaCIsImNhbGxiYWNrIiwidmlzaXRlZFZlcnRpY2VzIiwicmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyIsInJlc2V0VmlzaXRlZCIsInJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzIiwic29tZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInNvbWUiLCJkZXBlbmRlbmN5VmVydGV4Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOzs7Ozs7OztJQUVxQkEsTTtBQUNuQixrQkFBWUMsSUFBWixFQUFrQkMsS0FBbEIsRUFBeUJDLE9BQXpCLEVBQWtDQyw0QkFBbEMsRUFBZ0VDLDBCQUFoRSxFQUE0RjtBQUFBOztBQUMxRixTQUFLSixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFD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QUFLekQsMEJBQUwsQ0FBZ0NzRCxPQUFoQyxDQUF3Q0csUUFBeEM7QUFDRDs7O21EQUU4QkEsUSxFQUFVO0FBQ3ZDLFdBQUsxRCw0QkFBTCxDQUFrQ2lFLElBQWxDLENBQXVDUCxRQUF2QztBQUNEOzs7aURBRTRCQSxRLEVBQVU7QUFDckMsV0FBS3pELDBCQUFMLENBQWdDZ0UsSUFBaEMsQ0FBcUNQLFFBQXJDO0FBQ0Q7OzttQ0FFYztBQUNiLFdBQUszRCxPQUFMLEdBQWUsS0FBZjtBQUNEOzs7cUNBRXVCRixJLEVBQU1DLEssRUFBTztBQUNuQyxVQUFNQyxPQUFPLEdBQUcsS0FBaEI7QUFBQSxVQUF3QjtBQUNsQkMsTUFBQUEsNEJBQTRCLEdBQUcsRUFEckM7QUFBQSxVQUVNQywwQkFBMEIsR0FBRyxFQUZuQztBQUFBLFVBR01pRSxnQkFBZ0IsR0FBRyxJQUFJdEUsTUFBSixDQUFXQyxJQUFYLEVBQWlCQyxLQUFqQixFQUF3QkMsT0FBeEIsRUFBaUNDLDRCQUFqQyxFQUErREMsMEJBQS9ELENBSHpCO0FBS0EsYUFBT2lFLGdCQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgdmVydGV4TmFtZXNGcm9tVmVydGljZXMsIG9yZGVyVmVydGljZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvdmVydGV4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlcnRleCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGluZGV4LCB2aXNpdGVkLCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMudmlzaXRlZCA9IHZpc2l0ZWQ7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleDtcbiAgfVxuXG4gIGlzVmlzaXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy52aXNpdGVkO1xuICB9XG5cbiAgaXNTdHJhbmRlZCgpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzTGVuZ3RoID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmxlbmd0aCxcbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlc0xlbmd0aCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgIHN0cmFuZGVkID0gKChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzTGVuZ3RoID09PSAwKSAmJiAoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXNMZW5ndGggPT09IDApKTtcblxuICAgIHJldHVybiBzdHJhbmRlZDtcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5tYXAoKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSA9PiB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgIHJldHVybiBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzID0gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5tYXAoKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgIHJldHVybiBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRleE1hcChwcmVkZWNlc3NvclZlcnRleE1hcCA9IHt9KSB7XG4gICAgdGhpcy5mb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSA9PiB7XG4gICAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleCA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LCAvLy9cbiAgICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhNYXBbcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSA9IHByZWRlY2Vzc29yVmVydGV4O1xuXG4gICAgICBwcmVkZWNlc3NvclZlcnRleC5nZXRQcmVkZWNlc3NvclZlcnRleE1hcChwcmVkZWNlc3NvclZlcnRleE1hcCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXhNYXA7XG4gIH1cblxuICBnZXRTdWNjZXNzb3JWZXJ0ZXhNYXAoc3VjY2Vzc29yVmVydGV4TWFwID0ge30pIHtcbiAgICB0aGlzLmZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkgPT4ge1xuICAgICAgY29uc3Qgc3VjY2Vzc29yVmVydGV4ID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LCAvLy9cbiAgICAgICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWUgPSBzdWNjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICBzdWNjZXNzb3JWZXJ0ZXhNYXBbc3VjY2Vzc29yVmVydGV4TmFtZV0gPSBzdWNjZXNzb3JWZXJ0ZXg7XG5cbiAgICAgIHN1Y2Nlc3NvclZlcnRleC5nZXRTdWNjZXNzb3JWZXJ0ZXhNYXAoc3VjY2Vzc29yVmVydGV4TWFwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhNYXA7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGljZXMgPSB0aGlzLmdldFByZWRlY2Vzc29yVmVydGljZXMoKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRleE5hbWVzID0gcHJlZGVjZXNzb3JWZXJ0aWNlcy5tYXAoKHByZWRlY2Vzc29yVmVydGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleE5hbWUgPSBwcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWU7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRpY2VzID0gdGhpcy5nZXRTdWNjZXNzb3JWZXJ0aWNlcygpLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gc3VjY2Vzc29yVmVydGljZXMubWFwKChzdWNjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleE5hbWUgPSBzdWNjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TmFtZTtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB0aGlzLmdldFByZWRlY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHByZWRlY2Vzc29yVmVydGV4TWFwKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRpY2VzID0gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcy5tYXAoKHByZWRlY2Vzc29yVmVydGV4TmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXggPSBwcmVkZWNlc3NvclZlcnRleE1hcFtwcmVkZWNlc3NvclZlcnRleE5hbWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleE1hcCA9IHRoaXMuZ2V0U3VjY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyhzdWNjZXNzb3JWZXJ0ZXhNYXApLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRpY2VzID0gc3VjY2Vzc29yVmVydGV4TmFtZXMubWFwKChzdWNjZXNzb3JWZXJ0ZXhOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXggPSBzdWNjZXNzb3JWZXJ0ZXhNYXBbc3VjY2Vzc29yVmVydGV4TmFtZV07XG4gIFxuICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleDtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldE9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGljZXMgPSB0aGlzLmdldFByZWRlY2Vzc29yVmVydGljZXMoKTtcblxuICAgIG9yZGVyVmVydGljZXMocHJlZGVjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICBjb25zdCBvcmRlcmVkUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHByZWRlY2Vzc29yVmVydGljZXMsICAvLy9cbiAgICAgICAgICBvcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzKG9yZGVyZWRQcmVkZWNlc3NvclZlcnRpY2VzKTtcblxuICAgIHJldHVybiBvcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuICBcbiAgcmV0cmlldmVGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMoc291cmNlVmVydGV4KSB7XG4gICAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGhpcy5mb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goKHZpc2l0ZWRWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9ICh2aXNpdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgICAgXG4gICAgICBpZiAodGVybWluYXRlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cblxuICByZXRyaWV2ZUJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKSB7XG4gICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRoaXMuYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaCgodmlzaXRlZFZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gZmFsc2U7XG5cbiAgICAgIGlmICh0ZXJtaW5hdGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cbiAgXG4gIGlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgodmVydGV4KSB7XG4gICAgY29uc3QgdmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuaW5jbHVkZXModmVydGV4KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleDtcbiAgfVxuXG4gIGlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHZlcnRleCkge1xuICAgIGNvbnN0IHZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5jbHVkZXModmVydGV4KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXg7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlTb3VyY2VWZXJ0ZXgoc291cmNlVmVydGV4KSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzLmlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4OyAvLy9cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzLmlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXg7IC8vL1xuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHNldEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgc2V0VmlzaXRlZCh2aXNpdGVkKSB7XG4gICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZDtcbiAgfVxuXG4gIGRlY3JlbWVudEluZGV4KCkge1xuICAgIHRoaXMuaW5kZXgtLTtcbiAgfVxuXG4gIHJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuaW5kZXhPZihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCksXG4gICAgICAgICAgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgfVxuXG4gIHJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5kZXhPZihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpLFxuICAgICAgICAgIHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICB9XG4gIFxuICByZW1vdmVJbmNvbWluZ0VkZ2VzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXM7IC8vL1xuICAgIFxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkgPT4gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkpO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gW107XG4gIH1cblxuICByZW1vdmVPdXRnb2luZ0VkZ2VzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpczsgLy8vXG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmZvckVhY2goKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkgPT4gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkpO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IFtdO1xuICB9XG5cbiAgYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMucHVzaChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gIH1cblxuICBhZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5wdXNoKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG4gIH1cblxuICBmb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spIHtcbiAgICBjb25zdCB2aXNpdGVkVmVydGljZXMgPSBbXTtcblxuICAgIHRoaXMucmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcygodmlzaXRlZFZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7ICAvLy9cblxuICAgICAgdmlzaXRlZFZlcnRpY2VzLnB1c2godmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICB2aXNpdGVkVmVydGljZXMuZm9yRWFjaCgodmlzaXRlZFZlcnRleCkgPT4gdmlzaXRlZFZlcnRleC5yZXNldFZpc2l0ZWQoKSk7XG5cbiAgICByZXR1cm4gdmlzaXRlZFZlcnRpY2VzO1xuICB9XG5cbiAgYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaChjYWxsYmFjaykge1xuICAgIGNvbnN0IHZpc2l0ZWRWZXJ0aWNlcyA9IFtdO1xuXG4gICAgdGhpcy5yZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcygodmlzaXRlZFZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7ICAvLy9cblxuICAgICAgdmlzaXRlZFZlcnRpY2VzLnB1c2godmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICB2aXNpdGVkVmVydGljZXMuZm9yRWFjaCgodmlzaXRlZFZlcnRleCkgPT4gdmlzaXRlZFZlcnRleC5yZXNldFZpc2l0ZWQoKSk7XG5cbiAgICByZXR1cm4gdmlzaXRlZFZlcnRpY2VzO1xuICB9XG5cbiAgcmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjaykge1xuICAgIGxldCB0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpc2l0ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuXG4gICAgICBjb25zdCB2aXNpdGVkVmVydGV4ID0gdGhpczsgIC8vL1xuXG4gICAgICB0ZXJtaW5hdGUgPSBjYWxsYmFjayh2aXNpdGVkVmVydGV4KTtcblxuICAgICAgaWYgKHRlcm1pbmF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICB2aXNpdGVkVmVydGV4LnNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkgPT4ge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5yZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIGlmICh0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgfVxuXG4gIHJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMudmlzaXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudmlzaXRlZCA9IHRydWU7XG5cbiAgICAgIGNvbnN0IHZpc2l0ZWRWZXJ0ZXggPSB0aGlzOyAgLy8vXG5cbiAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICBpZiAodGVybWluYXRlICE9PSB0cnVlKSB7XG4gICAgICAgIHZpc2l0ZWRWZXJ0ZXguc29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkgPT4ge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIGlmICh0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgfVxuXG4gIGZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmZvckVhY2goY2FsbGJhY2spO1xuICB9XG5cbiAgc29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnNvbWUoY2FsbGJhY2spO1xuICB9XG5cbiAgc29tZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuc29tZShjYWxsYmFjayk7XG4gIH1cblxuICByZXNldFZpc2l0ZWQoKSB7XG4gICAgdGhpcy52aXNpdGVkID0gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IHZpc2l0ZWQgPSBmYWxzZSwgIC8vL1xuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMgPSBbXSxcbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IFtdLFxuICAgICAgICAgIGRlcGVuZGVuY3lWZXJ0ZXggPSBuZXcgVmVydGV4KG5hbWUsIGluZGV4LCB2aXNpdGVkLCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICByZXR1cm4gZGVwZW5kZW5jeVZlcnRleDtcbiAgfVxufVxuIl19