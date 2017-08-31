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
    key: 'getTopologicallyOrderedVertexNames',
    value: function getTopologicallyOrderedVertexNames() {}
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

        DirectedAcyclicGraph.orderVertices(backwardsAffectedVertices);

        DirectedAcyclicGraph.orderVertices(forwardsAffectedVertices);

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
    key: 'orderVertices',
    value: function orderVertices(vertices) {
      ///
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsImFycmF5IiwibGFzdCIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiZWRnZSIsInNvdXJjZVZlcnRleE5hbWUiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwidGFyZ2V0VmVydGV4TmFtZSIsImdldFRhcmdldFZlcnRleE5hbWUiLCJlZGdlUHJlc2VudCIsImlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzIiwidmVydGV4TmFtZSIsInZlcnRleFByZXNlbnQiLCJoYXNPd25Qcm9wZXJ0eSIsInNvdXJjZVZlcnRleFByZXNlbnQiLCJpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUiLCJzb3VyY2VWZXJ0ZXgiLCJyZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSIsInJlbW92ZU91dGdvaW5nRWRnZXMiLCJ0YXJnZXRWZXJ0ZXhQcmVzZW50IiwidGFyZ2V0VmVydGV4IiwicmVtb3ZlSW5jb21pbmdFZGdlcyIsInNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQiLCJ0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInZlcnRleCIsImN5Y2xpY1ZlcnRleE5hbWVzIiwiYWRkRWRnZUJ5VmVydGV4TmFtZXMiLCJyZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWVzTGVuZ3RoIiwibGVuZ3RoIiwibmFtZSIsImluZGV4IiwiZnJvbU5hbWVBbmRJbmRleCIsInJlbW92ZWRFZGdlcyIsImZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4IiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUiLCJnZXROYW1lIiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZSIsInB1c2giLCJyZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImN5Y2xpY1ZlcnRpY2VzIiwiY3ljbGljVmVydGV4TmFtZSIsImN5Y2xpY1ZlcnRleCIsImFkZFZlcnRleEJ5VmVydGV4TmFtZSIsImlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCIsInNvdXJjZVZlcnRleEluZGV4IiwiZ2V0SW5kZXgiLCJ0YXJnZXRWZXJ0ZXhJbmRleCIsImludmFsaWRhdGluZ0VkZ2UiLCJ2YWxpZGF0ZUVkZ2VCeVZlcnRpY2VzIiwiY3ljbGVNaXNzaW5nIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJtYXAiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJnZXRGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCIsImN5Y2xlUHJlc2VudCIsImJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJnZXRCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwib3JkZXJWZXJ0aWNlcyIsImFmZmVjdGVkVmVydGljZXMiLCJjb25jYXQiLCJhZmZlY3RlZFZlcnRleEluZGljZXMiLCJhZmZlY3RlZFZlcnRleCIsImFmZmVjdGVkVmVydGV4SW5kZXgiLCJzb3J0IiwiZm9yRWFjaCIsInNldEluZGV4IiwiY2FsbGJhY2siLCJyZXN1bHQiLCJiaW5kIiwiZGlyZWN0ZWRBY3ljbGljR3JhcGgiLCJ2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwidmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJhZGRFZGdlc1RvVmVydGljZXMiLCJ2ZXJ0aWNlcyIsImZpcnN0VmVydGV4Iiwic2Vjb25kVmVydGV4IiwiZmlyc3RWZXJ0ZXhJbmRleCIsInNlY29uZFZlcnRleEluZGV4IiwibW9kdWxlIiwiZXhwb3J0cyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4IiwiZm9yRWFjaE91dGdvaW5nRWRnZSIsIm91dGdvaW5nRWRnZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZQyxRQUFRLFdBQVIsQ0FBbEI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNNRSxTQUFTRixRQUFRLFVBQVIsQ0FEZjs7QUFHTSxJQUFFRyxLQUFGLEdBQVlKLFNBQVosQ0FBRUksS0FBRjtBQUFBLElBQ0VDLElBREYsR0FDVUQsS0FEVixDQUNFQyxJQURGOztJQUdBQyxvQjtBQUNKLGdDQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBQ3JCLFNBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0Q7Ozs7cUNBRWdCO0FBQ2YsVUFBTUMsY0FBY0MsT0FBT0MsSUFBUCxDQUFZLEtBQUtILFNBQWpCLENBQXBCOztBQUVBLGFBQU9DLFdBQVA7QUFDRDs7O3lEQUVvQyxDQUVwQzs7O2tDQUVhRyxJLEVBQU07QUFDbEIsVUFBTUMsbUJBQW1CRCxLQUFLRSxtQkFBTCxFQUF6QjtBQUFBLFVBQ01DLG1CQUFtQkgsS0FBS0ksbUJBQUwsRUFEekI7QUFBQSxVQUVNQyxj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QUF5QkUsNkJBQXpCLENBQXVEeEIsMEJBQXZEO0FBQ0QsS0FYRDtBQVlELEdBYkQ7QUFjRCIsImZpbGUiOiJkaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IEVkZ2UgPSByZXF1aXJlKCcuL2VkZ2UnKSxcbiAgICAgIFZlcnRleCA9IHJlcXVpcmUoJy4vdmVydGV4Jyk7XG5cbmNvbnN0IHsgYXJyYXkgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgbGFzdH0gPSBhcnJheTtcblxuY2xhc3MgRGlyZWN0ZWRBY3ljbGljR3JhcGgge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhNYXApIHtcbiAgICB0aGlzLnZlcnRleE1hcCA9IHZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIHZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcygpIHtcblxuICB9XG5cbiAgaXNFZGdlUHJlc2VudChlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gICAgXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG4gIFxuICBpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLnZlcnRleE1hcC5oYXNPd25Qcm9wZXJ0eSh2ZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiB2ZXJ0ZXhQcmVzZW50O1xuICB9XG5cbiAgcmVtb3ZlRWRnZXNCeVNvdXJjZVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcbiAgICBcbiAgICBpZiAoc291cmNlVmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcblxuICAgICAgc291cmNlVmVydGV4LnJlbW92ZU91dGdvaW5nRWRnZXMoKTsgICAgICAgICBcbiAgICB9XG4gIH1cblxuICByZW1vdmVFZGdlc0J5VGFyZ2V0VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdGFyZ2V0VmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHRhcmdldFZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldFZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbmNvbWluZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBlZGdlUHJlc2VudCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgIHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQgPSAoc291cmNlVmVydGV4ICE9PSBudWxsKSAmJiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXguaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KSxcbiAgICAgICAgICAgIHNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4LmlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcblxuICAgICAgZWRnZVByZXNlbnQgPSAodGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ICYmIHNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICByZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleCA9IHZlcnRleFByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA6XG4gICAgICAgICAgICAgICAgICAgICAgbnVsbDtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICBhZGRFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGN5Y2xpY1ZlcnRleE5hbWVzID0gdGhpcy5hZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lcztcbiAgfVxuICBcbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKTtcblxuICAgIHRoaXMucmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gIH1cblxuICBhZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICghdmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgICB2ZXJ0ZXhOYW1lc0xlbmd0aCA9IHZlcnRleE5hbWVzLmxlbmd0aCxcbiAgICAgICAgICAgIG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbmRleCA9IHZlcnRleE5hbWVzTGVuZ3RoLCAvLy9cbiAgICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlZEVkZ2VzID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAodmVydGV4UHJlc2VudCkge1xuICAgICAgcmVtb3ZlZEVkZ2VzID0gW107XG4gICAgICBcbiAgICAgIGNvbnN0IHZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vIFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSwgIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vIFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlbGV0ZSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWRFZGdlcztcbiAgfVxuXG4gIGFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgY3ljbGljVmVydGljZXMgPSBudWxsO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleE5hbWUgPT09IHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICAgIGNvbnN0IGN5Y2xpY1ZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBjeWNsaWNWZXJ0ZXggPSB0aGlzLnZlcnRleE1hcFtjeWNsaWNWZXJ0ZXhOYW1lXTtcblxuICAgICAgY3ljbGljVmVydGljZXMgPSBbY3ljbGljVmVydGV4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4LmlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuXG4gICAgICBpZiAoIWVkZ2VQcmVzZW50KSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZVZlcnRleEluZGV4ID0gc291cmNlVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIHRhcmdldFZlcnRleEluZGV4ID0gdGFyZ2V0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIGludmFsaWRhdGluZ0VkZ2UgPSAoc291cmNlVmVydGV4SW5kZXggPiB0YXJnZXRWZXJ0ZXhJbmRleCk7XG5cbiAgICAgICAgaWYgKGludmFsaWRhdGluZ0VkZ2UpIHtcbiAgICAgICAgICBjeWNsaWNWZXJ0aWNlcyA9IHRoaXMudmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjeWNsZU1pc3NpbmcgPSAoY3ljbGljVmVydGljZXMgPT09IG51bGwpOyAvLy9cblxuICAgICAgICBpZiAoY3ljbGVNaXNzaW5nKSB7XG4gICAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleDsgLy8vXG5cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY3ljbGljVmVydGV4TmFtZXMgPSBudWxsO1xuXG4gICAgaWYgKGN5Y2xpY1ZlcnRpY2VzICE9PSBudWxsKSB7XG4gICAgICBjeWNsaWNWZXJ0ZXhOYW1lcyA9IGN5Y2xpY1ZlcnRpY2VzLm1hcChmdW5jdGlvbihjeWNsaWNWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgY3ljbGljVmVydGV4TmFtZSA9IGN5Y2xpY1ZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZXM7XG4gIH1cblxuICByZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgc291cmNlVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0YXJnZXRWZXJ0ZXguZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCksXG4gICAgICAgICAgbGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPSBsYXN0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgY3ljbGVQcmVzZW50ID0gKGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgIFxuICAgIGlmIChjeWNsZVByZXNlbnQpIHtcbiAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gc291cmNlVmVydGV4LmdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKTtcblxuICAgICAgRGlyZWN0ZWRBY3ljbGljR3JhcGgub3JkZXJWZXJ0aWNlcyhiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgICAgRGlyZWN0ZWRBY3ljbGljR3JhcGgub3JkZXJWZXJ0aWNlcyhmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgICBjb25zdCBhZmZlY3RlZFZlcnRpY2VzID0gW10uY29uY2F0KGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpLmNvbmNhdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzID0gYWZmZWN0ZWRWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgpIHtcbiAgICAgICAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4LmdldEluZGV4KCk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGV4SW5kZXg7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzLnNvcnQoKTtcblxuICAgICAgYWZmZWN0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4LCBpbmRleCkge1xuICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzW2luZGV4XTtcblxuICAgICAgICBhZmZlY3RlZFZlcnRleC5zZXRJbmRleChhZmZlY3RlZFZlcnRleEluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjeWNsaWNWZXJ0aWNlcztcbiAgfVxuXG4gIG1hcFZlcnRleChjYWxsYmFjaykge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApLFxuICAgICAgICAgIHJlc3VsdCA9IHZlcnRleE5hbWVzLm1hcChmdW5jdGlvbih2ZXJ0ZXhOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSxcbiAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKHZlcnRleCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICBcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZm9yRWFjaFZlcnRleChjYWxsYmFjaykge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApO1xuXG4gICAgdmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbih2ZXJ0ZXhOYW1lKSB7XG4gICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcblxuICAgICAgY2FsbGJhY2sodmVydGV4KTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0ge30sXG4gICAgICAgICAgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcyk7XG5cbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKTtcbiAgICBcbiAgICBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKTtcbiAgICBcbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuXG4gIHN0YXRpYyBvcmRlclZlcnRpY2VzKHZlcnRpY2VzKSB7ICAvLy9cbiAgICB2ZXJ0aWNlcy5zb3J0KGZ1bmN0aW9uKGZpcnN0VmVydGV4LCBzZWNvbmRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IGZpcnN0VmVydGV4SW5kZXggPSBmaXJzdFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgc2Vjb25kVmVydGV4SW5kZXggPSBzZWNvbmRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSAgaWYgKGZpcnN0VmVydGV4SW5kZXggPCBzZWNvbmRWZXJ0ZXhJbmRleCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9IGVsc2UgIGlmIChmaXJzdFZlcnRleEluZGV4ID4gc2Vjb25kVmVydGV4SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICsxO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0ZWRBY3ljbGljR3JhcGg7XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIHZlcnRleE5hbWVzLmZvckVhY2goZnVuY3Rpb24odmVydGV4TmFtZSwgaW5kZXgpIHtcbiAgICBjb25zdCBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG4gIFxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpLFxuICAgICAgICAgIHZlcnRleE5hbWUgPSBuYW1lOyAgLy8vXG5cbiAgICB2ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH0pO1xuXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApIHtcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4KSB7XG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZm9yRWFjaE91dGdvaW5nRWRnZShmdW5jdGlvbihvdXRnb2luZ0VkZ2UpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lID0gdGFyZ2V0VmVydGV4TmFtZSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZV0sIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVdOyAvLy9cblxuICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19