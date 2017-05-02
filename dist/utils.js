'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSerializable = exports.getMaxIndexLength = exports.indent = undefined;

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indent = exports.indent = function indent(numSpaces) {
  return new Array(numSpaces + 1).join(' ');
};

var getMaxIndexLength = exports.getMaxIndexLength = function getMaxIndexLength(input) {
  var maxWidth = 0;
  (0, _getOwnPropertyNames2.default)(input).forEach(function (key) {
    if (input[key] === undefined) {
      return;
    }
    maxWidth = Math.max(maxWidth, key.length);
  });
  return maxWidth;
};

// detect if an object can be output on same line
var isSerializable = exports.isSerializable = function isSerializable(input, inlineArrays) {
  if ((0, _lodash.isBoolean)(input) || (0, _lodash.isNumber)(input) || (0, _lodash.isFunction)(input) || (0, _lodash.isUndefined)(input) || (0, _lodash.isNull)(input) || (0, _lodash.isString)(input) && input.indexOf('\n') === -1 || input instanceof Date) {
    return true;
  }

  // empty objects and arrays rendered on the same line
  if ((0, _lodash.isObjectLike)(input) && (0, _lodash.isEmpty)(input)) {
    return true;
  }

  if (inlineArrays && (0, _lodash.isArray)(input) && isSerializable(input[0], false)) {
    return true;
  }
  return false;
};

module.exports = {
  indent: indent,
  getMaxIndexLength: getMaxIndexLength,
  isSerializable: isSerializable
};
//# sourceMappingURL=utils.js.map