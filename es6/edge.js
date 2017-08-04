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
          equalTo = ((this.sourceVertexName === sourceVertexName) && (this.targetVertexName === targetVertexName));
    
    return equalTo;
  }
}

module.exports = Edge;
