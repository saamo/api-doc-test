var generateDoc = require('./');

var header = 'FORMAT: 1A\n' +
  'HOST: https://api.lobsterchat.com/\n\n' +
  '# Lobster Chat API\n\n' +
  'This API provides access to the Lobster Chat messaging service.';

generateDoc(header, './example/**/*test.js', function(err, doc) {
  if (err) throw err;
  console.log(doc);
});
