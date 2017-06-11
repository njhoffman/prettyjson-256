const { each, clone, cloneDeep, defaultsDeep, keys, times } = require('lodash');
const ansiColors = require('ansi-256-colors');

let defaultOptions = {
  // sort object keys or array values alphabetically
  alphabetizeKeys:    false,
  // how many spaces to indent nested objects
  defaultIndentation: 2,
  // maximum depth of nested levels to display for an object
  depth:              -1,
  // what to display if value is an empty array, object, or string
  emptyArrayMsg:      '(empty array)',
  emptyObjectMsg:     '{}',
  emptyStringMsg:     '""',
  // don't output any color
  noColor:            false,
  // show array indexes, this will prevent array from sorting if alphabetizeKeys is on
  numberArrays:       false,
  // show if contained in an object an array, string, or another object is empty
  showEmpty:          true,
  // color output format for terminal or browser
  browser: false,
  // divider when an error object is encountered
  errorDivider:       '---------------------------------------',
  // color codes for different output elements based on: https://github.com/jbnicolai/ansi-256-colors
  colors:             {
    boolFalse:      { fg: [5, 4, 4] },
    boolTrue:       { fg: [4, 4, 5] },
    dash:           { fg: [2, 5, 4] },
    date:           { fg: [0, 5, 2] },
    depth:          { fg: [9] },
    empty:          { fg: [13] },
    functionHeader: { fg: [13] },
    functionTag:    { fg: [4, 4, 5] },
    keys:           { fg: [2, 5, 4] },
    number:         { fg: [2, 4, 5] },
    string:         { fg: [20] },
    errorDivider:   { fg: [18] },
    errorName:      { fg: [5, 0, 0] },
    errorMessage:   { fg: [5, 5, 5] },
    errorStack:     { fg: [15] }
  }
};

const createColorBrowser = (colorMap) => {
  let printColor = {};
  each(colorMap, (val, key) => {
    printColor[key] = function (key, sInput) {
      if (options.noColor || !colorMap[key]) {
        return [sInput];
      }
      let cItem = [`%c ${sInput}`];
      let colorCode;
      if (colorMap[key].fg) {
        colorCode = colorMap[key].fg.length === 1 ?
          ((11 * parseInt(colorMap[key].fg)).toString(16)  +
            (11 * parseInt(colorMap[key].fg)).toString(16) +
            (11 * parseInt(colorMap[key].fg)).toString(16)) :
          ((51 * parseInt(colorMap[key].fg[0])).toString(16) +
            (51 * parseInt(colorMap[key].fg[1])).toString(16) +
            (51 * parseInt(colorMap[key].fg[2])).toString(16));

        cItem.push(`color: #${colorCode}`);
      }
      if (colorMap[key].bg) {
        colorCode = colorMap[key].bg.length === 1 ?
          (times(3, 11.09 * parseInt(colorMap[key].bg)).toString(16)) :
          ((51 * parseInt(colorMap[key].bg[0])).toString(16) +
            (51 * parseInt(colorMap[key].bg[1])).toString(16) +
            (51 * parseInt(colorMap[key].bg[2])).toString(16));

        cItem.push(`background-color: #${colorCode}`);
      }
      return cItem;
    }.bind(this, key);
  });
  return printColor;
};

const createColorTerminal = (colorMap) => {
  let printColor = {};
  each(colorMap, (val, key) => {
    printColor[key] = function (key, sInput) {
      if (!colorMap[key]) {
        return ansiColors.reset + sInput;
      }
      if (options.noColor) {
        return sInput;
      }
      let cItem =
        colorMap[key].fg
          ? colorMap[key].fg.length === 1
            ? ansiColors.fg.grayscale[colorMap[key].fg[0]]
            : colorMap[key].fg.length === 3
            ? ansiColors.fg.getRgb.apply(this, colorMap[key].fg)
            : ''
          : '';
      cItem +=
        (colorMap[key].bg
          ? colorMap[key].bg.length === 1
            ? ansiColors.bg.grayscale[colorMap[key].bg[0]]
            : colorMap[key].bg.length === 3
            ? ansiColors.bg.getRgb.apply(this, colorMap[key].bg)
            : ''
          : '') + sInput + ansiColors.reset;
      return cItem;
    }.bind(this, key);
  });
  return printColor;
};

let options = cloneDeep(defaultOptions);
const getOptions = () => options;

let printColor;
const init = (customOptions = {}) => {
  options = defaultsDeep(customOptions, defaultOptions);
  options.depth = parseInt(options.depth);
  options.defaultIndentation = parseInt(options.defaultIndentation);

  const newColors = clone(options.colors);
  if (options.customColors) {
    each(keys(options.customColors), (key) => {
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
const getPrintColor = () => printColor;

const outputColorCodes = () => {
  let colorCodes = '';
  for (let r = 0; r <= 5; r++) {
    for (let g = 0; g <= 5; g++) {
      for (let b = 0; b <= 5; b++) {
        colorCodes += ansiColors.fg.getRgb(r, g, b) + `[color ${r}, ${g}, ${b}]   ` + ansiColors.reset;
      }
      colorCodes += '\n';
    }
    colorCodes += '\n';
  }
  return colorCodes;
};

exports = module.exports = {
  init,
  getOptions,
  getPrintColor,
  outputColorCodes
};

exports.init();
