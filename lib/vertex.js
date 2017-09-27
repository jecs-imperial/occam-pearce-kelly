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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi92ZXJ0ZXguanMiXSwibmFtZXMiOlsidmVydGV4VXRpbGl0aWVzIiwicmVxdWlyZSIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJWZXJ0ZXgiLCJuYW1lIiwiaW5kZXgiLCJ2aXNpdGVkIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzIiwicHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInByZWRlY2Vzc29yVmVydGV4IiwicHJlZGVjZXNzb3JWZXJ0ZXhOYW1lIiwiZ2V0TmFtZSIsImdldFByZWRlY2Vzc29yVmVydGljZXMiLCJzdWNjZXNzb3JWZXJ0ZXhNYXAiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic3VjY2Vzc29yVmVydGV4Iiwic3VjY2Vzc29yVmVydGV4TmFtZSIsImdldFN1Y2Nlc3NvclZlcnRpY2VzIiwicHJlZGVjZXNzb3JWZXJ0aWNlcyIsInByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJtYXAiLCJzdWNjZXNzb3JWZXJ0aWNlcyIsInN1Y2Nlc3NvclZlcnRleE5hbWVzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJPYmplY3QiLCJrZXlzIiwiZ2V0U3VjY2Vzc29yVmVydGV4TWFwIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwic291cmNlVmVydGV4IiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoIiwidmlzaXRlZFZlcnRleCIsInRlcm1pbmF0ZSIsImJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJiYWNrd2FyZHNEZXB0aEZpcnN0U2VhcmNoIiwidmVydGV4IiwidmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbmNsdWRlcyIsInZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImVkZ2VQcmVzZW50IiwidGFyZ2V0VmVydGV4IiwidGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbmRleE9mIiwic3RhcnQiLCJkZWxldGVDb3VudCIsInNwbGljZSIsImZvckVhY2giLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJwdXNoIiwiY2FsbGJhY2siLCJ2aXNpdGVkVmVydGljZXMiLCJyZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzIiwicmVzZXRWaXNpdGVkIiwicmV0cmlldmVCYWNrd2FyZHNWaXNpdGVkVmVydGljZXMiLCJzb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4Iiwic29tZSIsImRlcGVuZGVuY3lWZXJ0ZXgiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCQyxRQUFRLG9CQUFSLENBQXhCOztJQUVRQyx1QixHQUF3REYsZSxDQUF4REUsdUI7SUFBeUJDLDBCLEdBQStCSCxlLENBQS9CRywwQjs7SUFFM0JDLE07QUFDSixrQkFBWUMsSUFBWixFQUFrQkMsS0FBbEIsRUFBeUJDLE9BQXpCLEVBQWtDQyw0QkFBbEMsRUFBZ0VDLDBCQUFoRSxFQUE0RjtBQUFBOztBQUMxRixTQUFLSixJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFL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LFVBRU1DLDZCQUE2QixFQUZuQztBQUFBLFVBR015RCxtQkFBbUIsSUFBSTlELE1BQUosQ0FBV0MsSUFBWCxFQUFpQkMsS0FBakIsRUFBd0JDLE9BQXhCLEVBQWlDQyw0QkFBakMsRUFBK0RDLDBCQUEvRCxDQUh6Qjs7QUFLQSxhQUFPeUQsZ0JBQVA7QUFDRDs7Ozs7O0FBR0hDLE9BQU9DLE9BQVAsR0FBaUJoRSxNQUFqQiIsImZpbGUiOiJ2ZXJ0ZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHZlcnRleFV0aWxpdGllcyA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL3ZlcnRleCcpO1xuXG5jb25zdCB7IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzLCB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyB9ID0gdmVydGV4VXRpbGl0aWVzO1xuXG5jbGFzcyBWZXJ0ZXgge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBpbmRleCwgdmlzaXRlZCwgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcywgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnZpc2l0ZWQgPSB2aXNpdGVkO1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXM7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gIH1cblxuICBpc1Zpc2l0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaXRlZDtcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAocHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleCA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LCAvLy9cbiAgICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhNYXBbcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSA9IHByZWRlY2Vzc29yVmVydGV4O1xuXG4gICAgICBwcmVkZWNlc3NvclZlcnRleC5nZXRQcmVkZWNlc3NvclZlcnRpY2VzKHByZWRlY2Vzc29yVmVydGV4TWFwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRleE1hcChzdWNjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleCA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCwgLy8vXG4gICAgICAgICAgICBzdWNjZXNzb3JWZXJ0ZXhOYW1lID0gc3VjY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgc3VjY2Vzc29yVmVydGV4TWFwW3N1Y2Nlc3NvclZlcnRleE5hbWVdID0gc3VjY2Vzc29yVmVydGV4O1xuXG4gICAgICBzdWNjZXNzb3JWZXJ0ZXguZ2V0U3VjY2Vzc29yVmVydGljZXMoc3VjY2Vzc29yVmVydGV4TWFwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhNYXA7XG4gIH1cbiAgXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHRoaXMuZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcygpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSBwcmVkZWNlc3NvclZlcnRpY2VzLm1hcChmdW5jdGlvbihwcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gcHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lO1xuICAgICAgICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3Qgc3VjY2Vzc29yVmVydGljZXMgPSB0aGlzLmdldFN1Y2Nlc3NvclZlcnRpY2VzKCksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSBzdWNjZXNzb3JWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oc3VjY2Vzc29yVmVydGV4KSB7XG4gICAgICAgICAgY29uc3Qgc3VjY2Vzc29yVmVydGV4TmFtZSA9IHN1Y2Nlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgICAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TmFtZTtcbiAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4TWFwID0gdGhpcy5nZXRQcmVkZWNlc3NvclZlcnRleE1hcCgpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyhwcmVkZWNlc3NvclZlcnRleE1hcCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHByZWRlY2Vzc29yVmVydGV4TmFtZXMubWFwKGZ1bmN0aW9uKHByZWRlY2Vzc29yVmVydGV4TmFtZSkge1xuICAgICAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXggPSBwcmVkZWNlc3NvclZlcnRleE1hcFtwcmVkZWNlc3NvclZlcnRleE5hbWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleE1hcCA9IHRoaXMuZ2V0U3VjY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyhzdWNjZXNzb3JWZXJ0ZXhNYXApLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRpY2VzID0gc3VjY2Vzc29yVmVydGV4TmFtZXMubWFwKGZ1bmN0aW9uKHN1Y2Nlc3NvclZlcnRleE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleCA9IHN1Y2Nlc3NvclZlcnRleE1hcFtzdWNjZXNzb3JWZXJ0ZXhOYW1lXTtcbiAgXG4gICAgICAgICAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4O1xuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGljZXMgPSB0aGlzLmdldFByZWRlY2Vzc29yVmVydGljZXMoKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHByZWRlY2Vzc29yVmVydGljZXMpO1xuXG4gICAgY29uc3QgdG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRpY2VzID0gcHJlZGVjZXNzb3JWZXJ0aWNlcywgIC8vL1xuICAgICAgICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICByZXR1cm4gdG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG4gIFxuICByZXRyaWV2ZUZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgpIHtcbiAgICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0aGlzLmZvcndhcmRzRGVwdGhGaXJzdFNlYXJjaChmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICBjb25zdCB0ZXJtaW5hdGUgPSAodmlzaXRlZFZlcnRleCA9PT0gc291cmNlVmVydGV4KTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICB9XG5cbiAgcmV0cmlldmVCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKCkge1xuICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0aGlzLmJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2goZnVuY3Rpb24odmlzaXRlZFZlcnRleCkge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gZmFsc2U7XG4gICAgICBcbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cbiAgXG4gIGlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgodmVydGV4KSB7XG4gICAgY29uc3QgdmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuaW5jbHVkZXModmVydGV4KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleDtcbiAgfVxuXG4gIGlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHZlcnRleCkge1xuICAgIGNvbnN0IHZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5jbHVkZXModmVydGV4KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXg7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlTb3VyY2VWZXJ0ZXgoc291cmNlVmVydGV4KSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzLmlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4OyAvLy9cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzLmlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXg7IC8vL1xuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHNldEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgc2V0VmlzaXRlZCh2aXNpdGVkKSB7XG4gICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZDtcbiAgfVxuXG4gIHJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuaW5kZXhPZihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCksXG4gICAgICAgICAgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgfVxuXG4gIHJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5kZXhPZihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpLFxuICAgICAgICAgIHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICB9XG4gIFxuICByZW1vdmVJbmNvbWluZ0VkZ2VzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXM7IC8vL1xuICAgIFxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IFtdO1xuICB9XG5cbiAgcmVtb3ZlT3V0Z29pbmdFZGdlcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRoaXM7IC8vL1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzID0gW107XG4gIH1cblxuICByZXNldFZpc2l0ZWQoKSB7XG4gICAgdGhpcy52aXNpdGVkID0gZmFsc2U7XG4gIH1cblxuICBhZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5wdXNoKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgfVxuXG4gIGFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnB1c2goaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcbiAgfVxuXG4gIGZvcndhcmRzRGVwdGhGaXJzdFNlYXJjaChjYWxsYmFjaykge1xuICAgIGNvbnN0IHZpc2l0ZWRWZXJ0aWNlcyA9IFtdO1xuXG4gICAgdGhpcy5yZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzKGZ1bmN0aW9uKHZpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpOyAgLy8vXG5cbiAgICAgIHZpc2l0ZWRWZXJ0aWNlcy5wdXNoKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgIH0pO1xuXG4gICAgdmlzaXRlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odmlzaXRlZFZlcnRleCkge1xuICAgICAgdmlzaXRlZFZlcnRleC5yZXNldFZpc2l0ZWQoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB2aXNpdGVkVmVydGljZXM7XG4gIH1cblxuICBiYWNrd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdmlzaXRlZFZlcnRpY2VzID0gW107XG5cbiAgICB0aGlzLnJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGZ1bmN0aW9uKHZpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpOyAgLy8vXG5cbiAgICAgIHZpc2l0ZWRWZXJ0aWNlcy5wdXNoKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgIH0pO1xuXG4gICAgdmlzaXRlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odmlzaXRlZFZlcnRleCkge1xuICAgICAgdmlzaXRlZFZlcnRleC5yZXNldFZpc2l0ZWQoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB2aXNpdGVkVmVydGljZXM7XG4gIH1cblxuICByZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMudmlzaXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudmlzaXRlZCA9IHRydWU7XG5cbiAgICAgIGNvbnN0IHZpc2l0ZWRWZXJ0ZXggPSB0aGlzOyAgLy8vXG5cbiAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICBpZiAodGVybWluYXRlICE9PSB0cnVlKSB7XG4gICAgICAgIHZpc2l0ZWRWZXJ0ZXguc29tZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgICB0ZXJtaW5hdGUgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgucmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjayk7XG5cbiAgICAgICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGVybWluYXRlO1xuICB9XG5cbiAgcmV0cmlldmVCYWNrd2FyZHNWaXNpdGVkVmVydGljZXMoY2FsbGJhY2spIHtcbiAgICBsZXQgdGVybWluYXRlID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy52aXNpdGVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy52aXNpdGVkID0gdHJ1ZTtcblxuICAgICAgY29uc3QgdmlzaXRlZFZlcnRleCA9IHRoaXM7ICAvLy9cblxuICAgICAgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIGlmICh0ZXJtaW5hdGUgIT09IHRydWUpIHtcbiAgICAgICAgdmlzaXRlZFZlcnRleC5zb21lSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgICB0ZXJtaW5hdGUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5yZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjayk7XG5cbiAgICAgICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGVybWluYXRlO1xuICB9XG5cbiAgZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmZvckVhY2goY2FsbGJhY2spO1xuICB9XG5cbiAgZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuZm9yRWFjaChjYWxsYmFjayk7XG4gIH1cblxuICBzb21lSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuc29tZShjYWxsYmFjayk7XG4gIH1cblxuICBzb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5zb21lKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KSB7XG4gICAgY29uc3QgdmlzaXRlZCA9IGZhbHNlLCAgLy8vXG4gICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IFtdLFxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzID0gW10sXG4gICAgICAgICAgZGVwZW5kZW5jeVZlcnRleCA9IG5ldyBWZXJ0ZXgobmFtZSwgaW5kZXgsIHZpc2l0ZWQsIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMsIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKTtcblxuICAgIHJldHVybiBkZXBlbmRlbmN5VmVydGV4O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmVydGV4O1xuIl19