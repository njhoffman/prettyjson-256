'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderString = exports.render = exports.init = undefined;

var _lodash = require('lodash');

var _settings = require('./settings');

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// exports.version = require('../package.json').version;

var maxSortDepth = 20;
var currSortDepth = 0;
var _sortKeys = function _sortKeys(data, parentIsArray) {
  var sortedData = parentIsArray && !_settings.options.numberArrays ? [] : {};
  (0, _lodash.each)((0, _lodash.keys)(data).sort(), function (key) {
    // continue recursion if item is object and not exceeding maximum depth
    if ((0, _lodash.isObjectLike)(data[key]) && currSortDepth < maxSortDepth) {
      currSortDepth++;
      if ((0, _lodash.isArray)(data[key])) {
        sortedData[key] = _sortKeys(data[key], !_settings.options.numberArrays);
      } else {
        sortedData[key] = _sortKeys(data[key]);
      }
    } else {
      if ((0, _lodash.isArray)(sortedData)) {
        sortedData.push(data[key]);
      } else {
        sortedData[key] = data[key];
      }
    }
  });
  currSortDepth--;
  return sortedData;
};

var init = exports.init = function init() {
  var customOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _settings.init)(customOptions);
};

var render = exports.render = function render(data) {
  var startIndent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var customOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  !(0, _lodash.isEmpty)(customOptions) && (0, _settings.init)(customOptions);
  if (_settings.options.alphabetizeKeys) {
    data = _sortKeys(data, (0, _lodash.isArray)(data));
  }

  return (0, _parser2.default)(data, startIndent);
};

var renderString = exports.renderString = function renderString(data, customOptions) {
  // called from direct entry of cli
  !(0, _lodash.isEmpty)(customOptions) && (0, _settings.init)(customOptions);

  var output = '';
  var parsedData = void 0;

  if (typeof data !== 'string' || data === '') {
    return '';
  }

  if (data[0] !== '{' && data[0] !== '[') {
    var beginningOfJson = data.indexOf('{') === -1 ? data.indexOf('[') : data.indexOf('[') === -1 ? data.indexOf('{') : data.indexOf('{') < data.indexOf('[') ? data.indexOf('{') : data.indexOf('[');
    output += _settings.pColor.string(data.substr(0, beginningOfJson)) + '\n';
    data = data.substr(beginningOfJson);
  }

  try {
    parsedData = JSON.parse(data);
  } catch (e) {
    return _settings.pColor.error('Error:') + ' Not valid JSON!';
  }

  output += exports.render(parsedData);
  return output;
};
//# sourceMappingURL=prettyjson.js.map