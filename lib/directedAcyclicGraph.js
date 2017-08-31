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
          topologicallyOrderedVertices = DirectedAcyclicGraph.topologicallyOrderVertices(vertices);

      return topologicallyOrderedVertices;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsImFycmF5IiwibGFzdCIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwidmVydGljZXMiLCJ2YWx1ZXMiLCJnZXRWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyIsImVkZ2UiLCJzb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0U291cmNlVmVydGV4TmFtZSIsInRhcmdldFZlcnRleE5hbWUiLCJnZXRUYXJnZXRWZXJ0ZXhOYW1lIiwiZWRnZVByZXNlbnQiLCJpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWUiLCJ2ZXJ0ZXhQcmVzZW50IiwiaGFzT3duUHJvcGVydHkiLCJzb3VyY2VWZXJ0ZXhQcmVzZW50IiwiaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lIiwic291cmNlVmVydGV4IiwicmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUiLCJyZW1vdmVPdXRnb2luZ0VkZ2VzIiwidGFyZ2V0VmVydGV4UHJlc2VudCIsInRhcmdldFZlcnRleCIsInJlbW92ZUluY29taW5nRWRnZXMiLCJzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50IiwidGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJ2ZXJ0ZXgiLCJjeWNsaWNWZXJ0ZXhOYW1lcyIsImFkZEVkZ2VCeVZlcnRleE5hbWVzIiwicmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMiLCJ2ZXJ0ZXhOYW1lc0xlbmd0aCIsImxlbmd0aCIsIm5hbWUiLCJpbmRleCIsImZyb21OYW1lQW5kSW5kZXgiLCJyZW1vdmVkRWRnZXMiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lIiwiZ2V0TmFtZSIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2UiLCJwdXNoIiwicmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJjeWNsaWNWZXJ0aWNlcyIsImN5Y2xpY1ZlcnRleE5hbWUiLCJjeWNsaWNWZXJ0ZXgiLCJhZGRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJpc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhJbmRleCIsImdldEluZGV4IiwidGFyZ2V0VmVydGV4SW5kZXgiLCJpbnZhbGlkYXRpbmdFZGdlIiwidmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyIsImN5Y2xlTWlzc2luZyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwibWFwIiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwibGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXgiLCJjeWNsZVByZXNlbnQiLCJiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiZ2V0QmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImFmZmVjdGVkVmVydGljZXMiLCJjb25jYXQiLCJhZmZlY3RlZFZlcnRleEluZGljZXMiLCJhZmZlY3RlZFZlcnRleCIsImFmZmVjdGVkVmVydGV4SW5kZXgiLCJzb3J0IiwiZm9yRWFjaCIsInNldEluZGV4IiwiY2FsbGJhY2siLCJyZXN1bHQiLCJiaW5kIiwiZGlyZWN0ZWRBY3ljbGljR3JhcGgiLCJ2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXMiLCJ2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsImFkZEVkZ2VzVG9WZXJ0aWNlcyIsInNsaWNlIiwiZmlyc3RWZXJ0ZXgiLCJzZWNvbmRWZXJ0ZXgiLCJmaXJzdFZlcnRleEluZGV4Iiwic2Vjb25kVmVydGV4SW5kZXgiLCJtb2R1bGUiLCJleHBvcnRzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgiLCJmb3JFYWNoT3V0Z29pbmdFZGdlIiwib3V0Z29pbmdFZGdlIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFlBQVlDLFFBQVEsV0FBUixDQUFsQjs7QUFFQSxJQUFNQyxPQUFPRCxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ01FLFNBQVNGLFFBQVEsVUFBUixDQURmOztBQUdNLElBQUVHLEtBQUYsR0FBWUosU0FBWixDQUFFSSxLQUFGO0FBQUEsSUFDRUMsSUFERixHQUNVRCxLQURWLENBQ0VDLElBREY7O0lBR0FDLG9CO0FBQ0osZ0NBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFDckIsU0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7OztxQ0FFZ0I7QUFDZixVQUFNQyxjQUFjQyxPQUFPQyxJQUFQLENBQVksS0FBS0gsU0FBakIsQ0FBcEI7O0FBRUEsYUFBT0MsV0FBUDtBQUNEOzs7a0NBRWE7QUFDWixVQUFNRyxXQUFXRixPQUFPRyxNQUFQLENBQWMsS0FBS0wsU0FBbkIsQ0FBakI7O0FBRUEsYUFBT0ksUUFB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QVNnQiwwQkFBVCxFQUFxQztBQUN4RUEsK0JBQTJCQyxtQkFBM0IsQ0FBK0MsVUFBU0MsWUFBVCxFQUF1QjtBQUNwRSxVQUFNMUYsbUJBQW1CMEYsYUFBYXpGLG1CQUFiLEVBQXpCO0FBQUEsVUFDTUMsbUJBQW1Cd0YsYUFBYXZGLG1CQUFiLEVBRHpCO0FBQUEsVUFFTWdDLGlDQUFpQ25DLGdCQUZ2QztBQUFBLFVBRTBEO0FBQ3BEMkYscUNBQStCekYsZ0JBSHJDO0FBQUEsVUFJTWdDLDZCQUE2QjVDLFVBQVU2Qyw4QkFBVixDQUpuQztBQUFBLFVBSThFO0FBQ3hFcUIsaUNBQTJCbEUsVUFBVXFHLDRCQUFWLENBTGpDLENBRG9FLENBTU07O0FBRTFFekQsaUNBQTJCdUIsMkJBQTNCLENBQXVERCx3QkFBdkQ7O0FBRUFBLCtCQUF5QkUsNkJBQXpCLENBQXVEeEIsMEJBQXZEO0FBQ0QsS0FYRDtBQVlELEdBYkQ7QUFjRCIsImZpbGUiOiJkaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IEVkZ2UgPSByZXF1aXJlKCcuL2VkZ2UnKSxcbiAgICAgIFZlcnRleCA9IHJlcXVpcmUoJy4vdmVydGV4Jyk7XG5cbmNvbnN0IHsgYXJyYXkgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgbGFzdH0gPSBhcnJheTtcblxuY2xhc3MgRGlyZWN0ZWRBY3ljbGljR3JhcGgge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhNYXApIHtcbiAgICB0aGlzLnZlcnRleE1hcCA9IHZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIHZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0VmVydGljZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSBPYmplY3QudmFsdWVzKHRoaXMudmVydGV4TWFwKTtcblxuICAgIHJldHVybiB2ZXJ0aWNlcztcbiAgfVxuXG4gIGdldFRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyA9IERpcmVjdGVkQWN5Y2xpY0dyYXBoLnRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHZlcnRpY2VzKTtcblxuICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzO1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudChlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gICAgXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG4gIFxuICBpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLnZlcnRleE1hcC5oYXNPd25Qcm9wZXJ0eSh2ZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiB2ZXJ0ZXhQcmVzZW50O1xuICB9XG5cbiAgcmVtb3ZlRWRnZXNCeVNvdXJjZVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcbiAgICBcbiAgICBpZiAoc291cmNlVmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcblxuICAgICAgc291cmNlVmVydGV4LnJlbW92ZU91dGdvaW5nRWRnZXMoKTsgICAgICAgICBcbiAgICB9XG4gIH1cblxuICByZW1vdmVFZGdlc0J5VGFyZ2V0VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdGFyZ2V0VmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHRhcmdldFZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldFZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbmNvbWluZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBlZGdlUHJlc2VudCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgIHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQgPSAoc291cmNlVmVydGV4ICE9PSBudWxsKSAmJiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXguaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KSxcbiAgICAgICAgICAgIHNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4LmlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcblxuICAgICAgZWRnZVByZXNlbnQgPSAodGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ICYmIHNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICByZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleCA9IHZlcnRleFByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA6XG4gICAgICAgICAgICAgICAgICAgICAgbnVsbDtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICBhZGRFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGN5Y2xpY1ZlcnRleE5hbWVzID0gdGhpcy5hZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lcztcbiAgfVxuICBcbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKTtcblxuICAgIHRoaXMucmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gIH1cblxuICBhZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICghdmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgICB2ZXJ0ZXhOYW1lc0xlbmd0aCA9IHZlcnRleE5hbWVzLmxlbmd0aCxcbiAgICAgICAgICAgIG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbmRleCA9IHZlcnRleE5hbWVzTGVuZ3RoLCAvLy9cbiAgICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlZEVkZ2VzID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAodmVydGV4UHJlc2VudCkge1xuICAgICAgcmVtb3ZlZEVkZ2VzID0gW107XG4gICAgICBcbiAgICAgIGNvbnN0IHZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vIFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSwgIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vIFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlbGV0ZSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWRFZGdlcztcbiAgfVxuXG4gIGFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgY3ljbGljVmVydGljZXMgPSBudWxsO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleE5hbWUgPT09IHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICAgIGNvbnN0IGN5Y2xpY1ZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBjeWNsaWNWZXJ0ZXggPSB0aGlzLnZlcnRleE1hcFtjeWNsaWNWZXJ0ZXhOYW1lXTtcblxuICAgICAgY3ljbGljVmVydGljZXMgPSBbY3ljbGljVmVydGV4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4LmlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuXG4gICAgICBpZiAoIWVkZ2VQcmVzZW50KSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZVZlcnRleEluZGV4ID0gc291cmNlVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIHRhcmdldFZlcnRleEluZGV4ID0gdGFyZ2V0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIGludmFsaWRhdGluZ0VkZ2UgPSAoc291cmNlVmVydGV4SW5kZXggPiB0YXJnZXRWZXJ0ZXhJbmRleCk7XG5cbiAgICAgICAgaWYgKGludmFsaWRhdGluZ0VkZ2UpIHtcbiAgICAgICAgICBjeWNsaWNWZXJ0aWNlcyA9IHRoaXMudmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjeWNsZU1pc3NpbmcgPSAoY3ljbGljVmVydGljZXMgPT09IG51bGwpOyAvLy9cblxuICAgICAgICBpZiAoY3ljbGVNaXNzaW5nKSB7XG4gICAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleDsgLy8vXG5cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgY3ljbGljVmVydGV4TmFtZXMgPSBudWxsO1xuXG4gICAgaWYgKGN5Y2xpY1ZlcnRpY2VzICE9PSBudWxsKSB7XG4gICAgICBjeWNsaWNWZXJ0ZXhOYW1lcyA9IGN5Y2xpY1ZlcnRpY2VzLm1hcChmdW5jdGlvbihjeWNsaWNWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgY3ljbGljVmVydGV4TmFtZSA9IGN5Y2xpY1ZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZXM7XG4gIH1cblxuICByZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgc291cmNlVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0YXJnZXRWZXJ0ZXguZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCksXG4gICAgICAgICAgbGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPSBsYXN0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgY3ljbGVQcmVzZW50ID0gKGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgIFxuICAgIGlmIChjeWNsZVByZXNlbnQpIHtcbiAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gc291cmNlVmVydGV4LmdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKTtcblxuICAgICAgRGlyZWN0ZWRBY3ljbGljR3JhcGgudG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICAgIERpcmVjdGVkQWN5Y2xpY0dyYXBoLnRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGljZXMgPSBbXS5jb25jYXQoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcykuY29uY2F0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgICBhZmZlY3RlZFZlcnRleEluZGljZXMgPSBhZmZlY3RlZFZlcnRpY2VzLm1hcChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCkge1xuICAgICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgICAgICAgICAgICByZXR1cm4gYWZmZWN0ZWRWZXJ0ZXhJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICBhZmZlY3RlZFZlcnRleEluZGljZXMuc29ydCgpO1xuXG4gICAgICBhZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleEluZGljZXNbaW5kZXhdO1xuXG4gICAgICAgIGFmZmVjdGVkVmVydGV4LnNldEluZGV4KGFmZmVjdGVkVmVydGV4SW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRpY2VzO1xuICB9XG5cbiAgbWFwVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgcmVzdWx0ID0gdmVydGV4TmFtZXMubWFwKGZ1bmN0aW9uKHZlcnRleE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZlcnRleCA9IHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdLFxuICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2sodmVydGV4KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmb3JFYWNoVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCk7XG5cbiAgICB2ZXJ0ZXhOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHZlcnRleE5hbWUpIHtcbiAgICAgIGNvbnN0IHZlcnRleCA9IHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdO1xuXG4gICAgICBjYWxsYmFjayh2ZXJ0ZXgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fSxcbiAgICAgICAgICBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKTtcblxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpO1xuICAgIFxuICAgIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG5cbiAgc3RhdGljIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHZlcnRpY2VzKSB7ICAvLy9cbiAgICB2ZXJ0aWNlcyA9IHZlcnRpY2VzLnNsaWNlKCk7ICAvLy9cblxuICAgIHZlcnRpY2VzLnNvcnQoZnVuY3Rpb24oZmlyc3RWZXJ0ZXgsIHNlY29uZFZlcnRleCkge1xuICAgICAgY29uc3QgZmlyc3RWZXJ0ZXhJbmRleCA9IGZpcnN0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICBzZWNvbmRWZXJ0ZXhJbmRleCA9IHNlY29uZFZlcnRleC5nZXRJbmRleCgpO1xuXG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlICBpZiAoZmlyc3RWZXJ0ZXhJbmRleCA8IHNlY29uZFZlcnRleEluZGV4KSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH0gZWxzZSAgaWYgKGZpcnN0VmVydGV4SW5kZXggPiBzZWNvbmRWZXJ0ZXhJbmRleCkge1xuICAgICAgICByZXR1cm4gKzE7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzID0gdmVydGljZXM7ICAvLy9cblxuICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0ZWRBY3ljbGljR3JhcGg7XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIHZlcnRleE5hbWVzLmZvckVhY2goZnVuY3Rpb24odmVydGV4TmFtZSwgaW5kZXgpIHtcbiAgICBjb25zdCBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG4gIFxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpLFxuICAgICAgICAgIHZlcnRleE5hbWUgPSBuYW1lOyAgLy8vXG5cbiAgICB2ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH0pO1xuXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApIHtcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4KSB7XG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZm9yRWFjaE91dGdvaW5nRWRnZShmdW5jdGlvbihvdXRnb2luZ0VkZ2UpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lID0gdGFyZ2V0VmVydGV4TmFtZSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZV0sIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVdOyAvLy9cblxuICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19