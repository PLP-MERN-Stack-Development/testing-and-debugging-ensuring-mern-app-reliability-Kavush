const User = require('../../src/models/User');

test('User model exists', function() {
  expect(User).toBeDefined();
});

test('User model is a function', function() {
  expect(typeof User).toBe('function');
});
