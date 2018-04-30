'use strict';

var _require = require('lodash'),
    each = _require.each,
    clone = _require.clone,
    cloneDeep = _require.cloneDeep,
    defaultsDeep = _require.defaultsDeep,
    keys = _require.keys,
    isNumber = _require.isNumber,
    times = _require.times;

var ansiColors = require('ansi-256-colors');

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
    empty: { fg: [13] },
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
  customColors: {
    bold: { fg: [23] },
    blue: { fg: [0, 0, 4] },
    lightBlue: { fg: [0, 1, 5] },
    darkBlue: { fg: [0, 0, 3] },
    red: { fg: [3, 0, 0] },
    lightRed: { fg: [5, 0, 0] },
    darkRed: { fg: [1, 0, 0] },
    green: { fg: [0, 3, 0] },
    lightGreen: { fg: [0, 5, 0] },
    darkGreen: { fg: [0, 1, 0] },
    purple: { fg: [1, 0, 3] },
    lightPurple: { fg: [2, 0, 5] },
    darkPurple: { fg: [1, 0, 1] },
    cyan: { fg: [2, 3, 4] },
    lightCyan: { fg: [2, 5, 5] },
    darkCyan: { fg: [1, 2, 3] },
    yellow: { fg: [4, 5, 0] },
    orange: { fg: [5, 2, 0] },
    white: { fg: [4, 4, 4] },
    gray: { fg: [12] }
  }
};

var createColorBrowser = function createColorBrowser(colorMap) {
  var printColor = {};
  each(colorMap, function (val, key) {
    printColor[key] = function (key, sInput) {
      // console.info('print 1: ' + key + ' - ' +  sInput);
      if (options.noColor || !colorMap[key]) {
        return [sInput];
      }
      var cItem = ['%c ' + sInput];
      var colorCode = void 0;
      var fg = _.has(colorMap, key + '.fg') ? colorMap[key].fg : false;
      var bg = _.has(colorMap, key + '.bg') ? colorMap[key].bg : false;

      if (fg) {
        colorCode = fg.length === 1 ? (11 * parseInt(fg)).toString(16) + (11 * parseInt(fg)).toString(16) + (11 * parseInt(fg)).toString(16) : (51 * parseInt(fg[0])).toString(16) + (51 * parseInt(fg[1])).toString(16) + (51 * parseInt(fg[2])).toString(16);
        cItem.push('color: #' + colorCode);
      }

      if (bg) {
        colorCode = bg.length === 1 ? times(3, 11.09 * parseInt(bg)).toString(16) : (51 * parseInt(bg[0])).toString(16) + (51 * parseInt(bg[1])).toString(16) + (51 * parseInt(bg[2])).toString(16);
        cItem.push('background-color: #' + colorCode);
      }
      // console.info('print 2', cItem);
      return cItem;
    }.bind(undefined, key);
  });
  return printColor;
};

var createColorTerminal = function createColorTerminal(colorMap) {
  var printColor = {};
  each(colorMap, function (val, key) {
    printColor[key] = function (key, sInput) {
      if (!colorMap[key]) {
        return ansiColors.reset + sInput;
      }
      if (options.noColor) {
        return sInput;
      }
      var cItem = colorMap[key].fg ? isNumber(colorMap[key].fg) ? ansiColors.fg.grayscale[colorMap[key].fg] : colorMap[key].fg.length === 3 ? ansiColors.fg.getRgb.apply(this, colorMap[key].fg) : '' : '';
      cItem += (colorMap[key].bg ? isNumber(colorMap[key].bg) ? ansiColors.bg.grayscale[colorMap[key].bg] : colorMap[key].bg.length === 3 ? ansiColors.bg.getRgb.apply(this, colorMap[key].bg) : '' : '') + sInput + ansiColors.reset;
      return cItem;
    }.bind(undefined, key);
  });
  return printColor;
};

var options = cloneDeep(defaultOptions);
var getOptions = function getOptions() {
  return options;
};

var printColor = void 0;
var init = function init() {
  var customOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  options = defaultsDeep(customOptions, defaultOptions);
  options.depth = parseInt(options.depth);
  options.defaultIndentation = parseInt(options.defaultIndentation);

  var newColors = clone(options.colors);
  if (options.customColors) {
    each(keys(options.customColors), function (key) {
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
  for (var r = 0; r <= 5; r++) {
    for (var g = 0; g <= 5; g++) {
      for (var b = 0; b <= 5; b++) {
        colorCodes += ansiColors.fg.getRgb(r, g, b) + ('[color ' + r + ', ' + g + ', ' + b + ']   ') + ansiColors.reset;
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