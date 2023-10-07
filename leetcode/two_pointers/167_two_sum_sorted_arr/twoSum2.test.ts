import {test, expect} from "bun:test"

/* 
https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/
Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 < numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

The tests are generated such that there is exactly one solution. You may not use the same element twice.

Your solution must use only constant extra space.
⏰ time complexity:

🛸 space complexity: 
O(1)
*/
function twoSum(nums: number[], target: number): number[] {
  // [2 2 7 11 14 15] 9
  // l 2 r 15 sum > 9 r--
  // l 2 r 14 sum > 9 r--
  // l 2 r 11 sum > 9 r--
  // l 2 r 11 sum > 9 r--
  // l 2 r 7 sum == 9 
  let left = 0, right = nums.length - 1
  while(left < right) {
    if (nums[left] + nums[right] == target) return [left + 1, right + 1]
    if (nums[left] + nums[right] > target) right -= 1 
    if (nums[left] + nums[right] < target) left += 1 
  }
};

test("[2,7,11,15] 9", () => {
  const nums = [2,7,11,15]
  const rv = twoSum(nums, 9)
  const output = [1,2]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[2,3,4] 6", () => {
  const nums = [2,3,4]
  const rv = twoSum(nums, 6)
  const output = [1,3]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[-1,0] -1", () => {
  const nums = [-1,0]
  const rv = twoSum(nums, -1)
  const output = [1,2]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})