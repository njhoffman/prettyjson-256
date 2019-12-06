const { testObj1, testMultiline1 } = require('./fixtures/fixtures');
const { render, init } = require('../lib/prettyjson');
const { outputColorCodes } = require('../lib/settings');

const options = {
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

console.log(outputColorCodes());
init(options);
console.log(render(testObj1));
console.log(render(testMultiline1));

try {
  throw new Error('Hey doofus');
} catch (err) {
  console.log('im here');
  // console.log(err);
  console.log(render(err));
}
