"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _vertex = require("./utilities/vertex");
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
var Vertex = function() {
    function Vertex(name, index, visited, immediatePredecessorVertices, immediateSuccessorVertices) {
        _classCallCheck(this, Vertex);
        this.name = name;
        this.index = index;
        this.visited = visited;
        this.immediatePredecessorVertices = immediatePredecessorVertices;
        this.immediateSuccessorVertices = immediateSuccessorVertices;
    }
    _createClass(Vertex, [
        {
            key: "getName",
            value: function getName() {
                return this.name;
            }
        },
        {
            key: "getIndex",
            value: function getIndex() {
                return this.index;
            }
        },
        {
            key: "isVisited",
            value: function isVisited() {
                return this.visited;
            }
        },
        {
            key: "isStranded",
            value: function isStranded() {
                var immediatePredecessorVerticesLength = this.immediatePredecessorVertices.length, immediateSuccessorVerticesLength = this.immediateSuccessorVertices.length, stranded = immediatePredecessorVerticesLength === 0 && immediateSuccessorVerticesLength === 0;
                return stranded;
            }
        },
        {
            key: "getImmediatePredecessorVertexNames",
            value: function getImmediatePredecessorVertexNames() {
                var immediatePredecessorVertexNames = this.immediatePredecessorVertices.map(function(immediatePredecessorVertex) {
                    var immediatePredecessorVertexName = immediatePredecessorVertex.getName();
                    return immediatePredecessorVertexName;
                });
                return immediatePredecessorVertexNames;
            }
        },
        {
            key: "getImmediateSuccessorVertexNames",
            value: function getImmediateSuccessorVertexNames() {
                var immediateSuccessorVertexNames = this.immediateSuccessorVertices.map(function(immediateSuccessorVertex) {
                    var immediateSuccessorVertexName = immediateSuccessorVertex.getName();
                    return immediateSuccessorVertexName;
                });
                return immediateSuccessorVertexNames;
            }
        },
        {
            key: "getImmediatePredecessorVertices",
            value: function getImmediatePredecessorVertices() {
                return this.immediatePredecessorVertices;
            }
        },
        {
            key: "getImmediateSuccessorVertices",
            value: function getImmediateSuccessorVertices() {
                return this.immediateSuccessorVertices;
            }
        },
        {
            key: "getPredecessorVertexMap",
            value: function getPredecessorVertexMap(param) {
                var predecessorVertexMap = param === void 0 ? {
                } : param;
                this.forEachImmediatePredecessorVertex(function(immediatePredecessorVertex) {
                    var predecessorVertex = immediatePredecessorVertex, predecessorVertexName = predecessorVertex.getName();
                    predecessorVertexMap[predecessorVertexName] = predecessorVertex;
                    predecessorVertex.getPredecessorVertexMap(predecessorVertexMap);
                });
                return predecessorVertexMap;
            }
        },
        {
            key: "getSuccessorVertexMap",
            value: function getSuccessorVertexMap(param) {
                var successorVertexMap = param === void 0 ? {
                } : param;
                this.forEachImmediateSuccessorVertex(function(immediateSuccessorVertex) {
                    var successorVertex = immediateSuccessorVertex, successorVertexName = successorVertex.getName();
                    successorVertexMap[successorVertexName] = successorVertex;
                    successorVertex.getSuccessorVertexMap(successorVertexMap);
                });
                return successorVertexMap;
            }
        },
        {
            key: "getPredecessorVertexNames",
            value: function getPredecessorVertexNames() {
                var predecessorVertices = this.getPredecessorVertices(), predecessorVertexNames = predecessorVertices.map(function(predecessorVertex) {
                    var predecessorVertexName = predecessorVertex.getName();
                    return predecessorVertexName;
                });
                return predecessorVertexNames;
            }
        },
        {
            key: "getSuccessorVertexNames",
            value: function getSuccessorVertexNames() {
                var successorVertices = this.getSuccessorVertices(), successorVertexNames = successorVertices.map(function(successorVertex) {
                    var successorVertexName = successorVertex.getName();
                    return successorVertexName;
                });
                return successorVertexNames;
            }
        },
        {
            key: "getPredecessorVertices",
            value: function getPredecessorVertices() {
                var predecessorVertexMap = this.getPredecessorVertexMap(), predecessorVertexNames = Object.keys(predecessorVertexMap), predecessorVertices = predecessorVertexNames.map(function(predecessorVertexName) {
                    var predecessorVertex = predecessorVertexMap[predecessorVertexName];
                    return predecessorVertex;
                });
                return predecessorVertices;
            }
        },
        {
            key: "getSuccessorVertices",
            value: function getSuccessorVertices() {
                var successorVertexMap = this.getSuccessorVertexMap(), successorVertexNames = Object.keys(successorVertexMap), successorVertices = successorVertexNames.map(function(successorVertexName) {
                    var successorVertex = successorVertexMap[successorVertexName];
                    return successorVertex;
                });
                return successorVertices;
            }
        },
        {
            key: "getOrderedPredecessorVertexNames",
            value: function getOrderedPredecessorVertexNames() {
                var predecessorVertices = this.getPredecessorVertices();
                _vertex.orderVertices(predecessorVertices);
                var orderedPredecessorVertices = predecessorVertices, orderedPredecessorVertexNames = _vertex.vertexNamesFromVertices(orderedPredecessorVertices);
                return orderedPredecessorVertexNames;
            }
        },
        {
            key: "retrieveForwardsAffectedVertices",
            value: function retrieveForwardsAffectedVertices(sourceVertex) {
                var forwardsAffectedVertices = this.forwardsDepthFirstSearch(function(visitedVertex) {
                    var terminate = visitedVertex === sourceVertex;
                    if (terminate) {
                        return true;
                    }
                });
                return forwardsAffectedVertices;
            }
        },
        {
            key: "retrieveBackwardsAffectedVertices",
            value: function retrieveBackwardsAffectedVertices() {
                var backwardsAffectedVertices = this.backwardsDepthFirstSearch(function(visitedVertex) {
                    var terminate = false;
                    if (terminate) {
                        return true;
                    }
                });
                return backwardsAffectedVertices;
            }
        },
        {
            key: "isVertexImmediatePredecessorVertex",
            value: function isVertexImmediatePredecessorVertex(vertex) {
                var vertexImmediatePredecessorVertex = this.immediatePredecessorVertices.includes(vertex);
                return vertexImmediatePredecessorVertex;
            }
        },
        {
            key: "isVertexImmediateSuccessorVertex",
            value: function isVertexImmediateSuccessorVertex(vertex) {
                var vertexImmediateSuccessorVertex = this.immediateSuccessorVertices.includes(vertex);
                return vertexImmediateSuccessorVertex;
            }
        },
        {
            key: "isEdgePresentBySourceVertex",
            value: function isEdgePresentBySourceVertex(sourceVertex) {
                var sourceVertexImmediatePredecessorVertex = this.isVertexImmediatePredecessorVertex(sourceVertex), edgePresent = sourceVertexImmediatePredecessorVertex; ///
                return edgePresent;
            }
        },
        {
            key: "isEdgePresentByTargetVertex",
            value: function isEdgePresentByTargetVertex(targetVertex) {
                var targetVertexImmediateSuccessorVertex = this.isVertexImmediateSuccessorVertex(targetVertex), edgePresent = targetVertexImmediateSuccessorVertex; ///
                return edgePresent;
            }
        },
        {
            key: "setName",
            value: function setName(name) {
                this.name = name;
            }
        },
        {
            key: "setIndex",
            value: function setIndex(index) {
                this.index = index;
            }
        },
        {
            key: "setVisited",
            value: function setVisited(visited) {
                this.visited = visited;
            }
        },
        {
            key: "decrementIndex",
            value: function decrementIndex() {
                this.index--;
            }
        },
        {
            key: "removeImmediatePredecessorVertex",
            value: function removeImmediatePredecessorVertex(immediatePredecessorVertex) {
                var index = this.immediatePredecessorVertices.indexOf(immediatePredecessorVertex), start = index, deleteCount = 1;
                this.immediatePredecessorVertices.splice(start, deleteCount);
            }
        },
        {
            key: "removeImmediateSuccessorVertex",
            value: function removeImmediateSuccessorVertex(immediateSuccessorVertex) {
                var index = this.immediateSuccessorVertices.indexOf(immediateSuccessorVertex), start = index, deleteCount = 1;
                this.immediateSuccessorVertices.splice(start, deleteCount);
            }
        },
        {
            key: "removeIncomingEdges",
            value: function removeIncomingEdges() {
                var immediateSuccessorVertex = this; ///
                this.immediatePredecessorVertices.forEach(function(immediatePredecessorVertex) {
                    return immediatePredecessorVertex.removeImmediateSuccessorVertex(immediateSuccessorVertex);
                });
                this.immediatePredecessorVertices = [];
            }
        },
        {
            key: "removeOutgoingEdges",
            value: function removeOutgoingEdges() {
                var immediatePredecessorVertex = this; ///
                this.immediateSuccessorVertices.forEach(function(immediateSuccessorVertex) {
                    return immediateSuccessorVertex.removeImmediateSuccessorVertex(immediatePredecessorVertex);
                });
                this.immediateSuccessorVertices = [];
            }
        },
        {
            key: "addImmediatePredecessorVertex",
            value: function addImmediatePredecessorVertex(immediatePredecessorVertex) {
                this.immediatePredecessorVertices.push(immediatePredecessorVertex);
            }
        },
        {
            key: "addImmediateSuccessorVertex",
            value: function addImmediateSuccessorVertex(immediateSuccessorVertex) {
                this.immediateSuccessorVertices.push(immediateSuccessorVertex);
            }
        },
        {
            key: "forwardsDepthFirstSearch",
            value: function forwardsDepthFirstSearch(callback) {
                var visitedVertices = [];
                this.retrieveForwardsVisitedVertices(function(visitedVertex) {
                    var terminate = callback(visitedVertex); ///
                    visitedVertices.push(visitedVertex);
                    return terminate;
                });
                visitedVertices.forEach(function(visitedVertex) {
                    return visitedVertex.resetVisited();
                });
                return visitedVertices;
            }
        },
        {
            key: "backwardsDepthFirstSearch",
            value: function backwardsDepthFirstSearch(callback) {
                var visitedVertices = [];
                this.retrieveBackwardsVisitedVertices(function(visitedVertex) {
                    var terminate = callback(visitedVertex); ///
                    visitedVertices.push(visitedVertex);
                    return terminate;
                });
                visitedVertices.forEach(function(visitedVertex) {
                    return visitedVertex.resetVisited();
                });
                return visitedVertices;
            }
        },
        {
            key: "retrieveForwardsVisitedVertices",
            value: function retrieveForwardsVisitedVertices(callback) {
                var terminate = false;
                if (this.visited === false) {
                    this.visited = true;
                    var visitedVertex = this; ///
                    terminate = callback(visitedVertex);
                    if (terminate !== true) {
                        visitedVertex.someImmediateSuccessorVertex(function(immediateSuccessorVertex) {
                            terminate = immediateSuccessorVertex.retrieveForwardsVisitedVertices(callback);
                            if (terminate) {
                                return true;
                            }
                        });
                    }
                }
                return terminate;
            }
        },
        {
            key: "retrieveBackwardsVisitedVertices",
            value: function retrieveBackwardsVisitedVertices(callback) {
                var terminate = false;
                if (this.visited === false) {
                    this.visited = true;
                    var visitedVertex = this; ///
                    terminate = callback(visitedVertex);
                    if (terminate !== true) {
                        visitedVertex.someImmediatePredecessorVertex(function(immediatePredecessorVertex) {
                            terminate = immediatePredecessorVertex.retrieveBackwardsVisitedVertices(callback);
                            if (terminate) {
                                return true;
                            }
                        });
                    }
                }
                return terminate;
            }
        },
        {
            key: "forEachImmediatePredecessorVertex",
            value: function forEachImmediatePredecessorVertex(callback) {
                this.immediatePredecessorVertices.forEach(callback);
            }
        },
        {
            key: "forEachImmediateSuccessorVertex",
            value: function forEachImmediateSuccessorVertex(callback) {
                this.immediateSuccessorVertices.forEach(callback);
            }
        },
        {
            key: "someImmediatePredecessorVertex",
            value: function someImmediatePredecessorVertex(callback) {
                this.immediatePredecessorVertices.some(callback);
            }
        },
        {
            key: "someImmediateSuccessorVertex",
            value: function someImmediateSuccessorVertex(callback) {
                this.immediateSuccessorVertices.some(callback);
            }
        },
        {
            key: "resetVisited",
            value: function resetVisited() {
                this.visited = false;
            }
        }
    ], [
        {
            key: "fromNameAndIndex",
            value: function fromNameAndIndex(name, index) {
                var visited = false, immediatePredecessorVertices = [], immediateSuccessorVertices = [], dependencyVertex = new Vertex(name, index, visited, immediatePredecessorVertices, immediateSuccessorVertices);
                return dependencyVertex;
            }
        }
    ]);
    return Vertex;
}();
exports.default = Vertex;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92ZXJ0ZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHZlcnRleE5hbWVzRnJvbVZlcnRpY2VzLCBvcmRlclZlcnRpY2VzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL3ZlcnRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZXJ0ZXgge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBpbmRleCwgdmlzaXRlZCwgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcywgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICB0aGlzLnZpc2l0ZWQgPSB2aXNpdGVkO1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXM7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcyA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgZ2V0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG4gIH1cblxuICBpc1Zpc2l0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaXRlZDtcbiAgfVxuXG4gIGlzU3RyYW5kZWQoKSB7XG4gICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlc0xlbmd0aCA9IHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5sZW5ndGgsXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXNMZW5ndGggPSB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmxlbmd0aCxcbiAgICAgICAgICBzdHJhbmRlZCA9ICgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlc0xlbmd0aCA9PT0gMCkgJiYgKGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzTGVuZ3RoID09PSAwKSk7XG5cbiAgICByZXR1cm4gc3RyYW5kZWQ7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleE5hbWVzKCkge1xuICAgIGNvbnN0IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMubWFwKChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICByZXR1cm4gaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMubWFwKChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWUgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICByZXR1cm4gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcztcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcztcbiAgfVxuXG4gIGdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzKCkge1xuICAgIHJldHVybiB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzO1xuICB9XG5cbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAocHJlZGVjZXNzb3JWZXJ0ZXhNYXAgPSB7fSkge1xuICAgIHRoaXMuZm9yRWFjaEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkgPT4ge1xuICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXggPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCwgLy8vXG4gICAgICAgICAgICBwcmVkZWNlc3NvclZlcnRleE5hbWUgPSBwcmVkZWNlc3NvclZlcnRleC5nZXROYW1lKCk7XG5cbiAgICAgIHByZWRlY2Vzc29yVmVydGV4TWFwW3ByZWRlY2Vzc29yVmVydGV4TmFtZV0gPSBwcmVkZWNlc3NvclZlcnRleDtcblxuICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXguZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhNYXAocHJlZGVjZXNzb3JWZXJ0ZXhNYXApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TWFwO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc29yVmVydGV4TWFwKHN1Y2Nlc3NvclZlcnRleE1hcCA9IHt9KSB7XG4gICAgdGhpcy5mb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IHN1Y2Nlc3NvclZlcnRleCA9IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCwgLy8vXG4gICAgICAgICAgICBzdWNjZXNzb3JWZXJ0ZXhOYW1lID0gc3VjY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgc3VjY2Vzc29yVmVydGV4TWFwW3N1Y2Nlc3NvclZlcnRleE5hbWVdID0gc3VjY2Vzc29yVmVydGV4O1xuXG4gICAgICBzdWNjZXNzb3JWZXJ0ZXguZ2V0U3VjY2Vzc29yVmVydGV4TWFwKHN1Y2Nlc3NvclZlcnRleE1hcCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TWFwO1xuICB9XG5cbiAgZ2V0UHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRpY2VzID0gdGhpcy5nZXRQcmVkZWNlc3NvclZlcnRpY2VzKCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcyA9IHByZWRlY2Vzc29yVmVydGljZXMubWFwKChwcmVkZWNlc3NvclZlcnRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lID0gcHJlZGVjZXNzb3JWZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lO1xuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRTdWNjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBzdWNjZXNzb3JWZXJ0aWNlcyA9IHRoaXMuZ2V0U3VjY2Vzc29yVmVydGljZXMoKSxcbiAgICAgICAgICBzdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHN1Y2Nlc3NvclZlcnRpY2VzLm1hcCgoc3VjY2Vzc29yVmVydGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXhOYW1lID0gc3VjY2Vzc29yVmVydGV4LmdldE5hbWUoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3NvclZlcnRleE5hbWU7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cblxuICBnZXRQcmVkZWNlc3NvclZlcnRpY2VzKCkge1xuICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4TWFwID0gdGhpcy5nZXRQcmVkZWNlc3NvclZlcnRleE1hcCgpLFxuICAgICAgICAgIHByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSBPYmplY3Qua2V5cyhwcmVkZWNlc3NvclZlcnRleE1hcCksXG4gICAgICAgICAgcHJlZGVjZXNzb3JWZXJ0aWNlcyA9IHByZWRlY2Vzc29yVmVydGV4TmFtZXMubWFwKChwcmVkZWNlc3NvclZlcnRleE5hbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByZWRlY2Vzc29yVmVydGV4ID0gcHJlZGVjZXNzb3JWZXJ0ZXhNYXBbcHJlZGVjZXNzb3JWZXJ0ZXhOYW1lXTtcblxuICAgICAgICAgICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGV4O1xuICAgICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHByZWRlY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRTdWNjZXNzb3JWZXJ0aWNlcygpIHtcbiAgICBjb25zdCBzdWNjZXNzb3JWZXJ0ZXhNYXAgPSB0aGlzLmdldFN1Y2Nlc3NvclZlcnRleE1hcCgpLFxuICAgICAgICAgIHN1Y2Nlc3NvclZlcnRleE5hbWVzID0gT2JqZWN0LmtleXMoc3VjY2Vzc29yVmVydGV4TWFwKSxcbiAgICAgICAgICBzdWNjZXNzb3JWZXJ0aWNlcyA9IHN1Y2Nlc3NvclZlcnRleE5hbWVzLm1hcCgoc3VjY2Vzc29yVmVydGV4TmFtZSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3VjY2Vzc29yVmVydGV4ID0gc3VjY2Vzc29yVmVydGV4TWFwW3N1Y2Nlc3NvclZlcnRleE5hbWVdO1xuICBcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzb3JWZXJ0ZXg7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gc3VjY2Vzc29yVmVydGljZXM7XG4gIH1cblxuICBnZXRPcmRlcmVkUHJlZGVjZXNzb3JWZXJ0ZXhOYW1lcygpIHtcbiAgICBjb25zdCBwcmVkZWNlc3NvclZlcnRpY2VzID0gdGhpcy5nZXRQcmVkZWNlc3NvclZlcnRpY2VzKCk7XG5cbiAgICBvcmRlclZlcnRpY2VzKHByZWRlY2Vzc29yVmVydGljZXMpO1xuXG4gICAgY29uc3Qgb3JkZXJlZFByZWRlY2Vzc29yVmVydGljZXMgPSBwcmVkZWNlc3NvclZlcnRpY2VzLCAgLy8vXG4gICAgICAgICAgb3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXMgPSB2ZXJ0ZXhOYW1lc0Zyb21WZXJ0aWNlcyhvcmRlcmVkUHJlZGVjZXNzb3JWZXJ0aWNlcyk7XG5cbiAgICByZXR1cm4gb3JkZXJlZFByZWRlY2Vzc29yVmVydGV4TmFtZXM7XG4gIH1cbiAgXG4gIHJldHJpZXZlRm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzKHNvdXJjZVZlcnRleCkge1xuICAgIGNvbnN0IGZvcndhcmRzQWZmZWN0ZWRWZXJ0aWNlcyA9IHRoaXMuZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKCh2aXNpdGVkVmVydGV4KSA9PiB7XG4gICAgICBjb25zdCB0ZXJtaW5hdGUgPSAodmlzaXRlZFZlcnRleCA9PT0gc291cmNlVmVydGV4KTtcbiAgICAgIFxuICAgICAgaWYgKHRlcm1pbmF0ZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICByZXR1cm4gZm9yd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICB9XG5cbiAgcmV0cmlldmVCYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzKCkge1xuICAgIGNvbnN0IGJhY2t3YXJkc0FmZmVjdGVkVmVydGljZXMgPSB0aGlzLmJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2goKHZpc2l0ZWRWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9IGZhbHNlO1xuXG4gICAgICBpZiAodGVybWluYXRlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIHJldHVybiBiYWNrd2FyZHNBZmZlY3RlZFZlcnRpY2VzO1xuICB9XG4gIFxuICBpc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHZlcnRleCkge1xuICAgIGNvbnN0IHZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmluY2x1ZGVzKHZlcnRleCk7XG5cbiAgICByZXR1cm4gdmVydGV4SW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXg7XG4gIH1cblxuICBpc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh2ZXJ0ZXgpIHtcbiAgICBjb25zdCB2ZXJ0ZXhJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmluY2x1ZGVzKHZlcnRleCk7XG5cbiAgICByZXR1cm4gdmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4O1xuICB9XG5cbiAgaXNFZGdlUHJlc2VudEJ5U291cmNlVmVydGV4KHNvdXJjZVZlcnRleCkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4ID0gdGhpcy5pc1ZlcnRleEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KHNvdXJjZVZlcnRleCksXG4gICAgICAgICAgZWRnZVByZXNlbnQgPSBzb3VyY2VWZXJ0ZXhJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleDsgLy8vXG5cbiAgICByZXR1cm4gZWRnZVByZXNlbnQ7XG4gIH1cblxuICBpc0VkZ2VQcmVzZW50QnlUYXJnZXRWZXJ0ZXgodGFyZ2V0VmVydGV4KSB7XG4gICAgY29uc3QgdGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4ID0gdGhpcy5pc1ZlcnRleEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCh0YXJnZXRWZXJ0ZXgpLFxuICAgICAgICAgIGVkZ2VQcmVzZW50ID0gdGFyZ2V0VmVydGV4SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4OyAvLy9cblxuICAgIHJldHVybiBlZGdlUHJlc2VudDtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBzZXRJbmRleChpbmRleCkge1xuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgfVxuXG4gIHNldFZpc2l0ZWQodmlzaXRlZCkge1xuICAgIHRoaXMudmlzaXRlZCA9IHZpc2l0ZWQ7XG4gIH1cblxuICBkZWNyZW1lbnRJbmRleCgpIHtcbiAgICB0aGlzLmluZGV4LS07XG4gIH1cblxuICByZW1vdmVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLmluZGV4T2YoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpLFxuICAgICAgICAgIHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gIH1cblxuICByZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLmluZGV4T2YoaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KSxcbiAgICAgICAgICBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgfVxuICBcbiAgcmVtb3ZlSW5jb21pbmdFZGdlcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXggPSB0aGlzOyAvLy9cbiAgICBcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuZm9yRWFjaCgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpID0+IGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4LnJlbW92ZUltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpKTtcblxuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcyA9IFtdO1xuICB9XG5cbiAgcmVtb3ZlT3V0Z29pbmdFZGdlcygpIHtcbiAgICBjb25zdCBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCA9IHRoaXM7IC8vL1xuXG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpID0+IGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleC5yZW1vdmVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpKTtcblxuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBbXTtcbiAgfVxuXG4gIGFkZEltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KGltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGV4KSB7XG4gICAgdGhpcy5pbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzLnB1c2goaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpO1xuICB9XG5cbiAgYWRkSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleCkge1xuICAgIHRoaXMuaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMucHVzaChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpO1xuICB9XG5cbiAgZm9yd2FyZHNEZXB0aEZpcnN0U2VhcmNoKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdmlzaXRlZFZlcnRpY2VzID0gW107XG5cbiAgICB0aGlzLnJldHJpZXZlRm9yd2FyZHNWaXNpdGVkVmVydGljZXMoKHZpc2l0ZWRWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpOyAgLy8vXG5cbiAgICAgIHZpc2l0ZWRWZXJ0aWNlcy5wdXNoKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgIH0pO1xuXG4gICAgdmlzaXRlZFZlcnRpY2VzLmZvckVhY2goKHZpc2l0ZWRWZXJ0ZXgpID0+IHZpc2l0ZWRWZXJ0ZXgucmVzZXRWaXNpdGVkKCkpO1xuXG4gICAgcmV0dXJuIHZpc2l0ZWRWZXJ0aWNlcztcbiAgfVxuXG4gIGJhY2t3YXJkc0RlcHRoRmlyc3RTZWFyY2goY2FsbGJhY2spIHtcbiAgICBjb25zdCB2aXNpdGVkVmVydGljZXMgPSBbXTtcblxuICAgIHRoaXMucmV0cmlldmVCYWNrd2FyZHNWaXNpdGVkVmVydGljZXMoKHZpc2l0ZWRWZXJ0ZXgpID0+IHtcbiAgICAgIGNvbnN0IHRlcm1pbmF0ZSA9IGNhbGxiYWNrKHZpc2l0ZWRWZXJ0ZXgpOyAgLy8vXG5cbiAgICAgIHZpc2l0ZWRWZXJ0aWNlcy5wdXNoKHZpc2l0ZWRWZXJ0ZXgpO1xuXG4gICAgICByZXR1cm4gdGVybWluYXRlO1xuICAgIH0pO1xuXG4gICAgdmlzaXRlZFZlcnRpY2VzLmZvckVhY2goKHZpc2l0ZWRWZXJ0ZXgpID0+IHZpc2l0ZWRWZXJ0ZXgucmVzZXRWaXNpdGVkKCkpO1xuXG4gICAgcmV0dXJuIHZpc2l0ZWRWZXJ0aWNlcztcbiAgfVxuXG4gIHJldHJpZXZlRm9yd2FyZHNWaXNpdGVkVmVydGljZXMoY2FsbGJhY2spIHtcbiAgICBsZXQgdGVybWluYXRlID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy52aXNpdGVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy52aXNpdGVkID0gdHJ1ZTtcblxuICAgICAgY29uc3QgdmlzaXRlZFZlcnRleCA9IHRoaXM7ICAvLy9cblxuICAgICAgdGVybWluYXRlID0gY2FsbGJhY2sodmlzaXRlZFZlcnRleCk7XG5cbiAgICAgIGlmICh0ZXJtaW5hdGUgIT09IHRydWUpIHtcbiAgICAgICAgdmlzaXRlZFZlcnRleC5zb21lSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KChpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgICB0ZXJtaW5hdGUgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgucmV0cmlldmVGb3J3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjayk7XG5cbiAgICAgICAgICBpZiAodGVybWluYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICByZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjaykge1xuICAgIGxldCB0ZXJtaW5hdGUgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLnZpc2l0ZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnZpc2l0ZWQgPSB0cnVlO1xuXG4gICAgICBjb25zdCB2aXNpdGVkVmVydGV4ID0gdGhpczsgIC8vL1xuXG4gICAgICB0ZXJtaW5hdGUgPSBjYWxsYmFjayh2aXNpdGVkVmVydGV4KTtcblxuICAgICAgaWYgKHRlcm1pbmF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICB2aXNpdGVkVmVydGV4LnNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleCgoaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgpID0+IHtcbiAgICAgICAgICB0ZXJtaW5hdGUgPSBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleC5yZXRyaWV2ZUJhY2t3YXJkc1Zpc2l0ZWRWZXJ0aWNlcyhjYWxsYmFjayk7XG5cbiAgICAgICAgICBpZiAodGVybWluYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0ZXJtaW5hdGU7XG4gIH1cblxuICBmb3JFYWNoSW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVByZWRlY2Vzc29yVmVydGljZXMuZm9yRWFjaChjYWxsYmFjayk7XG4gIH1cblxuICBmb3JFYWNoSW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5pbW1lZGlhdGVTdWNjZXNzb3JWZXJ0aWNlcy5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNvbWVJbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRleChjYWxsYmFjaykge1xuICAgIHRoaXMuaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcy5zb21lKGNhbGxiYWNrKTtcbiAgfVxuXG4gIHNvbWVJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXgoY2FsbGJhY2spIHtcbiAgICB0aGlzLmltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRpY2VzLnNvbWUoY2FsbGJhY2spO1xuICB9XG5cbiAgcmVzZXRWaXNpdGVkKCkge1xuICAgIHRoaXMudmlzaXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGZyb21OYW1lQW5kSW5kZXgobmFtZSwgaW5kZXgpIHtcbiAgICBjb25zdCB2aXNpdGVkID0gZmFsc2UsICAvLy9cbiAgICAgICAgICBpbW1lZGlhdGVQcmVkZWNlc3NvclZlcnRpY2VzID0gW10sXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMgPSBbXSxcbiAgICAgICAgICBkZXBlbmRlbmN5VmVydGV4ID0gbmV3IFZlcnRleChuYW1lLCBpbmRleCwgdmlzaXRlZCwgaW1tZWRpYXRlUHJlZGVjZXNzb3JWZXJ0aWNlcywgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGljZXMpO1xuXG4gICAgcmV0dXJuIGRlcGVuZGVuY3lWZXJ0ZXg7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFBOzs7OztJQUVBLE9BQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRUEsTUFBQTthQUFBLE1BQUEsQ0FDQSxJQUFBLEVBQUEsS0FBQSxFQUFBLE9BQUEsRUFBQSw0QkFBQSxFQUFBLDBCQUFBOzhCQURBLE1BQUE7YUFFQSxJQUFBLEdBQUEsSUFBQTthQUNBLEtBQUEsR0FBQSxLQUFBO2FBQ0EsT0FBQSxH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