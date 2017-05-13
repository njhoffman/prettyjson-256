'use strict';

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('lodash'),
    keys = _require.keys,
    isError = _require.isError,
    isEmpty = _require.isEmpty,
    isFunction = _require.isFunction,
    isNumber = _require.isNumber,
    isUndefined = _require.isUndefined,
    isNull = _require.isNull,
    isString = _require.isString,
    isBoolean = _require.isBoolean,
    isArray = _require.isArray,
    isObjectLike = _require.isObjectLike;

var indent = function indent(numSpaces) {
  return new Array(numSpaces + 1).join(' ');
};

var getMaxIndexLength = function getMaxIndexLength(input) {
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
var isSerializable = function isSerializable(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (isCustomColor(input, options.customColors) || isBoolean(input) || isNumber(input) || isFunction(input) || isUndefined(input) || isNull(input) || isString(input) && input.indexOf('\n') === -1 || input instanceof Date) {
    return true;
  }

  // empty objects and arrays rendered on the same line
  if (isObjectLike(input) && isEmpty(input) && !isError(input)) {
    return true;
  }

  if (options.inlineArrays && isArray(input)) {
    options.inlineArrays = false;
    if (isSerializable(input[0], options)) {
      return true;
    }
  }
  return false;
};

var isCustomColor = function isCustomColor(data, customColors) {
  return customColors && isObjectLike(data) && keys(data).length === 1 && !isEmpty(customColors[keys(data)[0]]);
};

module.exports = {
  indent: indent,
  getMaxIndexLength: getMaxIndexLength,
  isCustomColor: isCustomColor,
  isSerializable: isSerializable
};
//# sourceMappingURL=utils.js.map