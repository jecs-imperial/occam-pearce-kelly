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
          matches = this.match(sourceVertexName, targetVertexName),
          equalTo = matches;  ///
    
    return equalTo;
  }
  
  match(sourceVertexName, targetVertexName) {
    const matches = ((this.sourceVertexName === sourceVertexName) && (this.targetVertexName === targetVertexName));
    
    return matches;
  }
}

module.exports = Edge;
