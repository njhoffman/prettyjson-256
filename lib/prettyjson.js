const _ = require('lodash');
const { getOptions, getPrintColor, outputColorCodes, init: settingsInit } = require('./settings');
const parse = require('./parser');

const pColor = getPrintColor();

const maxSortDepth = 20;
let currSortDepth = 0;
const _sortKeys = (data, parentIsArray) => {
  const sortedData = parentIsArray && !getOptions().numberArrays ? [] : {};
  _.each(_.keys(data).sort(), key => {
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

const render = (data, startIndent = 0, customOptions = {}) => {
  const options = { ...getOptions(), ...customOptions };

  if (options.alphabetizeKeys) {
    data = _sortKeys(data, _.isArray(data));
  }

  let ret = parse(data, startIndent, options);
  // console.info('parse return', ret);
  if (options.browser) {
    ret = _.flattenDeep(ret);
    const messages = ret.filter((el, i) => i % 2 === 0);
    const colorCodes = ret.filter((el, i) => i % 2 !== 0);
    return [messages, colorCodes];
  }
  return ret;
};

const renderString = (data, customOptions) => {
  // called from direct entry of cli
  if (!_.isEmpty(customOptions)) {
    settingsInit(customOptions);
  }

  let output = '';
  let parsedData;

  if (typeof data !== 'string' || data === '') {
    return '';
  }

  if (data[0] !== '{' && data[0] !== '[') {
    const beginningOfJson =
      data.indexOf('{') === -1
        ? data.indexOf('[')
        : data.indexOf('[') === -1
        ? data.indexOf('{')
        : data.indexOf('{') < data.indexOf('[')
        ? data.indexOf('{')
        : data.indexOf('[');
    output += `${pColor.string(data.substr(0, beginningOfJson))}\n`;
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

const init = (customOptions = {}) => {
  settingsInit(customOptions);
  return render;
};

exports = module.exports = {
  getOptions,
  outputColorCodes,
  renderString,
  render,
  init
};
