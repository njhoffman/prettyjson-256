const {
  keys,
  isError,
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

const indent = (numSpaces, data = '') => {
  const spaces = new Array(numSpaces + 1).join(' ');
  if (isArray(data)) {
    data[0] = spaces + data[0];
  } else {
    data = spaces + data;
  }
  return data;
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
const isSerializable = (input, options = {}) => {
  if (isCustomColor(input, options.customColors) ||
    isBoolean(input) ||
    isNumber(input) ||
    isFunction(input) ||
    isUndefined(input) ||
    isNull(input) ||
    (isString(input) && input.indexOf('\n') === -1) ||
    input instanceof Date) {
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

const isCustomColor = (data, customColors) => {
  return customColors &&
    isObjectLike(data) &&
    keys(data).length === 1 &&
    !isEmpty(customColors[keys(data)[0]]);
};

module.exports = {
  indent,
  getMaxIndexLength,
  isCustomColor,
  isSerializable
};
