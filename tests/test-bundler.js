console.log("\n\n\n\nHERE\n\n\n");
// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();

// ---------------------------------------
// Require Tests
// ---------------------------------------

// for use with karma-webpack-with-fast-source-maps
 const __karmaWebpackManifest__ = []; // eslint-disable-line
 const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path);

// require all 'tests/**/*.spec.js'
const testsContext = require.context('./', true, /\.spec\.js$/);
console.log('-- Test Bundler', testsContext.keys());

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest)
;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext);

console.log(testsToRun);

