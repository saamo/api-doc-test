'use strict';

var acquit = require('acquit');
var gmatch = require('gmatch');
var fs = require('fs');

module.exports = function(content) {
  var groups = acquit.parse(content, cb);
  var doc = '';

  // groups
  for (var i in groups) {
    doc += '# Group ' + groups[i].contents;
    groups[i].comments.forEach(function(comment) {
      doc += '\n\n' + comment.substring(1);
    });

    // resources
    var resources = groups[i].blocks;
    for (var j in resources) {
      doc += '\n\n## ' + resources[j].contents;
      resources[j].comments.forEach(function(comment) {
        doc += '\n\n' + comment.substring(1);
      });

      // actions
      var actions = resources[j].blocks;
      for (var k in actions) {
        doc += '\n\n### ' + actions[k].contents;
        var test = actions[k].blocks[0];
        actions[k].comments.forEach(function(comment) {
          doc += '\n\n' + comment.substring(1);
        });

        // requests and responses
        for (var l in test.code) {
          doc += formatPayload(test.code[l], '+' + test.comments[l]);
        }
      }
    }
  }

  return doc;
};

// find and load requests and responses
var cb = function(block) {
  if (block.code) {
    var matches = gmatch(block.code, /(?:reqFile|resFile) = '(.*)'/g);
    block.code = matches.map(function(file) {
        return fs.readFileSync(file).toString();
    });
  }
};

var formatPayload = function(payload, title) {
  payload = JSON.stringify(JSON.parse(payload), null, 4);
  payload = indent('\n        ', payload);
  return '\n\n' + title + '\n' + payload;
}

var indent = function(str, content) {
  return content.split('\n')
    .map(function(line) {
      return str + line;
    })
    .join('');
}
