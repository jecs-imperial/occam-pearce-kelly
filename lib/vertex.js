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
    key: "getTopologicallyOrderedPredecessorVertexNames",
    value: function getTopologicallyOrderedPredecessorVertexNames() {
      var predecessorVertices = this.getPredecessorVertices();
      (0, _vertex.topologicallyOrderVertices)(predecessorVertices);
      var topologicallyOrderedPredecessorVertices = predecessorVertices,
          ///
      topologicallyOrderedPredecessorVertexNames = (0, _vertex.vertexNamesFromVertices)(topologicallyOrderedPredecessorVertices);
      return topologicallyOrderedPredecessorVertexNames;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnRleC5qcyJdLCJuYW1lcyI6WyJWZXJ0ZXgiLCJuYW1lIiwiaW5kZXgiLCJ2aXNpdGVkIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlc0xlbmd0aCIsImxlbmd0aCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzTGVuZ3RoIiwic3RyYW5kZWQiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwibWFwIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUiLCJnZXROYW1lIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lIiwicHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJwcmVkZWNlc3NvclZlcnRleCIsInByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldFByZWRlY2Vzc29yVmVydGV4TWFwIiwic3VjY2Vzc29yVmVydGV4TWFwIiwiZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInN1Y2Nlc3NvclZlcnRleCIsInN1Y2Nlc3NvclZlcnRleE5hbWUiLCJnZXRTdWNjZXNzb3JWZXJ0ZXhNYXAiLCJwcmVkZWNlc3NvclZlcnRpY2VzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcyIsInByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJzdWNjZXNzb3JWZXJ0aWNlcyIsImdldFN1Y2Nlc3NvclZlcnRpY2VzIiwic3VjY2Vzc29yVmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwic291cmNlVmVydGV4IiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoIiwidmlzaXRlZFZlcnRleCIsInRlcm1pbmF0ZSIsImJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJiYWNrd2FyZHNEZXB0aEZpcnN0U2VhcmNoIiwidmVydGV4IiwidmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbmNsdWRlcyIsInZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImVkZ2VQcmVzZW50IiwidGFyZ2V0VmVydGV4IiwidGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbmRleE9mIiwic3RhcnQiLCJkZWxldGVDb3VudCIsInNwbGljZSIsImZvckVhY2giLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJwdXNoIiwiY2FsbGJhY2siLCJ2aXNpdGVkVmVydGljZXMiLCJyZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzIiwicmVzZXRWaXNpdGVkIiwicmV0cmlldmVCYWNrd2FyZHNWaXNpdGVkVmVydGljZXMiLCJzb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4Iiwic29tZSIsImRlcGVuZGVuY3lWZXJ0ZXgiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7Ozs7Ozs7O0lBRXFCQSxNO0FBQ25CLGtCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUF5QkMsT0FBekIsRUFBa0NDLDRCQUFsQyxFQUFnRUMsMEJBQWhFLEVBQTRGO0FBQUE7O0FBQzFGLFNBQUtKLElBQUwsR0FBWUEsSUFBWjtBQUNB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QUNEOzs7b0RBRStCQSxRLEVBQVU7QUFDeEMsV0FBS3pELDBCQUFMLENBQWdDc0QsT0FBaEMsQ0FBd0NHLFFBQXhDO0FBQ0Q7OzttREFFOEJBLFEsRUFBVTtBQUN2QyxXQUFLMUQsNEJBQUwsQ0FBa0NpRSxJQUFsQyxDQUF1Q1AsUUFBdkM7QUFDRDs7O2lEQUU0QkEsUSxFQUFVO0FBQ3JDLFdBQUt6RCwwQkFBTCxDQUFnQ2dFLElBQWhDLENBQXFDUCxRQUFyQztBQUNEOzs7bUNBRWM7QUFDYixXQUFLM0QsT0FBTCxHQUFlLEtBQWY7QUFDRDs7O3FDQUV1QkYsSSxFQUFNQyxLLEVBQU87QUFDbkMsVUFBTUMsT0FBTyxHQUFHLEtBQWhCO0FBQUEsVUFBd0I7QUFDbEJDLE1BQUFBLDRCQUE0QixHQUFHLEVBRHJDO0FBQUEsVUFFTUMsMEJBQTBCLEdBQUcsRUFGbkM7QUFBQSxVQUdNaUUsZ0JBQWdCLEdBQUcsSUFBSXRFLE1BQUosQ0FBV0MsSUFBWCxFQUFpQkMsS0FBakIsRUFBd0JDLE9BQXhCLEVBQWlDQyw0QkFBakMsRUFBK0RDLDBCQUEvRCxDQUh6QjtBQUtBLGFBQU9pRSxnQkFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzLCB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyB9IGZyb20gXCIuL3V0aWxpdGllcy92ZXJ0ZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVydGV4IHtcbiAgY29uc3RydWN0b3IobmFtZSwgaW5kZXgsIHZpc2l0ZWQsIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMsIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZDtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzO1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4O1xuICB9XG5cbiAgaXNWaXNpdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnZpc2l0ZWQ7XG4gIH1cblxuICBpc1N0cmFuZGVkKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXNMZW5ndGggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzTGVuZ3RoID0gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5sZW5ndGgsXG4gICAgICAgICAgc3RyYW5kZWQgPSAoKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXNMZW5ndGggPT09IDApICYmIChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlc0xlbmd0aCA9PT0gMCkpO1xuXG4gICAgcmV0dXJuIHN0cmFuZGVkO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLm1hcCgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcmV0dXJuIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMgPSB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLm1hcCgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSA9PiB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcmV0dXJuIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TWFwKHByZWRlY2Vzc29yVmVydGV4TWFwID0ge30pIHtcbiAgICB0aGlzLmZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4ID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gcHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICBwcmVkZWNlc3NvclZlcnRleE1hcFtwcmVkZWNlc3NvclZlcnRleE5hbWVdID0gcHJlZGVjZXNzb3JWZXJ0ZXg7XG5cbiAgICAgIHByZWRlY2Vzc29yVmVydGV4LmdldFByZWRlY2Vzc29yVmVydGV4TWFwKHByZWRlY2Vzc29yVmVydGV4TWFwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRleE1hcChzdWNjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSA9PiB7XG4gICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXggPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZSA9IHN1Y2Nlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgIHN1Y2Nlc3NvclZlcnRleE1hcFtzdWNjZXNzb3JWZXJ0ZXhOYW1lXSA9IHN1Y2Nlc3NvclZlcnRleDtcblxuICAgICAgc3VjY2Vzc29yVmVydGV4LmdldFN1Y2Nlc3NvclZlcnRleE1hcChzdWNjZXNzb3JWZXJ0ZXhNYXApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHRoaXMuZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcygpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSBwcmVkZWNlc3NvclZlcnRpY2VzLm1hcCgocHJlZGVjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TmFtZTtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3Qgc3VjY2Vzc29yVmVydGljZXMgPSB0aGlzLmdldFN1Y2Nlc3NvclZlcnRpY2VzKCksXG4gICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gc3VjY2Vzc29yVmVydGljZXMubWFwKChzdWNjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXhOYW1lID0gc3VjY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhOYW1lO1xuICAgICAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB0aGlzLmdldFByZWRlY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHByZWRlY2Vzc29yVmVydGV4TWFwKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRpY2VzID0gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcy5tYXAoKHByZWRlY2Vzc29yVmVydGV4TmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXggPSBwcmVkZWNlc3NvclZlcnRleE1hcFtwcmVkZWNlc3NvclZlcnRleE5hbWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleE1hcCA9IHRoaXMuZ2V0U3VjY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyhzdWNjZXNzb3JWZXJ0ZXhNYXApLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRpY2VzID0gc3VjY2Vzc29yVmVydGV4TmFtZXMubWFwKChzdWNjZXNzb3JWZXJ0ZXhOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXggPSBzdWNjZXNzb3JWZXJ0ZXhNYXBbc3VjY2Vzc29yVmVydGV4TmFtZV07XG4gIFxuICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleDtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRpY2VzID0gdGhpcy5nZXRQcmVkZWNlc3NvclZlcnRpY2VzKCk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhwcmVkZWNlc3NvclZlcnRpY2VzKTtcblxuICAgIGNvbnN0IHRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHByZWRlY2Vzc29yVmVydGljZXMsICAvLy9cbiAgICAgICAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIHRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuICBcbiAgcmV0cmlldmVGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMoc291cmNlVmVydGV4KSB7XG4gICAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGhpcy5mb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goKHZpc2l0ZWRWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9ICh2aXNpdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgICAgXG4gICAgICBpZiAodGVybWluYXRlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cblxuICByZXRyaWV2ZUJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKSB7XG4gICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRoaXMuYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaCgodmlzaXRlZFZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gZmFsc2U7XG5cbiAgICAgIGlmICh0ZXJtaW5hdGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cbiAgXG4gIGlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgodmVydGV4KSB7XG4gICAgY29uc3QgdmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuaW5jbHVkZXModmVydGV4KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleDtcbiAgfVxuXG4gIGlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHZlcnRleCkge1xuICAgIGNvbnN0IHZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5jbHVkZXModmVydGV4KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXg7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlTb3VyY2VWZXJ0ZXgoc291cmNlVmVydGV4KSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzLmlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4OyAvLy9cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzLmlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXg7IC8vL1xuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHNldEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgc2V0VmlzaXRlZCh2aXNpdGVkKSB7XG4gICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZDtcbiAgfVxuXG4gIGRlY3JlbWVudEluZGV4KCkge1xuICAgIHRoaXMuaW5kZXgtLTtcbiAgfVxuXG4gIHJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuaW5kZXhPZihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCksXG4gICAgICAgICAgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgfVxuXG4gIHJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5kZXhPZihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpLFxuICAgICAgICAgIHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICB9XG4gIFxuICByZW1vdmVJbmNvbWluZ0VkZ2VzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXM7IC8vL1xuICAgIFxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkgPT4gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkpO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gW107XG4gIH1cblxuICByZW1vdmVPdXRnb2luZ0VkZ2VzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpczsgLy8vXG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmZvckVhY2goKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkgPT4gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkpO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IFtdO1xuICB9XG5cbiAgYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMucHVzaChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gIH1cblxuICBhZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5wdXNoKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG4gIH1cblxuICBmb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spIHtcbiAgICBjb25zdCB2aXNpdGVkVmVydGljZXMgPSBbXTtcblxuICAgIHRoaXMucmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcygodmlzaXRlZFZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7ICAvLy9cblxuICAgICAgdmlzaXRlZFZlcnRpY2VzLnB1c2godmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICB2aXNpdGVkVmVydGljZXMuZm9yRWFjaCgodmlzaXRlZFZlcnRleCkgPT4gdmlzaXRlZFZlcnRleC5yZXNldFZpc2l0ZWQoKSk7XG5cbiAgICByZXR1cm4gdmlzaXRlZFZlcnRpY2VzO1xuICB9XG5cbiAgYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaChjYWxsYmFjaykge1xuICAgIGNvbnN0IHZpc2l0ZWRWZXJ0aWNlcyA9IFtdO1xuXG4gICAgdGhpcy5yZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcygodmlzaXRlZFZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7ICAvLy9cblxuICAgICAgdmlzaXRlZFZlcnRpY2VzLnB1c2godmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICB2aXNpdGVkVmVydGljZXMuZm9yRWFjaCgodmlzaXRlZFZlcnRleCkgPT4gdmlzaXRlZFZlcnRleC5yZXNldFZpc2l0ZWQoKSk7XG5cbiAgICByZXR1cm4gdmlzaXRlZFZlcnRpY2VzO1xuICB9XG5cbiAgcmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjaykge1xuICAgIGxldCB0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpc2l0ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuXG4gICAgICBjb25zdCB2aXNpdGVkVmVydGV4ID0gdGhpczsgIC8vL1xuXG4gICAgICB0ZXJtaW5hdGUgPSBjYWxsYmFjayh2aXNpdGVkVmVydGV4KTtcblxuICAgICAgaWYgKHRlcm1pbmF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICB2aXNpdGVkVmVydGV4LnNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkgPT4ge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5yZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIGlmICh0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgfVxuXG4gIHJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMudmlzaXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudmlzaXRlZCA9IHRydWU7XG5cbiAgICAgIGNvbnN0IHZpc2l0ZWRWZXJ0ZXggPSB0aGlzOyAgLy8vXG5cbiAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICBpZiAodGVybWluYXRlICE9PSB0cnVlKSB7XG4gICAgICAgIHZpc2l0ZWRWZXJ0ZXguc29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkgPT4ge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIGlmICh0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgfVxuXG4gIGZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmZvckVhY2goY2FsbGJhY2spO1xuICB9XG5cbiAgc29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnNvbWUoY2FsbGJhY2spO1xuICB9XG5cbiAgc29tZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuc29tZShjYWxsYmFjayk7XG4gIH1cblxuICByZXNldFZpc2l0ZWQoKSB7XG4gICAgdGhpcy52aXNpdGVkID0gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IHZpc2l0ZWQgPSBmYWxzZSwgIC8vL1xuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMgPSBbXSxcbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IFtdLFxuICAgICAgICAgIGRlcGVuZGVuY3lWZXJ0ZXggPSBuZXcgVmVydGV4KG5hbWUsIGluZGV4LCB2aXNpdGVkLCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICByZXR1cm4gZGVwZW5kZW5jeVZlcnRleDtcbiAgfVxufVxuIl19