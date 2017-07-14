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
    key: 'isEdgePresentBySourceVertex',
    value: function isEdgePresentBySourceVertex(sourceVertex) {
      var index = this.immediatePredecessorVertices.indexOf(sourceVertex),
          edgePresent = index !== -1; ///

      return edgePresent;
    }
  }, {
    key: 'isEdgePresentByTargetVertex',
    value: function isEdgePresentByTargetVertex(targetVertex) {
      var index = this.immediateSuccessorVertices.indexOf(targetVertex),
          edgePresent = index !== -1; ///

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi92ZXJ0ZXguanMiXSwibmFtZXMiOlsiVmVydGV4IiwibmFtZSIsImluZGV4IiwidmlzaXRlZCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyIsInByZWRlY2Vzc29yVmVydGV4TWFwIiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJwcmVkZWNlc3NvclZlcnRleCIsInByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJnZXRQcmVkZWNlc3NvclZlcnRpY2VzIiwiZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAiLCJwcmVkZWNlc3NvclZlcnRleE5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsInByZWRlY2Vzc29yVmVydGljZXMiLCJtYXAiLCJzb3VyY2VWZXJ0ZXgiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJmb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2giLCJ2aXNpdGVkVmVydGV4IiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRleCIsInRlcm1pbmF0ZSIsInB1c2giLCJmb3JFYWNoIiwicmVzZXRWaXNpdGVkIiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2giLCJiYWNrd2FyZHNBZmZlY3RlZFZlcnRleCIsImluZGV4T2YiLCJlZGdlUHJlc2VudCIsInRhcmdldFZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImNhbGxiYWNrIiwic29tZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInNvbWUiLCJkZXBlbmRlbmN5VmVydGV4IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztJQUVNQSxNO0FBQ0osa0JBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXlCQyxP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LDJCQUEyQnFCLHlCQUEzQixDQUFxRE0sUUFBckQsQ0FBWjs7QUFFQSxtQkFBT1gsU0FBUDtBQUNELFdBSkQ7QUFLRDtBQUNGOztBQUVELGFBQU9BLFNBQVA7QUFDRDs7O3NEQUVpQ1csUSxFQUFVO0FBQzFDLFdBQUsvQiw0QkFBTCxDQUFrQ3NCLE9BQWxDLENBQTBDUyxRQUExQztBQUNEOzs7b0RBRStCQSxRLEVBQVU7QUFDeEMsV0FBSzlCLDBCQUFMLENBQWdDcUIsT0FBaEMsQ0FBd0NTLFFBQXhDO0FBQ0Q7OzttREFFOEJBLFEsRUFBVTtBQUN2QyxXQUFLL0IsNEJBQUwsQ0FBa0NrQyxJQUFsQyxDQUF1Q0gsUUFBdkM7QUFDRDs7O2lEQUU0QkEsUSxFQUFVO0FBQ3JDLFdBQUs5QiwwQkFBTCxDQUFnQ2lDLElBQWhDLENBQXFDSCxRQUFyQztBQUNEOzs7cUNBRXVCbEMsSSxFQUFNQyxLLEVBQU87QUFDbkMsVUFBTUMsVUFBVSxLQUFoQjtBQUFBLFVBQXdCO0FBQ2xCQyxxQ0FBK0IsRUFEckM7QUFBQSxVQUVNQyw2QkFBNkIsRUFGbkM7QUFBQSxVQUdNa0MsbUJBQW1CLElBQUl2QyxNQUFKLENBQVdDLElBQVgsRUFBaUJDLEtBQWpCLEVBQXdCQyxPQUF4QixFQUFpQ0MsNEJBQWpDLEVBQStEQywwQkFBL0QsQ0FIekI7O0FBS0EsYUFBT2tDLGdCQUFQO0FBQ0Q7Ozs7OztBQUdIQyxPQUFPQyxPQUFQLEdBQWlCekMsTUFBakIiLCJmaWxlIjoidmVydGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBWZXJ0ZXgge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBpbmRleCwgdmlzaXRlZCwgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcywgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnZpc2l0ZWQgPSB2aXNpdGVkO1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXM7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gIH1cblxuICBpc1Zpc2l0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaXRlZDtcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAocHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleCA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LCAvLy9cbiAgICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhNYXBbcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSA9IHByZWRlY2Vzc29yVmVydGV4O1xuXG4gICAgICBwcmVkZWNlc3NvclZlcnRleC5nZXRQcmVkZWNlc3NvclZlcnRpY2VzKHByZWRlY2Vzc29yVmVydGV4TWFwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB0aGlzLmdldFByZWRlY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHByZWRlY2Vzc29yVmVydGV4TWFwKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRpY2VzID0gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcy5tYXAoZnVuY3Rpb24ocHJlZGVjZXNzb3JWZXJ0ZXhOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRleCA9IHByZWRlY2Vzc29yVmVydGV4TWFwW3ByZWRlY2Vzc29yVmVydGV4TmFtZV07XG5cbiAgICAgICAgICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleDtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRpY2VzO1xuICB9XG4gIFxuICBnZXRGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMoc291cmNlVmVydGV4KSB7XG4gICAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gW107XG5cbiAgICB0aGlzLmZvcndhcmRzRGVwdGhGaXJzdFNlYXJjaChmdW5jdGlvbih2aXNpdGVkVmVydGV4KSB7XG4gICAgICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGV4ID0gdmlzaXRlZFZlcnRleCwgIC8vL1xuICAgICAgICAgICAgdGVybWluYXRlID0gKGZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPT09IHNvdXJjZVZlcnRleCk7ICAvLy9cblxuICAgICAgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzLnB1c2goZm9yd2FyZHNBZmZlY3RlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihmb3J3YXJkc0FmZmVjdGVkVmVydGV4KSB7XG4gICAgICBmb3J3YXJkc0FmZmVjdGVkVmVydGV4LnJlc2V0VmlzaXRlZCgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcztcbiAgfVxuXG4gIGdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKSB7XG4gICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IFtdO1xuXG4gICAgdGhpcy5iYWNrd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGZ1bmN0aW9uKHZpc2l0ZWRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGV4ID0gdmlzaXRlZFZlcnRleDsgIC8vL1xuXG4gICAgICBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzLnB1c2goYmFja3dhcmRzQWZmZWN0ZWRWZXJ0ZXgpO1xuICAgIH0pO1xuXG4gICAgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGJhY2t3YXJkc0FmZmVjdGVkVmVydGV4KSB7XG4gICAgICBiYWNrd2FyZHNBZmZlY3RlZFZlcnRleC5yZXNldFZpc2l0ZWQoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5U291cmNlVmVydGV4KHNvdXJjZVZlcnRleCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmluZGV4T2Yoc291cmNlVmVydGV4KSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IChpbmRleCAhPT0gLTEpOyAvLy9cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5kZXhPZih0YXJnZXRWZXJ0ZXgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gKGluZGV4ICE9PSAtMSk7IC8vL1xuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHNldEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgc2V0VmlzaXRlZCh2aXNpdGVkKSB7XG4gICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZDtcbiAgfVxuXG4gIHJlc2V0VmlzaXRlZCgpIHtcbiAgICB0aGlzLnZpc2l0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnB1c2goaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICB9XG5cbiAgYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMucHVzaChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuICB9XG4gIFxuICBmb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spIHtcbiAgICBsZXQgdGVybWluYXRlID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy52aXNpdGVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy52aXNpdGVkID0gdHJ1ZTtcblxuICAgICAgY29uc3QgdmlzaXRlZFZlcnRleCA9IHRoaXM7ICAvLy9cblxuICAgICAgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIGlmICh0ZXJtaW5hdGUgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5mb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spO1xuXG4gICAgICAgICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgfVxuXG4gIGJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spIHtcbiAgICBsZXQgdGVybWluYXRlID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy52aXNpdGVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy52aXNpdGVkID0gdHJ1ZTtcblxuICAgICAgY29uc3QgdmlzaXRlZFZlcnRleCA9IHRoaXM7ICAvLy9cblxuICAgICAgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIGlmICh0ZXJtaW5hdGUgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5zb21lSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgICB0ZXJtaW5hdGUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5iYWNrd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKTtcblxuICAgICAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICBmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuZm9yRWFjaChjYWxsYmFjayk7XG4gIH1cblxuICBmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5zb21lKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnNvbWUoY2FsbGJhY2spO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpIHtcbiAgICBjb25zdCB2aXNpdGVkID0gZmFsc2UsICAvLy9cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gW10sXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBbXSxcbiAgICAgICAgICBkZXBlbmRlbmN5VmVydGV4ID0gbmV3IFZlcnRleChuYW1lLCBpbmRleCwgdmlzaXRlZCwgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcywgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIGRlcGVuZGVuY3lWZXJ0ZXg7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBWZXJ0ZXg7XG4iXX0=