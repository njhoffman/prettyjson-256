'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.outputColorCodes = exports.pColor = exports.options = exports.init = exports.defaultOptions = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ansi256Colors = require('ansi-256-colors');

var _ansi256Colors2 = _interopRequireDefault(_ansi256Colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = exports.defaultOptions = {
  alphabetizeKeys: false,
  defaultIndentation: 2,
  depth: -1,
  emptyArrayMsg: '(empty array)',
  emptyObjectMsg: '{}',
  emptyStringMsg: '(empty string)',
  noColor: false,
  numberArrays: false,
  showEmpty: true,
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
    string: null
  }
};

var createColorObj = function createColorObj(colorMap) {
  var printColor = {};
  _lodash2.default.each(colorMap, function (val, key) {
    printColor[key] = function (key, sInput) {
      if (!colorMap[key]) {
        return _ansi256Colors2.default.reset + sInput;
      }
      var cItem = colorMap[key].fg ? colorMap[key].fg.length === 1 ? _ansi256Colors2.default.fg.grayscale[colorMap[key].fg[0]] : colorMap[key].fg.length === 3 ? _ansi256Colors2.default.fg.getRgb.apply(this, colorMap[key].fg) : '' : '';
      cItem += (colorMap[key].bg ? colorMap[key].bg.length === 1 ? _ansi256Colors2.default.bg.grayscale[colorMap[key].bg[0]] : colorMap[key].bg.length === 3 ? _ansi256Colors2.default.bg.getRgb.apply(this, colorMap[key].bg) : '' : '') + sInput + _ansi256Colors2.default.reset;
      return cItem;
    }.bind(undefined, key);
  });
  return printColor;
};

var init = exports.init = function init() {
  var customOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  exports.options = options = _lodash2.default.defaultsDeep(customOptions, defaultOptions);
  options.depth = parseInt(options.depth);
  options.defaultIndentation = parseInt(options.defaultIndentation);

  var newColors = _lodash2.default.clone(options.colors);
  if (options.customColors) {
    _lodash2.default.each(_lodash2.default.keys(options.customColors), function (key) {
      newColors[key] = options.customColors[key];
    });
  }
  exports.pColor = pColor = createColorObj(newColors);
  return pColor;
};

var options = exports.options = _lodash2.default.cloneDeep(defaultOptions);
var pColor = exports.pColor = init(options);

var outputColorCodes = exports.outputColorCodes = function outputColorCodes() {
  var colorCodes = '';
  for (var r = 0; r <= 5; r++) {
    for (var g = 0; g <= 5; g++) {
      for (var b = 0; b <= 5; b++) {
        colorCodes += _ansi256Colors2.default.fg.getRgb(r, g, b) + ('[color ' + r + ', ' + g + ', ' + b + ']   ') + _ansi256Colors2.default.reset;
      }
      colorCodes += '\n';
    }
    colorCodes += '\n';
  }
  return colorCodes;
};
//# sourceMappingURL=settings.js.map