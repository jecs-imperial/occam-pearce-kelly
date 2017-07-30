'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vertex = require('./vertex'),
    arrayUtil = require('./util/array');

var DirectedAcyclicGraph = function () {
  function DirectedAcyclicGraph(vertexMap) {
    _classCallCheck(this, DirectedAcyclicGraph);

    this.vertexMap = vertexMap;
  }

  _createClass(DirectedAcyclicGraph, [{
    key: 'isVertexPresent',
    value: function isVertexPresent(vertexName) {
      var vertexPresent = this.vertexMap.hasOwnProperty(vertexName);

      return vertexPresent;
    }
  }, {
    key: 'retrieveVertexByVertexName',
    value: function retrieveVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresent(vertexName),
          vertex = vertexPresent ? this.vertexMap[vertexName] : null;

      return vertex;
    }
  }, {
    key: 'addVertexByVertexName',
    value: function addVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresent(vertexName);

      if (!vertexPresent) {
        var vertexNames = Object.keys(this.vertexMap),
            vertexNamesLength = vertexNames.length,
            name = vertexName,
            ///
        index = vertexNamesLength,
            ///
        _vertex = Vertex.fromNameAndIndex(name, index);

        this.vertexMap[vertexName] = _vertex;
      }

      var vertex = this.vertexMap[vertexName];

      return vertex;
    }
  }, {
    key: 'addEdgeByVertexNames',
    value: function addEdgeByVertexNames(sourceVertexName, targetVertexName) {
      var cyclicVertices = null;

      if (sourceVertexName === targetVertexName) {
        var cyclicVertexName = sourceVertexName,
            ///
        cyclicVertex = this.vertexMap[cyclicVertexName];

        cyclicVertices = [cyclicVertex];
      } else {
        var sourceVertex = this.addVertexByVertexName(sourceVertexName),
            targetVertex = this.addVertexByVertexName(targetVertexName),
            edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);

        if (!edgePresent) {
          var sourceVertexIndex = sourceVertex.getIndex(),
              targetVertexIndex = targetVertex.getIndex(),
              invalidatingEdge = sourceVertexIndex > targetVertexIndex;

          if (invalidatingEdge) {
            cyclicVertices = this.validateEdge(sourceVertex, targetVertex);
          }

          var cycleMissing = cyclicVertices === null; ///

          if (cycleMissing) {
            var immediatePredecessorVertex = sourceVertex,
                ///
            immediateSuccessorVertex = targetVertex; ///

            immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

            immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
          }
        }
      }

      var cyclicVertexNames = null;

      if (cyclicVertices !== null) {
        cyclicVertexNames = cyclicVertices.forEach(function (cyclicVertex) {
          var cyclicVertexName = cyclicVertex.getName();

          return cyclicVertexName;
        });
      }

      return cyclicVertexNames;
    }
  }, {
    key: 'addEdge',
    value: function addEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          cyclicVertexNames = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);

      return cyclicVertexNames;
    }
  }, {
    key: 'validateEdge',
    value: function validateEdge(sourceVertex, targetVertex) {
      var cyclicVertices = null;

      var forwardsAffectedVertices = targetVertex.getForwardsAffectedVertices(sourceVertex),
          lastForwardsAffectedVertex = arrayUtil.last(forwardsAffectedVertices),
          cyclePresent = lastForwardsAffectedVertex === sourceVertex;

      if (cyclePresent) {
        cyclicVertices = forwardsAffectedVertices;
      } else {
        var backwardsAffectedVertices = sourceVertex.getBackwardsAffectedVertices();

        DirectedAcyclicGraph.sortVertices(backwardsAffectedVertices);

        DirectedAcyclicGraph.sortVertices(forwardsAffectedVertices);

        var affectedVertices = [].concat(backwardsAffectedVertices).concat(forwardsAffectedVertices),
            affectedVertexIndices = affectedVertices.map(function (affectedVertex) {
          var affectedVertexIndex = affectedVertex.getIndex();

          return affectedVertexIndex;
        });

        affectedVertexIndices.sort();

        affectedVertices.forEach(function (affectedVertex, index) {
          var affectedVertexIndex = affectedVertexIndices[index];

          affectedVertex.setIndex(affectedVertexIndex);
        });
      }

      return cyclicVertices;
    }
  }, {
    key: 'mapVertex',
    value: function mapVertex(callback) {
      var vertexNames = Object.keys(this.vertexMap),
          result = vertexNames.map(function (vertexName) {
        var vertex = this.vertexMap[vertexName],
            result = callback(vertex);

        return result;
      }.bind(this));

      return result;
    }
  }, {
    key: 'forEachVertex',
    value: function forEachVertex(callback) {
      var vertexNames = Object.keys(this.vertexMap);

      vertexNames.forEach(function (vertexName) {
        var vertex = this.vertexMap[vertexName];

        callback(vertex);
      }.bind(this));
    }
  }], [{
    key: 'fromNothing',
    value: function fromNothing() {
      var vertexMap = {},
          directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);

      return directedAcyclicGraph;
    }
  }, {
    key: 'fromTopologicallyOrderedVertices',
    value: function fromTopologicallyOrderedVertices(topologicallyOrderedVertices) {
      var vertexMap = vertexMapFromTopologicallyOrderedVertices(topologicallyOrderedVertices);

      addEdgesToVertices(topologicallyOrderedVertices, vertexMap);

      var directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);

      return directedAcyclicGraph;
    }
  }, {
    key: 'sortVertices',
    value: function sortVertices(vertices) {
      vertices.sort(function (firstVertex, secondVertex) {
        var firstVertexIndex = firstVertex.getIndex(),
            secondVertexIndex = secondVertex.getIndex();

        if (false) {} else if (firstVertexIndex < secondVertexIndex) {
          return -1;
        } else if (firstVertexIndex > secondVertexIndex) {
          return +1;
        }
      });
    }
  }]);

  return DirectedAcyclicGraph;
}();

