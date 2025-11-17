const bugsRoute = require('../../src/routes/bugs');

test('bugs route file exists', function() {
  expect(bugsRoute).toBeDefined();
});

test('bugs route is a function', function() {
  expect(typeof bugsRoute).toBe('function');
});
