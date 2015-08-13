var apiDocTest = require('./');
var assert = require('assert');
var fs = require('fs');

it('should generate API Blueprint', function() {
  var content = fs.readFileSync('example/test.js').toString();
  var result = apiDocTest(content) + '\n';
  var example = fs.readFileSync('example/doc.apib').toString();

  assert.equal(result, example, 'it should have been the same as example/doc.apib');
});
