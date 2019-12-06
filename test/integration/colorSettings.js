const { _testOutput } = require('./utils');
const { testObj1 } = require('../fixtures/fixtures');

module.exports = () => {
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
};
