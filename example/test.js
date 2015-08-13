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
