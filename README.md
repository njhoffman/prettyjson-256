# prettyjson-256 [![Build Status](https://secure.travis-ci.org/njhoffman/prettyjson-256.png)](http://travis-ci.org/njhoffman/prettyjson-256) [![NPM version](https://badge.fury.io/js/prettyjson-256.png)](http://badge.fury.io/js/prettyjson-256) [![Coverage Status](https://coveralls.io/repos/njhoffman/prettyjson-256/badge.png?branch=master)](https://coveralls.io/r/njhoffman/prettyjson-256?branch=master)


Inspired by prettyjson, formats JSON data in a colored YAML-style format accomodating 256 colors and extended formatting options.

## Installation

For command line access:

```bash
$ npm install -g prettyjson-256
```

This will install `prettyjson-256` globally, so it will be added automatically
to your `PATH`.

For use in a project:
```bash
$ npm install --save-dev prettyjson-256
```

## Usage

It's pretty easy to use it. You just have to include it in your script and call
the `render()` method:

Optionally intitialize with custom options:

var pjson = require('prettyjson-256').init(customOptions);
pjson.render(myObject, indent);

pjson.render(myObject, indent, customOptions)


```javascript
var pjson = require('prettyjson-256');
pjson.init(customOptions);

console.log(prettyjson.render(data, startIndent));
```

Or pass custom options to render call directly

```javascript
var pjson = require('prettyjson-256');

console.log(prettyjson.render(data, startIndent, customOptions));
```

## Running Tests

To run the test suite first invoke the following command within the repo,
installing the development dependencies:

```bash
$ npm install
```

then run the tests:

```bash
$ npm test
```

