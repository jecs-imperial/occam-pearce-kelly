'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi92ZXJ0ZXguanMiXSwibmFtZXMiOlsiVmVydGV4IiwibmFtZSIsImluZGV4IiwidmlzaXRlZCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyIsInByZWRlY2Vzc29yVmVydGV4TWFwIiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJwcmVkZWNlc3NvclZlcnRleCIsInByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJnZXRQcmVkZWNlc3NvclZlcnRpY2VzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJwcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsInByZWRlY2Vzc29yVmVydGljZXMiLCJtYXAiLCJzb3VyY2VWZXJ0ZXgiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJmb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2giLCJ2aXNpdGVkVmVydGV4IiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRleCIsInRlcm1pbmF0ZSIsInB1c2giLCJmb3JFYWNoIiwicmVzZXRWaXNpdGVkIiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2giLCJiYWNrd2FyZHNBZmZlY3RlZFZlcnRleCIsInZlcnRleCIsInZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW5jbHVkZXMiLCJ2ZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJlZGdlUHJlc2VudCIsInRhcmdldFZlcnRleCIsInRhcmdldFZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW5kZXhPZiIsInN0YXJ0IiwiZGVsZXRlQ291bnQiLCJzcGxpY2UiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJjYWxsYmFjayIsInNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzb21lSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJzb21lIiwiZGVwZW5kZW5jeVZlcnRleCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7SUFFTUEsTTtBQUNKLGtCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUF5QkMsT0FBekIsRUFBa0NDLDRCQUFsQyxFQUFnRUMsMEJBQWhFLEVBQTRGO0FBQUE7O0FBQzFGLFNBQUtKLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLDRCQUFMLEdBQW9DQSw0QkFBcEM7QUFDQSxTQUFLQywwQkFBTCxHQUFrQ0EsMEJBQWxDO0FBQ0Q7Ozs7OEJBRVM7QUFDUixhQUFPLEtBQUtKLElBQVo7QUFDRDs7OytCQUVVO0FBQ1QsYUFBTyxLQUFLQyxLQUFaO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBS0MsT0FBWjtBQUNEOzs7c0RBRWlDO0FBQ2hDLGFBQU8sS0FBS0MsNEJBQVo7QUFDRDs7O29EQUUrQjtBQUM5QixhQUFPLEtBQUtDLDBCQUFaO0FBQ0Q7Ozs4Q0FFa0Q7QUFBQSxVQUEzQkMsb0JBQTJCLHVFQUFKLEVBQUk7O0FBQ2pELFdBQUtDLGlDQUFMLENBQXVDLFVBQVNDLDBCQUFULEVBQXFDO0FBQzFFLFlBQU1DLG9CQUFvQkQsMEJBQTFCO0FBQUEsWUFBc0Q7QUFDaERFLGdDQUF3QkQsa0JBQWtCRSxPQUFsQixFQUQ5Qjs7QUFHQUwsNkJBQXFCSSxxQkFBckIsSUFBOENELGlCQUE5Qzs7QUFFQUEsMEJBQWtCRyxzQkFBbEIsQ0FBeUNOLG9CQUF6QztBQUNELE9BUEQ7O0FBU0EsYUFBT0Esb0JBQVA7QUFD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QkFBT3RCLFNBQVA7QUFDRCxXQUpEO0FBS0Q7QUFDRjs7QUFFRCxhQUFPQSxTQUFQO0FBQ0Q7OztzREFFaUNzQixRLEVBQVU7QUFDMUMsV0FBSzFDLDRCQUFMLENBQWtDc0IsT0FBbEMsQ0FBMENvQixRQUExQztBQUNEOzs7b0RBRStCQSxRLEVBQVU7QUFDeEMsV0FBS3pDLDBCQUFMLENBQWdDcUIsT0FBaEMsQ0FBd0NvQixRQUF4QztBQUNEOzs7bURBRThCQSxRLEVBQVU7QUFDdkMsV0FBSzFDLDRCQUFMLENBQWtDNkMsSUFBbEMsQ0FBdUNILFFBQXZDO0FBQ0Q7OztpREFFNEJBLFEsRUFBVTtBQUNyQyxXQUFLekMsMEJBQUwsQ0FBZ0M0QyxJQUFoQyxDQUFxQ0gsUUFBckM7QUFDRDs7O3FDQUV1QjdDLEksRUFBTUMsSyxFQUFPO0FBQ25DLFVBQU1DLFVBQVUsS0FBaEI7QUFBQSxVQUF3QjtBQUNsQkMscUNBQStCLEVBRHJDO0FBQUEsVUFFTUMsNkJBQTZCLEVBRm5DO0FBQUEsVUFHTTZDLG1CQUFtQixJQUFJbEQsTUFBSixDQUFXQyxJQUFYLEVBQWlCQyxLQUFqQixFQUF3QkMsT0FBeEIsRUFBaUNDLDRCQUFqQyxFQUErREMsMEJBQS9ELENBSHpCOztBQUtBLGFBQU82QyxnQkFBUDtBQUNEOzs7Ozs7QUFHSEMsT0FBT0MsT0FBUCxHQUFpQnBELE1BQWpCIiwiZmlsZSI6InZlcnRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgVmVydGV4IHtcbiAgY29uc3RydWN0b3IobmFtZSwgaW5kZXgsIHZpc2l0ZWQsIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMsIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZDtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzO1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4O1xuICB9XG5cbiAgaXNWaXNpdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnZpc2l0ZWQ7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TWFwKHByZWRlY2Vzc29yVmVydGV4TWFwID0ge30pIHtcbiAgICB0aGlzLmZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXggPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCwgLy8vXG4gICAgICAgICAgICBwcmVkZWNlc3NvclZlcnRleE5hbWUgPSBwcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgIHByZWRlY2Vzc29yVmVydGV4TWFwW3ByZWRlY2Vzc29yVmVydGV4TmFtZV0gPSBwcmVkZWNlc3NvclZlcnRleDtcblxuICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXguZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcyhwcmVkZWNlc3NvclZlcnRleE1hcCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXhNYXA7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4TWFwID0gdGhpcy5nZXRQcmVkZWNlc3NvclZlcnRleE1hcCgpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyhwcmVkZWNlc3NvclZlcnRleE1hcCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHByZWRlY2Vzc29yVmVydGV4TmFtZXMubWFwKGZ1bmN0aW9uKHByZWRlY2Vzc29yVmVydGV4TmFtZSkge1xuICAgICAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXggPSBwcmVkZWNlc3NvclZlcnRleE1hcFtwcmVkZWNlc3NvclZlcnRleE5hbWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuICBcbiAgZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCkge1xuICAgIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IFtdO1xuXG4gICAgdGhpcy5mb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goZnVuY3Rpb24odmlzaXRlZFZlcnRleCkge1xuICAgICAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9IHZpc2l0ZWRWZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgIHRlcm1pbmF0ZSA9IChmb3J3YXJkc0FmZmVjdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpOyAgLy8vXG5cbiAgICAgIGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcy5wdXNoKGZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXgpO1xuXG4gICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgIH0pO1xuXG4gICAgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oZm9yd2FyZHNBZmZlY3RlZFZlcnRleCkge1xuICAgICAgZm9yd2FyZHNBZmZlY3RlZFZlcnRleC5yZXNldFZpc2l0ZWQoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cblxuICBnZXRCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKCkge1xuICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMgPSBbXTtcblxuICAgIHRoaXMuYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaChmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRleCA9IHZpc2l0ZWRWZXJ0ZXg7ICAvLy9cblxuICAgICAgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcy5wdXNoKGJhY2t3YXJkc0FmZmVjdGVkVmVydGV4KTtcbiAgICB9KTtcblxuICAgIGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihiYWNrd2FyZHNBZmZlY3RlZFZlcnRleCkge1xuICAgICAgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0ZXgucmVzZXRWaXNpdGVkKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcztcbiAgfVxuICBcbiAgaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCh2ZXJ0ZXgpIHtcbiAgICBjb25zdCB2ZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5pbmNsdWRlcyh2ZXJ0ZXgpO1xuXG4gICAgcmV0dXJuIHZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4O1xuICB9XG5cbiAgaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodmVydGV4KSB7XG4gICAgY29uc3QgdmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5pbmNsdWRlcyh2ZXJ0ZXgpO1xuXG4gICAgcmV0dXJuIHZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVNvdXJjZVZlcnRleChzb3VyY2VWZXJ0ZXgpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRoaXMuaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXg7IC8vL1xuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCkge1xuICAgIGNvbnN0IHRhcmdldFZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXMuaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHRhcmdldFZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleDsgLy8vXG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgc2V0SW5kZXgoaW5kZXgpIHtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gIH1cblxuICBzZXRWaXNpdGVkKHZpc2l0ZWQpIHtcbiAgICB0aGlzLnZpc2l0ZWQgPSB2aXNpdGVkO1xuICB9XG5cbiAgcmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5pbmRleE9mKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSxcbiAgICAgICAgICBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICB9XG5cbiAgcmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5pbmRleE9mKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCksXG4gICAgICAgICAgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gIH1cblxuICByZXNldFZpc2l0ZWQoKSB7XG4gICAgdGhpcy52aXNpdGVkID0gZmFsc2U7XG4gIH1cblxuICBhZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5wdXNoKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgfVxuXG4gIGFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnB1c2goaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcbiAgfVxuICBcbiAgZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMudmlzaXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudmlzaXRlZCA9IHRydWU7XG5cbiAgICAgIGNvbnN0IHZpc2l0ZWRWZXJ0ZXggPSB0aGlzOyAgLy8vXG5cbiAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICBpZiAodGVybWluYXRlICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc29tZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgICB0ZXJtaW5hdGUgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKTtcblxuICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICBiYWNrd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMudmlzaXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudmlzaXRlZCA9IHRydWU7XG5cbiAgICAgIGNvbnN0IHZpc2l0ZWRWZXJ0ZXggPSB0aGlzOyAgLy8vXG5cbiAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICBpZiAodGVybWluYXRlICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuc29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICAgICAgdGVybWluYXRlID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaChjYWxsYmFjayk7XG5cbiAgICAgICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGVybWluYXRlO1xuICB9XG5cbiAgZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmZvckVhY2goY2FsbGJhY2spO1xuICB9XG5cbiAgZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuZm9yRWFjaChjYWxsYmFjayk7XG4gIH1cblxuICBzb21lSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuc29tZShjYWxsYmFjayk7XG4gIH1cblxuICBzb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5zb21lKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KSB7XG4gICAgY29uc3QgdmlzaXRlZCA9IGZhbHNlLCAgLy8vXG4gICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IFtdLFxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzID0gW10sXG4gICAgICAgICAgZGVwZW5kZW5jeVZlcnRleCA9IG5ldyBWZXJ0ZXgobmFtZSwgaW5kZXgsIHZpc2l0ZWQsIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMsIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKTtcblxuICAgIHJldHVybiBkZXBlbmRlbmN5VmVydGV4O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmVydGV4O1xuIl19