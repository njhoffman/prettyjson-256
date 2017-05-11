describe('Settings', () => {
  let sandbox, settings, getRgbStub;
  describe('outputColorCodes', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      getRgbStub = sandbox.stub();
      settings = proxyquire('../lib/settings', {
        'ansi-256-colors' : {
          fg: {
            getRgb: getRgbStub
          },
          reset: ''
        }
      });
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should generate each possible foreground color combination', () => {
      settings.outputColorCodes();
      expect(getRgbStub.callCount).to.equal(216);
    });

    it('Should return color palette samples in 6 groups of 6 rows containing 6 samples ', () => {
      const ret = settings.outputColorCodes();
      const rows = ret.trim().split('\n');
      expect(rows.length).to.equal(41); // 6 * 6 + 5 spaces
      expect(rows[0].trim().split('  ').length).to.equal(6);
    });
  });

  describe('Initialization', () => {
    settings = require('../../lib/settings');
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should override defaultOptions with customOptions', () => {
      const customOptions = { depth: 2, new2: 'new_2' };
      settings.init(customOptions);
      expect(settings.getOptions()).to.contain({ depth: 2, new2: 'new_2' });
    });

    it('Should recreate printColor function with new customColors', () => {
      const customOptions = {
        customColors: {
          testColor1: { fg: [1, 2, 3] },
          testColor2: { fg: [5, 4, 3] }
        }
      };
      const printColor = settings.init(customOptions);
      expect(printColor).to.have.property('testColor1');
      expect(printColor).to.have.property('testColor2');
      expect(printColor.testColor1).to.be.a.function;
      expect(printColor.testColor2).to.be.a.function;
    });

    // TODO: implement error handling if customColors configured wrong
  });
});
