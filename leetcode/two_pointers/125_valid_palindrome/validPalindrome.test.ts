import {test, expect} from "bun:test"

/* array.reverse() */
function isPalindrome2(s: string): boolean {
  let rv = s.replace(/\W|_/g, "").toLowerCase()
  console.log(rv)
  return rv == rv.split("").reverse().join("")
};
/* two pointers */
function isPalindrome(s: string): boolean {
  let list = s.replace(/\W|_/g, "").toLowerCase().split("")
  for (let l = 0, r = list.length - 1; l < r; l++, r--) {
    if (list[l] !== list[r]) return false
  }
  return true
};

test("A man, a plan, a canal: Panama", () => {
  const s = "A man, a plan, a canal: Panama"
  const rv = isPalindrome(s)
  expect(rv).toBe(true)
})
test("race a car", () => {
  const s = "race a car"
  const rv = isPalindrome(s)
  expect(rv).toBe(false)
})
test("ab_a", () => {
  const s = "ab_a"
  const rv = isPalindrome(s)
  expect(rv).toBe(true)
})