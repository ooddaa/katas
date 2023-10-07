import {test, expect} from "bun:test"

/* 
https://leetcode.com/problems/two-sum/
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.
⏰ time complexity:

🛸 space complexity: 
*/
function twoSum(nums: number[], target: number): number[] {
  const map = {}

  for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i]
      if (complement in map) return [map[complement], i]
      map[nums[i]] = i
  }
  return []
};

test("[2,7,11,15] 9", () => {
  const nums = [2,7,11,15]
  const rv = twoSum(nums, 9)
  const output = [0,1]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[3,2,4] 6", () => {
  const nums = [3,2,4]
  const rv = twoSum(nums, 6)
  const output = [1,2]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[3,3] 6", () => {
  const nums = [3,3]
  const rv = twoSum(nums, 6)
  const output = [0,1]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})