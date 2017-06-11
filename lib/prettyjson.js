const { isArray, isObjectLike, each, isEmpty, keys, flattenDeep } = require('lodash');
const { getOptions, getPrintColor, init: settingsInit } = require('./settings');
const parse = require('./parser');

let pColor = getPrintColor();

const maxSortDepth = 20;
let currSortDepth = 0;
const _sortKeys = (data, parentIsArray) => {
  let sortedData = parentIsArray && !getOptions().numberArrays ? [] : {};
  each(keys(data).sort(), (key) => {
    // continue recursion if item is object and not exceeding maximum depth
    if (isObjectLike(data[key]) && currSortDepth < maxSortDepth) {
      currSortDepth++;
      if (isArray(data[key])) {
        sortedData[key] = _sortKeys(data[key], (!getOptions().numberArrays));
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

const init = (customOptions = {}) => {
  settingsInit(customOptions);
  return render;
};

const render = (data, startIndent = 0, customOptions = {}) => {
  !isEmpty(customOptions) && settingsInit(customOptions);
  if (getOptions().alphabetizeKeys) {
    data = _sortKeys(data, isArray(data));
  }
  let ret = parse(data, startIndent);
  if (getOptions().browser) {
    ret = flattenDeep(ret);
    const messages = ret.filter((el, i) => i % 2 === 0);
    const colorCodes = ret.filter((el, i) => i % 2 !== 0);
    return [messages, colorCodes];
  }
  return ret;
};

const renderString = (data, customOptions) => {
  // called from direct entry of cli
  !isEmpty(customOptions) && settingsInit(customOptions);

  let output = '';
  let parsedData;

  if (typeof data !== 'string' || data === '') {
    return '';
  }

  if (data[0] !== '{' && data[0] !== '[') {
    let beginningOfJson =
      data.indexOf('{') === -1
      ? data.indexOf('[')
      : data.indexOf('[') === -1
      ? data.indexOf('{')
      : data.indexOf('{') < data.indexOf('[')
      ? data.indexOf('{')
      : data.indexOf('[');
    output += pColor.string(data.substr(0, beginningOfJson)) + '\n';
    data = data.substr(beginningOfJson);
  }

  try {
    parsedData = JSON.parse(data);
  } catch (e) {
    return pColor.error('Error:') + ' Not valid JSON!';
  }

  output += exports.render(parsedData);
  return output;
};

exports = module.exports = {
  renderString,
  render,
  init
};
