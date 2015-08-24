'use strict';

var gmatch = require('gmatch');
var fs = require('fs');

//find and load requests and responses
var loadExternalFiles = function(block) {
  if (block.code) {
    var matches = gmatch(block.code, /(?:reqFile|resFile) = '(.*)'/g);
    block.files = matches.map(function(file, index) {
      return {
        description: (block.comments[index]) ? block.comments[index] : 'No description provided.',
        contents: fs.readFileSync(file).toString()
      };
    });
  }
};

module.exports = loadExternalFiles;
