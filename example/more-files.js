var apiDocTest = require('api-doc-test');
var fs = require('fs');
var glob = require('glob');

glob('test/**/*.test.js', null, function(err, files) {
  var header = fs.readFileSync('_header.apib').toString();

  var doc = files.map(function(file) {
    var content = fs.readFileSync(file).toString();
    return '\n' + apiDocTest(content);
  });

  fs.writeFileSync('doc.apib', header + doc);
});
