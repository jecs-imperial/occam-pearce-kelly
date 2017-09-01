'use strict';

function vertexNamesFromVertices(vertices) {
  const vertexNames = vertices.map(function(vertex) {
    const vertexName = vertex.getName();

    return vertexName;
  });

  return vertexNames;
}

function topologicallyOrderVertices(vertices) {  ///
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

module.exports = {
  vertexNamesFromVertices: vertexNamesFromVertices,
  topologicallyOrderVertices: topologicallyOrderVertices
};
