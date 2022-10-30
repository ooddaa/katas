function reverse(num /* number */) /* : number */ {
  return Number(num.toString().split("").reverse().join(""));
}

function isPalindrome(num /* number */) /* : boolean */ {
  return num === reverse(num);
}

function palindromeChainLength(num /* number */, init = 0) /* : number */ {
  let counter = init;
  if (isPalindrome(num)) return counter;
  return palindromeChainLength(num + reverse(num), ++counter);
}

test("reverse", () => {
  const rv = reverse(123);
  expect(rv).toEqual(321);
});

test("reverse", () => {
  const rv = reverse(89);
  expect(rv).toEqual(98);
});

test("isPalindrome false", () => {
  const rv = isPalindrome(123);
  expect(rv).toEqual(false);
});

test("isPalindrome 5", () => {
  const rv = isPalindrome(5);
  expect(rv).toEqual(true);
});

test("isPalindrome 44", () => {
  const rv = isPalindrome(44);
  expect(rv).toEqual(true);
});

test("isPalindrome 171", () => {
  const rv = isPalindrome(171);
  expect(rv).toEqual(true);
});

test("palindromeChainLength 5", () => {
  const rv = palindromeChainLength(5);
  expect(rv).toEqual(0);
});
test("palindromeChainLength 87", () => {
  const rv = palindromeChainLength(87);
  expect(rv).toEqual(4);
});
test("palindromeChainLength 89", () => {
  const rv = palindromeChainLength(89);
  expect(rv).toEqual(24);
});
