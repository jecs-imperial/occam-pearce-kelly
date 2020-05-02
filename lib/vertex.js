"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var vertexUtilities = require("./utilities/vertex");

var vertexNamesFromVertices = vertexUtilities.vertexNamesFromVertices,
    topologicallyOrderVertices = vertexUtilities.topologicallyOrderVertices;

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
      topologicallyOrderVertices(predecessorVertices);
      var topologicallyOrderedPredecessorVertices = predecessorVertices,
          ///
      topologicallyOrderedPredecessorVertexNames = vertexNamesFromVertices(topologicallyOrderedPredecessorVertices);
      return topologicallyOrderedPredecessorVertexNames;
    }
  }, {
    key: "retrieveForwardsAffectedVertices",
    value: function retrieveForwardsAffectedVertices(sourceVertex) {
      var forwardsAffectedVertices = this.forwardsDepthFirstSearch(function (visitedVertex) {
        var terminate = visitedVertex === sourceVertex;
        return terminate;
      });
      return forwardsAffectedVertices;
    }
  }, {
    key: "retrieveBackwardsAffectedVertices",
    value: function retrieveBackwardsAffectedVertices() {
      var backwardsAffectedVertices = this.backwardsDepthFirstSearch(function (visitedVertex) {
        var terminate = false;
        return terminate;
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
        immediatePredecessorVertex.removeImmediateSuccessorVertex(immediateSuccessorVertex);
      });
      this.immediatePredecessorVertices = [];
    }
  }, {
    key: "removeOutgoingEdges",
    value: function removeOutgoingEdges() {
      var immediatePredecessorVertex = this; ///

      this.immediateSuccessorVertices.forEach(function (immediateSuccessorVertex) {
        immediateSuccessorVertex.removeImmediateSuccessorVertex(immediatePredecessorVertex);
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
        visitedVertex.resetVisited();
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
        visitedVertex.resetVisited();
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
            return terminate;
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
            return terminate;
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

module.exports = Vertex;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcnRleC5qcyJdLCJuYW1lcyI6WyJ2ZXJ0ZXhVdGlsaXRpZXMiLCJyZXF1aXJlIiwidmVydGV4TmFtZXNGcm9tVmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyIsIlZlcnRleCIsIm5hbWUiLCJpbmRleCIsInZpc2l0ZWQiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzTGVuZ3RoIiwibGVuZ3RoIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXNMZW5ndGgiLCJzdHJhbmRlZCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJtYXAiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiLCJwcmVkZWNlc3NvclZlcnRleE1hcCIsImZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInByZWRlY2Vzc29yVmVydGV4IiwicHJlZGVjZXNzb3JWZXJ0ZXhOYW1lIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJzdWNjZXNzb3JWZXJ0ZXhNYXAiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic3VjY2Vzc29yVmVydGV4Iiwic3VjY2Vzc29yVmVydGV4TmFtZSIsImdldFN1Y2Nlc3NvclZlcnRleE1hcCIsInByZWRlY2Vzc29yVmVydGljZXMiLCJnZXRQcmVkZWNlc3NvclZlcnRpY2VzIiwicHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsInN1Y2Nlc3NvclZlcnRpY2VzIiwiZ2V0U3VjY2Vzc29yVmVydGljZXMiLCJzdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsIk9iamVjdCIsImtleXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXgiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJmb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2giLCJ2aXNpdGVkVmVydGV4IiwidGVybWluYXRlIiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2giLCJ2ZXJ0ZXgiLCJ2ZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImluY2x1ZGVzIiwidmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic291cmNlVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZWRnZVByZXNlbnQiLCJ0YXJnZXRWZXJ0ZXgiLCJ0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImluZGV4T2YiLCJzdGFydCIsImRlbGV0ZUNvdW50Iiwic3BsaWNlIiwiZm9yRWFjaCIsInJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInB1c2giLCJjYWxsYmFjayIsInZpc2l0ZWRWZXJ0aWNlcyIsInJldHJpZXZlRm9yd2FyZHNWaXNpdGVkVmVydGljZXMiLCJyZXNldFZpc2l0ZWQiLCJyZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyIsInNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzb21lSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJzb21lIiwiZGVwZW5kZW5jeVZlcnRleCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQUVBLElBQU1BLGVBQWUsR0FBR0MsT0FBTyxDQUFDLG9C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U0FBUDtBQUNELFdBSkQ7QUFLRDtBQUNGOztBQUVELGFBQU9BLFNBQVA7QUFDRDs7O3NEQUVpQ29CLFEsRUFBVTtBQUMxQyxXQUFLMUQsNEJBQUwsQ0FBa0N1RCxPQUFsQyxDQUEwQ0csUUFBMUM7QUFDRDs7O29EQUUrQkEsUSxFQUFVO0FBQ3hDLFdBQUt6RCwwQkFBTCxDQUFnQ3NELE9BQWhDLENBQXdDRyxRQUF4QztBQUNEOzs7bURBRThCQSxRLEVBQVU7QUFDdkMsV0FBSzFELDRCQUFMLENBQWtDaUUsSUFBbEMsQ0FBdUNQLFFBQXZDO0FBQ0Q7OztpREFFNEJBLFEsRUFBVTtBQUNyQyxXQUFLekQsMEJBQUwsQ0FBZ0NnRSxJQUFoQyxDQUFxQ1AsUUFBckM7QUFDRDs7O21DQUVjO0FBQ2IsV0FBSzNELE9BQUwsR0FBZSxLQUFmO0FBQ0Q7OztxQ0FFdUJGLEksRUFBTUMsSyxFQUFPO0FBQ25DLFVBQU1DLE9BQU8sR0FBRyxLQUFoQjtBQUFBLFVBQXdCO0FBQ2xCQyxNQUFBQSw0QkFBNEIsR0FBRyxFQURyQztBQUFBLFVBRU1DLDBCQUEwQixHQUFHLEVBRm5DO0FBQUEsVUFHTWlFLGdCQUFnQixHQUFHLElBQUl0RSxNQUFKLENBQVdDLElBQVgsRUFBaUJDLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFpQ0MsNEJBQWpDLEVBQStEQywwQkFBL0QsQ0FIekI7QUFLQSxhQUFPaUUsZ0JBQVA7QUFDRDs7Ozs7O0FBR0hDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnhFLE1BQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IHZlcnRleFV0aWxpdGllcyA9IHJlcXVpcmUoXCIuL3V0aWxpdGllcy92ZXJ0ZXhcIik7XG5cbmNvbnN0IHsgdmVydGV4TmFtZXNGcm9tVmVydGljZXMsIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzIH0gPSB2ZXJ0ZXhVdGlsaXRpZXM7XG5cbmNsYXNzIFZlcnRleCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGluZGV4LCB2aXNpdGVkLCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMudmlzaXRlZCA9IHZpc2l0ZWQ7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleDtcbiAgfVxuXG4gIGlzVmlzaXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy52aXNpdGVkO1xuICB9XG5cbiAgaXNTdHJhbmRlZCgpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzTGVuZ3RoID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmxlbmd0aCxcbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlc0xlbmd0aCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgIHN0cmFuZGVkID0gKChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzTGVuZ3RoID09PSAwKSAmJiAoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXNMZW5ndGggPT09IDApKTtcblxuICAgIHJldHVybiBzdHJhbmRlZDtcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcmV0dXJuIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMgPSB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLm1hcChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICByZXR1cm4gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAocHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleCA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LCAvLy9cbiAgICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhNYXBbcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSA9IHByZWRlY2Vzc29yVmVydGV4O1xuXG4gICAgICBwcmVkZWNlc3NvclZlcnRleC5nZXRQcmVkZWNlc3NvclZlcnRleE1hcChwcmVkZWNlc3NvclZlcnRleE1hcCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXhNYXA7XG4gIH1cblxuICBnZXRTdWNjZXNzb3JWZXJ0ZXhNYXAoc3VjY2Vzc29yVmVydGV4TWFwID0ge30pIHtcbiAgICB0aGlzLmZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXggPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZSA9IHN1Y2Nlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgIHN1Y2Nlc3NvclZlcnRleE1hcFtzdWNjZXNzb3JWZXJ0ZXhOYW1lXSA9IHN1Y2Nlc3NvclZlcnRleDtcblxuICAgICAgc3VjY2Vzc29yVmVydGV4LmdldFN1Y2Nlc3NvclZlcnRleE1hcChzdWNjZXNzb3JWZXJ0ZXhNYXApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHRoaXMuZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcygpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSBwcmVkZWNlc3NvclZlcnRpY2VzLm1hcCgocHJlZGVjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TmFtZTtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3Qgc3VjY2Vzc29yVmVydGljZXMgPSB0aGlzLmdldFN1Y2Nlc3NvclZlcnRpY2VzKCksXG4gICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gc3VjY2Vzc29yVmVydGljZXMubWFwKChzdWNjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXhOYW1lID0gc3VjY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhOYW1lO1xuICAgICAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB0aGlzLmdldFByZWRlY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHByZWRlY2Vzc29yVmVydGV4TWFwKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRpY2VzID0gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcy5tYXAoZnVuY3Rpb24ocHJlZGVjZXNzb3JWZXJ0ZXhOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleCA9IHByZWRlY2Vzc29yVmVydGV4TWFwW3ByZWRlY2Vzc29yVmVydGV4TmFtZV07XG5cbiAgICAgICAgICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleDtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGljZXMoKSB7XG4gICAgY29uc3Qgc3VjY2Vzc29yVmVydGV4TWFwID0gdGhpcy5nZXRTdWNjZXNzb3JWZXJ0ZXhNYXAoKSxcbiAgICAgICAgICBzdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHN1Y2Nlc3NvclZlcnRleE1hcCksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGljZXMgPSBzdWNjZXNzb3JWZXJ0ZXhOYW1lcy5tYXAoZnVuY3Rpb24oc3VjY2Vzc29yVmVydGV4TmFtZSkge1xuICAgICAgICAgICAgY29uc3Qgc3VjY2Vzc29yVmVydGV4ID0gc3VjY2Vzc29yVmVydGV4TWFwW3N1Y2Nlc3NvclZlcnRleE5hbWVdO1xuICBcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRUb3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHRoaXMuZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcygpO1xuXG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMocHJlZGVjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGljZXMgPSBwcmVkZWNlc3NvclZlcnRpY2VzLCAgLy8vXG4gICAgICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdmVydGV4TmFtZXNGcm9tVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRpY2VzKTtcblxuICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cbiAgXG4gIHJldHJpZXZlRm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCkge1xuICAgIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRoaXMuZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGZ1bmN0aW9uKHZpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9ICh2aXNpdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cblxuICByZXRyaWV2ZUJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKSB7XG4gICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRoaXMuYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaChmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICBjb25zdCB0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcztcbiAgfVxuICBcbiAgaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCh2ZXJ0ZXgpIHtcbiAgICBjb25zdCB2ZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5pbmNsdWRlcyh2ZXJ0ZXgpO1xuXG4gICAgcmV0dXJuIHZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4O1xuICB9XG5cbiAgaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodmVydGV4KSB7XG4gICAgY29uc3QgdmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5pbmNsdWRlcyh2ZXJ0ZXgpO1xuXG4gICAgcmV0dXJuIHZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVNvdXJjZVZlcnRleChzb3VyY2VWZXJ0ZXgpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRoaXMuaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXg7IC8vL1xuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCkge1xuICAgIGNvbnN0IHRhcmdldFZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXMuaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHRhcmdldFZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleDsgLy8vXG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgc2V0SW5kZXgoaW5kZXgpIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gIH1cblxuICBzZXRWaXNpdGVkKHZpc2l0ZWQpIHtcbiAgICB0aGlzLnZpc2l0ZWQgPSB2aXNpdGVkO1xuICB9XG5cbiAgZGVjcmVtZW50SW5kZXgoKSB7XG4gICAgdGhpcy5pbmRleC0tO1xuICB9XG5cbiAgcmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5pbmRleE9mKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSxcbiAgICAgICAgICBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICB9XG5cbiAgcmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5pbmRleE9mKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCksXG4gICAgICAgICAgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gIH1cbiAgXG4gIHJlbW92ZUluY29taW5nRWRnZXMoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGhpczsgLy8vXG4gICAgXG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gW107XG4gIH1cblxuICByZW1vdmVPdXRnb2luZ0VkZ2VzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpczsgLy8vXG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBbXTtcbiAgfVxuXG4gIGFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnB1c2goaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICB9XG5cbiAgYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMucHVzaChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuICB9XG5cbiAgZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdmlzaXRlZFZlcnRpY2VzID0gW107XG5cbiAgICB0aGlzLnJldHJpZXZlRm9yd2FyZHNWaXNpdGVkVmVydGljZXMoZnVuY3Rpb24odmlzaXRlZFZlcnRleCkge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7ICAvLy9cblxuICAgICAgdmlzaXRlZFZlcnRpY2VzLnB1c2godmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICB2aXNpdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICB2aXNpdGVkVmVydGV4LnJlc2V0VmlzaXRlZCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZpc2l0ZWRWZXJ0aWNlcztcbiAgfVxuXG4gIGJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spIHtcbiAgICBjb25zdCB2aXNpdGVkVmVydGljZXMgPSBbXTtcblxuICAgIHRoaXMucmV0cmlldmVCYWNrd2FyZHNWaXNpdGVkVmVydGljZXMoZnVuY3Rpb24odmlzaXRlZFZlcnRleCkge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7ICAvLy9cblxuICAgICAgdmlzaXRlZFZlcnRpY2VzLnB1c2godmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICB2aXNpdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICB2aXNpdGVkVmVydGV4LnJlc2V0VmlzaXRlZCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZpc2l0ZWRWZXJ0aWNlcztcbiAgfVxuXG4gIHJldHJpZXZlRm9yd2FyZHNWaXNpdGVkVmVydGljZXMoY2FsbGJhY2spIHtcbiAgICBsZXQgdGVybWluYXRlID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy52aXNpdGVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy52aXNpdGVkID0gdHJ1ZTtcblxuICAgICAgY29uc3QgdmlzaXRlZFZlcnRleCA9IHRoaXM7ICAvLy9cblxuICAgICAgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIGlmICh0ZXJtaW5hdGUgIT09IHRydWUpIHtcbiAgICAgICAgdmlzaXRlZFZlcnRleC5zb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5yZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICByZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjaykge1xuICAgIGxldCB0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpc2l0ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuXG4gICAgICBjb25zdCB2aXNpdGVkVmVydGV4ID0gdGhpczsgIC8vL1xuXG4gICAgICB0ZXJtaW5hdGUgPSBjYWxsYmFjayh2aXNpdGVkVmVydGV4KTtcblxuICAgICAgaWYgKHRlcm1pbmF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICB2aXNpdGVkVmVydGV4LnNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICBmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuZm9yRWFjaChjYWxsYmFjayk7XG4gIH1cblxuICBmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5zb21lKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnNvbWUoY2FsbGJhY2spO1xuICB9XG5cbiAgcmVzZXRWaXNpdGVkKCkge1xuICAgIHRoaXMudmlzaXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpIHtcbiAgICBjb25zdCB2aXNpdGVkID0gZmFsc2UsICAvLy9cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gW10sXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBbXSxcbiAgICAgICAgICBkZXBlbmRlbmN5VmVydGV4ID0gbmV3IFZlcnRleChuYW1lLCBpbmRleCwgdmlzaXRlZCwgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcywgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIGRlcGVuZGVuY3lWZXJ0ZXg7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWZXJ0ZXg7XG4iXX0=