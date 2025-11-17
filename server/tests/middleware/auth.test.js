const auth = require('../../src/middleware/auth');

test('auth middleware exists', function() {
  expect(auth).toBeDefined();
});
