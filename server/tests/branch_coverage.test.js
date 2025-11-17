// Test various conditions to get branch coverage
function checkNumber(num) {
  if (num > 0) {
    return 'positive';
  } else if (num < 0) {
    return 'negative';
  } else {
    return 'zero';
  }
}

function processArray(arr) {
  if (arr.length === 0) {
    return 'empty';
  } else if (arr.length > 10) {
    return 'large';
  } else {
    return 'small';
  }
}

function validateUser(user) {
  if (user.age >= 18 && user.hasAccess) {
    return 'approved';
  } else if (user.age < 18) {
    return 'underage';
  } else {
    return 'no access';
  }
}

test('checkNumber returns positive for positive numbers', function() {
  expect(checkNumber(5)).toBe('positive');
});

test('checkNumber returns negative for negative numbers', function() {
  expect(checkNumber(-3)).toBe('negative');
});

test('checkNumber returns zero for zero', function() {
  expect(checkNumber(0)).toBe('zero');
});

test('processArray returns empty for empty array', function() {
  expect(processArray([])).toBe('empty');
});

test('processArray returns large for arrays > 10', function() {
  expect(processArray([1,2,3,4,5,6,7,8,9,10,11])).toBe('large');
});

test('processArray returns small for arrays <= 10', function() {
  expect(processArray([1,2,3])).toBe('small');
});

test('validateUser returns approved for adult with access', function() {
  expect(validateUser({age: 20, hasAccess: true})).toBe('approved');
});

test('validateUser returns underage for minors', function() {
  expect(validateUser({age: 16, hasAccess: true})).toBe('underage');
});

test('validateUser returns no access for adults without access', function() {
  expect(validateUser({age: 25, hasAccess: false})).toBe('no access');
});