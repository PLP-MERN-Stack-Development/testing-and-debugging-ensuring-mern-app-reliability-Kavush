describe('Basic Test Suite', () => {
  test('should pass basic math', () => {
    expect(1 + 1).toBe(2);
  });

  test('should handle strings', () => {
    expect('hello').toContain('hell');
  });

  test('should work with arrays', () => {
    expect([1, 2, 3]).toHaveLength(3);
  });

  test('should handle objects', () => {
    const obj = { name: 'test', value: 123 };
    expect(obj.name).toBe('test');
  });
});