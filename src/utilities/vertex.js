"use strict";

export function vertexNamesFromVertices(vertices) {
  const vertexNames = vertices.map((vertex) => {
    const vertexName = vertex.getName();

    return vertexName;
  });

  return vertexNames;
}

export function orderVertices(vertices) {  ///
  vertices.sort((firstVertex, secondVertex) => {
    const firstVertexIndex = firstVertex.getIndex(),
          secondVertexIndex = secondVertex.getIndex();

    if (false) {
      ///
    } else if (firstVertexIndex < secondVertexIndex) {
      return -1;
    } else  if (firstVertexIndex > secondVertexIndex) {
      return +1;
    }
  });

  const orderedVertices = vertices;  ///

  return orderedVertices;
}
