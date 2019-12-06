module.exports = () => {
  describe('Parser', () => {
    let sandbox;
    let parser;
    describe('CustomColor Indexes', () => {
      const options = { customColors: { testColor: { fg: [1, 2, 3] } } };
      let pColorStub;
      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        pColorStub = sandbox.stub().returns('special colorized string');
        parser = proxyquire('../lib/parser', {
          './settings': {
            getOptions: () => options,
            getPrintColor: () => ({
              testColor: pColorStub
            })
          }
        });
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('Should correctly identify object keys that match initialized customColors', () => {
        const input = { testColor: 'This should be colorized' };
        parser(input);
        expect(pColorStub).to.be.called.once;
        expect(pColorStub).to.be.calledWith('This should be colorized');
      });

      it('Should colorize the value of matched customColor keys of input object', () => {
        const input = { testColor: 'This should be colorized' };
        const output = parser(input);
        expect(output).to.equal('special colorized string');
      });

      // if it's an objerct, customColors are assigned, and object has key that matches customColor value
      // parse({ testColor: 'This is a string to parse'
    });

    // describe('object handling', () => {
    // });
    describe('Serializable Data', () => {
      const options = { inlineArrays: true };
      let stringColorStub;
      let falseColorStub;
      let trueColorStub;
      let numberColorStub;
      let emptyColorStub;
      let dateColorStub;

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        stringColorStub = sandbox.stub().returns('string color');
        falseColorStub = sandbox.stub().returns('false color');
        trueColorStub = sandbox.stub().returns('true color');
        numberColorStub = sandbox.stub().returns('number color');
        emptyColorStub = sandbox.stub().returns('empty color');
        dateColorStub = sandbox.stub().returns('date color');
        parser = proxyquire('../lib/parser', {
          './settings': {
            getOptions: () => options,
            getPrintColor: () => ({
              string: stringColorStub,
              boolTrue: trueColorStub,
              boolFalse: falseColorStub,
              number: numberColorStub,
              empty: emptyColorStub,
              date: dateColorStub
            })
          }
        });
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('Should format string correctly', () => {
        const output = parser('testing string');
        expect(output).to.equal('string color');
        expect(stringColorStub).to.be.called.once;
      });

      it('Should format number correctly', () => {
        const output = parser(5);
        expect(output).to.equal('number color');
        expect(numberColorStub).to.be.called.once;
      });

      it('Should format true correctly', () => {
        const output = parser(true);
        expect(output).to.equal('true color');
        expect(trueColorStub).to.be.called.once;
      });

      it('Should format false correctly', () => {
        const output = parser(false);
        expect(output).to.equal('false color');
        expect(falseColorStub).to.be.called.once;
      });

      it('Should format null correctly', () => {
        const output = parser(null);
        expect(output).to.equal('empty color');
        expect(emptyColorStub).to.be.called.once;
      });

      it('Should format a date correctly', () => {
        const output = parser(new Date());
        expect(output).to.equal('date color');
        expect(dateColorStub).to.be.called.once;
      });

      it('Should format an inline array correctly', () => {
        const output = parser(['arr1', 'arr2', 'arr3']);
        expect(output).to.equal('arr1, arr2, arr3');
      });

      it('Should format other unknown types correctly', () => {
        const output = parser(undefined);
        expect(output).to.equal('undefined');
      });
    });
    describe('Error Objects', () => {
      const options = { errorDivider: '--error--' };
      let errorMessageStub;
      let errorDividerStub;
      let errorNameStub;
      let errorStackStub;
      let errorObj;

      beforeEach(() => {
        sandbox = sinon.sandbox.create();
        errorMessageStub = sandbox.stub().returns('error message color');
        errorDividerStub = sandbox.stub().returns('error divider color');
        errorNameStub = sandbox.stub().returns('error name color');
        errorStackStub = sandbox.stub().returns('error stack color');
        try {
          throw new Error('test error message');
        } catch (err) {
          errorObj = err;
        }
        parser = proxyquire('../lib/parser', {
          './settings': {
            getOptions: () => options,
            getPrintColor: () => ({
              errorDivider: errorDividerStub,
              errorName: errorNameStub,
              errorMessage: errorMessageStub,
              errorStack: errorStackStub
            })
          }
        });
      });

      afterEach(() => {
        sandbox.restore();
      });

      it('Should format error name correctly', () => {
        parser(errorObj);
        expect(errorNameStub).to.be.called.once;
        expect(errorNameStub).to.be.calledWith('Error');
      });

      it('Should format error message correctly', () => {
        parser(errorObj);
        expect(errorMessageStub).to.be.called.once;
        expect(errorMessageStub).to.be.calledWith('test error message');
      });

      it('Should format error divider correctly', () => {
        parser(errorObj);
        expect(errorDividerStub).to.be.called.twice;
        expect(errorDividerStub).to.be.calledWith('--error--');
      });

      it('Should format error stack correctly', () => {
        parser(errorObj);
        expect(errorStackStub).to.be.called.once;
      });
    });
    // describe('multiline strings', () => {
    // });
  });
};
