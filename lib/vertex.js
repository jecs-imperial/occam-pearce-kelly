'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vertexUtilities = require('./utilities/vertex');

var vertexNamesFromVertices = vertexUtilities.vertexNamesFromVertices,
    topologicallyOrderVertices = vertexUtilities.topologicallyOrderVertices;

var Vertex = function () {
  function Vertex(name, index, visited, immediatePredecessorVertices, immediateSuccessorVertices) {
    _classCallCheck(this, Vertex);

    this.name = name;
    this.index = index;
    this.visited = visited;
    this.immediatePredecessorVertices = immediatePredecessorVertices;
    this.immediateSuccessorVertices = immediateSuccessorVertices;
  }

  _createClass(Vertex, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }, {
    key: 'getIndex',
    value: function getIndex() {
      return this.index;
    }
  }, {
    key: 'isVisited',
    value: function isVisited() {
      return this.visited;
    }
  }, {
    key: 'isStranded',
    value: function isStranded() {
      var immediatePredecessorVerticesLength = this.immediatePredecessorVertices.length,
          immediateSuccessorVerticesLength = this.immediateSuccessorVertices.length,
          stranded = immediatePredecessorVerticesLength === 0 && immediateSuccessorVerticesLength === 0;

      return stranded;
    }
  }, {
    key: 'getImmediatePredecessorVertices',
    value: function getImmediatePredecessorVertices() {
      return this.immediatePredecessorVertices;
    }
  }, {
    key: 'getImmediateSuccessorVertices',
    value: function getImmediateSuccessorVertices() {
      return this.immediateSuccessorVertices;
    }
  }, {
    key: 'getPredecessorVertexMap',
    value: function getPredecessorVertexMap() {
      var predecessorVertexMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.forEachImmediatePredecessorVertex(function (immediatePredecessorVertex) {
        var predecessorVertex = immediatePredecessorVertex,
            ///
        predecessorVertexName = predecessorVertex.getName();

        predecessorVertexMap[predecessorVertexName] = predecessorVertex;

        predecessorVertex.getPredecessorVertices(predecessorVertexMap);
      });

      return predecessorVertexMap;
    }
  }, {
    key: 'getSuccessorVertexMap',
    value: function getSuccessorVertexMap() {
      var successorVertexMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.forEachImmediateSuccessorVertex(function (immediateSuccessorVertex) {
        var successorVertex = immediateSuccessorVertex,
            ///
        successorVertexName = successorVertex.getName();

        successorVertexMap[successorVertexName] = successorVertex;

        successorVertex.getSuccessorVertices(successorVertexMap);
      });

      return successorVertexMap;
    }
  }, {
    key: 'getPredecessorVertices',
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
    key: 'getSuccessorVertices',
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
    key: 'getTopologicallyOrderedPredecessorVertexNames',
    value: function getTopologicallyOrderedPredecessorVertexNames() {
      var predecessorVertices = this.getPredecessorVertices();

      topologicallyOrderVertices(predecessorVertices);

      var topologicallyOrderedPredecessorVertices = predecessorVertices,
          ///
      topologicallyOrderedPredecessorVertexNames = vertexNamesFromVertices(topologicallyOrderedPredecessorVertices);

      return topologicallyOrderedPredecessorVertexNames;
    }
  }, {
    key: 'retrieveForwardsAffectedVertices',
    value: function retrieveForwardsAffectedVertices(sourceVertex) {
      var forwardsAffectedVertices = this.forwardsDepthFirstSearch(function (visitedVertex) {
        var terminate = visitedVertex === sourceVertex;

        return terminate;
      });

      return forwardsAffectedVertices;
    }
  }, {
    key: 'retrieveBackwardsAffectedVertices',
    value: function retrieveBackwardsAffectedVertices() {
      var backwardsAffectedVertices = this.backwardsDepthFirstSearch(function (visitedVertex) {
        var terminate = false;

        return terminate;
      });

      return backwardsAffectedVertices;
    }
  }, {
    key: 'isVertexImmediatePredecessorVertex',
    value: function isVertexImmediatePredecessorVertex(vertex) {
      var vertexImmediatePredecessorVertex = this.immediatePredecessorVertices.includes(vertex);

      return vertexImmediatePredecessorVertex;
    }
  }, {
    key: 'isVertexImmediateSuccessorVertex',
    value: function isVertexImmediateSuccessorVertex(vertex) {
      var vertexImmediateSuccessorVertex = this.immediateSuccessorVertices.includes(vertex);

      return vertexImmediateSuccessorVertex;
    }
  }, {
    key: 'isEdgePresentBySourceVertex',
    value: function isEdgePresentBySourceVertex(sourceVertex) {
      var sourceVertexImmediatePredecessorVertex = this.isVertexImmediatePredecessorVertex(sourceVertex),
          edgePresent = sourceVertexImmediatePredecessorVertex; ///

      return edgePresent;
    }
  }, {
    key: 'isEdgePresentByTargetVertex',
    value: function isEdgePresentByTargetVertex(targetVertex) {
      var targetVertexImmediateSuccessorVertex = this.isVertexImmediateSuccessorVertex(targetVertex),
          edgePresent = targetVertexImmediateSuccessorVertex; ///

      return edgePresent;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: 'setIndex',
    value: function setIndex(index) {
      this.index = index;
    }
  }, {
    key: 'setVisited',
    value: function setVisited(visited) {
      this.visited = visited;
    }
  }, {
    key: 'decrementIndex',
    value: function decrementIndex() {
      this.index--;
    }
  }, {
    key: 'removeImmediatePredecessorVertex',
    value: function removeImmediatePredecessorVertex(immediatePredecessorVertex) {
      var index = this.immediatePredecessorVertices.indexOf(immediatePredecessorVertex),
          start = index,
          ///
      deleteCount = 1;

      this.immediatePredecessorVertices.splice(start, deleteCount);
    }
  }, {
    key: 'removeImmediateSuccessorVertex',
    value: function removeImmediateSuccessorVertex(immediateSuccessorVertex) {
      var index = this.immediateSuccessorVertices.indexOf(immediateSuccessorVertex),
          start = index,
          ///
      deleteCount = 1;

      this.immediateSuccessorVertices.splice(start, deleteCount);
    }
  }, {
    key: 'removeIncomingEdges',
    value: function removeIncomingEdges() {
      var immediateSuccessorVertex = this; ///

      this.immediatePredecessorVertices.forEach(function (immediatePredecessorVertex) {
        immediatePredecessorVertex.removeImmediateSuccessorVertex(immediateSuccessorVertex);
      });

      this.immediatePredecessorVertices = [];
    }
  }, {
    key: 'removeOutgoingEdges',
    value: function removeOutgoingEdges() {
      var immediatePredecessorVertex = this; ///

      this.immediateSuccessorVertices.forEach(function (immediateSuccessorVertex) {
        immediateSuccessorVertex.removeImmediateSuccessorVertex(immediatePredecessorVertex);
      });

      this.immediateSuccessorVertices = [];
    }
  }, {
    key: 'addImmediatePredecessorVertex',
    value: function addImmediatePredecessorVertex(immediatePredecessorVertex) {
      this.immediatePredecessorVertices.push(immediatePredecessorVertex);
    }
  }, {
    key: 'addImmediateSuccessorVertex',
    value: function addImmediateSuccessorVertex(immediateSuccessorVertex) {
      this.immediateSuccessorVertices.push(immediateSuccessorVertex);
    }
  }, {
    key: 'forwardsDepthFirstSearch',
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
    key: 'backwardsDepthFirstSearch',
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
    key: 'retrieveForwardsVisitedVertices',
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
    key: 'retrieveBackwardsVisitedVertices',
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
    key: 'forEachImmediatePredecessorVertex',
    value: function forEachImmediatePredecessorVertex(callback) {
      this.immediatePredecessorVertices.forEach(callback);
    }
  }, {
    key: 'forEachImmediateSuccessorVertex',
    value: function forEachImmediateSuccessorVertex(callback) {
      this.immediateSuccessorVertices.forEach(callback);
    }
  }, {
    key: 'someImmediatePredecessorVertex',
    value: function someImmediatePredecessorVertex(callback) {
      this.immediatePredecessorVertices.some(callback);
    }
  }, {
    key: 'someImmediateSuccessorVertex',
    value: function someImmediateSuccessorVertex(callback) {
      this.immediateSuccessorVertices.some(callback);
    }
  }, {
    key: 'resetVisited',
    value: function resetVisited() {
      this.visited = false;
    }
  }], [{
    key: 'fromNameAndIndex',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi92ZXJ0ZXguanMiXSwibmFtZXMiOlsidmVydGV4VXRpbGl0aWVzIiwicmVxdWlyZSIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJWZXJ0ZXgiLCJuYW1lIiwiaW5kZXgiLCJ2aXNpdGVkIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlc0xlbmd0aCIsImxlbmd0aCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzTGVuZ3RoIiwic3RyYW5kZWQiLCJwcmVkZWNlc3NvclZlcnRleE1hcCIsImZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwicHJlZGVjZXNzb3JWZXJ0ZXgiLCJwcmVkZWNlc3NvclZlcnRleE5hbWUiLCJnZXROYW1lIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcyIsInN1Y2Nlc3NvclZlcnRleE1hcCIsImZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzdWNjZXNzb3JWZXJ0ZXgiLCJzdWNjZXNzb3JWZXJ0ZXhOYW1lIiwiZ2V0U3VjY2Vzc29yVmVydGljZXMiLCJnZXRQcmVkZWNlc3NvclZlcnRleE1hcCIsInByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwicHJlZGVjZXNzb3JWZXJ0aWNlcyIsIm1hcCIsImdldFN1Y2Nlc3NvclZlcnRleE1hcCIsInN1Y2Nlc3NvclZlcnRleE5hbWVzIiwic3VjY2Vzc29yVmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXgiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJmb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2giLCJ2aXNpdGVkVmVydGV4IiwidGVybWluYXRlIiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2giLCJ2ZXJ0ZXgiLCJ2ZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImluY2x1ZGVzIiwidmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic291cmNlVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZWRnZVByZXNlbnQiLCJ0YXJnZXRWZXJ0ZXgiLCJ0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImluZGV4T2YiLCJzdGFydCIsImRlbGV0ZUNvdW50Iiwic3BsaWNlIiwiZm9yRWFjaCIsInJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInB1c2giLCJjYWxsYmFjayIsInZpc2l0ZWRWZXJ0aWNlcyIsInJldHJpZXZlRm9yd2FyZHNWaXNpdGVkVmVydGljZXMiLCJyZXNldFZpc2l0ZWQiLCJyZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyIsInNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzb21lSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJzb21lIiwiZGVwZW5kZW5jeVZlcnRleCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxrQkFBa0JDLFFBQVEsb0JBQVIsQ0FBeEI7O0lBRVFDLHVCLEdBQXdERixlLENBQXhERSx1QjtJQUF5QkMsMEIsR0FBK0JILGUsQ0FBL0JHLDBCOztJQUUzQkMsTTtBQUNKLGtCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUF5QkMsT0FBekIsRUFBa0NDLDRCQUFs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QS9ELENBSHpCOztBQUtBLGFBQU82RCxnQkFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQnBFLE1BQWpCIiwiZmlsZSI6InZlcnRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdmVydGV4VXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvdmVydGV4Jyk7XG5cbmNvbnN0IHsgdmVydGV4TmFtZXNGcm9tVmVydGljZXMsIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzIH0gPSB2ZXJ0ZXhVdGlsaXRpZXM7XG5cbmNsYXNzIFZlcnRleCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGluZGV4LCB2aXNpdGVkLCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMudmlzaXRlZCA9IHZpc2l0ZWQ7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleDtcbiAgfVxuXG4gIGlzVmlzaXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy52aXNpdGVkO1xuICB9XG5cbiAgaXNTdHJhbmRlZCgpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzTGVuZ3RoID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmxlbmd0aCxcbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlc0xlbmd0aCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgIHN0cmFuZGVkID0gKChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzTGVuZ3RoID09PSAwKSAmJiAoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXNMZW5ndGggPT09IDApKTtcblxuICAgIHJldHVybiBzdHJhbmRlZDtcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAocHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleCA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LCAvLy9cbiAgICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhNYXBbcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSA9IHByZWRlY2Vzc29yVmVydGV4O1xuXG4gICAgICBwcmVkZWNlc3NvclZlcnRleC5nZXRQcmVkZWNlc3NvclZlcnRpY2VzKHByZWRlY2Vzc29yVmVydGV4TWFwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRleE1hcChzdWNjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleCA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCwgLy8vXG4gICAgICAgICAgICBzdWNjZXNzb3JWZXJ0ZXhOYW1lID0gc3VjY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgc3VjY2Vzc29yVmVydGV4TWFwW3N1Y2Nlc3NvclZlcnRleE5hbWVdID0gc3VjY2Vzc29yVmVydGV4O1xuXG4gICAgICBzdWNjZXNzb3JWZXJ0ZXguZ2V0U3VjY2Vzc29yVmVydGljZXMoc3VjY2Vzc29yVmVydGV4TWFwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhNYXA7XG4gIH1cbiAgXG4gIGdldFByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB0aGlzLmdldFByZWRlY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHByZWRlY2Vzc29yVmVydGV4TWFwKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRpY2VzID0gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcy5tYXAoZnVuY3Rpb24ocHJlZGVjZXNzb3JWZXJ0ZXhOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleCA9IHByZWRlY2Vzc29yVmVydGV4TWFwW3ByZWRlY2Vzc29yVmVydGV4TmFtZV07XG5cbiAgICAgICAgICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleDtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGljZXMoKSB7XG4gICAgY29uc3Qgc3VjY2Vzc29yVmVydGV4TWFwID0gdGhpcy5nZXRTdWNjZXNzb3JWZXJ0ZXhNYXAoKSxcbiAgICAgICAgICBzdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHN1Y2Nlc3NvclZlcnRleE1hcCksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGljZXMgPSBzdWNjZXNzb3JWZXJ0ZXhOYW1lcy5tYXAoZnVuY3Rpb24oc3VjY2Vzc29yVmVydGV4TmFtZSkge1xuICAgICAgICAgICAgY29uc3Qgc3VjY2Vzc29yVmVydGV4ID0gc3VjY2Vzc29yVmVydGV4TWFwW3N1Y2Nlc3NvclZlcnRleE5hbWVdO1xuICBcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRUb3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHRoaXMuZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcygpO1xuXG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMocHJlZGVjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGljZXMgPSBwcmVkZWNlc3NvclZlcnRpY2VzLCAgLy8vXG4gICAgICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdmVydGV4TmFtZXNGcm9tVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRpY2VzKTtcblxuICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cbiAgXG4gIHJldHJpZXZlRm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCkge1xuICAgIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRoaXMuZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGZ1bmN0aW9uKHZpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9ICh2aXNpdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgICAgXG4gICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cblxuICByZXRyaWV2ZUJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKSB7XG4gICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRoaXMuYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaChmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICBjb25zdCB0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcztcbiAgfVxuICBcbiAgaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCh2ZXJ0ZXgpIHtcbiAgICBjb25zdCB2ZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5pbmNsdWRlcyh2ZXJ0ZXgpO1xuXG4gICAgcmV0dXJuIHZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4O1xuICB9XG5cbiAgaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodmVydGV4KSB7XG4gICAgY29uc3QgdmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5pbmNsdWRlcyh2ZXJ0ZXgpO1xuXG4gICAgcmV0dXJuIHZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVNvdXJjZVZlcnRleChzb3VyY2VWZXJ0ZXgpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRoaXMuaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXg7IC8vL1xuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCkge1xuICAgIGNvbnN0IHRhcmdldFZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXMuaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHRhcmdldFZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleDsgLy8vXG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgc2V0SW5kZXgoaW5kZXgpIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gIH1cblxuICBzZXRWaXNpdGVkKHZpc2l0ZWQpIHtcbiAgICB0aGlzLnZpc2l0ZWQgPSB2aXNpdGVkO1xuICB9XG5cbiAgZGVjcmVtZW50SW5kZXgoKSB7XG4gICAgdGhpcy5pbmRleC0tO1xuICB9XG5cbiAgcmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5pbmRleE9mKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSxcbiAgICAgICAgICBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICB9XG5cbiAgcmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5pbmRleE9mKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCksXG4gICAgICAgICAgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gIH1cbiAgXG4gIHJlbW92ZUluY29taW5nRWRnZXMoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGhpczsgLy8vXG4gICAgXG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gW107XG4gIH1cblxuICByZW1vdmVPdXRnb2luZ0VkZ2VzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpczsgLy8vXG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBbXTtcbiAgfVxuXG4gIGFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnB1c2goaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICB9XG5cbiAgYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMucHVzaChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuICB9XG5cbiAgZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdmlzaXRlZFZlcnRpY2VzID0gW107XG5cbiAgICB0aGlzLnJldHJpZXZlRm9yd2FyZHNWaXNpdGVkVmVydGljZXMoZnVuY3Rpb24odmlzaXRlZFZlcnRleCkge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7ICAvLy9cblxuICAgICAgdmlzaXRlZFZlcnRpY2VzLnB1c2godmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICB2aXNpdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICB2aXNpdGVkVmVydGV4LnJlc2V0VmlzaXRlZCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZpc2l0ZWRWZXJ0aWNlcztcbiAgfVxuXG4gIGJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spIHtcbiAgICBjb25zdCB2aXNpdGVkVmVydGljZXMgPSBbXTtcblxuICAgIHRoaXMucmV0cmlldmVCYWNrd2FyZHNWaXNpdGVkVmVydGljZXMoZnVuY3Rpb24odmlzaXRlZFZlcnRleCkge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7ICAvLy9cblxuICAgICAgdmlzaXRlZFZlcnRpY2VzLnB1c2godmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICB2aXNpdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICB2aXNpdGVkVmVydGV4LnJlc2V0VmlzaXRlZCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHZpc2l0ZWRWZXJ0aWNlcztcbiAgfVxuXG4gIHJldHJpZXZlRm9yd2FyZHNWaXNpdGVkVmVydGljZXMoY2FsbGJhY2spIHtcbiAgICBsZXQgdGVybWluYXRlID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy52aXNpdGVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy52aXNpdGVkID0gdHJ1ZTtcblxuICAgICAgY29uc3QgdmlzaXRlZFZlcnRleCA9IHRoaXM7ICAvLy9cblxuICAgICAgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIGlmICh0ZXJtaW5hdGUgIT09IHRydWUpIHtcbiAgICAgICAgdmlzaXRlZFZlcnRleC5zb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5yZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICByZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjaykge1xuICAgIGxldCB0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpc2l0ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuXG4gICAgICBjb25zdCB2aXNpdGVkVmVydGV4ID0gdGhpczsgIC8vL1xuXG4gICAgICB0ZXJtaW5hdGUgPSBjYWxsYmFjayh2aXNpdGVkVmVydGV4KTtcblxuICAgICAgaWYgKHRlcm1pbmF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICB2aXNpdGVkVmVydGV4LnNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICBmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuZm9yRWFjaChjYWxsYmFjayk7XG4gIH1cblxuICBmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5zb21lKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnNvbWUoY2FsbGJhY2spO1xuICB9XG5cbiAgcmVzZXRWaXNpdGVkKCkge1xuICAgIHRoaXMudmlzaXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpIHtcbiAgICBjb25zdCB2aXNpdGVkID0gZmFsc2UsICAvLy9cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gW10sXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBbXSxcbiAgICAgICAgICBkZXBlbmRlbmN5VmVydGV4ID0gbmV3IFZlcnRleChuYW1lLCBpbmRleCwgdmlzaXRlZCwgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcywgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIGRlcGVuZGVuY3lWZXJ0ZXg7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWZXJ0ZXg7XG4iXX0=