const { _testOutput } = require('./utils');
const { testObj1 } = require('../fixtures/fixtures');

module.exports = () => {
  describe('Color Settings', () => {
    const testOutput = _testOutput.bind(this, testObj1);
    it('Should render correct colors when setting "boolFalse" is modified', () => {
      const expected = '1c5c8dc0';
      const cOpt = { colors: { boolFalse: { fg: [0, 5, 0] } } };
      testOutput(expected, cOpt);
    });

    it('Should render correct colors when setting "boolTrue" is modified', () => {
      const expected = '1c60402c';
      const cOpt = { colors: { boolTrue: { fg: [5, 0, 0] } } };
      testOutput(expected, cOpt);
    });

    it('Should render correct colors when setting "dash" is modified', () => {
      const expected = '1c62c5a5';
      const cOpt = { colors: { dash: { fg: [5, 0, 0] } } };
      testOutput(expected, cOpt);
    });

    // it('Should render correct colors when setting "date" is modified', () => {
    // had to remove date object from fixture because can't control output on different systems
    // TODO: figure out a way to test it!
    // const expected = '1b50e4f1';
    // });

    it('Should render correct colors when setting "depth" is modified', () => {
      const expected = '161cad5a';
      const cOpt = { depth: 4, colors: { depth: { fg: [5, 0, 0] } } };
      testOutput(expected, cOpt);
    });

    it('Should render correct colors when setting "empty" is modified', () => {
      const expected = '1c60b4f2';
      const cOpt = { colors: { empty: { fg: [5, 0, 0] } } };
      testOutput(expected, cOpt);
    });

    it('Should render correct colors when setting "functionHeader" is modified', () => {
      const expected = '1c60c54c';
      const cOpt = { colors: { functionHeader: { fg: [5, 0, 0] } } };
      testOutput(expected, cOpt);
    });

    it('Should render correct colors when setting "functionTag" is modified', () => {
      const expected = '1c601993';
      const cOpt = { colors: { functionTag: { fg: [5, 0, 0] } } };
      testOutput(expected, cOpt);
    });

    it('Should render correct colors when setting "keys" is modified', () => {
      const expected = '1c66378c';
      const cOpt = { colors: { keys: { fg: [5, 0, 0] } } };
      testOutput(expected, cOpt);
    });

    it('Should render correct colors when setting "number" is modified', () => {
      const expected = '1c60b6a7';
      const cOpt = { colors: { number: { fg: [5, 0, 0] } } };
      testOutput(expected, cOpt);
    });

    it('Should render correct colors when setting "string" is modified', () => {
      const expected = '1c620d8b';
      const cOpt = { colors: { string: { fg: [5, 0, 0] } } };
      testOutput(expected, cOpt);
    });
  });
};
