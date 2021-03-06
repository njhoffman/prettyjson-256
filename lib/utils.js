const _ = require('lodash');

const indent = (numSpaces, data = '') => {
  if (!_.isNumber(numSpaces) || numSpaces <= 0) {
    return data;
  }
  let indented = data;
  const spaces = new Array(numSpaces + 1).join(' ');
  if (_.isArray(data)) {
    indented[0] = spaces + data[0];
  } else {
    indented = spaces + data;
  }
  return indented;
};

const getMaxIndexLength = input => {
  let maxWidth = 0;
  Object.getOwnPropertyNames(input).forEach(key => {
    if (input[key] === undefined) {
      return;
    }
    maxWidth = Math.max(maxWidth, key.length);
  });
  return maxWidth;
};

const isCustomColor = (data, customColors) => {
  return customColors && _.isObjectLike(data) && _.keys(data).length === 1 && !_.isEmpty(customColors[_.keys(data)[0]]);
};

// detect if an object can be output on same line
const isSerializable = (input, options = {}) => {
  if (
    isCustomColor(input, options.customColors) ||
    _.isBoolean(input) ||
    _.isNumber(input) ||
    _.isFunction(input) ||
    _.isUndefined(input) ||
    _.isNull(input) ||
    (_.isString(input) && input.indexOf('\n') === -1) ||
    input instanceof Date
  ) {
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
  indent,
  getMaxIndexLength,
  isCustomColor,
  isSerializable
};