module.exports = DirectedAcyclicGraph;

function vertexMapFromTopologicallyOrderedVertices(topologicallyOrderedVertices) {
  var vertexMap = {};

  topologicallyOrderedVertices.forEach(function (topologicallyOrderedVertex, index) {
    var name = topologicallyOrderedVertex.getName(),
        vertex = Vertex.fromNameAndIndex(name, index);

    vertexMap[name] = vertex;
  });

  return vertexMap;
}

function addEdgesToVertices(topologicallyOrderedVertices, vertexMap) {
  topologicallyOrderedVertices.forEach(function (topologicallyOrderedVertex) {
    topologicallyOrderedVertex.forEachOutgoingEdge(function (outgoingEdge) {
      var sourceVertex = outgoingEdge.getSourceVertex(),
          targetVertex = outgoingEdge.getTargetVertex(),
          sourceVertexName = sourceVertex.getName(),
          targetVertexName = targetVertex.getName(),
          immediatePredecessorVertexName = sourceVertexName,
          ///
      immediateSuccessorVertexName = targetVertexName,
          immediatePredecessorVertex = vertexMap[immediatePredecessorVertexName],
          ///
      immediateSuccessorVertex = vertexMap[immediateSuccessorVertexName]; ///

      immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

      immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJWZXJ0ZXgiLCJyZXF1aXJlIiwiYXJyYXlVdGlsIiwiRGlyZWN0ZWRBY3ljbGljR3JhcGgiLCJ2ZXJ0ZXhNYXAiLCJ2ZXJ0ZXhOYW1lIiwidmVydGV4UHJlc2VudCIsImhhc093blByb3BlcnR5IiwiaXNWZXJ0ZXhQcmVzZW50IiwidmVydGV4IiwidmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwidmVydGV4TmFtZXNMZW5ndGgiLCJsZW5ndGgiLCJuYW1lIiwiaW5kZXgiLCJmcm9tTmFtZUFuZEluZGV4Iiwic291cmNlVmVydGV4TmFtZSIsInRhcmdldFZlcnRleE5hbWUiLCJjeWNsaWNWZXJ0aWNlcyIsImN5Y2xpY1ZlcnRleE5hbWUiLCJjeWNsaWNWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXgiLCJhZGRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJ0YXJnZXRWZXJ0ZXgiLCJlZGdlUHJlc2VudCIsImlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCIsInNvdXJjZVZlcnRleEluZGV4IiwiZ2V0SW5kZXgiLCJ0YXJnZXRWZXJ0ZXhJbmRleCIsImludmFsaWRhdGluZ0VkZ2UiLCJ2YWxpZGF0ZUVkZ2UiLCJjeWNsZU1pc3NpbmciLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiY3ljbGljVmVydGV4TmFtZXMiLCJmb3JFYWNoIiwiZ2V0TmFtZSIsImVkZ2UiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsImFkZEVkZ2VCeVZlcnRleE5hbWVzIiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwibGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXgiLCJsYXN0IiwiY3ljbGVQcmVzZW50IiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJzb3J0VmVydGljZXMiLCJhZmZlY3RlZFZlcnRpY2VzIiwiY29uY2F0IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzIiwibWFwIiwiYWZmZWN0ZWRWZXJ0ZXgiLCJhZmZlY3RlZFZlcnRleEluZGV4Iiwic29ydCIsInNldEluZGV4IiwiY2FsbGJhY2siLCJyZXN1bHQiLCJiaW5kIiwiZGlyZWN0ZWRBY3ljbGljR3JhcGgiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwidmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJhZGRFZGdlc1RvVmVydGljZXMiLCJ2ZXJ0aWNlcyIsImZpcnN0VmVydGV4Iiwic2Vjb25kVmVydGV4IiwiZmlyc3RWZXJ0ZXhJbmRleCIsInNlY29uZFZlcnRleEluZGV4IiwibW9kdWxlIiwiZXhwb3J0cyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4IiwiZm9yRWFjaE91dGdvaW5nRWRnZSIsIm91dGdvaW5nRWRnZSIsImdldFNvdXJjZVZlcnRleCIsImdldFRhcmdldFZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLFVBQVIsQ0FBZjtBQUFBLElBQ01DLFlBQVlELFFBQVEsY0FBUixDQURsQjs7SUFHTUUsb0I7QUFDSixnQ0FBWUMsU0FBWixFQUF1QjtBQUFBOztBQUNyQixTQUFLQSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEOzs7O29DQUVlQyxVLEVBQVk7QUFDMUIsVUFBTUMsZ0JBQWdCLEtBQUtGLFNBQUwsQ0FBZUcsY0FBZixDQUE4QkYsVUFBOUIsQ0FBdEI7O0FBRUEsYUFBT0MsYUFBUDtBQUNEOzs7K0NBRTBCRCxVLEVB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QUFnQkQiLCJmaWxlIjoiZGlyZWN0ZWRBY3ljbGljR3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFZlcnRleCA9IHJlcXVpcmUoJy4vdmVydGV4JyksXG4gICAgICBhcnJheVV0aWwgPSByZXF1aXJlKCcuL3V0aWwvYXJyYXknKTtcblxuY2xhc3MgRGlyZWN0ZWRBY3ljbGljR3JhcGgge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhNYXApIHtcbiAgICB0aGlzLnZlcnRleE1hcCA9IHZlcnRleE1hcDtcbiAgfVxuXG4gIGlzVmVydGV4UHJlc2VudCh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMudmVydGV4TWFwLmhhc093blByb3BlcnR5KHZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIHZlcnRleFByZXNlbnQ7XG4gIH1cblxuICByZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50KHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleCA9IHZlcnRleFByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA6XG4gICAgICAgICAgICAgICAgICAgICAgbnVsbDtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICBhZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudCh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICghdmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgICB2ZXJ0ZXhOYW1lc0xlbmd0aCA9IHZlcnRleE5hbWVzLmxlbmd0aCxcbiAgICAgICAgICAgIG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbmRleCA9IHZlcnRleE5hbWVzTGVuZ3RoLCAvLy9cbiAgICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBpZiAoc291cmNlVmVydGV4TmFtZSA9PT0gdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgICAgY29uc3QgY3ljbGljVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGN5Y2xpY1ZlcnRleCA9IHRoaXMudmVydGV4TWFwW2N5Y2xpY1ZlcnRleE5hbWVdO1xuXG4gICAgICBjeWNsaWNWZXJ0aWNlcyA9IFtjeWNsaWNWZXJ0ZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXguaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCk7XG5cbiAgICAgIGlmICghZWRnZVByZXNlbnQpIHtcbiAgICAgICAgY29uc3Qgc291cmNlVmVydGV4SW5kZXggPSBzb3VyY2VWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgdGFyZ2V0VmVydGV4SW5kZXggPSB0YXJnZXRWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgaW52YWxpZGF0aW5nRWRnZSA9IChzb3VyY2VWZXJ0ZXhJbmRleCA+IHRhcmdldFZlcnRleEluZGV4KTtcblxuICAgICAgICBpZiAoaW52YWxpZGF0aW5nRWRnZSkge1xuICAgICAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gdGhpcy52YWxpZGF0ZUVkZ2Uoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3ljbGVNaXNzaW5nID0gKGN5Y2xpY1ZlcnRpY2VzID09PSBudWxsKTsgLy8vXG5cbiAgICAgICAgaWYgKGN5Y2xlTWlzc2luZykge1xuICAgICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gc291cmNlVmVydGV4LCAvLy9cbiAgICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0YXJnZXRWZXJ0ZXg7IC8vL1xuXG4gICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGN5Y2xpY1ZlcnRleE5hbWVzID0gbnVsbDtcblxuICAgIGlmIChjeWNsaWNWZXJ0aWNlcyAhPT0gbnVsbCkge1xuICAgICAgY3ljbGljVmVydGV4TmFtZXMgPSBjeWNsaWNWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGN5Y2xpY1ZlcnRleCkge1xuICAgICAgICBjb25zdCBjeWNsaWNWZXJ0ZXhOYW1lID0gY3ljbGljVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lcztcbiAgfVxuICBcbiAgYWRkRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBjeWNsaWNWZXJ0ZXhOYW1lcyA9IHRoaXMuYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZXM7XG4gIH1cblxuICB2YWxpZGF0ZUVkZ2Uoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpIHtcbiAgICBsZXQgY3ljbGljVmVydGljZXMgPSBudWxsO1xuXG4gICAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGFyZ2V0VmVydGV4LmdldEZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgpLFxuICAgICAgICAgIGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID0gYXJyYXlVdGlsLmxhc3QoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgICBjeWNsZVByZXNlbnQgPSAobGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPT09IHNvdXJjZVZlcnRleCk7XG4gICAgXG4gICAgaWYgKGN5Y2xlUHJlc2VudCkge1xuICAgICAgY3ljbGljVmVydGljZXMgPSBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMgPSBzb3VyY2VWZXJ0ZXguZ2V0QmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcygpO1xuXG4gICAgICBEaXJlY3RlZEFjeWNsaWNHcmFwaC5zb3J0VmVydGljZXMoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICAgIERpcmVjdGVkQWN5Y2xpY0dyYXBoLnNvcnRWZXJ0aWNlcyhmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgICBjb25zdCBhZmZlY3RlZFZlcnRpY2VzID0gW10uY29uY2F0KGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpLmNvbmNhdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzID0gYWZmZWN0ZWRWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgpIHtcbiAgICAgICAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4LmdldEluZGV4KCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGV4SW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzLnNvcnQoKTtcblxuICAgICAgYWZmZWN0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4LCBpbmRleCkge1xuICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzW2luZGV4XTtcblxuICAgICAgICBhZmZlY3RlZFZlcnRleC5zZXRJbmRleChhZmZlY3RlZFZlcnRleEluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjeWNsaWNWZXJ0aWNlcztcbiAgfVxuXG4gIG1hcFZlcnRleChjYWxsYmFjaykge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApLFxuICAgICAgICAgIHJlc3VsdCA9IHZlcnRleE5hbWVzLm1hcChmdW5jdGlvbih2ZXJ0ZXhOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSxcbiAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKHZlcnRleCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZm9yRWFjaFZlcnRleChjYWxsYmFjaykge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApO1xuXG4gICAgdmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbih2ZXJ0ZXhOYW1lKSB7XG4gICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcblxuICAgICAgY2FsbGJhY2sodmVydGV4KTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0ge30sXG4gICAgICAgICAgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyk7XG4gICAgXG4gICAgYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCk7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcbiAgICBcbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cblxuICBzdGF0aWMgc29ydFZlcnRpY2VzKHZlcnRpY2VzKSB7XG4gICAgdmVydGljZXMuc29ydChmdW5jdGlvbihmaXJzdFZlcnRleCwgc2Vjb25kVmVydGV4KSB7XG4gICAgICBjb25zdCBmaXJzdFZlcnRleEluZGV4ID0gZmlyc3RWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgIHNlY29uZFZlcnRleEluZGV4ID0gc2Vjb25kVmVydGV4LmdldEluZGV4KCk7XG5cbiAgICAgIGlmIChmYWxzZSkge1xuXG4gICAgICB9IGVsc2UgIGlmIChmaXJzdFZlcnRleEluZGV4IDwgc2Vjb25kVmVydGV4SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfSBlbHNlICBpZiAoZmlyc3RWZXJ0ZXhJbmRleCA+IHNlY29uZFZlcnRleEluZGV4KSB7XG4gICAgICAgIHJldHVybiArMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgdmVydGV4TWFwW25hbWVdID0gdmVydGV4O1xuICB9KTtcblxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKSB7XG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCkge1xuICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmZvckVhY2hPdXRnb2luZ0VkZ2UoZnVuY3Rpb24ob3V0Z29pbmdFZGdlKSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSBvdXRnb2luZ0VkZ2UuZ2V0U291cmNlVmVydGV4KCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSBvdXRnb2luZ0VkZ2UuZ2V0VGFyZ2V0VmVydGV4KCksXG4gICAgICAgICAgICBzb3VyY2VWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSA9IHRhcmdldFZlcnRleE5hbWUsXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVdLCAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lXTsgLy8vXG5cbiAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==