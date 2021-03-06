// TODO: Get rid of global pColor, restructure

module.exports = () => {
  describe('PrettyJSON', () => {
    let sandbox;
    let settingsInitStub;
    let parseStub;
    let prettyJson;
    let renderStub;

    describe('render', () => {
      beforeEach(() => {
        sandbox = sinon.createSandbox();
        settingsInitStub = sandbox.stub();
        parseStub = sinon.stub();
        prettyJson = proxyquire('../lib/prettyjson', {
          './settings': { init: settingsInitStub },
          './parser': parseStub
        });
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('Should not reinitialize settings if passed customOptions argument', () => {
        prettyJson.render(null, 0, { test_key: 'test_val' });
        expect(settingsInitStub).to.not.be.called;
      });

      it('Should should sort keys correctly if option is set', () => {
        prettyJson = proxyquire('../lib/prettyjson', {
          './settings': { init: settingsInitStub },
          './parser': parseStub
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
        expect(parseStub).to.be.calledOnce;
        expect(parseStub).to.be.calledWith(obj1, 2);
      });
    });

    describe('init', () => {
      beforeEach(() => {
        sandbox = sinon.createSandbox();
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
        expect(settingsInitStub).to.be.calledOnce;
      });

      it('Should initialize settings with customOptions', () => {
        prettyJson.init({ test_key: 'test_val' });
        expect(settingsInitStub).to.be.calledWith({ test_key: 'test_val' });
      });
    });

    describe('renderString', () => {
      beforeEach(() => {
        sandbox = sinon.createSandbox();
        settingsInitStub = sandbox.stub();
        parseStub = sinon.stub();
        prettyJson = proxyquire('../lib/prettyjson', {
          './settings': { init: settingsInitStub },
          './parser': parseStub
        });
        renderStub = sinon.stub(prettyJson, 'render');
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('Should reinitialize settings if passed customOptions argument', () => {
        prettyJson.renderString(null, { test_key: 'test_val' });
        expect(settingsInitStub).to.be.calledOnce;
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
        expect(renderStub).to.be.calledOnce;
      });

      it('Should remove non-JSON characters from the beginning of input string', () => {
        prettyJson.renderString('JSDFK { "test_key": "test_val" }');
        expect(renderStub).to.be.calledWith({ test_key: 'test_val' });
      });

      // it('Should return error message if string does not contain valid JSON', () => {
      //   const ret = prettyJson.renderString('!@#$');
      //   expect(stripAnsi(ret) === 'Error: Not valid JSON!');
      // });
    });
  });
};
