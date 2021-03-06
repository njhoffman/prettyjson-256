'use strict';

var _ = require('lodash');
var ansiColors = require('ansi-256-colors');
var customColors = require('./colors');

var defaultOptions = {
  // sort object keys or array values alphabetically
  alphabetizeKeys: false,
  // how many spaces to indent nested objects
  defaultIndentation: 2,
  // maximum depth of nested levels to display for an object
  depth: -1,
  // what to display if value is an empty array, object, or string
  emptyArrayMsg: '(empty array)',
  emptyObjectMsg: '{}',
  emptyStringMsg: '""',
  // don't output any color
  noColor: false,
  // show array indexes, this will prevent array from sorting if alphabetizeKeys is on
  numberArrays: false,
  // show if contained in an object an array, string, or another object is empty
  showEmpty: true,
  // color output format for terminal or browser
  browser: false,
  // divider when an error object is encountered
  errorDivider: '---------------------------------------',
  // color codes for different output elements based on: https://github.com/jbnicolai/ansi-256-colors
  colors: {
    boolFalse: { fg: [5, 4, 4] },
    boolTrue: { fg: [4, 4, 5] },
    dash: { fg: [2, 5, 4] },
    date: { fg: [0, 5, 2] },
    depth: { fg: [9] },
    empty: { fg: [12] },
    functionHeader: { fg: [13] },
    functionTag: { fg: [4, 4, 5] },
    keys: { fg: [2, 5, 4] },
    number: { fg: [2, 4, 5] },
    string: { fg: [20] },
    errorDivider: { fg: [8] },
    errorName: { fg: [5, 0, 0] },
    errorMessage: { fg: [5, 5, 5] },
    errorStack: { fg: [15] }
  },
  customColors: customColors
};

var printColor = {};
var options = _.cloneDeep(defaultOptions);
var getOptions = function getOptions() {
  return options;
};

var createColorBrowser = function createColorBrowser(colorMap) {
  // const printColor = {};
  _.each(colorMap, function (val, pKey) {
    printColor[pKey] = function (key, sInput) {
      // console.info('print 1: ' + key + ' - ' + sInput);
      if (options.noColor || !colorMap[key]) {
        return [sInput];
      }
      var cItem = ['%c ' + sInput];
      var colorCode = void 0;
      var fg = _.has(colorMap, key + '.fg') ? [].concat(colorMap[key].fg) : false;
      var bg = _.has(colorMap, key + '.bg') ? [].concat(colorMap[key].bg) : false;

      if (fg) {
        colorCode = fg.length === 1 ? (11 * parseInt(fg, 10)).toString(16) + (11 * parseInt(fg, 10)).toString(16) + (11 * parseInt(fg, 10)).toString(16) : (51 * parseInt(fg[0], 10)).toString(16) + (51 * parseInt(fg[1], 10)).toString(16) + (51 * parseInt(fg[2], 10)).toString(16);
        cItem.push('color: #' + colorCode);
      }

      if (bg) {
        colorCode = bg.length === 1 ? _.times(3, 11.09 * parseInt(bg, 10)).toString(16) : (51 * parseInt(bg[0], 10)).toString(16) + (51 * parseInt(bg[1], 10)).toString(16) + (51 * parseInt(bg[2], 10)).toString(16);
        cItem.push('background-color: #' + colorCode);
      }
      // console.info('print 2', cItem);
      return cItem;
    }.bind(undefined, pKey);
  });
  return printColor;
};

var createColorTerminal = function createColorTerminal(colorMap) {
  _.each(colorMap, function (val, pKey) {
    printColor[pKey] = function (key, sInput) {
      if (!colorMap[key]) {
        return ansiColors.reset + sInput;
      }
      if (options.noColor) {
        return sInput;
      }

      var cItem = '';

      if (_.isNumber(colorMap[key].fg) || _.isArray(colorMap[key].fg) && colorMap[key].fg.length === 1) {
        cItem = ansiColors.fg.grayscale[colorMap[key].fg];
      } else if (_.isArray(colorMap[key].fg) && colorMap[key].fg.length === 3) {
        cItem = ansiColors.fg.getRgb.apply(this, colorMap[key].fg);
      }

      if (_.isNumber(colorMap[key].bg) || _.isArray(colorMap[key].bg) && colorMap[key].bg.length === 1) {
        cItem += ansiColors.bg.grayscale[colorMap[key].bg];
      } else if (_.isArray(colorMap[key].bg) && colorMap[key].bg.length === 3) {
        cItem += ansiColors.bg.getRgb.apply(this, colorMap[key].bg);
      }
      cItem += sInput + ansiColors.reset;
      return cItem;
    }.bind(undefined, pKey);
  });
  return printColor;
};

var init = function init() {
  var customOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  options = _.defaultsDeep(customOptions, defaultOptions);
  options.depth = parseInt(options.depth, 10);
  options.defaultIndentation = parseInt(options.defaultIndentation, 10);

  var newColors = _.clone(options.colors);
  if (options.customColors) {
    _.each(_.keys(options.customColors), function (key) {
      newColors[key] = options.customColors[key];
    });
  }
  if (options.browser) {
    printColor = createColorBrowser(newColors);
  } else {
    printColor = createColorTerminal(newColors);
  }
  return printColor;
};

var getPrintColor = function getPrintColor() {
  return printColor;
};

var outputColorCodes = function outputColorCodes() {
  var colorCodes = '';
  var rgb = [0, 0, 0];
  for (rgb[0] = 0; rgb[0] <= 5; rgb[0] += 1) {
    for (rgb[1] = 0; rgb[1] <= 5; rgb[1] += 1) {
      for (rgb[2] = 0; rgb[2] <= 5; rgb[2] += 1) {
        colorCodes += ansiColors.fg.getRgb(rgb[0], rgb[1], rgb[2]) + '[color ' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ']   ' + ansiColors.reset;
      }
      colorCodes += '\n';
    }
    colorCodes += '\n';
  }
  return colorCodes;
};

exports = module.exports = {
  init: init,
  getOptions: getOptions,
  getPrintColor: getPrintColor,
  outputColorCodes: outputColorCodes
};

exports.init();
//# sourceMappingURL=settings.js.map