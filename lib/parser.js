import Utils from './utils';
import { isFunction, isArray, each, keys } from 'lodash';

import { options, pColor } from './settings';

const _addColorToData = (input) => {
  if (options.noColor) {
    return input;
  }

  if (typeof input === 'string') {
    return pColor.string(input);
  }

  var sInput = input + '';

  /* eslint-disable no-multi-spaces */
  if (input === true)        { return pColor.boolTrue(sInput); }
  if (input === false)       { return pColor.boolFalse(sInput); }
  if (input === null)        { return pColor.empty(sInput); }
  if (input === '')          { return pColor.empty('(empty)'); }
  if (input instanceof Date) { return pColor.date(sInput); }
  if (isArray(input))        { return input.join(', '); }
  /* eslint-enable no-multi-spaces */

  return sInput;
};

const _indentMultiLine = (string, spaces) => {
  return string
    .split('\n')
    .map(line => (Utils.indent(spaces) + line))
    .join('\n');
};

const _handleMultiLine = (data, indentation) => {
  return [
    Utils.indent(indentation) + '"""',
    _indentMultiLine(data, indentation + options.defaultIndentation),
    Utils.indent(indentation) + '"""'
  ];
};

const _handleFunction = (data, indentation) => {
  var funcHeader = data.toString().split('\n')[0].replace('{', '');
  return [
    Utils.indent(indentation) + pColor.functionTag('[Function] ') +
    pColor.functionHeader(funcHeader)
  ];
};

const _handleArray = (data, indentation, level) => {
  // If the array is empty, render the `emptyArrayMsg`
  var arrayOut = [];
  if (data.length === 0) {
    arrayOut.push(Utils.indent(indentation) + pColor.empty(options.emptyArrayMsg));
  } else if (level + 1 === options.depth) {
    var line = Utils.indent(indentation) + '[Array length ' + data.length + ']';
    arrayOut.push(line);
  } else {
    level++;
    each(data, function (element) {
      // Prepend the dash at the begining of each array's element line
      var line = ('- ');
      if (!options.noColor) {
        line = pColor.dash(line);
      }
      line = Utils.indent(indentation) + line;

      if (Utils.isSerializable(element, false, options.inlineArrays)) {
        // If the element of the array is a string, bool, number, or null
        // render it in the same line
        line += parse(element, false);
        arrayOut.push(line);
      } else {
        // If the element is an array or object, render it in next line
        arrayOut.push(line);
        arrayOut.push(
          parse(
            element,
            indentation + options.defaultIndentation,
            level
          )
        );
      }
    });
  }
  return arrayOut;
};

const _handleObject = (data, indentation, level) => {
  // Get the size of the longest index to align all the values
  var maxIndexLength = Utils.getMaxIndexLength(data);
  var key;
  var isError = data instanceof Error;

  var objOut = [];
  level++;
  each(Object.getOwnPropertyNames(data), function (i) {
    // Prepend the index at the beginning of the line
    key = (i + ': ');
    if (!options.noColor) {
      key = pColor.keys(key);
    }
    key = Utils.indent(indentation) + key;

    // Skip `undefined`, it's not a valid JSON value.
    if (data[i] === undefined) {
      return;
    }

    // If the value is serializable, render it in the same line
    if (Utils.isSerializable(data[i], false, options.inlineArrays) && (!isError || i !== 'stack')) {
      if (isFunction(data)) {
        key += _handleFunction(data[i], options, maxIndexLength - i.length);
        objOut.push(key);
      } else {
        key += parse(data[i], maxIndexLength - i.length);
        objOut.push(key);
      }
    } else if (isFunction(data[i])) {
      key += parse(data[i], maxIndexLength - i.length);
      objOut.push(key);
    } else if (level === options.depth) {
      // dont nest any more for object if depth level reached
      key += Utils.indent(maxIndexLength - i.length) +
        pColor.depth('[Object] (' + keys(data[i]).length + ' keys)');
      objOut.push(key);
    } else if (level + 1 === options.depth && isArray(data[i])) {
      objOut.push(key);
    } else {
      // If the index is an array or object, render it in next line
      objOut.push(key);
      objOut.push(
        parse(
          isError && i === 'stack' ? data[i].split('\n') : data[i],
          indentation + options.defaultIndentation,
          level
        )
      );
    }
  });
  return objOut;
};

export const parse = (data, indentation = 0, level = 0) => {
  var output = [];

  if (Utils.isSerializable(data, false, options.inlineArrays)) {
    if (isFunction(data)) {
      output.push(_handleFunction(data, indentation, level));
    } else {
      // Render a string exactly equal
      output.push(Utils.indent(indentation) + _addColorToData(data));
    }
  } else if (typeof data === 'string') {
    // unserializable string means it's multiline
    Array.prototype.push.apply(output, _handleMultiLine(data, indentation));
  } else if (isArray(data)) {
    Array.prototype.push.apply(output, _handleArray(data, indentation, level));
  } else if (typeof data === 'object') {
    Array.prototype.push.apply(output, _handleObject(data, indentation, level));
  }

  // Return all the lines as a string
  return output.join('\n');
};

export default parse;
