const unitParser = require('./unit/parser.spec');
const unitSettings = require('./unit/settings.spec');
const unitPrettyJson = require('./unit/prettyjson.spec');
const unitUtils = require('./unit/utils.spec');

const integrationGeneralSettings = require('./integration/generalSettings');
const integrationColorSettings = require('./integration/colorSettings');
const integrationOther = require('./integration/other');

/* eslint-disable no-console */
console.clear();
/* eslint-enable no-console */

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
