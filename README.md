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

Or pass custom options to the render call directly:

```javascript
var pjson = require('prettyjson-256');

console.log(prettyjson.render(data, startIndent, customOptions));
```
If no options are passed the default options will be used.

## Formatting Options

The options that can be passed as customOptions labeled above are as follows (including their defaults):

```javascript
var options =  {
  // sort object keys or array values alphabetically
  alphabetizeKeys:    false,
  // how many spaces to indent nested objects
  defaultIndentation: 2,
  // maximum depth of nested levels to display for an object
  depth:              -1,
  // what to display if value is an empty array, object, or string (-1 is finite)
  emptyArrayMsg:      '(empty array)',
  emptyObjectMsg:     '{}',
  emptyStringMsg:     '(empty string)',
  // don't output any color
  noColor:            false,
  // show array indexes, this will prevent array from sorting if alphabetizeKeys is on
  numberArrays:       false,
  // show if contained in an object an array, string, or another object is empty
  showEmpty:          true,
  // color codes for different output elements
  colors:             {
    boolFalse:        { fg: [5, 4, 4] },
    boolTrue:         { fg: [4, 4, 5] },
    dash:             { fg: [2, 5, 4] },
    date:             { fg: [0, 5, 2] },
    depth:            { fg: [9] },
    empty:            { fg: [13] },
    functionHeader:   { fg: [13] },
    functionTag:      { fg: [4, 4, 5] },
    keys:             { fg: [2, 5, 4] },
    number:           { fg: [2, 4, 5] },
    string:           null
  }
};
```

The color properties follow the convention (and the functionality) used here: https://github.com/jbnicolai/ansi-256-colors. Values can be 'fg' for foreground or 'bg' for background as a key.  The value can 3 comma separated numbers ranging from 0-5 representing red, green and blue values respectively.  If a single number is given it will output grayscale  from range 0 (black) to 23 (white).


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

