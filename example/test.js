// This group consists of two resources: /lobsters/ and /lobsters/{id}/.
describe('Lobsters', function() {

  // This resource is for creating and listing lobsters.
  describe('Lobsters [/lobsters/]', function() {

    // Creates a new lobster.
    describe('Create Lobster [POST]', function() {

      // Request (application/json)
      // Response 201 (application/json)
      it('creates a new lobster', function(done) {
        var reqFile = './example/request.json'; // optional
        var resFile = './example/response.json'; // optional

        // your test
      });
    });
  });
});
