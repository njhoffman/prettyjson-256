describe('Utility methods', () => {
  const utils = require('../lib/utils');
  describe('indent', () => {
    it('Should return a string containing the number of spaces passed', () => {
      expect(utils.indent(0)).to.equal('');
      expect(utils.indent(1)).to.equal(' ');
      expect(utils.indent(3)).to.equal('   ');
    });
  });
  describe('getMaxIndexLength', () => {
    it('Should return the correct length of the longest key', () => {
      const obj1 = { lorem: 'ipsum', foo: 'foo', thisisthelongestkey: 'length 19' };
      const obj2 = { a: 'a', bb: 'bb', longkeybutundefinedvalue: undefined };
      expect(utils.getMaxIndexLength(obj1)).to.equal(19);
      expect(utils.getMaxIndexLength(obj2)).to.equal(2);
    });
  });
  describe('isSerializable', () => {
    it('Should return true if input is a primitive type', () => {
      expect(utils.isSerializable(true)).to.equal(true);
      expect(utils.isSerializable(null)).to.equal(true);
      expect(utils.isSerializable(undefined)).to.equal(true);
      expect(utils.isSerializable(5)).to.equal(true);
      expect(utils.isSerializable('string')).to.equal(true);
      // expect(utils.isSerializable(new Symblol())).to.equal(true);
    });

    it('Should return true if input is an empty object or array', () => {
      expect(utils.isSerializable({})).to.equal(true);
      expect(utils.isSerializable([])).to.equal(true);
    });

    it('Should return true if input is an array and inlineArrays flag is set', () => {
      expect(utils.isSerializable(['arr_1', 'arr_2'], true)).to.equal(true);
      expect(utils.isSerializable(['arr_1', 'arr_2'], false)).to.equal(false);
    });
  });
});
