// TODO: Get rid of global pColor, restructure


describe('PrettyJSON', () =>  {
  describe('render', () => {
  });
  describe('init', () => {
    const settingsInitStub = sinon.stub();
    const prettyjson = require('../lib/prettyjson');
    beforeEach(() => {
      settingsInitStub.reset();
    });
    it('should call init from settings module with customOptions', () => {
      prettyjson.render(null);
      expect(settingsInitStub).to.be.called.once;
    });
    it('should assign result to global pColor object', () => {
    });
  });
  describe('renderString', () => {
  });
});
