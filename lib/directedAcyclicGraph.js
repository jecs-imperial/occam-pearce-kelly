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
          topologicallyOrderedVertexNames = topologicallyOrderedVertices.map(function (topologicallyOrderedVertex) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiRWRnZSIsIlZlcnRleCIsImFycmF5IiwibGFzdCIsIkRpcmVjdGVkQWN5Y2xpY0dyYXBoIiwidmVydGV4TWFwIiwidmVydGV4TmFtZXMiLCJPYmplY3QiLCJrZXlzIiwidmVydGljZXMiLCJ2YWx1ZXMiLCJnZXRWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMiLCJ0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMiLCJtYXAiLCJ0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCIsInRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZSIsImdldE5hbWUiLCJlZGdlIiwic291cmNlVmVydGV4TmFtZSIsImdldFNvdXJjZVZlcnRleE5hbWUiLCJ0YXJnZXRWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsImVkZ2VQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMiLCJ2ZXJ0ZXhOYW1lIiwidmVydGV4UHJlc2VudCIsImhhc093blByb3BlcnR5Iiwic291cmNlVmVydGV4UHJlc2VudCIsImlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSIsInNvdXJjZVZlcnRleCIsInJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lIiwicmVtb3ZlT3V0Z29pbmdFZGdlcyIsInRhcmdldFZlcnRleFByZXNlbnQiLCJ0YXJnZXRWZXJ0ZXgiLCJyZW1vdmVJbmNvbWluZ0VkZ2VzIiwic291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCIsInRhcmdldFZlcnRleFNvdXJjZVZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4Iiwic291cmNlVmVydGV4VGFyZ2V0VmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJpc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwidmVydGV4IiwiY3ljbGljVmVydGV4TmFtZXMiLCJhZGRFZGdlQnlWZXJ0ZXhOYW1lcyIsInJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzIiwidmVydGV4TmFtZXNMZW5ndGgiLCJsZW5ndGgiLCJuYW1lIiwiaW5kZXgiLCJmcm9tTmFtZUFuZEluZGV4IiwicmVtb3ZlZEVkZ2VzIiwiZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgiLCJpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCIsImltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSIsImltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lIiwicmVtb3ZlZEVkZ2UiLCJwdXNoIiwicmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgiLCJyZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgiLCJjeWNsaWNWZXJ0aWNlcyIsImN5Y2xpY1ZlcnRleE5hbWUiLCJjeWNsaWNWZXJ0ZXgiLCJhZGRWZXJ0ZXhCeVZlcnRleE5hbWUiLCJpc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgiLCJzb3VyY2VWZXJ0ZXhJbmRleCIsImdldEluZGV4IiwidGFyZ2V0VmVydGV4SW5kZXgiLCJpbnZhbGlkYXRpbmdFZGdlIiwidmFsaWRhdGVFZGdlQnlWZXJ0aWNlcyIsImN5Y2xlTWlzc2luZyIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCIsImFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4IiwiZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiZ2V0Rm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwibGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXgiLCJjeWNsZVByZXNlbnQiLCJiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzIiwiZ2V0QmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyIsImFmZmVjdGVkVmVydGljZXMiLCJjb25jYXQiLCJhZmZlY3RlZFZlcnRleEluZGljZXMiLCJhZmZlY3RlZFZlcnRleCIsImFmZmVjdGVkVmVydGV4SW5kZXgiLCJzb3J0IiwiZm9yRWFjaCIsInNldEluZGV4IiwiZGlyZWN0ZWRBY3ljbGljR3JhcGgiLCJ2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXMiLCJ2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyIsImFkZEVkZ2VzVG9WZXJ0aWNlcyIsInNsaWNlIiwiZmlyc3RWZXJ0ZXgiLCJzZWNvbmRWZXJ0ZXgiLCJmaXJzdFZlcnRleEluZGV4Iiwic2Vjb25kVmVydGV4SW5kZXgiLCJtb2R1bGUiLCJleHBvcnRzIiwiZm9yRWFjaE91dGdvaW5nRWRnZSIsIm91dGdvaW5nRWRnZSIsImltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxZQUFZQyxRQUFRLFdBQVIsQ0FBbEI7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNNRSxTQUFTRixRQUFRLFVBQVIsQ0FEZjs7QUFHTSxJQUFFRyxLQUFGLEdBQVlKLFNBQVosQ0FBRUksS0FBRjtBQUFBLElBQ0VDLElBREYsR0FDVUQsS0FEVixDQUNFQyxJQURGOztJQUdBQyxvQjtBQUNKLGdDQUFZQyxTQUFaLEVBQXVCO0FBQUE7O0FBQ3JCLFNBQUtBLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0Q7Ozs7cUNBRWdCO0FBQ2YsVUFBTUMsY0FBY0MsT0FBT0MsSUFBUCxDQUFZLEtBQUtILFNBQWpCLENBQXBCOztBQUVBLGFBQU9DLFdBQVA7QUFDRDs7O2tDQUVhO0FBQ1osVUFBTUcsV0FBV0YsT0FBT0csTUFB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LHdCQUF2RDs7QUFFQUEsK0JBQXlCRSw2QkFBekIsQ0FBdUR2QiwwQkFBdkQ7QUFDRCxLQVhEO0FBWUQsR0FiRDtBQWNEIiwiZmlsZSI6ImRpcmVjdGVkQWN5Y2xpY0dyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgRWRnZSA9IHJlcXVpcmUoJy4vZWRnZScpLFxuICAgICAgVmVydGV4ID0gcmVxdWlyZSgnLi92ZXJ0ZXgnKTtcblxuY29uc3QgeyBhcnJheSB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBsYXN0fSA9IGFycmF5O1xuXG5jbGFzcyBEaXJlY3RlZEFjeWNsaWNHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleE1hcCkge1xuICAgIHRoaXMudmVydGV4TWFwID0gdmVydGV4TWFwO1xuICB9XG5cbiAgZ2V0VmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLnZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gdmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRWZXJ0aWNlcygpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IE9iamVjdC52YWx1ZXModGhpcy52ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIHZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKSxcbiAgICAgICAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzID0gRGlyZWN0ZWRBY3ljbGljR3JhcGgudG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXModmVydGljZXMpLFxuICAgICAgICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXMgPSB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLm1hcChmdW5jdGlvbih0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCkge1xuICAgICAgICAgICAgY29uc3QgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lID0gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lO1xuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXM7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50KGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gdGhpcy5pc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgICBcbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cbiAgXG4gIGlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMudmVydGV4TWFwLmhhc093blByb3BlcnR5KHZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIHZlcnRleFByZXNlbnQ7XG4gIH1cblxuICByZW1vdmVFZGdlc0J5U291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuICAgIFxuICAgIGlmIChzb3VyY2VWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlT3V0Z29pbmdFZGdlcygpOyAgICAgICAgIFxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlUYXJnZXRWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAodGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUluY29taW5nRWRnZXMoKTtcbiAgICB9XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IGVkZ2VQcmVzZW50ID0gZmFsc2U7XG5cbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCA9IChzb3VyY2VWZXJ0ZXggIT09IG51bGwpICYmICh0YXJnZXRWZXJ0ZXggIT09IG51bGwpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldFZlcnRleFNvdXJjZVZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleC5pc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpLFxuICAgICAgICAgICAgc291cmNlVmVydGV4VGFyZ2V0VmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0YXJnZXRWZXJ0ZXguaXNWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChzb3VyY2VWZXJ0ZXgpO1xuXG4gICAgICBlZGdlUHJlc2VudCA9ICh0YXJnZXRWZXJ0ZXhTb3VyY2VWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggJiYgc291cmNlVmVydGV4VGFyZ2V0VmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH1cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIHJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4ID0gdmVydGV4UHJlc2VudCA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdIDpcbiAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIGFkZEVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgY3ljbGljVmVydGV4TmFtZXMgPSB0aGlzLmFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIGN5Y2xpY1ZlcnRleE5hbWVzO1xuICB9XG4gIFxuICByZW1vdmVFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpO1xuXG4gICAgdGhpcy5yZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgfVxuXG4gIGFkZFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKCF2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKSxcbiAgICAgICAgICAgIHZlcnRleE5hbWVzTGVuZ3RoID0gdmVydGV4TmFtZXMubGVuZ3RoLFxuICAgICAgICAgICAgbmFtZSA9IHZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGluZGV4ID0gdmVydGV4TmFtZXNMZW5ndGgsIC8vL1xuICAgICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXTtcblxuICAgIHJldHVybiB2ZXJ0ZXg7XG4gIH1cblxuICByZW1vdmVWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGxldCByZW1vdmVkRWRnZXMgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICByZW1vdmVkRWRnZXMgPSBbXTtcbiAgICAgIFxuICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy5yZXRyaWV2ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoZnVuY3Rpb24oaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCkge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy8gXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGZ1bmN0aW9uKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLCAgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy8gXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlID0gbmV3IEVkZ2UocmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lLCByZW1vdmVkRWRnZVRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICAgIHJlbW92ZWRFZGdlcy5wdXNoKHJlbW92ZWRFZGdlKTtcblxuICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlZEVkZ2VzO1xuICB9XG5cbiAgYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBjeWNsaWNWZXJ0aWNlcyA9IG51bGw7XG5cbiAgICBpZiAoc291cmNlVmVydGV4TmFtZSA9PT0gdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgICAgY29uc3QgY3ljbGljVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGN5Y2xpY1ZlcnRleCA9IHRoaXMudmVydGV4TWFwW2N5Y2xpY1ZlcnRleE5hbWVdO1xuXG4gICAgICBjeWNsaWNWZXJ0aWNlcyA9IFtjeWNsaWNWZXJ0ZXhdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpLFxuICAgICAgICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXguaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCk7XG5cbiAgICAgIGlmICghZWRnZVByZXNlbnQpIHtcbiAgICAgICAgY29uc3Qgc291cmNlVmVydGV4SW5kZXggPSBzb3VyY2VWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgdGFyZ2V0VmVydGV4SW5kZXggPSB0YXJnZXRWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgaW52YWxpZGF0aW5nRWRnZSA9IChzb3VyY2VWZXJ0ZXhJbmRleCA+IHRhcmdldFZlcnRleEluZGV4KTtcblxuICAgICAgICBpZiAoaW52YWxpZGF0aW5nRWRnZSkge1xuICAgICAgICAgIGN5Y2xpY1ZlcnRpY2VzID0gdGhpcy52YWxpZGF0ZUVkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN5Y2xlTWlzc2luZyA9IChjeWNsaWNWZXJ0aWNlcyA9PT0gbnVsbCk7IC8vL1xuXG4gICAgICAgIGlmIChjeWNsZU1pc3NpbmcpIHtcbiAgICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHNvdXJjZVZlcnRleCwgLy8vXG4gICAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGFyZ2V0VmVydGV4OyAvLy9cblxuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjeWNsaWNWZXJ0ZXhOYW1lcyA9IG51bGw7XG5cbiAgICBpZiAoY3ljbGljVmVydGljZXMgIT09IG51bGwpIHtcbiAgICAgIGN5Y2xpY1ZlcnRleE5hbWVzID0gY3ljbGljVmVydGljZXMubWFwKGZ1bmN0aW9uKGN5Y2xpY1ZlcnRleCkge1xuICAgICAgICBjb25zdCBjeWNsaWNWZXJ0ZXhOYW1lID0gY3ljbGljVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICByZXR1cm4gY3ljbGljVmVydGV4TmFtZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjeWNsaWNWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIHJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAoZWRnZVByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMucmV0cmlldmVWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLnJldHJpZXZlVmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUVkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KSB7XG4gICAgbGV0IGN5Y2xpY1ZlcnRpY2VzID0gbnVsbDtcblxuICAgIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRhcmdldFZlcnRleC5nZXRGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMoc291cmNlVmVydGV4KSxcbiAgICAgICAgICBsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9IGxhc3QoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgICBjeWNsZVByZXNlbnQgPSAobGFzdEZvcndhcmRzQWZmZWN0ZWRWZXJ0ZXggPT09IHNvdXJjZVZlcnRleCk7XG4gICAgXG4gICAgaWYgKGN5Y2xlUHJlc2VudCkge1xuICAgICAgY3ljbGljVmVydGljZXMgPSBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMgPSBzb3VyY2VWZXJ0ZXguZ2V0QmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcygpO1xuXG4gICAgICBEaXJlY3RlZEFjeWNsaWNHcmFwaC50b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgICAgRGlyZWN0ZWRBY3ljbGljR3JhcGgudG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0aWNlcyA9IFtdLmNvbmNhdChiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKS5jb25jYXQoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKSxcbiAgICAgICAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcyA9IGFmZmVjdGVkVmVydGljZXMubWFwKGZ1bmN0aW9uKGFmZmVjdGVkVmVydGV4KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGFmZmVjdGVkVmVydGV4SW5kZXggPSBhZmZlY3RlZFZlcnRleC5nZXRJbmRleCgpO1xuXG4gICAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRleEluZGV4O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcy5zb3J0KCk7XG5cbiAgICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbihhZmZlY3RlZFZlcnRleCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4SW5kaWNlc1tpbmRleF07XG5cbiAgICAgICAgYWZmZWN0ZWRWZXJ0ZXguc2V0SW5kZXgoYWZmZWN0ZWRWZXJ0ZXhJbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3ljbGljVmVydGljZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5vdGhpbmcoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0ge30sXG4gICAgICAgICAgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21WZXJ0ZXhOYW1lcyh2ZXJ0ZXhOYW1lcyk7XG5cbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKTtcbiAgICBcbiAgICBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKTtcbiAgICBcbiAgICBjb25zdCBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuXG4gIHN0YXRpYyB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyh2ZXJ0aWNlcykgeyAgLy8vXG4gICAgdmVydGljZXMgPSB2ZXJ0aWNlcy5zbGljZSgpOyAgLy8vXG5cbiAgICB2ZXJ0aWNlcy5zb3J0KGZ1bmN0aW9uKGZpcnN0VmVydGV4LCBzZWNvbmRWZXJ0ZXgpIHtcbiAgICAgIGNvbnN0IGZpcnN0VmVydGV4SW5kZXggPSBmaXJzdFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgc2Vjb25kVmVydGV4SW5kZXggPSBzZWNvbmRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSAgaWYgKGZpcnN0VmVydGV4SW5kZXggPCBzZWNvbmRWZXJ0ZXhJbmRleCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9IGVsc2UgIGlmIChmaXJzdFZlcnRleEluZGV4ID4gc2Vjb25kVmVydGV4SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuICsxO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcyA9IHZlcnRpY2VzOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB2ZXJ0ZXhOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHZlcnRleE5hbWUsIGluZGV4KSB7XG4gICAgY29uc3QgbmFtZSA9IHZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICB2ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH0pO1xuICBcbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCwgaW5kZXgpIHtcbiAgICBjb25zdCBuYW1lID0gdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lID0gbmFtZTsgIC8vL1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcblxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiBhZGRFZGdlc1RvVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKSB7XG4gIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMuZm9yRWFjaChmdW5jdGlvbih0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCkge1xuICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmZvckVhY2hPdXRnb2luZ0VkZ2UoZnVuY3Rpb24ob3V0Z29pbmdFZGdlKSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZSA9IHRhcmdldFZlcnRleE5hbWUsXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVdLCAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHZlcnRleE1hcFtpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lXTsgLy8vXG5cbiAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuXG4gICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==