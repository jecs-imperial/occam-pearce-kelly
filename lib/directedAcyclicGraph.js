'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var necessary = require('necessary');

var Edge = require('./edge'),
    Vertex = require('./vertex');

var array = necessary.array,
    last = array.last;

var DirectedAcyclicGraph = function () {
  function DirectedAcyclicGraph(vertexMap) {
    _classCallCheck(this, DirectedAcyclicGraph);

    this.vertexMap = vertexMap;
  }

  _createClass(DirectedAcyclicGraph, [{
    key: 'getVertexNames',
    value: function getVertexNames() {
      var vertexNames = Object.keys(this.vertexMap);

      return vertexNames;
    }
  }, {
    key: 'isEdgePresent',
    value: function isEdgePresent(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);

      return edgePresent;
    }
  }, {
    key: 'isVertexPresentByVertexName',
    value: function isVertexPresentByVertexName(vertexName) {
      var vertexPresent = this.vertexMap.hasOwnProperty(vertexName);

      return vertexPresent;
    }
  }, {
    key: 'isEdgePresentByVertexNames',
    value: function isEdgePresentByVertexNames(sourceVertexName, targetVertexName) {
      var edgePresent = false;

      var sourceVertex = this.retrieveVertexByVertexName(sourceVertexName),
          targetVertex = this.retrieveVertexByVertexName(targetVertexName),
          sourceVertexAndTargetVertexPresent = sourceVertex !== null && targetVertex !== null;

      if (sourceVertexAndTargetVertexPresent) {
        var targetVertexSourceVertexImmediateSuccessorVertex = sourceVertex.isVertexImmediateSuccessorVertex(targetVertex),
            sourceVertexTargetVertexImmediatePredecessorVertex = targetVertex.isVertexImmediatePredecessorVertex(sourceVertex);

        edgePresent = targetVertexSourceVertexImmediateSuccessorVertex && sourceVertexTargetVertexImmediatePredecessorVertex;
      }

      return edgePresent;
    }
  }, {
    key: 'retrieveVertexByVertexName',
    value: function retrieveVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresentByVertexName(vertexName),
          vertex = vertexPresent ? this.vertexMap[vertexName] : null;

      return vertex;
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
    key: 'removeEdge',
    value: function removeEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName();

      this.removeEdgeByVertexNames(sourceVertexName, targetVertexName);
    }
  }, {
    key: 'addVertexByVertexName',
    value: function addVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresentByVertexName(vertexName);

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
    key: 'removeVertexByVertexName',
    value: function removeVertexByVertexName(vertexName) {
      var removedEdges = null;

      var vertexPresent = this.isVertexPresentByVertexName(vertexName);

      if (vertexPresent) {
        removedEdges = [];

        var vertex = this.retrieveVertexByVertexName(vertexName);

        vertex.forEachImmediateSuccessorVertex(function (immediateSuccessVertex) {
          var immediatePredecessorVertex = vertex,
              ///
          immediatePredecessorVertexName = immediatePredecessorVertex.getName(),
              immediateSuccessVertexName = immediateSuccessVertex.getName(),
              removedEdgeSourceVertexName = immediatePredecessorVertexName,
              ///
          removedEdgeTargetVertexName = immediateSuccessVertexName,
              /// 
          removedEdge = new Edge(removedEdgeSourceVertexName, removedEdgeTargetVertexName);

          removedEdges.push(removedEdge);

          immediateSuccessVertex.removeImmediatePredecessorVertex(immediatePredecessorVertex);
        });

        vertex.forEachImmediatePredecessorVertex(function (immediatePredecessorVertex) {
          var immediateSuccessVertex = vertex,
              ///
          immediatePredecessorVertexName = immediatePredecessorVertex.getName(),
              immediateSuccessVertexName = immediateSuccessVertex.getName(),
              ///
          removedEdgeSourceVertexName = immediatePredecessorVertexName,
              ///
          removedEdgeTargetVertexName = immediateSuccessVertexName,
              /// 
          removedEdge = new Edge(removedEdgeSourceVertexName, removedEdgeTargetVertexName);

          removedEdges.push(removedEdge);

          immediatePredecessorVertex.removeImmediateSuccessorVertex(immediateSuccessVertex);
        });

        delete this.vertexMap[vertexName];
      }

      return removedEdges;
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
            cyclicVertices = this.validateEdgeByVertices(sourceVertex, targetVertex);
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
        cyclicVertexNames = cyclicVertices.map(function (cyclicVertex) {
          var cyclicVertexName = cyclicVertex.getName();

          return cyclicVertexName;
        });
      }

      return cyclicVertexNames;
    }
  }, {
    key: 'removeEdgeByVertexNames',
    value: function removeEdgeByVertexNames(sourceVertexName, targetVertexName) {
      var edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);

      if (edgePresent) {
        var sourceVertex = this.retrieveVertexByVertexName(sourceVertexName),
            targetVertex = this.retrieveVertexByVertexName(targetVertexName);

        sourceVertex.removeImmediateSuccessorVertex(targetVertex);
        targetVertex.removeImmediatePredecessorVertex(sourceVertex);
      }
    }
  }, {
    key: 'validateEdgeByVertices',
    value: function validateEdgeByVertices(sourceVertex, targetVertex) {
      var cyclicVertices = null;

      var forwardsAffectedVertices = targetVertex.getForwardsAffectedVertices(sourceVertex),
          lastForwardsAffectedVertex = last(forwardsAffectedVertices),
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
    key: 'fromVertexNames',
    value: function fromVertexNames(vertexNames) {
      var vertexMap = vertexMapFromVertexNames(vertexNames);

      var directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);

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

function vertexMapFromVertexNames(vertexNames) {
  var vertexMap = {};

  vertexNames.forEach(function (vertexName, index) {
    var name = vertexName,
        ///
    vertex = Vertex.fromNameAndIndex(name, index);

    vertexMap[vertexName] = vertex;
  });

  return vertexMap;
}

function vertexMapFromTopologicallyOrderedVertices(topologicallyOrderedVertices) {
  var vertexMap = {};

  topologicallyOrderedVertices.forEach(function (topologicallyOrderedVertex, index) {
    var name = topologicallyOrderedVertex.getName(),
        vertex = Vertex.fromNameAndIndex(name, index),
        vertexName = name; ///

    vertexMap[vertexName] = vertex;
  });

  return vertexMap;
}

function addEdgesToVertices(topologicallyOrderedVertices, vertexMap) {
  topologicallyOrderedVertices.forEach(function (topologicallyOrderedVertex) {
    topologicallyOrderedVertex.forEachOutgoingEdge(function (outgoingEdge) {
      var sourceVertexName = outgoingEdge.getSourceVertexName(),
          targetVertexName = outgoingEdge.getTargetVertexName(),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsImFycmF5IiwibGFzdCIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiZWRnZSIsInNvdXJjZVZlcnRleE5hbWUiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwidGFyZ2V0VmVydGV4TmFtZSIsImdldFRhcmdldFZlcnRleE5hbWUiLCJlZGdlUHJlc2VudCIsImlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzIiwidmVydGV4TmFtZSIsInZlcnRleFByZXNlbnQiLCJoYXNPd25Qcm9wZXJ0eSIsInNvdXJjZVZlcnRleCIsInJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lIiwidGFyZ2V0VmVydGV4Iiwic291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCIsInRhcmdldFZlcnRleFNvdXJjZVZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic291cmNlVmVydGV4VGFyZ2V0VmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lIiwidmVydGV4IiwiY3ljbGljVmVydGV4TmFtZXMiLCJhZGRFZGdlQnlWZXJ0ZXhOYW1lcyIsInJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzIiwidmVydGV4TmFtZXNMZW5ndGgiLCJsZW5ndGgiLCJuYW1lIiwiaW5kZXgiLCJmcm9tTmFtZUFuZEluZGV4IiwicmVtb3ZlZEVkZ2VzIiwiZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlIiwicHVzaCIsInJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwicmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiY3ljbGljVmVydGljZXMiLCJjeWNsaWNWZXJ0ZXhOYW1lIiwiY3ljbGljVmVydGV4IiwiYWRkVmVydGV4QnlWZXJ0ZXhOYW1lIiwiaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4Iiwic291cmNlVmVydGV4SW5kZXgiLCJnZXRJbmRleCIsInRhcmdldFZlcnRleEluZGV4IiwiaW52YWxpZGF0aW5nRWRnZSIsInZhbGlkYXRlRWRnZUJ5VmVydGljZXMiLCJjeWNsZU1pc3NpbmciLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJhZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJhZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsIm1hcCIsImZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImdldEZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4IiwiY3ljbGVQcmVzZW50IiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJzb3J0VmVydGljZXMiLCJhZmZlY3RlZFZlcnRpY2VzIiwiY29uY2F0IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzIiwiYWZmZWN0ZWRWZXJ0ZXgiLCJhZmZlY3RlZFZlcnRleEluZGV4Iiwic29ydCIsImZvckVhY2giLCJzZXRJbmRleCIsImNhbGxiYWNrIiwicmVzdWx0IiwiYmluZCIsImRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwRnJvbVZlcnRleE5hbWVzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsInZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwiYWRkRWRnZXNUb1ZlcnRpY2VzIiwidmVydGljZXMiLCJmaXJzdFZlcnRleCIsInNlY29uZFZlcnRleCIsImZpcnN0VmVydGV4SW5kZXgiLCJzZWNvbmRWZXJ0ZXhJbmRleCIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCIsImZvckVhY2hPdXRnb2luZ0VkZ2UiLCJvdXRnb2luZ0VkZ2UiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWUMsUUFBUSxXQUFSLENBQWxCOztBQUVBLElBQU1DLE9BQU9ELFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUUsU0FBU0YsUUFBUSxVQUFSLENBRGY7O0FBR00sSUFBRUcsS0FBRixHQUFZSixTQUFaLENBQUVJLEtBQUY7QUFBQSxJQUNFQyxJQURGLEdBQ1VELEtBRFYsQ0FDRUMsSUFERjs7SUFHQUMsb0I7QUFDSixnQ0FBWUMsU0FBWixFQUF1QjtBQUFBOztBQUNyQixTQUFLQSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEOzs7O3FDQUVnQjtBQUNmLFVBQU1DLGNBQWNDLE9BQU9DLElBQVAsQ0FBWSxLQUFLSCxTQUFqQixDQUFwQjs7QUFFQSxhQUFPQyxXQUFQO0FBQ0Q7OztrQ0FFYUcsSSxFQUFNO0FBQ2xCLFVBQU1DLG1CQUFtQkQsS0FBS0UsbUJBQUwsRUFBekI7QUFBQSxVQUNNQyxtQkFBbUJILEtBQUtJLG1CQUFMLEVBRHpCO0FBQUEsVUFFTUMsY0FBYyxLQUFLQywwQkFBTCxDQUFnQ0wsZ0JBQWhDLEVBQWtERSxnQkFBbEQsQ0FGcEI7O0FBSUEsYUFBT0UsV0FBUDtBQUNEOzs7Z0RBRTJCRSxVLEVBQVk7QUFDdEMsVUFBTUMsZ0JB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QUVELFNBQVNtRixrQkFBVCxDQUE0QkYsNEJBQTVCLEVBQTBEakYsU0FBMUQsRUFBcUU7QUFDbkVpRiwrQkFBNkJQLE9BQTdCLENBQXFDLFVBQVNpQiwwQkFBVCxFQUFxQztBQUN4RUEsK0JBQTJCQyxtQkFBM0IsQ0FBK0MsVUFBU0MsWUFBVCxFQUF1QjtBQUNwRSxVQUFNeEYsbUJBQW1Cd0YsYUFBYXZGLG1CQUFiLEVBQXpCO0FBQUEsVUFDTUMsbUJBQW1Cc0YsYUFBYXJGLG1CQUFiLEVBRHpCO0FBQUEsVUFFTTRCLGlDQUFpQy9CLGdCQUZ2QztBQUFBLFVBRTBEO0FBQ3BEeUYscUNBQStCdkYsZ0JBSHJDO0FBQUEsVUFJTTRCLDZCQUE2Qm5DLFVBQVVvQyw4QkFBVixDQUpuQztBQUFBLFVBSThFO0FBQ3hFcUIsaUNBQTJCekQsVUFBVThGLDRCQUFWLENBTGpDLENBRG9FLENBTU07O0FBRTFFM0QsaUNBQTJCdUIsMkJBQTNCLENBQXVERCx3QkFBdkQ7O0FBRUFBLCtCQUF5QkUsNkJBQXpCLENBQXVEeEIsMEJBQXZEO0FBQ0QsS0FYRDtBQVlELEdBYkQ7QUFjRCIsImZpbGUiOiJkaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IEVkZ2UgPSByZXF1aXJlKCcuL2VkZ2UnKSxcbiAgICAgIFZlcnRleCA9IHJlcXVpcmUoJy4vdmVydGV4Jyk7XG5cbmNvbnN0IHsgYXJyYXkgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgbGFzdH0gPSBhcnJheTtcblxuY2xhc3MgRGlyZWN0ZWRBY3ljbGljR3JhcGgge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhNYXApIHtcbiAgICB0aGlzLnZlcnRleE1hcCA9IHZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIHZlcnRleE5hbWVzO1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudChlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gICAgXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG4gIFxuICBpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLnZlcnRleE1hcC5oYXNPd25Qcm9wZXJ0eSh2ZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiB2ZXJ0ZXhQcmVzZW50O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBlZGdlUHJlc2VudCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCA9IChzb3VyY2VWZXJ0ZXggIT09IG51bGwpICYmICh0YXJnZXRWZXJ0ZXggIT09IG51bGwpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldFZlcnRleFNvdXJjZVZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleC5pc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpLFxuICAgICAgICAgIHNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4LmlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcblxuICAgICAgZWRnZVByZXNlbnQgPSAodGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ICYmIHNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICByZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleCA9IHZlcnRleFByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA6XG4gICAgICAgICAgICAgICAgICAgICAgbnVsbDtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICBhZGRFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGN5Y2xpY1ZlcnRleE5hbWVzID0gdGhpcy5hZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lcztcbiAgfVxuICBcbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKTtcblxuICAgIHRoaXMucmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gIH1cblxuICBhZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICghdmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgICB2ZXJ0ZXhOYW1lc0xlbmd0aCA9IHZlcnRleE5hbWVzLmxlbmd0aCxcbiAgICAgICAgICAgIG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbmRleCA9IHZlcnRleE5hbWVzTGVuZ3RoLCAvLy9cbiAgICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlZEVkZ2VzID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAodmVydGV4UHJlc2VudCkge1xuICAgICAgcmVtb3ZlZEVkZ2VzID0gW107XG4gICAgICBcbiAgICAgIGNvbnN0IHZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vIFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSwgIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vIFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlbGV0ZSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWRFZGdlcztcbiAgfVxuXG4gIGFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgY3ljbGljVmVydGljZXMgPSBudWxsO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleE5hbWUgPT09IHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICAgIGNvbnN0IGN5Y2xpY1ZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBjeWNsaWNWZXJ0ZXggPSB0aGlzLnZlcnRleE1hcFtjeWNsaWNWZXJ0ZXhOYW1lXTtcblxuICAgICAgY3ljbGljVmVydGljZXMgPSBbY3ljbGljVmVydGV4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4LmlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuXG4gICAgICBpZiAoIWVkZ2VQcmVzZW50KSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZVZlcnRleEluZGV4ID0gc291cmNlVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIHRhcmdldFZlcnRleEluZGV4ID0gdGFyZ2V0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIGludmFsaWRhdGluZ0VkZ2UgPSAoc291cmNlVmVydGV4SW5kZXggPiB0YXJnZXRWZXJ0ZXhJbmRleCk7XG5cbiAgICAgICAgaWYgKGludmFsaWRhdGluZ0VkZ2UpIHtcbiAgICAgICAgICBjeWNsaWNWZXJ0aWNlcyA9IHRoaXMudmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjeWNsZU1pc3NpbmcgPSAoY3ljbGljVmVydGljZXMgPT09IG51bGwpOyAvLy9cblxuICAgICAgICBpZiAoY3ljbGVNaXNzaW5nKSB7XG4gICAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleDsgLy8vXG5cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY3ljbGljVmVydGV4TmFtZXMgPSBudWxsO1xuXG4gICAgaWYgKGN5Y2xpY1ZlcnRpY2VzICE9PSBudWxsKSB7XG4gICAgICBjeWNsaWNWZXJ0ZXhOYW1lcyA9IGN5Y2xpY1ZlcnRpY2VzLm1hcChmdW5jdGlvbihjeWNsaWNWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgY3ljbGljVmVydGV4TmFtZSA9IGN5Y2xpY1ZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZXM7XG4gIH1cblxuICByZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgc291cmNlVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0YXJnZXRWZXJ0ZXguZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCksXG4gICAgICAgICAgbGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPSBsYXN0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgY3ljbGVQcmVzZW50ID0gKGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgIFxuICAgIGlmIChjeWNsZVByZXNlbnQpIHtcbiAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gc291cmNlVmVydGV4LmdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKTtcblxuICAgICAgRGlyZWN0ZWRBY3ljbGljR3JhcGguc29ydFZlcnRpY2VzKGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgICBEaXJlY3RlZEFjeWNsaWNHcmFwaC5zb3J0VmVydGljZXMoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0aWNlcyA9IFtdLmNvbmNhdChiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKS5jb25jYXQoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcyA9IGFmZmVjdGVkVmVydGljZXMubWFwKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleC5nZXRJbmRleCgpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRleEluZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcy5zb3J0KCk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4SW5kaWNlc1tpbmRleF07XG5cbiAgICAgICAgYWZmZWN0ZWRWZXJ0ZXguc2V0SW5kZXgoYWZmZWN0ZWRWZXJ0ZXhJbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGljZXM7XG4gIH1cblxuICBtYXBWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKSxcbiAgICAgICAgICByZXN1bHQgPSB2ZXJ0ZXhOYW1lcy5tYXAoZnVuY3Rpb24odmVydGV4TmFtZSkge1xuICAgICAgICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0sXG4gICAgICAgICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayh2ZXJ0ZXgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZvckVhY2hWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKTtcblxuICAgIHZlcnRleE5hbWVzLmZvckVhY2goZnVuY3Rpb24odmVydGV4TmFtZSkge1xuICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG5cbiAgICAgIGNhbGxiYWNrKHZlcnRleCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHt9LFxuICAgICAgICAgIGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpO1xuXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyk7XG4gICAgXG4gICAgYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCk7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcbiAgICBcbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cblxuICBzdGF0aWMgc29ydFZlcnRpY2VzKHZlcnRpY2VzKSB7XG4gICAgdmVydGljZXMuc29ydChmdW5jdGlvbihmaXJzdFZlcnRleCwgc2Vjb25kVmVydGV4KSB7XG4gICAgICBjb25zdCBmaXJzdFZlcnRleEluZGV4ID0gZmlyc3RWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgIHNlY29uZFZlcnRleEluZGV4ID0gc2Vjb25kVmVydGV4LmdldEluZGV4KCk7XG5cbiAgICAgIGlmIChmYWxzZSkge1xuXG4gICAgICB9IGVsc2UgIGlmIChmaXJzdFZlcnRleEluZGV4IDwgc2Vjb25kVmVydGV4SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfSBlbHNlICBpZiAoZmlyc3RWZXJ0ZXhJbmRleCA+IHNlY29uZFZlcnRleEluZGV4KSB7XG4gICAgICAgIHJldHVybiArMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB2ZXJ0ZXhOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHZlcnRleE5hbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICB2ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH0pO1xuICBcbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCwgaW5kZXgpIHtcbiAgICBjb25zdCBuYW1lID0gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lID0gbmFtZTsgIC8vL1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcblxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKSB7XG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCkge1xuICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmZvckVhY2hPdXRnb2luZ0VkZ2UoZnVuY3Rpb24ob3V0Z29pbmdFZGdlKSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSA9IHRhcmdldFZlcnRleE5hbWUsXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVdLCAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lXTsgLy8vXG5cbiAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==