var generateDoc = require('./');

var header = {
  format: '1A',
  host: 'https://api.lobsterchat.com/',
  title: 'Lobster Chat API',
  description: 'This API provides access to the Lobster Chat messaging service.'
};

generateDoc(header, './example/**/*test.js', function(err, doc) {
  if (err) throw err;
  console.log(doc);
});
