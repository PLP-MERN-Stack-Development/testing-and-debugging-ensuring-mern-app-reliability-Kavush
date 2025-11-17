test('basic arithmetic 1', function() {
  expect(10 + 5).toBe(15);
});

test('basic arithmetic 2', function() {
  expect(20 - 8).toBe(12);
});

test('string operations', function() {
  expect('hello'.toUpperCase()).toBe('HELLO');
});

test('array operations', function() {
  expect([1, 2, 3].includes(2)).toBe(true);
});

test('object operations', function() {
  const obj = { key: 'value' };
  expect(obj.key).toBe('value');
});
