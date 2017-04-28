# prettyjson-256 [![Build Status](https://secure.travis-ci.org/rafeca/prettyjson.png)](http://travis-ci.org/rafeca/prettyjson) [![NPM version](https://badge.fury.io/js/prettyjson.png)](http://badge.fury.io/js/prettyjson) [![Coverage Status](https://coveralls.io/repos/rafeca/prettyjson/badge.png?branch=master)](https://coveralls.io/r/rafeca/prettyjson?branch=master)
prettyjson-256

Based on prettyjson, formats JSON data in a colored format accomodating 256 colors and extended formatting options.

Usage

Optionally intitialize with custom options:

var pjson = require('prettyjson-256').init(customOptions);
pjson.render(myObject, indent);

Or pass custom options to render call directly
pjson.render(myObject, indent, customOptions)





