"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.vertexNamesFromVertices = vertexNamesFromVertices;
exports.orderVertices = orderVertices;
function vertexNamesFromVertices(vertices) {
    var vertexNames = vertices.map(function(vertex) {
        var vertexName = vertex.getName();
        return vertexName;
    });
    return vertexNames;
}
function orderVertices(vertices) {
    vertices.sort(function(firstVertex, secondVertex) {
        var firstVertexIndex = firstVertex.getIndex(), secondVertexIndex = secondVertex.getIndex();
        if (false) {
        } else if (firstVertexIndex < secondVertexIndex) {
            return -1;
        } else if (firstVertexIndex > secondVertexIndex) {
            return +1;
        }
    });
    var orderedVertices = vertices; ///
    return orderedVertices;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvdmVydGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdmVydGV4TmFtZXNGcm9tVmVydGljZXModmVydGljZXMpIHtcbiAgY29uc3QgdmVydGV4TmFtZXMgPSB2ZXJ0aWNlcy5tYXAoKHZlcnRleCkgPT4ge1xuICAgIGNvbnN0IHZlcnRleE5hbWUgPSB2ZXJ0ZXguZ2V0TmFtZSgpO1xuXG4gICAgcmV0dXJuIHZlcnRleE5hbWU7XG4gIH0pO1xuXG4gIHJldHVybiB2ZXJ0ZXhOYW1lcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yZGVyVmVydGljZXModmVydGljZXMpIHsgIC8vL1xuICB2ZXJ0aWNlcy5zb3J0KChmaXJzdFZlcnRleCwgc2Vjb25kVmVydGV4KSA9PiB7XG4gICAgY29uc3QgZmlyc3RWZXJ0ZXhJbmRleCA9IGZpcnN0VmVydGV4LmdldEluZGV4KCksXG4gICAgICAgICAgc2Vjb25kVmVydGV4SW5kZXggPSBzZWNvbmRWZXJ0ZXguZ2V0SW5kZXgoKTtcblxuICAgIGlmIChmYWxzZSkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmIChmaXJzdFZlcnRleEluZGV4IDwgc2Vjb25kVmVydGV4SW5kZXgpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9IGVsc2UgIGlmIChmaXJzdFZlcnRleEluZGV4ID4gc2Vjb25kVmVydGV4SW5kZXgpIHtcbiAgICAgIHJldHVybiArMTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IG9yZGVyZWRWZXJ0aWNlcyA9IHZlcnRpY2VzOyAgLy8vXG5cbiAgcmV0dXJuIG9yZGVyZWRWZXJ0aWNlcztcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFBOzs7O1FBRUEsdUJBQUEsR0FBQSx1QkFBQTtRQVVBLGFBQUEsR0FBQSxhQUFBO1NBVkEsdUJBQUEsQ0FBQSxRQUFBO1FBQ0EsV0FBQSxHQUFBLFFBQUEsQ0FBQSxHQUFBLFVBQUEsTUFBQTtZQUNBLFVBQUEsR0FBQSxNQUFBLENBQUEsT0FBQTtlQUVBLFVBQUE7O1dBR0EsV0FBQTs7U0FHQSxhQUFBLENBQUEsUUFBQTtBQUNBLFlBQUEsQ0FBQSxJQUFBLFVBQUEsV0FBQSxFQUFBLFlBQUE7WUFDQSxnQkFBQSxHQUFBLFdBQUEsQ0FBQSxRQUFBLElBQ0EsaUJBQUEsR0FBQSxZQUFBLENBQUEsUUFBQTtZQUVBLEtBQUE7bUJBRUEsZ0JBQUEsR0FBQSxpQkFBQTtvQkFDQSxDQUFBO21CQUNBLGdCQUFBLEdBQUEsaUJBQUE7b0JBQ0EsQ0FBQTs7O1FBSUEsZUFBQSxHQUFBLFFBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQTtXQUVBLGVBQUEifQ==