// Test actual functions to get function coverage
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function isEven(num) {
  if (num % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

function getGrade(score) {
  if (score >= 90) {
    return 'A';
  } else if (score >= 80) {
    return 'B';
  } else if (score >= 70) {
    return 'C';
  } else {
    return 'F';
  }
}

test('add function works', function() {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
});

test('multiply function works', function() {
  expect(multiply(4, 5)).toBe(20);
  expect(multiply(0, 10)).toBe(0);
});

test('isEven function works for even numbers', function() {
  expect(isEven(4)).toBe(true);
});

test('isEven function works for odd numbers', function() {
  expect(isEven(7)).toBe(false);
});

test('getGrade function returns A for 90+', function() {
  expect(getGrade(95)).toBe('A');
});

test('getGrade function returns B for 80-89', function() {
  expect(getGrade(85)).toBe('B');
});

test('getGrade function returns C for 70-79', function() {
  expect(getGrade(75)).toBe('C');
});

test('getGrade function returns F for below 70', function() {
  expect(getGrade(65)).toBe('F');
});
