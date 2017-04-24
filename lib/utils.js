'use strict';

/**
 * Creates a string with the same length as `numSpaces` parameter
 **/
exports.indent = function indent (numSpaces) {
  return new Array(numSpaces + 1).join(' ');
};

/**
 * Gets the string length of the longer index in a hash
 **/
exports.getMaxIndexLength = function (input) {
  var maxWidth = 0;

  Object.getOwnPropertyNames(input).forEach(function (key) {
    // Skip undefined values.
    if (input[key] === undefined) {
      return;
    }

    maxWidth = Math.max(maxWidth, key.length);
  });
  return maxWidth;
};

// Helper function to detect if an object can be directly serializable
exports.isSerializable = function isSerializable (input, onlyPrimitives, inlineArrays) {
  if (typeof input === 'boolean' ||
    typeof input === 'number' ||
    typeof input === 'function' ||
    typeof input === 'undefined' ||
    input === null ||
    input instanceof Date) {
    return true;
  }
  if (typeof input === 'string' && input.indexOf('\n') === -1) {
    return true;
  }

  if (inlineArrays && !onlyPrimitives &&
    Array.isArray(input) && exports._isSerializable(input[0], true, inlineArrays)) {
    return true;
  }
  return false;
};
