"use strict";

var prettyjson = process.env.EXPRESS_COV ? require('../lib-cov/prettyjson') : require('../lib/prettyjson');
var chai = require("chai");
var should = chai.should();
var colors = require("ansi-256-colors");

var settings = require("../lib/settings");
var defaultOptions = settings.defaultOptions;
var pColor = settings.createColorObj(defaultOptions.colors);

describe('prettyjson general tests', function() {

	it("should output a string exactly equal as the input", function() {

		var input = 'This is a string';
		var output = prettyjson.render(input);

		output.should.equal(pColor.string(input));
	});

	it("should output a string with indentation", function() {

		var input = 'This is a string';
		var output = prettyjson.render(input, {}, 4);

		output.should.equal('    ' + pColor.string(input));
	});

	it("should output a multiline string with indentation", function() {

		var input = 'multiple\nlines'
		var output = prettyjson.render(input, {}, 4);

		output.should.equal('    """\n      multiple\n      lines\n    """');
	});

	it("should output an array of strings", function() {

		var input = ['first string', 'second string'];
		var output = prettyjson.render(input);

		output.should.equal([
			pColor.dash('- ') + pColor.string(input[0]),
			pColor.dash('- ') + pColor.string(input[1])
		].join('\n'));
	});

	it("should output an array of arrays", function() {

		var input = [ 'first string', ['nested 1', 'nested 2'], 'second string' ];
		var output = prettyjson.render(input);

		output.should.equal([
			pColor.dash('- ') + pColor.string(input[0]),
			pColor.dash('- '),
			'  ' + pColor.dash('- ') + pColor.string(input[1][0]),
			'  ' + pColor.dash('- ') + pColor.string(input[1][1]),
			pColor.dash('- ') + pColor.string(input[2])
		].join('\n'));
	});

	it("should output a hash of strings", function() {

		var input = { param1: 'first string', param2: 'second string' };
		var output = prettyjson.render(input);

		output.should.equal([
			pColor.keys('param1: ') + pColor.string('first string'),
			pColor.keys('param2: ') + pColor.string('second string')
		].join('\n'));
	});

	it("should output a hash of hashes", function() {

		var input = {first_param: {subparam: 'first string', subparam2: 'another string'}, second_param: 'second string'};
		var output = prettyjson.render(input);

		output.should.equal([
			pColor.keys('first_param: '),
			'  ' + pColor.keys('subparam: ') + " " + pColor.string('first string'),
			'  ' + pColor.keys('subparam2: ') + pColor.string('another string'),
			pColor.keys('second_param: ')  + pColor.string('second string')
		].join('\n'));
	});

	it("should indent correctly the hashes keys", function() {

		var input = {very_large_param: 'first string', param: 'second string'};
		var output = prettyjson.render(input);

		output.should.equal([
			pColor.keys('very_large_param: ') + pColor.string('first string'),
			pColor.keys('param: ')  + "           " + pColor.string('second string')
		].join('\n'));
	});

	it("should output a really nested object", function() {

		var input = {
			first_param: {
				subparam: 'first string',
				subparam2: 'another string',
				subparam3: ["different", "values", "in an array"]
			},
			second_param: 'second string',
			an_array: [{
				param3: 'value',
				param10: 'other value'
			}],
			empty_array: []
		};

		var output = prettyjson.render(input);

		output.should.equal([
			pColor.keys('first_param: '),
			'  ' + pColor.keys('subparam: ') + " " +  pColor.string('first string'),
			'  ' + pColor.keys('subparam2: ') + pColor.string('another string'),
			'  ' + pColor.keys('subparam3: '),
			'    ' + pColor.dash('- ') + pColor.string('different'),
			'    ' + pColor.dash('- ') + pColor.string('values'),
			'    ' + pColor.dash('- ') + pColor.string('in an array'),
			pColor.keys('second_param: ') + pColor.string('second string'),
			pColor.keys('an_array: '),
			'  ' + pColor.dash('- '),
			'    ' + pColor.keys('param3: ') + " " + pColor.string('value'),
			'    ' + pColor.keys('param10: ') + pColor.string('other value'),
			pColor.keys('empty_array: '),
			"  " + pColor.empty('(empty array)')
		].join('\n'));
	});

	it("should allow to configure colors for hash keys", function() {
		var input = {param1: 'first string', param2: 'second string'};
		var pjsonOptions = { colors: { keys: { fg: [0,0,4] } } };
		var output = prettyjson.render(input, pjsonOptions);

		output.should.equal([
			colors.fg.getRgb(0,0,4) + 'param1: ' + colors.reset + pColor.string('first string'),
			colors.fg.getRgb(0,0,4) + 'param2: ' + colors.reset + pColor.string('second string')
		].join('\n'));

		// TODO: restore options better
		prettyjson.render("", defaultOptions);
	});

	it("should allow to configure colors for numbers", function() {
		var input = {param1: 17, param2: 22.3};
		var output = prettyjson.render(input, {numberColor: 'red'});

		output.should.equal([
			pColor.keys('param1: ') + pColor.number('17'),
			pColor.keys('param2: ') + pColor.number('22.3')
		].join('\n'));

		prettyjson.render("", defaultOptions);
	});

	it("should allow to configure the default indentation", function() {
		var input = {param: ['first string', "second string"]};
		var output = prettyjson.render(input, {defaultIndentation: 4});

		output.should.equal([
			pColor.keys('param: '),
			'    ' + pColor.dash('- ') + pColor.string('first string') ,
			'    ' + pColor.dash('- ') + pColor.string('second string')
		].join('\n'));

		prettyjson.render("", defaultOptions);
	});

	it("should allow to configure the empty message for arrays", function() {
		var input = [];
		var output = prettyjson.render(input, {emptyArrayMsg: '(empty)'});

		output.should.equal([
			pColor.empty('(empty)')
		].join('\n'));
	});

	it("should allow to configure colors for strings", function() {
		var input = {param1: 'first string', param2: 'second string'};
		var output = prettyjson.render(input, { colors: { keys: { fg : [2,2,2] }, string : { fg: [3,3,3] } } });

		output.should.equal([
			colors.fg.getRgb(2,2,2) + 'param1: ' + colors.reset + colors.fg.getRgb(3,3,3) + 'first string' + colors.reset,
			colors.fg.getRgb(2,2,2) + 'param2: ' + colors.reset + colors.fg.getRgb(3,3,3) + 'second string' + colors.reset
		].join('\n'));
		prettyjson.render("", defaultOptions);
	});

	it("should allow to not use colors", function() {
		var input = {param1: 'first string', param2: ['second string']};
		var output = prettyjson.render(input, {noColor: true});

		output.should.equal([
			'param1: first string',
			'param2: ',
			'  - second string'
		].join('\n'));
		 prettyjson.render("", defaultOptions);
	});
   //
	// it("should allow to print simple arrays inline", function() {
	// 	var input = {installs: ['first string', 'second string', false, 13]};
	// 	var output = prettyjson.render(input, {inlineArrays: true});
   //
	// 	output.should.equal(
	// 		'installs: '.green + 'first string, second string, false, 13');
   //
	// 		input = {installs: [ ['first string', 'second string'], 'third string']};
	// 		output = prettyjson.render(input, {inlineArrays: true});
   //
	// 		output.should.equal([
	// 			'installs: '.green,
	// 			'  ' + '- '.green + 'first string, second string',
	// 			'  ' + '- '.green + 'third string'
	// 		].join('\n'));
	// });

	// it("should not print an object prototype", function() {
	// 	var Input = function() {
	// 		this.param1 = 'first string';
	// 		this.param2 = 'second string';
	// 	};
	// 	Input.prototype = {randomProperty: 'idontcare'};
   //
	// 	var output = prettyjson.render(new Input);
   //
	// 	output.should.equal([
	// 		'param1: '.green + 'first string',
	// 		'param2: '.green + 'second string'
	// 	].join('\n'));
	// });
});

