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
          matches = this.match(sourceVertexName, targetVertexName),
          equalTo = matches; ///

      return equalTo;
    }
  }, {
    key: 'match',
    value: function match(sourceVertexName, targetVertexName) {
      var matches = this.sourceVertexName === sourceVertexName && this.targetVertexName === targetVertexName;

      return matches;
    }
  }]);

  return Edge;
}();

module.exports = Edge;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9lZGdlLmpzIl0sIm5hbWVzIjpbIkVkZ2UiLCJzb3VyY2VWZXJ0ZXhOYW1lIiwidGFyZ2V0VmVydGV4TmFtZSIsImVkZ2UiLCJnZXRTb3VyY2VWZXJ0ZXhOYW1lIiwiZ2V0VGFyZ2V0VmVydGV4TmFtZSIsIm1hdGNoZXMiLCJtYXRjaCIsImVxdWFsVG8iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0lBRU1BLEk7QUFDSixnQkFBWUMsZ0JBQVosRUFBOEJDLGdCQUE5QixFQUFnRDtBQUFBOztBQUM5QyxTQUFLRCxnQkFBTCxHQUF3QkEsZ0JBQXhCO0FBQ0EsU0FBS0MsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUNEOzs7OzBDQUVxQjtBQUNwQixhQUFPLEtBQUtELGdCQUFaO0FBQ0Q7OzswQ0FFcUI7QUFDcEIsYUFBTyxLQUFLQyxnQkFBWjtBQUNEOzs7OEJBRVNDLEksRUFBTTtBQUNkLFVBQU1GLG1CQUFtQkUsS0FBS0MsbUJBQUwsRUFBekI7QUFBQSxVQUNNRixtQkFBbUJDLEtBQUtFLG1CQUFMLEVBRHpCO0FBQUEsVUFFTUMsVUFBVSxLQUFLQyxLQUFMLENBQVdOLGdCQUFYLEVBQTZCQyxnQkFBN0IsQ0FGaEI7QUFBQSxVQUdNTSxVQUFVRixPQUhoQixDQURjLENBSVk7O0FBRTFCLGFBQU9FLE9BQVA7QUFDRDs7OzBCQUVLUCxnQixFQUFrQkMsZ0IsRUFBa0I7QUFDeEMsVUFBTUksVUFBWSxLQUFLTCxnQkFBTCxLQUEwQkEsZ0JBQTNCLElBQWlELEtBQUtDLGdCQUFMLEtBQTBCQSxnQkFBNUY7O0FBRUEsYUFBT0ksT0FBUDtBQUNEOzs7Ozs7QUFHSEcsT0FBT0MsT0FBUCxHQUFpQlYsSUFBakIiLCJmaWxlIjoiZWRnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgRWRnZSB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpIHtcbiAgICB0aGlzLnNvdXJjZVZlcnRleE5hbWUgPSBzb3VyY2VWZXJ0ZXhOYW1lO1xuICAgIHRoaXMudGFyZ2V0VmVydGV4TmFtZSA9IHRhcmdldFZlcnRleE5hbWU7XG4gIH1cbiAgXG4gIGdldFNvdXJjZVZlcnRleE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlVmVydGV4TmFtZTtcbiAgfVxuICBcbiAgZ2V0VGFyZ2V0VmVydGV4TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy50YXJnZXRWZXJ0ZXhOYW1lO1xuICB9XG4gIFxuICBpc0VxdWFsVG8oZWRnZSkge1xuICAgIGNvbnN0IHNvdXJjZVZlcnRleE5hbWUgPSBlZGdlLmdldFNvdXJjZVZlcnRleE5hbWUoKSxcbiAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gZWRnZS5nZXRUYXJnZXRWZXJ0ZXhOYW1lKCksXG4gICAgICAgICAgbWF0Y2hlcyA9IHRoaXMubWF0Y2goc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSksXG4gICAgICAgICAgZXF1YWxUbyA9IG1hdGNoZXM7ICAvLy9cbiAgICBcbiAgICByZXR1cm4gZXF1YWxUbztcbiAgfVxuICBcbiAgbWF0Y2goc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSAoKHRoaXMuc291cmNlVmVydGV4TmFtZSA9PT0gc291cmNlVmVydGV4TmFtZSkgJiYgKHRoaXMudGFyZ2V0VmVydGV4TmFtZSA9PT0gdGFyZ2V0VmVydGV4TmFtZSkpO1xuICAgIFxuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRWRnZTtcbiJdfQ==