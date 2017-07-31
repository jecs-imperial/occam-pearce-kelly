'use strict';

const Vertex = require('./vertex'),
      arrayUtil = require('./util/array');

class DirectedAcyclicGraph {
  constructor(vertexMap) {
    this.vertexMap = vertexMap;
  }

  isVertexPresent(vertexName) {
    const vertexPresent = this.vertexMap.hasOwnProperty(vertexName);

    return vertexPresent;
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
    const vertexPresent = this.isVertexPresent(vertexName),
          vertex = vertexPresent ?
                    this.vertexMap[vertexName] :
                      null;

    return vertex;
  }

  addVertexByVertexName(vertexName) {
    const vertexPresent = this.isVertexPresent(vertexName);

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
          cyclicVertices = this.validateEdge(sourceVertex, targetVertex);
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
    let success = false;

    const edgePresent = this.isEdgePresentByVertexNames(sourceVertexName, targetVertexName);
    
    if (edgePresent) {
      const sourceVertex = this.retrieveVertexByVertexName(sourceVertexName),
            targetVertex = this.retrieveVertexByVertexName(targetVertexName);

      sourceVertex.removeImmediateSuccessorVertex(targetVertex);
      targetVertex.removeImmediatePredecessorVertex(sourceVertex);
      
      success = true;      
    }

    return success;
  }
  
  addEdge(edge) {
    const sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          cyclicVertexNames = this.addEdgeByVertexNames(sourceVertexName, targetVertexName);

    return cyclicVertexNames;
  }

  validateEdge(sourceVertex, targetVertex) {
    let cyclicVertices = null;

    const forwardsAffectedVertices = targetVertex.getForwardsAffectedVertices(sourceVertex),
          lastForwardsAffectedVertex = arrayUtil.last(forwardsAffectedVertices),
          cyclePresent = (lastForwardsAffectedVertex === sourceVertex);
    
    if (cyclePresent) {
      cyclicVertices = forwardsAffectedVertices;
    } else {
      const backwardsAffectedVertices = sourceVertex.getBackwardsAffectedVertices();

      DirectedAcyclicGraph.sortVertices(backwardsAffectedVertices);

      DirectedAcyclicGraph.sortVertices(forwardsAffectedVertices);

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

  mapVertex(callback) {
    const vertexNames = Object.keys(this.vertexMap),
          result = vertexNames.map(function(vertexName) {
            const vertex = this.vertexMap[vertexName],
                  result = callback(vertex);
            
            return result;
          }.bind(this));
    
    return result;
  }

  forEachVertex(callback) {
    const vertexNames = Object.keys(this.vertexMap);

    vertexNames.forEach(function(vertexName) {
      const vertex = this.vertexMap[vertexName];

      callback(vertex);
    }.bind(this));
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

  static sortVertices(vertices) {
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
      const sourceVertex = outgoingEdge.getSourceVertex(),
            targetVertex = outgoingEdge.getTargetVertex(),
            sourceVertexName = sourceVertex.getName(),
            targetVertexName = targetVertex.getName(),
            immediatePredecessorVertexName = sourceVertexName,  ///
            immediateSuccessorVertexName = targetVertexName,
            immediatePredecessorVertex = vertexMap[immediatePredecessorVertexName], ///
            immediateSuccessorVertex = vertexMap[immediateSuccessorVertexName]; ///

      immediatePredecessorVertex.addImmediateSuccessorVertex(immediateSuccessorVertex);

      immediateSuccessorVertex.addImmediatePredecessorVertex(immediatePredecessorVertex);
    });
  });
}
