const { _testOutput } = require('./utils');
const { testMultiline1 } = require('../fixtures/fixtures');

module.exports = () => {
  describe('Other', () => {
    const testOutput = _testOutput.bind(this, testMultiline1);
    it('Should render multiline strings correctly', () => {
      const expected = '12cb43be';
      testOutput(expected);
    });
  });
};
