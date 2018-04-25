'use strict';

var _require = require('lodash'),
    isArray = _require.isArray,
    isObjectLike = _require.isObjectLike,
    each = _require.each,
    isEmpty = _require.isEmpty,
    keys = _require.keys,
    flattenDeep = _require.flattenDeep;

var _require2 = require('./settings'),
    getOptions = _require2.getOptions,
    getPrintColor = _require2.getPrintColor,
    outputColorCodes = _require2.outputColorCodes,
    settingsInit = _require2.init;

var parse = require('./parser');

var pColor = getPrintColor();

var maxSortDepth = 20;
var currSortDepth = 0;
var _sortKeys = function _sortKeys(data, parentIsArray) {
  var sortedData = parentIsArray && !getOptions().numberArrays ? [] : {};
  each(keys(data).sort(), function (key) {
    // continue recursion if item is object and not exceeding maximum depth
    if (isObjectLike(data[key]) && currSortDepth < maxSortDepth) {
      currSortDepth++;
      if (isArray(data[key])) {
        sortedData[key] = _sortKeys(data[key], !getOptions().numberArrays);
      } else {
        sortedData[key] = _sortKeys(data[key]);
      }
    } else {
      if (isArray(sortedData)) {
        sortedData.push(data[key]);
      } else {
        sortedData[key] = data[key];
      }
    }
  });
  currSortDepth--;
  return sortedData;
};

var init = function init() {
  var customOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  settingsInit(customOptions);
  return render;
};

var render = function render(data) {
  var startIndent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var customOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  !isEmpty(customOptions) && settingsInit(customOptions);
  if (getOptions().alphabetizeKeys) {
    data = _sortKeys(data, isArray(data));
  }
  var ret = parse(data, startIndent);
  // console.info('parse return', ret);
  if (getOptions().browser) {
    ret = flattenDeep(ret);
    var messages = ret.filter(function (el, i) {
      return i % 2 === 0;
    });
    var colorCodes = ret.filter(function (el, i) {
      return i % 2 !== 0;
    });
    return [messages, colorCodes];
  }
  return ret;
};

var renderString = function renderString(data, customOptions) {
  // called from direct entry of cli
  !isEmpty(customOptions) && settingsInit(customOptions);

  var output = '';
  var parsedData = void 0;

  if (typeof data !== 'string' || data === '') {
    return '';
  }

  if (data[0] !== '{' && data[0] !== '[') {
    var beginningOfJson = data.indexOf('{') === -1 ? data.indexOf('[') : data.indexOf('[') === -1 ? data.indexOf('{') : data.indexOf('{') < data.indexOf('[') ? data.indexOf('{') : data.indexOf('[');
    output += pColor.string(data.substr(0, beginningOfJson)) + '\n';
    data = data.substr(beginningOfJson);
  }

  try {
    parsedData = JSON.parse(data);
  } catch (e) {
    // just send back as is
    parsedData = data;
  }

  output += exports.render(parsedData);
  return output;
};

exports = module.exports = {
  getOptions: getOptions,
  outputColorCodes: outputColorCodes,
  renderString: renderString,
  render: render,
  init: init
};
//# sourceMappingURL=prettyjson.js.map