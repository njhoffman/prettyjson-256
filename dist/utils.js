'use strict';

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');

var indent = function indent(numSpaces) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!_.isNumber(numSpaces) || numSpaces <= 0) {
    return data;
  }
  var indented = data;
  var spaces = new Array(numSpaces + 1).join(' ');
  if (_.isArray(data)) {
    indented[0] = spaces + data[0];
  } else {
    indented = spaces + data;
  }
  return indented;
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

var isCustomColor = function isCustomColor(data, customColors) {
  return customColors && _.isObjectLike(data) && _.keys(data).length === 1 && !_.isEmpty(customColors[_.keys(data)[0]]);
};

// detect if an object can be output on same line
var isSerializable = function isSerializable(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (isCustomColor(input, options.customColors) || _.isBoolean(input) || _.isNumber(input) || _.isFunction(input) || _.isUndefined(input) || _.isNull(input) || _.isString(input) && input.indexOf('\n') === -1 || input instanceof Date) {
    return true;
  }

  // empty objects and arrays rendered on the same line
  if (_.isObjectLike(input) && _.isEmpty(input) && !_.isError(input)) {
    return true;
  }

  if (options.inlineArrays && _.isArray(input)) {
    if (isSerializable(input[0], options)) {
      return true;
    }
  }
  return false;
};

module.exports = {
  indent: indent,
  getMaxIndexLength: getMaxIndexLength,
  isCustomColor: isCustomColor,
  isSerializable: isSerializable
};
//# sourceMappingURL=utils.js.map