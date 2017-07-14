'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayUtil = function () {
  function arrayUtil() {
    _classCallCheck(this, arrayUtil);
  }

  _createClass(arrayUtil, null, [{
    key: 'last',
    value: function last(array) {
      return array[array.length - 1];
    }
  }]);

  return arrayUtil;
}();

module.exports = arrayUtil;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi91dGlsL2FycmF5LmpzIl0sIm5hbWVzIjpbImFycmF5VXRpbCIsImFycmF5IiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztJQUVNQSxTOzs7Ozs7O3lCQUNRQyxLLEVBQU87QUFBRSxhQUFPQSxNQUFNQSxNQUFNQyxNQUFOLEdBQWUsQ0FBckIsQ0FBUDtBQUFpQzs7Ozs7O0FBR3hEQyxPQUFPQyxPQUFQLEdBQWlCSixTQUFqQiIsImZpbGUiOiJhcnJheS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgYXJyYXlVdGlsIHtcbiAgc3RhdGljIGxhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlVdGlsO1xuIl19