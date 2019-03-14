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
    key: 'match',
    value: function match(edge) {
      var sourceVertexName = edge.getSourceVertexName(),
          targetVertexName = edge.getTargetVertexName(),
          matches = this.sourceVertexName === sourceVertexName && this.targetVertexName === targetVertexName;

      return matches;
    }
  }, {
    key: 'matchVertexName',
    value: function matchVertexName(vertexName) {
      var matches = this.sourceVertexName === vertexName || this.targetVertexName === vertexName;

      return matches;
    }
  }, {
    key: 'matchSourceVertexName',
    value: function matchSourceVertexName(sourceVertexName) {
      var matches = this.sourceVertexName === sourceVertexName;

      return matches;
    }
  }, {
    key: 'matchTargetVertexName',
    value: function matchTargetVertexName(targetVertexName) {
      var matches = this.targetVertexName === targetVertexName;

      return matches;
    }
  }, {
    key: 'matchVertexNames',
    value: function matchVertexNames(sourceVertexName, targetVertexName) {
      var matches = this.sourceVertexName === sourceVertexName && this.targetVertexName === targetVertexName;

      return matches;
    }
  }], [{
    key: 'fromSourceVertexNameAndTargetVertexName',
    value: function fromSourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName) {
      var edge = new Edge(sourceVertexName, targetVertexName);

      return edge;
    }
  }]);

  return Edge;
}();

module.exports = Edge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9lZGdlLmpzIl0sIm5hbWVzIjpbIkVkZ2UiLCJzb3VyY2VWZXJ0ZXhOYW1lIiwidGFyZ2V0VmVydGV4TmFtZSIsImVkZ2UiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsIm1hdGNoZXMiLCJ2ZXJ0ZXhOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztJQUVNQSxJO0FBQ0osZ0JBQVlDLGdCQUFaLEVBQThCQyxnQkFBOUIsRUFBZ0Q7QUFBQTs7QUFDOUMsU0FBS0QsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNBLFNBQUtDLGdCQUFMLEdBQXdCQSxnQkFBeEI7QUFDRDs7OzswQ0FFcUI7QUFDcEIsYUFBTyxLQUFLRCxnQkFBWjtBQUNEOzs7MENBRXFCO0FBQ3BCLGFBQU8sS0FBS0MsZ0JBQVo7QUFDRDs7OzBCQUVLQyxJLEVBQU07QUFDVixVQUFNRixtQkFBbUJFLEtBQUtDLG1CQUFMLEVBQXpCO0FBQUEsVUFDTUYsbUJBQW1CQyxLQUFLRSxtQkFBTCxFQUR6QjtBQUFBLFVBRU1DLFVBQVksS0FBS0wsZ0JBQUwsS0FBMEJBLGdCQUEzQixJQUFpRCxLQUFLQyxnQkFBTCxLQUEwQkEsZ0JBRjVGOztBQUlBLGFBQU9JLE9BQVA7QUFDRDs7O29DQUVlQyxVLEVBQVk7QUFDMUIsVUFBTUQsVUFBWSxLQUFLTCxnQkFBTCxLQUEwQk0sVUFBM0IsSUFBMkMsS0FBS0wsZ0JBQUwsS0FBMEJLLFVBQXRGOztBQUVBLGFBQU9ELE9BQVA7QUFDRDs7OzBDQUVxQkwsZ0IsRUFBa0I7QUFDdEMsVUFBTUssVUFBVyxLQUFLTCxnQkFBTCxLQUEwQkEsZ0JBQTNDOztBQUVBLGFBQU9LLE9BQVA7QUFDRDs7OzBDQUVxQkosZ0IsRUFBa0I7QUFDdEMsVUFBTUksVUFBVyxLQUFLSixnQkFBTCxLQUEwQkEsZ0JBQTNDOztBQUVBLGFBQU9JLE9BQVA7QUFDRDs7O3FDQUVnQkwsZ0IsRUFBa0JDLGdCLEVBQWtCO0FBQ25ELFVBQU1JLFVBQVksS0FBS0wsZ0JBQUwsS0FBMEJBLGdCQUEzQixJQUFpRCxLQUFLQyxnQkFBTCxLQUEwQkEsZ0JBQTVGOztBQUVBLGFBQU9JLE9BQVA7QUFDRDs7OzREQUU4Q0wsZ0IsRUFBa0JDLGdCLEVBQWtCO0FBQ2pGLFVBQU1DLE9BQU8sSUFBSUgsSUFBSixDQUFTQyxnQkFBVCxFQUEyQkMsZ0JBQTNCLENBQWI7O0FBRUEsYUFBT0MsSUFBUDtBQUNEOzs7Ozs7QUFHSEssT0FBT0MsT0FBUCxHQUFpQlQsSUFBakIiLCJmaWxlIjoiZWRnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgRWRnZSB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICB0aGlzLnNvdXJjZVZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lO1xuICAgIHRoaXMudGFyZ2V0VmVydGV4TmFtZSA9IHRhcmdldFZlcnRleE5hbWU7XG4gIH1cbiAgXG4gIGdldFNvdXJjZVZlcnRleE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlVmVydGV4TmFtZTtcbiAgfVxuICBcbiAgZ2V0VGFyZ2V0VmVydGV4TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXJnZXRWZXJ0ZXhOYW1lO1xuICB9XG4gIFxuICBtYXRjaChlZGdlKSB7XG4gICAgY29uc3Qgc291cmNlVmVydGV4TmFtZSA9IGVkZ2UuZ2V0U291cmNlVmVydGV4TmFtZSgpLFxuICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBlZGdlLmdldFRhcmdldFZlcnRleE5hbWUoKSxcbiAgICAgICAgICBtYXRjaGVzID0gKCh0aGlzLnNvdXJjZVZlcnRleE5hbWUgPT09IHNvdXJjZVZlcnRleE5hbWUpICYmICh0aGlzLnRhcmdldFZlcnRleE5hbWUgPT09IHRhcmdldFZlcnRleE5hbWUpKTtcbiAgICBcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIG1hdGNoVmVydGV4TmFtZSh2ZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9ICgodGhpcy5zb3VyY2VWZXJ0ZXhOYW1lID09PSB2ZXJ0ZXhOYW1lKSB8fCAodGhpcy50YXJnZXRWZXJ0ZXhOYW1lID09PSB2ZXJ0ZXhOYW1lKSk7XG5cbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfVxuXG4gIG1hdGNoU291cmNlVmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9ICh0aGlzLnNvdXJjZVZlcnRleE5hbWUgPT09IHNvdXJjZVZlcnRleE5hbWUpO1xuXG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBtYXRjaFRhcmdldFZlcnRleE5hbWUodGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSAodGhpcy50YXJnZXRWZXJ0ZXhOYW1lID09PSB0YXJnZXRWZXJ0ZXhOYW1lKTtcblxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG5cbiAgbWF0Y2hWZXJ0ZXhOYW1lcyhzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9ICgodGhpcy5zb3VyY2VWZXJ0ZXhOYW1lID09PSBzb3VyY2VWZXJ0ZXhOYW1lKSAmJiAodGhpcy50YXJnZXRWZXJ0ZXhOYW1lID09PSB0YXJnZXRWZXJ0ZXhOYW1lKSk7XG4gICAgXG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICBjb25zdCBlZGdlID0gbmV3IEVkZ2Uoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG5cbiAgICByZXR1cm4gZWRnZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVkZ2U7XG4iXX0=