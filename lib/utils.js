import { isEmpty, isFunction, isNumber, isUndefined, isNull, isString, isBoolean, isObjectLike } from 'lodash';

exports.indent = function indent (numSpaces) {
  return new Array(numSpaces + 1).join(' ');
};

exports.getMaxIndexLength = function (input) {
  var maxWidth = 0;

  Object.getOwnPropertyNames(input).forEach(function (key) {
    if (input[key] === undefined) {
      return;
    }

    maxWidth = Math.max(maxWidth, key.length);
  });
  return maxWidth;
};

// detect if an object can be output on same line
exports.isSerializable = (input, inlineArrays) => {
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

  if (inlineArrays && Array.isArray(input) && exports._isSerializable(input[0], false)) {
    return true;
  }
  return false;
};

exports.stripAnsi = (data) => {
  const ansiRE = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
  return data.replace(ansiRE, '');
};
