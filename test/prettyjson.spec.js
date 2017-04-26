// TODO: Get rid of global pColor, restructure

describe('PrettyJSON', () => {
  const settingsInitStub = sinon.stub();
  const parseStub = sinon.stub();

  let prettyJson = proxyquire('../lib/prettyjson', {
    './settings': { init: settingsInitStub },
    './parser': { default: parseStub }
  });

  describe('render', () => {
    beforeEach(() => {
      settingsInitStub.reset();
      parseStub.reset();
    });
    it('Should reinitialize settings if passed customOptions argument', () => {
      prettyJson.render(null, 0, { test_key: 'test_val' });
      expect(settingsInitStub).to.be.called.once;
      expect(settingsInitStub).to.be.calledWith({ test_key: 'test_val' });
    });
    it('Should should sort keys correctly if option is set', () => {
      prettyJson = proxyquire('../lib/prettyjson', {
        './settings': { init: settingsInitStub, options: { alphabetizeKeys: true } },
        './parser':  { default:  parseStub }
      });
      const obj1 = { charlie: 'charlie_1', bravo: 'bravo_1', alpha: 'alpha_1' };
      const obj2 = { charlie: 'charlie_2', bravo: 'bravo_2', alpha: 'alpha_2' };

      prettyJson.render(obj1, 0, { alphabetizeKeys: true });
      expect(parseStub).to.be.calledWith({ alpha: 'alpha_1', bravo: 'bravo_1', charlie: 'charlie_1' });

      prettyJson.render(obj2, 0, { alphabetizeKeys: true });
      expect(parseStub).to.be.calledWith({ alpha: 'alpha_1', bravo: 'bravo_1', charlie: 'charlie_1' });
    });

    it('Should call recursive render with data and indent arguments', () => {
      const obj1 = { charlie: "charlie_1", bravo: "bravo_1", alpha: "alpha_1" };
      prettyJson.render(obj1, 2);
      expect(parseStub).to.be.called.once;
      expect(parseStub).to.be.calledWith(obj1, 2);
    });
  });

  describe('init', () => {
    beforeEach(() => {
      settingsInitStub.reset();
      parseStub.reset();
    });
    it('Should initialize settings module', () => {
      prettyJson.init(null);
      expect(settingsInitStub).to.be.called.once;
    });
    it('Should initialize settings with customOptions', () => {
      prettyJson.init({ test_key: 'test_val' });
      expect(settingsInitStub).to.be.calledWith({ test_key: 'test_val' });
    });
  });

  describe('renderString', () => {
  });

});