describe('Printing numbers, booleans and other objects', function() {
	it("should print numbers correctly ", function() {
		var input = 12345;
		var output = prettyjson.render(input, {}, 4);

		output.should.equal('    ' + pColor.number('12345'));
	});

	it("should print booleans correctly ", function() {
		var input = true;
		var output = prettyjson.render(input, {}, 4);

		output.should.equal('    ' + pColor.boolTrue('true'));

		input = false;
		output = prettyjson.render(input, {}, 4);

		output.should.equal('    ' + pColor.boolFalse('false'));
	});

	it("should print a null object correctly ", function() {
		var input = null;
		var output = prettyjson.render(input, {}, 4);

		output.should.equal('    ' + pColor.empty('null'));
	});

	it("should print an Error correctly ", function() {
		Error.stackTraceLimit = 1;
		var input = new Error('foo');
		var stack = input.stack.split('\n');
		var output = prettyjson.render(input, {}, 4);

		output.should.equal([
			'    ' + pColor.keys('stack: '),
			'      ' + pColor.dash('- ') + pColor.string(stack[0]),
			'      ' + pColor.dash('- ') + pColor.string(stack[1]),
			'    ' + pColor.keys('message: ') + pColor.string('foo')
		].join('\n'));
	});

	it('should print serializable items in an array inline', function() {
		var dt = new Date();
		var output = prettyjson.render([ 'a', 3, null, true, false, dt]);

		output.should.equal([
			pColor.dash('- ') + pColor.string('a'),
			pColor.dash('- ') + pColor.number('3'),
			pColor.dash('- ') + pColor.empty('null'),
			pColor.dash('- ') + pColor.boolTrue('true'),
			pColor.dash('- ') + pColor.boolFalse('false'),
			pColor.dash('- ') + pColor.date(dt)
		].join('\n'));
	});

	it('should print dates correctly', function() {
		var input = new Date();
		var expected = input.toString();
		var output = prettyjson.render(input, {}, 4);

		output.should.equal('    ' + pColor.date(expected));
	});

	it('should print dates in objects correctly', function() {
		var dt1 = new Date();
		var dt2 = new Date();

		var input = {
			dt1: dt2,
			dt2: dt2
		};

		var output = prettyjson.render(input, {}, 4);

		output.should.equal([
			'    ' + pColor.keys('dt1: ') + pColor.date(dt1.toString()),
			'    ' + pColor.keys('dt2: ') + pColor.date(dt2.toString())].join('\n') );
	});
});

