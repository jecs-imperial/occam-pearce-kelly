"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _necessary = require("necessary");
var _edge = _interopRequireDefault(require("./edge"));
var _vertex = _interopRequireDefault(require("./vertex"));
var _vertex1 = require("./utilities/vertex");
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var last = _necessary.arrayUtilities.last;
var DirectedAcyclicGraph = function() {
    function DirectedAcyclicGraph(vertexMap) {
        _classCallCheck(this, DirectedAcyclicGraph);
        this.vertexMap = vertexMap;
    }
    _createClass(DirectedAcyclicGraph, [
        {
            key: "isEmpty",
            value: function isEmpty() {
                var vertices = this.getVertices(), verticesLength = vertices.length, empty = verticesLength === 0;
                return empty;
            }
        },
        {
            key: "getVertices",
            value: function getVertices() {
                var vertexMapValues = Object.values(this.vertexMap), vertices = vertexMapValues; ///
                return vertices;
            }
        },
        {
            key: "getVertexNames",
            value: function getVertexNames() {
                var vertexMapKeys = Object.keys(this.vertexMap), vertexNames = vertexMapKeys; ///
                return vertexNames;
            }
        },
        {
            key: "getVertexByVertexName",
            value: function getVertexByVertexName(vertexName) {
                var vertexPresent = this.isVertexPresentByVertexName(vertexName), vertex = vertexPresent ? this.vertexMap[vertexName] : null;
                return vertex;
            }
        },
        {
            key: "getImmediatePredecessorVertexNamesByVertexName",
            value: function getImmediatePredecessorVertexNamesByVertexName(vertexName) {
                var vertex = this.getVertexByVertexName(vertexName), immediatePredecessorVertexNames = vertex.getImmediatePredecessorVertexNames();
                return immediatePredecessorVertexNames;
            }
        },
        {
            key: "getImmediateSuccessorVertexNamesByVertexName",
            value: function getImmediateSuccessorVertexNamesByVertexName(vertexName) {
                var vertex = this.getVertexByVertexName(vertexName), immediateSuccessorVertexNames = vertex.getImmediateSuccessorVertexNames();
                return immediateSuccessorVertexNames;
            }
        },
        {
            key: "getPredecessorVertexNamesByVertexName",
            value: function getPredecessorVertexNamesByVertexName(vertexName) {
                var vertex = this.getVertexByVertexName(vertexName), predecessorVertexNames = vertex.getPredecessorVertexNames();
                return predecessorVertexNames;
            }
        },
        {
            key: "getSuccessorVertexNamesByVertexName",
            value: function getSuccessorVertexNamesByVertexName(vertexName) {
                var vertex = this.getVertexByVertexName(vertexName), successorVertexNames = vertex.getSuccessorVertexNames();
                return successorVertexNames;
            }
        },
        {
            key: "getEdgesByTargetVertexName",
            value: function getEdgesByTargetVertexName(targetVertexName) {
                var edges = [], targetVertex = this.getVertexByVertexName(targetVertexName);
                if (targetVertex !== null) {
                    var immediatePredecessorVertexNames = targetVertex.getImmediatePredecessorVertexNames(), sourceVertexNames = immediatePredecessorVertexNames; ///
                    sourceVertexNames.forEach(function(sourceVertexName) {
                        var edge = _edge.default.fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);
                        edges.push(edge);
                    });
                }
                return edges;
            }
        },
        {
            key: "getEdgesBySourceVertexName",
            value: function getEdgesBySourceVertexName(sourceVertexName) {
                var edges = [], sourceVertex = this.getVertexByVertexName(sourceVertexName);
                if (sourceVertex !== null) {
                    var immediateSuccessorVertexNames = sourceVertex.getImmediateSuccessorVertexNames(), targetVertexNames = immediateSuccessorVertexNames; ///
                    targetVertexNames.forEach(function(targetVertexName) {
                        var edge = _edge.default.fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);
                        edges.push(edge);
                    });
                }
                return edges;
            }
        },
        {
            key: "setVertexByVertexName",
            value: function setVertexByVertexName(vertexName, vertex) {
                this.vertexMap[vertexName] = vertex;
            }
        },
        {
            key: "deleteVertexByVertexName",
            value: function deleteVertexByVertexName(vertexName) {
                delete this.vertexMap[vertexName];
            }
        },
        {
            key: "isEdgePresent",
            value: function isEdgePresent(edge) {
                var sourceVertexName = edge.getSourceVertexName(), targetVertexName = edge.getTargetVertexName(), edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);
                return edgePresent;
            }
        },
        {
            key: "isEdgePresentByVertexNames",
            value: function isEdgePresentByVertexNames(sourceVertexName, targetVertexName) {
                var edgePresent = false;
                var sourceVertex = this.getVertexByVertexName(sourceVertexName), targetVertex = this.getVertexByVertexName(targetVertexName), sourceVertexAndTargetVertexPresent = sourceVertex !== null && targetVertex !== null;
                if (sourceVertexAndTargetVertexPresent) {
                    edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);
                }
                return edgePresent;
            }
        },
        {
            key: "isVertexPresentByVertexName",
            value: function isVertexPresentByVertexName(vertexName) {
                var vertexNames = this.getVertexNames(), vertexNamesIncludesVertexName = vertexNames.includes(vertexName), vertexPresent = vertexNamesIncludesVertexName; ///
                return vertexPresent;
            }
        },
        {
            key: "getOrderedVertexNames",
            value: function getOrderedVertexNames() {
                var vertices = this.getVertices();
                _vertex1.orderVertices(vertices);
                var orderedVertices = vertices, orderedVertexNames = _vertex1.vertexNamesFromVertices(orderedVertices);
                return orderedVertexNames;
            }
        },
        {
            key: "addEdge",
            value: function addEdge(edge) {
                var sourceVertexName = edge.getSourceVertexName(), targetVertexName = edge.getTargetVertexName(), success = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);
                return success;
            }
        },
        {
            key: "removeEdge",
            value: function removeEdge(edge) {
                var sourceVertexName = edge.getSourceVertexName(), targetVertexName = edge.getTargetVertexName();
                this.removeEdgeByVertexNames(sourceVertexName, targetVertexName);
            }
        },
        {
            key: "addEdgeByVertexNames",
            value: function addEdgeByVertexNames(sourceVertexName, targetVertexName) {
                var success = false;
                if (sourceVertexName !== targetVertexName) {
                    var sourceVertex = this.addVertexByVertexName(sourceVertexName), targetVertex = this.addVertexByVertexName(targetVertexName), edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);
                    if (edgePresent) {
                        success = true;
                    } else {
                        var sourceVertexIndex = sourceVertex.getIndex(), targetVertexIndex = targetVertex.getIndex(), invalidatingEdge = sourceVertexIndex > targetVertexIndex;
                        success = invalidatingEdge ? addInvalidatingEdgeByVertices(sourceVertex, targetVertex) : true;
                        if (success) {
                            var immediatePredecessorVertex = sourceVertex, immediateSuccessorVertex = targetVertex; ///
                            immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);
                            immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
                        }
                    }
                }
                return success;
            }
        },
        {
            key: "removeEdgeByVertexNames",
            value: function removeEdgeByVertexNames(sourceVertexName, targetVertexName) {
                var edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);
                if (edgePresent) {
                    var sourceVertex = this.getVertexByVertexName(sourceVertexName), targetVertex = this.getVertexByVertexName(targetVertexName);
                    sourceVertex.removeImmediateSuccessorVertex(targetVertex);
                    targetVertex.removeImmediatePredecessorVertex(sourceVertex);
                }
            }
        },
        {
            key: "removeEdgesBySourceVertexName",
            value: function removeEdgesBySourceVertexName(sourceVertexName) {
                var sourceVertexPresent = this.isVertexPresentByVertexName(sourceVertexName);
                if (sourceVertexPresent) {
                    var sourceVertex = this.getVertexByVertexName(sourceVertexName);
                    sourceVertex.removeOutgoingEdges();
                }
            }
        },
        {
            key: "removeEdgesByTargetVertexName",
            value: function removeEdgesByTargetVertexName(targetVertexName) {
                var targetVertexPresent = this.isVertexPresentByVertexName(targetVertexName);
                if (targetVertexPresent) {
                    var targetVertex = this.getVertexByVertexName(targetVertexName);
                    targetVertex.removeIncomingEdges();
                }
            }
        },
        {
            key: "addVertexByVertexName",
            value: function addVertexByVertexName(vertexName) {
                var vertexPresent = this.isVertexPresentByVertexName(vertexName);
                if (!vertexPresent) {
                    var vertexNames = this.getVertexNames(), vertexNamesLength = vertexNames.length, name = vertexName, index = vertexNamesLength, vertex = _vertex.default.fromNameAndIndex(name, index);
                    this.setVertexByVertexName(vertexName, vertex);
                }
                var vertex = this.getVertexByVertexName(vertexName);
                return vertex;
            }
        },
        {
            key: "removeVertexByVertexName",
            value: function removeVertexByVertexName(vertexName) {
                var removedEdges = null;
                var vertexPresent = this.isVertexPresentByVertexName(vertexName);
                if (vertexPresent) {
                    removedEdges = [];
                    var vertex = this.getVertexByVertexName(vertexName);
                    vertex.forEachImmediateSuccessorVertex(function(immediateSuccessVertex) {
                        var immediatePredecessorVertex = vertex, immediatePredecessorVertexName = immediatePredecessorVertex.getName(), immediateSuccessVertexName = immediateSuccessVertex.getName(), removedEdgeSourceVertexName = immediatePredecessorVertexName, removedEdgeTargetVertexName = immediateSuccessVertexName, removedEdge = new _edge.default(removedEdgeSourceVertexName, removedEdgeTargetVertexName);
                        removedEdges.push(removedEdge);
                        immediateSuccessVertex.removeImmediatePredecessorVertex(immediatePredecessorVertex);
                    });
                    vertex.forEachImmediatePredecessorVertex(function(immediatePredecessorVertex) {
                        var immediateSuccessVertex = vertex, immediatePredecessorVertexName = immediatePredecessorVertex.getName(), immediateSuccessVertexName = immediateSuccessVertex.getName(), removedEdgeSourceVertexName = immediatePredecessorVertexName, removedEdgeTargetVertexName = immediateSuccessVertexName, removedEdge = new _edge.default(removedEdgeSourceVertexName, removedEdgeTargetVertexName);
                        removedEdges.push(removedEdge);
                        immediatePredecessorVertex.removeImmediateSuccessorVertex(immediateSuccessVertex);
                    });
                    this.deleteVertexByVertexName(vertexName);
                    var deletedVertex = vertex, deletedVertexIndex = deletedVertex.getIndex(), vertices = this.getVertices(), affectedVertices = vertices.reduce(function(affectedVertices1, vertex1) {
                        var vertexIndex = vertex1.getIndex(), vertexAffected = vertexIndex > deletedVertexIndex;
                        if (vertexAffected) {
                            var affectedVertex = vertex1; ///
                            affectedVertices1.push(affectedVertex);
                        }
                        return affectedVertices1;
                    }, []);
                    affectedVertices.forEach(function(affectedVertex) {
                        return affectedVertex.decrementIndex();
                    });
                }
                return removedEdges;
            }
        }
    ], [
        {
            key: "fromNothing",
            value: function fromNothing() {
                var vertexMap = {
                }, directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);
                return directedAcyclicGraph;
            }
        },
        {
            key: "fromVertexNames",
            value: function fromVertexNames(vertexNames) {
                var vertexMap = vertexMapFromVertexNames(vertexNames);
                var directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);
                return directedAcyclicGraph;
            }
        },
        {
            key: "fromOrderedVertices",
            value: function fromOrderedVertices(orderedVertices) {
                var vertexMap = vertexMapFromOrderedVertices(orderedVertices);
                addEdgesToVertices(orderedVertices, vertexMap);
                var directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);
                return directedAcyclicGraph;
            }
        }
    ]);
    return DirectedAcyclicGraph;
}();
exports.default = DirectedAcyclicGraph;
function addInvalidatingEdgeByVertices(sourceVertex, targetVertex) {
    var success = false;
    var forwardsAffectedVertices = targetVertex.retrieveForwardsAffectedVertices(sourceVertex), lastForwardsAffectedVertex = last(forwardsAffectedVertices), resultsInCycle = lastForwardsAffectedVertex === sourceVertex;
    if (!resultsInCycle) {
        var backwardsAffectedVertices = sourceVertex.retrieveBackwardsAffectedVertices();
        _vertex1.orderVertices(backwardsAffectedVertices);
        _vertex1.orderVertices(forwardsAffectedVertices);
        var affectedVertices = [].concat(backwardsAffectedVertices).concat(forwardsAffectedVertices), affectedVertexIndices = affectedVertices.map(function(affectedVertex) {
            var affectedVertexIndex = affectedVertex.getIndex();
            return affectedVertexIndex;
        });
        affectedVertexIndices.sort(function(indexA, indexB) {
            return indexA - indexB;
        });
        affectedVertices.forEach(function(affectedVertex, index) {
            var affectedVertexIndex = affectedVertexIndices[index];
            affectedVertex.setIndex(affectedVertexIndex);
        });
        success = true;
    }
    return success;
}
function vertexMapFromVertexNames(vertexNames) {
    var vertexMap = {
    };
    vertexNames.forEach(function(vertexName, index) {
        var name = vertexName, vertex = _vertex.default.fromNameAndIndex(name, index);
        vertexMap[vertexName] = vertex;
    });
    return vertexMap;
}
function vertexMapFromOrderedVertices(orderedVertices) {
    var vertexMap = {
    };
    orderedVertices.forEach(function(orderedVertex, index) {
        var name = orderedVertex.getName(), vertex = _vertex.default.fromNameAndIndex(name, index), vertexName = name; ///
        vertexMap[vertexName] = vertex;
    });
    return vertexMap;
}
function addEdgesToVertices(orderedVertices, vertexMap) {
    orderedVertices.forEach(function(orderedVertex) {
        orderedVertex.forEachOutgoingEdge(function(outgoingEdge) {
            var sourceVertexName = outgoingEdge.getSourceVertexName(), targetVertexName = outgoingEdge.getTargetVertexName(), immediatePredecessorVertexName = sourceVertexName, immediateSuccessorVertexName = targetVertexName, immediatePredecessorVertex = vertexMap[immediatePredecessorVertexName], immediateSuccessorVertex = vertexMap[immediateSuccessorVertexName]; ///
            immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);
            immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
        });
    });
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kaXJlY3RlZEFjeWNsaWNHcmFwaC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFZGdlIGZyb20gXCIuL2VkZ2VcIjtcbmltcG9ydCBWZXJ0ZXggZnJvbSBcIi4vdmVydGV4XCI7XG5cbmltcG9ydCB7IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzLCBvcmRlclZlcnRpY2VzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL3ZlcnRleFwiO1xuXG5jb25zdCB7IGxhc3QgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3RlZEFjeWNsaWNHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKHZlcnRleE1hcCkge1xuICAgIHRoaXMudmVydGV4TWFwID0gdmVydGV4TWFwO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCB2ZXJ0aWNlcyA9IHRoaXMuZ2V0VmVydGljZXMoKSxcbiAgICAgICAgICB2ZXJ0aWNlc0xlbmd0aCA9IHZlcnRpY2VzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9ICh2ZXJ0aWNlc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBnZXRWZXJ0aWNlcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXBWYWx1ZXMgPSBPYmplY3QudmFsdWVzKHRoaXMudmVydGV4TWFwKSxcbiAgICAgICAgICB2ZXJ0aWNlcyA9IHZlcnRleE1hcFZhbHVlczsgLy8vXG5cbiAgICByZXR1cm4gdmVydGljZXM7XG4gIH1cblxuICBnZXRWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXBLZXlzID0gT2JqZWN0LmtleXModGhpcy52ZXJ0ZXhNYXApLFxuICAgICAgICAgIHZlcnRleE5hbWVzID0gdmVydGV4TWFwS2V5czsgIC8vL1xuXG4gICAgcmV0dXJuIHZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgdmVydGV4ID0gdmVydGV4UHJlc2VudCA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA6XG4gICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgZ2V0SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lc0J5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHZlcnRleC5nZXRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzKCk7XG5cbiAgICByZXR1cm4gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHZlcnRleC5nZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcygpO1xuXG4gICAgcmV0dXJuIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lc0J5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHZlcnRleC5nZXRQcmVkZWNlc3NvclZlcnRleE5hbWVzKCk7XG5cbiAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldFN1Y2Nlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBzdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHZlcnRleC5nZXRTdWNjZXNzb3JWZXJ0ZXhOYW1lcygpO1xuXG4gICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleE5hbWVzO1xuICB9XG5cbiAgZ2V0RWRnZXNCeVRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IGVkZ2VzID0gW10sXG4gICAgICAgICAgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAodGFyZ2V0VmVydGV4ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzID0gdGFyZ2V0VmVydGV4LmdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMoKSxcbiAgICAgICAgICAgIHNvdXJjZVZlcnRleE5hbWVzID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lczsgIC8vL1xuXG4gICAgICBzb3VyY2VWZXJ0ZXhOYW1lcy5mb3JFYWNoKChzb3VyY2VWZXJ0ZXhOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSBFZGdlLmZyb21Tb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICBlZGdlcy5wdXNoKGVkZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VzO1xuICB9XG5cbiAgZ2V0RWRnZXNCeVNvdXJjZVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSkge1xuICAgIGNvbnN0IGVkZ2VzID0gW10sXG4gICAgICAgICAgc291cmNlVmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHNvdXJjZVZlcnRleC5nZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZXMgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lczsgIC8vL1xuXG4gICAgICB0YXJnZXRWZXJ0ZXhOYW1lcy5mb3JFYWNoKCh0YXJnZXRWZXJ0ZXhOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGVkZ2UgPSBFZGdlLmZyb21Tb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICBlZGdlcy5wdXNoKGVkZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VzO1xuICB9XG5cbiAgc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUsIHZlcnRleCkge1xuICAgIHRoaXMudmVydGV4TWFwW3ZlcnRleE5hbWVdID0gdmVydGV4O1xuICB9XG5cbiAgZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy52ZXJ0ZXhNYXBbdmVydGV4TmFtZV07XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50KGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gdGhpcy5pc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgICBcbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgbGV0IGVkZ2VQcmVzZW50ID0gZmFsc2U7XG5cbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICBzb3VyY2VWZXJ0ZXhBbmRUYXJnZXRWZXJ0ZXhQcmVzZW50ID0gKHNvdXJjZVZlcnRleCAhPT0gbnVsbCkgJiYgKHRhcmdldFZlcnRleCAhPT0gbnVsbCk7XG5cbiAgICBpZiAoc291cmNlVmVydGV4QW5kVGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXguaXNFZGdlUHJlc2VudEJ5VGFyZ2V0VmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVkZ2VQcmVzZW50O1xuICB9XG5cbiAgaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhOYW1lcyA9IHRoaXMuZ2V0VmVydGV4TmFtZXMoKSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZSA9IHZlcnRleE5hbWVzLmluY2x1ZGVzKHZlcnRleE5hbWUpLFxuICAgICAgICAgIHZlcnRleFByZXNlbnQgPSB2ZXJ0ZXhOYW1lc0luY2x1ZGVzVmVydGV4TmFtZTsgIC8vL1xuXG4gICAgcmV0dXJuIHZlcnRleFByZXNlbnQ7XG4gIH1cblxuICBnZXRPcmRlcmVkVmVydGV4TmFtZXMoKSB7XG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdldFZlcnRpY2VzKCk7XG5cbiAgICBvcmRlclZlcnRpY2VzKHZlcnRpY2VzKTtcblxuICAgIGNvbnN0IG9yZGVyZWRWZXJ0aWNlcyA9IHZlcnRpY2VzLCAvLy9cbiAgICAgICAgICBvcmRlcmVkVmVydGV4TmFtZXMgPSB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyhvcmRlcmVkVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIG9yZGVyZWRWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGFkZEVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgc3VjY2VzcyA9IHRoaXMuYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gc3VjY2VzcztcbiAgfVxuXG4gIHJlbW92ZUVkZ2UoZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCk7XG5cbiAgICB0aGlzLnJlbW92ZUVkZ2VCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICB9XG5cbiAgYWRkRWRnZUJ5VmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgICBpZiAoc291cmNlVmVydGV4TmFtZSAhPT0gdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgICAgY29uc3Qgc291cmNlVmVydGV4ID0gdGhpcy5hZGRWZXJ0ZXhCeVZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSksXG4gICAgICAgICAgICB0YXJnZXRWZXJ0ZXggPSB0aGlzLmFkZFZlcnRleEJ5VmVydGV4TmFtZSh0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIGVkZ2VQcmVzZW50ID0gc291cmNlVmVydGV4LmlzRWRnZVByZXNlbnRCeVRhcmdldFZlcnRleCh0YXJnZXRWZXJ0ZXgpO1xuICAgICAgXG4gICAgICBpZiAoZWRnZVByZXNlbnQpIHtcbiAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhJbmRleCA9IHNvdXJjZVZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICB0YXJnZXRWZXJ0ZXhJbmRleCA9IHRhcmdldFZlcnRleC5nZXRJbmRleCgpLFxuICAgICAgICAgICAgICBpbnZhbGlkYXRpbmdFZGdlID0gKHNvdXJjZVZlcnRleEluZGV4ID4gdGFyZ2V0VmVydGV4SW5kZXgpO1xuXG4gICAgICAgIHN1Y2Nlc3MgPSBpbnZhbGlkYXRpbmdFZGdlID9cbiAgICAgICAgICAgICAgICAgICAgYWRkSW52YWxpZGF0aW5nRWRnZUJ5VmVydGljZXMoc291cmNlVmVydGV4LCB0YXJnZXRWZXJ0ZXgpIDpcbiAgICAgICAgICAgICAgICAgICAgICB0cnVlO1xuXG4gICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXggPSBzb3VyY2VWZXJ0ZXgsIC8vL1xuICAgICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCA9IHRhcmdldFZlcnRleDsgLy8vXG5cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KTtcblxuICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHN1Y2Nlc3M7XG4gIH1cblxuICByZW1vdmVFZGdlQnlWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgZWRnZVByZXNlbnQgPSB0aGlzLmlzRWRnZVByZXNlbnRCeVZlcnRleE5hbWVzKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgaWYgKGVkZ2VQcmVzZW50KSB7XG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXggPSB0aGlzLmdldFZlcnRleEJ5VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIHRhcmdldFZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KHRhcmdldFZlcnRleCk7XG4gICAgICB0YXJnZXRWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoc291cmNlVmVydGV4KTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVFZGdlc0J5U291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4UHJlc2VudCA9IHRoaXMuaXNWZXJ0ZXhQcmVzZW50QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgaWYgKHNvdXJjZVZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleCA9IHRoaXMuZ2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgICBzb3VyY2VWZXJ0ZXgucmVtb3ZlT3V0Z29pbmdFZGdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUVkZ2VzQnlUYXJnZXRWZXJ0ZXhOYW1lKHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB0YXJnZXRWZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICBpZiAodGFyZ2V0VmVydGV4UHJlc2VudCkge1xuICAgICAgY29uc3QgdGFyZ2V0VmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICAgIHRhcmdldFZlcnRleC5yZW1vdmVJbmNvbWluZ0VkZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBjb25zdCB2ZXJ0ZXhQcmVzZW50ID0gdGhpcy5pc1ZlcnRleFByZXNlbnRCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICBpZiAoIXZlcnRleFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHZlcnRleE5hbWVzID0gdGhpcy5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgICAgdmVydGV4TmFtZXNMZW5ndGggPSB2ZXJ0ZXhOYW1lcy5sZW5ndGgsXG4gICAgICAgICAgICBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgICAgaW5kZXggPSB2ZXJ0ZXhOYW1lc0xlbmd0aCwgLy8vXG4gICAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCk7XG5cbiAgICAgIHRoaXMuc2V0VmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUsIHZlcnRleCk7XG4gICAgfVxuXG4gICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gdmVydGV4O1xuICB9XG5cbiAgcmVtb3ZlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpIHtcbiAgICBsZXQgcmVtb3ZlZEVkZ2VzID0gbnVsbDtcblxuICAgIGNvbnN0IHZlcnRleFByZXNlbnQgPSB0aGlzLmlzVmVydGV4UHJlc2VudEJ5VmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKTtcblxuICAgIGlmICh2ZXJ0ZXhQcmVzZW50KSB7XG4gICAgICByZW1vdmVkRWRnZXMgPSBbXTtcblxuICAgICAgY29uc3QgdmVydGV4ID0gdGhpcy5nZXRWZXJ0ZXhCeVZlcnRleE5hbWUodmVydGV4TmFtZSk7XG5cbiAgICAgIHZlcnRleC5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KChpbW1lZGlhdGVTdWNjZXNzVmVydGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4LCAgLy8vXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZSA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5yZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgICB9KTtcblxuICAgICAgdmVydGV4LmZvckVhY2hJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgY29uc3QgaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleCA9IHZlcnRleCwgIC8vL1xuICAgICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleC5nZXROYW1lKCksICAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VTb3VyY2VWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lLCAvLy9cbiAgICAgICAgICAgICAgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlU3VjY2Vzc1ZlcnRleE5hbWUsIC8vL1xuICAgICAgICAgICAgICByZW1vdmVkRWRnZSA9IG5ldyBFZGdlKHJlbW92ZWRFZGdlU291cmNlVmVydGV4TmFtZSwgcmVtb3ZlZEVkZ2VUYXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgICAgICByZW1vdmVkRWRnZXMucHVzaChyZW1vdmVkRWRnZSk7XG5cbiAgICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgucmVtb3ZlSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NWZXJ0ZXgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZGVsZXRlVmVydGV4QnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpO1xuXG4gICAgICBjb25zdCBkZWxldGVkVmVydGV4ID0gdmVydGV4LCAvLy9cbiAgICAgICAgICAgIGRlbGV0ZWRWZXJ0ZXhJbmRleCA9IGRlbGV0ZWRWZXJ0ZXguZ2V0SW5kZXgoKSxcbiAgICAgICAgICAgIHZlcnRpY2VzID0gdGhpcy5nZXRWZXJ0aWNlcygpLFxuICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0aWNlcyA9IHZlcnRpY2VzLnJlZHVjZSgoYWZmZWN0ZWRWZXJ0aWNlcywgdmVydGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHZlcnRleEluZGV4ID0gdmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgICAgICAgICAgIHZlcnRleEFmZmVjdGVkID0gKHZlcnRleEluZGV4ID4gZGVsZXRlZFZlcnRleEluZGV4KTtcblxuICAgICAgICAgICAgICBpZiAodmVydGV4QWZmZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhZmZlY3RlZFZlcnRleCA9IHZlcnRleDsgIC8vL1xuXG4gICAgICAgICAgICAgICAgYWZmZWN0ZWRWZXJ0aWNlcy5wdXNoKGFmZmVjdGVkVmVydGV4KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRpY2VzO1xuICAgICAgICAgICAgfSwgW10pO1xuXG4gICAgICBhZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goKGFmZmVjdGVkVmVydGV4KSA9PiBhZmZlY3RlZFZlcnRleC5kZWNyZW1lbnRJbmRleCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlZEVkZ2VzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ob3RoaW5nKCkge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHt9LFxuICAgICAgICAgIGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG5cbiAgICByZXR1cm4gZGlyZWN0ZWRBY3ljbGljR3JhcGg7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpIHtcbiAgICBjb25zdCB2ZXJ0ZXhNYXAgPSB2ZXJ0ZXhNYXBGcm9tVmVydGV4TmFtZXModmVydGV4TmFtZXMpO1xuXG4gICAgY29uc3QgZGlyZWN0ZWRBY3ljbGljR3JhcGggPSBuZXcgRGlyZWN0ZWRBY3ljbGljR3JhcGgodmVydGV4TWFwKTtcblxuICAgIHJldHVybiBkaXJlY3RlZEFjeWNsaWNHcmFwaDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tT3JkZXJlZFZlcnRpY2VzKG9yZGVyZWRWZXJ0aWNlcykge1xuICAgIGNvbnN0IHZlcnRleE1hcCA9IHZlcnRleE1hcEZyb21PcmRlcmVkVmVydGljZXMob3JkZXJlZFZlcnRpY2VzKTtcbiAgICBcbiAgICBhZGRFZGdlc1RvVmVydGljZXMob3JkZXJlZFZlcnRpY2VzLCB2ZXJ0ZXhNYXApO1xuICAgIFxuICAgIGNvbnN0IGRpcmVjdGVkQWN5Y2xpY0dyYXBoID0gbmV3IERpcmVjdGVkQWN5Y2xpY0dyYXBoKHZlcnRleE1hcCk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdGVkQWN5Y2xpY0dyYXBoO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZEludmFsaWRhdGluZ0VkZ2VCeVZlcnRpY2VzKHNvdXJjZVZlcnRleCwgdGFyZ2V0VmVydGV4KSB7XG4gIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgY29uc3QgZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzID0gdGFyZ2V0VmVydGV4LnJldHJpZXZlRm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCksXG4gICAgICAgIGxhc3RGb3J3YXJkc0FmZmVjdGVkVmVydGV4ID0gbGFzdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICByZXN1bHRzSW5DeWNsZSA9IChsYXN0Rm9yd2FyZHNBZmZlY3RlZFZlcnRleCA9PT0gc291cmNlVmVydGV4KTtcblxuICBpZiAoIXJlc3VsdHNJbkN5Y2xlKSB7XG4gICAgY29uc3QgYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHNvdXJjZVZlcnRleC5yZXRyaWV2ZUJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMoKTtcblxuICAgIG9yZGVyVmVydGljZXMoYmFja3dhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICBvcmRlclZlcnRpY2VzKGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyk7XG5cbiAgICBjb25zdCBhZmZlY3RlZFZlcnRpY2VzID0gW10uY29uY2F0KGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMpLmNvbmNhdChmb3J3YXJkc0FmZmVjdGVkVmVydGljZXMpLFxuICAgICAgICAgIGFmZmVjdGVkVmVydGV4SW5kaWNlcyA9IGFmZmVjdGVkVmVydGljZXMubWFwKChhZmZlY3RlZFZlcnRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4LmdldEluZGV4KCk7XG5cbiAgICAgICAgICAgIHJldHVybiBhZmZlY3RlZFZlcnRleEluZGV4O1xuICAgICAgICAgIH0pO1xuXG4gICAgYWZmZWN0ZWRWZXJ0ZXhJbmRpY2VzLnNvcnQoKGluZGV4QSwgaW5kZXhCKSA9PiAoaW5kZXhBIC0gaW5kZXhCKSk7XG5cbiAgICBhZmZlY3RlZFZlcnRpY2VzLmZvckVhY2goKGFmZmVjdGVkVmVydGV4LCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgYWZmZWN0ZWRWZXJ0ZXhJbmRleCA9IGFmZmVjdGVkVmVydGV4SW5kaWNlc1tpbmRleF07XG5cbiAgICAgIGFmZmVjdGVkVmVydGV4LnNldEluZGV4KGFmZmVjdGVkVmVydGV4SW5kZXgpO1xuICAgIH0pO1xuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH1cblxuICByZXR1cm4gc3VjY2Vzcztcbn1cblxuZnVuY3Rpb24gdmVydGV4TWFwRnJvbVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKSB7XG4gIGNvbnN0IHZlcnRleE1hcCA9IHt9O1xuICBcbiAgdmVydGV4TmFtZXMuZm9yRWFjaCgodmVydGV4TmFtZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBuYW1lID0gdmVydGV4TmFtZSwgIC8vL1xuICAgICAgICAgIHZlcnRleCA9IFZlcnRleC5mcm9tTmFtZUFuZEluZGV4KG5hbWUsIGluZGV4KTtcblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG4gIFxuICByZXR1cm4gdmVydGV4TWFwO1xufVxuXG5mdW5jdGlvbiB2ZXJ0ZXhNYXBGcm9tT3JkZXJlZFZlcnRpY2VzKG9yZGVyZWRWZXJ0aWNlcykge1xuICBjb25zdCB2ZXJ0ZXhNYXAgPSB7fTtcbiAgXG4gIG9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKChvcmRlcmVkVmVydGV4LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBvcmRlcmVkVmVydGV4LmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJ0ZXggPSBWZXJ0ZXguZnJvbU5hbWVBbmRJbmRleChuYW1lLCBpbmRleCksXG4gICAgICAgICAgdmVydGV4TmFtZSA9IG5hbWU7ICAvLy9cblxuICAgIHZlcnRleE1hcFt2ZXJ0ZXhOYW1lXSA9IHZlcnRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIHZlcnRleE1hcDtcbn1cblxuZnVuY3Rpb24gYWRkRWRnZXNUb1ZlcnRpY2VzKG9yZGVyZWRWZXJ0aWNlcywgdmVydGV4TWFwKSB7XG4gIG9yZGVyZWRWZXJ0aWNlcy5mb3JFYWNoKChvcmRlcmVkVmVydGV4KSA9PiB7XG4gICAgb3JkZXJlZFZlcnRleC5mb3JFYWNoT3V0Z29pbmdFZGdlKChvdXRnb2luZ0VkZ2UpID0+IHtcbiAgICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBvdXRnb2luZ0VkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IG91dGdvaW5nRWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lLCAgLy8vXG4gICAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lID0gdGFyZ2V0VmVydGV4TmFtZSxcbiAgICAgICAgICAgIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZV0sIC8vL1xuICAgICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdmVydGV4TWFwW2ltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVdOyAvLy9cblxuICAgICAgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCk7XG5cbiAgICAgIGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5hZGRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQUE7Ozs7O0lBRUEsVUFBQTtJQUVBLEtBQUE7SUFDQSxPQUFBO0lBRUEsUUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVBLElBQUEsR0FQQSxVQUFBLGdCQU9BLElBQUE7SUFFQSxvQkFBQTthQUFBLG9CQUFBLENBQ0EsU0FBQTs4QkFEQSxvQkFBQTthQUVBLFNBQUEsR0FBQSxTQUFBOztpQkFGQSxvQkFBQTs7QUFLQSxlQUFBLEdBQUEsT0FBQTs0QkFBQSxPQUFBO29CQUNBLFFBQUEsUUFBQSxXQUFBLElBQ0EsY0FBQSxHQUFBLFFBQUEsQ0FBQSxNQUFBLEVBQ0EsS0FBQSxHQUFBLGNBQUEsS0FBQSxDQUFBO3VCQUVBLEtBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsV0FBQTs0QkFBQSxXQUFBO29CQUNBLGVBQUEsR0FBQSxNQUFBLENBQUEsTUFBQSxNQUFBLFNBQUEsR0FDQSxRQUFBLEdBQUEsZUFBQSxDQUFBLENBQUEsRUFBQSxDQUFBO3VCQUVBLFFBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsY0FBQTs0QkFBQSxjQUFB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