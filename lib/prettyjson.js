var Utils = require('./utils');
var _ = require("lodash");

var settings = require("./settings");
var options = settings.defaultOptions;
var pColor;

exports.version = require('../package.json').version;


exports._addColorToData = (input) => {
  if (options.noColor) {
    return input;
  }

  if (typeof input === 'string') {
    return pColor.string(input);
  }

  var sInput = input + '';

  if (input === true) { return pColor.boolTrue(sInput); }
  if (input === false) { return pColor.boolFalse(sInput); }
  if (input === null) { return pColor.empty(sInput); }
  if (input === "") { return pColor.empty("(empty)"); }
  if (input instanceof Date) { return pColor.date(sInput); }
  if (_.isArray(input)) { return input.join(', '); }

  return sInput;
};

exports._indentMultiLine = (string, spaces) => {
  return string
    .split('\n')
    .map(line => (Utils.indent(spaces) + line))
    .join('\n');
};

exports._handleMultiLine = (data, indentation) => {
  return [
    Utils.indent(indentation) + '"""',
    exports._indentMultiLine(data, indentation + options.defaultIndentation),
    Utils.indent(indentation) + '"""'
  ];
};

exports._handleFunction = (data, indentation) => {
  var funcHeader = data.toString().split("\n")[0].replace("{", "");
  return [
    Utils.indent(indentation) + pColor.functionTag("[Function] ") +
    pColor.functionHeader(funcHeader)
  ];
};

exports._handleArray = (data, indentation, level) => {
  // If the array is empty, render the `emptyArrayMsg`
  var arrayOut = [];
  if (data.length === 0) {
    arrayOut.push(Utils.indent(indentation) + pColor.empty(options.emptyArrayMsg));
  } else if (level + 1 === options.depth) {
    var line = Utils.indent(indentation) + "[Array length " + data.length + "]";
    arrayOut.push(line);
  } else {
    level++;
    _.each(data, function(element) {
      // Prepend the dash at the begining of each array's element line
      var line = ('- ');
      if (!options.noColor) {
        line = pColor.dash(line);
      }
      line = Utils.indent(indentation) + line;

      if (Utils.isSerializable(element, false, options.inlineArrays)) {
        // If the element of the array is a string, bool, number, or null
        // render it in the same line
        line += exports._render(element, options, false);
        arrayOut.push(line);
      } else {
        // If the element is an array or object, render it in next line
        arrayOut.push(line);
        arrayOut.push(
          exports._render(
            element,
            options,
            indentation + options.defaultIndentation,
            level
          )
        );
      }
    });
  }
  return arrayOut;
};

exports._handleObject = (data, indentation, level) => {
  // if (options.depth !== -1) { output.push("{ level: " + level + " " + options.depth + " " + (options.depth === level) + "}"); }
  // Get the size of the longest index to align all the values
  var maxIndexLength = Utils.getMaxIndexLength(data);
  var key;
  var isError = data instanceof Error;


  var objOut = [];
  level++;
  _.each(Object.getOwnPropertyNames(data), function(i) {
    // Prepend the index at the beginning of the line
    key = (i + ': ');
    if (!options.noColor) {
      key = pColor.keys(key);
    }
    key = Utils.indent(indentation) + key;

    // Skip `undefined`, it's not a valid JSON value.
    if (data[i] === undefined) {
      return;
    }

    // If the value is serializable, render it in the same line
    if (Utils.isSerializable(data[i], false, options.inlineArrays) && (!isError || i !== 'stack')) {
      if (_.isFunction(data)) {
        key += exports._handleFunction(data[i], options, maxIndexLength - i.length);
        objOut.push(key);
      } else {
        key += exports._render(data[i], options, maxIndexLength - i.length);
        objOut.push(key);
      }
    } else if (_.isFunction(data[i])) {
      key += exports._render(data[i], options, maxIndexLength - i.length);
      objOut.push(key);
    } else if (level === options.depth) {
      // dont nest any more for object if depth level reached
      key += Utils.indent(maxIndexLength - i.length) + pColor.depth("[Object] (" + _.keys(data[i]).length + " keys)");
      objOut.push(key);
    } else if (level + 1 === options.depth && _.isArray(data[i])) {
      objOut.push(key);
    } else {
      // If the index is an array or object, render it in next line
      objOut.push(key);
      objOut.push(
        exports._render(
          isError && i === 'stack' ? data[i].split('\n') : data[i],
          options,
          indentation + options.defaultIndentation,
          level
        )
      );
    }
  });
  return objOut;
};

exports._render = (data, customOptions, indentation, level) => {

  // Default values
  level = level || 0;
  indentation = indentation || 0;

  var output = [];

  if (Utils.isSerializable(data, false, options.inlineArrays)) {
    if (_.isFunction(data)) {
      output.push(exports._handleFunction(data, indentation, level));
    } else {
      // Render a string exactly equal
      output.push(Utils.indent(indentation) + exports._addColorToData(data));
    }
  } else if (typeof data === 'string') {
    //unserializable string means it's multiline
    Array.prototype.push.apply(output, exports._handleMultiLine(data, indentation));
  } else if (_.isArray(data)) {
    Array.prototype.push.apply(output, exports._handleArray(data, indentation, level));
  } else if (typeof data === 'object') {
    Array.prototype.push.apply(output, exports._handleObject(data, indentation, level));
  }

  // Return all the lines as a string
  return output.join('\n');
};

var maxSortDepth = 20;
var currSortDepth = 0;
exports._sortKeys = (data, parentIsArray) => {
  var sortedData = parentIsArray && ! options.numberArrays ? [] : {};
  _.each(_.keys(data).sort(), function(key) {
    if ((_.isObject(data[key]) || _.isArray(data[key])) &&
      currSortDepth < maxSortDepth) {
        currSortDepth++;
        if (_.isArray(data[key])) {
          sortedData[key] = exports._sortKeys(data[key], (options.numberArrays ? false : true));
        } else {
          sortedData[key] = exports._sortKeys(data[key]);
        }
      } else {
        if (_.isArray(sortedData)) {
          sortedData.push(data[key]);
        } else {
          sortedData[key] = data[key];
        }
      }
  });
  currSortDepth--;
  return sortedData;
};


exports.render = (customOptions, data, startIndent) => {
  options = _.defaultsDeep(customOptions, options);
  options.depth = parseInt(options.depth);
  options.defaultIndentation = parseInt(options.defaultIndentation);

  const indent = startIndent ? startIndent : 0;
  const colors = _.clone(options.colors);
  if (customOptions.customColors && typeof data === 'object') {
    // override colors for object keys that are matched in 'customColors' settings
    Object.keys(options.customColors).some(function(key) {
      if (typeof data[key] !== 'undefined') {
        Object.keys(colors).forEach(color => {
          colors[color] = options.customColors[key];
        });
        data = data[key];
        return true;
      }
    });
  }
  pColor = settings.createColorObj(colors);

  var sortedData = data;
  if (options.alphabetizeKeys) {
    sortedData = exports._sortKeys(data, _.isArray(data) );
  }
  return exports._render(sortedData, options, indent);
};