describe('prettyjson.renderString() method', function(){
  it('should return an empty string if input is empty', function(){
    var input = '';

    var output = prettyjson.renderString(input);

    output.should.equal('');
  });

  it('should return an empty string if input is not a string', function(){
    var output = prettyjson.renderString({});
    output.should.equal('');
  });

  it('should return an error message if the input is an invalid JSON string', function(){
    var output = prettyjson.renderString('not valid!!');
    output.should.equal(pColor.error('Error:') + ' Not valid JSON!');
  });

  it('should return the prettyfied string if it is a valid JSON string', function(){
	  var output = prettyjson.renderString('{"test": "OK"}');
	  output.should.equal(pColor.keys('test: ') + pColor.string('OK'));
  });

  it('should dismiss trailing characters which are not JSON', function(){
	  var output = prettyjson.renderString('characters that are not JSON at all... {"test": "OK"}');
	  output.should.equal(pColor.string("characters that are not JSON at all... ") + "\n" + pColor.keys('test: ') + pColor.string('OK'));
  });

  it('should dismiss trailing characters which are not JSON with an array', function(){
	  var output = prettyjson.renderString('characters that are not JSON at all... ["test"]');
	  output.should.equal(pColor.string("characters that are not JSON at all... ") + "\n" + pColor.dash('- ') + pColor.string('test'));
  });

  it('should be able to accept the options parameter', function(){
	  var output = prettyjson.renderString('{"test": "OK"}', { colors: { string: { fg: [3,3,3] } } });
	  output.should.equal(pColor.keys('test: ') + colors.fg.getRgb(3,3,3) + 'OK' + colors.reset);
	  prettyjson.render("", defaultOptions);
  });
});
