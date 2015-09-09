'use strict';

var gmatch = require('gmatch');
var fs = require('fs');

// find and load requests and responses
var loadExternalFiles = function(block) {
  if (block.comments) {
    block.files = [];
    block.comments.forEach(function(line) {
      var matches = gmatch(line.trim(), /((?:Request|Response).*\(.*\)) (.*)/g);
      if (matches.length > 0) {
        var match = matches[0]; // take first match (there shouldn't be any other)
        block.files.push({
          description: match[0],
          contents: fs.readFileSync(match[1]).toString()
        });
      }
    });
  }
};

module.exports = loadExternalFiles;
