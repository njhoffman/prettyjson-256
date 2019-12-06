const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const colors = require('ansi-256-colors');

const { render, init } = require('../../lib/prettyjson');

const showOutput = false;
const saveSnapshot = false;

// keep own version of defaultOptions so project can be changed without breaking fixtures
// TODO: add options inlineIndent boolean
// TODO: make fg array optional
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
    empty: { fg: [12] },
    functionHeader: { fg: [13] },
    functionTag: { fg: [4, 4, 5] },
    keys: { fg: [2, 5, 4] },
    number: { fg: [2, 4, 5] }
  }
};

/* eslint-disable no-console */
const writeSnapshot = (name, data) => {
  const fullPath = path.resolve(__dirname, `../snapshots/${name}`);
  fs.writeFile(fullPath, data, err => {
    if (err) {
      return console.error(err);
    }
    return console.log(`\n\n -- Snapshot "${fullPath}" Saved\n\n`);
  });
};

const loadSnapshot = name => {
  const fullPath = path.resolve(__dirname, `../snapshots/${name}`);
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath);
  }
  return false;
};

const checksum = s => {
  let chk = 0x12345678;
  const len = s.length;
  let i;
  for (i = 0; i < len; i += 1) {
    chk += s.charCodeAt(i) * (i + 1);
  }
  // returns 32-bit integer checksum encoded as a string containin it's hex value
  /* eslint-disable no-bitwise */
  return (chk & 0xffffffff).toString(16);
  /* eslint-enable no-bitwise */
};

const _testOutput = (testObj, expected, customOptions = {}) => {
  const snapshot = loadSnapshot(expected);
  const newOptions = _.defaultsDeep(customOptions, options);
  init(newOptions);
  const ret = render(testObj);
  const failOut = snapshot
    ? `\n\n${colors.reset}--(expected)--\n${snapshot}\n\n--(returned)--\n${ret}\n\n`
    : `\n${colors.reset}(returned)\n${ret}\n\n`;

  if (showOutput) {
    console.log(`\n${ret}\n`);
  }

  if (saveSnapshot) {
    console.log('writing snapshot');
    writeSnapshot(expected, ret);
  }
  // expect(checksum(ret)).to.equal(expected);
  expect(checksum(ret), failOut).to.equal(expected);
};

/* eslint-enable no-console */

module.exports = {
  _testOutput
};
