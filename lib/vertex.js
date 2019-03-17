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
    key: 'getImmediatePredecessorVertexNames',
    value: function getImmediatePredecessorVertexNames() {
      var immediatePredecessorVertexNames = this.immediatePredecessorVertices.map(function (immediatePredecessorVertex) {
        var immediatePredecessorVertexName = immediatePredecessorVertex.getName();

        return immediatePredecessorVertexName;
      });

      return immediatePredecessorVertexNames;
    }
  }, {
    key: 'getImmediateSuccessorVertexNames',
    value: function getImmediateSuccessorVertexNames() {
      var immediateSuccessorVertexNames = this.immediateSuccessorVertices.map(function (immediateSuccessorVertex) {
        var immediateSuccessorVertexName = immediateSuccessorVertex.getName();

        return immediateSuccessorVertexName;
      });

      return immediateSuccessorVertexNames;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi92ZXJ0ZXguanMiXSwibmFtZXMiOlsidmVydGV4VXRpbGl0aWVzIiwicmVxdWlyZSIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJWZXJ0ZXgiLCJuYW1lIiwiaW5kZXgiLCJ2aXNpdGVkIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlc0xlbmd0aCIsImxlbmd0aCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzTGVuZ3RoIiwic3RyYW5kZWQiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwibWFwIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUiLCJnZXROYW1lIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lIiwicHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJwcmVkZWNlc3NvclZlcnRleCIsInByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldFByZWRlY2Vzc29yVmVydGljZXMiLCJzdWNjZXNzb3JWZXJ0ZXhNYXAiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic3VjY2Vzc29yVmVydGV4Iiwic3VjY2Vzc29yVmVydGV4TmFtZSIsImdldFN1Y2Nlc3NvclZlcnRpY2VzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJwcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsInByZWRlY2Vzc29yVmVydGljZXMiLCJnZXRTdWNjZXNzb3JWZXJ0ZXhNYXAiLCJzdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsInN1Y2Nlc3NvclZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwic291cmNlVmVydGV4IiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoIiwidmlzaXRlZFZlcnRleCIsInRlcm1pbmF0ZSIsImJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJiYWNrd2FyZHNEZXB0aEZpcnN0U2VhcmNoIiwidmVydGV4IiwidmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbmNsdWRlcyIsInZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImVkZ2VQcmVzZW50IiwidGFyZ2V0VmVydGV4IiwidGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbmRleE9mIiwic3RhcnQiLCJkZWxldGVDb3VudCIsInNwbGljZSIsImZvckVhY2giLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJwdXNoIiwiY2FsbGJhY2siLCJ2aXNpdGVkVmVydGljZXMiLCJyZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzIiwicmVzZXRWaXNpdGVkIiwicmV0cmlldmVCYWNrd2FyZHNWaXNpdGVkVmVydGljZXMiLCJzb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4Iiwic29tZSIsImRlcGVuZGVuY3lWZXJ0ZXgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCQyxRQUFRLG9CQUFS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RCw0QkFBTCxDQUFrQ3VELE9BQWxDLENBQTBDRyxRQUExQztBQUNEOzs7b0RBRStCQSxRLEVBQVU7QUFDeEMsV0FBS3pELDBCQUFMLENBQWdDc0QsT0FBaEMsQ0FBd0NHLFFBQXhDO0FBQ0Q7OzttREFFOEJBLFEsRUFBVTtBQUN2QyxXQUFLMUQsNEJBQUwsQ0FBa0NpRSxJQUFsQyxDQUF1Q1AsUUFBdkM7QUFDRDs7O2lEQUU0QkEsUSxFQUFVO0FBQ3JDLFdBQUt6RCwwQkFBTCxDQUFnQ2dFLElBQWhDLENBQXFDUCxRQUFyQztBQUNEOzs7bUNBRWM7QUFDYixXQUFLM0QsT0FBTCxHQUFlLEtBQWY7QUFDRDs7O3FDQUV1QkYsSSxFQUFNQyxLLEVBQU87QUFDbkMsVUFBTUMsVUFBVSxLQUFoQjtBQUFBLFVBQXdCO0FBQ2xCQyxxQ0FBK0IsRUFEckM7QUFBQSxVQUVNQyw2QkFBNkIsRUFGbkM7QUFBQSxVQUdNaUUsbUJBQW1CLElBQUl0RSxNQUFKLENBQVdDLElBQVgsRUFBaUJDLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFpQ0MsNEJBQWpDLEVBQStEQywwQkFBL0QsQ0FIekI7O0FBS0EsYUFBT2lFLGdCQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCeEUsTUFBakIiLCJmaWxlIjoidmVydGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB2ZXJ0ZXhVdGlsaXRpZXMgPSByZXF1aXJlKCcuL3V0aWxpdGllcy92ZXJ0ZXgnKTtcblxuY29uc3QgeyB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcywgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMgfSA9IHZlcnRleFV0aWxpdGllcztcblxuY2xhc3MgVmVydGV4IHtcbiAgY29uc3RydWN0b3IobmFtZSwgaW5kZXgsIHZpc2l0ZWQsIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMsIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZDtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzO1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4O1xuICB9XG5cbiAgaXNWaXNpdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnZpc2l0ZWQ7XG4gIH1cblxuICBpc1N0cmFuZGVkKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXNMZW5ndGggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzTGVuZ3RoID0gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5sZW5ndGgsXG4gICAgICAgICAgc3RyYW5kZWQgPSAoKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXNMZW5ndGggPT09IDApICYmIChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlc0xlbmd0aCA9PT0gMCkpO1xuXG4gICAgcmV0dXJuIHN0cmFuZGVkO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLm1hcChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICByZXR1cm4gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMubWFwKGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgIHJldHVybiBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRleE1hcChwcmVkZWNlc3NvclZlcnRleE1hcCA9IHt9KSB7XG4gICAgdGhpcy5mb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4ID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gcHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICBwcmVkZWNlc3NvclZlcnRleE1hcFtwcmVkZWNlc3NvclZlcnRleE5hbWVdID0gcHJlZGVjZXNzb3JWZXJ0ZXg7XG5cbiAgICAgIHByZWRlY2Vzc29yVmVydGV4LmdldFByZWRlY2Vzc29yVmVydGljZXMocHJlZGVjZXNzb3JWZXJ0ZXhNYXApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TWFwO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TWFwKHN1Y2Nlc3NvclZlcnRleE1hcCA9IHt9KSB7XG4gICAgdGhpcy5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgICAgY29uc3Qgc3VjY2Vzc29yVmVydGV4ID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LCAvLy9cbiAgICAgICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWUgPSBzdWNjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICBzdWNjZXNzb3JWZXJ0ZXhNYXBbc3VjY2Vzc29yVmVydGV4TmFtZV0gPSBzdWNjZXNzb3JWZXJ0ZXg7XG5cbiAgICAgIHN1Y2Nlc3NvclZlcnRleC5nZXRTdWNjZXNzb3JWZXJ0aWNlcyhzdWNjZXNzb3JWZXJ0ZXhNYXApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleE1hcDtcbiAgfVxuICBcbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcygpIHtcbiAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleE1hcCA9IHRoaXMuZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAoKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRleE5hbWVzID0gT2JqZWN0LmtleXMocHJlZGVjZXNzb3JWZXJ0ZXhNYXApLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGljZXMgPSBwcmVkZWNlc3NvclZlcnRleE5hbWVzLm1hcChmdW5jdGlvbihwcmVkZWNlc3NvclZlcnRleE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4ID0gcHJlZGVjZXNzb3JWZXJ0ZXhNYXBbcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4O1xuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRTdWNjZXNzb3JWZXJ0aWNlcygpIHtcbiAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXhNYXAgPSB0aGlzLmdldFN1Y2Nlc3NvclZlcnRleE1hcCgpLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gT2JqZWN0LmtleXMoc3VjY2Vzc29yVmVydGV4TWFwKSxcbiAgICAgICAgICBzdWNjZXNzb3JWZXJ0aWNlcyA9IHN1Y2Nlc3NvclZlcnRleE5hbWVzLm1hcChmdW5jdGlvbihzdWNjZXNzb3JWZXJ0ZXhOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXggPSBzdWNjZXNzb3JWZXJ0ZXhNYXBbc3VjY2Vzc29yVmVydGV4TmFtZV07XG4gIFxuICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleDtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRpY2VzID0gdGhpcy5nZXRQcmVkZWNlc3NvclZlcnRpY2VzKCk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhwcmVkZWNlc3NvclZlcnRpY2VzKTtcblxuICAgIGNvbnN0IHRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHByZWRlY2Vzc29yVmVydGljZXMsICAvLy9cbiAgICAgICAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIHRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuICBcbiAgcmV0cmlldmVGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMoc291cmNlVmVydGV4KSB7XG4gICAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGhpcy5mb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goZnVuY3Rpb24odmlzaXRlZFZlcnRleCkge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gKHZpc2l0ZWRWZXJ0ZXggPT09IHNvdXJjZVZlcnRleCk7XG4gICAgICBcbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcztcbiAgfVxuXG4gIHJldHJpZXZlQmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcygpIHtcbiAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGhpcy5iYWNrd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGZ1bmN0aW9uKHZpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgXG4gICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICB9XG4gIFxuICBpc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHZlcnRleCkge1xuICAgIGNvbnN0IHZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmluY2x1ZGVzKHZlcnRleCk7XG5cbiAgICByZXR1cm4gdmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXg7XG4gIH1cblxuICBpc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh2ZXJ0ZXgpIHtcbiAgICBjb25zdCB2ZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmluY2x1ZGVzKHZlcnRleCk7XG5cbiAgICByZXR1cm4gdmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5U291cmNlVmVydGV4KHNvdXJjZVZlcnRleCkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpcy5pc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleDsgLy8vXG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KSB7XG4gICAgY29uc3QgdGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGhpcy5pc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gdGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4OyAvLy9cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBzZXRJbmRleChpbmRleCkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIHNldFZpc2l0ZWQodmlzaXRlZCkge1xuICAgIHRoaXMudmlzaXRlZCA9IHZpc2l0ZWQ7XG4gIH1cblxuICBkZWNyZW1lbnRJbmRleCgpIHtcbiAgICB0aGlzLmluZGV4LS07XG4gIH1cblxuICByZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmluZGV4T2YoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpLFxuICAgICAgICAgIHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gIH1cblxuICByZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmluZGV4T2YoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSxcbiAgICAgICAgICBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgfVxuICBcbiAgcmVtb3ZlSW5jb21pbmdFZGdlcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzOyAvLy9cbiAgICBcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMgPSBbXTtcbiAgfVxuXG4gIHJlbW92ZU91dGdvaW5nRWRnZXMoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzOyAvLy9cblxuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IFtdO1xuICB9XG5cbiAgYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMucHVzaChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gIH1cblxuICBhZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5wdXNoKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG4gIH1cblxuICBmb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spIHtcbiAgICBjb25zdCB2aXNpdGVkVmVydGljZXMgPSBbXTtcblxuICAgIHRoaXMucmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICBjb25zdCB0ZXJtaW5hdGUgPSBjYWxsYmFjayh2aXNpdGVkVmVydGV4KTsgIC8vL1xuXG4gICAgICB2aXNpdGVkVmVydGljZXMucHVzaCh2aXNpdGVkVmVydGV4KTtcblxuICAgICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgICB9KTtcblxuICAgIHZpc2l0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHZpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIHZpc2l0ZWRWZXJ0ZXgucmVzZXRWaXNpdGVkKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmlzaXRlZFZlcnRpY2VzO1xuICB9XG5cbiAgYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaChjYWxsYmFjaykge1xuICAgIGNvbnN0IHZpc2l0ZWRWZXJ0aWNlcyA9IFtdO1xuXG4gICAgdGhpcy5yZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICBjb25zdCB0ZXJtaW5hdGUgPSBjYWxsYmFjayh2aXNpdGVkVmVydGV4KTsgIC8vL1xuXG4gICAgICB2aXNpdGVkVmVydGljZXMucHVzaCh2aXNpdGVkVmVydGV4KTtcblxuICAgICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgICB9KTtcblxuICAgIHZpc2l0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHZpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIHZpc2l0ZWRWZXJ0ZXgucmVzZXRWaXNpdGVkKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdmlzaXRlZFZlcnRpY2VzO1xuICB9XG5cbiAgcmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjaykge1xuICAgIGxldCB0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpc2l0ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuXG4gICAgICBjb25zdCB2aXNpdGVkVmVydGV4ID0gdGhpczsgIC8vL1xuXG4gICAgICB0ZXJtaW5hdGUgPSBjYWxsYmFjayh2aXNpdGVkVmVydGV4KTtcblxuICAgICAgaWYgKHRlcm1pbmF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICB2aXNpdGVkVmVydGV4LnNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgICAgICAgdGVybWluYXRlID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LnJldHJpZXZlRm9yd2FyZHNWaXNpdGVkVmVydGljZXMoY2FsbGJhY2spO1xuXG4gICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgfVxuXG4gIHJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMudmlzaXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudmlzaXRlZCA9IHRydWU7XG5cbiAgICAgIGNvbnN0IHZpc2l0ZWRWZXJ0ZXggPSB0aGlzOyAgLy8vXG5cbiAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICBpZiAodGVybWluYXRlICE9PSB0cnVlKSB7XG4gICAgICAgIHZpc2l0ZWRWZXJ0ZXguc29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICAgICAgdGVybWluYXRlID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmV0cmlldmVCYWNrd2FyZHNWaXNpdGVkVmVydGljZXMoY2FsbGJhY2spO1xuXG4gICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgfVxuXG4gIGZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmZvckVhY2goY2FsbGJhY2spO1xuICB9XG5cbiAgc29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnNvbWUoY2FsbGJhY2spO1xuICB9XG5cbiAgc29tZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuc29tZShjYWxsYmFjayk7XG4gIH1cblxuICByZXNldFZpc2l0ZWQoKSB7XG4gICAgdGhpcy52aXNpdGVkID0gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IHZpc2l0ZWQgPSBmYWxzZSwgIC8vL1xuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMgPSBbXSxcbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IFtdLFxuICAgICAgICAgIGRlcGVuZGVuY3lWZXJ0ZXggPSBuZXcgVmVydGV4KG5hbWUsIGluZGV4LCB2aXNpdGVkLCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICByZXR1cm4gZGVwZW5kZW5jeVZlcnRleDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZlcnRleDtcbiJdfQ==