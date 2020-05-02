(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _necessary = require("necessary");

var _edge = _interopRequireDefault(require("./edge"));

var _vertex2 = _interopRequireDefault(require("./vertex"));

var _vertex3 = require("./utilities/vertex");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var last = _necessary.arrayUtilities.last;

var DirectedAcyclicGraph = /*#__PURE__*/function () {
  function DirectedAcyclicGraph(vertexMap) {
    _classCallCheck(this, DirectedAcyclicGraph);

    this.vertexMap = vertexMap;
  }

  _createClass(DirectedAcyclicGraph, [{
    key: "isEmpty",
    value: function isEmpty() {
      var vertices = this.getVertices(),
          verticesLength = vertices.length,
          empty = verticesLength === 0;
      return empty;
    }
  }, {
    key: "getVertices",
    value: function getVertices() {
      var vertexMapValues = Object.values(this.vertexMap),
          vertices = vertexMapValues; ///

      return vertices;
    }
  }, {
    key: "getVertexNames",
    value: function getVertexNames() {
      var vertexMapKeys = Object.keys(this.vertexMap),
          vertexNames = vertexMapKeys; ///

      return vertexNames;
    }
  }, {
    key: "getVertexByVertexName",
    value: function getVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresentByVertexName(vertexName),
          vertex = vertexPresent ? this.vertexMap[vertexName] : null;
      return vertex;
    }
  }, {
    key: "getPredecessorVertexNamesByVertexName",
    value: function getPredecessorVertexNamesByVertexName(vertexName) {
      var vertex = this.getVertexByVertexName(vertexName),
          predecessorVertexNames = vertex.getPredecessorVertexNames();
      return predecessorVertexNames;
    }
  }, {
    key: "getSuccessorVertexNamesByVertexName",
    value: function getSuccessorVertexNamesByVertexName(vertexName) {
      var vertex = this.getVertexByVertexName(vertexName),
          successorVertexNames = vertex.getSuccessorVertexNames();
      return successorVertexNames;
    }
  }, {
    key: "getEdgesByTargetVertexName",
    value: function getEdgesByTargetVertexName(targetVertexName) {
      var edges = [],
          targetVertex = this.getVertexByVertexName(targetVertexName);

      if (targetVertex !== null) {
        var immediatePredecessorVertexNames = targetVertex.getImmediatePredecessorVertexNames(),
            sourceVertexNames = immediatePredecessorVertexNames; ///

        sourceVertexNames.forEach(function (sourceVertexName) {
          var edge = _edge["default"].fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);

          edges.push(edge);
        });
      }

      return edges;
    }
  }, {
    key: "getEdgesBySourceVertexName",
    value: function getEdgesBySourceVertexName(sourceVertexName) {
      var edges = [],
          sourceVertex = this.getVertexByVertexName(sourceVertexName);

      if (sourceVertex !== null) {
        var immediateSuccessorVertexNames = sourceVertex.getImmediateSuccessorVertexNames(),
            targetVertexNames = immediateSuccessorVertexNames; ///

        targetVertexNames.forEach(function (targetVertexName) {
          var edge = _edge["default"].fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);

          edges.push(edge);
        });
      }

      return edges;
    }
  }, {
    key: "setVertexByVertexName",
    value: function setVertexByVertexName(vertexName, vertex) {
      this.vertexMap[vertexName] = vertex;
    }
  }, {
    key: "deleteVertexByVertexName",
    value: function deleteVertexByVertexName(vertexName) {
      delete this.vertexMap[vertexName];
    }
  }, {
    key: "isEdgePresent",
    value: function isEdgePresent(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);
      return edgePresent;
    }
  }, {
    key: "isEdgePresentByVertexNames",
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
    key: "isVertexPresentByVertexName",
    value: function isVertexPresentByVertexName(vertexName) {
      var vertexNames = this.getVertexNames(),
          vertexNamesIncludesVertexName = vertexNames.includes(vertexName),
          vertexPresent = vertexNamesIncludesVertexName; ///

      return vertexPresent;
    }
  }, {
    key: "getTopologicallyOrderedVertexNames",
    value: function getTopologicallyOrderedVertexNames() {
      var vertices = this.getVertices();
      (0, _vertex3.topologicallyOrderVertices)(vertices);
      var topologicallyOrderedVertices = vertices,
          ///
      topologicallyOrderedVertexNames = (0, _vertex3.vertexNamesFromVertices)(topologicallyOrderedVertices);
      return topologicallyOrderedVertexNames;
    }
  }, {
    key: "addEdge",
    value: function addEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          success = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);
      return success;
    }
  }, {
    key: "removeEdge",
    value: function removeEdge(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName();
      this.removeEdgeByVertexNames(sourceVertexName, targetVertexName);
    }
  }, {
    key: "addEdgeByVertexNames",
    value: function addEdgeByVertexNames(sourceVertexName, targetVertexName) {
      var success = false;

      if (sourceVertexName !== targetVertexName) {
        var sourceVertex = this.addVertexByVertexName(sourceVertexName),
            targetVertex = this.addVertexByVertexName(targetVertexName),
            edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);

        if (edgePresent) {
          success = true;
        } else {
          var sourceVertexIndex = sourceVertex.getIndex(),
              targetVertexIndex = targetVertex.getIndex(),
              invalidatingEdge = sourceVertexIndex > targetVertexIndex;
          success = invalidatingEdge ? addInvalidatingEdgeByVertices(sourceVertex, targetVertex) : true;

          if (success) {
            var immediatePredecessorVertex = sourceVertex,
                ///
            immediateSuccessorVertex = targetVertex; ///

            immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);
            immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
          }
        }
      }

      return success;
    }
  }, {
    key: "removeEdgeByVertexNames",
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
    key: "removeEdgesBySourceVertexName",
    value: function removeEdgesBySourceVertexName(sourceVertexName) {
      var sourceVertexPresent = this.isVertexPresentByVertexName(sourceVertexName);

      if (sourceVertexPresent) {
        var sourceVertex = this.getVertexByVertexName(sourceVertexName);
        sourceVertex.removeOutgoingEdges();
      }
    }
  }, {
    key: "removeEdgesByTargetVertexName",
    value: function removeEdgesByTargetVertexName(targetVertexName) {
      var targetVertexPresent = this.isVertexPresentByVertexName(targetVertexName);

      if (targetVertexPresent) {
        var targetVertex = this.getVertexByVertexName(targetVertexName);
        targetVertex.removeIncomingEdges();
      }
    }
  }, {
    key: "addVertexByVertexName",
    value: function addVertexByVertexName(vertexName) {
      var vertexPresent = this.isVertexPresentByVertexName(vertexName);

      if (!vertexPresent) {
        var vertexNames = this.getVertexNames(),
            vertexNamesLength = vertexNames.length,
            name = vertexName,
            ///
        index = vertexNamesLength,
            ///
        _vertex = _vertex2["default"].fromNameAndIndex(name, index);

        this.setVertexByVertexName(vertexName, _vertex);
      }

      var vertex = this.getVertexByVertexName(vertexName);
      return vertex;
    }
  }, {
    key: "removeVertexByVertexName",
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
          removedEdge = new _edge["default"](removedEdgeSourceVertexName, removedEdgeTargetVertexName);
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
          removedEdge = new _edge["default"](removedEdgeSourceVertexName, removedEdgeTargetVertexName);
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
          return affectedVertex.decrementIndex();
        });
      }

      return removedEdges;
    }
  }], [{
    key: "fromNothing",
    value: function fromNothing() {
      var vertexMap = {},
          directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);
      return directedAcyclicGraph;
    }
  }, {
    key: "fromVertexNames",
    value: function fromVertexNames(vertexNames) {
      var vertexMap = vertexMapFromVertexNames(vertexNames);
      var directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);
      return directedAcyclicGraph;
    }
  }, {
    key: "fromTopologicallyOrderedVertices",
    value: function fromTopologicallyOrderedVertices(topologicallyOrderedVertices) {
      var vertexMap = vertexMapFromTopologicallyOrderedVertices(topologicallyOrderedVertices);
      addEdgesToVertices(topologicallyOrderedVertices, vertexMap);
      var directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);
      return directedAcyclicGraph;
    }
  }]);

  return DirectedAcyclicGraph;
}();

exports["default"] = DirectedAcyclicGraph;

function addInvalidatingEdgeByVertices(sourceVertex, targetVertex) {
  var success = false;
  var forwardsAffectedVertices = targetVertex.retrieveForwardsAffectedVertices(sourceVertex),
      lastForwardsAffectedVertex = last(forwardsAffectedVertices),
      resultsInCycle = lastForwardsAffectedVertex === sourceVertex;

  if (!resultsInCycle) {
    var backwardsAffectedVertices = sourceVertex.retrieveBackwardsAffectedVertices();
    (0, _vertex3.topologicallyOrderVertices)(backwardsAffectedVertices);
    (0, _vertex3.topologicallyOrderVertices)(forwardsAffectedVertices);
    var affectedVertices = [].concat(backwardsAffectedVertices).concat(forwardsAffectedVertices),
        affectedVertexIndices = affectedVertices.map(function (affectedVertex) {
      var affectedVertexIndex = affectedVertex.getIndex();
      return affectedVertexIndex;
    });
    affectedVertexIndices.sort(function (indexA, indexB) {
      return indexA - indexB;
    });
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
    vertex = _vertex2["default"].fromNameAndIndex(name, index);

    vertexMap[vertexName] = vertex;
  });
  return vertexMap;
}

function vertexMapFromTopologicallyOrderedVertices(topologicallyOrderedVertices) {
  var vertexMap = {};
  topologicallyOrderedVertices.forEach(function (topologicallyOrderedVertex, index) {
    var name = topologicallyOrderedVertex.getName(),
        vertex = _vertex2["default"].fromNameAndIndex(name, index),
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

},{"./edge":2,"./utilities/vertex":5,"./vertex":6,"necessary":9}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Edge = /*#__PURE__*/function () {
  function Edge(sourceVertexName, targetVertexName) {
    _classCallCheck(this, Edge);

    this.sourceVertexName = sourceVertexName;
    this.targetVertexName = targetVertexName;
  }

  _createClass(Edge, [{
    key: "getSourceVertexName",
    value: function getSourceVertexName() {
      return this.sourceVertexName;
    }
  }, {
    key: "getTargetVertexName",
    value: function getTargetVertexName() {
      return this.targetVertexName;
    }
  }, {
    key: "match",
    value: function match(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          matches = this.sourceVertexName === sourceVertexName && this.targetVertexName === targetVertexName;
      return matches;
    }
  }, {
    key: "matchVertexName",
    value: function matchVertexName(vertexName) {
      var matches = this.sourceVertexName === vertexName || this.targetVertexName === vertexName;
      return matches;
    }
  }, {
    key: "matchSourceVertexName",
    value: function matchSourceVertexName(sourceVertexName) {
      var matches = this.sourceVertexName === sourceVertexName;
      return matches;
    }
  }, {
    key: "matchTargetVertexName",
    value: function matchTargetVertexName(targetVertexName) {
      var matches = this.targetVertexName === targetVertexName;
      return matches;
    }
  }, {
    key: "matchVertexNames",
    value: function matchVertexNames(sourceVertexName, targetVertexName) {
      var matches = this.sourceVertexName === sourceVertexName && this.targetVertexName === targetVertexName;
      return matches;
    }
  }], [{
    key: "fromSourceVertexNameAndTargetVertexName",
    value: function fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName) {
      var edge = new Edge(sourceVertexName, targetVertexName);
      return edge;
    }
  }]);

  return Edge;
}();

exports["default"] = Edge;

},{}],3:[function(require,module,exports){
"use strict";

var _index = require("./index");

var directedAcyclicGraph = _index.DirectedAcyclicGraph.fromNothing(),
    vertexName = "i",
    sourceVertexName = "j",
    targetVertexName = "k";

directedAcyclicGraph.addVertexByVertexName(vertexName);
directedAcyclicGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
var topologicallyOrderedVertexNames = directedAcyclicGraph.getTopologicallyOrderedVertexNames();
debugger;

},{"./index":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Edge", {
  enumerable: true,
  get: function get() {
    return _edge["default"];
  }
});
Object.defineProperty(exports, "DirectedAcyclicGraph", {
  enumerable: true,
  get: function get() {
    return _directedAcyclicGraph["default"];
  }
});

var _edge = _interopRequireDefault(require("./edge"));

var _directedAcyclicGraph = _interopRequireDefault(require("./directedAcyclicGraph"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./directedAcyclicGraph":1,"./edge":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vertexNamesFromVertices = vertexNamesFromVertices;
exports.topologicallyOrderVertices = topologicallyOrderVertices;

function vertexNamesFromVertices(vertices) {
  var vertexNames = vertices.map(function (vertex) {
    var vertexName = vertex.getName();
    return vertexName;
  });
  return vertexNames;
}

function topologicallyOrderVertices(vertices) {
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
  var topologicallyOrderedVertices = vertices; ///

  return topologicallyOrderedVertices;
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vertex = require("./utilities/vertex");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vertex = /*#__PURE__*/function () {
  function Vertex(name, index, visited, immediatePredecessorVertices, immediateSuccessorVertices) {
    _classCallCheck(this, Vertex);

    this.name = name;
    this.index = index;
    this.visited = visited;
    this.immediatePredecessorVertices = immediatePredecessorVertices;
    this.immediateSuccessorVertices = immediateSuccessorVertices;
  }

  _createClass(Vertex, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index;
    }
  }, {
    key: "isVisited",
    value: function isVisited() {
      return this.visited;
    }
  }, {
    key: "isStranded",
    value: function isStranded() {
      var immediatePredecessorVerticesLength = this.immediatePredecessorVertices.length,
          immediateSuccessorVerticesLength = this.immediateSuccessorVertices.length,
          stranded = immediatePredecessorVerticesLength === 0 && immediateSuccessorVerticesLength === 0;
      return stranded;
    }
  }, {
    key: "getImmediatePredecessorVertexNames",
    value: function getImmediatePredecessorVertexNames() {
      var immediatePredecessorVertexNames = this.immediatePredecessorVertices.map(function (immediatePredecessorVertex) {
        var immediatePredecessorVertexName = immediatePredecessorVertex.getName();
        return immediatePredecessorVertexName;
      });
      return immediatePredecessorVertexNames;
    }
  }, {
    key: "getImmediateSuccessorVertexNames",
    value: function getImmediateSuccessorVertexNames() {
      var immediateSuccessorVertexNames = this.immediateSuccessorVertices.map(function (immediateSuccessorVertex) {
        var immediateSuccessorVertexName = immediateSuccessorVertex.getName();
        return immediateSuccessorVertexName;
      });
      return immediateSuccessorVertexNames;
    }
  }, {
    key: "getImmediatePredecessorVertices",
    value: function getImmediatePredecessorVertices() {
      return this.immediatePredecessorVertices;
    }
  }, {
    key: "getImmediateSuccessorVertices",
    value: function getImmediateSuccessorVertices() {
      return this.immediateSuccessorVertices;
    }
  }, {
    key: "getPredecessorVertexMap",
    value: function getPredecessorVertexMap() {
      var predecessorVertexMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.forEachImmediatePredecessorVertex(function (immediatePredecessorVertex) {
        var predecessorVertex = immediatePredecessorVertex,
            ///
        predecessorVertexName = predecessorVertex.getName();
        predecessorVertexMap[predecessorVertexName] = predecessorVertex;
        predecessorVertex.getPredecessorVertexMap(predecessorVertexMap);
      });
      return predecessorVertexMap;
    }
  }, {
    key: "getSuccessorVertexMap",
    value: function getSuccessorVertexMap() {
      var successorVertexMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.forEachImmediateSuccessorVertex(function (immediateSuccessorVertex) {
        var successorVertex = immediateSuccessorVertex,
            ///
        successorVertexName = successorVertex.getName();
        successorVertexMap[successorVertexName] = successorVertex;
        successorVertex.getSuccessorVertexMap(successorVertexMap);
      });
      return successorVertexMap;
    }
  }, {
    key: "getPredecessorVertexNames",
    value: function getPredecessorVertexNames() {
      var predecessorVertices = this.getPredecessorVertices(),
          predecessorVertexNames = predecessorVertices.map(function (predecessorVertex) {
        var predecessorVertexName = predecessorVertex.getName();
        return predecessorVertexName;
      });
      return predecessorVertexNames;
    }
  }, {
    key: "getSuccessorVertexNames",
    value: function getSuccessorVertexNames() {
      var successorVertices = this.getSuccessorVertices(),
          successorVertexNames = successorVertices.map(function (successorVertex) {
        var successorVertexName = successorVertex.getName();
        return successorVertexName;
      });
      return successorVertexNames;
    }
  }, {
    key: "getPredecessorVertices",
    value: function getPredecessorVertices() {
      var predecessorVertexMap = this.getPredecessorVertexMap(),
          predecessorVertexNames = Object.keys(predecessorVertexMap),
          predecessorVertices = predecessorVertexNames.map(function (predecessorVertexName) {
        var predecessorVertex = predecessorVertexMap[predecessorVertexName];
        return predecessorVertex;
      });
      return predecessorVertices;
    }
  }, {
    key: "getSuccessorVertices",
    value: function getSuccessorVertices() {
      var successorVertexMap = this.getSuccessorVertexMap(),
          successorVertexNames = Object.keys(successorVertexMap),
          successorVertices = successorVertexNames.map(function (successorVertexName) {
        var successorVertex = successorVertexMap[successorVertexName];
        return successorVertex;
      });
      return successorVertices;
    }
  }, {
    key: "getTopologicallyOrderedPredecessorVertexNames",
    value: function getTopologicallyOrderedPredecessorVertexNames() {
      var predecessorVertices = this.getPredecessorVertices();
      (0, _vertex.topologicallyOrderVertices)(predecessorVertices);
      var topologicallyOrderedPredecessorVertices = predecessorVertices,
          ///
      topologicallyOrderedPredecessorVertexNames = (0, _vertex.vertexNamesFromVertices)(topologicallyOrderedPredecessorVertices);
      return topologicallyOrderedPredecessorVertexNames;
    }
  }, {
    key: "retrieveForwardsAffectedVertices",
    value: function retrieveForwardsAffectedVertices(sourceVertex) {
      var forwardsAffectedVertices = this.forwardsDepthFirstSearch(function (visitedVertex) {
        var terminate = visitedVertex === sourceVertex;

        if (terminate) {
          return true;
        }
      });
      return forwardsAffectedVertices;
    }
  }, {
    key: "retrieveBackwardsAffectedVertices",
    value: function retrieveBackwardsAffectedVertices() {
      var backwardsAffectedVertices = this.backwardsDepthFirstSearch(function (visitedVertex) {
        var terminate = false;

        if (terminate) {
          return true;
        }
      });
      return backwardsAffectedVertices;
    }
  }, {
    key: "isVertexImmediatePredecessorVertex",
    value: function isVertexImmediatePredecessorVertex(vertex) {
      var vertexImmediatePredecessorVertex = this.immediatePredecessorVertices.includes(vertex);
      return vertexImmediatePredecessorVertex;
    }
  }, {
    key: "isVertexImmediateSuccessorVertex",
    value: function isVertexImmediateSuccessorVertex(vertex) {
      var vertexImmediateSuccessorVertex = this.immediateSuccessorVertices.includes(vertex);
      return vertexImmediateSuccessorVertex;
    }
  }, {
    key: "isEdgePresentBySourceVertex",
    value: function isEdgePresentBySourceVertex(sourceVertex) {
      var sourceVertexImmediatePredecessorVertex = this.isVertexImmediatePredecessorVertex(sourceVertex),
          edgePresent = sourceVertexImmediatePredecessorVertex; ///

      return edgePresent;
    }
  }, {
    key: "isEdgePresentByTargetVertex",
    value: function isEdgePresentByTargetVertex(targetVertex) {
      var targetVertexImmediateSuccessorVertex = this.isVertexImmediateSuccessorVertex(targetVertex),
          edgePresent = targetVertexImmediateSuccessorVertex; ///

      return edgePresent;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: "setIndex",
    value: function setIndex(index) {
      this.index = index;
    }
  }, {
    key: "setVisited",
    value: function setVisited(visited) {
      this.visited = visited;
    }
  }, {
    key: "decrementIndex",
    value: function decrementIndex() {
      this.index--;
    }
  }, {
    key: "removeImmediatePredecessorVertex",
    value: function removeImmediatePredecessorVertex(immediatePredecessorVertex) {
      var index = this.immediatePredecessorVertices.indexOf(immediatePredecessorVertex),
          start = index,
          ///
      deleteCount = 1;
      this.immediatePredecessorVertices.splice(start, deleteCount);
    }
  }, {
    key: "removeImmediateSuccessorVertex",
    value: function removeImmediateSuccessorVertex(immediateSuccessorVertex) {
      var index = this.immediateSuccessorVertices.indexOf(immediateSuccessorVertex),
          start = index,
          ///
      deleteCount = 1;
      this.immediateSuccessorVertices.splice(start, deleteCount);
    }
  }, {
    key: "removeIncomingEdges",
    value: function removeIncomingEdges() {
      var immediateSuccessorVertex = this; ///

      this.immediatePredecessorVertices.forEach(function (immediatePredecessorVertex) {
        return immediatePredecessorVertex.removeImmediateSuccessorVertex(immediateSuccessorVertex);
      });
      this.immediatePredecessorVertices = [];
    }
  }, {
    key: "removeOutgoingEdges",
    value: function removeOutgoingEdges() {
      var immediatePredecessorVertex = this; ///

      this.immediateSuccessorVertices.forEach(function (immediateSuccessorVertex) {
        return immediateSuccessorVertex.removeImmediateSuccessorVertex(immediatePredecessorVertex);
      });
      this.immediateSuccessorVertices = [];
    }
  }, {
    key: "addImmediatePredecessorVertex",
    value: function addImmediatePredecessorVertex(immediatePredecessorVertex) {
      this.immediatePredecessorVertices.push(immediatePredecessorVertex);
    }
  }, {
    key: "addImmediateSuccessorVertex",
    value: function addImmediateSuccessorVertex(immediateSuccessorVertex) {
      this.immediateSuccessorVertices.push(immediateSuccessorVertex);
    }
  }, {
    key: "forwardsDepthFirstSearch",
    value: function forwardsDepthFirstSearch(callback) {
      var visitedVertices = [];
      this.retrieveForwardsVisitedVertices(function (visitedVertex) {
        var terminate = callback(visitedVertex); ///

        visitedVertices.push(visitedVertex);
        return terminate;
      });
      visitedVertices.forEach(function (visitedVertex) {
        return visitedVertex.resetVisited();
      });
      return visitedVertices;
    }
  }, {
    key: "backwardsDepthFirstSearch",
    value: function backwardsDepthFirstSearch(callback) {
      var visitedVertices = [];
      this.retrieveBackwardsVisitedVertices(function (visitedVertex) {
        var terminate = callback(visitedVertex); ///

        visitedVertices.push(visitedVertex);
        return terminate;
      });
      visitedVertices.forEach(function (visitedVertex) {
        return visitedVertex.resetVisited();
      });
      return visitedVertices;
    }
  }, {
    key: "retrieveForwardsVisitedVertices",
    value: function retrieveForwardsVisitedVertices(callback) {
      var terminate = false;

      if (this.visited === false) {
        this.visited = true;
        var visitedVertex = this; ///

        terminate = callback(visitedVertex);

        if (terminate !== true) {
          visitedVertex.someImmediateSuccessorVertex(function (immediateSuccessorVertex) {
            terminate = immediateSuccessorVertex.retrieveForwardsVisitedVertices(callback);

            if (terminate) {
              return true;
            }
          });
        }
      }

      return terminate;
    }
  }, {
    key: "retrieveBackwardsVisitedVertices",
    value: function retrieveBackwardsVisitedVertices(callback) {
      var terminate = false;

      if (this.visited === false) {
        this.visited = true;
        var visitedVertex = this; ///

        terminate = callback(visitedVertex);

        if (terminate !== true) {
          visitedVertex.someImmediatePredecessorVertex(function (immediatePredecessorVertex) {
            terminate = immediatePredecessorVertex.retrieveBackwardsVisitedVertices(callback);

            if (terminate) {
              return true;
            }
          });
        }
      }

      return terminate;
    }
  }, {
    key: "forEachImmediatePredecessorVertex",
    value: function forEachImmediatePredecessorVertex(callback) {
      this.immediatePredecessorVertices.forEach(callback);
    }
  }, {
    key: "forEachImmediateSuccessorVertex",
    value: function forEachImmediateSuccessorVertex(callback) {
      this.immediateSuccessorVertices.forEach(callback);
    }
  }, {
    key: "someImmediatePredecessorVertex",
    value: function someImmediatePredecessorVertex(callback) {
      this.immediatePredecessorVertices.some(callback);
    }
  }, {
    key: "someImmediateSuccessorVertex",
    value: function someImmediateSuccessorVertex(callback) {
      this.immediateSuccessorVertices.some(callback);
    }
  }, {
    key: "resetVisited",
    value: function resetVisited() {
      this.visited = false;
    }
  }], [{
    key: "fromNameAndIndex",
    value: function fromNameAndIndex(name, index) {
      var visited = false,
          ///
      immediatePredecessorVertices = [],
          immediateSuccessorVertices = [],
          dependencyVertex = new Vertex(name, index, visited, immediatePredecessorVertices, immediateSuccessorVertices);
      return dependencyVertex;
    }
  }]);

  return Vertex;
}();

exports["default"] = Vertex;

},{"./utilities/vertex":5}],7:[function(require,module,exports){

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_RC_BASE_EXTENSION = exports.CARRIAGE_RETURN_CHARACTER = exports.LINE_FEED_CHARACTER = exports.BACKSPACE_CHARACTER = exports.ETX_CHARACTER = exports.CTRL_C = exports.UTF8_ENCODING = exports.DATA_EVENT = exports.APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE = exports.POST_METHOD = exports.GET_METHOD = exports.DEFAULT_LOG_FILE_BASE_NAME = exports.DEFAULT_LOG_DIRECTORY_PATH = exports.DEFAULT_LOG_LEVEL = exports.FATAL = exports.ERROR = exports.WARNING = exports.INFO = exports.DEBUG = exports.TRACE = void 0;
var TRACE = "TRACE";
exports.TRACE = TRACE;
var DEBUG = "DEBUG";
exports.DEBUG = DEBUG;
var INFO = "INFO";
exports.INFO = INFO;
var WARNING = "WARNING";
exports.WARNING = WARNING;
var ERROR = "ERROR";
exports.ERROR = ERROR;
var FATAL = "FATAL";
exports.FATAL = FATAL;
var DEFAULT_LOG_LEVEL = WARNING;
exports.DEFAULT_LOG_LEVEL = DEFAULT_LOG_LEVEL;
var DEFAULT_LOG_DIRECTORY_PATH = null;
exports.DEFAULT_LOG_DIRECTORY_PATH = DEFAULT_LOG_DIRECTORY_PATH;
var DEFAULT_LOG_FILE_BASE_NAME = "default";
exports.DEFAULT_LOG_FILE_BASE_NAME = DEFAULT_LOG_FILE_BASE_NAME;
var GET_METHOD = "GET";
exports.GET_METHOD = GET_METHOD;
var POST_METHOD = "POST";
exports.POST_METHOD = POST_METHOD;
var APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE = "application/json;charset=UTF-8";
exports.APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE = APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE;
var DATA_EVENT = "data";
exports.DATA_EVENT = DATA_EVENT;
var UTF8_ENCODING = "utf8";
exports.UTF8_ENCODING = UTF8_ENCODING;
var CTRL_C = "^C";
exports.CTRL_C = CTRL_C;
var ETX_CHARACTER = "\x03";
exports.ETX_CHARACTER = ETX_CHARACTER;
var BACKSPACE_CHARACTER = String.fromCharCode(127);
exports.BACKSPACE_CHARACTER = BACKSPACE_CHARACTER;
var LINE_FEED_CHARACTER = "\n";
exports.LINE_FEED_CHARACTER = LINE_FEED_CHARACTER;
var CARRIAGE_RETURN_CHARACTER = "\r";
exports.CARRIAGE_RETURN_CHARACTER = CARRIAGE_RETURN_CHARACTER;
var DEFAULT_RC_BASE_EXTENSION = "";
exports.DEFAULT_RC_BASE_EXTENSION = DEFAULT_RC_BASE_EXTENSION;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "pathUtilities", {
  enumerable: true,
  get: function get() {
    return _path["default"];
  }
});
Object.defineProperty(exports, "arrayUtilities", {
  enumerable: true,
  get: function get() {
    return _array["default"];
  }
});
Object.defineProperty(exports, "templateUtilities", {
  enumerable: true,
  get: function get() {
    return _template["default"];
  }
});
Object.defineProperty(exports, "fileSystemUtilities", {
  enumerable: true,
  get: function get() {
    return _fileSystem["default"];
  }
});
Object.defineProperty(exports, "asynchronousUtilities", {
  enumerable: true,
  get: function get() {
    return _asynchronous["default"];
  }
});
Object.defineProperty(exports, "miscellaneousUtilities", {
  enumerable: true,
  get: function get() {
    return _miscellaneous["default"];
  }
});

var _path = _interopRequireDefault(require("./utilities/path"));

var _array = _interopRequireDefault(require("./utilities/array"));

var _template = _interopRequireDefault(require("./utilities/template"));

var _fileSystem = _interopRequireDefault(require("./utilities/fileSystem"));

var _asynchronous = _interopRequireDefault(require("./utilities/asynchronous"));

var _miscellaneous = _interopRequireDefault(require("./utilities/miscellaneous"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./utilities/array":10,"./utilities/asynchronous":11,"./utilities/fileSystem":12,"./utilities/miscellaneous":13,"./utilities/path":19,"./utilities/template":20}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.first = first;
exports.second = second;
exports.third = third;
exports.fourth = fourth;
exports.fifth = fifth;
exports.fifthLast = fifthLast;
exports.fourthLast = fourthLast;
exports.thirdLast = thirdLast;
exports.secondLast = secondLast;
exports.last = last;
exports.tail = tail;
exports.push = push;
exports.unshift = unshift;
exports.concat = concat;
exports.clear = clear;
exports.copy = copy;
exports.merge = merge;
exports.splice = splice;
exports.replace = replace;
exports.filter = filter;
exports.find = find;
exports.prune = prune;
exports.patch = patch;
exports.augment = augment;
exports.separate = separate;
exports.forwardsSome = forwardsSome;
exports.backwardsSome = backwardsSome;
exports.forwardsEvery = forwardsEvery;
exports.backwardsEvery = backwardsEvery;
exports.forwardsReduce = forwardsReduce;
exports.backwardsReduce = backwardsReduce;
exports.forwardsForEach = forwardsForEach;
exports.backwardsForEach = backwardsForEach;
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function first(array) {
  return array[0];
}

function second(array) {
  return array[1];
}

function third(array) {
  return array[2];
}

function fourth(array) {
  return array[3];
}

function fifth(array) {
  return array[4];
}

function fifthLast(array) {
  return array[array.length - 5];
}

function fourthLast(array) {
  return array[array.length - 4];
}

function thirdLast(array) {
  return array[array.length - 3];
}

function secondLast(array) {
  return array[array.length - 2];
}

function last(array) {
  return array[array.length - 1];
}

function tail(array) {
  return array.slice(1);
}

function push(array1, array2) {
  Array.prototype.push.apply(array1, array2);
}

function unshift(array1, array2) {
  Array.prototype.unshift.apply(array1, array2);
}

function concat(array1, elementOrArray2) {
  var array2 = elementOrArray2 instanceof Array ? elementOrArray2 : [elementOrArray2];
  push(array1, array2);
}

function clear(array) {
  var start = 0;
  return array.splice(start);
}

function copy(array1, array2) {
  var start = 0,
      deleteCount = array2.length; ///

  splice(array1, start, deleteCount, array2);
}

function merge(array1, array2) {
  Array.prototype.push.apply(array1, array2);
}

function splice(array1, start) {
  var deleteCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
  var array2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var args = [start, deleteCount].concat(_toConsumableArray(array2)),
      deletedItemsArray = Array.prototype.splice.apply(array1, args);
  return deletedItemsArray;
}

function replace(array, element, test) {
  var start = -1;
  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      start = index; ///

      return true;
    }
  });

  if (found) {
    var deleteCount = 1;
    array.splice(start, deleteCount, element);
  }

  return found;
}

function filter(array, test) {
  var filteredElements = [];
  backwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (!passed) {
      var start = index,
          ///
      deleteCount = 1,
          deletedElements = array.splice(start, deleteCount),
          firstDeletedElement = first(deletedElements);
      filteredElements.unshift(firstDeletedElement); ///
    }
  });
  return filteredElements;
}

function find(array, test) {
  var elements = [];
  forwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (passed) {
      elements.push(element);
    }
  });
  return elements;
}

function prune(array, test) {
  var prunedElement = undefined;
  array.some(function (element, index) {
    var passed = test(element, index);

    if (!passed) {
      var start = index,
          ///
      deleteCount = 1,
          deletedElements = array.splice(start, deleteCount),
          firstDeletedElement = first(deletedElements);
      prunedElement = firstDeletedElement; ///

      return true;
    }
  });
  return prunedElement;
}

function patch(array, element, test) {
  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      return true;
    }
  });

  if (found) {
    array.push(element);
  }

  return found;
}

function augment(array1, array2, test) {
  array2.forEach(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      array1.push(element);
    }
  });
}

function separate(array, array1, array2, test) {
  array.forEach(function (element, index) {
    var passed = test(element, index);
    passed ? array1.push(element) : array2.push(element);
  });
}

function forwardsSome(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index],
        result = callback(element, index);

    if (result) {
      return true;
    }
  }

  return false;
}

function backwardsSome(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index],
        result = callback(element, index);

    if (result) {
      return true;
    }
  }

  return false;
}

function forwardsEvery(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index],
        result = callback(element, index);

    if (!result) {
      return false;
    }
  }

  return true;
}

function backwardsEvery(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index],
        result = callback(element, index);

    if (!result) {
      return false;
    }
  }

  return true;
}

function forwardsReduce(array, callback, initialValue) {
  var value = initialValue;
  forwardsForEach(array, function (element, index) {
    value = callback(value, element, index);
  });
  return value;
}

function backwardsReduce(array, callback, initialValue) {
  var value = initialValue;
  backwardsForEach(array, function (element, index) {
    value = callback(value, element, index);
  });
  return value;
}

function forwardsForEach(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index];
    callback(element, index);
  }
}

function backwardsForEach(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index];
    callback(element, index);
  }
}

var _default = {
  first: first,
  second: second,
  third: third,
  fourth: fourth,
  fifth: fifth,
  fifthLast: fifthLast,
  fourthLast: fourthLast,
  thirdLast: thirdLast,
  secondLast: secondLast,
  last: last,
  tail: tail,
  push: push,
  unshift: unshift,
  concat: concat,
  clear: clear,
  copy: copy,
  merge: merge,
  splice: splice,
  replace: replace,
  filter: filter,
  find: find,
  prune: prune,
  patch: patch,
  augment: augment,
  separate: separate,
  forwardsSome: forwardsSome,
  backwardsSome: backwardsSome,
  forwardsEvery: forwardsEvery,
  backwardsEvery: backwardsEvery,
  forwardsReduce: forwardsReduce,
  backwardsReduce: backwardsReduce,
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};
exports["default"] = _default;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whilst = whilst;
exports.forEach = forEach;
exports.sequence = sequence;
exports.eventually = eventually;
exports.repeatedly = repeatedly;
exports.forwardsForEach = forwardsForEach;
exports.backwardsForEach = backwardsForEach;
exports["default"] = void 0;

function whilst(callback, done, context) {
  var count = -1;

  function next() {
    count++;
    var index = count,
        ///
    terminate = callback(next, done, context, index);

    if (terminate) {
      done();
    }
  }

  next();
}

function forEach(array, callback, done, context) {
  var length = array.length; ///

  var count = -1;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];
      callback(element, next, done, context, index);
    }
  }

  next();
}

function sequence(callbacks, done, context) {
  var length = callbacks.length; ///

  var count = -1;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      callback = callbacks[index];
      callback(next, done, context, index);
    }
  }

  next();
}

function eventually(callbacks, done, context) {
  var length = callbacks.length; ///

  var count = 0;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    }
  }

  callbacks.forEach(function (callback, index) {
    callback(next, done, context, index);
  });
}

function repeatedly(callback, length, done, context) {
  var count = 0;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    }
  }

  for (var index = 0; index < length; index++) {
    callback(next, done, context, index);
  }
}

function forwardsForEach(array, callback, done, context) {
  var length = array.length; ///

  var count = -1;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];
      callback(element, next, done, context, index);
    }
  }

  next();
}

function backwardsForEach(array, callback, done, context) {
  var length = array.length; ///

  var count = length;

  function next() {
    count--;
    var terminate = count === -1;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];
      callback(element, next, done, context, index);
    }
  }

  next();
}

var _default = {
  whilst: whilst,
  forEach: forEach,
  sequence: sequence,
  eventually: eventually,
  repeatedly: repeatedly,
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};
exports["default"] = _default;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEntryExists = checkEntryExists;
exports.checkFileExists = checkFileExists;
exports.checkDirectoryExists = checkDirectoryExists;
exports.isEntryFile = isEntryFile;
exports.isEntryDirectory = isEntryDirectory;
exports.isDirectoryEmpty = isDirectoryEmpty;
exports.readDirectory = readDirectory;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.appendToFile = appendToFile;
exports.createDirectory = createDirectory;
exports.renameFile = renameFile;
exports.getStats = getStats;
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _constants = require("../constants");

var _path = require("../utilities/path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function checkEntryExists(entryPath) {
  var entryExists = _fs["default"].existsSync(entryPath);

  return entryExists;
}

function checkFileExists(filePath) {
  var fileExists = false;
  var entryPath = filePath,
      ///
  entryExists = checkEntryExists(entryPath);

  if (entryExists) {
    var entryFile = isEntryFile(entryPath);

    if (entryFile) {
      fileExists = true;
    }
  }

  return fileExists;
}

function checkDirectoryExists(directoryPath) {
  var directoryExists = false;
  var entryPath = directoryPath,
      ///
  entryExists = checkEntryExists(entryPath);

  if (entryExists) {
    var entryDirectory = isEntryDirectory(entryPath);

    if (entryDirectory) {
      directoryExists = true;
    }
  }

  return directoryExists;
}

function isEntryFile(entryPath) {
  var stat = _fs["default"].statSync(entryPath),
      entryDirectory = stat.isDirectory(),
      entryFile = !entryDirectory;

  return entryFile;
}

function isEntryDirectory(entryPath) {
  var stat = _fs["default"].statSync(entryPath),
      entryDirectory = stat.isDirectory();

  return entryDirectory;
}

function isDirectoryEmpty(directoryPath) {
  var subEntryNames = readDirectory(directoryPath),
      subEntryNamesLength = subEntryNames.length,
      directoryEmpty = subEntryNamesLength === 0;
  return directoryEmpty;
}

function readDirectory(directoryPath) {
  var subEntryNames = _fs["default"].readdirSync(directoryPath);

  return subEntryNames;
}

function readFile(filePath) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.UTF8_ENCODING;

  var options = {
    encoding: encoding
  },
      content = _fs["default"].readFileSync(filePath, options);

  return content;
}

function writeFile(filePath, content) {
  _fs["default"].writeFileSync(filePath, content);
}

function appendToFile(filePath, content) {
  _fs["default"].appendFileSync(filePath, content);
}

function createDirectory(directoryPath) {
  var directoryPathWithoutBottommostName = (0, _path.pathWithoutBottommostNameFromPath)(directoryPath);

  if (directoryPathWithoutBottommostName !== "." && directoryPathWithoutBottommostName !== null) {
    var parentDirectoryPath = directoryPathWithoutBottommostName,
        ///
    parentDirectoryExists = checkDirectoryExists(parentDirectoryPath);

    if (!parentDirectoryExists) {
      createDirectory(parentDirectoryPath);
    }
  }

  _fs["default"].mkdirSync(directoryPath);
}

function renameFile(oldFilePath, newFilePath) {
  _fs["default"].renameSync(oldFilePath, newFilePath);
}

function getStats(filePath) {
  return _fs["default"].statSync(filePath);
}

var _default = {
  checkEntryExists: checkEntryExists,
  checkFileExists: checkFileExists,
  checkDirectoryExists: checkDirectoryExists,
  isEntryFile: isEntryFile,
  isEntryDirectory: isEntryDirectory,
  isDirectoryEmpty: isDirectoryEmpty,
  readDirectory: readDirectory,
  readFile: readFile,
  writeFile: writeFile,
  appendToFile: appendToFile,
  createDirectory: createDirectory,
  renameFile: renameFile,
  getStats: getStats
};
exports["default"] = _default;

},{"../constants":8,"../utilities/path":19,"fs":7}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rc = _interopRequireDefault(require("./miscellaneous/rc"));

var _log = _interopRequireDefault(require("./miscellaneous/log"));

var _onETX = _interopRequireDefault(require("./miscellaneous/onETX"));

var _prompt = _interopRequireDefault(require("./miscellaneous/prompt"));

var _ajax = require("./miscellaneous/ajax");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  log: _log["default"],
  rc: _rc["default"],
  get: _ajax.get,
  post: _ajax.post,
  onETX: _onETX["default"],
  prompt: _prompt["default"]
};
exports["default"] = _default;

},{"./miscellaneous/ajax":14,"./miscellaneous/log":15,"./miscellaneous/onETX":16,"./miscellaneous/prompt":17,"./miscellaneous/rc":18}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;

var _constants = require("../../constants");

function get(host, uri, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///

    parameters = {};
  }

  var method = _constants.GET_METHOD,
      body = undefined;
  request(host, uri, parameters, method, body, callback);
}

function post(host, uri, json, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///

    parameters = {};
  }

  var method = _constants.POST_METHOD,
      body = JSON.stringify(json);
  request(host, uri, parameters, method, body, callback);
}

function request(host, uri, parameters, method, body, callback) {
  var url = urlFromHostURIAndParameters(host, uri, parameters),
      xmlHttpRequest = new XMLHttpRequest();

  xmlHttpRequest.onreadystatechange = function () {
    var readyState = xmlHttpRequest.readyState,
        status = xmlHttpRequest.status,
        responseText = xmlHttpRequest.responseText;

    if (readyState == 4) {
      var json = null;

      if (status == 200) {
        var jsonString = responseText; ///

        try {
          json = JSON.parse(jsonString);
        } catch (error) {///
        }

        callback(json);
      }
    }
  };

  var contentType = _constants.APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE;
  xmlHttpRequest.open(method, url);
  xmlHttpRequest.setRequestHeader("content-type", contentType);
  xmlHttpRequest.send(body);
}

function queryStringFromParameters(parameters) {
  var names = Object.keys(parameters),
      namesLength = names.length,
      lastIndex = namesLength - 1,
      queryString = names.reduce(function (queryString, name, index) {
    var value = parameters[name],
        encodedName = encodeURIComponent(name),
        encodedValue = encodeURIComponent(value),
        ampersandOrNothing = index !== lastIndex ? "&" : "";
    queryString += "".concat(encodedName, "=").concat(encodedValue).concat(ampersandOrNothing);
    return queryString;
  }, "");
  return queryString;
}

function urlFromHostURIAndParameters(host, uri, parameters) {
  var queryString = queryStringFromParameters(parameters),
      url = queryString === "" ? "".concat(host).concat(uri) : "".concat(host).concat(uri, "?").concat(queryString);
  return url;
}

},{"../../constants":8}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = log;

var _path = _interopRequireDefault(require("path"));

var _array = require("../../utilities/array");

var _path2 = require("../../utilities/path");

var _fileSystem = require("../../utilities/fileSystem");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logLevel = _constants.DEFAULT_LOG_LEVEL,
    logFileBaseName = _constants.DEFAULT_LOG_FILE_BASE_NAME,
    logDirectoryPath = _constants.DEFAULT_LOG_DIRECTORY_PATH;

function log(messageOrError) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var salientStackMessageIndex = 1;
  var levels = [_constants.TRACE, _constants.DEBUG, _constants.INFO, _constants.WARNING, _constants.ERROR, _constants.FATAL];

  if (level !== "") {
    var levelIndex = levels.indexOf(level),
        logLevelIndex = levels.indexOf(logLevel);

    if (levelIndex < logLevelIndex) {
      return;
    }

    salientStackMessageIndex += 1;
    level = "".concat(level, " "); ///
  }

  var error, message;

  if (messageOrError instanceof Error) {
    error = messageOrError; ///

    var _error = error;
    message = _error.message;
  } else {
    message = messageOrError; ///

    error = new Error(message);
  }

  var _error2 = error,
      stack = _error2.stack,
      stackMessages = stackMessagesFromStack(stack),
      pertinentStackMessage = stackMessages[salientStackMessageIndex],
      stackMessage = pertinentStackMessage,
      currentDateAndTimeString = getCurrentDateAndTimeString(),
      filePath = filePathFromStackMessage(stackMessage),
      lineNumber = lineNumberFromStackMessage(stackMessage),
      logMessage = "".concat(level).concat(currentDateAndTimeString, " ").concat(filePath, "(").concat(lineNumber, ") ").concat(message);
  console.log(logMessage);

  if (logDirectoryPath !== null) {
    rollOverLogFile();
    var logFilePath = getLogFilePath(),
        logFileContent = "".concat(logMessage, "\n");
    (0, _fileSystem.appendToFile)(logFilePath, logFileContent);
  }

  return logMessage;
}

function trace(message) {
  return log(message, _constants.TRACE);
}

function debug(message) {
  return log(message, _constants.DEBUG);
}

function info(message) {
  return log(message, _constants.INFO);
}

function warning(message) {
  return log(message, _constants.WARNING);
}

function error(message) {
  return log(message, _constants.ERROR);
}

function fatal(message) {
  return log(message, _constants.FATAL);
}

function setLogLevel(level) {
  logLevel = level;
}

function setLogFileBaseName(fileBaseName) {
  logFileBaseName = fileBaseName;
}

function setLogDirectoryPath(directoryPath) {
  logDirectoryPath = directoryPath;
}

function setLogOptions(logOptions) {
  var level = logOptions.level,
      fileBaseName = logOptions.fileBaseName,
      directoryPath = logOptions.directoryPath;
  setLogLevel(level);
  setLogFileBaseName(fileBaseName);
  setLogDirectoryPath(directoryPath);
}

function getLogFileContent() {
  var logFilePath = getLogFilePath(),
      logFileContent = (0, _fileSystem.readFile)(logFilePath);
  return logFileContent;
}

Object.assign(log, {
  TRACE: _constants.TRACE,
  DEBUG: _constants.DEBUG,
  INFO: _constants.INFO,
  WARNING: _constants.WARNING,
  ERROR: _constants.ERROR,
  FATAL: _constants.FATAL,
  trace: trace,
  debug: debug,
  info: info,
  warning: warning,
  error: error,
  fatal: fatal,
  setLogLevel: setLogLevel,
  setLogFileBaseName: setLogFileBaseName,
  setLogDirectoryPath: setLogDirectoryPath,
  setLogOptions: setLogOptions,
  getLogFileContent: getLogFileContent
});

function getLogFilePath() {
  var logFileName = "".concat(logFileBaseName, ".log"),
      logFilePath = (0, _path2.concatenatePaths)(logDirectoryPath, logFileName);
  return logFilePath;
}

function getRolledOverLogFilePath() {
  var currentDateString = getCurrentDateString(),
      rolledOverLogFileName = "".concat(logFileBaseName, ".").concat(currentDateString, ".log"),
      rolledOverLogFilePath = (0, _path2.concatenatePaths)(logDirectoryPath, rolledOverLogFileName);
  return rolledOverLogFilePath;
}

function getLogFileLastModifiedDate() {
  var logFilePath = getLogFilePath(),
      logFileStats = (0, _fileSystem.getStats)(logFilePath),
      mtime = logFileStats.mtime,
      logFileLastModifiedDate = new Date(mtime); ///

  return logFileLastModifiedDate;
}

function rollOverLogFile() {
  var logFilePath = getLogFilePath(),
      logFileExists = (0, _fileSystem.checkFileExists)(logFilePath);

  if (!logFileExists) {
    return;
  }

  var logFileLastModifiedDate = getLogFileLastModifiedDate(),
      logFileLastModifiedDateCurrentDate = isDateCurrentDate(logFileLastModifiedDate);

  if (!logFileLastModifiedDateCurrentDate) {
    var rolledOverLogFilePath = getRolledOverLogFilePath();
    (0, _fileSystem.renameFile)(logFilePath, rolledOverLogFilePath);
  }
}

function isDateCurrentDate(date) {
  var currentDate = new Date(),
      dateString = date.toDateString(),
      currentDateString = currentDate.toDateString(),
      dateCurrentDate = dateString === currentDateString;
  return dateCurrentDate;
}

function getCurrentDateString() {
  var date = new Date(),
      day = padStartWithZeroes(date.getDate(), 2),
      ///
  month = padStartWithZeroes(date.getMonth() + 1, 2),
      ///
  year = date.getFullYear(),
      currentDateAndTimeString = "".concat(day, "-").concat(month, "-").concat(year);
  return currentDateAndTimeString;
}

function getCurrentDateAndTimeString() {
  var date = new Date(),
      day = padStartWithZeroes(date.getDate(), 2),
      ///
  month = padStartWithZeroes(date.getMonth() + 1, 2),
      ///
  year = date.getFullYear(),
      hours = padStartWithZeroes(date.getHours(), 2),
      minutes = padStartWithZeroes(date.getMinutes(), 2),
      seconds = padStartWithZeroes(date.getSeconds(), 2),
      milliseconds = padStartWithZeroes(date.getMilliseconds(), 3),
      currentDateAndTimeString = "".concat(day, "-").concat(month, "-").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds, ".").concat(milliseconds);
  return currentDateAndTimeString;
}

function stackMessagesFromStack(stack) {
  var stackMessages = [],
      stackLines = stack.split(/\r\n|\n/);
  var stackMessage = "";
  stackLines.forEach(function (stackLine) {
    var matches = /^\s*at.*/.test(stackLine);
    stackMessage = stackMessage === "" ? stackLine : "".concat(stackMessage, "\n").concat(stackLine);

    if (matches) {
      stackMessages.push(stackMessage);
      stackMessage = "";
    }
  });
  return stackMessages;
}

function filePathFromStackMessage(stackMessage) {
  var matches = stackMessage.match(/(\/.+):\d+:\d+/m),
      secondMatch = (0, _array.second)(matches),
      absoluteFilePath = secondMatch,
      ///
  currentWorkingDirectoryPath = _path["default"].resolve("."),
      ///
  currentWorkingDirectoryPathLength = currentWorkingDirectoryPath.length,
      start = currentWorkingDirectoryPathLength + 1,
      ///
  filePath = absoluteFilePath.substr(start);

  return filePath;
}

function lineNumberFromStackMessage(stackMessage) {
  var matches = stackMessage.match(/:(\d+)/m),
      secondMatch = (0, _array.second)(matches),
      lineNumber = secondMatch; ///

  return lineNumber;
}

function padStartWithZeroes(string, targetLength) {
  var padString = "0",
      paddedString = padStart(string, targetLength, padString);
  return paddedString;
}

function padStart(string, targetLength, padString) {
  var padding = "";

  for (var index = 0; index < targetLength; index++) {
    padding += padString;
  }

  var paddedString = "".concat(padding).concat(string).substr(-targetLength);
  return paddedString;
}

},{"../../constants":8,"../../utilities/array":10,"../../utilities/fileSystem":12,"../../utilities/path":19,"path":21}],16:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onETX;

var _constants = require("../../constants");

function onETX(handler) {
  var event = _constants.DATA_EVENT;

  if (process.stdin.setRawMode) {
    var rawMode = true,
        encoding = _constants.UTF8_ENCODING;
    process.stdin.setRawMode(rawMode);
    process.stdin.setEncoding(encoding);
    process.stdin.resume();
    process.stdin.addListener(event, dataHandler);
    return offExt;
  }

  function offExt() {
    process.stdin.removeListener(event, dataHandler);
  }

  function dataHandler(character) {
    if (character === _constants.ETX_CHARACTER) {
      handler();
    }
  }
}

}).call(this,require('_process'))

},{"../../constants":8,"_process":22}],17:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = prompt;

var _onETX = _interopRequireDefault(require("./onETX"));

var _asynchronous = require("../../utilities/asynchronous");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function prompt(options, callback) {
  var value = null,
      _options$attempts = options.attempts,
      attempts = _options$attempts === void 0 ? 3 : _options$attempts,
      context = {
    value: value,
    attempts: attempts,
    options: options
  };
  (0, _asynchronous.whilst)(attempt, function () {
    var value = context.value;
    callback(value);
  }, context);
}

function attempt(next, done, context) {
  var attempts = context.attempts;
  var terminate = attempts-- === 0;

  if (terminate) {
    done();
    return;
  }

  var options = context.options,
      _options$hidden = options.hidden,
      hidden = _options$hidden === void 0 ? false : _options$hidden,
      _options$encoding = options.encoding,
      encoding = _options$encoding === void 0 ? "utf8" : _options$encoding,
      description = options.description,
      _options$initialValue = options.initialValue,
      initialValue = _options$initialValue === void 0 ? "" : _options$initialValue,
      errorMessage = options.errorMessage,
      validationPattern = options.validationPattern,
      validationFunction = options.validationFunction;
  input(description, initialValue, encoding, hidden, callback);

  function callback(value) {
    var valid = validationFunction ? ///
    validationFunction(value) : validationPattern.test(value);

    if (valid) {
      Object.assign(context, {
        value: value
      });
      done();
    } else {
      console.log(errorMessage);
      Object.assign(context, {
        attempts: attempts
      });
      next();
    }
  }
}

function input(description, initialValue, encoding, hidden, callback) {
  var value = initialValue; ///

  var event = _constants.DATA_EVENT,
      rawMode = true,
      offETX = (0, _onETX["default"])(function () {
    console.log(_constants.CTRL_C);
    process.exit();
  });
  process.stdin.setEncoding(encoding);
  process.stdin.setRawMode(rawMode);
  process.stdout.write(description);

  if (!hidden) {
    process.stdout.write(value);
  }

  process.stdin.resume();
  process.stdin.on(event, listener);

  function listener(chunk) {
    var character = chunk.toString(encoding);

    switch (character) {
      case _constants.LINE_FEED_CHARACTER:
      case _constants.CARRIAGE_RETURN_CHARACTER:
        process.stdout.write(_constants.LINE_FEED_CHARACTER);
        process.stdin.removeListener(event, listener);
        process.stdin.pause();
        offETX();
        callback(value);
        break;

      case _constants.BACKSPACE_CHARACTER:
        value = value.slice(0, value.length - 1);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(description);

        if (!hidden) {
          process.stdout.write(value);
        }

        break;

      default:
        value += character;

        if (!hidden) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(description);
          process.stdout.write(value);
        }

        break;
    }
  }
}

}).call(this,require('_process'))

},{"../../constants":8,"../../utilities/asynchronous":11,"./onETX":16,"_process":22}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rc;

var _path = _interopRequireDefault(require("path"));

var _array = require("../../utilities/array");

var _constants = require("../../constants");

var _fileSystem = require("../../utilities/fileSystem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pathResolver = _path["default"].resolve,
    baseExtension = _constants.DEFAULT_RC_BASE_EXTENSION;

function rc() {
  var environmentNameOrArgv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var environment,
      environmentName,
      environmentNameOrArgvArgv = environmentNameOrArgv instanceof Array;

  if (environmentNameOrArgvArgv) {
    var argv = environmentNameOrArgv; ///

    environmentName = environmentNameFromArgv(argv);
  } else {
    environmentName = environmentNameOrArgv; ///
  }

  var json = readRCFile(),
      environments = json.environments;

  if (environmentName === null) {
    var firstEnvironment = (0, _array.first)(environments);
    environment = firstEnvironment; ///
  } else {
    environment = environments.find(function (environment) {
      var name = environment.name,
          found = name === environmentName;
      return found;
    });
  }

  delete environment.name;
  Object.assign(rc, environment);
  return environment;
}

function readRCFile() {
  var absoluteRCFilePath = absoluteRCFilePathFromNothing(),
      fileContent = (0, _fileSystem.readFile)(absoluteRCFilePath),
      json = JSON.parse(fileContent);
  return json;
}

function writeRCFile(json) {
  var absoluteRCFilePath = absoluteRCFilePathFromNothing(),
      fileContent = JSON.stringify(json, null, "\t");
  (0, _fileSystem.writeFile)(absoluteRCFilePath, fileContent);
}

function updateRCFile(addedProperties) {
  var json = readRCFile();

  if (addedProperties) {
    Object.assign(json, addedProperties);
  }

  for (var _len = arguments.length, deletedPropertyNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    deletedPropertyNames[_key - 1] = arguments[_key];
  }

  deletedPropertyNames.forEach(function (deletedPropertyName) {
    delete json[deletedPropertyName];
  });
  writeRCFile(json);
}

function checkRCFileExists() {
  var absoluteRCFilePath = absoluteRCFilePathFromNothing(),
      rcFileExists = (0, _fileSystem.checkFileExists)(absoluteRCFilePath);
  return rcFileExists;
}

function createVacuousRCFile() {
  var json = {
    "environments": [{}]
  };
  writeRCFile(json);
}

function setRCBaseExtension(rcBaseExtension) {
  baseExtension = rcBaseExtension;
}

function setRCPathResolver(rcPathResolver) {
  pathResolver = rcPathResolver;
}

Object.assign(rc, {
  readRCFile: readRCFile,
  writeRCFile: writeRCFile,
  updateRCFile: updateRCFile,
  checkRCFileExists: checkRCFileExists,
  createVacuousRCFile: createVacuousRCFile,
  setRCBaseExtension: setRCBaseExtension,
  setRCPathResolver: setRCPathResolver
});

function environmentNameFromArgv(argv) {
  var environmentName = null;
  argv.find(function (argument) {
    ///
    var matches = argument.match(/--environment=(.+)/),
        found = matches !== null;

    if (found) {
      var secondMatch = (0, _array.second)(matches);
      environmentName = secondMatch;
    }

    return found;
  });
  return environmentName;
}

function absoluteRCFilePathFromNothing() {
  var filePath = "./.".concat(baseExtension, "rc"),
      absoluteRCFilePath = pathResolver(filePath);
  return absoluteRCFilePath;
}

},{"../../constants":8,"../../utilities/array":10,"../../utilities/fileSystem":12,"path":21}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPathName = isPathName;
exports.isPathTopmostName = isPathTopmostName;
exports.isPathRelativePath = isPathRelativePath;
exports.isPathAbsolutePath = isPathAbsolutePath;
exports.isTopmostNameInAbsolutePath = isTopmostNameInAbsolutePath;
exports.combinePaths = combinePaths;
exports.concatenatePaths = concatenatePaths;
exports.bottommostNameFromPath = bottommostNameFromPath;
exports.topmostDirectoryPathFromPath = topmostDirectoryPathFromPath;
exports.topmostDirectoryNameFromPath = topmostDirectoryNameFromPath;
exports.pathWithoutBottommostNameFromPath = pathWithoutBottommostNameFromPath;
exports.pathWithoutTopmostDirectoryNameFromPath = pathWithoutTopmostDirectoryNameFromPath;
exports["default"] = void 0;

var _array = require("../utilities/array");

function isPathName(path) {
  path = path.replace(/^\//, "").replace(/\/$/, ""); ///

  var pathName = /\//.test(path) === false;
  return pathName;
}

function isPathTopmostName(path) {
  var pathName = isPathName(path),
      pathAbsolutePath = isPathAbsolutePath(path),
      pathTopmostName = pathName && pathAbsolutePath;
  return pathTopmostName;
}

function isPathRelativePath(path) {
  var pathRelativePath = !/^\//.test(path);
  return pathRelativePath;
}

function isPathAbsolutePath(path) {
  var pathAbsolutePath = /^\//.test(path);
  return pathAbsolutePath;
}

function isTopmostNameInAbsolutePath(topmostName, absolutePath) {
  var regExp = new RegExp("^".concat(topmostName, "(?:\\/.+)?$")),
      topmostNameInAbsolutePath = regExp.test(absolutePath);
  return topmostNameInAbsolutePath;
}

function combinePaths(path, relativePath) {
  var combinedPath = null;
  var pathNames = path.split(/\//),
      relativePathNames = relativePath.split(/\//);
  var lastPathName,
      firstRelativePathName = (0, _array.first)(relativePathNames);

  if (firstRelativePathName === ".") {
    relativePathNames.shift();
  }

  firstRelativePathName = (0, _array.first)(relativePathNames);
  lastPathName = (0, _array.last)(pathNames);

  while (firstRelativePathName === ".." && lastPathName !== undefined) {
    relativePathNames.shift();
    pathNames.pop();
    firstRelativePathName = (0, _array.first)(relativePathNames);
    lastPathName = (0, _array.last)(pathNames);
  }

  if (lastPathName !== undefined) {
    var combinedPathNames = [].concat(pathNames).concat(relativePathNames);
    combinedPath = combinedPathNames.join("/");
  }

  return combinedPath;
}

function concatenatePaths(path, relativePath) {
  path = path.replace(/\/$/, ""); ///

  var concatenatedPath = "".concat(path, "/").concat(relativePath);
  return concatenatedPath;
}

function bottommostNameFromPath(path) {
  var bottommostName = null;
  var matches = path.match(/^.*\/([^\/]+\/?)$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    bottommostName = secondMatch; ///
  }

  return bottommostName;
}

function topmostDirectoryPathFromPath(path) {
  var matches = path.match(/^(.+)\/[^\/]+\/?$/),
      secondMatch = (0, _array.second)(matches),
      topmostDirectoryPath = secondMatch; ///

  return topmostDirectoryPath;
}

function topmostDirectoryNameFromPath(path) {
  var topmostDirectoryName = null;
  var matches = path.match(/^([^\/]+)\/.+$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    topmostDirectoryName = secondMatch; ///
  }

  return topmostDirectoryName;
}

function pathWithoutBottommostNameFromPath(path) {
  var pathWithoutBottommostName = null;
  var matches = path.match(/^(.*)\/[^\/]+\/?$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    pathWithoutBottommostName = secondMatch; ///
  }

  return pathWithoutBottommostName;
}

function pathWithoutTopmostDirectoryNameFromPath(path) {
  var pathWithoutTopmostDirectoryName = null;
  var matches = path.match(/^[^\/]+\/(.+)$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    pathWithoutTopmostDirectoryName = secondMatch;
  }

  return pathWithoutTopmostDirectoryName;
}

var _default = {
  isPathName: isPathName,
  isPathTopmostName: isPathTopmostName,
  isPathRelativePath: isPathRelativePath,
  isPathAbsolutePath: isPathAbsolutePath,
  isTopmostNameInAbsolutePath: isTopmostNameInAbsolutePath,
  combinePaths: combinePaths,
  concatenatePaths: concatenatePaths,
  bottommostNameFromPath: bottommostNameFromPath,
  topmostDirectoryPathFromPath: topmostDirectoryPathFromPath,
  topmostDirectoryNameFromPath: topmostDirectoryNameFromPath,
  pathWithoutBottommostNameFromPath: pathWithoutBottommostNameFromPath,
  pathWithoutTopmostDirectoryNameFromPath: pathWithoutTopmostDirectoryNameFromPath
};
exports["default"] = _default;

},{"../utilities/array":10}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFile = parseFile;
exports.parseContent = parseContent;
exports.parseLine = parseLine;
exports["default"] = void 0;

var _fileSystem = require("../utilities/fileSystem");

function parseFile(filePath, args, regex) {
  var content = (0, _fileSystem.readFile)(filePath),
      parsedContent = parseContent(content, args, regex);
  return parsedContent;
}

function parseContent(content, args, regex) {
  var lines = content.split("\n"),
      parsedLines = parseLines(lines, args, regex),
      parsedContent = parsedLines.join("\n");
  return parsedContent;
}

function parseLine(line, args) {
  var regex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : /\${(.+?)}/g;
  var parsedLine = line.replace(regex, function (match, token) {
    var parsedToken = parseToken(token, args);
    return parsedToken;
  });
  return parsedLine;
}

var _default = {
  parseFile: parseFile,
  parseContent: parseContent,
  parseLine: parseLine
};
exports["default"] = _default;

function parseLines(lines, args, regex) {
  var parsedLines = lines.map(function (line) {
    var parsedLine = parseLine(line, args, regex);
    return parsedLine;
  });
  return parsedLines;
}

function parseToken(token, args) {
  var parsedToken = "";

  if (args.hasOwnProperty(token)) {
    parsedToken = args[token];
  }

  return parsedToken;
}

},{"../utilities/fileSystem":12}],21:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":22}],22:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvZGlyZWN0ZWRBY3ljbGljR3JhcGguanMiLCJsaWIvZWRnZS5qcyIsImxpYi9leGFtcGxlLmpzIiwibGliL2luZGV4LmpzIiwibGliL3V0aWxpdGllcy92ZXJ0ZXguanMiLCJsaWIvdmVydGV4LmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL2NvbnN0YW50cy5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL2FycmF5LmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL2FzeW5jaHJvbm91cy5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9maWxlU3lzdGVtLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL21pc2NlbGxhbmVvdXMuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy9hamF4LmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL21pc2NlbGxhbmVvdXMvbG9nLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL21pc2NlbGxhbmVvdXMvb25FVFguanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy9wcm9tcHQuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy9yYy5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9wYXRoLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL3RlbXBsYXRlLmpzIiwibm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUVBOzs7Ozs7Ozs7O0lBRVEsSSxHQUFTLHlCLENBQVQsSTs7SUFFYSxvQjtBQUNuQixnQ0FBWSxTQUFaLEVBQXVCO0FBQUE7O0FBQ3JCLFNBQUssU0FBTCxHQUFpQixTQUFqQjtBQUNEOzs7OzhCQUVTO0FBQ1IsVUFBTSxRQUFRLEdBQUcsS0FBSyxXQUFMLEVBQWpCO0FBQUEsVUFDTSxjQUFjLEdBQUcsUUFBUSxDQUFDLE1BRGhDO0FBQUEsVUFFTSxLQUFLLEdBQUksY0FBYyxLQUFLLENBRmxDO0FBSUEsYUFBTyxLQUFQO0FBQ0Q7OztrQ0FFYTtBQUNaLFVBQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFQLENBQWMsS0FBSyxTQUFuQixDQUF4QjtBQUFBLFVBQ00sUUFBUSxHQUFHLGVBRGpCLENBRFksQ0FFc0I7O0FBRWxDLGFBQU8sUUFBUDtBQUNEOzs7cUNBRWdCO0FBQ2YsVUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQVAsQ0FBWSxLQUFLLFNBQWpCLENBQXRCO0FBQUEsVUFDTSxXQUFXLEdBQUcsYUFEcEIsQ0FEZSxDQUVxQjs7QUFFcEMsYUFBTyxXQUFQO0FBQ0Q7OzswQ0FFcUIsVSxFQUFZO0FBQ2hDLFVBQU0sYUFBYSxHQUFHLEtBQUssMkJBQUwsQ0FBaUMsVUFBakMsQ0FBdEI7QUFBQSxVQUNNLE1BQU0sR0FBRyxhQUFhLEdBQ1gsS0FBSyxTQUFMLENBQWUsVUFBZixDQURXLEdBRVQsSUFIbkI7QUFLQSxhQUFPLE1BQVA7QUFDRDs7OzBEQUVxQyxVLEVBQVk7QUFDaEQsVUFBTSxNQUFNLEdBQUcsS0FBSyxxQkFBTCxDQUEyQixVQUEzQixDQUFmO0FBQUEsVUFDTSxzQkFBc0IsR0FBRyxNQUFNLENBQUMseUJBQVAsRUFE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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFZGdlIGZyb20gXCIuL2VkZ2VcIjtcbmltcG9ydCBWZXJ0ZXggZnJvbSBcIi4vdmVydGV4XCI7XG5cbmltcG9ydCB7IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzLCB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyB9IGZyb20gXCIuL3V0aWxpdGllcy92ZXJ0ZXhcIjtcblxuY29uc3QgeyBsYXN0IH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0ZWRBY3ljbGljR3JhcGgge1xuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhNYXApIHtcbiAgICB0aGlzLnZlcnRleE1hcCA9IHZlcnRleE1hcDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCksXG4gICAgICAgICAgdmVydGljZXNMZW5ndGggPSB2ZXJ0aWNlcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAodmVydGljZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgZ2V0VmVydGljZXMoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwVmFsdWVzID0gT2JqZWN0LnZhbHVlcyh0aGlzLnZlcnRleE1hcCksXG4gICAgICAgICAgdmVydGljZXMgPSB2ZXJ0ZXhNYXBWYWx1ZXM7IC8vL1xuXG4gICAgcmV0dXJuIHZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0VmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGV4TWFwS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMudmVydGV4TWFwKSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lcyA9IHZlcnRleE1hcEtleXM7ICAvLy9cblxuICAgIHJldHVybiB2ZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleCA9IHZlcnRleFByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gOlxuICAgICAgICAgICAgICAgICAgICAgICBudWxsO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXguZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRTdWNjZXNzb3JWZXJ0ZXhOYW1lc0J5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXguZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMoKTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldEVkZ2VzQnlUYXJnZXRWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlcyA9IFtdLFxuICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHRhcmdldFZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHRhcmdldFZlcnRleC5nZXRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzKCksXG4gICAgICAgICAgICBzb3VyY2VWZXJ0ZXhOYW1lcyA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXM7ICAvLy9cblxuICAgICAgc291cmNlVmVydGV4TmFtZXMuZm9yRWFjaCgoc291cmNlVmVydGV4TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBlZGdlID0gRWRnZS5mcm9tU291cmNlVmVydGV4TmFtZUFuZFRhcmdldFZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgZWRnZXMucHVzaChlZGdlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBlZGdlcztcbiAgfVxuXG4gIGdldEVkZ2VzQnlTb3VyY2VWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlcyA9IFtdLFxuICAgICAgICAgIHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleCAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMgPSBzb3VyY2VWZXJ0ZXguZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMoKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleE5hbWVzID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXM7ICAvLy9cblxuICAgICAgdGFyZ2V0VmVydGV4TmFtZXMuZm9yRWFjaCgodGFyZ2V0VmVydGV4TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBlZGdlID0gRWRnZS5mcm9tU291cmNlVmVydGV4TmFtZUFuZFRhcmdldFZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgZWRnZXMucHVzaChlZGdlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBlZGdlcztcbiAgfVxuXG4gIHNldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lLCB2ZXJ0ZXgpIHtcbiAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfVxuXG4gIGRlbGV0ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdO1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudChlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHRoaXMuaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gICAgXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBlZGdlUHJlc2VudCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCA9IChzb3VyY2VWZXJ0ZXggIT09IG51bGwpICYmICh0YXJnZXRWZXJ0ZXggIT09IG51bGwpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleEFuZFRhcmdldFZlcnRleFByZXNlbnQpIHtcbiAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4LmlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuICAgIH1cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4TmFtZXMgPSB0aGlzLmdldFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgdmVydGV4TmFtZXNJbmNsdWRlc1ZlcnRleE5hbWUgPSB2ZXJ0ZXhOYW1lcy5pbmNsdWRlcyh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB2ZXJ0ZXhQcmVzZW50ID0gdmVydGV4TmFtZXNJbmNsdWRlc1ZlcnRleE5hbWU7ICAvLy9cblxuICAgIHJldHVybiB2ZXJ0ZXhQcmVzZW50O1xuICB9XG5cbiAgZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKHZlcnRpY2VzKTtcblxuICAgIGNvbnN0IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMgPSB2ZXJ0aWNlcywgLy8vXG4gICAgICAgICAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcyA9IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4TmFtZXM7XG4gIH1cblxuICBhZGRFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICByZW1vdmVFZGdlKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpO1xuXG4gICAgdGhpcy5yZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgfVxuXG4gIGFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleE5hbWUgIT09IHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleC5pc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KTtcbiAgICAgIFxuICAgICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc291cmNlVmVydGV4SW5kZXggPSBzb3VyY2VWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgdGFyZ2V0VmVydGV4SW5kZXggPSB0YXJnZXRWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgICAgaW52YWxpZGF0aW5nRWRnZSA9IChzb3VyY2VWZXJ0ZXhJbmRleCA+IHRhcmdldFZlcnRleEluZGV4KTtcblxuICAgICAgICBzdWNjZXNzID0gaW52YWxpZGF0aW5nRWRnZSA/XG4gICAgICAgICAgICAgICAgICAgIGFkZEludmFsaWRhdGluZ0VkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KSA6XG4gICAgICAgICAgICAgICAgICAgICAgdHJ1ZTtcblxuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gc291cmNlVmVydGV4LCAvLy9cbiAgICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0YXJnZXRWZXJ0ZXg7IC8vL1xuXG4gICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBzdWNjZXNzO1xuICB9XG5cbiAgcmVtb3ZlRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IGVkZ2VQcmVzZW50ID0gdGhpcy5pc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIGlmIChlZGdlUHJlc2VudCkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgc291cmNlVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuICAgICAgdGFyZ2V0VmVydGV4LnJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRWRnZXNCeVNvdXJjZVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcblxuICAgIGlmIChzb3VyY2VWZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKTtcblxuICAgICAgc291cmNlVmVydGV4LnJlbW92ZU91dGdvaW5nRWRnZXMoKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVFZGdlc0J5VGFyZ2V0VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdGFyZ2V0VmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHRhcmdldFZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW5jb21pbmdFZGdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgaWYgKCF2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IHRoaXMuZ2V0VmVydGV4TmFtZXMoKSxcbiAgICAgICAgICAgIHZlcnRleE5hbWVzTGVuZ3RoID0gdmVydGV4TmFtZXMubGVuZ3RoLFxuICAgICAgICAgICAgbmFtZSA9IHZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGluZGV4ID0gdmVydGV4TmFtZXNMZW5ndGgsIC8vL1xuICAgICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgICB0aGlzLnNldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lLCB2ZXJ0ZXgpO1xuICAgIH1cblxuICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIHZlcnRleDtcbiAgfVxuXG4gIHJlbW92ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IHJlbW92ZWRFZGdlcyA9IG51bGw7XG5cbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAodmVydGV4UHJlc2VudCkge1xuICAgICAgcmVtb3ZlZEVkZ2VzID0gW107XG5cbiAgICAgIGNvbnN0IHZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgICB2ZXJ0ZXguZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCgoaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCkgPT4ge1xuICAgICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXggPSB2ZXJ0ZXgsICAvLy9cbiAgICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzVmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXguZ2V0TmFtZSgpLCAgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSwgLy8vXG4gICAgICAgICAgICAgIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSA9IGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2UgPSBuZXcgRWRnZShyZW1vdmVkRWRnZVNvdXJjZVZlcnRleE5hbWUsIHJlbW92ZWRFZGdlVGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgICAgcmVtb3ZlZEVkZ2VzLnB1c2gocmVtb3ZlZEVkZ2UpO1xuXG4gICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzVmVydGV4KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRlbGV0ZVZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgICAgY29uc3QgZGVsZXRlZFZlcnRleCA9IHZlcnRleCwgLy8vXG4gICAgICAgICAgICBkZWxldGVkVmVydGV4SW5kZXggPSBkZWxldGVkVmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKSxcbiAgICAgICAgICAgIGFmZmVjdGVkVmVydGljZXMgPSB2ZXJ0aWNlcy5yZWR1Y2UoKGFmZmVjdGVkVmVydGljZXMsIHZlcnRleCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB2ZXJ0ZXhJbmRleCA9IHZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0ZXhBZmZlY3RlZCA9ICh2ZXJ0ZXhJbmRleCA+IGRlbGV0ZWRWZXJ0ZXhJbmRleCk7XG5cbiAgICAgICAgICAgICAgaWYgKHZlcnRleEFmZmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXggPSB2ZXJ0ZXg7ICAvLy9cblxuICAgICAgICAgICAgICAgIGFmZmVjdGVkVmVydGljZXMucHVzaChhZmZlY3RlZFZlcnRleCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gYWZmZWN0ZWRWZXJ0aWNlcztcbiAgICAgICAgICAgIH0sIFtdKTtcblxuICAgICAgYWZmZWN0ZWRWZXJ0aWNlcy5mb3JFYWNoKChhZmZlY3RlZFZlcnRleCkgPT4gYWZmZWN0ZWRWZXJ0ZXguZGVjcmVtZW50SW5kZXgoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZWRFZGdlcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tTm90aGluZygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fSxcbiAgICAgICAgICBkaXJlY3RlZEFjeWNsaWNHcmFwaCA9IG5ldyBEaXJlY3RlZEFjeWNsaWNHcmFwaCh2ZXJ0ZXhNYXApO1xuXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gICAgY29uc3QgdmVydGV4TWFwID0gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKTtcblxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXModG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpO1xuICAgIFxuICAgIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZEludmFsaWRhdGluZ0VkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KSB7XG4gIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGFyZ2V0VmVydGV4LnJldHJpZXZlRm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCksXG4gICAgICAgIGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID0gbGFzdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICByZXN1bHRzSW5DeWNsZSA9IChsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9PT0gc291cmNlVmVydGV4KTtcblxuICBpZiAoIXJlc3VsdHNJbkN5Y2xlKSB7XG4gICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHNvdXJjZVZlcnRleC5yZXRyaWV2ZUJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKTtcblxuICAgIHRvcG9sb2dpY2FsbHlPcmRlclZlcnRpY2VzKGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpO1xuXG4gICAgdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXMoZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKTtcblxuICAgIGNvbnN0IGFmZmVjdGVkVmVydGljZXMgPSBbXS5jb25jYXQoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcykuY29uY2F0KGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyksXG4gICAgICAgICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzID0gYWZmZWN0ZWRWZXJ0aWNlcy5tYXAoKGFmZmVjdGVkVmVydGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFmZmVjdGVkVmVydGV4SW5kZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICBhZmZlY3RlZFZlcnRleEluZGljZXMuc29ydCgoaW5kZXhBLCBpbmRleEIpID0+IChpbmRleEEgLSBpbmRleEIpKTtcblxuICAgIGFmZmVjdGVkVmVydGljZXMuZm9yRWFjaCgoYWZmZWN0ZWRWZXJ0ZXgsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBhZmZlY3RlZFZlcnRleEluZGV4ID0gYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzW2luZGV4XTtcblxuICAgICAgYWZmZWN0ZWRWZXJ0ZXguc2V0SW5kZXgoYWZmZWN0ZWRWZXJ0ZXhJbmRleCk7XG4gICAgfSk7XG5cbiAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBzdWNjZXNzO1xufVxuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB2ZXJ0ZXhOYW1lcy5mb3JFYWNoKCh2ZXJ0ZXhOYW1lLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSB2ZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpO1xuXG4gICAgdmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9KTtcbiAgXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIHZlcnRleE1hcEZyb21Ub3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMpIHtcbiAgY29uc3QgdmVydGV4TWFwID0ge307XG4gIFxuICB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLmZvckVhY2goKHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgdmVydGV4ID0gVmVydGV4LmZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpLFxuICAgICAgICAgIHZlcnRleE5hbWUgPSBuYW1lOyAgLy8vXG5cbiAgICB2ZXJ0ZXhNYXBbdmVydGV4TmFtZV0gPSB2ZXJ0ZXg7XG4gIH0pO1xuXG4gIHJldHVybiB2ZXJ0ZXhNYXA7XG59XG5cbmZ1bmN0aW9uIGFkZEVkZ2VzVG9WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApIHtcbiAgdG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKCh0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleCkgPT4ge1xuICAgIHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGV4LmZvckVhY2hPdXRnb2luZ0VkZ2UoKG91dGdvaW5nRWRnZSkgPT4ge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gb3V0Z29pbmdFZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHNvdXJjZVZlcnRleE5hbWUsICAvLy9cbiAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXhOYW1lLFxuICAgICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXSwgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB2ZXJ0ZXhNYXBbaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZV07IC8vL1xuXG4gICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWRnZSB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICB0aGlzLnNvdXJjZVZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lO1xuICAgIHRoaXMudGFyZ2V0VmVydGV4TmFtZSA9IHRhcmdldFZlcnRleE5hbWU7XG4gIH1cbiAgXG4gIGdldFNvdXJjZVZlcnRleE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlVmVydGV4TmFtZTtcbiAgfVxuICBcbiAgZ2V0VGFyZ2V0VmVydGV4TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXJnZXRWZXJ0ZXhOYW1lO1xuICB9XG4gIFxuICBtYXRjaChlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBtYXRjaGVzID0gKCh0aGlzLnNvdXJjZVZlcnRleE5hbWUgPT09IHNvdXJjZVZlcnRleE5hbWUpICYmICh0aGlzLnRhcmdldFZlcnRleE5hbWUgPT09IHRhcmdldFZlcnRleE5hbWUpKTtcbiAgICBcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIG1hdGNoVmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9ICgodGhpcy5zb3VyY2VWZXJ0ZXhOYW1lID09PSB2ZXJ0ZXhOYW1lKSB8fCAodGhpcy50YXJnZXRWZXJ0ZXhOYW1lID09PSB2ZXJ0ZXhOYW1lKSk7XG5cbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIG1hdGNoU291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9ICh0aGlzLnNvdXJjZVZlcnRleE5hbWUgPT09IHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBtYXRjaFRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSAodGhpcy50YXJnZXRWZXJ0ZXhOYW1lID09PSB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG5cbiAgbWF0Y2hWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9ICgodGhpcy5zb3VyY2VWZXJ0ZXhOYW1lID09PSBzb3VyY2VWZXJ0ZXhOYW1lKSAmJiAodGhpcy50YXJnZXRWZXJ0ZXhOYW1lID09PSB0YXJnZXRWZXJ0ZXhOYW1lKSk7XG4gICAgXG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlID0gbmV3IEVkZ2Uoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gZWRnZTtcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IERpcmVjdGVkQWN5Y2xpY0dyYXBoIH0gZnJvbSBcIi4vaW5kZXhcIjtcblxuY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBEaXJlY3RlZEFjeWNsaWNHcmFwaC5mcm9tTm90aGluZygpLFxuICAgICAgdmVydGV4TmFtZSA9IFwiaVwiLFxuICAgICAgc291cmNlVmVydGV4TmFtZSA9IFwialwiLFxuICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IFwia1wiO1xuXG5kaXJlY3RlZEFjeWNsaWNHcmFwaC5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbmRpcmVjdGVkQWN5Y2xpY0dyYXBoLmFkZEVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG5jb25zdCB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRleE5hbWVzID0gZGlyZWN0ZWRBY3ljbGljR3JhcGguZ2V0VG9wb2xvZ2ljYWxseU9yZGVyZWRWZXJ0ZXhOYW1lcygpO1xuXG5kZWJ1Z2dlclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCB7IGRlZmF1bHQgYXMgRWRnZSB9IGZyb20gXCIuL2VkZ2VcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRGlyZWN0ZWRBY3ljbGljR3JhcGggfSBmcm9tIFwiLi9kaXJlY3RlZEFjeWNsaWNHcmFwaFwiO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyh2ZXJ0aWNlcykge1xuICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IHZlcnRpY2VzLm1hcCgodmVydGV4KSA9PiB7XG4gICAgY29uc3QgdmVydGV4TmFtZSA9IHZlcnRleC5nZXROYW1lKCk7XG5cbiAgICByZXR1cm4gdmVydGV4TmFtZTtcbiAgfSk7XG5cbiAgcmV0dXJuIHZlcnRleE5hbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9wb2xvZ2ljYWxseU9yZGVyVmVydGljZXModmVydGljZXMpIHsgIC8vL1xuICB2ZXJ0aWNlcy5zb3J0KChmaXJzdFZlcnRleCwgc2Vjb25kVmVydGV4KSA9PiB7XG4gICAgY29uc3QgZmlyc3RWZXJ0ZXhJbmRleCA9IGZpcnN0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgc2Vjb25kVmVydGV4SW5kZXggPSBzZWNvbmRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChmaXJzdFZlcnRleEluZGV4IDwgc2Vjb25kVmVydGV4SW5kZXgpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2UgIGlmIChmaXJzdFZlcnRleEluZGV4ID4gc2Vjb25kVmVydGV4SW5kZXgpIHtcbiAgICAgIHJldHVybiArMTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHRvcG9sb2dpY2FsbHlPcmRlcmVkVmVydGljZXMgPSB2ZXJ0aWNlczsgIC8vL1xuXG4gIHJldHVybiB0b3BvbG9naWNhbGx5T3JkZXJlZFZlcnRpY2VzO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzLCB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyB9IGZyb20gXCIuL3V0aWxpdGllcy92ZXJ0ZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVydGV4IHtcbiAgY29uc3RydWN0b3IobmFtZSwgaW5kZXgsIHZpc2l0ZWQsIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMsIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZDtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzO1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIGdldEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4O1xuICB9XG5cbiAgaXNWaXNpdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnZpc2l0ZWQ7XG4gIH1cblxuICBpc1N0cmFuZGVkKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXNMZW5ndGggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMubGVuZ3RoLFxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzTGVuZ3RoID0gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5sZW5ndGgsXG4gICAgICAgICAgc3RyYW5kZWQgPSAoKGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXNMZW5ndGggPT09IDApICYmIChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlc0xlbmd0aCA9PT0gMCkpO1xuXG4gICAgcmV0dXJuIHN0cmFuZGVkO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLm1hcCgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcmV0dXJuIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMgPSB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLm1hcCgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSA9PiB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgcmV0dXJuIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWU7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TWFwKHByZWRlY2Vzc29yVmVydGV4TWFwID0ge30pIHtcbiAgICB0aGlzLmZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4ID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gcHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICBwcmVkZWNlc3NvclZlcnRleE1hcFtwcmVkZWNlc3NvclZlcnRleE5hbWVdID0gcHJlZGVjZXNzb3JWZXJ0ZXg7XG5cbiAgICAgIHByZWRlY2Vzc29yVmVydGV4LmdldFByZWRlY2Vzc29yVmVydGV4TWFwKHByZWRlY2Vzc29yVmVydGV4TWFwKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRleE1hcChzdWNjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSA9PiB7XG4gICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXggPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZSA9IHN1Y2Nlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgIHN1Y2Nlc3NvclZlcnRleE1hcFtzdWNjZXNzb3JWZXJ0ZXhOYW1lXSA9IHN1Y2Nlc3NvclZlcnRleDtcblxuICAgICAgc3VjY2Vzc29yVmVydGV4LmdldFN1Y2Nlc3NvclZlcnRleE1hcChzdWNjZXNzb3JWZXJ0ZXhNYXApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleE1hcDtcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHRoaXMuZ2V0UHJlZGVjZXNzb3JWZXJ0aWNlcygpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSBwcmVkZWNlc3NvclZlcnRpY2VzLm1hcCgocHJlZGVjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4TmFtZSA9IHByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TmFtZTtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBwcmVkZWNlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3Qgc3VjY2Vzc29yVmVydGljZXMgPSB0aGlzLmdldFN1Y2Nlc3NvclZlcnRpY2VzKCksXG4gICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gc3VjY2Vzc29yVmVydGljZXMubWFwKChzdWNjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXhOYW1lID0gc3VjY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhOYW1lO1xuICAgICAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB0aGlzLmdldFByZWRlY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IE9iamVjdC5rZXlzKHByZWRlY2Vzc29yVmVydGV4TWFwKSxcbiAgICAgICAgICBwcmVkZWNlc3NvclZlcnRpY2VzID0gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcy5tYXAoKHByZWRlY2Vzc29yVmVydGV4TmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXggPSBwcmVkZWNlc3NvclZlcnRleE1hcFtwcmVkZWNlc3NvclZlcnRleE5hbWVdO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleE1hcCA9IHRoaXMuZ2V0U3VjY2Vzc29yVmVydGV4TWFwKCksXG4gICAgICAgICAgc3VjY2Vzc29yVmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyhzdWNjZXNzb3JWZXJ0ZXhNYXApLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRpY2VzID0gc3VjY2Vzc29yVmVydGV4TmFtZXMubWFwKChzdWNjZXNzb3JWZXJ0ZXhOYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXggPSBzdWNjZXNzb3JWZXJ0ZXhNYXBbc3VjY2Vzc29yVmVydGV4TmFtZV07XG4gIFxuICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleDtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldFRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRpY2VzID0gdGhpcy5nZXRQcmVkZWNlc3NvclZlcnRpY2VzKCk7XG5cbiAgICB0b3BvbG9naWNhbGx5T3JkZXJWZXJ0aWNlcyhwcmVkZWNlc3NvclZlcnRpY2VzKTtcblxuICAgIGNvbnN0IHRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHByZWRlY2Vzc29yVmVydGljZXMsICAvLy9cbiAgICAgICAgICB0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyh0b3BvbG9naWNhbGx5T3JkZXJlZFByZWRlY2Vzc29yVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIHRvcG9sb2dpY2FsbHlPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuICBcbiAgcmV0cmlldmVGb3J3YXJkc0FmZmVjdGVkVmVydGljZXMoc291cmNlVmVydGV4KSB7XG4gICAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGhpcy5mb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goKHZpc2l0ZWRWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9ICh2aXNpdGVkVmVydGV4ID09PSBzb3VyY2VWZXJ0ZXgpO1xuICAgICAgXG4gICAgICBpZiAodGVybWluYXRlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBmb3J3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cblxuICByZXRyaWV2ZUJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKSB7XG4gICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRoaXMuYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaCgodmlzaXRlZFZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gZmFsc2U7XG5cbiAgICAgIGlmICh0ZXJtaW5hdGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgcmV0dXJuIGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXM7XG4gIH1cbiAgXG4gIGlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgodmVydGV4KSB7XG4gICAgY29uc3QgdmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuaW5jbHVkZXModmVydGV4KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleDtcbiAgfVxuXG4gIGlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHZlcnRleCkge1xuICAgIGNvbnN0IHZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5jbHVkZXModmVydGV4KTtcblxuICAgIHJldHVybiB2ZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXg7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlTb3VyY2VWZXJ0ZXgoc291cmNlVmVydGV4KSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSB0aGlzLmlzVmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KSxcbiAgICAgICAgICBlZGdlUHJlc2VudCA9IHNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4OyAvLy9cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIGlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzLmlzVmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSB0YXJnZXRWZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXg7IC8vL1xuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIHNldEluZGV4KGluZGV4KSB7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB9XG5cbiAgc2V0VmlzaXRlZCh2aXNpdGVkKSB7XG4gICAgdGhpcy52aXNpdGVkID0gdmlzaXRlZDtcbiAgfVxuXG4gIGRlY3JlbWVudEluZGV4KCkge1xuICAgIHRoaXMuaW5kZXgtLTtcbiAgfVxuXG4gIHJlbW92ZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuaW5kZXhPZihpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCksXG4gICAgICAgICAgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgfVxuXG4gIHJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuaW5kZXhPZihpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpLFxuICAgICAgICAgIHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICB9XG4gIFxuICByZW1vdmVJbmNvbWluZ0VkZ2VzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRoaXM7IC8vL1xuICAgIFxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkgPT4gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkpO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gW107XG4gIH1cblxuICByZW1vdmVPdXRnb2luZ0VkZ2VzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpczsgLy8vXG5cbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmZvckVhY2goKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkgPT4gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkpO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IFtdO1xuICB9XG5cbiAgYWRkSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMucHVzaChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gIH1cblxuICBhZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5wdXNoKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG4gIH1cblxuICBmb3J3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spIHtcbiAgICBjb25zdCB2aXNpdGVkVmVydGljZXMgPSBbXTtcblxuICAgIHRoaXMucmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcygodmlzaXRlZFZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7ICAvLy9cblxuICAgICAgdmlzaXRlZFZlcnRpY2VzLnB1c2godmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICB2aXNpdGVkVmVydGljZXMuZm9yRWFjaCgodmlzaXRlZFZlcnRleCkgPT4gdmlzaXRlZFZlcnRleC5yZXNldFZpc2l0ZWQoKSk7XG5cbiAgICByZXR1cm4gdmlzaXRlZFZlcnRpY2VzO1xuICB9XG5cbiAgYmFja3dhcmRzRGVwdGhGaXJzdFNlYXJjaChjYWxsYmFjaykge1xuICAgIGNvbnN0IHZpc2l0ZWRWZXJ0aWNlcyA9IFtdO1xuXG4gICAgdGhpcy5yZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcygodmlzaXRlZFZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7ICAvLy9cblxuICAgICAgdmlzaXRlZFZlcnRpY2VzLnB1c2godmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gICAgfSk7XG5cbiAgICB2aXNpdGVkVmVydGljZXMuZm9yRWFjaCgodmlzaXRlZFZlcnRleCkgPT4gdmlzaXRlZFZlcnRleC5yZXNldFZpc2l0ZWQoKSk7XG5cbiAgICByZXR1cm4gdmlzaXRlZFZlcnRpY2VzO1xuICB9XG5cbiAgcmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjaykge1xuICAgIGxldCB0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpc2l0ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuXG4gICAgICBjb25zdCB2aXNpdGVkVmVydGV4ID0gdGhpczsgIC8vL1xuXG4gICAgICB0ZXJtaW5hdGUgPSBjYWxsYmFjayh2aXNpdGVkVmVydGV4KTtcblxuICAgICAgaWYgKHRlcm1pbmF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICB2aXNpdGVkVmVydGV4LnNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkgPT4ge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5yZXRyaWV2ZUZvcndhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIGlmICh0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgfVxuXG4gIHJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKSB7XG4gICAgbGV0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMudmlzaXRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudmlzaXRlZCA9IHRydWU7XG5cbiAgICAgIGNvbnN0IHZpc2l0ZWRWZXJ0ZXggPSB0aGlzOyAgLy8vXG5cbiAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICBpZiAodGVybWluYXRlICE9PSB0cnVlKSB7XG4gICAgICAgIHZpc2l0ZWRWZXJ0ZXguc29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkgPT4ge1xuICAgICAgICAgIHRlcm1pbmF0ZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJldHJpZXZlQmFja3dhcmRzVmlzaXRlZFZlcnRpY2VzKGNhbGxiYWNrKTtcblxuICAgICAgICAgIGlmICh0ZXJtaW5hdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRlcm1pbmF0ZTtcbiAgfVxuXG4gIGZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIGZvckVhY2hJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmZvckVhY2goY2FsbGJhY2spO1xuICB9XG5cbiAgc29tZUltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnNvbWUoY2FsbGJhY2spO1xuICB9XG5cbiAgc29tZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMuc29tZShjYWxsYmFjayk7XG4gIH1cblxuICByZXNldFZpc2l0ZWQoKSB7XG4gICAgdGhpcy52aXNpdGVkID0gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCkge1xuICAgIGNvbnN0IHZpc2l0ZWQgPSBmYWxzZSwgIC8vL1xuICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMgPSBbXSxcbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IFtdLFxuICAgICAgICAgIGRlcGVuZGVuY3lWZXJ0ZXggPSBuZXcgVmVydGV4KG5hbWUsIGluZGV4LCB2aXNpdGVkLCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICByZXR1cm4gZGVwZW5kZW5jeVZlcnRleDtcbiAgfVxufVxuIiwiIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjb25zdCBUUkFDRSA9IFwiVFJBQ0VcIjtcbmV4cG9ydCBjb25zdCBERUJVRyA9IFwiREVCVUdcIjtcbmV4cG9ydCBjb25zdCBJTkZPID0gXCJJTkZPXCI7XG5leHBvcnQgY29uc3QgV0FSTklORyA9IFwiV0FSTklOR1wiO1xuZXhwb3J0IGNvbnN0IEVSUk9SID0gXCJFUlJPUlwiO1xuZXhwb3J0IGNvbnN0IEZBVEFMID0gXCJGQVRBTFwiO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9HX0xFVkVMID0gV0FSTklORztcbmV4cG9ydCBjb25zdCBERUZBVUxUX0xPR19ESVJFQ1RPUllfUEFUSCA9IG51bGw7XG5leHBvcnQgY29uc3QgREVGQVVMVF9MT0dfRklMRV9CQVNFX05BTUUgPSBcImRlZmF1bHRcIjtcblxuZXhwb3J0IGNvbnN0IEdFVF9NRVRIT0QgPSBcIkdFVFwiO1xuZXhwb3J0IGNvbnN0IFBPU1RfTUVUSE9EID0gXCJQT1NUXCI7XG5leHBvcnQgY29uc3QgQVBQTElDQVRJT05fSlNPTl9DSEFSU0VUX1VURjhfQ09OVEVOVF9UWVBFID0gXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIjtcblxuZXhwb3J0IGNvbnN0IERBVEFfRVZFTlQgPSBcImRhdGFcIjtcbmV4cG9ydCBjb25zdCBVVEY4X0VOQ09ESU5HID0gXCJ1dGY4XCI7XG5cbmV4cG9ydCBjb25zdCBDVFJMX0MgPSBcIl5DXCI7XG5leHBvcnQgY29uc3QgRVRYX0NIQVJBQ1RFUiA9IFwiXFx1MDAwM1wiO1xuZXhwb3J0IGNvbnN0IEJBQ0tTUEFDRV9DSEFSQUNURVIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDEyNyk7XG5leHBvcnQgY29uc3QgTElORV9GRUVEX0NIQVJBQ1RFUiA9IFwiXFxuXCI7XG5leHBvcnQgY29uc3QgQ0FSUklBR0VfUkVUVVJOX0NIQVJBQ1RFUiA9IFwiXFxyXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JDX0JBU0VfRVhURU5TSU9OID0gXCJcIjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBwYXRoVXRpbGl0aWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL3BhdGhcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvYXJyYXlcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdGVtcGxhdGVVdGlsaXRpZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvdGVtcGxhdGVcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZmlsZVN5c3RlbVV0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy9maWxlU3lzdGVtXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGFzeW5jaHJvbm91c1V0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy9hc3luY2hyb25vdXNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgbWlzY2VsbGFuZW91c1V0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTt9XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWNvbmQoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzFdOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiB0aGlyZChhcnJheSkgeyByZXR1cm4gYXJyYXlbMl07IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvdXJ0aChhcnJheSkgeyByZXR1cm4gYXJyYXlbM107IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZnRoKGFycmF5KSB7IHJldHVybiBhcnJheVs0XTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZmlmdGhMYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSA1XTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZm91cnRoTGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gNF07IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHRoaXJkTGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gM107IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlY29uZExhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDJdOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gdGFpbChhcnJheSkgeyByZXR1cm4gYXJyYXkuc2xpY2UoMSk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2goYXJyYXkxLCBhcnJheTIpIHsgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYXJyYXkxLCBhcnJheTIpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNoaWZ0KGFycmF5MSwgYXJyYXkyKSB7IEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmFwcGx5KGFycmF5MSwgYXJyYXkyKTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0KGFycmF5MSwgZWxlbWVudE9yQXJyYXkyKSB7XG4gIGNvbnN0IGFycmF5MiA9IChlbGVtZW50T3JBcnJheTIgaW5zdGFuY2VvZiBBcnJheSkgP1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50T3JBcnJheTIgOlxuICAgICAgICAgICAgICAgICAgICAgW2VsZW1lbnRPckFycmF5Ml07XG4gIFxuICBwdXNoKGFycmF5MSwgYXJyYXkyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKGFycmF5KSB7XG4gIGNvbnN0IHN0YXJ0ID0gMDtcbiAgXG4gIHJldHVybiBhcnJheS5zcGxpY2Uoc3RhcnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weShhcnJheTEsIGFycmF5Mikge1xuICBjb25zdCBzdGFydCA9IDAsXG4gICAgICAgIGRlbGV0ZUNvdW50ID0gYXJyYXkyLmxlbmd0aDsgIC8vL1xuICBcbiAgc3BsaWNlKGFycmF5MSwgc3RhcnQsIGRlbGV0ZUNvdW50LCBhcnJheTIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2UoYXJyYXkxLCBhcnJheTIpIHsgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYXJyYXkxLCBhcnJheTIpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGxpY2UoYXJyYXkxLCBzdGFydCwgZGVsZXRlQ291bnQgPSBJbmZpbml0eSwgYXJyYXkyID0gW10pIHtcbiAgY29uc3QgYXJncyA9IFtzdGFydCwgZGVsZXRlQ291bnQsIC4uLmFycmF5Ml0sXG4gICAgICAgIGRlbGV0ZWRJdGVtc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShhcnJheTEsIGFyZ3MpO1xuXG4gIHJldHVybiBkZWxldGVkSXRlbXNBcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UoYXJyYXksIGVsZW1lbnQsIHRlc3QpIHtcbiAgbGV0IHN0YXJ0ID0gLTE7XG4gIFxuICBjb25zdCBmb3VuZCA9IGFycmF5LnNvbWUoKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICBzdGFydCA9IGluZGV4OyAgLy8vXG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIFxuICBpZiAoZm91bmQpIHtcbiAgICBjb25zdCBkZWxldGVDb3VudCA9IDE7XG5cbiAgICBhcnJheS5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50LCBlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBmb3VuZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcihhcnJheSwgdGVzdCkge1xuICBjb25zdCBmaWx0ZXJlZEVsZW1lbnRzID0gW107XG4gIFxuICBiYWNrd2FyZHNGb3JFYWNoKGFycmF5LCAoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcGFzc2VkKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDEsXG4gICAgICAgICAgICBkZWxldGVkRWxlbWVudHMgPSBhcnJheS5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KSxcbiAgICAgICAgICAgIGZpcnN0RGVsZXRlZEVsZW1lbnQgPSBmaXJzdChkZWxldGVkRWxlbWVudHMpO1xuICAgICAgXG4gICAgICBmaWx0ZXJlZEVsZW1lbnRzLnVuc2hpZnQoZmlyc3REZWxldGVkRWxlbWVudCk7ICAvLy9cbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGZpbHRlcmVkRWxlbWVudHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kKGFycmF5LCB0ZXN0KSB7XG4gIGNvbnN0IGVsZW1lbnRzID0gW107XG5cbiAgZm9yd2FyZHNGb3JFYWNoKGFycmF5LCAoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZWxlbWVudHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcnVuZShhcnJheSwgdGVzdCkge1xuICBsZXQgcHJ1bmVkRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgXG4gIGFycmF5LnNvbWUoKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAoIXBhc3NlZCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSAxLFxuICAgICAgICAgICAgZGVsZXRlZEVsZW1lbnRzID0gYXJyYXkuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCksXG4gICAgICAgICAgICBmaXJzdERlbGV0ZWRFbGVtZW50ID0gZmlyc3QoZGVsZXRlZEVsZW1lbnRzKTtcbiAgICAgIFxuICAgICAgcHJ1bmVkRWxlbWVudCA9IGZpcnN0RGVsZXRlZEVsZW1lbnQ7ICAvLy9cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBwcnVuZWRFbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2goYXJyYXksIGVsZW1lbnQsIHRlc3QpIHtcbiAgY29uc3QgZm91bmQgPSBhcnJheS5zb21lKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHBhc3NlZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuXG4gIGlmIChmb3VuZCkge1xuICAgIGFycmF5LnB1c2goZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZm91bmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdWdtZW50KGFycmF5MSwgYXJyYXkyLCB0ZXN0KSB7XG4gIGFycmF5Mi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHBhc3NlZCkge1xuICAgICAgYXJyYXkxLnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcGFyYXRlKGFycmF5LCBhcnJheTEsIGFycmF5MiwgdGVzdCkge1xuICBhcnJheS5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgcGFzc2VkID9cbiAgICAgIGFycmF5MS5wdXNoKGVsZW1lbnQpIDpcbiAgICAgICAgYXJyYXkyLnB1c2goZWxlbWVudCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZHNTb21lKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXlMZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcbiAgICBcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZHNTb21lKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IGFycmF5TGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF0sXG4gICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2soZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZHNFdmVyeShhcnJheSwgY2FsbGJhY2spIHtcbiAgY29uc3QgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFja3dhcmRzRXZlcnkoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gYXJyYXlMZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZHNSZWR1Y2UoYXJyYXksIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgbGV0IHZhbHVlID0gaW5pdGlhbFZhbHVlO1xuXG4gIGZvcndhcmRzRm9yRWFjaChhcnJheSwgKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgdmFsdWUgPSBjYWxsYmFjayh2YWx1ZSwgZWxlbWVudCwgaW5kZXgpO1xuICB9KTtcblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZHNSZWR1Y2UoYXJyYXksIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgbGV0IHZhbHVlID0gaW5pdGlhbFZhbHVlO1xuXG4gIGJhY2t3YXJkc0ZvckVhY2goYXJyYXksIChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIHZhbHVlID0gY2FsbGJhY2sodmFsdWUsIGVsZW1lbnQsIGluZGV4KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXlMZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xuXG4gICAgY2FsbGJhY2soZWxlbWVudCwgaW5kZXgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IGFycmF5TGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBmaXJzdCxcbiAgc2Vjb25kLFxuICB0aGlyZCxcbiAgZm91cnRoLFxuICBmaWZ0aCxcbiAgZmlmdGhMYXN0LFxuICBmb3VydGhMYXN0LFxuICB0aGlyZExhc3QsXG4gIHNlY29uZExhc3QsXG4gIGxhc3QsXG4gIHRhaWwsXG4gIHB1c2gsXG4gIHVuc2hpZnQsXG4gIGNvbmNhdCxcbiAgY2xlYXIsXG4gIGNvcHksXG4gIG1lcmdlLFxuICBzcGxpY2UsXG4gIHJlcGxhY2UsXG4gIGZpbHRlcixcbiAgZmluZCxcbiAgcHJ1bmUsXG4gIHBhdGNoLFxuICBhdWdtZW50LFxuICBzZXBhcmF0ZSxcbiAgZm9yd2FyZHNTb21lLFxuICBiYWNrd2FyZHNTb21lLFxuICBmb3J3YXJkc0V2ZXJ5LFxuICBiYWNrd2FyZHNFdmVyeSxcbiAgZm9yd2FyZHNSZWR1Y2UsXG4gIGJhY2t3YXJkc1JlZHVjZSxcbiAgZm9yd2FyZHNGb3JFYWNoLFxuICBiYWNrd2FyZHNGb3JFYWNoXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd2hpbHN0KGNhbGxiYWNrLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgbGV0IGNvdW50ID0gLTE7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IGluZGV4ID0gY291bnQsICAvLy9cclxuICAgICAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGNvdW50LCAgLy8vXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XHJcblxyXG4gICAgICBjYWxsYmFjayhlbGVtZW50LCBuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZShjYWxsYmFja3MsIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBjYWxsYmFja3MubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGNvdW50LCAgLy8vXHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2tzW2luZGV4XTtcclxuXHJcbiAgICAgIGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV2ZW50dWFsbHkoY2FsbGJhY2tzLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gY2FsbGJhY2tzLmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSAwO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2ssIGluZGV4KSA9PiB7XHJcbiAgICBjYWxsYmFjayhuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXBlYXRlZGx5KGNhbGxiYWNrLCBsZW5ndGgsIGRvbmUsIGNvbnRleHQpIHtcclxuICBsZXQgY291bnQgPSAwO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICBjYWxsYmFjayhuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaywgZG9uZSwgY29udGV4dCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSAtMTtcclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGNvdW50Kys7XHJcblxyXG4gICAgY29uc3QgdGVybWluYXRlID0gKGNvdW50ID09PSBsZW5ndGgpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xyXG5cclxuICAgICAgY2FsbGJhY2soZWxlbWVudCwgbmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYmFja3dhcmRzRm9yRWFjaChhcnJheSwgY2FsbGJhY2ssIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGg7ICAvLy9cclxuXHJcbiAgbGV0IGNvdW50ID0gbGVuZ3RoO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQtLTtcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IC0xKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gY291bnQsICAvLy9cclxuICAgICAgICAgICAgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcclxuXHJcbiAgICAgIGNhbGxiYWNrKGVsZW1lbnQsIG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHdoaWxzdCxcclxuICBmb3JFYWNoLFxyXG4gIHNlcXVlbmNlLFxyXG4gIGV2ZW50dWFsbHksXHJcbiAgcmVwZWF0ZWRseSxcclxuICBmb3J3YXJkc0ZvckVhY2gsXHJcbiAgYmFja3dhcmRzRm9yRWFjaFxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuXG5pbXBvcnQgeyBVVEY4X0VOQ09ESU5HIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9wYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0VudHJ5RXhpc3RzKGVudHJ5UGF0aCkge1xuICBjb25zdCBlbnRyeUV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZW50cnlQYXRoKTtcblxuICByZXR1cm4gZW50cnlFeGlzdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0ZpbGVFeGlzdHMoZmlsZVBhdGgpIHtcbiAgbGV0IGZpbGVFeGlzdHMgPSBmYWxzZTtcbiAgXG4gIGNvbnN0IGVudHJ5UGF0aCA9IGZpbGVQYXRoLCAvLy9cbiAgICAgICAgZW50cnlFeGlzdHMgPSBjaGVja0VudHJ5RXhpc3RzKGVudHJ5UGF0aCk7XG4gIFxuICBpZiAoZW50cnlFeGlzdHMpIHtcbiAgICBjb25zdCBlbnRyeUZpbGUgPSBpc0VudHJ5RmlsZShlbnRyeVBhdGgpO1xuICAgIFxuICAgIGlmIChlbnRyeUZpbGUpIHtcbiAgICAgIGZpbGVFeGlzdHMgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGZpbGVFeGlzdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0RpcmVjdG9yeUV4aXN0cyhkaXJlY3RvcnlQYXRoKSB7XG4gIGxldCBkaXJlY3RvcnlFeGlzdHMgPSBmYWxzZTtcblxuICBjb25zdCBlbnRyeVBhdGggPSBkaXJlY3RvcnlQYXRoLCAvLy9cbiAgICAgICAgZW50cnlFeGlzdHMgPSBjaGVja0VudHJ5RXhpc3RzKGVudHJ5UGF0aCk7XG5cbiAgaWYgKGVudHJ5RXhpc3RzKSB7XG4gICAgY29uc3QgZW50cnlEaXJlY3RvcnkgPSBpc0VudHJ5RGlyZWN0b3J5KGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZW50cnlEaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeUV4aXN0cyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRpcmVjdG9yeUV4aXN0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50cnlGaWxlKGVudHJ5UGF0aCkge1xuICBjb25zdCBzdGF0ID0gZnMuc3RhdFN5bmMoZW50cnlQYXRoKSxcbiAgICAgICAgZW50cnlEaXJlY3RvcnkgPSBzdGF0LmlzRGlyZWN0b3J5KCksXG4gICAgICAgIGVudHJ5RmlsZSA9ICFlbnRyeURpcmVjdG9yeTtcblxuICByZXR1cm4gZW50cnlGaWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbnRyeURpcmVjdG9yeShlbnRyeVBhdGgpIHtcbiAgY29uc3Qgc3RhdCA9IGZzLnN0YXRTeW5jKGVudHJ5UGF0aCksXG4gICAgICAgIGVudHJ5RGlyZWN0b3J5ID0gc3RhdC5pc0RpcmVjdG9yeSgpO1xuXG4gIHJldHVybiBlbnRyeURpcmVjdG9yeTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlyZWN0b3J5RW1wdHkoZGlyZWN0b3J5UGF0aCkge1xuICBjb25zdCBzdWJFbnRyeU5hbWVzID0gcmVhZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgc3ViRW50cnlOYW1lc0xlbmd0aCA9IHN1YkVudHJ5TmFtZXMubGVuZ3RoLFxuICAgICAgICBkaXJlY3RvcnlFbXB0eSA9IChzdWJFbnRyeU5hbWVzTGVuZ3RoID09PSAwKTtcblxuICByZXR1cm4gZGlyZWN0b3J5RW1wdHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHtcbiAgY29uc3Qgc3ViRW50cnlOYW1lcyA9IGZzLnJlYWRkaXJTeW5jKGRpcmVjdG9yeVBhdGgpO1xuXG4gIHJldHVybiBzdWJFbnRyeU5hbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEZpbGUoZmlsZVBhdGgsIGVuY29kaW5nID0gVVRGOF9FTkNPRElORykge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgIGVuY29kaW5nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JpdGVGaWxlKGZpbGVQYXRoLCBjb250ZW50KSB7XG4gIGZzLndyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIGNvbnRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kVG9GaWxlKGZpbGVQYXRoLCBjb250ZW50KSB7XG4gIGZzLmFwcGVuZEZpbGVTeW5jKGZpbGVQYXRoLCBjb250ZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgaWYgKChkaXJlY3RvcnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lICE9PSBcIi5cIikgJiYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgIT09IG51bGwpKSB7XG4gICAgY29uc3QgcGFyZW50RGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsICAvLy9cbiAgICAgICAgICBwYXJlbnREaXJlY3RvcnlFeGlzdHMgPSBjaGVja0RpcmVjdG9yeUV4aXN0cyhwYXJlbnREaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICghcGFyZW50RGlyZWN0b3J5RXhpc3RzKSB7XG4gICAgICBjcmVhdGVEaXJlY3RvcnkocGFyZW50RGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuICB9XG5cbiAgZnMubWtkaXJTeW5jKGRpcmVjdG9yeVBhdGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lRmlsZShvbGRGaWxlUGF0aCwgbmV3RmlsZVBhdGgpIHtcbiAgZnMucmVuYW1lU3luYyhvbGRGaWxlUGF0aCwgbmV3RmlsZVBhdGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhdHMoZmlsZVBhdGgpIHtcbiAgcmV0dXJuIGZzLnN0YXRTeW5jKGZpbGVQYXRoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjaGVja0VudHJ5RXhpc3RzLFxuICBjaGVja0ZpbGVFeGlzdHMsXG4gIGNoZWNrRGlyZWN0b3J5RXhpc3RzLFxuICBpc0VudHJ5RmlsZSxcbiAgaXNFbnRyeURpcmVjdG9yeSxcbiAgaXNEaXJlY3RvcnlFbXB0eSxcbiAgcmVhZERpcmVjdG9yeSxcbiAgcmVhZEZpbGUsXG4gIHdyaXRlRmlsZSxcbiAgYXBwZW5kVG9GaWxlLFxuICBjcmVhdGVEaXJlY3RvcnksXG4gIHJlbmFtZUZpbGUsXG4gIGdldFN0YXRzXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCByYyBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL3JjXCI7XG5pbXBvcnQgbG9nIGZyb20gXCIuL21pc2NlbGxhbmVvdXMvbG9nXCI7XG5pbXBvcnQgb25FVFggZnJvbSBcIi4vbWlzY2VsbGFuZW91cy9vbkVUWFwiO1xuaW1wb3J0IHByb21wdCBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL3Byb21wdFwiO1xuXG5pbXBvcnQgeyBnZXQsIHBvc3QgfSBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL2FqYXhcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBsb2csXG4gIHJjLFxuICBnZXQsXG4gIHBvc3QsXG4gIG9uRVRYLFxuICBwcm9tcHRcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgR0VUX01FVEhPRCwgUE9TVF9NRVRIT0QsIEFQUExJQ0FUSU9OX0pTT05fQ0hBUlNFVF9VVEY4X0NPTlRFTlRfVFlQRSB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldChob3N0LCB1cmksIHBhcmFtZXRlcnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2FsbGJhY2sgPSBwYXJhbWV0ZXJzOyAvLy9cbiAgICBwYXJhbWV0ZXJzID0ge307XG4gIH1cblxuICBjb25zdCBtZXRob2QgPSBHRVRfTUVUSE9ELFxuICAgICAgICBib2R5ID0gdW5kZWZpbmVkO1xuXG4gIHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGJvZHksIGNhbGxiYWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvc3QoaG9zdCwgdXJpLCBqc29uLCBwYXJhbWV0ZXJzLCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgIGNhbGxiYWNrID0gcGFyYW1ldGVyczsgLy8vXG4gICAgcGFyYW1ldGVycyA9IHt9O1xuICB9XG5cbiAgY29uc3QgbWV0aG9kID0gUE9TVF9NRVRIT0QsXG4gICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcblxuICByZXF1ZXN0KGhvc3QsIHVyaSwgcGFyYW1ldGVycywgbWV0aG9kLCBib2R5LCBjYWxsYmFjayk7XG59XG5cbmZ1bmN0aW9uIHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGJvZHksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHVybCA9IHVybEZyb21Ib3N0VVJJQW5kUGFyYW1ldGVycyhob3N0LCB1cmksIHBhcmFtZXRlcnMpLFxuICAgICAgICB4bWxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHhtbEh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IHJlYWR5U3RhdGUsIHN0YXR1cywgcmVzcG9uc2VUZXh0IH0gPSB4bWxIdHRwUmVxdWVzdDtcblxuICAgIGlmIChyZWFkeVN0YXRlID09IDQpIHtcbiAgICAgIGxldCBqc29uID0gbnVsbDtcblxuICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IHJlc3BvbnNlVGV4dDsgLy8vXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLy9cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGxiYWNrKGpzb24pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjb250ZW50VHlwZSA9IEFQUExJQ0FUSU9OX0pTT05fQ0hBUlNFVF9VVEY4X0NPTlRFTlRfVFlQRTtcblxuICB4bWxIdHRwUmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsKTtcblxuICB4bWxIdHRwUmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiY29udGVudC10eXBlXCIsIGNvbnRlbnRUeXBlKTtcblxuICB4bWxIdHRwUmVxdWVzdC5zZW5kKGJvZHkpO1xufVxuXG5mdW5jdGlvbiBxdWVyeVN0cmluZ0Zyb21QYXJhbWV0ZXJzKHBhcmFtZXRlcnMpIHtcbiAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKSxcbiAgICAgICAgbmFtZXNMZW5ndGggPSBuYW1lcy5sZW5ndGgsXG4gICAgICAgIGxhc3RJbmRleCA9IG5hbWVzTGVuZ3RoIC0gMSxcbiAgICAgICAgcXVlcnlTdHJpbmcgPSBuYW1lcy5yZWR1Y2UoKHF1ZXJ5U3RyaW5nLCBuYW1lLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gcGFyYW1ldGVyc1tuYW1lXSxcbiAgICAgICAgICAgICAgICBlbmNvZGVkTmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSxcbiAgICAgICAgICAgICAgICBlbmNvZGVkVmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLFxuICAgICAgICAgICAgICAgIGFtcGVyc2FuZE9yTm90aGluZyA9IChpbmRleCAhPT0gbGFzdEluZGV4KSA/IFwiJlwiIDogXCJcIjtcbiAgXG4gICAgICAgICAgcXVlcnlTdHJpbmcgKz0gYCR7ZW5jb2RlZE5hbWV9PSR7ZW5jb2RlZFZhbHVlfSR7YW1wZXJzYW5kT3JOb3RoaW5nfWA7XG4gIFxuICAgICAgICAgIHJldHVybiBxdWVyeVN0cmluZztcbiAgICAgICAgfSwgXCJcIik7XG5cbiAgcmV0dXJuIHF1ZXJ5U3RyaW5nO1xufVxuXG5mdW5jdGlvbiB1cmxGcm9tSG9zdFVSSUFuZFBhcmFtZXRlcnMoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzKSB7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmdGcm9tUGFyYW1ldGVycyhwYXJhbWV0ZXJzKSxcbiAgICAgICAgdXJsID0gKHF1ZXJ5U3RyaW5nID09PSBcIlwiKSA/XG4gICAgICAgICAgICAgIGAke2hvc3R9JHt1cml9YCA6XG4gICAgICAgICAgICAgICAgYCR7aG9zdH0ke3VyaX0/JHtxdWVyeVN0cmluZ31gO1xuXG4gIHJldHVybiB1cmw7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgc2Vjb25kIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHsgY29uY2F0ZW5hdGVQYXRocyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvcGF0aFwiO1xuaW1wb3J0IHsgY2hlY2tGaWxlRXhpc3RzLCByZWFkRmlsZSwgYXBwZW5kVG9GaWxlLCByZW5hbWVGaWxlLCBnZXRTdGF0cyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvZmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgVFJBQ0UsIERFQlVHLCBJTkZPLCBXQVJOSU5HLCBFUlJPUiwgRkFUQUwsIERFRkFVTFRfTE9HX0xFVkVMLCBERUZBVUxUX0xPR19GSUxFX0JBU0VfTkFNRSwgREVGQVVMVF9MT0dfRElSRUNUT1JZX1BBVEggfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5cbmxldCBsb2dMZXZlbCA9IERFRkFVTFRfTE9HX0xFVkVMLFxuICAgIGxvZ0ZpbGVCYXNlTmFtZSA9IERFRkFVTFRfTE9HX0ZJTEVfQkFTRV9OQU1FLFxuICAgIGxvZ0RpcmVjdG9yeVBhdGggPSBERUZBVUxUX0xPR19ESVJFQ1RPUllfUEFUSDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKG1lc3NhZ2VPckVycm9yLCBsZXZlbCA9IFwiXCIpIHtcbiAgbGV0IHNhbGllbnRTdGFja01lc3NhZ2VJbmRleCA9IDE7XG5cbiAgY29uc3QgbGV2ZWxzID0gW1xuICAgIFRSQUNFLFxuICAgIERFQlVHLFxuICAgIElORk8sXG4gICAgV0FSTklORyxcbiAgICBFUlJPUixcbiAgICBGQVRBTCxcbiAgXTtcblxuICBpZiAobGV2ZWwgIT09IFwiXCIpIHtcbiAgICBjb25zdCBsZXZlbEluZGV4ID0gbGV2ZWxzLmluZGV4T2YobGV2ZWwpLFxuICAgICAgICAgIGxvZ0xldmVsSW5kZXggPSBsZXZlbHMuaW5kZXhPZihsb2dMZXZlbCk7XG5cbiAgICBpZiAobGV2ZWxJbmRleCA8IGxvZ0xldmVsSW5kZXgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzYWxpZW50U3RhY2tNZXNzYWdlSW5kZXggKz0gMTtcblxuICAgIGxldmVsID0gYCR7bGV2ZWx9IGA7ICAvLy9cbiAgfVxuXG4gIGxldCBlcnJvcixcbiAgICAgIG1lc3NhZ2U7XG5cbiAgaWYgKG1lc3NhZ2VPckVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICBlcnJvciA9IG1lc3NhZ2VPckVycm9yOyAvLy9cblxuICAgICh7IG1lc3NhZ2UgfSA9IGVycm9yKTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlID0gbWVzc2FnZU9yRXJyb3I7IC8vL1xuXG4gICAgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICBjb25zdCB7IHN0YWNrIH0gPSBlcnJvcixcbiAgICAgICAgc3RhY2tNZXNzYWdlcyA9IHN0YWNrTWVzc2FnZXNGcm9tU3RhY2soc3RhY2spLFxuICAgICAgICBwZXJ0aW5lbnRTdGFja01lc3NhZ2UgPSBzdGFja01lc3NhZ2VzW3NhbGllbnRTdGFja01lc3NhZ2VJbmRleF0sXG4gICAgICAgIHN0YWNrTWVzc2FnZSA9IHBlcnRpbmVudFN0YWNrTWVzc2FnZSwgLy8vXG4gICAgICAgIGN1cnJlbnREYXRlQW5kVGltZVN0cmluZyA9IGdldEN1cnJlbnREYXRlQW5kVGltZVN0cmluZygpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoRnJvbVN0YWNrTWVzc2FnZShzdGFja01lc3NhZ2UpLFxuICAgICAgICBsaW5lTnVtYmVyID0gbGluZU51bWJlckZyb21TdGFja01lc3NhZ2Uoc3RhY2tNZXNzYWdlKSxcbiAgICAgICAgbG9nTWVzc2FnZSA9IGAke2xldmVsfSR7Y3VycmVudERhdGVBbmRUaW1lU3RyaW5nfSAke2ZpbGVQYXRofSgke2xpbmVOdW1iZXJ9KSAke21lc3NhZ2V9YDtcblxuICBjb25zb2xlLmxvZyhsb2dNZXNzYWdlKTtcblxuICBpZiAobG9nRGlyZWN0b3J5UGF0aCAhPT0gbnVsbCkge1xuICAgIHJvbGxPdmVyTG9nRmlsZSgpO1xuXG4gICAgY29uc3QgbG9nRmlsZVBhdGggPSBnZXRMb2dGaWxlUGF0aCgpLFxuICAgICAgICAgIGxvZ0ZpbGVDb250ZW50ID0gYCR7bG9nTWVzc2FnZX1cXG5gO1xuXG4gICAgYXBwZW5kVG9GaWxlKGxvZ0ZpbGVQYXRoLCBsb2dGaWxlQ29udGVudCk7XG4gIH1cblxuICByZXR1cm4gbG9nTWVzc2FnZTtcbn1cblxuZnVuY3Rpb24gdHJhY2UobWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIFRSQUNFKTsgfVxuXG5mdW5jdGlvbiBkZWJ1ZyhtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgREVCVUcpOyB9XG5cbmZ1bmN0aW9uIGluZm8obWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIElORk8pOyB9XG5cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIFdBUk5JTkcpOyB9XG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UpIHsgcmV0dXJuIGxvZyhtZXNzYWdlLCBFUlJPUik7IH1cblxuZnVuY3Rpb24gZmF0YWwobWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIEZBVEFMKTsgfVxuXG5mdW5jdGlvbiBzZXRMb2dMZXZlbChsZXZlbCkgeyBsb2dMZXZlbCA9IGxldmVsOyB9XG5cbmZ1bmN0aW9uIHNldExvZ0ZpbGVCYXNlTmFtZShmaWxlQmFzZU5hbWUpIHsgbG9nRmlsZUJhc2VOYW1lID0gZmlsZUJhc2VOYW1lOyB9XG5cbmZ1bmN0aW9uIHNldExvZ0RpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCkgeyBsb2dEaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aDsgfVxuXG5mdW5jdGlvbiBzZXRMb2dPcHRpb25zKGxvZ09wdGlvbnMpIHtcbiAgY29uc3QgeyBsZXZlbCwgZmlsZUJhc2VOYW1lLCBkaXJlY3RvcnlQYXRoIH0gPSBsb2dPcHRpb25zO1xuXG4gIHNldExvZ0xldmVsKGxldmVsKTtcblxuICBzZXRMb2dGaWxlQmFzZU5hbWUoZmlsZUJhc2VOYW1lKTtcblxuICBzZXRMb2dEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xufVxuXG5mdW5jdGlvbiBnZXRMb2dGaWxlQ29udGVudCgpIHtcbiAgY29uc3QgbG9nRmlsZVBhdGggPSBnZXRMb2dGaWxlUGF0aCgpLFxuICAgICAgICBsb2dGaWxlQ29udGVudCA9IHJlYWRGaWxlKGxvZ0ZpbGVQYXRoKTtcblxuICByZXR1cm4gbG9nRmlsZUNvbnRlbnQ7XG59XG5cbk9iamVjdC5hc3NpZ24obG9nLCB7XG4gIFRSQUNFLFxuICBERUJVRyxcbiAgSU5GTyxcbiAgV0FSTklORyxcbiAgRVJST1IsXG4gIEZBVEFMLFxuICB0cmFjZSxcbiAgZGVidWcsXG4gIGluZm8sXG4gIHdhcm5pbmcsXG4gIGVycm9yLFxuICBmYXRhbCxcbiAgc2V0TG9nTGV2ZWwsXG4gIHNldExvZ0ZpbGVCYXNlTmFtZSxcbiAgc2V0TG9nRGlyZWN0b3J5UGF0aCxcbiAgc2V0TG9nT3B0aW9ucyxcbiAgZ2V0TG9nRmlsZUNvbnRlbnRcbn0pO1xuXG5mdW5jdGlvbiBnZXRMb2dGaWxlUGF0aCgpIHtcbiAgY29uc3QgbG9nRmlsZU5hbWUgPSBgJHtsb2dGaWxlQmFzZU5hbWV9LmxvZ2AsXG4gICAgICAgIGxvZ0ZpbGVQYXRoID0gY29uY2F0ZW5hdGVQYXRocyhsb2dEaXJlY3RvcnlQYXRoLCBsb2dGaWxlTmFtZSk7XG5cbiAgcmV0dXJuIGxvZ0ZpbGVQYXRoO1xufVxuXG5mdW5jdGlvbiBnZXRSb2xsZWRPdmVyTG9nRmlsZVBhdGgoKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlU3RyaW5nID0gZ2V0Q3VycmVudERhdGVTdHJpbmcoKSxcbiAgICAgICAgcm9sbGVkT3ZlckxvZ0ZpbGVOYW1lID0gYCR7bG9nRmlsZUJhc2VOYW1lfS4ke2N1cnJlbnREYXRlU3RyaW5nfS5sb2dgLFxuICAgICAgICByb2xsZWRPdmVyTG9nRmlsZVBhdGggPSBjb25jYXRlbmF0ZVBhdGhzKGxvZ0RpcmVjdG9yeVBhdGgsIHJvbGxlZE92ZXJMb2dGaWxlTmFtZSk7XG5cbiAgcmV0dXJuIHJvbGxlZE92ZXJMb2dGaWxlUGF0aDtcbn1cblxuZnVuY3Rpb24gZ2V0TG9nRmlsZUxhc3RNb2RpZmllZERhdGUoKSB7XG4gIGNvbnN0IGxvZ0ZpbGVQYXRoID0gZ2V0TG9nRmlsZVBhdGgoKSxcbiAgICAgICAgbG9nRmlsZVN0YXRzID0gZ2V0U3RhdHMobG9nRmlsZVBhdGgpLFxuICAgICAgICB7IG10aW1lIH0gPSBsb2dGaWxlU3RhdHMsXG4gICAgICAgIGxvZ0ZpbGVMYXN0TW9kaWZpZWREYXRlID0gbmV3IERhdGUobXRpbWUpOyAgLy8vXG5cbiAgcmV0dXJuIGxvZ0ZpbGVMYXN0TW9kaWZpZWREYXRlO1xufVxuXG5mdW5jdGlvbiByb2xsT3ZlckxvZ0ZpbGUoKSB7XG4gIGNvbnN0IGxvZ0ZpbGVQYXRoID0gZ2V0TG9nRmlsZVBhdGgoKSxcbiAgICAgICAgbG9nRmlsZUV4aXN0cyA9IGNoZWNrRmlsZUV4aXN0cyhsb2dGaWxlUGF0aCk7XG5cbiAgaWYgKCFsb2dGaWxlRXhpc3RzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbG9nRmlsZUxhc3RNb2RpZmllZERhdGUgPSBnZXRMb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZSgpLFxuICAgICAgICBsb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZUN1cnJlbnREYXRlID0gaXNEYXRlQ3VycmVudERhdGUobG9nRmlsZUxhc3RNb2RpZmllZERhdGUpO1xuXG4gIGlmICghbG9nRmlsZUxhc3RNb2RpZmllZERhdGVDdXJyZW50RGF0ZSkge1xuICAgIGNvbnN0IHJvbGxlZE92ZXJMb2dGaWxlUGF0aCA9IGdldFJvbGxlZE92ZXJMb2dGaWxlUGF0aCgpO1xuXG4gICAgcmVuYW1lRmlsZShsb2dGaWxlUGF0aCwgcm9sbGVkT3ZlckxvZ0ZpbGVQYXRoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0RhdGVDdXJyZW50RGF0ZShkYXRlKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgZGF0ZVN0cmluZyA9IGRhdGUudG9EYXRlU3RyaW5nKCksXG4gICAgICAgIGN1cnJlbnREYXRlU3RyaW5nID0gY3VycmVudERhdGUudG9EYXRlU3RyaW5nKCksXG4gICAgICAgIGRhdGVDdXJyZW50RGF0ZSA9IChkYXRlU3RyaW5nID09PSBjdXJyZW50RGF0ZVN0cmluZyk7XG5cbiAgcmV0dXJuIGRhdGVDdXJyZW50RGF0ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudERhdGVTdHJpbmcoKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXkgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXREYXRlKCksIDIpLCAgLy8vXG4gICAgICAgIG1vbnRoID0gcGFkU3RhcnRXaXRoWmVyb2VzKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpLCAvLy9cbiAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgY3VycmVudERhdGVBbmRUaW1lU3RyaW5nID0gYCR7ZGF5fS0ke21vbnRofS0ke3llYXJ9YDtcblxuICByZXR1cm4gY3VycmVudERhdGVBbmRUaW1lU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmcoKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXkgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXREYXRlKCksIDIpLCAgLy8vXG4gICAgICAgIG1vbnRoID0gcGFkU3RhcnRXaXRoWmVyb2VzKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpLCAvLy9cbiAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgaG91cnMgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRIb3VycygpLCAyKSxcbiAgICAgICAgbWludXRlcyA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldE1pbnV0ZXMoKSwgMiksXG4gICAgICAgIHNlY29uZHMgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRTZWNvbmRzKCksIDIpLFxuICAgICAgICBtaWxsaXNlY29uZHMgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMyksXG4gICAgICAgIGN1cnJlbnREYXRlQW5kVGltZVN0cmluZyA9IGAke2RheX0tJHttb250aH0tJHt5ZWFyfSAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc30uJHttaWxsaXNlY29uZHN9YDtcblxuICByZXR1cm4gY3VycmVudERhdGVBbmRUaW1lU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBzdGFja01lc3NhZ2VzRnJvbVN0YWNrKHN0YWNrKSB7XG4gIGNvbnN0IHN0YWNrTWVzc2FnZXMgPSBbXSxcbiAgICAgICAgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KC9cXHJcXG58XFxuLyk7XG5cbiAgbGV0IHN0YWNrTWVzc2FnZSA9IFwiXCI7XG5cbiAgc3RhY2tMaW5lcy5mb3JFYWNoKChzdGFja0xpbmUpID0+IHtcbiAgICBjb25zdCBtYXRjaGVzID0gL15cXHMqYXQuKi8udGVzdChzdGFja0xpbmUpO1xuXG4gICAgc3RhY2tNZXNzYWdlID0gKHN0YWNrTWVzc2FnZSA9PT0gXCJcIikgP1xuICAgICAgICAgICAgICAgICAgICAgIHN0YWNrTGluZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBgJHtzdGFja01lc3NhZ2V9XFxuJHtzdGFja0xpbmV9YDtcblxuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICBzdGFja01lc3NhZ2VzLnB1c2goc3RhY2tNZXNzYWdlKTtcblxuICAgICAgc3RhY2tNZXNzYWdlID0gXCJcIjtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzdGFja01lc3NhZ2VzO1xufVxuXG5mdW5jdGlvbiBmaWxlUGF0aEZyb21TdGFja01lc3NhZ2Uoc3RhY2tNZXNzYWdlKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBzdGFja01lc3NhZ2UubWF0Y2goLyhcXC8uKyk6XFxkKzpcXGQrL20pLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKSxcbiAgICAgICAgYWJzb2x1dGVGaWxlUGF0aCA9IHNlY29uZE1hdGNoLCAgLy8vXG4gICAgICAgIGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCA9IHBhdGgucmVzb2x2ZShcIi5cIiksICAvLy9cbiAgICAgICAgY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoTGVuZ3RoID0gY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoLmxlbmd0aCxcbiAgICAgICAgc3RhcnQgPSBjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGhMZW5ndGggKyAxLCAgLy8vXG4gICAgICAgIGZpbGVQYXRoID0gYWJzb2x1dGVGaWxlUGF0aC5zdWJzdHIoc3RhcnQpO1xuXG4gIHJldHVybiBmaWxlUGF0aDtcbn1cblxuZnVuY3Rpb24gbGluZU51bWJlckZyb21TdGFja01lc3NhZ2Uoc3RhY2tNZXNzYWdlKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBzdGFja01lc3NhZ2UubWF0Y2goLzooXFxkKykvbSksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpLFxuICAgICAgICBsaW5lTnVtYmVyID0gc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBsaW5lTnVtYmVyO1xufVxuXG5mdW5jdGlvbiBwYWRTdGFydFdpdGhaZXJvZXMoc3RyaW5nLCB0YXJnZXRMZW5ndGgpIHtcbiAgY29uc3QgcGFkU3RyaW5nID0gXCIwXCIsXG4gICAgICAgIHBhZGRlZFN0cmluZyA9IHBhZFN0YXJ0KHN0cmluZywgdGFyZ2V0TGVuZ3RoLCBwYWRTdHJpbmcpO1xuXG4gIHJldHVybiBwYWRkZWRTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHBhZFN0YXJ0KHN0cmluZywgdGFyZ2V0TGVuZ3RoLCBwYWRTdHJpbmcpIHtcbiAgbGV0IHBhZGRpbmcgPSBcIlwiO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0YXJnZXRMZW5ndGg7IGluZGV4KyspIHtcbiAgICBwYWRkaW5nICs9IHBhZFN0cmluZztcbiAgfVxuXG4gIGNvbnN0IHBhZGRlZFN0cmluZyA9IGAke3BhZGRpbmd9JHtzdHJpbmd9YC5zdWJzdHIoLXRhcmdldExlbmd0aCk7XG5cbiAgcmV0dXJuIHBhZGRlZFN0cmluZztcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBEQVRBX0VWRU5ULCBFVFhfQ0hBUkFDVEVSLCBVVEY4X0VOQ09ESU5HIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbkVUWChoYW5kbGVyKSB7XG4gIGNvbnN0IGV2ZW50ID0gREFUQV9FVkVOVDtcblxuICBpZiAocHJvY2Vzcy5zdGRpbi5zZXRSYXdNb2RlKSB7XG4gICAgY29uc3QgcmF3TW9kZSA9IHRydWUsXG4gICAgICAgICAgZW5jb2RpbmcgPSBVVEY4X0VOQ09ESU5HO1xuXG4gICAgcHJvY2Vzcy5zdGRpbi5zZXRSYXdNb2RlKHJhd01vZGUpO1xuICAgIHByb2Nlc3Muc3RkaW4uc2V0RW5jb2RpbmcoZW5jb2RpbmcpO1xuXG4gICAgcHJvY2Vzcy5zdGRpbi5yZXN1bWUoKTtcblxuICAgIHByb2Nlc3Muc3RkaW4uYWRkTGlzdGVuZXIoZXZlbnQsIGRhdGFIYW5kbGVyKTtcblxuICAgIHJldHVybiBvZmZFeHQ7XG4gIH1cblxuICBmdW5jdGlvbiBvZmZFeHQoKSB7XG4gICAgcHJvY2Vzcy5zdGRpbi5yZW1vdmVMaXN0ZW5lcihldmVudCwgZGF0YUhhbmRsZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0YUhhbmRsZXIoY2hhcmFjdGVyKSB7XG4gICAgaWYgKGNoYXJhY3RlciA9PT0gRVRYX0NIQVJBQ1RFUikge1xuICAgICAgaGFuZGxlcigpO1xuICAgIH1cbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBvbkVUWCBmcm9tIFwiLi9vbkVUWFwiO1xuXG5pbXBvcnQgeyB3aGlsc3QgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL2FzeW5jaHJvbm91c1wiO1xuXG5pbXBvcnQgeyBDVFJMX0MsIERBVEFfRVZFTlQsIEJBQ0tTUEFDRV9DSEFSQUNURVIsIExJTkVfRkVFRF9DSEFSQUNURVIsIENBUlJJQUdFX1JFVFVSTl9DSEFSQUNURVIgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb21wdChvcHRpb25zLCBjYWxsYmFjaykge1xuICBjb25zdCB2YWx1ZSA9IG51bGwsXG4gICAgICAgIHsgYXR0ZW1wdHMgPSAzIH0gPSBvcHRpb25zLFxuICAgICAgICBjb250ZXh0ID0ge1xuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGF0dGVtcHRzLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfTtcblxuICB3aGlsc3QoYXR0ZW1wdCwgKCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGNvbnRleHQ7XG4gICAgXG4gICAgY2FsbGJhY2sodmFsdWUpO1xuICB9LCBjb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gYXR0ZW1wdChuZXh0LCBkb25lLCBjb250ZXh0KSB7XG4gIGxldCB7IGF0dGVtcHRzIH0gPSBjb250ZXh0O1xuXG4gIGNvbnN0IHRlcm1pbmF0ZSA9IChhdHRlbXB0cy0tID09PSAwKTtcbiAgXG4gIGlmICh0ZXJtaW5hdGUpIHtcbiAgICBkb25lKCk7XG4gICAgXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBvcHRpb25zIH0gPSBjb250ZXh0LFxuICAgICAgICB7IGhpZGRlbiA9IGZhbHNlLFxuICAgICAgICAgIGVuY29kaW5nID0gXCJ1dGY4XCIsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgaW5pdGlhbFZhbHVlID0gXCJcIixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvblBhdHRlcm4sXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uIH0gPSBvcHRpb25zO1xuXG4gIGlucHV0KGRlc2NyaXB0aW9uLCBpbml0aWFsVmFsdWUsIGVuY29kaW5nLCBoaWRkZW4sIGNhbGxiYWNrKTtcblxuICBmdW5jdGlvbiBjYWxsYmFjayh2YWx1ZSkge1xuICAgIGNvbnN0IHZhbGlkID0gdmFsaWRhdGlvbkZ1bmN0aW9uID8gIC8vL1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb24odmFsdWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUGF0dGVybi50ZXN0KHZhbHVlKTtcblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcblxuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIGF0dGVtcHRzXG4gICAgICB9KTtcblxuICAgICAgbmV4dCgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbnB1dChkZXNjcmlwdGlvbiwgaW5pdGlhbFZhbHVlLCBlbmNvZGluZywgaGlkZGVuLCBjYWxsYmFjaykge1xuICBsZXQgdmFsdWUgPSBpbml0aWFsVmFsdWU7IC8vL1xuXG4gIGNvbnN0IGV2ZW50ID0gREFUQV9FVkVOVCxcbiAgICAgICAgcmF3TW9kZSA9IHRydWUsXG4gICAgICAgIG9mZkVUWCA9IG9uRVRYKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhDVFJMX0MpO1xuXG4gICAgICAgICAgcHJvY2Vzcy5leGl0KCk7XG4gICAgICAgIH0pO1xuXG4gIHByb2Nlc3Muc3RkaW4uc2V0RW5jb2RpbmcoZW5jb2RpbmcpO1xuXG4gIHByb2Nlc3Muc3RkaW4uc2V0UmF3TW9kZShyYXdNb2RlKTtcblxuICBwcm9jZXNzLnN0ZG91dC53cml0ZShkZXNjcmlwdGlvbik7XG5cbiAgaWYgKCFoaWRkZW4pIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSh2YWx1ZSk7XG4gIH1cblxuICBwcm9jZXNzLnN0ZGluLnJlc3VtZSgpO1xuXG4gIHByb2Nlc3Muc3RkaW4ub24oZXZlbnQsIGxpc3RlbmVyKTtcblxuICBmdW5jdGlvbiBsaXN0ZW5lcihjaHVuaykge1xuICAgIGNvbnN0IGNoYXJhY3RlciA9IGNodW5rLnRvU3RyaW5nKGVuY29kaW5nKTtcblxuICAgIHN3aXRjaCAoY2hhcmFjdGVyKSB7XG4gICAgICBjYXNlIExJTkVfRkVFRF9DSEFSQUNURVIgOlxuICAgICAgY2FzZSBDQVJSSUFHRV9SRVRVUk5fQ0hBUkFDVEVSIDpcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoTElORV9GRUVEX0NIQVJBQ1RFUik7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRpbi5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuXG4gICAgICAgIHByb2Nlc3Muc3RkaW4ucGF1c2UoKTtcblxuICAgICAgICBvZmZFVFgoKTtcblxuICAgICAgICBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEJBQ0tTUEFDRV9DSEFSQUNURVIgOlxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LmNsZWFyTGluZSgpO1xuXG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LmN1cnNvclRvKDApO1xuXG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICBpZiAoIWhpZGRlbikge1xuICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgKz0gY2hhcmFjdGVyO1xuXG4gICAgICAgIGlmICghaGlkZGVuKSB7XG4gICAgICAgICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKCk7XG5cbiAgICAgICAgICBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbygwKTtcblxuICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBmaXJzdCwgc2Vjb25kIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHsgREVGQVVMVF9SQ19CQVNFX0VYVEVOU0lPTiB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHJlYWRGaWxlLCB3cml0ZUZpbGUsIGNoZWNrRmlsZUV4aXN0cyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvZmlsZVN5c3RlbVwiO1xuXG5sZXQgcGF0aFJlc29sdmVyID0gcGF0aC5yZXNvbHZlLFxuICAgIGJhc2VFeHRlbnNpb24gPSBERUZBVUxUX1JDX0JBU0VfRVhURU5TSU9OO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYyhlbnZpcm9ubWVudE5hbWVPckFyZ3YgPSBudWxsKSB7XG4gIGxldCBlbnZpcm9ubWVudCxcbiAgICAgIGVudmlyb25tZW50TmFtZSxcbiAgICAgIGVudmlyb25tZW50TmFtZU9yQXJndkFyZ3YgPSAoZW52aXJvbm1lbnROYW1lT3JBcmd2IGluc3RhbmNlb2YgQXJyYXkpO1xuXG4gIGlmIChlbnZpcm9ubWVudE5hbWVPckFyZ3ZBcmd2KSB7XG4gICAgY29uc3QgYXJndiA9IGVudmlyb25tZW50TmFtZU9yQXJndjsgLy8vXG5cbiAgICBlbnZpcm9ubWVudE5hbWUgPSBlbnZpcm9ubWVudE5hbWVGcm9tQXJndihhcmd2KTtcbiAgfSBlbHNlIHtcbiAgICBlbnZpcm9ubWVudE5hbWUgPSBlbnZpcm9ubWVudE5hbWVPckFyZ3Y7ICAvLy9cbiAgfVxuXG4gIGNvbnN0IGpzb24gPSByZWFkUkNGaWxlKCksXG4gICAgICAgIHsgZW52aXJvbm1lbnRzIH0gPSBqc29uO1xuXG4gIGlmIChlbnZpcm9ubWVudE5hbWUgPT09IG51bGwpIHtcbiAgICBjb25zdCBmaXJzdEVudmlyb25tZW50ID0gZmlyc3QoZW52aXJvbm1lbnRzKTtcblxuICAgIGVudmlyb25tZW50ID0gZmlyc3RFbnZpcm9ubWVudDsgLy8vXG4gIH0gZWxzZSB7XG4gICAgZW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudHMuZmluZCgoZW52aXJvbm1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZSB9ID0gZW52aXJvbm1lbnQsXG4gICAgICAgICAgICBmb3VuZCA9IChuYW1lID09PSBlbnZpcm9ubWVudE5hbWUpO1xuXG4gICAgICByZXR1cm4gZm91bmQ7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGUgZW52aXJvbm1lbnQubmFtZTtcblxuICBPYmplY3QuYXNzaWduKHJjLCBlbnZpcm9ubWVudCk7XG5cbiAgcmV0dXJuIGVudmlyb25tZW50O1xufVxuXG5mdW5jdGlvbiByZWFkUkNGaWxlKCkge1xuICBjb25zdCBhYnNvbHV0ZVJDRmlsZVBhdGggPSBhYnNvbHV0ZVJDRmlsZVBhdGhGcm9tTm90aGluZygpLFxuICAgICAgICBmaWxlQ29udGVudCA9IHJlYWRGaWxlKGFic29sdXRlUkNGaWxlUGF0aCksXG4gICAgICAgIGpzb24gPSBKU09OLnBhcnNlKGZpbGVDb250ZW50KTtcblxuICByZXR1cm4ganNvbjsgICAgICBcbn1cblxuZnVuY3Rpb24gd3JpdGVSQ0ZpbGUoanNvbikge1xuICBjb25zdCBhYnNvbHV0ZVJDRmlsZVBhdGggPSBhYnNvbHV0ZVJDRmlsZVBhdGhGcm9tTm90aGluZygpLFxuICAgICAgICBmaWxlQ29udGVudCA9IEpTT04uc3RyaW5naWZ5KGpzb24sIG51bGwsIGBcXHRgKTtcblxuICB3cml0ZUZpbGUoYWJzb2x1dGVSQ0ZpbGVQYXRoLCBmaWxlQ29udGVudCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVJDRmlsZShhZGRlZFByb3BlcnRpZXMsIC4uLmRlbGV0ZWRQcm9wZXJ0eU5hbWVzKSB7XG4gIGxldCBqc29uID0gcmVhZFJDRmlsZSgpO1xuXG4gIGlmIChhZGRlZFByb3BlcnRpZXMpIHtcbiAgICBPYmplY3QuYXNzaWduKGpzb24sIGFkZGVkUHJvcGVydGllcyk7XG4gIH1cblxuICBkZWxldGVkUHJvcGVydHlOYW1lcy5mb3JFYWNoKChkZWxldGVkUHJvcGVydHlOYW1lKSA9PiB7XG4gICAgZGVsZXRlIGpzb25bZGVsZXRlZFByb3BlcnR5TmFtZV07XG4gIH0pO1xuXG4gIHdyaXRlUkNGaWxlKGpzb24pOyAgICAgIFxufVxuXG5mdW5jdGlvbiBjaGVja1JDRmlsZUV4aXN0cygpIHtcbiAgY29uc3QgYWJzb2x1dGVSQ0ZpbGVQYXRoID0gYWJzb2x1dGVSQ0ZpbGVQYXRoRnJvbU5vdGhpbmcoKSxcbiAgICAgICAgcmNGaWxlRXhpc3RzID0gY2hlY2tGaWxlRXhpc3RzKGFic29sdXRlUkNGaWxlUGF0aCk7XG5cbiAgcmV0dXJuIHJjRmlsZUV4aXN0cztcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmFjdW91c1JDRmlsZSgpIHtcbiAgY29uc3QganNvbiA9IHtcbiAgICBcImVudmlyb25tZW50c1wiOiBbXG4gICAgICB7fVxuICAgIF1cbiAgfTtcblxuICB3cml0ZVJDRmlsZShqc29uKTtcbn1cblxuZnVuY3Rpb24gc2V0UkNCYXNlRXh0ZW5zaW9uKHJjQmFzZUV4dGVuc2lvbikgeyBiYXNlRXh0ZW5zaW9uID0gcmNCYXNlRXh0ZW5zaW9uOyB9XG5cbmZ1bmN0aW9uIHNldFJDUGF0aFJlc29sdmVyKHJjUGF0aFJlc29sdmVyKSB7IHBhdGhSZXNvbHZlciA9IHJjUGF0aFJlc29sdmVyOyB9XG5cbk9iamVjdC5hc3NpZ24ocmMsIHtcbiAgcmVhZFJDRmlsZSxcbiAgd3JpdGVSQ0ZpbGUsXG4gIHVwZGF0ZVJDRmlsZSxcbiAgY2hlY2tSQ0ZpbGVFeGlzdHMsXG4gIGNyZWF0ZVZhY3VvdXNSQ0ZpbGUsXG4gIHNldFJDQmFzZUV4dGVuc2lvbixcbiAgc2V0UkNQYXRoUmVzb2x2ZXJcbn0pO1xuXG5mdW5jdGlvbiBlbnZpcm9ubWVudE5hbWVGcm9tQXJndihhcmd2KSB7XG4gIGxldCBlbnZpcm9ubWVudE5hbWUgPSBudWxsO1xuXG4gIGFyZ3YuZmluZCgoYXJndW1lbnQpID0+IHsgIC8vL1xuICAgIGNvbnN0IG1hdGNoZXMgPSBhcmd1bWVudC5tYXRjaCgvLS1lbnZpcm9ubWVudD0oLispLyksXG4gICAgICAgICAgZm91bmQgPSAobWF0Y2hlcyAhPT0gbnVsbCk7XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBlbnZpcm9ubWVudE5hbWUgPSBzZWNvbmRNYXRjaDtcbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH0pO1xuXG4gIHJldHVybiBlbnZpcm9ubWVudE5hbWU7XG59XG5cbmZ1bmN0aW9uIGFic29sdXRlUkNGaWxlUGF0aEZyb21Ob3RoaW5nKCkge1xuICBjb25zdCBmaWxlUGF0aCA9IGAuLy4ke2Jhc2VFeHRlbnNpb259cmNgLFxuICAgICAgICBhYnNvbHV0ZVJDRmlsZVBhdGggPSBwYXRoUmVzb2x2ZXIoZmlsZVBhdGgpO1xuXG4gIHJldHVybiBhYnNvbHV0ZVJDRmlsZVBhdGg7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgZmlyc3QsIHNlY29uZCwgbGFzdCB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXJyYXlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGF0aE5hbWUocGF0aCkge1xuICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwvLyxcIlwiKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7IC8vL1xuXG4gIGNvbnN0IHBhdGhOYW1lID0gKC9cXC8vLnRlc3QocGF0aCkgPT09IGZhbHNlKTtcblxuICByZXR1cm4gcGF0aE5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGhUb3Btb3N0TmFtZShwYXRoKSB7XG4gIGNvbnN0IHBhdGhOYW1lID0gaXNQYXRoTmFtZShwYXRoKSxcbiAgICAgICAgcGF0aEFic29sdXRlUGF0aCA9IGlzUGF0aEFic29sdXRlUGF0aChwYXRoKSxcbiAgICAgICAgcGF0aFRvcG1vc3ROYW1lID0gKHBhdGhOYW1lICYmIHBhdGhBYnNvbHV0ZVBhdGgpO1xuXG4gIHJldHVybiBwYXRoVG9wbW9zdE5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGhSZWxhdGl2ZVBhdGgocGF0aCkge1xuICBjb25zdCBwYXRoUmVsYXRpdmVQYXRoID0gIS9eXFwvLy50ZXN0KHBhdGgpO1xuXG4gIHJldHVybiBwYXRoUmVsYXRpdmVQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQYXRoQWJzb2x1dGVQYXRoKHBhdGgpIHtcbiAgY29uc3QgcGF0aEFic29sdXRlUGF0aCA9IC9eXFwvLy50ZXN0KHBhdGgpO1xuXG4gIHJldHVybiBwYXRoQWJzb2x1dGVQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUb3Btb3N0TmFtZUluQWJzb2x1dGVQYXRoKHRvcG1vc3ROYW1lLCBhYnNvbHV0ZVBhdGgpIHtcbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChgXiR7dG9wbW9zdE5hbWV9KD86XFxcXC8uKyk/JGApLFxuICAgICAgICB0b3Btb3N0TmFtZUluQWJzb2x1dGVQYXRoID0gcmVnRXhwLnRlc3QoYWJzb2x1dGVQYXRoKTtcblxuICByZXR1cm4gdG9wbW9zdE5hbWVJbkFic29sdXRlUGF0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZVBhdGhzKHBhdGgsIHJlbGF0aXZlUGF0aCkge1xuICBsZXQgY29tYmluZWRQYXRoID0gbnVsbDtcblxuICBjb25zdCBwYXRoTmFtZXMgPSBwYXRoLnNwbGl0KC9cXC8vKSxcbiAgICAgICAgcmVsYXRpdmVQYXRoTmFtZXMgPSByZWxhdGl2ZVBhdGguc3BsaXQoL1xcLy8pO1xuXG4gIGxldCBsYXN0UGF0aE5hbWUsXG4gICAgICBmaXJzdFJlbGF0aXZlUGF0aE5hbWUgPSBmaXJzdChyZWxhdGl2ZVBhdGhOYW1lcyk7XG5cbiAgaWYgKGZpcnN0UmVsYXRpdmVQYXRoTmFtZSA9PT0gXCIuXCIpIHtcbiAgICByZWxhdGl2ZVBhdGhOYW1lcy5zaGlmdCgpO1xuICB9XG5cbiAgZmlyc3RSZWxhdGl2ZVBhdGhOYW1lID0gZmlyc3QocmVsYXRpdmVQYXRoTmFtZXMpO1xuICBsYXN0UGF0aE5hbWUgPSBsYXN0KHBhdGhOYW1lcyk7XG5cbiAgd2hpbGUgKChmaXJzdFJlbGF0aXZlUGF0aE5hbWUgPT09IFwiLi5cIikgJiYgKGxhc3RQYXRoTmFtZSAhPT0gdW5kZWZpbmVkKSkge1xuICAgIHJlbGF0aXZlUGF0aE5hbWVzLnNoaWZ0KCk7XG4gICAgcGF0aE5hbWVzLnBvcCgpO1xuXG4gICAgZmlyc3RSZWxhdGl2ZVBhdGhOYW1lID0gZmlyc3QocmVsYXRpdmVQYXRoTmFtZXMpO1xuICAgIGxhc3RQYXRoTmFtZSA9IGxhc3QocGF0aE5hbWVzKTtcbiAgfVxuXG4gIGlmIChsYXN0UGF0aE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGNvbWJpbmVkUGF0aE5hbWVzID0gW10uY29uY2F0KHBhdGhOYW1lcykuY29uY2F0KHJlbGF0aXZlUGF0aE5hbWVzKTtcblxuICAgIGNvbWJpbmVkUGF0aCA9IGNvbWJpbmVkUGF0aE5hbWVzLmpvaW4oXCIvXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNvbWJpbmVkUGF0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdGVuYXRlUGF0aHMocGF0aCwgcmVsYXRpdmVQYXRoKSB7XG4gIHBhdGggPSBwYXRoLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTsgIC8vL1xuXG4gIGNvbnN0IGNvbmNhdGVuYXRlZFBhdGggPSBgJHtwYXRofS8ke3JlbGF0aXZlUGF0aH1gO1xuXG4gIHJldHVybiBjb25jYXRlbmF0ZWRQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm90dG9tbW9zdE5hbWVGcm9tUGF0aChwYXRoKSB7XG4gIGxldCBib3R0b21tb3N0TmFtZSA9IG51bGw7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14uKlxcLyhbXlxcL10rXFwvPykkLyk7XG5cbiAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIGJvdHRvbW1vc3ROYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgfVxuXG4gIHJldHVybiBib3R0b21tb3N0TmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvcG1vc3REaXJlY3RvcnlQYXRoRnJvbVBhdGgocGF0aCkge1xuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXiguKylcXC9bXlxcL10rXFwvPyQvKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyksXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlQYXRoID0gc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5UGF0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCkge1xuICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKFteXFwvXSspXFwvLiskLyk7XG5cbiAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgfVxuXG4gIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChwYXRoKSB7XG4gIGxldCBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXiguKilcXC9bXlxcL10rXFwvPyQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHNlY29uZE1hdGNoOyAvLy9cbiAgfVxuXG4gIHJldHVybiBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eW15cXC9dK1xcLyguKykkLyk7XG5cbiAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBzZWNvbmRNYXRjaDtcbiAgfVxuXG4gIHJldHVybiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzUGF0aE5hbWUsXG4gIGlzUGF0aFRvcG1vc3ROYW1lLFxuICBpc1BhdGhSZWxhdGl2ZVBhdGgsXG4gIGlzUGF0aEFic29sdXRlUGF0aCxcbiAgaXNUb3Btb3N0TmFtZUluQWJzb2x1dGVQYXRoLFxuICBjb21iaW5lUGF0aHMsXG4gIGNvbmNhdGVuYXRlUGF0aHMsXG4gIGJvdHRvbW1vc3ROYW1lRnJvbVBhdGgsXG4gIHRvcG1vc3REaXJlY3RvcnlQYXRoRnJvbVBhdGgsXG4gIHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsXG4gIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCxcbiAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHJlYWRGaWxlIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9maWxlU3lzdGVtXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZpbGUoZmlsZVBhdGgsIGFyZ3MsIHJlZ2V4KSB7XG4gIGNvbnN0IGNvbnRlbnQgPSByZWFkRmlsZShmaWxlUGF0aCksXG4gICAgICAgIHBhcnNlZENvbnRlbnQgPSBwYXJzZUNvbnRlbnQoY29udGVudCwgYXJncywgcmVnZXgpO1xuXG4gIHJldHVybiBwYXJzZWRDb250ZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDb250ZW50KGNvbnRlbnQsIGFyZ3MsIHJlZ2V4KSB7XG4gIGNvbnN0IGxpbmVzID0gY29udGVudC5zcGxpdChcIlxcblwiKSxcbiAgICAgICAgcGFyc2VkTGluZXMgPSBwYXJzZUxpbmVzKGxpbmVzLCBhcmdzLCByZWdleCksXG4gICAgICAgIHBhcnNlZENvbnRlbnQgPSBwYXJzZWRMaW5lcy5qb2luKFwiXFxuXCIpO1xuXG4gIHJldHVybiBwYXJzZWRDb250ZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMaW5lKGxpbmUsIGFyZ3MsIHJlZ2V4ID0gL1xcJHsoLis/KX0vZykge1xuICBjb25zdCBwYXJzZWRMaW5lID0gbGluZS5yZXBsYWNlKHJlZ2V4LCAobWF0Y2gsIHRva2VuKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkVG9rZW4gPSBwYXJzZVRva2VuKHRva2VuLCBhcmdzKTtcblxuICAgIHJldHVybiBwYXJzZWRUb2tlbjtcbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZExpbmU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcGFyc2VGaWxlLFxuICBwYXJzZUNvbnRlbnQsXG4gIHBhcnNlTGluZVxufTtcblxuZnVuY3Rpb24gcGFyc2VMaW5lcyhsaW5lcywgYXJncywgcmVnZXgpIHtcbiAgY29uc3QgcGFyc2VkTGluZXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+IHtcbiAgICBjb25zdCBwYXJzZWRMaW5lID0gcGFyc2VMaW5lKGxpbmUsIGFyZ3MsIHJlZ2V4KTtcblxuICAgIHJldHVybiBwYXJzZWRMaW5lO1xuICB9KTtcblxuICByZXR1cm4gcGFyc2VkTGluZXM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW4odG9rZW4sIGFyZ3MpIHtcbiAgbGV0IHBhcnNlZFRva2VuID0gXCJcIjtcblxuICBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICBwYXJzZWRUb2tlbiA9IGFyZ3NbdG9rZW5dO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZFRva2VuO1xufVxuIiwiLy8gLmRpcm5hbWUsIC5iYXNlbmFtZSwgYW5kIC5leHRuYW1lIG1ldGhvZHMgYXJlIGV4dHJhY3RlZCBmcm9tIE5vZGUuanMgdjguMTEuMSxcbi8vIGJhY2twb3J0ZWQgYW5kIHRyYW5zcGxpdGVkIHdpdGggQmFiZWwsIHdpdGggYmFja3dhcmRzLWNvbXBhdCBmaXhlc1xuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc29sdmVkUGF0aCA9ICcnLFxuICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XG4gICAgdmFyIHBhdGggPSAoaSA+PSAwKSA/IGFyZ3VtZW50c1tpXSA6IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAvLyBTa2lwIGVtcHR5IGFuZCBpbnZhbGlkIGVudHJpZXNcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckF0KDApID09PSAnLyc7XG4gIH1cblxuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XG4gIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICByZXR1cm4gKChyZXNvbHZlZEFic29sdXRlID8gJy8nIDogJycpICsgcmVzb2x2ZWRQYXRoKSB8fCAnLic7XG59O1xuXG4vLyBwYXRoLm5vcm1hbGl6ZShwYXRoKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpLFxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIWlzQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBwYXRoID0gJy4nO1xuICB9XG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcbiAgICBwYXRoICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5qb2luID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwYXRocyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0pLmpvaW4oJy8nKSk7XG59O1xuXG5cbi8vIHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlbGF0aXZlID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgZnJvbSA9IGV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XG4gIHRvID0gZXhwb3J0cy5yZXNvbHZlKHRvKS5zdWJzdHIoMSk7XG5cbiAgZnVuY3Rpb24gdHJpbShhcnIpIHtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcbiAgICAgIGlmIChhcnJbc3RhcnRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxO1xuICAgIGZvciAoOyBlbmQgPj0gMDsgZW5kLS0pIHtcbiAgICAgIGlmIChhcnJbZW5kXSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSk7XG4gIH1cblxuICB2YXIgZnJvbVBhcnRzID0gdHJpbShmcm9tLnNwbGl0KCcvJykpO1xuICB2YXIgdG9QYXJ0cyA9IHRyaW0odG8uc3BsaXQoJy8nKSk7XG5cbiAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKTtcbiAgdmFyIHNhbWVQYXJ0c0xlbmd0aCA9IGxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChmcm9tUGFydHNbaV0gIT09IHRvUGFydHNbaV0pIHtcbiAgICAgIHNhbWVQYXJ0c0xlbmd0aCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgb3V0cHV0UGFydHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IHNhbWVQYXJ0c0xlbmd0aDsgaSA8IGZyb21QYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJyk7XG4gIH1cblxuICBvdXRwdXRQYXJ0cyA9IG91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO1xuXG4gIHJldHVybiBvdXRwdXRQYXJ0cy5qb2luKCcvJyk7XG59O1xuXG5leHBvcnRzLnNlcCA9ICcvJztcbmV4cG9ydHMuZGVsaW1pdGVyID0gJzonO1xuXG5leHBvcnRzLmRpcm5hbWUgPSBmdW5jdGlvbiAocGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSBwYXRoID0gcGF0aCArICcnO1xuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiAnLic7XG4gIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KDApO1xuICB2YXIgaGFzUm9vdCA9IGNvZGUgPT09IDQ3IC8qLyovO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDE7IC0taSkge1xuICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgZW5kID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yXG4gICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoZW5kID09PSAtMSkgcmV0dXJuIGhhc1Jvb3QgPyAnLycgOiAnLic7XG4gIGlmIChoYXNSb290ICYmIGVuZCA9PT0gMSkge1xuICAgIC8vIHJldHVybiAnLy8nO1xuICAgIC8vIEJhY2t3YXJkcy1jb21wYXQgZml4OlxuICAgIHJldHVybiAnLyc7XG4gIH1cbiAgcmV0dXJuIHBhdGguc2xpY2UoMCwgZW5kKTtcbn07XG5cbmZ1bmN0aW9uIGJhc2VuYW1lKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcblxuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgaWYgKHBhdGguY2hhckNvZGVBdChpKSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAvLyBwYXRoIGNvbXBvbmVudFxuICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICBlbmQgPSBpICsgMTtcbiAgICB9XG4gIH1cblxuICBpZiAoZW5kID09PSAtMSkgcmV0dXJuICcnO1xuICByZXR1cm4gcGF0aC5zbGljZShzdGFydCwgZW5kKTtcbn1cblxuLy8gVXNlcyBhIG1peGVkIGFwcHJvYWNoIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSwgYXMgZXh0IGJlaGF2aW9yIGNoYW5nZWRcbi8vIGluIG5ldyBOb2RlLmpzIHZlcnNpb25zLCBzbyBvbmx5IGJhc2VuYW1lKCkgYWJvdmUgaXMgYmFja3BvcnRlZCBoZXJlXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24gKHBhdGgsIGV4dCkge1xuICB2YXIgZiA9IGJhc2VuYW1lKHBhdGgpO1xuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBmO1xufTtcblxuZXhwb3J0cy5leHRuYW1lID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcbiAgdmFyIHN0YXJ0RG90ID0gLTE7XG4gIHZhciBzdGFydFBhcnQgPSAwO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAvLyBUcmFjayB0aGUgc3RhdGUgb2YgY2hhcmFjdGVycyAoaWYgYW55KSB3ZSBzZWUgYmVmb3JlIG91ciBmaXJzdCBkb3QgYW5kXG4gIC8vIGFmdGVyIGFueSBwYXRoIHNlcGFyYXRvciB3ZSBmaW5kXG4gIHZhciBwcmVEb3RTdGF0ZSA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgIHN0YXJ0UGFydCA9IGkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAvLyBleHRlbnNpb25cbiAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgZW5kID0gaSArIDE7XG4gICAgfVxuICAgIGlmIChjb2RlID09PSA0NiAvKi4qLykge1xuICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBkb3QsIG1hcmsgaXQgYXMgdGhlIHN0YXJ0IG9mIG91ciBleHRlbnNpb25cbiAgICAgICAgaWYgKHN0YXJ0RG90ID09PSAtMSlcbiAgICAgICAgICBzdGFydERvdCA9IGk7XG4gICAgICAgIGVsc2UgaWYgKHByZURvdFN0YXRlICE9PSAxKVxuICAgICAgICAgIHByZURvdFN0YXRlID0gMTtcbiAgICB9IGVsc2UgaWYgKHN0YXJ0RG90ICE9PSAtMSkge1xuICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBhbmQgbm9uLXBhdGggc2VwYXJhdG9yIGJlZm9yZSBvdXIgZG90LCBzbyB3ZSBzaG91bGRcbiAgICAgIC8vIGhhdmUgYSBnb29kIGNoYW5jZSBhdCBoYXZpbmcgYSBub24tZW1wdHkgZXh0ZW5zaW9uXG4gICAgICBwcmVEb3RTdGF0ZSA9IC0xO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGFydERvdCA9PT0gLTEgfHwgZW5kID09PSAtMSB8fFxuICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBjaGFyYWN0ZXIgaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBkb3RcbiAgICAgIHByZURvdFN0YXRlID09PSAwIHx8XG4gICAgICAvLyBUaGUgKHJpZ2h0LW1vc3QpIHRyaW1tZWQgcGF0aCBjb21wb25lbnQgaXMgZXhhY3RseSAnLi4nXG4gICAgICBwcmVEb3RTdGF0ZSA9PT0gMSAmJiBzdGFydERvdCA9PT0gZW5kIC0gMSAmJiBzdGFydERvdCA9PT0gc3RhcnRQYXJ0ICsgMSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gcGF0aC5zbGljZShzdGFydERvdCwgZW5kKTtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xuICAgIH1cbjtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iXX0=
