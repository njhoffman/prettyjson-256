'use strict';

var _ = require('lodash');
var colors = require('ansi-256-colors');

const defaultOptions = {
  emptyArrayMsg:      '(empty array)',
  defaultIndentation: 2,
  alphabetizeKeys:    false,
  numberArrays:       false,
  noColor:            false,
  showEmpty:          true,
  depth:              -1,
  indent:             2,
  colors:             {
    keys:             { fg: [2, 5, 4] },
    dash:             { fg: [2, 5, 4] },
    number:           { fg: [2, 4, 5] },
    boolTrue:         { fg: [4, 4, 5] },
    boolFalse:        { fg: [5, 4, 4] },
    depth:            { fg: [9] },
    empty:            { fg: [13] },
    date:             { fg: [0, 5, 2] },
    error:            { fg: [4, 0, 0] },
    string:           null,
    functionTag:      { fg: [4, 4, 5] },
    functionHeader:   { fg: [13] }
  }
};
let customOptions = {};
export let options = _.cloneDeep(defaultOptions);

export const init = (opt = {}) => {
  customOptions = opt;
  options = _.defaultsDeep(customOptions, settings.defaultOptions);
  options.depth = parseInt(options.depth);
  options.defaultIndentation = parseInt(options.defaultIndentation);

  const pColors = _.clone(options.colors);
  // override colors for object keys that are matched in 'customColors' settings
  Object.keys(settings.options.customColors).some(key => {
    if (typeof data[key] !== 'undefined') {
      Object.keys(pColors).forEach(color => {
        pColors[color] = settings.options.customColors[key];
      });
      data = data[key];
      return true;
    }
  });
  return createColorObj(colors);
}

const createColorObj = (colorMap) => {
  var printColor = {};
  _.each(colorMap, function (val, key) {
    printColor[key] = function (key, sInput) {
      if (!colorMap[key]) {
        return colors.reset + sInput;
      }
      var cItem = colorMap[key].fg
        ? colorMap[key].fg.length === 1 ? colors.fg.grayscale[colorMap[key].fg[0]]
        : colorMap[key].fg.length === 3 ? colors.fg.getRgb.apply(this, colorMap[key].fg) : ''
        : '';
      cItem += (colorMap[key].bg
        ? colorMap[key].bg.length === 1 ? colors.bg.grayscale[colorMap[key].bg[0]]
        : colorMap[key].bg.length === 3 ? colors.bg.getRgb.apply(this, colorMap[key].bg) : ''
        : '') + sInput + colors.reset;
      return cItem;
    }.bind(this, key);
  });
  return printColor;
};

export const outputColorCodes = () => {
  var colorCodes = '';
  for (var r = 0; r <= 5; r++) {
    for (var g = 0; g <= 5; g++) {
      for (var b = 0; b <= 5; b++) {
        colorCodes += colors.fg.getRgb(r, g, b) + `[color ${r}, ${g}, ${b}]   ` + colors.reset;
      }
      colorCodes += '\n';
    }
    colorCodes += '\n';
  }
  return colorCodes;
};
