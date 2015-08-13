var apiDocTest = require('api-doc-test');
var fs = require('fs');

var header = fs.readFileSync('_header.apib').toString();
var content = fs.readFileSync('test.js').toString();

var blueprint = header + apiDocTest(content);

console.log(blueprint);
