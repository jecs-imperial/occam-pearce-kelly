'use strict';

class Vertex {
  constructor(name, index, visited, immediatePredecessorVertices, immediateSuccessorVertices) {
    this.name = name;
    this.index = index;
    this.visited = visited;
    this.immediatePredecessorVertices = immediatePredecessorVertices;
    this.immediateSuccessorVertices = immediateSuccessorVertices;
  }

  getName() {
    return this.name;
  }

  getIndex() {
    return this.index;
  }

  isVisited() {
    return this.visited;
  }

  getImmediatePredecessorVertices() {
    return this.immediatePredecessorVertices;
  }

  getImmediateSuccessorVertices() {
    return this.immediateSuccessorVertices;
  }

  getPredecessorVertexMap(predecessorVertexMap = {}) {
    this.forEachImmediatePredecessorVertex(function(immediatePredecessorVertex) {
      const predecessorVertex = immediatePredecessorVertex, ///
            predecessorVertexName = predecessorVertex.getName();

      predecessorVertexMap[predecessorVertexName] = predecessorVertex;

      predecessorVertex.getPredecessorVertices(predecessorVertexMap);
    });

    return predecessorVertexMap;
  }

  getPredecessorVertices() {
    const predecessorVertexMap = this.getPredecessorVertexMap(),
          predecessorVertexNames = Object.keys(predecessorVertexMap),
          predecessorVertices = predecessorVertexNames.map(function(predecessorVertexName) {
            const predecessorVertex = predecessorVertexMap[predecessorVertexName];

            return predecessorVertex;
          });

    return predecessorVertices;
  }
  
  getForwardsAffectedVertices(sourceVertex) {
    const forwardsAffectedVertices = [];

    this.forwardsDepthFirstSearch(function(visitedVertex) {
      const forwardsAffectedVertex = visitedVertex,  ///
            terminate = (forwardsAffectedVertex === sourceVertex);  ///

      forwardsAffectedVertices.push(forwardsAffectedVertex);

      return terminate;
    });

    forwardsAffectedVertices.forEach(function(forwardsAffectedVertex) {
      forwardsAffectedVertex.resetVisited();
    });

    return forwardsAffectedVertices;
  }

  getBackwardsAffectedVertices() {
    const backwardsAffectedVertices = [];

    this.backwardsDepthFirstSearch(function(visitedVertex) {
      const backwardsAffectedVertex = visitedVertex;  ///

      backwardsAffectedVertices.push(backwardsAffectedVertex);
    });

    backwardsAffectedVertices.forEach(function(backwardsAffectedVertex) {
      backwardsAffectedVertex.resetVisited();
    });

    return backwardsAffectedVertices;
  }
  
  isVertexImmediatePredecessorVertex(vertex) {
    const vertexImmediatePredecessorVertex = this.immediatePredecessorVertices.includes(vertex);

    return vertexImmediatePredecessorVertex;
  }

  isVertexImmediateSuccessorVertex(vertex) {
    const vertexImmediateSuccessorVertex = this.immediateSuccessorVertices.includes(vertex);

    return vertexImmediateSuccessorVertex;
  }

  isEdgePresentBySourceVertex(sourceVertex) {
    const sourceVertexImmediatePredecessorVertex = this.isVertexImmediatePredecessorVertex(sourceVertex),
          edgePresent = sourceVertexImmediatePredecessorVertex; ///

    return edgePresent;
  }

  isEdgePresentByTargetVertex(targetVertex) {
    const targetVertexImmediateSuccessorVertex = this.isVertexImmediateSuccessorVertex(targetVertex),
          edgePresent = targetVertexImmediateSuccessorVertex; ///

    return edgePresent;
  }

  setName(name) {
    this.name = name;
  }

  setIndex(index) {
    this.index = index;
  }

  setVisited(visited) {
    this.visited = visited;
  }

  removeImmediatePredecessorVertex(immediatePredecessorVertex) {
    const index = this.immediatePredecessorVertices.indexOf(immediatePredecessorVertex),
          start = index,  ///
          deleteCount = 1;

    this.immediatePredecessorVertices.splice(start, deleteCount);
  }

  removeImmediateSuccessorVertex(immediateSuccessorVertex) {
    const index = this.immediateSuccessorVertices.indexOf(immediateSuccessorVertex),
          start = index,  ///
          deleteCount = 1;

    this.immediateSuccessorVertices.splice(start, deleteCount);
  }

  resetVisited() {
    this.visited = false;
  }

  addImmediatePredecessorVertex(immediatePredecessorVertex) {
    this.immediatePredecessorVertices.push(immediatePredecessorVertex);
  }

  addImmediateSuccessorVertex(immediateSuccessorVertex) {
    this.immediateSuccessorVertices.push(immediateSuccessorVertex);
  }
  
  forwardsDepthFirstSearch(callback) {
    let terminate = false;

    if (this.visited === false) {
      this.visited = true;

      const visitedVertex = this;  ///

      terminate = callback(visitedVertex);

      if (terminate !== true) {
        this.someImmediateSuccessorVertex(function(immediateSuccessorVertex) {
          terminate = immediateSuccessorVertex.forwardsDepthFirstSearch(callback);

          return terminate;
        });
      }
    }

    return terminate;
  }

  backwardsDepthFirstSearch(callback) {
    let terminate = false;

    if (this.visited === false) {
      this.visited = true;

      const visitedVertex = this;  ///

      terminate = callback(visitedVertex);

      if (terminate !== true) {
        this.someImmediatePredecessorVertex(function(immediatePredecessorVertex) {
          terminate = immediatePredecessorVertex.backwardsDepthFirstSearch(callback);

          return terminate;
        });
      }
    }

    return terminate;
  }

  forEachImmediatePredecessorVertex(callback) {
    this.immediatePredecessorVertices.forEach(callback);
  }

  forEachImmediateSuccessorVertex(callback) {
    this.immediateSuccessorVertices.forEach(callback);
  }

  someImmediatePredecessorVertex(callback) {
    this.immediatePredecessorVertices.some(callback);
  }

  someImmediateSuccessorVertex(callback) {
    this.immediateSuccessorVertices.some(callback);
  }

  static fromNameAndIndex(name, index) {
    const visited = false,  ///
          immediatePredecessorVertices = [],
          immediateSuccessorVertices = [],
          dependencyVertex = new Vertex(name, index, visited, immediatePredecessorVertices, immediateSuccessorVertices);

    return dependencyVertex;
  }
}

module.exports = Vertex;
