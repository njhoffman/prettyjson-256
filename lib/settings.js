"use strict";

var _ = require("lodash");
var colors = require("ansi-256-colors");

exports.defaultOptions = {
	emptyArrayMsg:      "(empty array)",
	defaultIndentation: 2,
	alphabetizeKeys:    false,
	numberArrays:       false,
	noColor:            false,
	showEmpty:			  true,
	depth:              -1,
  indent:            2,
	colors:             {
		keys:            { fg: [2,5,4] },
		dash:            { fg: [2,5,4] },
		number:          { fg: [2,4,5] },
		boolTrue:        { fg: [4,4,5] },
		boolFalse:       { fg: [5,4,4] },
		depth:           { fg: [9] },
		empty:           { fg: [13] },
		date:            { fg: [0,5,2] },
		error:           { fg: [4,0,0] },
		string:          null,
		functionTag:     { fg: [4,4,5] },
		functionHeader:  { fg: [13] }
	}
};

exports.createColorObj = function(colorMap) {
	var printColor = {};
	_.each(colorMap, function(val, key) {
		printColor[key] = function(key, sInput) {
			if (! colorMap[key]) {
				return colors.reset + sInput;
			}
			var cItem = colorMap[key].fg ?
				colorMap[key].fg.length === 1 ? colors.fg.grayscale[colorMap[key].fg[0]] :
				colorMap[key].fg.length === 3 ? colors.fg.getRgb.apply(this, colorMap[key].fg) : ""
					: "" ;
			cItem += (colorMap[key].bg ?
				colorMap[key].bg.length === 1 ? colors.bg.grayscale[colorMap[key].bg[0]] :
				colorMap[key].bg.length === 3 ? colors.bg.getRgb.apply(this, colorMap[key].bg) : ""
					: "") + sInput + colors.reset;
			return cItem;
		}.bind(this, key);
	});
	return printColor;
};

