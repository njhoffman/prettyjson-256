import { testObj1 } from './fixtures';
import { render, init } from '../lib/prettyjson';
// import { outputColorCodes } from '../lib/settings';

const showOutput = false;

// keep own version of defaultOptions so project can be changed without breaking fixtures
// TODO: add options inlineIndent boolean
let options = {
  alphabetizeKeys:    false,
  defaultIndentation: 2,
  depth:              -1,
  emptyArrayMsg:      '(empty array)',
  emptyObjectMsg:     '{}',
  emptyStringMsg:     '(empty string)',
  noColor:            false,
  numberArrays:       false,
  showEmpty:          true,
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
// console.log(settings.outputColorCodes());

const checksum = (s) => {
  var chk = 0x12345678;
  var len = s.length;
  for (var i = 0; i < len; i++) {
    chk += (s.charCodeAt(i) * (i + 1));
  }
  // returns 32-bit integer checksum encoded as a string containin it's hex value
  return (chk & 0xffffffff).toString(16);
};

describe('Integration tests', () => {
  describe('General Settings', () => {
    it('Should render correctly with default options', () => {
      const expected = '1b4ef6e2';
      init(options);
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correctly when setting "alphabetizeKeys" is modified', () => {
      const expected = '1aefaf8d';
      init({ ...options, ...{ alphabetizeKeys: true } });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correctly when setting "defaultIndentation" is modified', () => {
      const expected = '1d458708';
      init({ ...options, ...{ defaultIndentation: 5 } });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correctly when setting "depth" is modified', () => {
      const expected = '16221df3';
      init({ ...options, ...{ depth: 4 } });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correctly when setting "emptyArrayMsg" is modified', () => {
      const expected = '1b59b8ea';
      init({ ...options, ...{ emptyArrayMsg: 'empty array test' } });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correctly when setting "emptyObjectMsg" is modified', () => {
      const expected = '1b79c361';
      init({ ...options, ...{ emptyObjectMsg: 'empty object test' } });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correctly when setting "emptyStringMsg" is modified', () => {
      const expected = '1b5a0322';
      init({ ...options, ...{ emptyStringMsg: 'empty string test' } });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correctly when setting "noColor" is modified', () => {
      const expected = '14813f11';
      init({ ...options, ...{ noColor: true } });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correctly when setting "numberArrays" is modified', () => {
      const expected = '1d2a1b0c';
      init({ ...options, ...{ numberArrays: true } });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correctly when setting "showEmpty" is modified', () => {
      const expected = '193edac1';
      init({ ...options, ...{ showEmpty : false } });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });
  });

  describe('Color Settings', () => {
    it('Should render correct colors when setting "boolFalse" is modified', () => {
      const expected = '1b4b69e3';
      const cOpt = { colors: { boolFalse: { fg: [0, 5, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correct colors when setting "boolTrue" is modified', () => {
      const expected = '1b4eee59';
      const cOpt = { colors: { boolTrue: { fg: [5, 0, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correct colors when setting "dash" is modified', () => {
      const expected = '1b512c26';
      const cOpt = { colors: { dash: { fg: [5, 0, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correct colors when setting "date" is modified', () => {
      const expected = '1b50e4f1';
      const cOpt = { colors: { date: { fg: [5, 0, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correct colors when setting "depth" is modified', () => {
      const expected = '16225fb1';
      const cOpt = { depth: 4, colors: { depth: { fg: [5, 0, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correct colors when setting "empty" is modified', () => {
      const expected = '1b4f4a8a';
      const cOpt = { colors: { empty: { fg: [5, 0, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correct colors when setting "functionHeader" is modified', () => {
      const expected = '1b4f69ea';
      const cOpt = { colors: { functionHeader: { fg: [5, 0, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correct colors when setting "functionTag" is modified', () => {
      const expected = '1b4ec9a6';
      const cOpt = { colors: { functionTag: { fg: [5, 0, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correct colors when setting "keys" is modified', () => {
      const expected = '1b54a25d';
      const cOpt = { colors: { keys: { fg: [5, 0, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correct colors when setting "number" is modified', () => {
      const expected = '1b4f591e';
      const cOpt = { colors: { number: { fg: [5, 0, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });

    it('Should render correct colors when setting "string" is modified', () => {
      const expected = '1d1aa707';
      const cOpt = { colors: { string: { fg: [5, 0, 0] } } };
      init({ ...options, ...cOpt });
      const ret = render(testObj1);
      showOutput && console.log(`\n${ret}\n`);
      expect(checksum(ret)).to.equal(expected);
    });
  });
});
