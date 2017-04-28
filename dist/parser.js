'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = undefined;

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _lodash = require('lodash');

var _settings = require('./settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _addColorToData = function _addColorToData(input) {
  var sInput = input + '';

  /* eslint-disable no-multi-spaces */
  if (_settings.options.noColor) {
    return sInput;
  }
  if ((0, _lodash.isString)(input)) {
    return _settings.pColor.string(input);
  }
  if ((0, _lodash.isNumber)(input)) {
    return _settings.pColor.number(input);
  }
  if (input === true) {
    return _settings.pColor.boolTrue(sInput);
  }
  if (input === false) {
    return _settings.pColor.boolFalse(sInput);
  }
  if (input === null) {
    return _settings.pColor.empty(sInput);
  }
  if (input === '') {
    return _settings.pColor.empty('(empty)');
  }
  if (input instanceof Date) {
    return _settings.pColor.date(sInput);
  }
  if ((0, _lodash.isArray)(input)) {
    return input.join(', ');
  }
  /* eslint-enable no-multi-spaces */

  return sInput;
};

var _indentMultiLine = function _indentMultiLine(string, spaces) {
  return string.split('\n').map(function (line) {
    return _utils2.default.indent(spaces) + line;
  }).join('\n');
};

var _handleMultiLine = function _handleMultiLine(data, indentation) {
  return [_utils2.default.indent(indentation) + '"""', _indentMultiLine(data, indentation + _settings.options.defaultIndentation), _utils2.default.indent(indentation) + '"""'];
};

var _handleFunction = function _handleFunction(data, indentation) {
  var funcHeader = data.toString().split('\n')[0].replace('{', '');
  return [_utils2.default.indent(indentation) + (_settings.options.noColor ? '[Function] ' : _settings.pColor.functionTag('[Function] ')) + (_settings.options.noColor ? funcHeader : _settings.pColor.functionHeader(funcHeader))];
};

var _handleArray = function _handleArray(data, indentation, level) {
  var arrayOut = [];
  if (level + 1 === _settings.options.depth) {
    var line = _utils2.default.indent(indentation) + (_settings.options.noColor ? '[Array length ' + data.length + ']' : _settings.pColor.depth('[Array length ' + data.length + ']'));
    arrayOut.push(line);
  } else {
    level++;
    (0, _lodash.each)(data, function (element, i) {
      // Prepend the dash at the begining of each array's element line
      var line = _settings.options.numberArrays ? '-[' + i + '] ' : '- ';
      if (!_settings.options.noColor) {
        line = _settings.pColor.dash(line);
      }
      line = _utils2.default.indent(indentation) + line;
      // if arrays are numbered, each element should be on its own line
      if (_settings.options.numberArrays) {
        arrayOut.push(line);
        line = _utils2.default.indent(indentation + _settings.options.defaultIndentation);
      }
      line += parse(element, indentation + _settings.options.defaultIndentation, level).trim();
      arrayOut.push(line);
    });
  }
  return arrayOut;
};

var _handleObject = function _handleObject(data, indentation, level) {
  // Get the size of the longest index to align all the values
  var maxIndexLength = _utils2.default.getMaxIndexLength(data);
  var key;
  var isError = data instanceof Error;

  var objOut = [];
  level++;
  (0, _lodash.each)((0, _lodash.keys)(data), function (i) {
    var element = data[i];
    key = i + ': ';
    if (!_settings.options.noColor) {
      key = _settings.pColor.keys(key);
    }
    key = _utils2.default.indent(indentation) + key;

    // If the value is serializable, render it on the same line
    if (_utils2.default.isSerializable(element, _settings.options.inlineArrays) && (!isError || i !== 'stack')) {
      // but don't render anything if showEmpty setting is false and data is empty array, object, or string
      if (!(((0, _lodash.isObjectLike)(element) || (0, _lodash.isArray)(element) || (0, _lodash.isString)(element)) && (0, _lodash.isEmpty)(element) && !_settings.options.showEmpty)) {
        key += parse(element, maxIndexLength - i.length);
        objOut.push(key);
      }
    } else if (level === _settings.options.depth) {
      // dont nest any more for object if depth level reached
      key += _utils2.default.indent(maxIndexLength - i.length) + _settings.pColor.depth('[Object] (' + (0, _lodash.keys)(element).length + ' keys)');
      objOut.push(key);
    } else if (level + 1 === _settings.options.depth && (0, _lodash.isArray)(element)) {
      objOut.push(key);
    } else {
      // If the index is an array or object, render it in next line
      objOut.push(key);
      objOut.push(parse(isError && i === 'stack' ? element.split('\n') : element, indentation + _settings.options.defaultIndentation, level));
    }
  });
  return objOut;
};

var _handleEmpty = function _handleEmpty(data, indentation) {
  if ((0, _lodash.isArray)(data)) {
    return _utils2.default.indent(indentation) + (_settings.options.noColor ? _settings.options.emptyArrayMsg : _settings.pColor.empty(_settings.options.emptyArrayMsg));
  } else if ((0, _lodash.isString)(data)) {
    return _utils2.default.indent(indentation) + (_settings.options.noColor ? _settings.options.emptyStringMsg : _settings.pColor.empty(_settings.options.emptyStringMsg));
  } else if ((0, _lodash.isObjectLike)(data)) {
    return _utils2.default.indent(indentation) + (_settings.options.noColor ? _settings.options.emptyObjectMsg : _settings.pColor.empty(_settings.options.emptyObjectMsg));
  }
};

var _handleSerializable = function _handleSerializable(data, indentation) {
  if ((0, _lodash.isFunction)(data)) {
    return _handleFunction(data, indentation);
  } else if ((0, _lodash.isDate)(data) || (0, _lodash.isNumber)(data)) {
    return _utils2.default.indent(indentation) + _addColorToData(data);
  } else if (((0, _lodash.isObjectLike)(data) || (0, _lodash.isString)(data)) && (0, _lodash.isEmpty)(data)) {
    return _handleEmpty(data, indentation);
  } else {
    // Render a string exactly equal
    return _utils2.default.indent(indentation) + _addColorToData(data);
  }
};

var parse = exports.parse = function parse(data) {
  var indentation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var output = [];

  // reassign key value back to itself for customColor objects
  if (_settings.options.customColors && (0, _lodash.isObjectLike)(data)) {
    (0, _lodash.keys)(_settings.options.customColors).some(function (key) {
      if (!(0, _lodash.isEmpty)(data[key])) {
        data = _settings.pColor[key](data[key]);
        return true;
      }
    });
  }

  if (_utils2.default.isSerializable(data, _settings.options.inlineArrays)) {
    output = output.concat(_handleSerializable(data, indentation));
  } else if ((0, _lodash.isString)(data)) {
    // unserializable string means it's multiline
    output = output.concat(_handleMultiLine(data, indentation));
  } else if ((0, _lodash.isArray)(data)) {
    output = output.concat(_handleArray(data, indentation, level));
  } else if ((0, _lodash.isObjectLike)(data)) {
    output = output.concat(_handleObject(data, indentation, level));
  }

  // Return all the lines as a string
  return output.join('\n');
};

exports.default = parse;
//# sourceMappingURL=parser.js.map