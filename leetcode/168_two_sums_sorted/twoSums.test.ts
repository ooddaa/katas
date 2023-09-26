import {test, expect} from "bun:test"

/* 
⏰ time complexity:
O(n) 

🛸 space complexity: 
O(1) - constant == 1 map
*/
function twoSum(nums: number[], target: number): number[] {
  /* 
  0. make an empty hashmap 
  1. walk nums: 
    - calculate number's complement to reach the target
    - does this number has its complement as key in hashmap?
      yes -> return [nums's index, value from hashmap]
      no -> add this num and its index to hashmap num => index
        - increment i 
  */
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (complement in map) return [map[complement]+1, i+1]
    map[nums[i]] = i
  }
  return []
};

test("[2,7,11,15]", () => {
  const nums = [2,7,11,15]
  const rv = twoSum(nums, 9)
  expect(JSON.stringify(rv)).toBe(JSON.stringify([1,2]))
})
test("[2,3,4]", () => {
  const nums = [2,3,4]
  const rv = twoSum(nums, 6)
  expect(JSON.stringify(rv)).toBe(JSON.stringify([1,3]))
})
test("[-1,0]", () => {
  const nums = [-1,0]
  const rv = twoSum(nums, -1)
  expect(JSON.stringify(rv)).toBe(JSON.stringify([1,2]))
})
test("[]", () => {
  const nums = []
  const rv = twoSum(nums, 1)
  expect(JSON.stringify(rv)).toBe(JSON.stringify([]))
})
test("[4,4]", () => {
  const nums = [4,4]
  const rv = twoSum(nums, 8)
  expect(JSON.stringify(rv)).toBe(JSON.stringify([1,2]))
})
