'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Edge = require('./edge'),
    Vertex = require('./vertex'),
    arrayUtil = require('./util/array');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJFZGdlIiwicmVxdWlyZSIsIlZlcnRleCIsImFycmF5VXRpbCIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiZWRnZSIsInNvdXJjZVZlcnRleE5hbWUiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwidGFyZ2V0VmVydGV4TmFtZSIsImdldFRhcmdldFZlcnRleE5hbWUiLCJlZGdlUHJlc2VudCIsImlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzIiwidmVydGV4TmFtZSIsInZlcnRleFByZXNlbnQiLCJoYXNPd25Qcm9wZXJ0eSIsInNvdXJjZVZlcnRleCIsInJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lIiwidGFyZ2V0VmVydGV4Iiwic291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCIsInRhcmdldFZlcnRleFNvdXJjZVZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic291cmNlVmVydGV4VGFyZ2V0VmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lIiwidmVydGV4IiwiY3ljbGljVmVydGV4TmFtZXMiLCJhZGRFZGdlQnlWZXJ0ZXhOYW1lcyIsInJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzIiwidmVydGV4TmFtZXNMZW5ndGgiLCJsZW5ndGgiLCJuYW1lIiwiaW5kZXgiLCJmcm9tTmFtZUFuZEluZGV4IiwicmVtb3ZlZEVkZ2VzIiwiZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImdldE5hbWUiLCJpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSIsInJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSIsInJlbW92ZWRFZGdlIiwicHVzaCIsInJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwicmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4IiwiY3ljbGljVmVydGljZXMiLCJjeWNsaWNWZXJ0ZXhOYW1lIiwiY3ljbGljVmVydGV4IiwiYWRkVmVydGV4QnlWZXJ0ZXhOYW1lIiwiaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4Iiwic291cmNlVmVydGV4SW5kZXgiLCJnZXRJbmRleCIsInRhcmdldFZlcnRleEluZGV4IiwiaW52YWxpZGF0aW5nRWRnZSIsInZhbGlkYXRlRWRnZUJ5VmVydGljZXMiLCJjeWNsZU1pc3NpbmciLCJpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJhZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJhZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsIm1hcCIsImZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImdldEZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4IiwibGFzdCIsImN5Y2xlUHJlc2VudCIsImJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMiLCJnZXRCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwic29ydFZlcnRpY2VzIiwiYWZmZWN0ZWRWZXJ0aWNlcyIsImNvbmNhdCIsImFmZmVjdGVkVmVydGV4SW5kaWNlcyIsImFmZmVjdGVkVmVydGV4IiwiYWZmZWN0ZWRWZXJ0ZXhJbmRleCIsInNvcnQiLCJmb3JFYWNoIiwic2V0SW5kZXgiLCJjYWxsYmFjayIsInJlc3VsdCIsImJpbmQiLCJkaXJlY3RlZEFjeWNsaWNHcmFwaCIsInZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJ2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsImFkZEVkZ2VzVG9WZXJ0aWNlcyIsInZlcnRpY2VzIiwiZmlyc3RWZXJ0ZXgiLCJzZWNvbmRWZXJ0ZXgiLCJmaXJzdFZlcnRleEluZGV4Iiwic2Vjb25kVmVydGV4SW5kZXgiLCJtb2R1bGUiLCJleHBvcnRzIiwidG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXgiLCJmb3JFYWNoT3V0Z29pbmdFZGdlIiwib3V0Z29pbmdFZGdlIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLE9BQU9DLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTUMsU0FBU0QsUUFBUSxVQUFSLENBRGY7QUFBQSxJQUVNRSxZQUFZRixRQUFRLGNBQVIsQ0FGbEI7O0lBSU1HLG9CO0FBQ0osZ0NBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFDckIsU0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7OztxQ0FFZ0I7QUFDZixVQUFNQyxjQUFjQyxPQUFPQyxJQUFQLENBQVksS0FBS0gsU0FBakIsQ0FBcEI7O0FBRUEsYUFBT0MsV0FBUDtBQUNEOzs7a0NBRWFHLEksRUFBTTtBQUNsQixVQUFNQyxtQkFBbUJELEtBQUtFLG1CQUFMLEVBQXpCO0FBQUEsVUFDTUMsbUJBQW1CSCxLQUFLSSxtQkFBTCxFQUR6QjtBQUFBLFVBRU1DLGNBQWMsS0FBS0MsMEJBQUwsQ0FBZ0NMLGdCQUFoQyxFQUFrREUsZ0JBQWxELENBRnBCOztBQUlBLGFBQU9FLFdBQVA7QUFDRDs7O2dEQUUyQkUsVSxFQUFZO0FBQ3RDLFVBQU1DLGdCQUFnQixLQUFLWixTQUFMLENBQWVhLGNBQWYsQ0FBOEJGLFVBQTlCLENBQXRCOztBQUVBLGFBQU9DLGFBQVA7QUFDRDs7OytDQUUwQlAsZ0IsRUFBa0JF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QXFDLFVBQVNpQiwwQkFBVCxFQUFxQztBQUN4RUEsK0JBQTJCQyxtQkFBM0IsQ0FBK0MsVUFBU0MsWUFBVCxFQUF1QjtBQUNwRSxVQUFNekYsbUJBQW1CeUYsYUFBYXhGLG1CQUFiLEVBQXpCO0FBQUEsVUFDTUMsbUJBQW1CdUYsYUFBYXRGLG1CQUFiLEVBRHpCO0FBQUEsVUFFTTRCLGlDQUFpQy9CLGdCQUZ2QztBQUFBLFVBRTBEO0FBQ3BEMEYscUNBQStCeEYsZ0JBSHJDO0FBQUEsVUFJTTRCLDZCQUE2Qm5DLFVBQVVvQyw4QkFBVixDQUpuQztBQUFBLFVBSThFO0FBQ3hFcUIsaUNBQTJCekQsVUFBVStGLDRCQUFWLENBTGpDLENBRG9FLENBTU07O0FBRTFFNUQsaUNBQTJCdUIsMkJBQTNCLENBQXVERCx3QkFBdkQ7O0FBRUFBLCtCQUF5QkUsNkJBQXpCLENBQXVEeEIsMEJBQXZEO0FBQ0QsS0FYRDtBQVlELEdBYkQ7QUFjRCIsImZpbGUiOiJkaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWRnZSA9IHJlcXVpcmUoJy4vZWRnZScpLFxuICAgICAgVmVydGV4ID0gcmVxdWlyZSgnLi92ZXJ0ZXgnKSxcbiAgICAgIGFycmF5VXRpbCA9IHJlcXVpcmUoJy4vdXRpbC9hcnJheScpO1xuXG5jbGFzcyBEaXJlY3RlZEFjeWNsaWNHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleE1hcCkge1xuICAgIHRoaXMudmVydGV4TWFwID0gdmVydGV4TWFwO1xuICB9XG5cbiAgZ2V0VmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gdmVydGV4TmFtZXM7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50KGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gdGhpcy5pc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgICBcbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cbiAgXG4gIGlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMudmVydGV4TWFwLmhhc093blByb3BlcnR5KHZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIHZlcnRleFByZXNlbnQ7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IGVkZ2VQcmVzZW50ID0gZmFsc2U7XG5cbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICBzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50ID0gKHNvdXJjZVZlcnRleCAhPT0gbnVsbCkgJiYgKHRhcmdldFZlcnRleCAhPT0gbnVsbCk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmVydGV4U291cmNlVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gc291cmNlVmVydGV4LmlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCksXG4gICAgICAgICAgc291cmNlVmVydGV4VGFyZ2V0VmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0YXJnZXRWZXJ0ZXguaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpO1xuXG4gICAgICBlZGdlUHJlc2VudCA9ICh0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggJiYgc291cmNlVmVydGV4VGFyZ2V0VmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH1cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIHJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4ID0gdmVydGV4UHJlc2VudCA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdIDpcbiAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIGFkZEVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgY3ljbGljVmVydGV4TmFtZXMgPSB0aGlzLmFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWVzO1xuICB9XG4gIFxuICByZW1vdmVFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpO1xuXG4gICAgdGhpcy5yZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgfVxuXG4gIGFkZFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKCF2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKSxcbiAgICAgICAgICAgIHZlcnRleE5hbWVzTGVuZ3RoID0gdmVydGV4TmFtZXMubGVuZ3RoLFxuICAgICAgICAgICAgbmFtZSA9IHZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGluZGV4ID0gdmVydGV4TmFtZXNMZW5ndGgsIC8vL1xuICAgICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICByZW1vdmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGxldCByZW1vdmVkRWRnZXMgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICByZW1vdmVkRWRnZXMgPSBbXTtcbiAgICAgIFxuICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCkge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy8gXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLCAgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy8gXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlZEVkZ2VzO1xuICB9XG5cbiAgYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBpZiAoc291cmNlVmVydGV4TmFtZSA9PT0gdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgICAgY29uc3QgY3ljbGljVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGN5Y2xpY1ZlcnRleCA9IHRoaXMudmVydGV4TWFwW2N5Y2xpY1ZlcnRleE5hbWVdO1xuXG4gICAgICBjeWNsaWNWZXJ0aWNlcyA9IFtjeWNsaWNWZXJ0ZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXguaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCk7XG5cbiAgICAgIGlmICghZWRnZVByZXNlbnQpIHtcbiAgICAgICAgY29uc3Qgc291cmNlVmVydGV4SW5kZXggPSBzb3VyY2VWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgdGFyZ2V0VmVydGV4SW5kZXggPSB0YXJnZXRWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgaW52YWxpZGF0aW5nRWRnZSA9IChzb3VyY2VWZXJ0ZXhJbmRleCA+IHRhcmdldFZlcnRleEluZGV4KTtcblxuICAgICAgICBpZiAoaW52YWxpZGF0aW5nRWRnZSkge1xuICAgICAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gdGhpcy52YWxpZGF0ZUVkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN5Y2xlTWlzc2luZyA9IChjeWNsaWNWZXJ0aWNlcyA9PT0gbnVsbCk7IC8vL1xuXG4gICAgICAgIGlmIChjeWNsZU1pc3NpbmcpIHtcbiAgICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleCwgLy8vXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4OyAvLy9cblxuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjeWNsaWNWZXJ0ZXhOYW1lcyA9IG51bGw7XG5cbiAgICBpZiAoY3ljbGljVmVydGljZXMgIT09IG51bGwpIHtcbiAgICAgIGN5Y2xpY1ZlcnRleE5hbWVzID0gY3ljbGljVmVydGljZXMubWFwKGZ1bmN0aW9uKGN5Y2xpY1ZlcnRleCkge1xuICAgICAgICBjb25zdCBjeWNsaWNWZXJ0ZXhOYW1lID0gY3ljbGljVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIHJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAoZWRnZVByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUVkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KSB7XG4gICAgbGV0IGN5Y2xpY1ZlcnRpY2VzID0gbnVsbDtcblxuICAgIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRhcmdldFZlcnRleC5nZXRGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMoc291cmNlVmVydGV4KSxcbiAgICAgICAgICBsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9IGFycmF5VXRpbC5sYXN0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgY3ljbGVQcmVzZW50ID0gKGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgIFxuICAgIGlmIChjeWNsZVByZXNlbnQpIHtcbiAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gc291cmNlVmVydGV4LmdldEJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKTtcblxuICAgICAgRGlyZWN0ZWRBY3ljbGljR3JhcGguc29ydFZlcnRpY2VzKGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgICBEaXJlY3RlZEFjeWNsaWNHcmFwaC5zb3J0VmVydGljZXMoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0aWNlcyA9IFtdLmNvbmNhdChiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKS5jb25jYXQoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcyA9IGFmZmVjdGVkVmVydGljZXMubWFwKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleC5nZXRJbmRleCgpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRleEluZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcy5zb3J0KCk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4SW5kaWNlc1tpbmRleF07XG5cbiAgICAgICAgYWZmZWN0ZWRWZXJ0ZXguc2V0SW5kZXgoYWZmZWN0ZWRWZXJ0ZXhJbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGljZXM7XG4gIH1cblxuICBtYXBWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKSxcbiAgICAgICAgICByZXN1bHQgPSB2ZXJ0ZXhOYW1lcy5tYXAoZnVuY3Rpb24odmVydGV4TmFtZSkge1xuICAgICAgICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0sXG4gICAgICAgICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayh2ZXJ0ZXgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZvckVhY2hWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKTtcblxuICAgIHZlcnRleE5hbWVzLmZvckVhY2goZnVuY3Rpb24odmVydGV4TmFtZSkge1xuICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG5cbiAgICAgIGNhbGxiYWNrKHZlcnRleCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHt9LFxuICAgICAgICAgIGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpO1xuXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyk7XG4gICAgXG4gICAgYWRkRWRnZXNUb1ZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMsIHZlcnRleE1hcCk7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcbiAgICBcbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cblxuICBzdGF0aWMgc29ydFZlcnRpY2VzKHZlcnRpY2VzKSB7XG4gICAgdmVydGljZXMuc29ydChmdW5jdGlvbihmaXJzdFZlcnRleCwgc2Vjb25kVmVydGV4KSB7XG4gICAgICBjb25zdCBmaXJzdFZlcnRleEluZGV4ID0gZmlyc3RWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgIHNlY29uZFZlcnRleEluZGV4ID0gc2Vjb25kVmVydGV4LmdldEluZGV4KCk7XG5cbiAgICAgIGlmIChmYWxzZSkge1xuXG4gICAgICB9IGVsc2UgIGlmIChmaXJzdFZlcnRleEluZGV4IDwgc2Vjb25kVmVydGV4SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfSBlbHNlICBpZiAoZmlyc3RWZXJ0ZXhJbmRleCA+IHNlY29uZFZlcnRleEluZGV4KSB7XG4gICAgICAgIHJldHVybiArMTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB2ZXJ0ZXhOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHZlcnRleE5hbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICB2ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH0pO1xuICBcbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCwgaW5kZXgpIHtcbiAgICBjb25zdCBuYW1lID0gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lID0gbmFtZTsgIC8vL1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcblxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKSB7XG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCkge1xuICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmZvckVhY2hPdXRnb2luZ0VkZ2UoZnVuY3Rpb24ob3V0Z29pbmdFZGdlKSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSA9IHRhcmdldFZlcnRleE5hbWUsXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVdLCAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lXTsgLy8vXG5cbiAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==