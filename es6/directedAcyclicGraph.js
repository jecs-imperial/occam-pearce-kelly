'use strict';

const necessary = require('necessary');

const Edge = require('./edge'),
      Vertex = require('./vertex');

const { array } = necessary,
      { last} = array;

class DirectedAcyclicGraph {
  constructor(vertexMap) {
    this.vertexMap = vertexMap;
  }

  getVertexNames() {
    const vertexNames = Object.keys(this.vertexMap);

    return vertexNames;
  }

  getVertices() {
    const vertices = Object.values(this.vertexMap);

    return vertices;
  }

  getTopologicallyOrderedVertexNames() {
    const vertices = this.getVertices(),
          topologicallyOrderedVertices = DirectedAcyclicGraph.topologicallyOrderVertices(vertices),
          topologicallyOrderedVertexNames = topologicallyOrderedVertices.map(function(topologicallyOrderedVertex) {
            const topologicallyOrderedVertexName = topologicallyOrderedVertex.getName();

            return topologicallyOrderedVertexName;
          });

    return topologicallyOrderedVertexNames;
  }

  isEdgePresent(edge) {
    const sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);
    
    return edgePresent;
  }
  
  isVertexPresentByVertexName(vertexName) {
    const vertexPresent = this.vertexMap.hasOwnProperty(vertexName);

    return vertexPresent;
  }

  removeEdgesBySourceVertexName(sourceVertexName) {
    const sourceVertexPresent = this.isVertexPresentByVertexName(sourceVertexName);
    
    if (sourceVertexPresent) {
      const sourceVertex = this.retrieveVertexByVertexName(sourceVertexName);

      sourceVertex.removeOutgoingEdges();         
    }
  }

  removeEdgesByTargetVertexName(targetVertexName) {
    const targetVertexPresent = this.isVertexPresentByVertexName(targetVertexName);

    if (targetVertexPresent) {
      const targetVertex = this.retrieveVertexByVertexName(targetVertexName);

      targetVertex.removeIncomingEdges();
    }
  }

  isEdgePresentByVertexNames(sourceVertexName, targetVertexName) {
    let edgePresent = false;

    const sourceVertex = this.retrieveVertexByVertexName(sourceVertexName),
          targetVertex = this.retrieveVertexByVertexName(targetVertexName),
          sourceVertexAndTargetVertexPresent = (sourceVertex !== null) && (targetVertex !== null);

    if (sourceVertexAndTargetVertexPresent) {
      const targetVertexSourceVertexImmediateSuccessorVertex = sourceVertex.isVertexImmediateSuccessorVertex(targetVertex),
            sourceVertexTargetVertexImmediatePredecessorVertex = targetVertex.isVertexImmediatePredecessorVertex(sourceVertex);

      edgePresent = (targetVertexSourceVertexImmediateSuccessorVertex && sourceVertexTargetVertexImmediatePredecessorVertex);
    }

    return edgePresent;
  }

  retrieveVertexByVertexName(vertexName) {
    const vertexPresent = this.isVertexPresentByVertexName(vertexName),
          vertex = vertexPresent ?
                    this.vertexMap[vertexName] :
                      null;

    return vertex;
  }

  addEdge(edge) {
    const sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          cyclicVertexNames = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);

    return cyclicVertexNames;
  }
  
  removeEdge(edge) {
    const sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName();

    this.removeEdgeByVertexNames(sourceVertexName, targetVertexName);
  }

  addVertexByVertexName(vertexName) {
    const vertexPresent = this.isVertexPresentByVertexName(vertexName);

    if (!vertexPresent) {
      const vertexNames = Object.keys(this.vertexMap),
            vertexNamesLength = vertexNames.length,
            name = vertexName,  ///
            index = vertexNamesLength, ///
            vertex = Vertex.fromNameAndIndex(name, index);

      this.vertexMap[vertexName] = vertex;
    }

    const vertex = this.vertexMap[vertexName];

    return vertex;
  }

  removeVertexByVertexName(vertexName) {
    let removedEdges = null;
    
    const vertexPresent = this.isVertexPresentByVertexName(vertexName);

    if (vertexPresent) {
      removedEdges = [];
      
      const vertex = this.retrieveVertexByVertexName(vertexName);

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

      delete this.vertexMap[vertexName];
    }
    
    return removedEdges;
  }

  addEdgeByVertexNames(sourceVertexName, targetVertexName) {
    let cyclicVertices = null;

    if (sourceVertexName === targetVertexName) {
      const cyclicVertexName = sourceVertexName,  ///
            cyclicVertex = this.vertexMap[cyclicVertexName];

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

    let cyclicVertexNames = null;

    if (cyclicVertices !== null) {
      cyclicVertexNames = cyclicVertices.map(function(cyclicVertex) {
        const cyclicVertexName = cyclicVertex.getName();

        return cyclicVertexName;
      });
    }

    return cyclicVertexNames;
  }

  removeEdgeByVertexNames(sourceVertexName, targetVertexName) {
    const edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);

    if (edgePresent) {
      const sourceVertex = this.retrieveVertexByVertexName(sourceVertexName),
            targetVertex = this.retrieveVertexByVertexName(targetVertexName);

      sourceVertex.removeImmediateSuccessorVertex(targetVertex);
      targetVertex.removeImmediatePredecessorVertex(sourceVertex);
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

      DirectedAcyclicGraph.topologicallyOrderVertices(backwardsAffectedVertices);

      DirectedAcyclicGraph.topologicallyOrderVertices(forwardsAffectedVertices);

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

  static topologicallyOrderVertices(vertices) {  ///
    vertices = vertices.slice();  ///

    vertices.sort(function(firstVertex, secondVertex) {
      const firstVertexIndex = firstVertex.getIndex(),
            secondVertexIndex = secondVertex.getIndex();

      if (false) {

      } else  if (firstVertexIndex < secondVertexIndex) {
        return -1;
      } else  if (firstVertexIndex > secondVertexIndex) {
        return +1;
      }
    });

    const topologicallyOrderedVertices = vertices;  ///

    return topologicallyOrderedVertices;
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
