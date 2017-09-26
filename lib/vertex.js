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
    key: 'getPredecessorVertexNames',
    value: function getPredecessorVertexNames() {
      var predecessorVertices = this.getPredecessorVertices(),
          predecessorVertexNames = predecessorVertices.map(function (predecessorVertex) {
        var predecessorVertexName = predecessorVertex.getName();

        return predecessorVertexName;
      });

      return predecessorVertexNames;
    }
  }, {
    key: 'getSuccessorVertexNames',
    value: function getSuccessorVertexNames() {
      var successorVertices = this.getSuccessorVertices(),
          successorVertexNames = successorVertices.map(function (successorVertex) {
        var successorVertexName = successorVertex.getName();

        return successorVertexName;
      });

      return successorVertexNames;
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
      var forwardsAffectedVertices = this.forwardsDepthFirstSearch(function (forwardsVisitedVertex) {
        var terminate = forwardsVisitedVertex === sourceVertex;

        return terminate;
      });

      return forwardsAffectedVertices;
    }
  }, {
    key: 'retrieveBackwardsAffectedVertices',
    value: function retrieveBackwardsAffectedVertices() {
      var backwardsAffectedVertices = this.backwardsDepthFirstSearch(function (backwardsVisitedVertex) {
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
    key: 'resetVisited',
    value: function resetVisited() {
      this.visited = false;
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
      var forwardsVisitedVertices = [];

      this.retrieveForwardsVisitedVertices(function (forwardsVisitedVertex) {
        var terminate = callback(forwardsVisitedVertex); ///

        forwardsVisitedVertices.push(forwardsVisitedVertex);

        return terminate;
      });

      forwardsVisitedVertices.forEach(function (forwardsVisitedVertex) {
        forwardsVisitedVertex.resetVisited();
      });

      return forwardsVisitedVertices;
    }
  }, {
    key: 'backwardsDepthFirstSearch',
    value: function backwardsDepthFirstSearch(callback) {
      var backwardsVisitedVertices = [];

      this.retrieveBackwardsVisitedVertices(function (backwardsVisitedVertex) {
        var terminate = callback(backwardsVisitedVertex); ///

        backwardsVisitedVertices.push(backwardsVisitedVertex);

        return terminate;
      });

      backwardsVisitedVertices.forEach(function (backwardsVisitedVertex) {
        backwardsVisitedVertex.resetVisited();
      });

      return backwardsVisitedVertices;
    }
  }, {
    key: 'retrieveForwardsVisitedVertices',
    value: function retrieveForwardsVisitedVertices(callback) {
      var terminate = false;

      if (this.visited === false) {
        this.visited = true;

        var forwardsVisitedVertex = this; ///

        terminate = callback(forwardsVisitedVertex);

        if (terminate !== true) {
          this.someImmediateSuccessorVertex(function (immediateSuccessorVertex) {
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

        var backwardsVisitedVertex = this; ///

        terminate = callback(backwardsVisitedVertex);

        if (terminate !== true) {
          this.someImmediatePredecessorVertex(function (immediatePredecessorVertex) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi92ZXJ0ZXguanMiXSwibmFtZXMiOlsidmVydGV4VXRpbGl0aWVzIiwicmVxdWlyZSIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJWZXJ0ZXgiLCJuYW1lIiwiaW5kZXgiLCJ2aXNpdGVkIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzIiwicHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInByZWRlY2Vzc29yVmVydGV4IiwicHJlZGVjZXNzb3JWZXJ0ZXhOYW1lIiwiZ2V0TmFtZSIsImdldFByZWRlY2Vzc29yVmVydGljZXMiLCJzdWNjZXNzb3JWZXJ0ZXhNYXAiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic3VjY2Vzc29yVmVydGV4Iiwic3VjY2Vzc29yVmVydGV4TmFtZSIsImdldFN1Y2Nlc3NvclZlcnRpY2VzIiwicHJlZGVjZXNzb3JWZXJ0aWNlcyIsInByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJtYXAiLCJzdWNjZXNzb3JWZXJ0aWNlcyIsInN1Y2Nlc3NvclZlcnRleE5hbWVzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJPYmplY3QiLCJrZXlzIiwiZ2V0U3VjY2Vzc29yVmVydGV4TWFwIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwic291cmNlVmVydGV4IiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoIiwiZm9yd2FyZHNWaXNpdGVkVmVydGV4IiwidGVybWluYXRlIiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2giLCJiYWNrd2FyZHNWaXNpdGVkVmVydGV4IiwidmVydGV4IiwidmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbmNsdWRlcyIsInZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImVkZ2VQcmVzZW50IiwidGFyZ2V0VmVydGV4IiwidGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbmRleE9mIiwic3RhcnQiLCJkZWxldGVDb3VudCIsInNwbGljZSIsImZvckVhY2giLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJwdXNoIiwiY2FsbGJhY2siLCJmb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyIsInJldHJpZXZlRm9yd2FyZHNWaXNpdGVkVmVydGljZXMiLCJyZXNldFZpc2l0ZWQiLCJiYWNrd2FyZHNWaXNpdGVkVmVydGljZXMiLCJyZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyIsInNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzb21lSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJzb21lIiwiZGVwZW5kZW5jeVZlcnRleCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxrQkFBa0JDLFFBQVEsb0JBQVIsQ0FBeEI7O0lBRVFDLHVCLEdBQXdERixlLENBQXhERSx1QjtJQUF5QkMsMEIsR0FBK0JILGUsQ0FBL0JHLDBCOztJQUUzQkMsTTtBQUNKLGtCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUF5QkMsT0FBekIsRUFBa0NDLDRCQUFsQyxFQUFnRUMsMEJBQWhFLEVBQTRGO0FB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Q0FFdUJ0RCxJLEVBQU1DLEssRUFBTztBQUNuQyxVQUFNQyxVQUFVLEtBQWhCO0FBQUEsVUFBd0I7QUFDbEJDLHFDQUErQixFQURyQztBQUFBLFVBRU1DLDZCQUE2QixFQUZuQztBQUFBLFVBR00yRCxtQkFBbUIsSUFBSWhFLE1BQUosQ0FBV0MsSUFBWCxFQUFpQkMsS0FBakIsRUFBd0JDLE9BQXhCLEVBQWlDQyw0QkFBakMsRUFBK0RDLDBCQUEvRCxDQUh6Qjs7QUFLQSxhQUFPMkQsZ0JBQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJsRSxNQUFqQiIsImZpbGUiOiJ2ZXJ0ZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHZlcnRleFV0aWxpdGllcyA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL3ZlcnRleCcpO1xuXG5jb25zdCB7IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzLCB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyB9ID0gdmVydGV4VXRpbGl0aWVzO1xuXG5jbGFzcyBWZXJ0ZXgge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBpbmRleCwgdmlzaXRlZCwgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcywgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnZpc2l0ZWQgPSB2aXNpdGVkO1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXM7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gIH1cblxuICBpc1Zpc2l0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaXRlZDtcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAocHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleCA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LCAvLy9cbiAgICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhNYXBbcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSA9IHByZWRlY2Vzc29yVmVydGV4O1xuXG4gICAgICBwcmVkZWNlc3NvclZlcnRleC5nZXRQcmVkZWNlc3NvclZlcnRpY2VzKHByZWRlY2Vzc29yVmVydGV4TWFwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRleE1hcChzdWNjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleCA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCwgLy8vXG4gICAgICAgICAgICBzdWNjZXNzb3JWZXJ0ZXhOYW1lID0gc3VjY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgc3VjY2Vzc29yVmVydGV4TWFwW3N1Y2Nlc3NvclZlcnRleE5hbWVdID0gc3VjY2Vzc29yVmVydGV4O1xuXG4gICAgICBzdWNjZXNzb3JWZXJ0ZXguZ2V0U3VjY2Vzc29yVmVydGljZXMoc3VjY2Vzc29yVmVydGV4TWFwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhNYXA7XG4gIH1cbiAgXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHRoaXMuZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcygpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSBwcmVkZWNlc3NvclZlcnRpY2VzLm1hcChmdW5jdGlvbihwcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gcHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lO1xuICAgICAgICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3Qgc3VjY2Vzc29yVmVydGljZXMgPSB0aGlzLmdldFN1Y2Nlc3NvclZlcnRpY2VzKCksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSBzdWNjZXNzb3JWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oc3VjY2Vzc29yVmVydGV4KSB7XG4gICAgICAgICAgY29uc3Qgc3VjY2Vzc29yVmVydGV4TmFtZSA9IHN1Y2Nlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgICAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TmFtZTtcbiAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4TWFwID0gdGhpcy5nZXRQcmVkZWNlc3NvclZlcnRleE1hcCgpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyhwcmVkZWNlc3NvclZlcnRleE1hcCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHByZWRlY2Vzc29yVmVydGV4TmFtZXMubWFwKGZ1bmN0aW9uKHByZWRlY2Vzc29yVmVydGV4TmFtZSkge1xuICAgICAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXggPSBwcmVkZWNlc3NvclZlcnRleE1hcFtwcmVkZWNlc3NvclZlcnRleE5hbWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleE1hcCA9IHRoaXMuZ2V0U3VjY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyhzdWNjZXNzb3JWZXJ0ZXhNYXApLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRpY2VzID0gc3VjY2Vzc29yVmVydGV4TmFtZXMubWFwKGZ1bmN0aW9uKHN1Y2Nlc3NvclZlcnRleE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleCA9IHN1Y2Nlc3NvclZlcnRleE1hcFtzdWNjZXNzb3JWZXJ0ZXhOYW1lXTtcbiAgXG4gICAgICAgICAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4O1xuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGljZXMgPSB0aGlzLmdldFByZWRlY2Vzc29yVmVydGljZXMoKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHByZWRlY2Vzc29yVmVydGljZXMpO1xuXG4gICAgY29uc3QgdG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRpY2VzID0gcHJlZGVjZXNzb3JWZXJ0aWNlcywgIC8vL1xuICAgICAgICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICByZXR1cm4gdG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG4gIFxuICByZXRyaWV2ZUZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgpIHtcbiAgICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0aGlzLmZvcndhcmRzRGVwdGhGaXJzdFNlYXJjaChmdW5jdGlvbihmb3J3YXJkc1Zpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChmb3J3YXJkc1Zpc2l0ZWRWZXJ0ZXggPT09IHNvdXJjZVZlcnRleCk7XG4gICAgICBcbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcztcbiAgfVxuXG4gIHJldHJpZXZlQmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcygpIHtcbiAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGhpcy5iYWNrd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGZ1bmN0aW9uKGJhY2t3YXJkc1Zpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuICAgICAgXG4gICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICB9XG4gIFxuICBpc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHZlcnRleCkge1xuICAgIGNvbnN0IHZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmluY2x1ZGVzKHZlcnRleCk7XG5cbiAgICByZXR1cm4gdmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXg7XG4gIH1cblxuICBpc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh2ZXJ0ZXgpIHtcbiAgICBjb25zdCB2ZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmluY2x1ZGVzKHZlcnRleCk7XG5cbiAgICByZXR1cm4gdmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5U291cmNlVmVydGV4KHNvdXJjZVZlcnRleCkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpcy5pc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleDsgLy8vXG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KSB7XG4gICAgY29uc3QgdGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGhpcy5pc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gdGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4OyAvLy9cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBzZXRJbmRleChpbmRleCkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIHNldFZpc2l0ZWQodmlzaXRlZCkge1xuICAgIHRoaXMudmlzaXRlZCA9IHZpc2l0ZWQ7XG4gIH1cblxuICByZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmluZGV4T2YoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpLFxuICAgICAgICAgIHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gIH1cblxuICByZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmluZGV4T2YoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSxcbiAgICAgICAgICBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgfVxuICBcbiAgcmVtb3ZlSW5jb21pbmdFZGdlcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzOyAvLy9cbiAgICBcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMgPSBbXTtcbiAgfVxuXG4gIHJlbW92ZU91dGdvaW5nRWRnZXMoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzOyAvLy9cblxuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IFtdO1xuICB9XG5cbiAgcmVzZXRWaXNpdGVkKCkge1xuICAgIHRoaXMudmlzaXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMucHVzaChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gIH1cblxuICBhZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5wdXNoKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG4gIH1cblxuICBmb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spIHtcbiAgICBjb25zdCBmb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyA9IFtdO1xuXG4gICAgdGhpcy5yZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzKGZ1bmN0aW9uKGZvcndhcmRzVmlzaXRlZFZlcnRleCkge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2soZm9yd2FyZHNWaXNpdGVkVmVydGV4KTsgIC8vL1xuXG4gICAgICBmb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcy5wdXNoKGZvcndhcmRzVmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICBmb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcndhcmRzVmlzaXRlZFZlcnRleCkge1xuICAgICAgZm9yd2FyZHNWaXNpdGVkVmVydGV4LnJlc2V0VmlzaXRlZCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvcndhcmRzVmlzaXRlZFZlcnRpY2VzO1xuICB9XG5cbiAgYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaChjYWxsYmFjaykge1xuICAgIGNvbnN0IGJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyA9IFtdO1xuXG4gICAgdGhpcy5yZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhmdW5jdGlvbihiYWNrd2FyZHNWaXNpdGVkVmVydGV4KSB7XG4gICAgICBjb25zdCB0ZXJtaW5hdGUgPSBjYWxsYmFjayhiYWNrd2FyZHNWaXNpdGVkVmVydGV4KTsgIC8vL1xuXG4gICAgICBiYWNrd2FyZHNWaXNpdGVkVmVydGljZXMucHVzaChiYWNrd2FyZHNWaXNpdGVkVmVydGV4KTtcblxuICAgICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgICB9KTtcblxuICAgIGJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGJhY2t3YXJkc1Zpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIGJhY2t3YXJkc1Zpc2l0ZWRWZXJ0ZXgucmVzZXRWaXNpdGVkKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzO1xuICB9XG5cbiAgcmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjaykge1xuICAgIGxldCB0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpc2l0ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuXG4gICAgICBjb25zdCBmb3J3YXJkc1Zpc2l0ZWRWZXJ0ZXggPSB0aGlzOyAgLy8vXG5cbiAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKGZvcndhcmRzVmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIGlmICh0ZXJtaW5hdGUgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5yZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICByZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjaykge1xuICAgIGxldCB0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpc2l0ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuXG4gICAgICBjb25zdCBiYWNrd2FyZHNWaXNpdGVkVmVydGV4ID0gdGhpczsgIC8vL1xuXG4gICAgICB0ZXJtaW5hdGUgPSBjYWxsYmFjayhiYWNrd2FyZHNWaXNpdGVkVmVydGV4KTtcblxuICAgICAgaWYgKHRlcm1pbmF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLnNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICBmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuZm9yRWFjaChjYWxsYmFjayk7XG4gIH1cblxuICBmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5zb21lKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnNvbWUoY2FsbGJhY2spO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpIHtcbiAgICBjb25zdCB2aXNpdGVkID0gZmFsc2UsICAvLy9cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gW10sXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBbXSxcbiAgICAgICAgICBkZXBlbmRlbmN5VmVydGV4ID0gbmV3IFZlcnRleChuYW1lLCBpbmRleCwgdmlzaXRlZCwgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcywgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIGRlcGVuZGVuY3lWZXJ0ZXg7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWZXJ0ZXg7XG4iXX0=