'use strict';

var acquit = require('acquit');
var curry = require('ramda').curry;
var compose = require('ramda').compose;
var loadExternalFiles = require('./lib/loadExternalFiles');

/* Formatting */

var pad = curry(function(prefix, string) {
  return prefix + string;
});

var trim = function(string) {
  return string.trim();
};

var writeGroupHeader = pad('# Group ');
var writeResourceHeader = pad('\n\n## ');
var writeActionHeader = pad('\n\n### ');
var writeParagraph = compose(pad('\n\n'), trim);
var writeBullet = compose(pad('\n\n+ '), trim);

var standardizeCode = function(code) {
  var parsedCode = JSON.parse(code);
  var standardizedCode = JSON.stringify(parsedCode, null, 4);

  return standardizedCode;
};

var writeCode = function(code) {
  var formattedCode = standardizeCode(code)
    .split('\n')
    .map(pad('\n        '))
    .join('');

  return pad('\n', formattedCode);
};

/* Main module logic */

var generateApiBlueprint = function(content) {
  var groups = acquit.parse(content, loadExternalFiles);
  var doc = '';

  groups.map(function(group) {
    doc += writeGroupHeader(group.contents);
    doc += group.comments.map(writeParagraph);

    group.blocks.map(function(resource) {
      doc += writeResourceHeader(resource.contents);
      doc += resource.comments.map(writeParagraph);

      resource.blocks.map(function(action) {
        doc += writeActionHeader(action.contents);
        doc += action.comments.map(writeParagraph);

        action.blocks[0].files.map(function(file) {
          doc += writeBullet(file.description);
          doc += writeCode(file.contents);
        });
      });
    });
  });

  return doc;
};

module.exports = generateApiBlueprint;
