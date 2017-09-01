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
      var vertices = this.getVertices(),
          topologicallyOrderedVertices = topologicallyOrderVertices(vertices),
          topologicallyOrderedVertexNames = topologicallyOrderedVertices.map(function (topologicallyOrderedVertex) {
        var topologicallyOrderedVertexName = topologicallyOrderedVertex.getName();

        return topologicallyOrderedVertexName;
      });

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

function topologicallyOrderVertices(vertices) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsImFycmF5IiwibGFzdCIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGljZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJ2ZXJ0ZXhOYW1lcyIsImtleXMiLCJnZXRWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMiLCJtYXAiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZSIsImdldE5hbWUiLCJ2ZXJ0ZXhOYW1lIiwidmVydGV4UHJlc2VudCIsImlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSIsInZlcnRleCIsInZlcnRpY2VzTGVuZ3RoIiwibGVuZ3RoIiwiZW1wdHkiLCJlZGdlIiwic291cmNlVmVydGV4TmFtZSIsImdldFNvdXJjZVZlcnRleE5hbWUiLCJ0YXJnZXRWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXgiLCJnZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJ0YXJnZXRWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50IiwidGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJnZXRWZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWVzSW5jbHVkZXNWZXJ0ZXhOYW1lIiwiaW5jbHVkZXMiLCJ2ZXJ0ZXhOYW1lc0xlbmd0aCIsIm5hbWUiLCJpbmRleCIsImZyb21OYW1lQW5kSW5kZXgiLCJzZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJjeWNsaWNWZXJ0ZXhOYW1lcyIsImFkZEVkZ2VCeVZlcnRleE5hbWVzIiwiY3ljbGljVmVydGljZXMiLCJjeWNsaWNWZXJ0ZXhOYW1lIiwiY3ljbGljVmVydGV4IiwiYWRkVmVydGV4QnlWZXJ0ZXhOYW1lIiwiaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4Iiwic291cmNlVmVydGV4SW5kZXgiLCJnZXRJbmRleCIsInRhcmdldFZlcnRleEluZGV4IiwiaW52YWxpZGF0aW5nRWRnZSIsInZhbGlkYXRlRWRnZUJ5VmVydGljZXMiLCJjeWNsZU1pc3NpbmciLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwicmVtb3ZlZEVkZ2VzIiwiZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlIiwicHVzaCIsInJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwicmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwidW5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJyZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyIsInNvdXJjZVZlcnRleFByZXNlbnQiLCJyZW1vdmVPdXRnb2luZ0VkZ2VzIiwidGFyZ2V0VmVydGV4UHJlc2VudCIsInJlbW92ZUluY29taW5nRWRnZXMiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJnZXRGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCIsImN5Y2xlUHJlc2VudCIsImJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJnZXRCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiYWZmZWN0ZWRWZXJ0aWNlcyIsImNvbmNhdCIsImFmZmVjdGVkVmVydGV4SW5kaWNlcyIsImFmZmVjdGVkVmVydGV4IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRleCIsInNvcnQiLCJmb3JFYWNoIiwic2V0SW5kZXgiLCJkaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyIsInZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwiYWRkRWRnZXNUb1ZlcnRpY2VzIiwibW9kdWxlIiwiZXhwb3J0cyIsImZvckVhY2hPdXRnb2luZ0VkZ2UiLCJvdXRnb2luZ0VkZ2UiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lIiwic2xpY2UiLCJmaXJzdFZlcnRleCIsInNlY29uZFZlcnRleCIsImZpcnN0VmVydGV4SW5kZXgiLCJzZWNvbmRWZXJ0ZXhJbmRleCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLFlBQVlDLFFBQVEsV0FBUixDQUFsQjs7QUFFQSxJQUFNQyxPQUFPRCxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ01FLFNBQVNGLFFBQVEsVUFBUixDQURmOztBQUdNLElBQUVHLEtBQUYsR0FBWUosU0FBWixDQUFFSSxLQUFGO0FBQUEsSUFDRUMsSUFERixHQUNVRCxLQURWLENBQ0VDLElBREY7O0lBR0FDLG9CO0FBQ0osZ0NBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFDckIsU0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7Oztr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RCxHQWJEO0FBY0Q7O0FBRUQsU0FBU2pELDBCQUFULENBQW9DUCxRQUFwQyxFQUE4QztBQUFHO0FBQy9DQSxhQUFXQSxTQUFTcUcsS0FBVCxFQUFYLENBRDRDLENBQ2Q7O0FBRTlCckcsV0FBU3lGLElBQVQsQ0FBYyxVQUFTYSxXQUFULEVBQXNCQyxZQUF0QixFQUFvQztBQUNoRCxRQUFNQyxtQkFBbUJGLFlBQVluRCxRQUFaLEVBQXpCO0FBQUEsUUFDTXNELG9CQUFvQkYsYUFBYXBELFFBQWIsRUFEMUI7O0FBR0EsUUFBSSxLQUFKLEVBQVcsQ0FFVixDQUZELE1BRVEsSUFBSXFELG1CQUFtQkMsaUJBQXZCLEVBQTBDO0FBQ2hELGFBQU8sQ0FBQyxDQUFSO0FBQ0QsS0FGTyxNQUVBLElBQUlELG1CQUFtQkMsaUJBQXZCLEVBQTBDO0FBQ2hELGFBQU8sQ0FBQyxDQUFSO0FBQ0Q7QUFDRixHQVhEOztBQWFBLE1BQU1uRywrQkFBK0JOLFFBQXJDLENBaEI0QyxDQWdCSTs7QUFFaEQsU0FBT00sNEJBQVA7QUFDRCIsImZpbGUiOiJkaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IEVkZ2UgPSByZXF1aXJlKCcuL2VkZ2UnKSxcbiAgICAgIFZlcnRleCA9IHJlcXVpcmUoJy4vdmVydGV4Jyk7XG5cbmNvbnN0IHsgYXJyYXkgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgbGFzdH0gPSBhcnJheTtcblxuY2xhc3MgRGlyZWN0ZWRBY3ljbGljR3JhcGgge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhNYXApIHtcbiAgICB0aGlzLnZlcnRleE1hcCA9IHZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gdmVydGljZXM7XG4gIH1cblxuICBnZXRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKTtcblxuICAgIHJldHVybiB2ZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyA9IHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHZlcnRpY2VzKSxcbiAgICAgICAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzID0gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5tYXAoZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZSA9IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZTtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4ID0gdmVydGV4UHJlc2VudCA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA6XG4gICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUsIHZlcnRleCkge1xuICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9XG5cbiAgdW5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgICAgdmVydGljZXNMZW5ndGggPSB2ZXJ0aWNlcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAodmVydGljZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudChlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gICAgXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBlZGdlUHJlc2VudCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICBzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50ID0gKHNvdXJjZVZlcnRleCAhPT0gbnVsbCkgJiYgKHRhcmdldFZlcnRleCAhPT0gbnVsbCk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gc291cmNlVmVydGV4LmlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCksXG4gICAgICAgICAgc291cmNlVmVydGV4VGFyZ2V0VmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0YXJnZXRWZXJ0ZXguaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpO1xuXG4gICAgICBlZGdlUHJlc2VudCA9ICh0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggJiYgc291cmNlVmVydGV4VGFyZ2V0VmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH1cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4TmFtZXMgPSB0aGlzLmdldFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgdmVydGV4TmFtZXNJbmNsdWRlc1ZlcnRleE5hbWUgPSB2ZXJ0ZXhOYW1lcy5pbmNsdWRlcyh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB2ZXJ0ZXhQcmVzZW50ID0gdmVydGV4TmFtZXNJbmNsdWRlc1ZlcnRleE5hbWU7ICAvLy9cblxuICAgIHJldHVybiB2ZXJ0ZXhQcmVzZW50O1xuICB9XG5cbiAgYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAoIXZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgIHZlcnRleE5hbWVzTGVuZ3RoID0gdmVydGV4TmFtZXMubGVuZ3RoLFxuICAgICAgICAgIG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgaW5kZXggPSB2ZXJ0ZXhOYW1lc0xlbmd0aCwgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgICB0aGlzLnNldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lLCB2ZXJ0ZXgpO1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIGFkZEVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgY3ljbGljVmVydGV4TmFtZXMgPSB0aGlzLmFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWVzO1xuICB9XG5cbiAgYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBpZiAoc291cmNlVmVydGV4TmFtZSA9PT0gdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgICAgY29uc3QgY3ljbGljVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGN5Y2xpY1ZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKGN5Y2xpY1ZlcnRleE5hbWUpO1xuXG4gICAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gW2N5Y2xpY1ZlcnRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcblxuICAgICAgaWYgKCFlZGdlUHJlc2VudCkge1xuICAgICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbmRleCA9IHNvdXJjZVZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICB0YXJnZXRWZXJ0ZXhJbmRleCA9IHRhcmdldFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICBpbnZhbGlkYXRpbmdFZGdlID0gKHNvdXJjZVZlcnRleEluZGV4ID4gdGFyZ2V0VmVydGV4SW5kZXgpO1xuXG4gICAgICAgIGlmIChpbnZhbGlkYXRpbmdFZGdlKSB7XG4gICAgICAgICAgY3ljbGljVmVydGljZXMgPSB0aGlzLnZhbGlkYXRlRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3ljbGVNaXNzaW5nID0gKGN5Y2xpY1ZlcnRpY2VzID09PSBudWxsKTsgLy8vXG5cbiAgICAgICAgaWYgKGN5Y2xlTWlzc2luZykge1xuICAgICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gc291cmNlVmVydGV4LCAvLy9cbiAgICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0YXJnZXRWZXJ0ZXg7IC8vL1xuXG4gICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGN5Y2xpY1ZlcnRleE5hbWVzID0gbnVsbDtcblxuICAgIGlmIChjeWNsaWNWZXJ0aWNlcyAhPT0gbnVsbCkge1xuICAgICAgY3ljbGljVmVydGV4TmFtZXMgPSBjeWNsaWNWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oY3ljbGljVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGN5Y2xpY1ZlcnRleE5hbWUgPSBjeWNsaWNWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWVzO1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlZEVkZ2VzID0gbnVsbDtcblxuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICByZW1vdmVkRWRnZXMgPSBbXTtcblxuICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSwgIC8vL1xuICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy51bnNldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlZEVkZ2VzO1xuICB9XG5cbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKTtcblxuICAgIHRoaXMucmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gIH1cblxuICByZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVFZGdlc0J5U291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlT3V0Z29pbmdFZGdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlUYXJnZXRWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAodGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbmNvbWluZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0YXJnZXRWZXJ0ZXguZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCksXG4gICAgICAgICAgbGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPSBsYXN0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgY3ljbGVQcmVzZW50ID0gKGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgIFxuICAgIGlmIChjeWNsZVByZXNlbnQpIHtcbiAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gc291cmNlVmVydGV4LmdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKTtcblxuICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGljZXMgPSBbXS5jb25jYXQoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcykuY29uY2F0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgICBhZmZlY3RlZFZlcnRleEluZGljZXMgPSBhZmZlY3RlZFZlcnRpY2VzLm1hcChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCkge1xuICAgICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgICAgICAgICAgICByZXR1cm4gYWZmZWN0ZWRWZXJ0ZXhJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICBhZmZlY3RlZFZlcnRleEluZGljZXMuc29ydCgpO1xuXG4gICAgICBhZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleEluZGljZXNbaW5kZXhdO1xuXG4gICAgICAgIGFmZmVjdGVkVmVydGV4LnNldEluZGV4KGFmZmVjdGVkVmVydGV4SW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRpY2VzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHt9LFxuICAgICAgICAgIGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpO1xuXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyk7XG4gICAgXG4gICAgYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCk7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcbiAgICBcbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RlZEFjeWNsaWNHcmFwaDtcblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbih2ZXJ0ZXhOYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcbiAgXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCksXG4gICAgICAgICAgdmVydGV4TmFtZSA9IG5hbWU7ICAvLy9cblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCkge1xuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgpIHtcbiAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5mb3JFYWNoT3V0Z29pbmdFZGdlKGZ1bmN0aW9uKG91dGdvaW5nRWRnZSkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXhOYW1lLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSwgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZV07IC8vL1xuXG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHZlcnRpY2VzKSB7ICAvLy9cbiAgdmVydGljZXMgPSB2ZXJ0aWNlcy5zbGljZSgpOyAgLy8vXG5cbiAgdmVydGljZXMuc29ydChmdW5jdGlvbihmaXJzdFZlcnRleCwgc2Vjb25kVmVydGV4KSB7XG4gICAgY29uc3QgZmlyc3RWZXJ0ZXhJbmRleCA9IGZpcnN0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgc2Vjb25kVmVydGV4SW5kZXggPSBzZWNvbmRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlICBpZiAoZmlyc3RWZXJ0ZXhJbmRleCA8IHNlY29uZFZlcnRleEluZGV4KSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlICBpZiAoZmlyc3RWZXJ0ZXhJbmRleCA+IHNlY29uZFZlcnRleEluZGV4KSB7XG4gICAgICByZXR1cm4gKzE7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzID0gdmVydGljZXM7ICAvLy9cblxuICByZXR1cm4gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcztcbn1cbiJdfQ==