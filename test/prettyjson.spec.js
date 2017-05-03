// TODO: Get rid of global pColor, restructure

describe('PrettyJSON', () => {
  let sandbox, settingsInitStub, parseStub, prettyJson, renderStub;

  describe('render', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      settingsInitStub = sandbox.stub();
      parseStub = sinon.stub();
      prettyJson = proxyquire('../lib/prettyjson', {
        './settings': { init: settingsInitStub },
        './parser': { default: parseStub }
      });
    });

    afterEach(() => {
      sandbox.restore();
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

      // TODO: test more sorting combinations
    });

    it('Should call recursive render with data and indent arguments', () => {
      const obj1 = { charlie: 'charlie_1', bravo: 'bravo_1', alpha: 'alpha_1' };
      prettyJson.render(obj1, 2);
      expect(parseStub).to.be.called.once;
      expect(parseStub).to.be.calledWith(obj1, 2);
    });
  });

  describe('init', () => {
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      settingsInitStub = sandbox.stub();
      prettyJson = proxyquire('../lib/prettyjson', {
        './settings': { init: settingsInitStub }
      });
    });

    afterEach(() => {
      sandbox.restore();
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
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      settingsInitStub = sandbox.stub();
      parseStub = sinon.stub();
      prettyJson = proxyquire('../lib/prettyjson', {
        './settings': { init: settingsInitStub },
        './parser':  { default:  parseStub }
      });
      renderStub = sinon.stub(prettyJson, 'render');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('Should reinitialize settings if passed customOptions argument', () => {
      prettyJson.renderString(null, { test_key: 'test_val' });
      expect(settingsInitStub).to.be.called.once;
      expect(settingsInitStub).to.be.calledWith({ test_key: 'test_val' });
    });

    it('Should return empty string if input is empty or not a string', () => {
      let ret = prettyJson.renderString(null);
      expect(ret).to.equal('');
      ret = prettyJson.renderString('');
      expect(ret).to.equal('');
    });

    it('Should render data if JSON is parsed correctly', () => {
      prettyJson.renderString('{ "test_key": "test_val" }');
      expect(renderStub).to.be.called.once;
    });

    it('Should remove non-JSON characters from the beginning of input string', () => {
      prettyJson.renderString('JSDFK { "test_key": "test_val" }');
      expect(renderStub).to.be.calledWith({ 'test_key': 'test_val' });
    });

    // it('Should return error message if string does not contain valid JSON', () => {
    //   const ret = prettyJson.renderString('!@#$');
    //   expect(stripAnsi(ret) === 'Error: Not valid JSON!');
    // });
  });
});
