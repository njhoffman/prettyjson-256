const _ = require('lodash');
const ansiColors = require('ansi-256-colors');
const customColors = require('./colors');

const defaultOptions = {
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
  customColors
};

const createColorBrowser = colorMap => {
  const printColor = {};
  _.each(colorMap, (val, key) => {
    printColor[key] = function(key, sInput) {
      // console.info('print 1: ' + key + ' - ' + sInput);
      if (options.noColor || !colorMap[key]) {
        return [sInput];
      }
      const cItem = [`%c ${sInput}`];
      let colorCode;
      const fg = _.has(colorMap, `${key}.fg`) ? [].concat(colorMap[key].fg) : false;
      const bg = _.has(colorMap, `${key}.bg`) ? [].concat(colorMap[key].bg) : false;

      if (fg) {
        colorCode =
          fg.length === 1
            ? (11 * parseInt(fg)).toString(16) + (11 * parseInt(fg)).toString(16) + (11 * parseInt(fg)).toString(16)
            : (51 * parseInt(fg[0])).toString(16) +
              (51 * parseInt(fg[1])).toString(16) +
              (51 * parseInt(fg[2])).toString(16);
        cItem.push(`color: #${colorCode}`);
      }

      if (bg) {
        colorCode =
          bg.length === 1
            ? _.times(3, 11.09 * parseInt(bg)).toString(16)
            : (51 * parseInt(bg[0])).toString(16) +
              (51 * parseInt(bg[1])).toString(16) +
              (51 * parseInt(bg[2])).toString(16);
        cItem.push(`background-color: #${colorCode}`);
      }
      // console.info('print 2', cItem);
      return cItem;
    }.bind(this, key);
  });
  return printColor;
};

const createColorTerminal = colorMap => {
  const printColor = {};
  _.each(colorMap, (val, key) => {
    printColor[key] = function(key, sInput) {
      if (!colorMap[key]) {
        return ansiColors.reset + sInput;
      }
      if (options.noColor) {
        return sInput;
      }
      let cItem = colorMap[key].fg
        ? _.isNumber(colorMap[key].fg) || (_.isArray(colorMap[key].fg) && colorMap[key].fg.length == 1)
          ? ansiColors.fg.grayscale[colorMap[key].fg]
          : colorMap[key].fg.length === 3
          ? ansiColors.fg.getRgb.apply(this, colorMap[key].fg)
          : ''
        : '';
      cItem +=
        (colorMap[key].bg
          ? _.isNumber(colorMap[key].bg) || (_.isArray(colorMap[key].bg) && colorMap[key].bg.length == 1)
            ? ansiColors.bg.grayscale[colorMap[key].bg]
            : colorMap[key].bg.length === 3
            ? ansiColors.bg.getRgb.apply(this, colorMap[key].bg)
            : ''
          : '') +
        sInput +
        ansiColors.reset;
      return cItem;
    }.bind(this, key);
  });
  return printColor;
};

let options = _.cloneDeep(defaultOptions);
const getOptions = () => options;

let printColor;
const init = (customOptions = {}) => {
  options = _.defaultsDeep(customOptions, defaultOptions);
  options.depth = parseInt(options.depth);
  options.defaultIndentation = parseInt(options.defaultIndentation);

  const newColors = _.clone(options.colors);
  if (options.customColors) {
    _.each(_.keys(options.customColors), key => {
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
        colorCodes += `${ansiColors.fg.getRgb(r, g, b)}[color ${r}, ${g}, ${b}]   ${ansiColors.reset}`;
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
