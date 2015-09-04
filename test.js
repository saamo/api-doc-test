var assert = require('assert');
var fs = require('fs');
var generateDoc = require('./');

it('should generate API Blueprint', function() {
  var header = 'FORMAT: 1A\n' +
    'HOST: https://api.lobsterchat.com/\n\n' +
    '# Lobster Chat API\n\n' +
    'This API provides access to the Lobster Chat messaging service.';

  generateDoc(header, './example/test.js', function(err, doc) {
    if (err) throw err;
    var example = fs.readFileSync('./example/doc.apib').toString();
    assert.equal(doc + '\n', example, 'it should have been the same as example/doc.apib');
  });
});
