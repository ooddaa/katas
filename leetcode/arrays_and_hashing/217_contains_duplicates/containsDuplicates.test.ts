import {test, expect} from "bun:test"
// https://leetcode.com/problems/contains-duplicate/

// function solution(nums: number[]): boolean {
//   let sorted = nums.sort()
//   for (let i = 1; i < nums.length; i++) {
//     if (sorted[i] == sorted[i -1]) return true
//   }
//   return false
// };

function solution(nums: number[]): boolean {
  return new Set(nums).size != nums.length
};

test("[1,2,3,1]", () => {
  const nums = [1,2,3,1]
  const rv = solution(nums)
  expect(rv).toBe(true)
})
test("[1,2,3,4]", () => {
  const nums = [1,2,3,4]
  const rv = solution(nums)
  expect(rv).toBe(false)
})
test("[1,1,1,3,3,4,3,2,4,2]", () => {
  const nums = [1,1,1,3,3,4,3,2,4,2]
  const rv = solution(nums)
  expect(rv).toBe(true)
})