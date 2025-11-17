const database = require('../../src/config/database');

test('database config exists', function() {
  expect(database).toBeDefined();
});

test('database config is a function', function() {
  expect(typeof database).toBe('function');
});
