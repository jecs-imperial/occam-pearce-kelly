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
  
  isEqualTo(sourceVertexName, targetVertexName) {
    const equalTo = ((this.sourceVertexName === sourceVertexName) && (this.targetVertexName === targetVertexName));
    
    return equalTo;
  }
}

module.exports = Edge;
