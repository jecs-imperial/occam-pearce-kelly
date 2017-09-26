'use strict';

const necessary = require('necessary');

const Edge = require('./edge'),
      Vertex = require('./vertex'),
      vertexUtilities = require('./utilities/vertex');

const { arrayUtilities } = necessary,
      { last} = arrayUtilities,
      { vertexNamesFromVertices, topologicallyOrderVertices } = vertexUtilities;

class DirectedAcyclicGraph {
  constructor(vertexMap) {
    this.vertexMap = vertexMap;
  }

  isEmpty() {
    const vertices = this.getVertices(),
        verticesLength = vertices.length,
        empty = (verticesLength === 0);

    return empty;
  }

  getVertices() {
    const vertices = Object.values(this.vertexMap);

    return vertices;
  }

  getVertexNames() {
    const vertexNames = Object.keys(this.vertexMap);

    return vertexNames;
  }

  getVertexByVertexName(vertexName) {
    const vertexPresent = this.isVertexPresentByVertexName(vertexName),
          vertex = vertexPresent ?
                     this.vertexMap[vertexName] :
                       null;

    return vertex;
  }

  setVertexByVertexName(vertexName, vertex) {
    this.vertexMap[vertexName] = vertex;
  }

  unsetVertexByVertexName(vertexName) {
    delete this.vertexMap[vertexName];
  }

  isEdgePresent(edge) {
    const sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);
    
    return edgePresent;
  }

  isEdgePresentByVertexNames(sourceVertexName, targetVertexName) {
    let edgePresent = false;

    const sourceVertex = this.getVertexByVertexName(sourceVertexName),
        targetVertex = this.getVertexByVertexName(targetVertexName),
        sourceVertexAndTargetVertexPresent = (sourceVertex !== null) && (targetVertex !== null);

    if (sourceVertexAndTargetVertexPresent) {
      const targetVertexSourceVertexImmediateSuccessorVertex = sourceVertex.isVertexImmediateSuccessorVertex(targetVertex),
          sourceVertexTargetVertexImmediatePredecessorVertex = targetVertex.isVertexImmediatePredecessorVertex(sourceVertex);

      edgePresent = (targetVertexSourceVertexImmediateSuccessorVertex && sourceVertexTargetVertexImmediatePredecessorVertex);
    }

    return edgePresent;
  }

  isVertexPresentByVertexName(vertexName) {
    const vertexNames = this.getVertexNames(),
          vertexNamesIncludesVertexName = vertexNames.includes(vertexName),
          vertexPresent = vertexNamesIncludesVertexName;  ///

    return vertexPresent;
  }

  getPredecessorVertexNamesByVertexName(vertexName) {
    const vertex = this.getVertexByVertexName(vertexName),
          predecessorVertexNames = vertex.getPredecessorVertexNames();

    return predecessorVertexNames;
  }

  getSuccessorVertexNamesByVertexName(vertexName) {
    const vertex = this.getVertexByVertexName(vertexName),
          successorVertexNames = vertex.getSuccessorVertexNames();
    
    return successorVertexNames;
  }

  getTopologicallyOrderedVertexNames() {
    const vertices = this.getVertices();

    topologicallyOrderVertices(vertices);

    const topologicallyOrderedVertices = vertices, ///
          topologicallyOrderedVertexNames = vertexNamesFromVertices(topologicallyOrderedVertices);

    return topologicallyOrderedVertexNames;
  }

  addEdge(edge) {
    const sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          success = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);

    return success;
  }

  removeEdge(edge) {
    const sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName();

    this.removeEdgeByVertexNames(sourceVertexName, targetVertexName);
  }

  addEdgeByVertexNames(sourceVertexName, targetVertexName) {
    let success = false;

    if (sourceVertexName !== targetVertexName) {
      const sourceVertex = this.addVertexByVertexName(sourceVertexName),
            targetVertex = this.addVertexByVertexName(targetVertexName),
            edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);

      if (!edgePresent) {
        const sourceVertexIndex = sourceVertex.getIndex(),
              targetVertexIndex = targetVertex.getIndex(),
              invalidatingEdge = (sourceVertexIndex > targetVertexIndex);

        if (invalidatingEdge) {
          success = addEdgeByVertices(sourceVertex, targetVertex);
        } else {
          success = true;
        }
      }

      if (success) {
        const immediatePredecessorVertex = sourceVertex, ///
              immediateSuccessorVertex = targetVertex; ///

        immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

        immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
      }
    }
    
    return success;
  }

  removeEdgeByVertexNames(sourceVertexName, targetVertexName) {
    const edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);

    if (edgePresent) {
      const sourceVertex = this.getVertexByVertexName(sourceVertexName),
           targetVertex = this.getVertexByVertexName(targetVertexName);

      sourceVertex.removeImmediateSuccessorVertex(targetVertex);
      targetVertex.removeImmediatePredecessorVertex(sourceVertex);
    }
  }

  removeEdgesBySourceVertexName(sourceVertexName) {
    const sourceVertexPresent = this.isVertexPresentByVertexName(sourceVertexName);

    if (sourceVertexPresent) {
      const sourceVertex = this.getVertexByVertexName(sourceVertexName);

      sourceVertex.removeOutgoingEdges();
    }
  }

  removeEdgesByTargetVertexName(targetVertexName) {
    const targetVertexPresent = this.isVertexPresentByVertexName(targetVertexName);

    if (targetVertexPresent) {
      const targetVertex = this.getVertexByVertexName(targetVertexName);

      targetVertex.removeIncomingEdges();
    }
  }

  addVertexByVertexName(vertexName) {
    const vertexPresent = this.isVertexPresentByVertexName(vertexName);

    if (!vertexPresent) {
      const vertexNames = this.getVertexNames(),
          vertexNamesLength = vertexNames.length,
          name = vertexName,  ///
          index = vertexNamesLength, ///
          vertex = Vertex.fromNameAndIndex(name, index);

      this.setVertexByVertexName(vertexName, vertex);
    }

    const vertex = this.getVertexByVertexName(vertexName);

    return vertex;
  }

  removeVertexByVertexName(vertexName) {
    let removedEdges = null;

    const vertexPresent = this.isVertexPresentByVertexName(vertexName);

    if (vertexPresent) {
      removedEdges = [];

      const vertex = this.getVertexByVertexName(vertexName);

      vertex.forEachImmediateSuccessorVertex(function(immediateSuccessVertex) {
        const immediatePredecessorVertex = vertex,  ///
              immediatePredecessorVertexName = immediatePredecessorVertex.getName(),
              immediateSuccessVertexName = immediateSuccessVertex.getName(),
              removedEdgeSourceVertexName = immediatePredecessorVertexName, ///
              removedEdgeTargetVertexName = immediateSuccessVertexName, ///
              removedEdge = new Edge(removedEdgeSourceVertexName, removedEdgeTargetVertexName);

        removedEdges.push(removedEdge);

        immediateSuccessVertex.removeImmediatePredecessorVertex(immediatePredecessorVertex);
      });

      vertex.forEachImmediatePredecessorVertex(function(immediatePredecessorVertex) {
        const immediateSuccessVertex = vertex,  ///
              immediatePredecessorVertexName = immediatePredecessorVertex.getName(),
              immediateSuccessVertexName = immediateSuccessVertex.getName(),  ///
              removedEdgeSourceVertexName = immediatePredecessorVertexName, ///
              removedEdgeTargetVertexName = immediateSuccessVertexName, ///
              removedEdge = new Edge(removedEdgeSourceVertexName, removedEdgeTargetVertexName);

        removedEdges.push(removedEdge);

        immediatePredecessorVertex.removeImmediateSuccessorVertex(immediateSuccessVertex);
      });

      this.unsetVertexByVertexName(vertexName);
    }

    return removedEdges;
  }

  static fromNothing() {
    const vertexMap = {},
          directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);

    return directedAcyclicGraph;
  }
  
  static fromVertexNames(vertexNames) {
    const vertexMap = vertexMapFromVertexNames(vertexNames);

    const directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);

    return directedAcyclicGraph;
  }

  static fromTopologicallyOrderedVertices(topologicallyOrderedVertices) {
    const vertexMap = vertexMapFromTopologicallyOrderedVertices(topologicallyOrderedVertices);
    
    addEdgesToVertices(topologicallyOrderedVertices, vertexMap);
    
    const directedAcyclicGraph = new DirectedAcyclicGraph(vertexMap);
    
    return directedAcyclicGraph;
  }
}

