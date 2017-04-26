import { isArray, isObject, each, isEmpty, keys } from 'lodash';
import { options, pColor, init as settingsInit } from './settings';
import parse from './parser';

// exports.version = require('../package.json').version;

const maxSortDepth = 20;
let currSortDepth = 0;
const _sortKeys = (data, parentIsArray) => {
  var sortedData = parentIsArray && !options.numberArrays ? [] : {};
  each(keys(data).sort(), (key) => {
    if ((isObject(data[key]) || isArray(data[key])) && currSortDepth < maxSortDepth) {
      currSortDepth++;
      if (isArray(data[key])) {
        sortedData[key] = _sortKeys(data[key], (!options.numberArrays));
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

export const init = (customOptions = {}) => {
  settingsInit(customOptions);
};

export const render = (data, startIndent = 0, customOptions = {}) => {
  !isEmpty(customOptions) && settingsInit(customOptions);
  if (options.alphabetizeKeys) {
    data = _sortKeys(data, isArray(data));
  }
  return parse(data, startIndent);
};

export const renderString = (customOptions, data) => {
  // called from direct entry of cli
  if (!isEmpty(customOptions)) {
    settingsInit(customOptions);
  }

  let output = '';
  let parsedData;

  // If the input is not a string or if it's empty, just return an empty string
  if (typeof data !== 'string' || data === '') {
    return '';
  }

  // Remove non-JSON characters from the beginning string
  if (data[0] !== '{' && data[0] !== '[') {
    let beginingOfJson =
      data.indexOf('{') === -1
      ? data.indexOf('[')
      : data.indexOf('[') === -1
      ? data.indexOf('{')
      : data.indexOf('{') < data.indexOf('[')
      ? data.indexOf('{')
      : data.indexOf('[');
    output += pColor.string(data.substr(0, beginingOfJson)) + '\n';
    data = data.substr(beginingOfJson);
  }

  try {
    parsedData = JSON.parse(data);
  } catch (e) {
    return pColor.error('Error:') + ' Not valid JSON!';
  }

  output += render(parsedData);
  return output;
};
