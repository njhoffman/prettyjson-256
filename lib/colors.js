//  0     =  0.0 = 0
// >42.5  = 16.6 = 1
// >85    = 33.3 = 2
// >127.5 = 50.0 = 3
// >170   = 66.6 = 4
// >212.5 = 83.3 = 5
const colorMap = {
  // blue colors
  midnightBlue: [0, 0, 1],
  navyBlue: [0, 0, 2],
  darkBlue: [0, 0, 3],
  mediumBlue: [0, 0, 4],
  blue: [0, 0, 5],
  royalBlue: [1, 2, 5],
  steelBlue: [1, 3, 3],
  cornflowerBlue: [2, 3, 5],
  dodgerBlue: [0, 3, 5],
  deepSkyBlue: [0, 4, 5],
  lightSkyBlue: [2, 4, 5],
  skyBlue: [2, 4, 4],
  lightBlue: [3, 4, 4],
  powderBlue: [3, 5, 4],
  lightSteelBlue: [3, 4, 4],

  // green colors
  darkGreen: [0, 2, 0],
  green: [0, 3, 0], // lime
  forestGreen: [1, 3, 1],
  seaGreen: [1, 3, 2],
  mediumSeaGreen: [1, 4, 2],
  darkSeaGreen: [2, 4, 3],
  lightGreen: [3, 5, 3],
  paleGreen: [3, 5, 3],
  mediumSpringGreen: [0, 5, 2],
  springGreen: [0, 5, 3],
  greenYellow: [4, 5, 1],
  chartreuse: [2, 5, 0],
  lawnGreen: [3, 5, 0],
  lime: [0, 5, 0],
  limeGreen: [1, 4, 1],
  yellowGreen: [3, 4, 1],
  oliveDrab: [2, 3, 1],
  olive: [3, 3, 0],
  darkOliveGreen: [2, 2, 1],

  // cyan colors
  teal: [0, 1, 1],
  darkCyan: [0, 2, 2],
  cadetBlue: [2, 3, 3],
  lightSeaGreen: [1, 3, 3],
  darkTurquoise: [0, 3, 3],
  mediumTurquoise: [1, 4, 4],
  turquoise: [1, 5, 4],
  mediumAquamarine: [2, 4, 3],
  aquamarine: [2, 5, 4],
  paleTurquoise: [3, 5, 4],
  lightCyan: [4, 5, 5],
  cyan: [0, 5, 5], // aqua

  // purple, violet, magenta
  mediumSlateBlue: [2, 1, 5],
  slateBlue: [2, 1, 4],
  indigo: [2, 0, 3],
  purple: [3, 0, 3],
  darkMagenta: [3, 0, 3],
  darkOrchid: [3, 1, 4],
  darkViolet: [3, 0, 4],
  blueViolet: [3, 1, 5],
  mediumPurple: [3, 2, 5],
  mediumOrchid: [4, 2, 5],
  orchid: [4, 2, 4],
  thistle: [4, 3, 5],
  lavender: [4, 4, 5],
  magenta: [5, 0, 5],
  fuchsia: [5, 0, 5],
  violet: [5, 2, 5],
  plum: [5, 3, 4],

  // orange
  orangeRed: [5, 1, 0],
  tomato: [5, 1, 1],
  coral: [5, 2, 1],
  darkOrange: [5, 2, 0],
  orange: [5, 3, 0],

  // pink
  mediumVioletRed: [4, 0, 3],
  paleVioletRed: [5, 2, 3],
  deepPink: [5, 0, 3],
  hotPink: [5, 2, 4],
  lightPink: [5, 3, 4],
  pink: [5, 4, 4],

  // red
  red: [5, 0, 0],
  darkRed: [3, 0, 0],
  firebrick: [4, 1, 1],
  crimson: [5, 0, 1],
  indianRed: [4, 2, 2],
  lightCoral: [5, 2, 2],
  darkSalmon: [5, 2, 2],
  salmon: [5, 3, 2],
  lightSalmon: [5, 4, 2],

  // brown colors
  maroon: [4, 1, 2],
  brown: [3, 1, 0],
  sienna: [3, 2, 1],
  saddleBrown: [3, 2, 1],
  chocolate: [4, 2, 0],
  peru: [4, 3, 1],
  darkGoldenrod: [4, 3, 0],
  goldenrod: [5, 3, 0],
  sandyBrown: [5, 3, 2],
  rosyBrown: [4, 3, 3],
  tan: [4, 4, 3],
  burlywood: [5, 4, 3],
  wheat: [5, 5, 4],
  navajoWhite: [5, 5, 4],
  bisque: [5, 5, 4],
  blanchedAlmond: [5, 5, 4],
  cornsilk: [5, 5, 5],

  // yellow colors
  gold: [5, 4, 0],
  darkKhaki: [4, 4, 2],
  khaki: [5, 5, 2],
  paleGoldenrod: [5, 5, 3],
  peachPuff: [5, 4, 3],
  moccasin: [5, 5, 4],
  papayaWhip: [5, 5, 5],
  lightGoldenrod: [5, 5, 4],
  lemonChiffon: [5, 5, 4],
  lightYellow: [5, 5, 5],
  yellow: [5, 5, 0],

  // gray and black
  black: [0, 0, 0],
  darkSlateGray: [1, 1, 1],
  slateGray: [2, 3, 3],
  lightSlateGray: [2, 3, 3],
  dimGray: [2, 2, 2],
  gray: [3, 3, 3], // silver
  darkGray: [4, 4, 4],
  lightGray: [5, 4, 4],
  gainsboro: [5, 4, 4],

  webMaroon: [3, 0, 0],

  // white colors

  antiqueWhite: [5, 5, 4],
  white: [5, 5, 5]

  // snow, honeydew, mintcream, azure, aliceblue, ghostwhite, whitesmoke, seashell, beige, oldlace,
  // floralwhite, ivory, antiquewhite, linen, lavenderblush, mistyrose
};

const fgColors = {};
Object.keys(colorMap).forEach(key => {
  fgColors[key] = { fg: colorMap[key] };
});

module.exports = fgColors;
