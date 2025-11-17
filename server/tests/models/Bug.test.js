const Bug = require('../../src/models/Bug');

test('Bug model creates bug with title', function() {
  const bug = new Bug({
    title: 'Test Bug',
    description: 'Test Description'
  });
  expect(bug.title).toBe('Test Bug');
});

test('Bug model has default status open', function() {
  const bug = new Bug({
    title: 'Test Bug'
  });
  expect(bug.status).toBe('open');
});
