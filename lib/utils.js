const {
  isEmpty,
  isFunction,
  isNumber,
  isUndefined,
  isNull,
  isString,
  isBoolean,
  isArray,
  isObjectLike
} = require('lodash');

const indent = (numSpaces) => {
  return new Array(numSpaces + 1).join(' ');
};

const getMaxIndexLength = (input) => {
  var maxWidth = 0;
  Object.getOwnPropertyNames(input).forEach((key) => {
    if (input[key] === undefined) {
      return;
    }
    maxWidth = Math.max(maxWidth, key.length);
  });
  return maxWidth;
};

// detect if an object can be output on same line
const isSerializable = (input, inlineArrays) => {
  if (isBoolean(input) ||
    isNumber(input) ||
    isFunction(input) ||
    isUndefined(input) ||
    isNull(input) ||
    (isString(input) && input.indexOf('\n') === -1) ||
    input instanceof Date) {
    return true;
  }

  // empty objects and arrays rendered on the same line
  if (isObjectLike(input) && isEmpty(input)) {
    return true;
  }

  if (inlineArrays && isArray(input) && isSerializable(input[0], false)) {
    return true;
  }
  return false;
};

module.exports = {
  indent,
  getMaxIndexLength,
  isSerializable
};
