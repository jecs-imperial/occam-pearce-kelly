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
    key: 'isEmpty',
    value: function isEmpty() {
      var vertices = this.getVertices(),
          verticesLength = vertices.length,
          empty = verticesLength === 0;

      return empty;
    }
  }, {
    key: 'getVertices',
    value: function getVertices() {
      var vertexMapValues = Object.values(this.vertexMap),
          vertices = vertexMapValues; ///

      return vertices;
    }
  }, {
    key: 'getVertexNames',
    value: function getVertexNames() {
      var vertexMapKeys = Object.keys(this.vertexMap),
          vertexNames = vertexMapKeys; ///

      return vertexNames;
    }
  }, {
    key: 'getVertexByVertexName',
    value: function getVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresentByVertexName(vertexName),
          vertex = vertexPresent ? this.vertexMap[vertexName] : null;

      return vertex;
    }
  }, {
    key: 'getEdgesByTargetVertexName',
    value: function getEdgesByTargetVertexName(targetVertexName) {
      var edges = [],
          targetVertex = this.getVertexByVertexName(targetVertexName);

      if (targetVertex !== null) {
        var immediatePredecessorVertexNames = targetVertex.getImmediatePredecessorVertexNames(),
            sourceVertexNames = immediatePredecessorVertexNames; ///

        sourceVertexNames.forEach(function (sourceVertexName) {
          var edge = Edge.fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);

          edges.push(edge);
        });
      }

      return edges;
    }
  }, {
    key: 'getEdgesBySourceVertexName',
    value: function getEdgesBySourceVertexName(sourceVertexName) {
      var edges = [],
          sourceVertex = this.getVertexByVertexName(sourceVertexName);

      if (sourceVertex !== null) {
        var immediateSuccessorVertexNames = sourceVertex.getImmediateSuccessorVertexNames(),
            targetVertexNames = immediateSuccessorVertexNames; ///

        targetVertexNames.forEach(function (targetVertexName) {
          var edge = Edge.fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);

          edges.push(edge);
        });
      }

      return edges;
    }
  }, {
    key: 'setVertexByVertexName',
    value: function setVertexByVertexName(vertexName, vertex) {
      this.vertexMap[vertexName] = vertex;
    }
  }, {
    key: 'deleteVertexByVertexName',
    value: function deleteVertexByVertexName(vertexName) {
      delete this.vertexMap[vertexName];
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
        edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);
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
    key: 'addEdge',
    value: function addEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          success = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);

      return success;
    }
  }, {
    key: 'removeEdge',
    value: function removeEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName();

      this.removeEdgeByVertexNames(sourceVertexName, targetVertexName);
    }
  }, {
    key: 'addEdgeByVertexNames',
    value: function addEdgeByVertexNames(sourceVertexName, targetVertexName) {
      var success = false;

      if (sourceVertexName !== targetVertexName) {
        var sourceVertex = this.addVertexByVertexName(sourceVertexName),
            targetVertex = this.addVertexByVertexName(targetVertexName),
            edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);

        if (!edgePresent) {
          var sourceVertexIndex = sourceVertex.getIndex(),
              targetVertexIndex = targetVertex.getIndex(),
              invalidatingEdge = sourceVertexIndex > targetVertexIndex;

          if (invalidatingEdge) {
            success = addEdgeByVertices(sourceVertex, targetVertex);
          } else {
            success = true;
          }
        }

        if (success) {
          var immediatePredecessorVertex = sourceVertex,
              ///
          immediateSuccessorVertex = targetVertex; ///

          immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

          immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
        }
      }

      return success;
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

        this.deleteVertexByVertexName(vertexName);

        var deletedVertex = vertex,
            ///
        deletedVertexIndex = deletedVertex.getIndex(),
            vertices = this.getVertices(),
            affectedVertices = vertices.reduce(function (affectedVertices, vertex) {
          var vertexIndex = vertex.getIndex(),
              vertexAffected = vertexIndex > deletedVertexIndex;

          if (vertexAffected) {
            var affectedVertex = vertex; ///

            affectedVertices.push(affectedVertex);
          }

          return affectedVertices;
        }, []);

        affectedVertices.forEach(function (affectedVertex) {
          affectedVertex.decrementIndex();
        });
      }

      return removedEdges;
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

