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
    key: 'getForwardsAffectedVertices',
    value: function getForwardsAffectedVertices(sourceVertex) {
      var forwardsAffectedVertices = [];

      this.forwardsDepthFirstSearch(function (visitedVertex) {
        var forwardsAffectedVertex = visitedVertex,
            ///
        terminate = forwardsAffectedVertex === sourceVertex; ///

        forwardsAffectedVertices.push(forwardsAffectedVertex);

        return terminate;
      });

      forwardsAffectedVertices.forEach(function (forwardsAffectedVertex) {
        forwardsAffectedVertex.resetVisited();
      });

      return forwardsAffectedVertices;
    }
  }, {
    key: 'getBackwardsAffectedVertices',
    value: function getBackwardsAffectedVertices() {
      var backwardsAffectedVertices = [];

      this.backwardsDepthFirstSearch(function (visitedVertex) {
        var backwardsAffectedVertex = visitedVertex; ///

        backwardsAffectedVertices.push(backwardsAffectedVertex);
      });

      backwardsAffectedVertices.forEach(function (backwardsAffectedVertex) {
        backwardsAffectedVertex.resetVisited();
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
      var terminate = false;

      if (this.visited === false) {
        this.visited = true;

        var visitedVertex = this; ///

        terminate = callback(visitedVertex);

        if (terminate !== true) {
          this.someImmediateSuccessorVertex(function (immediateSuccessorVertex) {
            terminate = immediateSuccessorVertex.forwardsDepthFirstSearch(callback);

            return terminate;
          });
        }
      }

      return terminate;
    }
  }, {
    key: 'backwardsDepthFirstSearch',
    value: function backwardsDepthFirstSearch(callback) {
      var terminate = false;

      if (this.visited === false) {
        this.visited = true;

        var visitedVertex = this; ///

        terminate = callback(visitedVertex);

        if (terminate !== true) {
          this.someImmediatePredecessorVertex(function (immediatePredecessorVertex) {
            terminate = immediatePredecessorVertex.backwardsDepthFirstSearch(callback);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi92ZXJ0ZXguanMiXSwibmFtZXMiOlsidmVydGV4VXRpbGl0aWVzIiwicmVxdWlyZSIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJWZXJ0ZXgiLCJuYW1lIiwiaW5kZXgiLCJ2aXNpdGVkIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzIiwicHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInByZWRlY2Vzc29yVmVydGV4IiwicHJlZGVjZXNzb3JWZXJ0ZXhOYW1lIiwiZ2V0TmFtZSIsImdldFByZWRlY2Vzc29yVmVydGljZXMiLCJnZXRQcmVkZWNlc3NvclZlcnRleE1hcCIsInByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwicHJlZGVjZXNzb3JWZXJ0aWNlcyIsIm1hcCIsInRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsInNvdXJjZVZlcnRleCIsImZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImZvcndhcmRzRGVwdGhGaXJzdFNlYXJjaCIsInZpc2l0ZWRWZXJ0ZXgiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGV4IiwidGVybWluYXRlIiwicHVzaCIsImZvckVhY2giLCJyZXNldFZpc2l0ZWQiLCJiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaCIsImJhY2t3YXJkc0FmZmVjdGVkVmVydGV4IiwidmVydGV4IiwidmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbmNsdWRlcyIsInZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImVkZ2VQcmVzZW50IiwidGFyZ2V0VmVydGV4IiwidGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbmRleE9mIiwic3RhcnQiLCJkZWxldGVDb3VudCIsInNwbGljZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImNhbGxiYWNrIiwic29tZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInNvbWUiLCJkZXBlbmRlbmN5VmVydGV4IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLGtCQUFrQkMsUUFBUSxvQkFBUixDQUF4Qjs7SUFFUUMsdUIsR0FBd0RGLGUsQ0FBeERFLHVCO0lBQXlCQywwQixHQUErQkgsZSxDQUEvQkcsMEI7O0lBRTNCQyxNO0FBQ0osa0JBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXlCQyxPQUF6QixFQUFrQ0MsNEJBQWxDLEVBQWdFQywwQkFBaEUsRUFBNEY7QUFBQTs7QUFDMUYsU0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsNEJBQUwsR0FBb0NBLDRCQUFwQztBQUNBLFNBQUtDLDBCQUFMLEdBQWtDQSwwQkFBbEM7QUFDRDs7Ozs4QkFFUztBQUNSLGFBQU8sS0FBS0osSUFBWjtBQUNEOzs7K0JBRVU7QUFDVCxhQUFPLEtBQUtDLEtBQVo7QUFDRDs7O2dDQUVXO0FBQ1YsYUFBTyxLQUFLQyxPQUFaO0FBQ0Q7OztzREFFaUM7QUFDaEMsYUFBTyxLQUFLQyw0QkFBWjtB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aUN1QixRLEVBQVU7QUFDMUMsV0FBSzdDLDRCQUFMLENBQWtDd0IsT0FBbEMsQ0FBMENxQixRQUExQztBQUNEOzs7b0RBRStCQSxRLEVBQVU7QUFDeEMsV0FBSzVDLDBCQUFMLENBQWdDdUIsT0FBaEMsQ0FBd0NxQixRQUF4QztBQUNEOzs7bURBRThCQSxRLEVBQVU7QUFDdkMsV0FBSzdDLDRCQUFMLENBQWtDZ0QsSUFBbEMsQ0FBdUNILFFBQXZDO0FBQ0Q7OztpREFFNEJBLFEsRUFBVTtBQUNyQyxXQUFLNUMsMEJBQUwsQ0FBZ0MrQyxJQUFoQyxDQUFxQ0gsUUFBckM7QUFDRDs7O3FDQUV1QmhELEksRUFBTUMsSyxFQUFPO0FBQ25DLFVBQU1DLFVBQVUsS0FBaEI7QUFBQSxVQUF3QjtBQUNsQkMscUNBQStCLEVBRHJDO0FBQUEsVUFFTUMsNkJBQTZCLEVBRm5DO0FBQUEsVUFHTWdELG1CQUFtQixJQUFJckQsTUFBSixDQUFXQyxJQUFYLEVBQWlCQyxLQUFqQixFQUF3QkMsT0FBeEIsRUFBaUNDLDRCQUFqQyxFQUErREMsMEJBQS9ELENBSHpCOztBQUtBLGFBQU9nRCxnQkFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQnZELE1BQWpCIiwiZmlsZSI6InZlcnRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdmVydGV4VXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvdmVydGV4Jyk7XG5cbmNvbnN0IHsgdmVydGV4TmFtZXNGcm9tVmVydGljZXMsIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzIH0gPSB2ZXJ0ZXhVdGlsaXRpZXM7XG5cbmNsYXNzIFZlcnRleCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGluZGV4LCB2aXNpdGVkLCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMudmlzaXRlZCA9IHZpc2l0ZWQ7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBnZXRJbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleDtcbiAgfVxuXG4gIGlzVmlzaXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy52aXNpdGVkO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRleE1hcChwcmVkZWNlc3NvclZlcnRleE1hcCA9IHt9KSB7XG4gICAgdGhpcy5mb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4ID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gcHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICBwcmVkZWNlc3NvclZlcnRleE1hcFtwcmVkZWNlc3NvclZlcnRleE5hbWVdID0gcHJlZGVjZXNzb3JWZXJ0ZXg7XG5cbiAgICAgIHByZWRlY2Vzc29yVmVydGV4LmdldFByZWRlY2Vzc29yVmVydGljZXMocHJlZGVjZXNzb3JWZXJ0ZXhNYXApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TWFwO1xuICB9XG5cbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcygpIHtcbiAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleE1hcCA9IHRoaXMuZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAoKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRleE5hbWVzID0gT2JqZWN0LmtleXMocHJlZGVjZXNzb3JWZXJ0ZXhNYXApLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGljZXMgPSBwcmVkZWNlc3NvclZlcnRleE5hbWVzLm1hcChmdW5jdGlvbihwcmVkZWNlc3NvclZlcnRleE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4ID0gcHJlZGVjZXNzb3JWZXJ0ZXhNYXBbcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4O1xuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRUb3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHRoaXMuZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcygpO1xuXG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMocHJlZGVjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGljZXMgPSBwcmVkZWNlc3NvclZlcnRpY2VzLCAgLy8vXG4gICAgICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdmVydGV4TmFtZXNGcm9tVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRQcmVkZWNlc3NvclZlcnRpY2VzKTtcblxuICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cbiAgXG4gIGdldEZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgpIHtcbiAgICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGZ1bmN0aW9uKHZpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPSB2aXNpdGVkVmVydGV4LCAgLy8vXG4gICAgICAgICAgICB0ZXJtaW5hdGUgPSAoZm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9PT0gc291cmNlVmVydGV4KTsgIC8vL1xuXG4gICAgICBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMucHVzaChmb3J3YXJkc0FmZmVjdGVkVmVydGV4KTtcblxuICAgICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgICB9KTtcblxuICAgIGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXgpIHtcbiAgICAgIGZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXgucmVzZXRWaXNpdGVkKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0QmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcygpIHtcbiAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gW107XG5cbiAgICB0aGlzLmJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2goZnVuY3Rpb24odmlzaXRlZFZlcnRleCkge1xuICAgICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0ZXggPSB2aXNpdGVkVmVydGV4OyAgLy8vXG5cbiAgICAgIGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMucHVzaChiYWNrd2FyZHNBZmZlY3RlZFZlcnRleCk7XG4gICAgfSk7XG5cbiAgICBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oYmFja3dhcmRzQWZmZWN0ZWRWZXJ0ZXgpIHtcbiAgICAgIGJhY2t3YXJkc0FmZmVjdGVkVmVydGV4LnJlc2V0VmlzaXRlZCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cbiAgXG4gIGlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgodmVydGV4KSB7XG4gICAgY29uc3QgdmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuaW5jbHVkZXModmVydGV4KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleDtcbiAgfVxuXG4gIGlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHZlcnRleCkge1xuICAgIGNvbnN0IHZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5jbHVkZXModmVydGV4KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXg7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlTb3VyY2VWZXJ0ZXgoc291cmNlVmVydGV4KSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzLmlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4OyAvLy9cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzLmlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXg7IC8vL1xuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHNldEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgc2V0VmlzaXRlZCh2aXNpdGVkKSB7XG4gICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZDtcbiAgfVxuXG4gIHJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuaW5kZXhPZihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCksXG4gICAgICAgICAgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgfVxuXG4gIHJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5kZXhPZihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpLFxuICAgICAgICAgIHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICB9XG4gIFxuICByZW1vdmVJbmNvbWluZ0VkZ2VzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXM7IC8vL1xuICAgIFxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IFtdO1xuICB9XG5cbiAgcmVtb3ZlT3V0Z29pbmdFZGdlcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRoaXM7IC8vL1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzID0gW107XG4gIH1cblxuICByZXNldFZpc2l0ZWQoKSB7XG4gICAgdGhpcy52aXNpdGVkID0gZmFsc2U7XG4gIH1cblxuICBhZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5wdXNoKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgfVxuXG4gIGFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnB1c2goaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcbiAgfVxuICBcbiAgZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMudmlzaXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudmlzaXRlZCA9IHRydWU7XG5cbiAgICAgIGNvbnN0IHZpc2l0ZWRWZXJ0ZXggPSB0aGlzOyAgLy8vXG5cbiAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICBpZiAodGVybWluYXRlICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc29tZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgICB0ZXJtaW5hdGUgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKTtcblxuICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICBiYWNrd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMudmlzaXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudmlzaXRlZCA9IHRydWU7XG5cbiAgICAgIGNvbnN0IHZpc2l0ZWRWZXJ0ZXggPSB0aGlzOyAgLy8vXG5cbiAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICBpZiAodGVybWluYXRlICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICAgICAgdGVybWluYXRlID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaChjYWxsYmFjayk7XG5cbiAgICAgICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGVybWluYXRlO1xuICB9XG5cbiAgZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmZvckVhY2goY2FsbGJhY2spO1xuICB9XG5cbiAgZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuZm9yRWFjaChjYWxsYmFjayk7XG4gIH1cblxuICBzb21lSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuc29tZShjYWxsYmFjayk7XG4gIH1cblxuICBzb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5zb21lKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KSB7XG4gICAgY29uc3QgdmlzaXRlZCA9IGZhbHNlLCAgLy8vXG4gICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IFtdLFxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzID0gW10sXG4gICAgICAgICAgZGVwZW5kZW5jeVZlcnRleCA9IG5ldyBWZXJ0ZXgobmFtZSwgaW5kZXgsIHZpc2l0ZWQsIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMsIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKTtcblxuICAgIHJldHVybiBkZXBlbmRlbmN5VmVydGV4O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmVydGV4O1xuIl19