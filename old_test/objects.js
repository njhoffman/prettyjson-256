var _ = require("lodash");

var maxDepth = 10;
var maxElements = 10;
var objNumber = 5;

var pJson = require("../lib/prettyjson");


for (var i = 0; i < objNumber; i++) {
	var obj = buildObject(0);
	console.log("\n\n----object " + i  + "----\n\n" + pJson.render(obj) + "\n\n----\n");
	// console.log("\n\n\n\n\n", obj, "\n\n\n\n\n\n");
}

// primitive types => Boolean, Null, Undefined, Number, String, Symbol
// + object

function buildType(depth, type) {
	if (maxDepth <= depth) {
		type = 0;
	}
	switch (type) {
		case 0:
			return "This is a string";
			break;
		case 1:
			return Math.random() * (Math.random() * 99999999999);
			break;
		case 2:
			var arElements = Math.random() * (maxElements - 1) + 1;
			var ar = [];
			depth++;
			for (var i = 0; i < arElements; i++) {
				var type = parseInt(Math.random() * 9);
				ar.push(buildType(depth, type));
			}
			return ar;
			break;
		case 3:
			depth++;
			return buildObject(depth);
			break;
		case 4:
			return function testFunc(param1, param2, param3) {};
			break;
		case 5:
			return null;
			break;
		case 6:
			return undefined;
			break;
		case 7:
			var bools = [ true, false ];
			return bools[parseInt(Math.random() * 2)];
			break;
		case 8:
			return new Date();
			break;
	};
}

function buildObject(depth) {
	var obj = {};
	var elements = parseInt(Math.random() * (maxElements - 1) + 1);
	for (var j = 0; j < elements; j++) {
		var type = parseInt(Math.random() * 9);
		var objKey = "key_" + depth + "_" + j;
		var newType = buildType(depth, type);
		obj[objKey] = newType;
	}
	// console.log(obj);
	return obj;
}

// built in objects
//
// value properties => Infinity, NaN, undefined, null
// fundamnetal objects (all other objects based) => Object, Function, Boolean, Symbol
// fundamnetal object (errors) =>  Error, EvalError, InternalError, RangeError, ReferenceError, Syntax Error, TypeError, URIError
// numbers and dates => Number, Math, Date
// text proecessing => String, RegExp
// indexed collection (ordered by index value, typed arrays and array-like constructs) => Array, Int8Array, Float32Array, etc
