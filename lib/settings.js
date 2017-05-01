import _ from 'lodash';
import colors from 'ansi-256-colors';

export let defaultOptions = {
  // sort object keys or array values alphabetically
  alphabetizeKeys:    false,
  // how many spaces to indent nested objects
  defaultIndentation: 2,
  // maximum depth of nested levels to display for an object
  depth:              2,
  // what to display if value is an empty array, object, or string
  emptyArrayMsg:      '(empty array)',
  emptyObjectMsg:     '{}',
  emptyStringMsg:     '(empty string)',
  // don't output any color
  noColor:            false,
  // show array indexes, this will prevent array from sorting if alphabetizeKeys is on
  numberArrays:       false,
  // show if contained in an object an array, string, or another object is empty
  showEmpty:          true,
  // color codes for different output elements based on: https://github.com/jbnicolai/ansi-256-colors
  colors:             {
    boolFalse:        { fg: [5, 4, 4] },
    boolTrue:         { fg: [4, 4, 5] },
    dash:             { fg: [2, 5, 4] },
    date:             { fg: [0, 5, 2] },
    depth:            { fg: [9] },
    empty:            { fg: [13] },
    functionHeader:   { fg: [13] },
    functionTag:      { fg: [4, 4, 5] },
    keys:             { fg: [2, 5, 4] },
    number:           { fg: [2, 4, 5] },
    string:           null
  }
};

const createColorObj = (colorMap) => {
  var printColor = {};
  _.each(colorMap, (val, key) => {
    printColor[key] = function (key, sInput) {
      if (!colorMap[key]) {
        return colors.reset + sInput;
      }
      let cItem =
        colorMap[key].fg
          ? colorMap[key].fg.length === 1
            ? colors.fg.grayscale[colorMap[key].fg[0]]
            : colorMap[key].fg.length === 3
            ? colors.fg.getRgb.apply(this, colorMap[key].fg)
            : ''
          : '';
      cItem +=
        (colorMap[key].bg
          ? colorMap[key].bg.length === 1
            ? colors.bg.grayscale[colorMap[key].bg[0]]
            : colorMap[key].bg.length === 3
            ? colors.bg.getRgb.apply(this, colorMap[key].bg)
            : ''
          : '') + sInput + colors.reset;
      return cItem;
    }.bind(this, key);
  });
  return printColor;
};

export const init = (customOptions = {}) => {
  options = _.defaultsDeep(customOptions, defaultOptions);
  options.depth = parseInt(options.depth);
  options.defaultIndentation = parseInt(options.defaultIndentation);

  const newColors = _.clone(options.colors);
  if (options.customColors) {
    _.each(_.keys(options.customColors), (key) => {
      newColors[key] = options.customColors[key];
    });
  }
  pColor = createColorObj(newColors);
  return pColor;
};

export let options = _.cloneDeep(defaultOptions);
export let pColor = init(options);

export const outputColorCodes = () => {
  let colorCodes = '';
  for (let r = 0; r <= 5; r++) {
    for (let g = 0; g <= 5; g++) {
      for (let b = 0; b <= 5; b++) {
        colorCodes += colors.fg.getRgb(r, g, b) + `[color ${r}, ${g}, ${b}]   ` + colors.reset;
      }
      colorCodes += '\n';
    }
    colorCodes += '\n';
  }
  return colorCodes;
};
