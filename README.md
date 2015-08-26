# API Blueprint from Jasmine/Mocha tests

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

Generate [API Blueprint](http://apiblueprint.org) from BDD-style ([Jasmine](http://jasmine.github.io)/[Mocha](http://mochajs.org)) test.

## Install

```bash
npm install --save api-doc-test
```

## Usage

### Test Structure

BDD-style test must follow given structure so API Blueprint can be generated from it.

```js
// This group consists of two resources: /users/ and /users/{id}/.
describe('Users', function() {

  // This resource is for creating and listing users.
  describe('Create users [/users/]', function() {

    // Creates a new user object.
    describe('Create a user [POST]', function() {

      // Request (application/json)
      // Response 201 (application/json)
      it('creates a new user object', function(done) {
        var reqFile = 'example/request.json'; // optional
        var resFile = 'example/response.json'; // optional

        // your test
      });
    });
  });
});

```

This test will be generated into this:

```apib
# Group Users

This group consists of two resources: /users/ and /users/{id}/.

## Create users [/users/]

This resource is for creating and listing users.

### Create a user [POST]

Creates a new user object.

+ Request (application/json)

        {
            "firstname": "John",
            "lastname": "Dope"
        }

+ Response 201 (application/json)

        {
            "id": 1,
            "firstname": "John",
            "lastname": "Dope"
        }
```

##### Header file

FYI – to have a _valid_ API Blueprint, you need to prepend following text to generated blueprints.

```apib
FORMAT: 1A
HOST: https://awesome.com/api/v1/

# My Awesome API

Provide some description about your awesome API.
```

### Script

#### Single test file

```js
var apiDocTest = require('api-doc-test');
var fs = require('fs');

var header = fs.readFileSync('_header.apib').toString();
var content = fs.readFileSync('test.js').toString();

var blueprint = header + apiDocTest(content);

console.log(blueprint);
```

#### Multiple test files

When you have more test files, you should use [glob](https://www.npmjs.com/package/glob) to retrieve all test files within specified folder.

```js
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
```

## License

MIT © [Samir Djellil](http://samirdjellil.com)

[npm-image]: https://img.shields.io/npm/v/api-doc-test.svg?style=flat-square
[npm-url]: https://npmjs.org/package/api-doc-test
[travis-image]: https://img.shields.io/travis/saamo/api-doc-test/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/saamo/api-doc-test
