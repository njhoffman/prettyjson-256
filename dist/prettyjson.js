'use strict';

var _ = require('lodash');

var _require = require('./settings'),
    getOptions = _require.getOptions,
    getPrintColor = _require.getPrintColor,
    outputColorCodes = _require.outputColorCodes,
    settingsInit = _require.init;

var parse = require('./parser');

var pColor = getPrintColor();

var maxSortDepth = 20;
var currSortDepth = 0;
var _sortKeys = function _sortKeys(data, parentIsArray) {
  var sortedData = parentIsArray && !getOptions().numberArrays ? [] : {};
  _.each(_.keys(data).sort(), function (key) {
    // continue recursion if item is object and not exceeding maximum depth
    if (_.isObjectLike(data[key]) && currSortDepth < maxSortDepth) {
      currSortDepth += 1;
      if (_.isArray(data[key])) {
        sortedData[key] = _sortKeys(data[key], !getOptions().numberArrays);
      } else {
        sortedData[key] = _sortKeys(data[key]);
      }
    } else if (_.isArray(sortedData)) {
      sortedData.push(data[key]);
    } else {
      sortedData[key] = data[key];
    }
  });
  currSortDepth -= 1;
  return sortedData;
};

var render = function render(data) {
  var startIndent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var customOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var options = _.defaultsDeep(getOptions(), customOptions);
  var alphabetizeKeys = options.alphabetizeKeys,
      browser = options.browser;

  var sortedData = alphabetizeKeys ? _sortKeys(data, _.isArray(data)) : data;

  var ret = parse(sortedData, startIndent, options);
  // console.info('parse return', ret);
  if (browser) {
    ret = _.flattenDeep(ret);
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
  if (!_.isEmpty(customOptions)) {
    settingsInit(customOptions);
  }

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

var init = function init() {
  var customOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  settingsInit(customOptions);
  return render;
};

exports = module.exports = {
  getOptions: getOptions,
  outputColorCodes: outputColorCodes,
  renderString: renderString,
  render: render,
  init: init
};
//# sourceMappingURL=prettyjson.js.map