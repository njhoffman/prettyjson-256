# prettyjson-256 [![Build Status](https://secure.travis-ci.org/njhoffman/prettyjson-256.png)](http://travis-ci.org/njhoffman/prettyjson-256) [![NPM version](https://badge.fury.io/js/prettyjson-256.png)](http://badge.fury.io/js/prettyjson-256) [![Coverage Status](https://coveralls.io/repos/github/njhoffman/prettyjson-256/badge.svg?branch=master)](https://coveralls.io/github/njhoffman/prettyjson-256?branch=master)
[![Dependency Status](https://david-dm.org/njhoffman/prettyjson-256.svg)](https://david-dm.org/njhoffman/prettyjson-256)
[![devDependeny Status](https://david-dm.org/njhoffman/prettyjson-256/dev-status.svg)](https://david-dm.org/njhoffman/prettyjson-256#info=devDependencies)

Formats JSON data in a colored YAML-style format accomodating 256 colors and extended formatting options. This package formats objects similar to util.inspect or prettyjson in a human readable format. It supports a number of formatting options as well as 256 color output.

It's primary purpose is to decorate objects and strings to be used in conjunction with a debug wrapper (it does not output to a stream and just returns a string).  I recommend using my other repo [debugger-256](https://github.com/njhoffman/debugger-256/) for actual logging or as a starting point to build your own.


![Output of object below](https://raw.github.com/njhoffman/prettyjson-256/master/docs/normal.jpg)

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

 You just have to include it in your script and call
the `render()` method, optionally intitializing with custom options:

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
The startIndent parameter specifies the minimum number of spaces to pad each line with.
If no options are passed the default options will be used.

## Formatting Options

The options that can be passed as the customOptions paramter are as follows (including their defaults):

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

The color properties follow the convention (and the functionality) used in the [ansi-256-colors package](https://github.com/jbnicolai/ansi-256-colors). Values can be 'fg' for foreground or 'bg' for background as a key.  The value can be 3 comma separated numbers ranging from 0 to 5 representing red, green and blue values respectively.  If a single number is given it will output grayscale from a range of 0 (black) to 23 (white).

## Using customColors setting to eaisly colorize strings inline
Initializing with or passing a customColors property will let you reserve certain object keys as indicators to colorize the object value.

For example:
```javascript
var pjson = require('prettyjson-256');
var render = pjson.init({
  customColors: {
    red: { fg: [5,0,0] },
    atomicTorquoise: { fg: [5,2,0], bg: [0,2,4] }
  }
});
console.log("Using the customColors " + render({ red: "setting" }) +
  " makes it easy to " + render({  atomicTorquoise: "colors within " }) + " strings easily");
```
Will output:

![Output of object below](https://raw.github.com/njhoffman/prettyjson-256/master/docs/customcolors1.jpg)

## Examples

```javascript
// this will be the object rendered in all the screenshots
var testObj = {
  object1: {
    object1: 'object_value1',
    array1: [
      { object3: 'object_value_3' },
      ['array_1', 'array_2', 'array_3', ['nested_array_1', 'nested_array_2']],
      { function1: function testFunc1 () { } },
      12353252,
      { object1: {
        embedded1: 'embedded1',
        embedded2: false,
        embedded3: [
          'item3',
          'item2',
          'item1'
        ]
      } },
      { object2: 'object_value_2' }
    ],
    object2: 'object_value2'
  },
  array1: [
    'item2',
    'item3',
    'item1'
  ],
  bool1: true,
  number1: 3925.25,
  function2: function testFunc2 () { },
  emptyArray1: [],
  emptyObject1: {}
};

```

```javascript
// set maximum depth of object output to 1
pjson.init({ depth: 1 })
console.log(pjson.render(testObj));
```
![Setting maximum depth to 1](https://raw.github.com/njhoffman/prettyjson-256/master/docs/depth1.jpg)


```javascript
// set maximum depth to 4
pjson.init({ depth: 4 })
console.log(pjson.render(testObj));
```
![Setting maximum object depth to 4](https://raw.github.com/njhoffman/prettyjson-256/master/docs/depth4.jpg)


```javascript
pjson.init({
  colors: {
    keys:        { fg: [3,0,1] },
    functionTag: { fg: [3,5,1] },
    boolFalse:   { bg: [5,0,0] }
  }
});
console.log(pjson.render(testObj));
```
![Setting various color attributes](https://raw.github.com/njhoffman/prettyjson-256/master/docs/colors1.jpg)

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

