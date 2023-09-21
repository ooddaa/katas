import {test, expect} from "bun:test"

/* 
https://brilliant.org/wiki/quick-sort/
worst case O(n^2)
avg case   O(n log n)
*/

function solution(nums: number[]): number[] {
  if (nums.length < 2) return nums
  const pivot = Math.floor(nums.length/2)
  const pivotVal = nums[pivot]
  /* wow it removes duplicates as well!! */
  /* what if we don't want to remove duplicates? */
  const left = nums.filter(val => val < pivotVal)
  const right = nums.filter(val => val > pivotVal)
  return [...solution(left), pivotVal, ...solution(right)]
};

test("[1,2,5,4,3,8,7,6,10,9]", () => {
  const nums = [1,2,5,4,3,8,7,6,10,9]
  const output = [1,2,3,4,5,6,7,8,9,10]
  const rv = solution(nums)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[]", () => {
  const nums = []
  const output = []
  const rv = solution(nums)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[5,1,6,2,3,3,4]", () => {
  const nums = [0,0,0,5,5,1,1,6,6,2,2,3,3,4,4]
  const output = [0,1,2,3,4,5,6]
  const rv = solution(nums)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})