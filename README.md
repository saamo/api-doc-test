# API Blueprint from Jasmine/Mocha tests

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

Generate [API Blueprint](http://apiblueprint.org) from BDD-style ([Jasmine](http://jasmine.github.io)/[Mocha](http://mochajs.org)) tests.

## Install

```bash
npm install --save api-doc-test
```

## Usage

```js
var generateDoc = require('api-doc-test');

var header = 'FORMAT: 1A\n' +
  'HOST: https://api.lobsterchat.com/\n\n' +
  '# Lobster Chat API\n\n' +
  'This API provides access to the Lobster Chat messaging service.';

generateDoc(header, './**/*test.js', function(err, doc) {
  if (err) throw err;
  console.log(doc);
});
```

### Test Structure

BDD-style tests must follow given structure so API Blueprint can be generated properly.

```js
// This group consists of two resources: /lobsters/ and /lobsters/{id}/.
describe('Lobsters', function() {

  // This resource is for creating and listing lobsters.
  describe('Lobsters [/lobsters/]', function() {

    // Creates a new lobster.
    describe('Create Lobster [POST]', function() {

      // Request (application/json)
      // Response 201 (application/json)
      it('creates a new lobster', function(done) {
        var reqFile = __dirname + 'request.json'; // optional
        var resFile = __dirname + 'response.json'; // optional

        // your test
      });
    });
  });
});
```

### API Blueprint

The resulting API Blueprint from the example above looks like this.

```apib
FORMAT: 1A
HOST: https://api.lobsterchat.com/

# Lobster Chat API

This API provides access to the Lobster Chat messaging service.

# Group Lobsters

This group consists of two resources: /lobsters/ and /lobsters/{id}/.

## Lobsters [/lobsters/]

This resource is for creating and listing lobsters.

### Create Lobster [POST]

Creates a new lobster.

+ Request (application/json)

        {
            "name": "John",
            "claws": 2
        }

+ Response 201 (application/json)

        {
            "id": 1,
            "name": "John",
            "claws": 2
        }
```

## License

MIT © [Samir Djellil](http://samirdjellil.com)

[npm-image]: https://img.shields.io/npm/v/api-doc-test.svg?style=flat-square
[npm-url]: https://npmjs.org/package/api-doc-test
[travis-image]: https://img.shields.io/travis/saamo/api-doc-test/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/saamo/api-doc-test
