const unitParser = require('./unit/parser.spec');
const unitSettings = require('./unit/settings.spec');
const unitPrettyJson = require('./unit/prettyjson.spec');
const unitUtils = require('./unit/utils.spec');

const integrationGeneralSettings = require('./integration/generalSettings');
const integrationColorSettings = require('./integration/colorSettings');
const integrationOther = require('./integration/other');

console.clear();

describe('Unit Tests', () => {
  unitPrettyJson();
  unitSettings();
  unitParser();
  unitUtils();
});

describe('Integrarion Tests', () => {
  integrationGeneralSettings();
  integrationColorSettings();
  integrationOther();
});
