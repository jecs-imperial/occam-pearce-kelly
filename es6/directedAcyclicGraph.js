'use strict';

const necessary = require('necessary');

const Edge = require('./edge'),
      Vertex = require('./vertex'),
      vertexUtilities = require('./utilities/vertex');

const { array } = necessary,
      { last} = array,
      { vertexNamesFromVertices, topologicallyOrderVertices } = vertexUtilities;

class DirectedAcyclicGraph {
  constructor(vertexMap) {
    this.vertexMap = vertexMap;
  }

  getVertices() {
    const vertices = Object.values(this.vertexMap);

    return vertices;
  }

  getVertexNames() {
    const vertexNames = Object.keys(this.vertexMap);

    return vertexNames;
  }

  getTopologicallyOrderedVertexNames() {
    const vertices = this.getVertices();

    topologicallyOrderVertices(vertices);
    
    const topologicallyOrderedVertices = vertices, ///
          topologicallyOrderedVertexNames = vertexNamesFromVertices(topologicallyOrderedVertices);
    
    return topologicallyOrderedVertexNames;
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

  isEmpty() {
    const vertices = this.getVertices(),
          verticesLength = vertices.length,
          empty = (verticesLength === 0);

    return empty;
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

  addEdge(edge) {
    const sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          cyclicVertexNames = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);

    return cyclicVertexNames;
  }

  addEdgeByVertexNames(sourceVertexName, targetVertexName) {
    let cyclicVertices = null;

    if (sourceVertexName === targetVertexName) {
      const cyclicVertexName = sourceVertexName,  ///
            cyclicVertex = this.getVertexByVertexName(cyclicVertexName);

        cyclicVertices = [cyclicVertex];
    } else {
      const sourceVertex = this.addVertexByVertexName(sourceVertexName),
            targetVertex = this.addVertexByVertexName(targetVertexName),
            edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);

      if (!edgePresent) {
        const sourceVertexIndex = sourceVertex.getIndex(),
              targetVertexIndex = targetVertex.getIndex(),
              invalidatingEdge = (sourceVertexIndex > targetVertexIndex);

        if (invalidatingEdge) {
          cyclicVertices = this.validateEdgeByVertices(sourceVertex, targetVertex);
        }

        const cycleMissing = (cyclicVertices === null); ///

        if (cycleMissing) {
          const immediatePredecessorVertex = sourceVertex, ///
                immediateSuccessorVertex = targetVertex; ///

          immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

          immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
        }
      }
    }
    
    const cyclicVertexNames = (cyclicVertices !== null) ?
                                vertexNamesFromVertices(cyclicVertices) :
                                  null;

    return cyclicVertexNames;
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

  removeEdge(edge) {
    const sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName();

    this.removeEdgeByVertexNames(sourceVertexName, targetVertexName);
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

  validateEdgeByVertices(sourceVertex, targetVertex) {
    let cyclicVertices = null;

    const forwardsAffectedVertices = targetVertex.getForwardsAffectedVertices(sourceVertex),
          lastForwardsAffectedVertex = last(forwardsAffectedVertices),
          cyclePresent = (lastForwardsAffectedVertex === sourceVertex);
    
    if (cyclePresent) {
      cyclicVertices = forwardsAffectedVertices;
    } else {
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
    }

    return cyclicVertices;
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
