'use strict';

const vertexUtilities = require('./utilities/vertex');

const { vertexNamesFromVertices, topologicallyOrderVertices } = vertexUtilities;

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

  getSuccessorVertexMap(successorVertexMap = {}) {
    this.forEachImmediateSuccessorVertex(function(immediateSuccessorVertex) {
      const successorVertex = immediateSuccessorVertex, ///
            successorVertexName = successorVertex.getName();

      successorVertexMap[successorVertexName] = successorVertex;

      successorVertex.getSuccessorVertices(successorVertexMap);
    });

    return successorVertexMap;
  }
  
  getPredecessorVertexNames() {
    const predecessorVertices = this.getPredecessorVertices(),
          predecessorVertexNames = predecessorVertices.map(function(predecessorVertex) {
            const predecessorVertexName = predecessorVertex.getName();
            
            return predecessorVertexName;
          });
    
    return predecessorVertexNames;
  }

  getSuccessorVertexNames() {
    const successorVertices = this.getSuccessorVertices(),
          successorVertexNames = successorVertices.map(function(successorVertex) {
          const successorVertexName = successorVertex.getName();

          return successorVertexName;
        });

    return successorVertexNames;
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

  getSuccessorVertices() {
    const successorVertexMap = this.getSuccessorVertexMap(),
          successorVertexNames = Object.keys(successorVertexMap),
          successorVertices = successorVertexNames.map(function(successorVertexName) {
            const successorVertex = successorVertexMap[successorVertexName];
  
            return successorVertex;
          });

    return successorVertices;
  }

  getTopologicallyOrderedPredecessorVertexNames() {
    const predecessorVertices = this.getPredecessorVertices();

    topologicallyOrderVertices(predecessorVertices);

    const topologicallyOrderedPredecessorVertices = predecessorVertices,  ///
          topologicallyOrderedPredecessorVertexNames = vertexNamesFromVertices(topologicallyOrderedPredecessorVertices);

    return topologicallyOrderedPredecessorVertexNames;
  }
  
  retrieveForwardsAffectedVertices(sourceVertex) {
    const forwardsAffectedVertices = this.forwardsDepthFirstSearch(function(visitedVertex) {
      const terminate = (visitedVertex === sourceVertex);
      
      return terminate;
    });
    
    return forwardsAffectedVertices;
  }

  retrieveBackwardsAffectedVertices() {
    const backwardsAffectedVertices = this.backwardsDepthFirstSearch(function(visitedVertex) {
      const terminate = false;
      
      return terminate;
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
  
  removeIncomingEdges() {
    const immediateSuccessorVertex = this; ///
    
    this.immediatePredecessorVertices.forEach(function(immediatePredecessorVertex) {
      immediatePredecessorVertex.removeImmediateSuccessorVertex(immediateSuccessorVertex);
    });

    this.immediatePredecessorVertices = [];
  }

  removeOutgoingEdges() {
    const immediatePredecessorVertex = this; ///

    this.immediateSuccessorVertices.forEach(function(immediateSuccessorVertex) {
      immediateSuccessorVertex.removeImmediateSuccessorVertex(immediatePredecessorVertex);
    });

    this.immediateSuccessorVertices = [];
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
    const visitedVertices = [];

    this.retrieveForwardsVisitedVertices(function(visitedVertex) {
      const terminate = callback(visitedVertex);  ///

      visitedVertices.push(visitedVertex);

      return terminate;
    });

    visitedVertices.forEach(function(visitedVertex) {
      visitedVertex.resetVisited();
    });

    return visitedVertices;
  }

  backwardsDepthFirstSearch(callback) {
    const visitedVertices = [];

    this.retrieveBackwardsVisitedVertices(function(visitedVertex) {
      const terminate = callback(visitedVertex);  ///

      visitedVertices.push(visitedVertex);

      return terminate;
    });

    visitedVertices.forEach(function(visitedVertex) {
      visitedVertex.resetVisited();
    });

    return visitedVertices;
  }

  retrieveForwardsVisitedVertices(callback) {
    let terminate = false;

    if (this.visited === false) {
      this.visited = true;

      const visitedVertex = this;  ///

      terminate = callback(visitedVertex);

      if (terminate !== true) {
        this.someImmediateSuccessorVertex(function(immediateSuccessorVertex) {
          terminate = immediateSuccessorVertex.retrieveForwardsVisitedVertices(callback);

          return terminate;
        });
      }
    }

    return terminate;
  }

  retrieveBackwardsVisitedVertices(callback) {
    let terminate = false;

    if (this.visited === false) {
      this.visited = true;

      const visitedVertex = this;  ///

      terminate = callback(visitedVertex);

      if (terminate !== true) {
        this.someImmediatePredecessorVertex(function(immediatePredecessorVertex) {
          terminate = immediatePredecessorVertex.retrieveBackwardsVisitedVertices(callback);

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
