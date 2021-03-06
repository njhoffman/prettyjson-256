const { _testOutput } = require('./utils');
const { testObj1, testMultiline1 } = require('../fixtures/fixtures');

module.exports = () => {
  describe('Integration tests', () => {
    describe('General Settings', () => {
      const testOutput = _testOutput.bind(this, testObj1);
      it('Should render correctly with default options', () => {
        const expected = '1aaa86cf';
        testOutput(expected);
      });

      it('Should render correctly when setting "alphabetizeKeys" is modified', () => {
        const expected = '1a8ef307';
        testOutput(expected, { alphabetizeKeys: true });
      });

      it('Should render correctly when setting "defaultIndentation" is modified', () => {
        const expected = '1c8f6e2b';
        testOutput(expected, { defaultIndentation: 5 });
      });

      it('Should render correctly when setting "depth" is 1', () => {
        const expected = '131afee3';
        testOutput(expected, { depth: 1 });
      });

      it('Should render correctly when setting "depth" is 2', () => {
        const expected = '138a0dd8';
        testOutput(expected, { depth: 2 });
      });

      it('Should render correctly when setting "depth" is 3', () => {
        const expected = '13d28ef5';
        testOutput(expected, { depth: 3 });
      });

      it('Should render correctly when setting "depth" is 4', () => {
        const expected = '15b6bd04';
        testOutput(expected, { depth: 4 });
      });

      it('Should render correctly when setting "emptyArrayMsg" is modified', () => {
        const expected = '1ab4c969';
        testOutput(expected, { emptyArrayMsg: 'empty array test' });
      });

      it('Should render correctly when setting "emptyObjectMsg" is modified', () => {
        const expected = '1ad38372';
        testOutput(expected, { emptyObjectMsg: 'empty object test' });
      });

      it('Should render correctly when setting "emptyStringMsg" is modified', () => {
        const expected = '1ab513a1';
        testOutput(expected, { emptyStringMsg: 'empty string test' });
      });

      it('Should render correctly when setting "noColor" is modified', () => {
        const expected = '14a0dc5d';
        testOutput(expected, { noColor: true });
      });

      it('Should render correctly when setting "numberArrays" is modified', () => {
        const expected = '1c74d643';
        testOutput(expected, { numberArrays: true });
      });

      it('Should render correctly when setting "showEmpty" is modified', () => {
        const expected = '1942bb31';
        testOutput(expected, { showEmpty: false });
      });
    });

    describe('Color Settings', () => {
      const testOutput = _testOutput.bind(this, testObj1);
      it('Should render correct colors when setting "boolFalse" is modified', () => {
        const expected = '1c6154de';
        const cOpt = { colors: { boolFalse: { fg: [0, 5, 0] } } };
        testOutput(expected, cOpt);
      });

      it('Should render correct colors when setting "boolTrue" is modified', () => {
        const expected = '1c650835';
        const cOpt = { colors: { boolTrue: { fg: [5, 0, 0] } } };
        testOutput(expected, cOpt);
      });

      it('Should render correct colors when setting "dash" is modified', () => {
        const expected = '1c678e3f';
        const cOpt = { colors: { dash: { fg: [5, 0, 0] } } };
        testOutput(expected, cOpt);
      });

      // it('Should render correct colors when setting "date" is modified', () => {
      // had to remove date object from fixture because can't control output on different systems
      // TODO: figure out a way to test it!
      // const expected = '1b50e4f1';
      // });

      it('Should render correct colors when setting "depth" is modified', () => {
        const expected = '161ee82d';
        const cOpt = { depth: 4, colors: { depth: { fg: [5, 0, 0] } } };
        testOutput(expected, cOpt);
      });

      it('Should render correct colors when setting "empty" is modified', () => {
        const expected = '1c656b4a';
        const cOpt = { colors: { empty: { fg: [5, 0, 0] } } };
        testOutput(expected, cOpt);
      });

      it('Should render correct colors when setting "functionHeader" is modified', () => {
        const expected = '1c658d75';
        const cOpt = { colors: { functionHeader: { fg: [5, 0, 0] } } };
        testOutput(expected, cOpt);
      });

      it('Should render correct colors when setting "functionTag" is modified', () => {
        const expected = '1c64e192';
        const cOpt = { colors: { functionTag: { fg: [5, 0, 0] } } };
        testOutput(expected, cOpt);
      });

      it('Should render correct colors when setting "keys" is modified', () => {
        const expected = '1c6b0144';
        const cOpt = { colors: { keys: { fg: [5, 0, 0] } } };
        testOutput(expected, cOpt);
      });

      it('Should render correct colors when setting "number" is modified', () => {
        const expected = '1c657ece';
        const cOpt = { colors: { number: { fg: [5, 0, 0] } } };
        testOutput(expected, cOpt);
      });

      it('Should render correct colors when setting "string" is modified', () => {
        const expected = '1c66d5ff';
        const cOpt = { colors: { string: { fg: [5, 0, 0] } } };
        testOutput(expected, cOpt);
      });
    });

    describe('Other', () => {
      const testOutput = _testOutput.bind(this, testMultiline1);
      it('Should render multiline strings correctly', () => {
        const expected = '12cb43be';
        testOutput(expected);
      });
    });
  });
};
