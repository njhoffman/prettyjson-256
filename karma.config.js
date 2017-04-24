const path = require('path');
const argv = require('yargs').argv;
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';
const envCoverage = !argv.watch && env === 'test';

const projectGlobals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(env)
  },
  'NODE_ENV'     : env,
  '__DEV__'      : env === 'development',
  '__PROD__'     : env === 'production',
  '__TEST__'     : env === 'test',
  '__COVERAGE__' : !argv.watch && env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
};

function getPath() {
  const basePath = path.resolve(__dirname);
  const args = [basePath].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}


const resolvePaths = {
  root: getPath('lib'),
  extensions: ['', '.js', '.json']
};

const babelCompiler = {
  cacheDirectory : true,
  plugins        : ['transform-runtime'],
  presets        : ['es2015', 'stage-0']
};

const coverageReporters = [
  { type: 'text-summary' },
  { type: 'lcov', dir: 'coverage' }
];

const webpackModuleLoaders = [
  {  test    : /\.(js|jsx)$/,
      exclude : /node_modules/,
      loader  : 'babel',
      query   : babelCompiler
  }, {
      test   : /\.json$/,
      loader : 'json'
  }
];

const karmaConfig = {
  basePath: './',
  files    : [
    {
      pattern  : 'tests/test-bundler.js',
      watched  : false,
      served   : true,
      included : true
    }
  ],
  singleRun     : !argv.watch,
  frameworks    : ['mocha'],
  reporters     : ['mocha'], // 'mocha', 'spec', 'json', 'progress', 'dots'
  specReporter: {
    maxLogLines:          5,         // limit number of lines logged per test
    suppressErrorSummary: true,  // do not print error summary
    suppressFailed:       false,  // do not print information about failed tests
    suppressPassed:       false,  // do not print information about passed tests
    suppressSkipped:      true,  // do not print information about skipped tests
    showSpecTiming:       false // print the time elapsed for each spec
  },
  browsers: ['PhantomJS'],
  webpack  : {
    devtool : 'cheap-module-source-map',
    resolve: resolvePaths,
    plugins : [ new webpack.DefinePlugin(projectGlobals) ],
    module: {
      loaders: webpackModuleLoaders
    }
  },
  jsonReporter: {
    stdout: true
  },
  preprocessors: {
    'tests/test-bundler.js' : ['webpack'],
  },
  webpackMiddleware : {
    noInfo : true
  },
  // plugins: ['karma-spec-reporter'],
  coverageReporter : {
    reporters : coverageReporters
  }
};

if (envCoverage) {
  karmaConfig.reporters.push('coverage');
  karmaConfig.webpack.module.preLoaders = [{
    test    : /\.(js|jsx)$/,
    include : new RegExp('lib'),
    exclude : [/node_modules/],
    loader  : 'babel',
    query   : Object.assign({}, babelCompiler, {
      plugins : (babelCompiler.plugins || []).concat('istanbul')
    })
  }];
}

console.log(`Creating karma configuration. Reporter: ${karmaConfig.reporters}`);
console.log(`Test Framework: ${karmaConfig.frameworks}`);

module.exports = (cfg) => cfg.set(karmaConfig);
