'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var necessary = require('necessary');

var Edge = require('./edge'),
    Vertex = require('./vertex'),
    vertexUtilities = require('./utilities/vertex');

var array = necessary.array,
    last = array.last,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsInZlcnRleFV0aWxpdGllcyIsImFycmF5IiwibGFzdCIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJEaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcCIsInZlcnRpY2VzIiwiT2JqZWN0IiwidmFsdWVzIiwidmVydGV4TmFtZXMiLCJrZXlzIiwiZ2V0VmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWUiLCJ2ZXJ0ZXhQcmVzZW50IiwiaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lIiwidmVydGV4IiwidmVydGljZXNMZW5ndGgiLCJsZW5ndGgiLCJlbXB0eSIsImVkZ2UiLCJzb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0U291cmNlVmVydGV4TmFtZSIsInRhcmdldFZlcnRleE5hbWUiLCJnZXRUYXJnZXRWZXJ0ZXhOYW1lIiwiZWRnZVByZXNlbnQiLCJpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyIsInNvdXJjZVZlcnRleCIsImdldFZlcnRleEJ5VmVydGV4TmFtZSIsInRhcmdldFZlcnRleCIsInNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQiLCJ0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleFRhcmdldFZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImdldFZlcnRleE5hbWVzIiwidmVydGV4TmFtZXNJbmNsdWRlc1ZlcnRleE5hbWUiLCJpbmNsdWRlcyIsInByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJnZXRQcmVkZWNlc3NvclZlcnRleE5hbWVzIiwic3VjY2Vzc29yVmVydGV4TmFtZXMiLCJnZXRTdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWVzTGVuZ3RoIiwibmFtZSIsImluZGV4IiwiZnJvbU5hbWVBbmRJbmRleCIsInNldFZlcnRleEJ5VmVydGV4TmFtZSIsImN5Y2xpY1ZlcnRleE5hbWVzIiwiYWRkRWRnZUJ5VmVydGV4TmFtZXMiLCJjeWNsaWNWZXJ0aWNlcyIsImN5Y2xpY1ZlcnRleE5hbWUiLCJjeWNsaWNWZXJ0ZXgiLCJhZGRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJpc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhJbmRleCIsImdldEluZGV4IiwidGFyZ2V0VmVydGV4SW5kZXgiLCJpbnZhbGlkYXRpbmdFZGdlIiwidmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyIsImN5Y2xlTWlzc2luZyIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVkRWRnZXMiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlIiwicHVzaCIsInJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwicmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwidW5zZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJyZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyIsInNvdXJjZVZlcnRleFByZXNlbnQiLCJyZW1vdmVPdXRnb2luZ0VkZ2VzIiwidGFyZ2V0VmVydGV4UHJlc2VudCIsInJlbW92ZUluY29taW5nRWRnZXMiLCJmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJnZXRGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCIsImN5Y2xlUHJlc2VudCIsImJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJnZXRCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiYWZmZWN0ZWRWZXJ0aWNlcyIsImNvbmNhdCIsImFmZmVjdGVkVmVydGV4SW5kaWNlcyIsIm1hcCIsImFmZmVjdGVkVmVydGV4IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRleCIsInNvcnQiLCJmb3JFYWNoIiwic2V0SW5kZXgiLCJkaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyIsInZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwiYWRkRWRnZXNUb1ZlcnRpY2VzIiwibW9kdWxlIiwiZXhwb3J0cyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4IiwiZm9yRWFjaE91dGdvaW5nRWRnZSIsIm91dGdvaW5nRWRnZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZQyxRQUFRLFdBQVIsQ0FBbEI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNNRSxTQUFTRixRQUFRLFVBQVIsQ0FEZjtBQUFBLElBRU1HLGtCQUFrQkgsUUFBUSxvQkFBUixDQUZ4Qjs7QUFJTSxJQUFFSSxLQUFGLEdBQVlMLFNBQVosQ0FBRUssS0FBRjtBQUFBLElBQ0VDLElBREYsR0FDVUQsS0FEVixDQUNFQyxJQURGO0FBQUEs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O0FBQ3BEc0YscUNBQStCcEYsZ0JBSHJDO0FBQUEsVUFJTXFDLDZCQUE2QnhELFVBQVUrRCw4QkFBVixDQUpuQztBQUFBLFVBSThFO0FBQ3hFTixpQ0FBMkJ6RCxVQUFVdUcsNEJBQVYsQ0FMakMsQ0FEb0UsQ0FNTTs7QUFFMUUvQyxpQ0FBMkJFLDJCQUEzQixDQUF1REQsd0JBQXZEOztBQUVBQSwrQkFBeUJFLDZCQUF6QixDQUF1REgsMEJBQXZEO0FBQ0QsS0FYRDtBQVlELEdBYkQ7QUFjRCIsImZpbGUiOiJkaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IEVkZ2UgPSByZXF1aXJlKCcuL2VkZ2UnKSxcbiAgICAgIFZlcnRleCA9IHJlcXVpcmUoJy4vdmVydGV4JyksXG4gICAgICB2ZXJ0ZXhVdGlsaXRpZXMgPSByZXF1aXJlKCcuL3V0aWxpdGllcy92ZXJ0ZXgnKTtcblxuY29uc3QgeyBhcnJheSB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBsYXN0fSA9IGFycmF5LFxuICAgICAgeyB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcywgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMgfSA9IHZlcnRleFV0aWxpdGllcztcblxuY2xhc3MgRGlyZWN0ZWRBY3ljbGljR3JhcGgge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhNYXApIHtcbiAgICB0aGlzLnZlcnRleE1hcCA9IHZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHZlcnRpY2VzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gdmVydGljZXM7XG4gIH1cblxuICBnZXRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKTtcblxuICAgIHJldHVybiB2ZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyh2ZXJ0aWNlcyk7XG4gICAgXG4gICAgY29uc3QgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyA9IHZlcnRpY2VzLCAvLy9cbiAgICAgICAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzID0gdmVydGV4TmFtZXNGcm9tVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyk7XG4gICAgXG4gICAgcmV0dXJuIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0ZXhQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdIDpcbiAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICBzZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSwgdmVydGV4KSB7XG4gICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH1cblxuICB1bnNldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKSxcbiAgICAgICAgICB2ZXJ0aWNlc0xlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9ICh2ZXJ0aWNlc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50KGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gdGhpcy5pc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgICBcbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IGVkZ2VQcmVzZW50ID0gZmFsc2U7XG5cbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgIHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQgPSAoc291cmNlVmVydGV4ICE9PSBudWxsKSAmJiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXguaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KSxcbiAgICAgICAgICBzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleC5pc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCk7XG5cbiAgICAgIGVkZ2VQcmVzZW50ID0gKHRhcmdldFZlcnRleFNvdXJjZVZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCAmJiBzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IHRoaXMuZ2V0VmVydGV4TmFtZXMoKSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZSA9IHZlcnRleE5hbWVzLmluY2x1ZGVzKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleFByZXNlbnQgPSB2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZTsgIC8vL1xuXG4gICAgcmV0dXJuIHZlcnRleFByZXNlbnQ7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gdmVydGV4LmdldFN1Y2Nlc3NvclZlcnRleE5hbWVzKCk7XG4gICAgXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAoIXZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgIHZlcnRleE5hbWVzTGVuZ3RoID0gdmVydGV4TmFtZXMubGVuZ3RoLFxuICAgICAgICAgIG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgaW5kZXggPSB2ZXJ0ZXhOYW1lc0xlbmd0aCwgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgICB0aGlzLnNldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lLCB2ZXJ0ZXgpO1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIGFkZEVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgY3ljbGljVmVydGV4TmFtZXMgPSB0aGlzLmFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWVzO1xuICB9XG5cbiAgYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBpZiAoc291cmNlVmVydGV4TmFtZSA9PT0gdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgICAgY29uc3QgY3ljbGljVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGN5Y2xpY1ZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKGN5Y2xpY1ZlcnRleE5hbWUpO1xuXG4gICAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gW2N5Y2xpY1ZlcnRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcblxuICAgICAgaWYgKCFlZGdlUHJlc2VudCkge1xuICAgICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbmRleCA9IHNvdXJjZVZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICB0YXJnZXRWZXJ0ZXhJbmRleCA9IHRhcmdldFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICBpbnZhbGlkYXRpbmdFZGdlID0gKHNvdXJjZVZlcnRleEluZGV4ID4gdGFyZ2V0VmVydGV4SW5kZXgpO1xuXG4gICAgICAgIGlmIChpbnZhbGlkYXRpbmdFZGdlKSB7XG4gICAgICAgICAgY3ljbGljVmVydGljZXMgPSB0aGlzLnZhbGlkYXRlRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3ljbGVNaXNzaW5nID0gKGN5Y2xpY1ZlcnRpY2VzID09PSBudWxsKTsgLy8vXG5cbiAgICAgICAgaWYgKGN5Y2xlTWlzc2luZykge1xuICAgICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gc291cmNlVmVydGV4LCAvLy9cbiAgICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0YXJnZXRWZXJ0ZXg7IC8vL1xuXG4gICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGN5Y2xpY1ZlcnRleE5hbWVzID0gKGN5Y2xpY1ZlcnRpY2VzICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzKGN5Y2xpY1ZlcnRpY2VzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcblxuICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIHJlbW92ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IHJlbW92ZWRFZGdlcyA9IG51bGw7XG5cbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAodmVydGV4UHJlc2VudCkge1xuICAgICAgcmVtb3ZlZEVkZ2VzID0gW107XG5cbiAgICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSwgIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy51bnNldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlZEVkZ2VzO1xuICB9XG5cbiAgcmVtb3ZlRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKTtcblxuICAgIHRoaXMucmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gIH1cblxuICByZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVFZGdlc0J5U291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlT3V0Z29pbmdFZGdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlUYXJnZXRWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAodGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbmNvbWluZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBjb25zdCBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0YXJnZXRWZXJ0ZXguZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCksXG4gICAgICAgICAgbGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPSBsYXN0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgY3ljbGVQcmVzZW50ID0gKGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgIFxuICAgIGlmIChjeWNsZVByZXNlbnQpIHtcbiAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gc291cmNlVmVydGV4LmdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKTtcblxuICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGljZXMgPSBbXS5jb25jYXQoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcykuY29uY2F0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgICBhZmZlY3RlZFZlcnRleEluZGljZXMgPSBhZmZlY3RlZFZlcnRpY2VzLm1hcChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCkge1xuICAgICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgICAgICAgICAgICByZXR1cm4gYWZmZWN0ZWRWZXJ0ZXhJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICBhZmZlY3RlZFZlcnRleEluZGljZXMuc29ydCgpO1xuXG4gICAgICBhZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleEluZGljZXNbaW5kZXhdO1xuXG4gICAgICAgIGFmZmVjdGVkVmVydGV4LnNldEluZGV4KGFmZmVjdGVkVmVydGV4SW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRpY2VzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHt9LFxuICAgICAgICAgIGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpO1xuXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyk7XG4gICAgXG4gICAgYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCk7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcbiAgICBcbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RlZEFjeWNsaWNHcmFwaDtcblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbih2ZXJ0ZXhOYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcbiAgXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCksXG4gICAgICAgICAgdmVydGV4TmFtZSA9IG5hbWU7ICAvLy9cblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCkge1xuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgpIHtcbiAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5mb3JFYWNoT3V0Z29pbmdFZGdlKGZ1bmN0aW9uKG91dGdvaW5nRWRnZSkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXhOYW1lLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSwgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZV07IC8vL1xuXG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=