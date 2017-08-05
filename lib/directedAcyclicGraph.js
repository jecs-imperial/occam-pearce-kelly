'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var necessary = require('necessary');

var Edge = require('./edge'),
    Vertex = require('./vertex');

var array = necessary.array;

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
          lastForwardsAffectedVertex = array.last(forwardsAffectedVertices),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsImFycmF5IiwiRGlyZWN0ZWRBY3ljbGljR3JhcGgiLCJ2ZXJ0ZXhNYXAiLCJ2ZXJ0ZXhOYW1lcyIsIk9iamVjdCIsImtleXMiLCJlZGdlIiwic291cmNlVmVydGV4TmFtZSIsImdldFNvdXJjZVZlcnRleE5hbWUiLCJ0YXJnZXRWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMiLCJ2ZXJ0ZXhOYW1lIiwidmVydGV4UHJlc2VudCIsImhhc093blByb3BlcnR5Iiwic291cmNlVmVydGV4IiwicmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUiLCJ0YXJnZXRWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50IiwidGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUiLCJ2ZXJ0ZXgiLCJjeWNsaWNWZXJ0ZXhOYW1lcyIsImFkZEVkZ2VCeVZlcnRleE5hbWVzIiwicmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMiLCJ2ZXJ0ZXhOYW1lc0xlbmd0aCIsImxlbmd0aCIsIm5hbWUiLCJpbmRleCIsImZyb21OYW1lQW5kSW5kZXgiLCJyZW1vdmVkRWRnZXMiLCJmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lIiwiZ2V0TmFtZSIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2UiLCJwdXNoIiwicmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJjeWNsaWNWZXJ0aWNlcyIsImN5Y2xpY1ZlcnRleE5hbWUiLCJjeWNsaWNWZXJ0ZXgiLCJhZGRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJpc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhJbmRleCIsImdldEluZGV4IiwidGFyZ2V0VmVydGV4SW5kZXgiLCJpbnZhbGlkYXRpbmdFZGdlIiwidmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyIsImN5Y2xlTWlzc2luZyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwibWFwIiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwibGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXgiLCJsYXN0IiwiY3ljbGVQcmVzZW50IiwiYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJzb3J0VmVydGljZXMiLCJhZmZlY3RlZFZlcnRpY2VzIiwiY29uY2F0IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzIiwiYWZmZWN0ZWRWZXJ0ZXgiLCJhZmZlY3RlZFZlcnRleEluZGV4Iiwic29ydCIsImZvckVhY2giLCJzZXRJbmRleCIsImNhbGxiYWNrIiwicmVzdWx0IiwiYmluZCIsImRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwRnJvbVZlcnRleE5hbWVzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsInZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzIiwiYWRkRWRnZXNUb1ZlcnRpY2VzIiwidmVydGljZXMiLCJmaXJzdFZlcnRleCIsInNlY29uZFZlcnRleCIsImZpcnN0VmVydGV4SW5kZXgiLCJzZWNvbmRWZXJ0ZXhJbmRleCIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCIsImZvckVhY2hPdXRnb2luZ0VkZ2UiLCJvdXRnb2luZ0VkZ2UiLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWUMsUUFBUSxXQUFSLENBQWxCOztBQUVBLElBQU1DLE9BQU9ELFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUUsU0FBU0YsUUFBUSxVQUFSLENBRGY7O0lBR1FHLEssR0FBVUosUyxDQUFWSSxLOztJQUVGQyxvQjtBQUNKLGdDQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBQ3JCLFNBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0Q7Ozs7cUNBRWdCO0FBQ2YsVUFBTUMsY0FBY0MsT0FBT0MsSUFBUCxDQUFZLEtBQUtILFNBQWpCLENBQXBCOztBQUVBLGFBQU9DLFdBQVA7QUFDRDs7O2tDQUVhRyxJLEVBQU07QUFDbEIsVUFBTUMsbUJBQW1CRCxLQUFLRSxtQkFBTCxFQUF6QjtBQUFBLFVBQ01DLG1CQUFtQkgsS0FBS0ksbUJBQUwsRUFEekI7QUFBQSxVQUVNQyxjQUFjLEtBQUtDLDBCQUFMLENBQWdDTCxnQkFBaEMsRUFBa0RFLGdCQUFsRCxDQUZwQjs7QUFJQSxhQUFPRSxXQUFQO0FBQ0Q7OztnREFFMkJFLFUsRUFBWTtBQUN0QyxVQUFNQyxnQkFBZ0IsS0FBS1osU0FBTCxDQUFlYSxjQUFmLENBQThCRixVQUE5QixDQUF0Qjs7QUFFQSxh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QTFELEVBQXFFO0FBQ25Fa0YsK0JBQTZCUCxPQUE3QixDQUFxQyxVQUFTaUIsMEJBQVQsRUFBcUM7QUFDeEVBLCtCQUEyQkMsbUJBQTNCLENBQStDLFVBQVNDLFlBQVQsRUFBdUI7QUFDcEUsVUFBTXpGLG1CQUFtQnlGLGFBQWF4RixtQkFBYixFQUF6QjtBQUFBLFVBQ01DLG1CQUFtQnVGLGFBQWF0RixtQkFBYixFQUR6QjtBQUFBLFVBRU00QixpQ0FBaUMvQixnQkFGdkM7QUFBQSxVQUUwRDtBQUNwRDBGLHFDQUErQnhGLGdCQUhyQztBQUFBLFVBSU00Qiw2QkFBNkJuQyxVQUFVb0MsOEJBQVYsQ0FKbkM7QUFBQSxVQUk4RTtBQUN4RXFCLGlDQUEyQnpELFVBQVUrRiw0QkFBVixDQUxqQyxDQURvRSxDQU1NOztBQUUxRTVELGlDQUEyQnVCLDJCQUEzQixDQUF1REQsd0JBQXZEOztBQUVBQSwrQkFBeUJFLDZCQUF6QixDQUF1RHhCLDBCQUF2RDtBQUNELEtBWEQ7QUFZRCxHQWJEO0FBY0QiLCJmaWxlIjoiZGlyZWN0ZWRBY3ljbGljR3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCBFZGdlID0gcmVxdWlyZSgnLi9lZGdlJyksXG4gICAgICBWZXJ0ZXggPSByZXF1aXJlKCcuL3ZlcnRleCcpO1xuXG5jb25zdCB7IGFycmF5IH0gPSBuZWNlc3Nhcnk7XG5cbmNsYXNzIERpcmVjdGVkQWN5Y2xpY0dyYXBoIHtcbiAgY29uc3RydWN0b3IodmVydGV4TWFwKSB7XG4gICAgdGhpcy52ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXA7XG4gIH1cblxuICBnZXRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKTtcblxuICAgIHJldHVybiB2ZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnQoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICAgIFxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuICBcbiAgaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy52ZXJ0ZXhNYXAuaGFzT3duUHJvcGVydHkodmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gdmVydGV4UHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgZWRnZVByZXNlbnQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgIHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQgPSAoc291cmNlVmVydGV4ICE9PSBudWxsKSAmJiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXguaXNWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KSxcbiAgICAgICAgICBzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleC5pc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCk7XG5cbiAgICAgIGVkZ2VQcmVzZW50ID0gKHRhcmdldFZlcnRleFNvdXJjZVZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCAmJiBzb3VyY2VWZXJ0ZXhUYXJnZXRWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgcmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB2ZXJ0ZXggPSB2ZXJ0ZXhQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gOlxuICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgYWRkRWRnZShlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBjeWNsaWNWZXJ0ZXhOYW1lcyA9IHRoaXMuYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZXM7XG4gIH1cbiAgXG4gIHJlbW92ZUVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCk7XG5cbiAgICB0aGlzLnJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICB9XG5cbiAgYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAoIXZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHZlcnRleE5hbWVzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApLFxuICAgICAgICAgICAgdmVydGV4TmFtZXNMZW5ndGggPSB2ZXJ0ZXhOYW1lcy5sZW5ndGgsXG4gICAgICAgICAgICBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW5kZXggPSB2ZXJ0ZXhOYW1lc0xlbmd0aCwgLy8vXG4gICAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIHJlbW92ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IHJlbW92ZWRFZGdlcyA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHZlcnRleFByZXNlbnQpIHtcbiAgICAgIHJlbW92ZWRFZGdlcyA9IFtdO1xuICAgICAgXG4gICAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChmdW5jdGlvbihpbW1lZGlhdGVTdWNjZXNzVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vLyBcbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksICAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vLyBcbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZWxldGUgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkRWRnZXM7XG4gIH1cblxuICBhZGRFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IGN5Y2xpY1ZlcnRpY2VzID0gbnVsbDtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhOYW1lID09PSB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgICBjb25zdCBjeWNsaWNWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgY3ljbGljVmVydGV4ID0gdGhpcy52ZXJ0ZXhNYXBbY3ljbGljVmVydGV4TmFtZV07XG5cbiAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gW2N5Y2xpY1ZlcnRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcblxuICAgICAgaWYgKCFlZGdlUHJlc2VudCkge1xuICAgICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbmRleCA9IHNvdXJjZVZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICB0YXJnZXRWZXJ0ZXhJbmRleCA9IHRhcmdldFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICBpbnZhbGlkYXRpbmdFZGdlID0gKHNvdXJjZVZlcnRleEluZGV4ID4gdGFyZ2V0VmVydGV4SW5kZXgpO1xuXG4gICAgICAgIGlmIChpbnZhbGlkYXRpbmdFZGdlKSB7XG4gICAgICAgICAgY3ljbGljVmVydGljZXMgPSB0aGlzLnZhbGlkYXRlRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3ljbGVNaXNzaW5nID0gKGN5Y2xpY1ZlcnRpY2VzID09PSBudWxsKTsgLy8vXG5cbiAgICAgICAgaWYgKGN5Y2xlTWlzc2luZykge1xuICAgICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gc291cmNlVmVydGV4LCAvLy9cbiAgICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0YXJnZXRWZXJ0ZXg7IC8vL1xuXG4gICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGN5Y2xpY1ZlcnRleE5hbWVzID0gbnVsbDtcblxuICAgIGlmIChjeWNsaWNWZXJ0aWNlcyAhPT0gbnVsbCkge1xuICAgICAgY3ljbGljVmVydGV4TmFtZXMgPSBjeWNsaWNWZXJ0aWNlcy5tYXAoZnVuY3Rpb24oY3ljbGljVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGN5Y2xpY1ZlcnRleE5hbWUgPSBjeWNsaWNWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWVzO1xuICB9XG5cbiAgcmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IGVkZ2VQcmVzZW50ID0gdGhpcy5pc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmIChlZGdlUHJlc2VudCkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHNvdXJjZVZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpIHtcbiAgICBsZXQgY3ljbGljVmVydGljZXMgPSBudWxsO1xuXG4gICAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGFyZ2V0VmVydGV4LmdldEZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyhzb3VyY2VWZXJ0ZXgpLFxuICAgICAgICAgIGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID0gYXJyYXkubGFzdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICAgIGN5Y2xlUHJlc2VudCA9IChsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9PT0gc291cmNlVmVydGV4KTtcbiAgICBcbiAgICBpZiAoY3ljbGVQcmVzZW50KSB7XG4gICAgICBjeWNsaWNWZXJ0aWNlcyA9IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHNvdXJjZVZlcnRleC5nZXRCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKCk7XG5cbiAgICAgIERpcmVjdGVkQWN5Y2xpY0dyYXBoLnNvcnRWZXJ0aWNlcyhiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgICAgRGlyZWN0ZWRBY3ljbGljR3JhcGguc29ydFZlcnRpY2VzKGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGljZXMgPSBbXS5jb25jYXQoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcykuY29uY2F0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgICBhZmZlY3RlZFZlcnRleEluZGljZXMgPSBhZmZlY3RlZFZlcnRpY2VzLm1hcChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCkge1xuICAgICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgICAgICAgICAgICByZXR1cm4gYWZmZWN0ZWRWZXJ0ZXhJbmRleDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICBhZmZlY3RlZFZlcnRleEluZGljZXMuc29ydCgpO1xuXG4gICAgICBhZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24oYWZmZWN0ZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleEluZGljZXNbaW5kZXhdO1xuXG4gICAgICAgIGFmZmVjdGVkVmVydGV4LnNldEluZGV4KGFmZmVjdGVkVmVydGV4SW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRpY2VzO1xuICB9XG5cbiAgbWFwVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgcmVzdWx0ID0gdmVydGV4TmFtZXMubWFwKGZ1bmN0aW9uKHZlcnRleE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZlcnRleCA9IHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdLFxuICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2sodmVydGV4KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmb3JFYWNoVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCk7XG5cbiAgICB2ZXJ0ZXhOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHZlcnRleE5hbWUpIHtcbiAgICAgIGNvbnN0IHZlcnRleCA9IHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdO1xuXG4gICAgICBjYWxsYmFjayh2ZXJ0ZXgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fSxcbiAgICAgICAgICBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKTtcblxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpO1xuICAgIFxuICAgIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG5cbiAgc3RhdGljIHNvcnRWZXJ0aWNlcyh2ZXJ0aWNlcykge1xuICAgIHZlcnRpY2VzLnNvcnQoZnVuY3Rpb24oZmlyc3RWZXJ0ZXgsIHNlY29uZFZlcnRleCkge1xuICAgICAgY29uc3QgZmlyc3RWZXJ0ZXhJbmRleCA9IGZpcnN0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICBzZWNvbmRWZXJ0ZXhJbmRleCA9IHNlY29uZFZlcnRleC5nZXRJbmRleCgpO1xuXG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlICBpZiAoZmlyc3RWZXJ0ZXhJbmRleCA8IHNlY29uZFZlcnRleEluZGV4KSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH0gZWxzZSAgaWYgKGZpcnN0VmVydGV4SW5kZXggPiBzZWNvbmRWZXJ0ZXhJbmRleCkge1xuICAgICAgICByZXR1cm4gKzE7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RlZEFjeWNsaWNHcmFwaDtcblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdmVydGV4TmFtZXMuZm9yRWFjaChmdW5jdGlvbih2ZXJ0ZXhOYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcbiAgXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCksXG4gICAgICAgICAgdmVydGV4TmFtZSA9IG5hbWU7ICAvLy9cblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCkge1xuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goZnVuY3Rpb24odG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgpIHtcbiAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5mb3JFYWNoT3V0Z29pbmdFZGdlKGZ1bmN0aW9uKG91dGdvaW5nRWRnZSkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXhOYW1lLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSwgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZV07IC8vL1xuXG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=