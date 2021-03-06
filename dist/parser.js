'use strict';

var _ = require('lodash');
var Utils = require('./utils');

var _require = require('./settings'),
    getOptions = _require.getOptions,
    getPrintColor = _require.getPrintColor;

var options = void 0;
var pColor = void 0;

var _addColorToData = function _addColorToData(input) {
  var sInput = '' + input;

  if (_.isString(input)) {
    return pColor.string(input);
  }
  if (_.isNumber(input)) {
    return pColor.number(input);
  }
  if (input === true) {
    return pColor.boolTrue(sInput);
  }
  if (input === false) {
    return pColor.boolFalse(sInput);
  }
  if (input === null) {
    return pColor.empty(sInput);
  }
  if (input instanceof Date) {
    return pColor.date(sInput);
  }
  if (_.isArray(input)) {
    return input.join(', ');
  }

  return sInput;
};

var _indentMultiLine = function _indentMultiLine(string, spaces) {
  return string.split('\n').map(function (line) {
    return Utils.indent(spaces) + line;
  }).join('\n');
};

var _handleMultiLine = function _handleMultiLine(data, indentation) {
  return [Utils.indent(indentation) + '"""', _indentMultiLine(data, indentation + options.defaultIndentation), Utils.indent(indentation) + '"""'];
};

var _handleFunction = function _handleFunction(data, indentation) {
  var funcTag = pColor.functionTag('[Function] ');
  var funcHeader = pColor.functionHeader(data.toString().split('\n')[0].replace('{', ''));
  return options.browser ? [Utils.indent(indentation, funcTag), funcHeader] : Utils.indent(indentation, funcTag) + funcHeader;
};

var _handleError = function _handleError(data, indentation) {
  return [pColor.errorDivider(options.errorDivider) + '\n' + pColor.errorName(data.name) + '\n' + pColor.errorMessage(data.message) + '\n' + pColor.errorStack(data.stack) + '\n' + pColor.errorDivider(options.errorDivider)];
};

var _handleArray = function _handleArray(data, indentation, depthLevel) {
  var level = depthLevel;
  var arrayOut = [];

  if (level + 1 === options.depth) {
    var line = Utils.indent(indentation, pColor.depth('[Array length ' + data.length + ']'));
    arrayOut.push(line);
  } else {
    level += 1;
    _.each(data, function (element, i) {
      var line = options.numberArrays ? '-[' + i + '] ' : '- ';
      line = Utils.indent(indentation, pColor.dash(line));
      // if arrays are numbered, each element should be on its own line
      if (options.numberArrays) {
        arrayOut.push(line);
        line = Utils.indent(indentation + options.defaultIndentation);
      }

      var parsedEl = parse(element, indentation + options.defaultIndentation, level);
      if (_.isArray(parsedEl)) {
        line = parsedEl;
      } else {
        line += parsedEl.trim();
      }
      arrayOut.push(line);
    });
  }
  return arrayOut;
};

var _handleObject = function _handleObject(data, indentation, depthLevel) {
  // Get the size of the longest index to align all the values
  var maxIndexLength = Utils.getMaxIndexLength(data);
  var level = depthLevel + 1;
  var objOut = [];
  var key = void 0;

  _.each(_.keys(data), function (i) {
    var element = data[i];
    key = Utils.indent(indentation, pColor.keys(i + ': '));

    // If the value is serializable, render it on the same line
    if (Utils.isSerializable(element, options)) {
      // but don't render anything if showEmpty setting is false and data is empty array, object, or string
      if (!((_.isObjectLike(element) || _.isString(element)) && _.isEmpty(element) && !options.showEmpty)) {
        var inlineData = parse(element, maxIndexLength - i.length);
        if (options.browser) {
          // add %i identifier to indicate inline data should be printed on same line
          // TODO: hacky, fix or at least handle more than one nested color obj depth
          if (_.isArray(inlineData[0])) {
            inlineData[0][0] += '%i';
            inlineData[1][0] += '%i';
          } else {
            inlineData[0] += '%i';
          }
          objOut.push([key, inlineData]);
        } else {
          objOut.push(key + inlineData);
        }
      }
    } else if (level === options.depth) {
      // dont nest any more for object if depth level reached
      key += Utils.indent(maxIndexLength - i.length, pColor.depth('[Object] (' + _.keys(element).length + ' keys)'));
      objOut.push(key);
    } else if (level + 1 === options.depth && _.isArray(element)) {
      key += Utils.indent(maxIndexLength - i.length, pColor.depth('[Array length ' + _.keys(element).length + ']'));
      objOut.push(key);
    } else if (options.browser) {
      // If the index is an array or object, render it in next line
      // key[0] = '\n' + key[0];
      // key[0] = key[0] + '\n';
      objOut.push(key, parse(element, indentation + options.defaultIndentation, level));
    } else {
      objOut.push(key);
      objOut.push(parse(element, indentation + options.defaultIndentation, level));
    }
  });
  return objOut;
};

var _handleEmpty = function _handleEmpty(data, indentation) {
  if (_.isArray(data)) {
    return Utils.indent(indentation, pColor.empty(options.emptyArrayMsg));
  } else if (_.isObjectLike(data)) {
    return Utils.indent(indentation, pColor.empty(options.emptyObjectMsg));
  }
  return Utils.indent(indentation, pColor.empty(options.emptyStringMsg));
};

var _handleSerializable = function _handleSerializable(data, indentation) {
  if (Utils.isCustomColor(data, options.customColors)) {
    var colorKey = _.keys(data)[0];
    return Utils.indent(indentation, pColor[colorKey](data[colorKey]));
  } else if (_.isFunction(data)) {
    return _handleFunction(data, indentation);
  } else if (_.isDate(data) || _.isNumber(data)) {
    return Utils.indent(indentation, _addColorToData(data));
  } else if ((_.isObjectLike(data) || _.isString(data)) && _.isEmpty(data)) {
    return _handleEmpty(data, indentation);
  }
  return Utils.indent(indentation, _addColorToData(data));
};

var parse = function parse(data) {
  var indentation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var output = [];

  if (Utils.isSerializable(data, options)) {
    output = output.concat(_handleSerializable(data, indentation));
  } else if (_.isString(data)) {
    // unserializable string means it's multiline
    output = output.concat(_handleMultiLine(data, indentation));
  } else if (_.isArray(data)) {
    output = output.concat(_handleArray(data, indentation, level));
  } else if (_.isError(data)) {
    output = output.concat(_handleError(data, indentation, level));
  } else if (_.isObjectLike(data) && options.depth !== 0) {
    output = output.concat(_handleObject(data, indentation, level));
  }

  // Return all the lines as a string if going to terminal, otherwise return array for browser output
  return options.browser ? output : output.join('\n');
};

module.exports = function (data, indentation, renderOptions) {
  options = renderOptions || getOptions();
  pColor = getPrintColor();
  return parse(data, indentation);
};
//# sourceMappingURL=parser.js.map