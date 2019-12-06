const { _testOutput } = require('./utils');
const { testObj1 } = require('../fixtures/fixtures');

module.exports = () => {
  describe('General Settings', () => {
    const testOutput = _testOutput.bind(this, testObj1);
    it('Should render correctly with default options', () => {
      const expected = '1c604a15';
      testOutput(expected);
    });

    it('Should render correctly when setting "alphabetizeKeys" is modified', () => {
      const expected = '1c377d82';
      testOutput(expected, { alphabetizeKeys: true });
    });

    it('Should render correctly when setting "defaultIndentation" is modified', () => {
      const expected = '1e6dad4b';
      testOutput(expected, { defaultIndentation: 5 });
    });

    it('Should render correctly when setting "depth" is 1', () => {
      const expected = '131a744f';
      testOutput(expected, { depth: 1 });
    });

    it('Should render correctly when setting "depth" is 2', () => {
      const expected = '139c1a74';
      testOutput(expected, { depth: 2 });
    });

    it('Should render correctly when setting "depth" is 3', () => {
      const expected = '140535e3';
      testOutput(expected, { depth: 3 });
    });

    it('Should render correctly when setting "depth" is 4', () => {
      const expected = '161c6a4f';
      testOutput(expected, { depth: 4 });
    });

    it('Should render correctly when setting "emptyArrayMsg" is modified', () => {
      const expected = '1c6bb29d';
      testOutput(expected, { emptyArrayMsg: 'empty array test' });
    });

    it('Should render correctly when setting "emptyObjectMsg" is modified', () => {
      const expected = '1c8d94b7';
      testOutput(expected, { emptyObjectMsg: 'empty object test' });
    });

    it('Should render correctly when setting "emptyStringMsg" is modified', () => {
      const expected = '1c6bfcdb';
      testOutput(expected, { emptyStringMsg: 'empty string test' });
    });

    it('Should render correctly when setting "noColor" is modified', () => {
      const expected = '144a32b1';
      testOutput(expected, { noColor: true });
    });

    it('Should render correctly when setting "numberArrays" is modified', () => {
      const expected = '1e51d704';
      testOutput(expected, { numberArrays: true });
    });

    it('Should render correctly when setting "showEmpty" is modified', () => {
      const expected = '1ad2c86a';
      testOutput(expected, { showEmpty: false });
    });
  });
};
