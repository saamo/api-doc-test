var assert = require('assert');
var fs = require('fs');
var generateDoc = require('./');

it('should generate API Blueprint', function() {
  var header = {
    format: '1A',
    host: 'https://api.lobsterchat.com/',
    title: 'Lobster Chat API',
    description: 'This API provides access to the Lobster Chat messaging service.'
  };

  generateDoc(header, './example/test.js', function(err, doc) {
    if (err) throw err;
    var example = fs.readFileSync('./example/doc.apib').toString();
    assert.equal(doc + '\n', example, 'it should have been the same as example/doc.apib');
  });
});
