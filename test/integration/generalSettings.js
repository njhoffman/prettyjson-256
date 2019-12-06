const { _testOutput } = require('./utils');
const { testObj1 } = require('../fixtures/fixtures');

module.exports = () => {
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
};
