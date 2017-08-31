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
    key: 'getVertices',
    value: function getVertices() {
      var vertices = Object.values(this.vertexMap);

      return vertices;
    }
  }, {
    key: 'getTopologicallyOrderedVertexNames',
    value: function getTopologicallyOrderedVertexNames() {
      var vertices = this.getVertices(),
          topologicallyOrderedVertices = DirectedAcyclicGraph.topologicallyOrderVertices(vertices),
          topologicallyOrderedVertexNames = topologicallyOrderedVertices.forEach(function (topologicallyOrderedVertex) {
        var topologicallyOrderedVertexName = topologicallyOrderedVertex.getName();

        return topologicallyOrderedVertexName;
      });

      return topologicallyOrderedVertexNames;
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
    key: 'removeEdgesBySourceVertexName',
    value: function removeEdgesBySourceVertexName(sourceVertexName) {
      var sourceVertexPresent = this.isVertexPresentByVertexName(sourceVertexName);

      if (sourceVertexPresent) {
        var sourceVertex = this.retrieveVertexByVertexName(sourceVertexName);

        sourceVertex.removeOutgoingEdges();
      }
    }
  }, {
    key: 'removeEdgesByTargetVertexName',
    value: function removeEdgesByTargetVertexName(targetVertexName) {
      var targetVertexPresent = this.isVertexPresentByVertexName(targetVertexName);

      if (targetVertexPresent) {
        var targetVertex = this.retrieveVertexByVertexName(targetVertexName);

        targetVertex.removeIncomingEdges();
      }
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

        DirectedAcyclicGraph.topologicallyOrderVertices(backwardsAffectedVertices);

        DirectedAcyclicGraph.topologicallyOrderVertices(forwardsAffectedVertices);

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
    key: 'topologicallyOrderVertices',
    value: function topologicallyOrderVertices(vertices) {
      ///
      vertices = vertices.slice(); ///

      vertices.sort(function (firstVertex, secondVertex) {
        var firstVertexIndex = firstVertex.getIndex(),
            secondVertexIndex = secondVertex.getIndex();

        if (false) {} else if (firstVertexIndex < secondVertexIndex) {
          return -1;
        } else if (firstVertexIndex > secondVertexIndex) {
          return +1;
        }
      });

      var topologicallyOrderedVertices = vertices; ///

      return topologicallyOrderedVertices;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsImFycmF5IiwibGFzdCIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwidmVydGljZXMiLCJ2YWx1ZXMiLCJnZXRWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMiLCJmb3JFYWNoIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWUiLCJnZXROYW1lIiwiZWRnZSIsInNvdXJjZVZlcnRleE5hbWUiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwidGFyZ2V0VmVydGV4TmFtZSIsImdldFRhcmdldFZlcnRleE5hbWUiLCJlZGdlUHJlc2VudCIsImlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzIiwidmVydGV4TmFtZSIsInZlcnRleFByZXNlbnQiLCJoYXNPd25Qcm9wZXJ0eSIsInNvdXJjZVZlcnRleFByZXNlbnQiLCJpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUiLCJzb3VyY2VWZXJ0ZXgiLCJyZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSIsInJlbW92ZU91dGdvaW5nRWRnZXMiLCJ0YXJnZXRWZXJ0ZXhQcmVzZW50IiwidGFyZ2V0VmVydGV4IiwicmVtb3ZlSW5jb21pbmdFZGdlcyIsInNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQiLCJ0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInZlcnRleCIsImN5Y2xpY1ZlcnRleE5hbWVzIiwiYWRkRWRnZUJ5VmVydGV4TmFtZXMiLCJyZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWVzTGVuZ3RoIiwibGVuZ3RoIiwibmFtZSIsImluZGV4IiwiZnJvbU5hbWVBbmRJbmRleCIsInJlbW92ZWRFZGdlcyIsImZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4IiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlIiwicHVzaCIsInJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwicmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiY3ljbGljVmVydGljZXMiLCJjeWNsaWNWZXJ0ZXhOYW1lIiwiY3ljbGljVmVydGV4IiwiYWRkVmVydGV4QnlWZXJ0ZXhOYW1lIiwiaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4Iiwic291cmNlVmVydGV4SW5kZXgiLCJnZXRJbmRleCIsInRhcmdldFZlcnRleEluZGV4IiwiaW52YWxpZGF0aW5nRWRnZSIsInZhbGlkYXRlRWRnZUJ5VmVydGljZXMiLCJjeWNsZU1pc3NpbmciLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJhZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJhZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsIm1hcCIsImZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImdldEZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4IiwiY3ljbGVQcmVzZW50IiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJhZmZlY3RlZFZlcnRpY2VzIiwiY29uY2F0IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzIiwiYWZmZWN0ZWRWZXJ0ZXgiLCJhZmZlY3RlZFZlcnRleEluZGV4Iiwic29ydCIsInNldEluZGV4IiwiZGlyZWN0ZWRBY3ljbGljR3JhcGgiLCJ2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXMiLCJ2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsImFkZEVkZ2VzVG9WZXJ0aWNlcyIsInNsaWNlIiwiZmlyc3RWZXJ0ZXgiLCJzZWNvbmRWZXJ0ZXgiLCJmaXJzdFZlcnRleEluZGV4Iiwic2Vjb25kVmVydGV4SW5kZXgiLCJtb2R1bGUiLCJleHBvcnRzIiwiZm9yRWFjaE91dGdvaW5nRWRnZSIsIm91dGdvaW5nRWRnZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZQyxRQUFRLFdBQVIsQ0FBbEI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNNRSxTQUFTRixRQUFRLFVBQVIsQ0FEZjs7QUFHTSxJQUFFRyxLQUFGLEdBQVlKLFNBQVosQ0FBRUksS0FBRjtBQUFBLElBQ0VDLElBREYsR0FDVUQsS0FEVixDQUNFQyxJQURGOztJQUdBQyxvQjtBQUNKLGdDQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBQ3JCLFNBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0Q7Ozs7cUNBRWdCO0FBQ2YsVUFBTUMsY0FBY0MsT0FBT0MsSUFBUCxDQUFZLEtBQUtILFNBQWpCLENBQXBCOztBQUVBLGFBQU9DLFdBQVA7QUFDRDs7O2tDQUVhO0FBQ1osVUFBTUcsV0FBV0YsT0FBT0csTUFB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O0FBRUFBLCtCQUF5QkUsNkJBQXpCLENBQXVEdkIsMEJBQXZEO0FBQ0QsS0FYRDtBQVlELEdBYkQ7QUFjRCIsImZpbGUiOiJkaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IEVkZ2UgPSByZXF1aXJlKCcuL2VkZ2UnKSxcbiAgICAgIFZlcnRleCA9IHJlcXVpcmUoJy4vdmVydGV4Jyk7XG5cbmNvbnN0IHsgYXJyYXkgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgbGFzdH0gPSBhcnJheTtcblxuY2xhc3MgRGlyZWN0ZWRBY3ljbGljR3JhcGgge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhNYXApIHtcbiAgICB0aGlzLnZlcnRleE1hcCA9IHZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIHZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0VmVydGljZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSBPYmplY3QudmFsdWVzKHRoaXMudmVydGV4TWFwKTtcblxuICAgIHJldHVybiB2ZXJ0aWNlcztcbiAgfVxuXG4gIGdldFRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyA9IERpcmVjdGVkQWN5Y2xpY0dyYXBoLnRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHZlcnRpY2VzKSxcbiAgICAgICAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzID0gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4KSB7XG4gICAgICAgICAgICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWUgPSB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWU7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnQoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICAgIFxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuICBcbiAgaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy52ZXJ0ZXhNYXAuaGFzT3duUHJvcGVydHkodmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gdmVydGV4UHJlc2VudDtcbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlTb3VyY2VWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG4gICAgXG4gICAgaWYgKHNvdXJjZVZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVPdXRnb2luZ0VkZ2VzKCk7ICAgICAgICAgXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRWRnZXNCeVRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHRhcmdldFZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh0YXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW5jb21pbmdFZGdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgZWRnZVByZXNlbnQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50ID0gKHNvdXJjZVZlcnRleCAhPT0gbnVsbCkgJiYgKHRhcmdldFZlcnRleCAhPT0gbnVsbCk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gc291cmNlVmVydGV4LmlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCksXG4gICAgICAgICAgICBzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleC5pc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCk7XG5cbiAgICAgIGVkZ2VQcmVzZW50ID0gKHRhcmdldFZlcnRleFNvdXJjZVZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCAmJiBzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgcmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0ZXhQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gOlxuICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgYWRkRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBjeWNsaWNWZXJ0ZXhOYW1lcyA9IHRoaXMuYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZXM7XG4gIH1cbiAgXG4gIHJlbW92ZUVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCk7XG5cbiAgICB0aGlzLnJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICB9XG5cbiAgYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAoIXZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApLFxuICAgICAgICAgICAgdmVydGV4TmFtZXNMZW5ndGggPSB2ZXJ0ZXhOYW1lcy5sZW5ndGgsXG4gICAgICAgICAgICBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW5kZXggPSB2ZXJ0ZXhOYW1lc0xlbmd0aCwgLy8vXG4gICAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIHJlbW92ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IHJlbW92ZWRFZGdlcyA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHZlcnRleFByZXNlbnQpIHtcbiAgICAgIHJlbW92ZWRFZGdlcyA9IFtdO1xuICAgICAgXG4gICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vLyBcbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksICAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vLyBcbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZWxldGUgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkRWRnZXM7XG4gIH1cblxuICBhZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IGN5Y2xpY1ZlcnRpY2VzID0gbnVsbDtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhOYW1lID09PSB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgICBjb25zdCBjeWNsaWNWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgY3ljbGljVmVydGV4ID0gdGhpcy52ZXJ0ZXhNYXBbY3ljbGljVmVydGV4TmFtZV07XG5cbiAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gW2N5Y2xpY1ZlcnRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcblxuICAgICAgaWYgKCFlZGdlUHJlc2VudCkge1xuICAgICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbmRleCA9IHNvdXJjZVZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICB0YXJnZXRWZXJ0ZXhJbmRleCA9IHRhcmdldFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICBpbnZhbGlkYXRpbmdFZGdlID0gKHNvdXJjZVZlcnRleEluZGV4ID4gdGFyZ2V0VmVydGV4SW5kZXgpO1xuXG4gICAgICAgIGlmIChpbnZhbGlkYXRpbmdFZGdlKSB7XG4gICAgICAgICAgY3ljbGljVmVydGljZXMgPSB0aGlzLnZhbGlkYXRlRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3ljbGVNaXNzaW5nID0gKGN5Y2xpY1ZlcnRpY2VzID09PSBudWxsKTsgLy8vXG5cbiAgICAgICAgaWYgKGN5Y2xlTWlzc2luZykge1xuICAgICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gc291cmNlVmVydGV4LCAvLy9cbiAgICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0YXJnZXRWZXJ0ZXg7IC8vL1xuXG4gICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGN5Y2xpY1ZlcnRleE5hbWVzID0gbnVsbDtcblxuICAgIGlmIChjeWNsaWNWZXJ0aWNlcyAhPT0gbnVsbCkge1xuICAgICAgY3ljbGljVmVydGV4TmFtZXMgPSBjeWNsaWNWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oY3ljbGljVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGN5Y2xpY1ZlcnRleE5hbWUgPSBjeWNsaWNWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWVzO1xuICB9XG5cbiAgcmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IGVkZ2VQcmVzZW50ID0gdGhpcy5pc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmIChlZGdlUHJlc2VudCkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpIHtcbiAgICBsZXQgY3ljbGljVmVydGljZXMgPSBudWxsO1xuXG4gICAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGFyZ2V0VmVydGV4LmdldEZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgpLFxuICAgICAgICAgIGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID0gbGFzdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICAgIGN5Y2xlUHJlc2VudCA9IChsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9PT0gc291cmNlVmVydGV4KTtcbiAgICBcbiAgICBpZiAoY3ljbGVQcmVzZW50KSB7XG4gICAgICBjeWNsaWNWZXJ0aWNlcyA9IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHNvdXJjZVZlcnRleC5nZXRCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKCk7XG5cbiAgICAgIERpcmVjdGVkQWN5Y2xpY0dyYXBoLnRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgICBEaXJlY3RlZEFjeWNsaWNHcmFwaC50b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgICBjb25zdCBhZmZlY3RlZFZlcnRpY2VzID0gW10uY29uY2F0KGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpLmNvbmNhdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzID0gYWZmZWN0ZWRWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgpIHtcbiAgICAgICAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4LmdldEluZGV4KCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGV4SW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzLnNvcnQoKTtcblxuICAgICAgYWZmZWN0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4LCBpbmRleCkge1xuICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzW2luZGV4XTtcblxuICAgICAgICBhZmZlY3RlZFZlcnRleC5zZXRJbmRleChhZmZlY3RlZFZlcnRleEluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjeWNsaWNWZXJ0aWNlcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fSxcbiAgICAgICAgICBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKTtcblxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpO1xuICAgIFxuICAgIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG5cbiAgc3RhdGljIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHZlcnRpY2VzKSB7ICAvLy9cbiAgICB2ZXJ0aWNlcyA9IHZlcnRpY2VzLnNsaWNlKCk7ICAvLy9cblxuICAgIHZlcnRpY2VzLnNvcnQoZnVuY3Rpb24oZmlyc3RWZXJ0ZXgsIHNlY29uZFZlcnRleCkge1xuICAgICAgY29uc3QgZmlyc3RWZXJ0ZXhJbmRleCA9IGZpcnN0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICBzZWNvbmRWZXJ0ZXhJbmRleCA9IHNlY29uZFZlcnRleC5nZXRJbmRleCgpO1xuXG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlICBpZiAoZmlyc3RWZXJ0ZXhJbmRleCA8IHNlY29uZFZlcnRleEluZGV4KSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH0gZWxzZSAgaWYgKGZpcnN0VmVydGV4SW5kZXggPiBzZWNvbmRWZXJ0ZXhJbmRleCkge1xuICAgICAgICByZXR1cm4gKzE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzID0gdmVydGljZXM7ICAvLy9cblxuICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0ZWRBY3ljbGljR3JhcGg7XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIHZlcnRleE5hbWVzLmZvckVhY2goZnVuY3Rpb24odmVydGV4TmFtZSwgaW5kZXgpIHtcbiAgICBjb25zdCBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG4gIFxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpLFxuICAgICAgICAgIHZlcnRleE5hbWUgPSBuYW1lOyAgLy8vXG5cbiAgICB2ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH0pO1xuXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApIHtcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4KSB7XG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZm9yRWFjaE91dGdvaW5nRWRnZShmdW5jdGlvbihvdXRnb2luZ0VkZ2UpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lID0gdGFyZ2V0VmVydGV4TmFtZSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZV0sIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVdOyAvLy9cblxuICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19