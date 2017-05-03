describe('Parser', () => {

  let sandbox, parser, pColorStub, keyColorStub;
  describe('customColor indexes', () => {
    let options = { customColors : { testColor: { fg: [1,2,3] } } };
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      pColorStub = sandbox.stub().returns('colorized string');
      parser = proxyquire('../lib/parser', {
        './settings': {
          options,
          pColor: {
            testColor: pColorStub,
            keys: () => 'colorized keys'
          }
        },
      });
    });

    afterEach(() => {
      sandbox.restore();
    });


    it('Should correctly identify object keys that match initialized customColrs', () => {
      const input = { testColor: 'This should be colorized' };
      parser.parse(input);
      expect(pColorStub).to.be.called.once;
      expect(pColorStub).to.be.calledWith('This should be colorized');
    });
    //
    it('Should colorize the value of matched customColor keys of input object', () => {
      const input = { testColor: 'This should be colorized' };
      const output = parser.parse(input);
      expect(output).to.equal('colorized string');
    });


    // if it's an objerct, customColors are assigned, and object has key that matches customColor value
    // parse({ testColor: 'This is a string to parse'
  });

  // describe('object handling', () => {
  // });
  // describe('serializable data handling', () => {
  // });
  // describe('multiline strings', () => {
  // });
});
