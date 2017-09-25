'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Edge = function () {
  function Edge(sourceVertexName, targetVertexName) {
    _classCallCheck(this, Edge);

    this.sourceVertexName = sourceVertexName;
    this.targetVertexName = targetVertexName;
  }

  _createClass(Edge, [{
    key: 'getSourceVertexName',
    value: function getSourceVertexName() {
      return this.sourceVertexName;
    }
  }, {
    key: 'getTargetVertexName',
    value: function getTargetVertexName() {
      return this.targetVertexName;
    }
  }, {
    key: 'isEqualTo',
    value: function isEqualTo(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          matches = this.matchVertexNames(sourceVertexName, targetVertexName),
          equalTo = matches; ///

      return equalTo;
    }
  }, {
    key: 'matchVertexName',
    value: function matchVertexName(vertexName) {
      var matches = this.sourceVertexName === vertexName || this.targetVertexName === vertexName;

      return matches;
    }
  }, {
    key: 'matchVertexNames',
    value: function matchVertexNames(sourceVertexName, targetVertexName) {
      var matches = this.sourceVertexName === sourceVertexName && this.targetVertexName === targetVertexName;

      return matches;
    }
  }]);

  return Edge;
}();

module.exports = Edge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9lZGdlLmpzIl0sIm5hbWVzIjpbIkVkZ2UiLCJzb3VyY2VWZXJ0ZXhOYW1lIiwidGFyZ2V0VmVydGV4TmFtZSIsImVkZ2UiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsIm1hdGNoZXMiLCJtYXRjaFZlcnRleE5hbWVzIiwiZXF1YWxUbyIsInZlcnRleE5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0lBRU1BLEk7QUFDSixnQkFBWUMsZ0JBQVosRUFBOEJDLGdCQUE5QixFQUFnRDtBQUFBOztBQUM5QyxTQUFLRCxnQkFBTCxHQUF3QkEsZ0JBQXhCO0FBQ0EsU0FBS0MsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNEOzs7OzBDQUVxQjtBQUNwQixhQUFPLEtBQUtELGdCQUFaO0FBQ0Q7OzswQ0FFcUI7QUFDcEIsYUFBTyxLQUFLQyxnQkFBWjtBQUNEOzs7OEJBRVNDLEksRUFBTTtBQUNkLFVBQU1GLG1CQUFtQkUsS0FBS0MsbUJBQUwsRUFBekI7QUFBQSxVQUNNRixtQkFBbUJDLEtBQUtFLG1CQUFMLEVBRHpCO0FBQUEsVUFFTUMsVUFBVSxLQUFLQyxnQkFBTCxDQUFzQk4sZ0JBQXRCLEVBQXdDQyxnQkFBeEMsQ0FGaEI7QUFBQSxVQUdNTSxVQUFVRixPQUhoQixDQURjLENBSVk7O0FBRTFCLGFBQU9FLE9BQVA7QUFDRDs7O29DQUVlQyxVLEVBQVk7QUFDMUIsVUFBTUgsVUFBWSxLQUFLTCxnQkFBTCxLQUEwQlEsVUFBM0IsSUFBMkMsS0FBS1AsZ0JBQUwsS0FBMEJPLFVBQXRGOztBQUVBLGFBQU9ILE9BQVA7QUFDRDs7O3FDQUVnQkwsZ0IsRUFBa0JDLGdCLEVBQWtCO0FBQ25ELFVBQU1JLFVBQVksS0FBS0wsZ0JBQUwsS0FBMEJBLGdCQUEzQixJQUFpRCxLQUFLQyxnQkFBTCxLQUEwQkEsZ0JBQTVGOztBQUVBLGFBQU9JLE9BQVA7QUFDRDs7Ozs7O0FBR0hJLE9BQU9DLE9BQVAsR0FBaUJYLElBQWpCIiwiZmlsZSI6ImVkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEVkZ2Uge1xuICBjb25zdHJ1Y3Rvcihzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgdGhpcy5zb3VyY2VWZXJ0ZXhOYW1lID0gc291cmNlVmVydGV4TmFtZTtcbiAgICB0aGlzLnRhcmdldFZlcnRleE5hbWUgPSB0YXJnZXRWZXJ0ZXhOYW1lO1xuICB9XG4gIFxuICBnZXRTb3VyY2VWZXJ0ZXhOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZVZlcnRleE5hbWU7XG4gIH1cbiAgXG4gIGdldFRhcmdldFZlcnRleE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0VmVydGV4TmFtZTtcbiAgfVxuICBcbiAgaXNFcXVhbFRvKGVkZ2UpIHtcbiAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZWRnZS5nZXRTb3VyY2VWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IGVkZ2UuZ2V0VGFyZ2V0VmVydGV4TmFtZSgpLFxuICAgICAgICAgIG1hdGNoZXMgPSB0aGlzLm1hdGNoVmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgZXF1YWxUbyA9IG1hdGNoZXM7ICAvLy9cbiAgICBcbiAgICByZXR1cm4gZXF1YWxUbztcbiAgfVxuXG4gIG1hdGNoVmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9ICgodGhpcy5zb3VyY2VWZXJ0ZXhOYW1lID09PSB2ZXJ0ZXhOYW1lKSB8fCAodGhpcy50YXJnZXRWZXJ0ZXhOYW1lID09PSB2ZXJ0ZXhOYW1lKSk7XG5cbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIG1hdGNoVmVydGV4TmFtZXMoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSAoKHRoaXMuc291cmNlVmVydGV4TmFtZSA9PT0gc291cmNlVmVydGV4TmFtZSkgJiYgKHRoaXMudGFyZ2V0VmVydGV4TmFtZSA9PT0gdGFyZ2V0VmVydGV4TmFtZSkpO1xuICAgIFxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWRnZTtcbiJdfQ==