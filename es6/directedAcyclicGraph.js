'use strict';

const necessary = require('necessary');

const Edge = require('./edge'),
      Vertex = require('./vertex'),
      vertexUtilities = require('./utilities/vertex');

const { arrayUtilities } = necessary,
      { last } = arrayUtilities,
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
    const vertexMapValues = Object.values(this.vertexMap),
          vertices = vertexMapValues; ///

    return vertices;
  }

  getVertexNames() {
    const vertexMapKeys = Object.keys(this.vertexMap),
          vertexNames = vertexMapKeys;  ///

    return vertexNames;
  }

  getVertexByVertexName(vertexName) {
    const vertexPresent = this.isVertexPresentByVertexName(vertexName),
          vertex = vertexPresent ?
                     this.vertexMap[vertexName] :
                       null;

    return vertex;
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

  getEdgesByTargetVertexName(targetVertexName) {
    const edges = [],
          targetVertex = this.getVertexByVertexName(targetVertexName);

    if (targetVertex !== null) {
      const immediatePredecessorVertexNames = targetVertex.getImmediatePredecessorVertexNames(),
            sourceVertexNames = immediatePredecessorVertexNames;  ///

      sourceVertexNames.forEach(function(sourceVertexName) {
        const edge = Edge.fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);

        edges.push(edge);
      });
    }

    return edges;
  }

  getEdgesBySourceVertexName(sourceVertexName) {
    const edges = [],
          sourceVertex = this.getVertexByVertexName(sourceVertexName);

    if (sourceVertex !== null) {
      const immediateSuccessorVertexNames = sourceVertex.getImmediateSuccessorVertexNames(),
            targetVertexNames = immediateSuccessorVertexNames;  ///

      targetVertexNames.forEach(function(targetVertexName) {
        const edge = Edge.fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);

        edges.push(edge);
      });
    }

    return edges;
  }

  setVertexByVertexName(vertexName, vertex) {
    this.vertexMap[vertexName] = vertex;
  }

  deleteVertexByVertexName(vertexName) {
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
      edgePresent = sourceVertex.isEdgePresentByTargetVertex(targetVertex);
    }

    return edgePresent;
  }

  isVertexPresentByVertexName(vertexName) {
    const vertexNames = this.getVertexNames(),
          vertexNamesIncludesVertexName = vertexNames.includes(vertexName),
          vertexPresent = vertexNamesIncludesVertexName;  ///

    return vertexPresent;
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
      
      if (edgePresent) {
        success = true;
      } else {
        const sourceVertexIndex = sourceVertex.getIndex(),
              targetVertexIndex = targetVertex.getIndex(),
              invalidatingEdge = (sourceVertexIndex > targetVertexIndex);

        success = invalidatingEdge ?
                    addInvalidatingEdgeByVertices(sourceVertex, targetVertex) :
                      true;

        if (success) {
          const immediatePredecessorVertex = sourceVertex, ///
                immediateSuccessorVertex = targetVertex; ///

          immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

          immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
        }
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

      this.deleteVertexByVertexName(vertexName);

      const deletedVertex = vertex, ///
            deletedVertexIndex = deletedVertex.getIndex(),
            vertices = this.getVertices(),
            affectedVertices = vertices.reduce(function(affectedVertices, vertex) {
              const vertexIndex = vertex.getIndex(),
                    vertexAffected = (vertexIndex > deletedVertexIndex);

              if (vertexAffected) {
                const affectedVertex = vertex;  ///

                affectedVertices.push(affectedVertex);
              }

              return affectedVertices;
            }, []);

      affectedVertices.forEach(function(affectedVertex) {
        affectedVertex.decrementIndex();
      });
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

function addInvalidatingEdgeByVertices(sourceVertex, targetVertex) {
  let success = false;

  const forwardsAffectedVertices = targetVertex.retrieveForwardsAffectedVertices(sourceVertex),
        lastForwardsAffectedVertex = last(forwardsAffectedVertices),
        resultsInCycle = (lastForwardsAffectedVertex === sourceVertex);

  if (!resultsInCycle) {
    const backwardsAffectedVertices = sourceVertex.retrieveBackwardsAffectedVertices();

    topologicallyOrderVertices(backwardsAffectedVertices);

    topologicallyOrderVertices(forwardsAffectedVertices);

    const affectedVertices = [].concat(backwardsAffectedVertices).concat(forwardsAffectedVertices),
          affectedVertexIndices = affectedVertices.map(function(affectedVertex) {
            const affectedVertexIndex = affectedVertex.getIndex();

            return affectedVertexIndex;
          });

    affectedVertexIndices.sort((indexA, indexB) => (indexA - indexB));

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
