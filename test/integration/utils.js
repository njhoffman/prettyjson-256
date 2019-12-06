const fs = require('fs');
const path = require('path');
const colors = require('ansi-256-colors');

const { render, init } = require('../../lib/prettyjson');

const showOutput = true;

// keep own version of defaultOptions so project can be changed without breaking fixtures
// TODO: add options inlineIndent boolean
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
    depth: { fg: 9 },
    empty: { fg: 13 },
    functionHeader: { fg: 13 },
    functionTag: { fg: [4, 4, 5] },
    keys: { fg: [2, 5, 4] },
    number: { fg: [2, 4, 5] },
    string: null
  }
};

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
  for (let i = 0; i < len; i++) {
    chk += s.charCodeAt(i) * (i + 1);
  }
  // returns 32-bit integer checksum encoded as a string containin it's hex value
  return (chk & 0xffffffff).toString(16);
};

const _testOutput = (testObj, expected, customOptions = {}, showOutput = false, saveSnapshot = false) => {
  const snapshot = loadSnapshot(expected);
  const newOptions = { ...options, ...customOptions };
  init(newOptions);
  const ret = render(testObj);
  const failOut = snapshot
    ? `\n${colors.reset}(expected)\n${snapshot}\n(returned)\n${ret}\n`
    : `\n${colors.reset}(returned)\n${ret}\n`;

  if (showOutput) {
    console.log(`\n${ret}\n`);
  }
  // expect(checksum(ret)).to.equal(expected);
  expect(checksum(ret), failOut).to.equal(expected);
  saveSnapshot && writeSnapshot(expected, ret);
};

module.exports = {
  _testOutput
};