function addEdgeByVertices(sourceVertex, targetVertex) {
  var success = false;

  var forwardsAffectedVertices = targetVertex.retrieveForwardsAffectedVertices(sourceVertex),
      lastForwardsAffectedVertex = last(forwardsAffectedVertices),
      resultsInCycle = lastForwardsAffectedVertex === sourceVertex;

  if (!resultsInCycle) {
    var backwardsAffectedVertices = sourceVertex.retrieveBackwardsAffectedVertices();

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

    success = true;
  }

  return success;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsInZlcnRleFV0aWxpdGllcyIsImFycmF5VXRpbGl0aWVzIiwibGFzdCIsInZlcnRleE5hbWVzRnJvbVZlcnRpY2VzIiwidG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMiLCJEaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcCIsInZlcnRpY2VzIiwiZ2V0VmVydGljZXMiLCJ2ZXJ0aWNlc0xlbmd0aCIsImxlbmd0aCIsImVtcHR5IiwidmVydGV4TWFwVmFsdWVzIiwiT2JqZWN0IiwidmFsdWVzIiwidmVydGV4TWFwS2V5cyIsImtleXMiLCJ2ZXJ0ZXhOYW1lcyIsInZlcnRleE5hbWUiLCJ2ZXJ0ZXhQcmVzZW50IiwiaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lIiwidmVydGV4IiwidGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VzIiwidGFyZ2V0VmVydGV4IiwiZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lIiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyIsImdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXhOYW1lcyIsImZvckVhY2giLCJzb3VyY2VWZXJ0ZXhOYW1lIiwiZWRnZSIsImZyb21Tb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZSIsInB1c2giLCJzb3VyY2VWZXJ0ZXgiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyIsImdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzIiwidGFyZ2V0VmVydGV4TmFtZXMiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMiLCJzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4IiwiZ2V0VmVydGV4TmFtZXMiLCJ2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZSIsImluY2x1ZGVzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMiLCJzdWNjZXNzIiwiYWRkRWRnZUJ5VmVydGV4TmFtZXMiLCJyZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyIsImFkZFZlcnRleEJ5VmVydGV4TmFtZSIsInNvdXJjZVZlcnRleEluZGV4IiwiZ2V0SW5kZXgiLCJ0YXJnZXRWZXJ0ZXhJbmRleCIsImludmFsaWRhdGluZ0VkZ2UiLCJhZGRFZGdlQnlWZXJ0aWNlcyIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsInNvdXJjZVZlcnRleFByZXNlbnQiLCJyZW1vdmVPdXRnb2luZ0VkZ2VzIiwidGFyZ2V0VmVydGV4UHJlc2VudCIsInJlbW92ZUluY29taW5nRWRnZXMiLCJ2ZXJ0ZXhOYW1lc0xlbmd0aCIsIm5hbWUiLCJpbmRleCIsImZyb21OYW1lQW5kSW5kZXgiLCJzZXRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJyZW1vdmVkRWRnZXMiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlIiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lIiwiZGVsZXRlZFZlcnRleCIsImRlbGV0ZWRWZXJ0ZXhJbmRleCIsImFmZmVjdGVkVmVydGljZXMiLCJyZWR1Y2UiLCJ2ZXJ0ZXhJbmRleCIsInZlcnRleEFmZmVjdGVkIiwiYWZmZWN0ZWRWZXJ0ZXgiLCJkZWNyZW1lbnRJbmRleCIsImRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwRnJvbVZlcnRleE5hbWVzIiwidmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJhZGRFZGdlc1RvVmVydGljZXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwicmV0cmlldmVGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCIsInJlc3VsdHNJbkN5Y2xlIiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsInJldHJpZXZlQmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImNvbmNhdCIsImFmZmVjdGVkVmVydGV4SW5kaWNlcyIsIm1hcCIsImFmZmVjdGVkVmVydGV4SW5kZXgiLCJzb3J0Iiwic2V0SW5kZXgiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCIsImZvckVhY2hPdXRnb2luZ0VkZ2UiLCJvdXRnb2luZ0VkZ2UiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWUMsUUFBUSxXQUFSLENBQWxCOztBQUVBLElBQU1DLE9BQU9ELFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUUsU0FBU0YsUUFBUSxVQUFSLENBRGY7QUFBQSxJQUVNRyxrQkFBa0JILFFBQVEsb0JBQVIsQ0FGeEI7O0FBSU0sSUFBRUksY0FBRixHQUFxQkwsU0FBckIsQ0FBRUssY0FBRjtBQUFBLElBQ0VDLElBREYsR0FDV0Qs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LENBRG9FLENBTU07O0FBRTFFdkQsaUNBQTJCRSwyQkFBM0IsQ0FBdURELHdCQUF2RDs7QUFFQUEsK0JBQXlCRSw2QkFBekIsQ0FBdURILDBCQUF2RDtBQUNELEtBWEQ7QUFZRCxHQWJEO0FBY0QiLCJmaWxlIjoiZGlyZWN0ZWRBY3ljbGljR3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCBFZGdlID0gcmVxdWlyZSgnLi9lZGdlJyksXG4gICAgICBWZXJ0ZXggPSByZXF1aXJlKCcuL3ZlcnRleCcpLFxuICAgICAgdmVydGV4VXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvdmVydGV4Jyk7XG5cbmNvbnN0IHsgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgbGFzdCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzLCB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyB9ID0gdmVydGV4VXRpbGl0aWVzO1xuXG5jbGFzcyBEaXJlY3RlZEFjeWNsaWNHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleE1hcCkge1xuICAgIHRoaXMudmVydGV4TWFwID0gdmVydGV4TWFwO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKSxcbiAgICAgICAgICB2ZXJ0aWNlc0xlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9ICh2ZXJ0aWNlc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBnZXRWZXJ0aWNlcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXBWYWx1ZXMgPSBPYmplY3QudmFsdWVzKHRoaXMudmVydGV4TWFwKSxcbiAgICAgICAgICB2ZXJ0aWNlcyA9IHZlcnRleE1hcFZhbHVlczsgLy8vXG5cbiAgICByZXR1cm4gdmVydGljZXM7XG4gIH1cblxuICBnZXRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXBLZXlzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApLFxuICAgICAgICAgIHZlcnRleE5hbWVzID0gdmVydGV4TWFwS2V5czsgIC8vL1xuXG4gICAgcmV0dXJuIHZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4ID0gdmVydGV4UHJlc2VudCA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA6XG4gICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgZ2V0RWRnZXNCeVRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IGVkZ2VzID0gW10sXG4gICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdGFyZ2V0VmVydGV4LmdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSxcbiAgICAgICAgICAgIHNvdXJjZVZlcnRleE5hbWVzID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lczsgIC8vL1xuXG4gICAgICBzb3VyY2VWZXJ0ZXhOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHNvdXJjZVZlcnRleE5hbWUpIHtcbiAgICAgICAgY29uc3QgZWRnZSA9IEVkZ2UuZnJvbVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIGVkZ2VzLnB1c2goZWRnZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWRnZXM7XG4gIH1cblxuICBnZXRFZGdlc0J5U291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZXMgPSBbXSxcbiAgICAgICAgICBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXggIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzID0gc291cmNlVmVydGV4LmdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lcyA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzOyAgLy8vXG5cbiAgICAgIHRhcmdldFZlcnRleE5hbWVzLmZvckVhY2goZnVuY3Rpb24odGFyZ2V0VmVydGV4TmFtZSkge1xuICAgICAgICBjb25zdCBlZGdlID0gRWRnZS5mcm9tU291cmNlVmVydGV4TmFtZUFuZFRhcmdldFZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgZWRnZXMucHVzaChlZGdlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBlZGdlcztcbiAgfVxuXG4gIHNldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lLCB2ZXJ0ZXgpIHtcbiAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfVxuXG4gIGRlbGV0ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdO1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudChlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gICAgXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBlZGdlUHJlc2VudCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCA9IChzb3VyY2VWZXJ0ZXggIT09IG51bGwpICYmICh0YXJnZXRWZXJ0ZXggIT09IG51bGwpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQpIHtcbiAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4LmlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuICAgIH1cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4TmFtZXMgPSB0aGlzLmdldFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgdmVydGV4TmFtZXNJbmNsdWRlc1ZlcnRleE5hbWUgPSB2ZXJ0ZXhOYW1lcy5pbmNsdWRlcyh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB2ZXJ0ZXhQcmVzZW50ID0gdmVydGV4TmFtZXNJbmNsdWRlc1ZlcnRleE5hbWU7ICAvLy9cblxuICAgIHJldHVybiB2ZXJ0ZXhQcmVzZW50O1xuICB9XG5cbiAgZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHZlcnRpY2VzKTtcblxuICAgIGNvbnN0IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMgPSB2ZXJ0aWNlcywgLy8vXG4gICAgICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcyA9IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXM7XG4gIH1cblxuICBhZGRFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICByZW1vdmVFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpO1xuXG4gICAgdGhpcy5yZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgfVxuXG4gIGFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleE5hbWUgIT09IHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcblxuICAgICAgaWYgKCFlZGdlUHJlc2VudCkge1xuICAgICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbmRleCA9IHNvdXJjZVZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICB0YXJnZXRWZXJ0ZXhJbmRleCA9IHRhcmdldFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICBpbnZhbGlkYXRpbmdFZGdlID0gKHNvdXJjZVZlcnRleEluZGV4ID4gdGFyZ2V0VmVydGV4SW5kZXgpO1xuXG4gICAgICAgIGlmIChpbnZhbGlkYXRpbmdFZGdlKSB7XG4gICAgICAgICAgc3VjY2VzcyA9IGFkZEVkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleCwgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleDsgLy8vXG5cbiAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICByZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVFZGdlc0J5U291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlT3V0Z29pbmdFZGdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlUYXJnZXRWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAodGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbmNvbWluZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAoIXZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgdmVydGV4TmFtZXNMZW5ndGggPSB2ZXJ0ZXhOYW1lcy5sZW5ndGgsXG4gICAgICAgICAgICBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW5kZXggPSB2ZXJ0ZXhOYW1lc0xlbmd0aCwgLy8vXG4gICAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICAgIHRoaXMuc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUsIHZlcnRleCk7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlZEVkZ2VzID0gbnVsbDtcblxuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICByZW1vdmVkRWRnZXMgPSBbXTtcblxuICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICByZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLCAgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRlbGV0ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgICAgY29uc3QgZGVsZXRlZFZlcnRleCA9IHZlcnRleCwgLy8vXG4gICAgICAgICAgICBkZWxldGVkVmVydGV4SW5kZXggPSBkZWxldGVkVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKSxcbiAgICAgICAgICAgIGFmZmVjdGVkVmVydGljZXMgPSB2ZXJ0aWNlcy5yZWR1Y2UoZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0aWNlcywgdmVydGV4KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHZlcnRleEluZGV4ID0gdmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleEFmZmVjdGVkID0gKHZlcnRleEluZGV4ID4gZGVsZXRlZFZlcnRleEluZGV4KTtcblxuICAgICAgICAgICAgICBpZiAodmVydGV4QWZmZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleCA9IHZlcnRleDsgIC8vL1xuXG4gICAgICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0aWNlcy5wdXNoKGFmZmVjdGVkVmVydGV4KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRpY2VzO1xuICAgICAgICAgICAgfSwgW10pO1xuXG4gICAgICBhZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgpIHtcbiAgICAgICAgYWZmZWN0ZWRWZXJ0ZXguZGVjcmVtZW50SW5kZXgoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVkRWRnZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0ge30sXG4gICAgICAgICAgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcyk7XG5cbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKTtcbiAgICBcbiAgICBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKTtcbiAgICBcbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuXG5mdW5jdGlvbiBhZGRFZGdlQnlWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgsIHRhcmdldFZlcnRleCkge1xuICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRhcmdldFZlcnRleC5yZXRyaWV2ZUZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgpLFxuICAgICAgICBsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9IGxhc3QoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgcmVzdWx0c0luQ3ljbGUgPSAobGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPT09IHNvdXJjZVZlcnRleCk7XG5cbiAgaWYgKCFyZXN1bHRzSW5DeWNsZSkge1xuICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMgPSBzb3VyY2VWZXJ0ZXgucmV0cmlldmVCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKCk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICBjb25zdCBhZmZlY3RlZFZlcnRpY2VzID0gW10uY29uY2F0KGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpLmNvbmNhdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcyA9IGFmZmVjdGVkVmVydGljZXMubWFwKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4KSB7XG4gICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGV4SW5kZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICBhZmZlY3RlZFZlcnRleEluZGljZXMuc29ydCgpO1xuXG4gICAgYWZmZWN0ZWRWZXJ0aWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4LCBpbmRleCkge1xuICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4SW5kaWNlc1tpbmRleF07XG5cbiAgICAgIGFmZmVjdGVkVmVydGV4LnNldEluZGV4KGFmZmVjdGVkVmVydGV4SW5kZXgpO1xuICAgIH0pO1xuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gc3VjY2Vzcztcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbih2ZXJ0ZXhOYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcbiAgXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCksXG4gICAgICAgICAgdmVydGV4TmFtZSA9IG5hbWU7ICAvLy9cblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCkge1xuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgpIHtcbiAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5mb3JFYWNoT3V0Z29pbmdFZGdlKGZ1bmN0aW9uKG91dGdvaW5nRWRnZSkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXhOYW1lLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSwgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZV07IC8vL1xuXG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=