module.exports = DirectedAcyclicGraph;

function addEdgeByVertices(sourceVertex, targetVertex) {
  let success = false;

  const forwardsAffectedVertices = targetVertex.getForwardsAffectedVertices(sourceVertex),
        lastForwardsAffectedVertex = last(forwardsAffectedVertices),
        resultsInCycle = (lastForwardsAffectedVertex === sourceVertex);

  if (!resultsInCycle) {
    const backwardsAffectedVertices = sourceVertex.getBackwardsAffectedVertices();

    topologicallyOrderVertices(backwardsAffectedVertices);

    topologicallyOrderVertices(forwardsAffectedVertices);

    const affectedVertices = [].concat(backwardsAffectedVertices).concat(forwardsAffectedVertices),
          affectedVertexIndices = affectedVertices.map(function(affectedVertex) {
            const affectedVertexIndex = affectedVertex.getIndex();

            return affectedVertexIndex;
          });

    affectedVertexIndices.sort();

    affectedVertices.forEach(function(affectedVertex, index) {
      const affectedVertexIndex = affectedVertexIndices[index];

      affectedVertex.setIndex(affectedVertexIndex);
    });

    success = true;
  }

  return success;
}

function vertexMapFromVertexNames(vertexNames) {
  const vertexMap = {};
  
  vertexNames.forEach(function(vertexName, index) {
    const name = vertexName,  ///
          vertex = Vertex.fromNameAndIndex(name, index);

    vertexMap[vertexName] = vertex;
  });
  
  return vertexMap;
}

function vertexMapFromTopologicallyOrderedVertices(topologicallyOrderedVertices) {
  const vertexMap = {};
  
  topologicallyOrderedVertices.forEach(function(topologicallyOrderedVertex, index) {
    const name = topologicallyOrderedVertex.getName(),
          vertex = Vertex.fromNameAndIndex(name, index),
          vertexName = name;  ///

    vertexMap[vertexName] = vertex;
  });

  return vertexMap;
}

function addEdgesToVertices(topologicallyOrderedVertices, vertexMap) {
  topologicallyOrderedVertices.forEach(function(topologicallyOrderedVertex) {
    topologicallyOrderedVertex.forEachOutgoingEdge(function(outgoingEdge) {
      const sourceVertexName = outgoingEdge.getSourceVertexName(),
            targetVertexName = outgoingEdge.getTargetVertexName(),
            immediatePredecessorVertexName = sourceVertexName,  ///
            immediateSuccessorVertexName = targetVertexName,
            immediatePredecessorVertex = vertexMap[immediatePredecessorVertexName], ///
            immediateSuccessorVertex = vertexMap[immediateSuccessorVertexName]; ///

      immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

      immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
    });
  });
}
