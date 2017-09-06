'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var necessary = require('necessary');

var Edge = require('./edge'),
    Vertex = require('./vertex'),
    vertexUtilities = require('./utilities/vertex');

var arrayUtilities = necessary.arrayUtilities,
    last = arrayUtilities.last,
    vertexNamesFromVertices = vertexUtilities.vertexNamesFromVertices,
    topologicallyOrderVertices = vertexUtilities.topologicallyOrderVertices;

var DirectedAcyclicGraph = function () {
  function DirectedAcyclicGraph(vertexMap) {
    _classCallCheck(this, DirectedAcyclicGraph);

    this.vertexMap = vertexMap;
  }

  _createClass(DirectedAcyclicGraph, [{
    key: 'getVertices',
    value: function getVertices() {
      var vertices = Object.values(this.vertexMap);

      return vertices;
    }
  }, {
    key: 'getVertexNames',
    value: function getVertexNames() {
      var vertexNames = Object.keys(this.vertexMap);

      return vertexNames;
    }
  }, {
    key: 'getTopologicallyOrderedVertexNames',
    value: function getTopologicallyOrderedVertexNames() {
      var vertices = this.getVertices();

      topologicallyOrderVertices(vertices);

      var topologicallyOrderedVertices = vertices,
          ///
      topologicallyOrderedVertexNames = vertexNamesFromVertices(topologicallyOrderedVertices);

      return topologicallyOrderedVertexNames;
    }
  }, {
    key: 'getVertexByVertexName',
    value: function getVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresentByVertexName(vertexName),
          vertex = vertexPresent ? this.vertexMap[vertexName] : null;

      return vertex;
    }
  }, {
    key: 'setVertexByVertexName',
    value: function setVertexByVertexName(vertexName, vertex) {
      this.vertexMap[vertexName] = vertex;
    }
  }, {
    key: 'unsetVertexByVertexName',
    value: function unsetVertexByVertexName(vertexName) {
      delete this.vertexMap[vertexName];
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var vertices = this.getVertices(),
          verticesLength = vertices.length,
          empty = verticesLength === 0;

      return empty;
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
    key: 'isEdgePresentByVertexNames',
    value: function isEdgePresentByVertexNames(sourceVertexName, targetVertexName) {
      var edgePresent = false;

      var sourceVertex = this.getVertexByVertexName(sourceVertexName),
          targetVertex = this.getVertexByVertexName(targetVertexName),
          sourceVertexAndTargetVertexPresent = sourceVertex !== null && targetVertex !== null;

      if (sourceVertexAndTargetVertexPresent) {
        var targetVertexSourceVertexImmediateSuccessorVertex = sourceVertex.isVertexImmediateSuccessorVertex(targetVertex),
            sourceVertexTargetVertexImmediatePredecessorVertex = targetVertex.isVertexImmediatePredecessorVertex(sourceVertex);

        edgePresent = targetVertexSourceVertexImmediateSuccessorVertex && sourceVertexTargetVertexImmediatePredecessorVertex;
      }

      return edgePresent;
    }
  }, {
    key: 'isVertexPresentByVertexName',
    value: function isVertexPresentByVertexName(vertexName) {
      var vertexNames = this.getVertexNames(),
          vertexNamesIncludesVertexName = vertexNames.includes(vertexName),
          vertexPresent = vertexNamesIncludesVertexName; ///

      return vertexPresent;
    }
  }, {
    key: 'getPredecessorVertexNamesByVertexName',
    value: function getPredecessorVertexNamesByVertexName(vertexName) {
      var vertex = this.getVertexByVertexName(vertexName),
          predecessorVertexNames = vertex.getPredecessorVertexNames();

      return predecessorVertexNames;
    }
  }, {
    key: 'getSuccessorVertexNamesByVertexName',
    value: function getSuccessorVertexNamesByVertexName(vertexName) {
      var vertex = this.getVertexByVertexName(vertexName),
          successorVertexNames = vertex.getSuccessorVertexNames();

      return successorVertexNames;
    }
  }, {
    key: 'addVertexByVertexName',
    value: function addVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresentByVertexName(vertexName);

      if (!vertexPresent) {
        var vertexNames = this.getVertexNames(),
            vertexNamesLength = vertexNames.length,
            name = vertexName,
            ///
        index = vertexNamesLength,
            ///
        _vertex = Vertex.fromNameAndIndex(name, index);

        this.setVertexByVertexName(vertexName, _vertex);
      }

      var vertex = this.getVertexByVertexName(vertexName);

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
    key: 'addEdgeByVertexNames',
    value: function addEdgeByVertexNames(sourceVertexName, targetVertexName) {
      var cyclicVertices = null;

      if (sourceVertexName === targetVertexName) {
        var cyclicVertexName = sourceVertexName,
            ///
        cyclicVertex = this.getVertexByVertexName(cyclicVertexName);

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

      var cyclicVertexNames = cyclicVertices !== null ? vertexNamesFromVertices(cyclicVertices) : null;

      return cyclicVertexNames;
    }
  }, {
    key: 'removeVertexByVertexName',
    value: function removeVertexByVertexName(vertexName) {
      var removedEdges = null;

      var vertexPresent = this.isVertexPresentByVertexName(vertexName);

      if (vertexPresent) {
        removedEdges = [];

        var vertex = this.getVertexByVertexName(vertexName);

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

        this.unsetVertexByVertexName(vertexName);
      }

      return removedEdges;
    }
  }, {
    key: 'removeEdge',
    value: function removeEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName();

      this.removeEdgeByVertexNames(sourceVertexName, targetVertexName);
    }
  }, {
    key: 'removeEdgeByVertexNames',
    value: function removeEdgeByVertexNames(sourceVertexName, targetVertexName) {
      var edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);

      if (edgePresent) {
        var sourceVertex = this.getVertexByVertexName(sourceVertexName),
            targetVertex = this.getVertexByVertexName(targetVertexName);

        sourceVertex.removeImmediateSuccessorVertex(targetVertex);
        targetVertex.removeImmediatePredecessorVertex(sourceVertex);
      }
    }
  }, {
    key: 'removeEdgesBySourceVertexName',
    value: function removeEdgesBySourceVertexName(sourceVertexName) {
      var sourceVertexPresent = this.isVertexPresentByVertexName(sourceVertexName);

      if (sourceVertexPresent) {
        var sourceVertex = this.getVertexByVertexName(sourceVertexName);

        sourceVertex.removeOutgoingEdges();
      }
    }
  }, {
    key: 'removeEdgesByTargetVertexName',
    value: function removeEdgesByTargetVertexName(targetVertexName) {
      var targetVertexPresent = this.isVertexPresentByVertexName(targetVertexName);

      if (targetVertexPresent) {
        var targetVertex = this.getVertexByVertexName(targetVertexName);

        targetVertex.removeIncomingEdges();
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

        topologicallyOrderVertices(backwardsAffectedVertices);

        topologicallyOrderVertices(forwardsAffectedVertices);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsInZlcnRleFV0aWxpdGllcyIsImFycmF5VXRpbGl0aWVzIiwibGFzdCIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJEaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcCIsInZlcnRpY2VzIiwiT2JqZWN0IiwidmFsdWVzIiwidmVydGV4TmFtZXMiLCJrZXlzIiwiZ2V0VmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWUiLCJ2ZXJ0ZXhQcmVzZW50IiwiaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lIiwidmVydGV4IiwidmVydGljZXNMZW5ndGgiLCJsZW5ndGgiLCJlbXB0eSIsImVkZ2UiLCJzb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0U291cmNlVmVydGV4TmFtZSIsInRhcmdldFZlcnRleE5hbWUiLCJnZXRUYXJnZXRWZXJ0ZXhOYW1lIiwiZWRnZVByZXNlbnQiLCJpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyIsInNvdXJjZVZlcnRleCIsImdldFZlcnRleEJ5VmVydGV4TmFtZSIsInRhcmdldFZlcnRleCIsInNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQiLCJ0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImdldFZlcnRleE5hbWVzIiwidmVydGV4TmFtZXNJbmNsdWRlc1ZlcnRleE5hbWUiLCJpbmNsdWRlcyIsInByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJnZXRQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwic3VjY2Vzc29yVmVydGV4TmFtZXMiLCJnZXRTdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWVzTGVuZ3RoIiwibmFtZSIsImluZGV4IiwiZnJvbU5hbWVBbmRJbmRleCIsInNldFZlcnRleEJ5VmVydGV4TmFtZSIsImN5Y2xpY1ZlcnRleE5hbWVzIiwiYWRkRWRnZUJ5VmVydGV4TmFtZXMiLCJjeWNsaWNWZXJ0aWNlcyIsImN5Y2xpY1ZlcnRleE5hbWUiLCJjeWNsaWNWZXJ0ZXgiLCJhZGRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJpc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhJbmRleCIsImdldEluZGV4IiwidGFyZ2V0VmVydGV4SW5kZXgiLCJpbnZhbGlkYXRpbmdFZGdlIiwidmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyIsImN5Y2xlTWlzc2luZyIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVkRWRnZXMiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlIiwicHVzaCIsInJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwicmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwidW5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJyZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyIsInNvdXJjZVZlcnRleFByZXNlbnQiLCJyZW1vdmVPdXRnb2luZ0VkZ2VzIiwidGFyZ2V0VmVydGV4UHJlc2VudCIsInJlbW92ZUluY29taW5nRWRnZXMiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJnZXRGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCIsImN5Y2xlUHJlc2VudCIsImJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJnZXRCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiYWZmZWN0ZWRWZXJ0aWNlcyIsImNvbmNhdCIsImFmZmVjdGVkVmVydGV4SW5kaWNlcyIsIm1hcCIsImFmZmVjdGVkVmVydGV4IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRleCIsInNvcnQiLCJmb3JFYWNoIiwic2V0SW5kZXgiLCJkaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyIsInZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwiYWRkRWRnZXNUb1ZlcnRpY2VzIiwibW9kdWxlIiwiZXhwb3J0cyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4IiwiZm9yRWFjaE91dGdvaW5nRWRnZSIsIm91dGdvaW5nRWRnZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZQyxRQUFRLFdBQVIsQ0FBbEI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNNRSxTQUFTRixRQUFRLFVBQVIsQ0FEZjtBQUFBLElBRU1HLGtCQUFrQkgsUUFBUSxvQkFBUixDQUZ4Qjs7QUFJTSxJQUFFSSxjQUFGLEdBQXFCTCxTQUFyQixDQUFFSyxjQUFGO0FBQUEsSUFDRUMsSUFERixHQUNVRCxjQURWLENBQ0VD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O0FBQUEsVUFFMEQ7QUFDcERzRixxQ0FBK0JwRixnQkFIckM7QUFBQSxVQUlNcUMsNkJBQTZCeEQsVUFBVStELDhCQUFWLENBSm5DO0FBQUEsVUFJOEU7QUFDeEVOLGlDQUEyQnpELFVBQVV1Ryw0QkFBVixDQUxqQyxDQURvRSxDQU1NOztBQUUxRS9DLGlDQUEyQkUsMkJBQTNCLENBQXVERCx3QkFBdkQ7O0FBRUFBLCtCQUF5QkUsNkJBQXpCLENBQXVESCwwQkFBdkQ7QUFDRCxLQVhEO0FBWUQsR0FiRDtBQWNEIiwiZmlsZSI6ImRpcmVjdGVkQWN5Y2xpY0dyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgRWRnZSA9IHJlcXVpcmUoJy4vZWRnZScpLFxuICAgICAgVmVydGV4ID0gcmVxdWlyZSgnLi92ZXJ0ZXgnKSxcbiAgICAgIHZlcnRleFV0aWxpdGllcyA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL3ZlcnRleCcpO1xuXG5jb25zdCB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IGxhc3R9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzLCB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyB9ID0gdmVydGV4VXRpbGl0aWVzO1xuXG5jbGFzcyBEaXJlY3RlZEFjeWNsaWNHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleE1hcCkge1xuICAgIHRoaXMudmVydGV4TWFwID0gdmVydGV4TWFwO1xuICB9XG5cbiAgZ2V0VmVydGljZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSBPYmplY3QudmFsdWVzKHRoaXMudmVydGV4TWFwKTtcblxuICAgIHJldHVybiB2ZXJ0aWNlcztcbiAgfVxuXG4gIGdldFZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIHZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHZlcnRpY2VzKTtcbiAgICBcbiAgICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzID0gdmVydGljZXMsIC8vL1xuICAgICAgICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMgPSB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKTtcbiAgICBcbiAgICByZXR1cm4gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleCA9IHZlcnRleFByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gOlxuICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIHNldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lLCB2ZXJ0ZXgpIHtcbiAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfVxuXG4gIHVuc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5nZXRWZXJ0aWNlcygpLFxuICAgICAgICAgIHZlcnRpY2VzTGVuZ3RoID0gdmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKHZlcnRpY2VzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnQoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICAgIFxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgZWRnZVByZXNlbnQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCA9IChzb3VyY2VWZXJ0ZXggIT09IG51bGwpICYmICh0YXJnZXRWZXJ0ZXggIT09IG51bGwpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldFZlcnRleFNvdXJjZVZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleC5pc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpLFxuICAgICAgICAgIHNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4LmlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcblxuICAgICAgZWRnZVByZXNlbnQgPSAodGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ICYmIHNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgIHZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lID0gdmVydGV4TmFtZXMuaW5jbHVkZXModmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4UHJlc2VudCA9IHZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdmVydGV4UHJlc2VudDtcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXguZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRTdWNjZXNzb3JWZXJ0ZXhOYW1lc0J5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXguZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMoKTtcbiAgICBcbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBhZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICghdmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdmVydGV4TmFtZXMgPSB0aGlzLmdldFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgdmVydGV4TmFtZXNMZW5ndGggPSB2ZXJ0ZXhOYW1lcy5sZW5ndGgsXG4gICAgICAgICAgbmFtZSA9IHZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICBpbmRleCA9IHZlcnRleE5hbWVzTGVuZ3RoLCAvLy9cbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICAgIHRoaXMuc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUsIHZlcnRleCk7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgYWRkRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBjeWNsaWNWZXJ0ZXhOYW1lcyA9IHRoaXMuYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZXM7XG4gIH1cblxuICBhZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IGN5Y2xpY1ZlcnRpY2VzID0gbnVsbDtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhOYW1lID09PSB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgICBjb25zdCBjeWNsaWNWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgY3ljbGljVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoY3ljbGljVmVydGV4TmFtZSk7XG5cbiAgICAgICAgY3ljbGljVmVydGljZXMgPSBbY3ljbGljVmVydGV4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4LmlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuXG4gICAgICBpZiAoIWVkZ2VQcmVzZW50KSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZVZlcnRleEluZGV4ID0gc291cmNlVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIHRhcmdldFZlcnRleEluZGV4ID0gdGFyZ2V0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgIGludmFsaWRhdGluZ0VkZ2UgPSAoc291cmNlVmVydGV4SW5kZXggPiB0YXJnZXRWZXJ0ZXhJbmRleCk7XG5cbiAgICAgICAgaWYgKGludmFsaWRhdGluZ0VkZ2UpIHtcbiAgICAgICAgICBjeWNsaWNWZXJ0aWNlcyA9IHRoaXMudmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjeWNsZU1pc3NpbmcgPSAoY3ljbGljVmVydGljZXMgPT09IG51bGwpOyAvLy9cblxuICAgICAgICBpZiAoY3ljbGVNaXNzaW5nKSB7XG4gICAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleDsgLy8vXG5cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3QgY3ljbGljVmVydGV4TmFtZXMgPSAoY3ljbGljVmVydGljZXMgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVydGV4TmFtZXNGcm9tVmVydGljZXMoY3ljbGljVmVydGljZXMpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWVzO1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlZEVkZ2VzID0gbnVsbDtcblxuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICByZW1vdmVkRWRnZXMgPSBbXTtcblxuICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLCAgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnVuc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVkRWRnZXM7XG4gIH1cblxuICByZW1vdmVFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpO1xuXG4gICAgdGhpcy5yZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgfVxuXG4gIHJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAoZWRnZVByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlTb3VyY2VWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVPdXRnb2luZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRWRnZXNCeVRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHRhcmdldFZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh0YXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUluY29taW5nRWRnZXMoKTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUVkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KSB7XG4gICAgbGV0IGN5Y2xpY1ZlcnRpY2VzID0gbnVsbDtcblxuICAgIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRhcmdldFZlcnRleC5nZXRGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMoc291cmNlVmVydGV4KSxcbiAgICAgICAgICBsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9IGxhc3QoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgICBjeWNsZVByZXNlbnQgPSAobGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPT09IHNvdXJjZVZlcnRleCk7XG4gICAgXG4gICAgaWYgKGN5Y2xlUHJlc2VudCkge1xuICAgICAgY3ljbGljVmVydGljZXMgPSBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMgPSBzb3VyY2VWZXJ0ZXguZ2V0QmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcygpO1xuXG4gICAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0aWNlcyA9IFtdLmNvbmNhdChiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKS5jb25jYXQoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcyA9IGFmZmVjdGVkVmVydGljZXMubWFwKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleC5nZXRJbmRleCgpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRleEluZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcy5zb3J0KCk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4SW5kaWNlc1tpbmRleF07XG5cbiAgICAgICAgYWZmZWN0ZWRWZXJ0ZXguc2V0SW5kZXgoYWZmZWN0ZWRWZXJ0ZXhJbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGljZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0ge30sXG4gICAgICAgICAgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcyk7XG5cbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKTtcbiAgICBcbiAgICBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKTtcbiAgICBcbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB2ZXJ0ZXhOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHZlcnRleE5hbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICB2ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH0pO1xuICBcbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCwgaW5kZXgpIHtcbiAgICBjb25zdCBuYW1lID0gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lID0gbmFtZTsgIC8vL1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcblxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKSB7XG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCkge1xuICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmZvckVhY2hPdXRnb2luZ0VkZ2UoZnVuY3Rpb24ob3V0Z29pbmdFZGdlKSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSA9IHRhcmdldFZlcnRleE5hbWUsXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVdLCAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lXTsgLy8vXG5cbiAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==