'use strict';

class Edge {
  constructor(sourceVertexName, targetVertexName) {
    this.sourceVertexName = sourceVertexName;
    this.targetVertexName = targetVertexName;
  }
  
  getSourceVertexName() {
    return this.sourceVertexName;
  }
  
  getTargetVertexName() {
    return this.targetVertexName;
  }
  
  isEqualTo(edge) {
    const sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          matches = this.matchVertexNames(sourceVertexName, targetVertexName),
          equalTo = matches;  ///
    
    return equalTo;
  }

  matchVertexName(vertexName) {
    const matches = ((this.sourceVertexName === vertexName) || (this.targetVertexName === vertexName));

    return matches;
  }

  matchVertexNames(sourceVertexName, targetVertexName) {
    const matches = ((this.sourceVertexName === sourceVertexName) && (this.targetVertexName === targetVertexName));
    
    return matches;
  }
}

module.exports = Edge;
