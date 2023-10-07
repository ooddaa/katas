import {test, expect} from "bun:test"

/* 
https://leetcode.com/problems/product-of-array-except-self/

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.
*/
function naive(nums: number[]): number[] {
  let total = 1
  let zeros = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 0) {
      zeros += 1
    } 
    let multiplier = nums[i] == 0 ? 1 : nums[i]
    total = total * multiplier
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == 0) {
      nums[i] = zeros > 1 ? 0 : total
    } else {
      if (zeros) {
        nums[i] = 0
      } else {
        nums[i] = total / nums[i]
      }
    }
  }
  return nums
};

function productExceptSelf1(nums: number[]): number[] {
  /* prefix postfix 
  79 ms
52.3 MB
  */
  let prefix: number[] = []
  let postfix: number[] = []

  /* 
  [1,2,3,4] 
  2 = 1 * 3*4
  3 = prefix[1 * 2] * postfix[4]
  prefix = [1, 2, 6, 24]
  postfix = [24, 24, 12, 4]
  result = 3 [2 * 4]
  result = 4 [6]
  
  [1,2,3,4,5] 
  2 = 1 * 3*4
  3 = prefix[1 * 2] * postfix[4*5]
  prefix = [1, 2, 6, 24, 120]
  postfix = [120, 120, 60, 20, 5]
  result = 3 [2 * 20]

  [-1, 1, 0, -3, 3]
  pre [-1, -1, 0, 0, 0]
  post [0, 0, 0, -9, 3]
  res 3 [-1 * -9]
  */
  for (let i = 0; i < nums.length; i++) {
    prefix[i] = nums[i] * (prefix[i-1] == undefined ? 1: prefix[i-1])
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    postfix[i] = nums[i] * (postfix[i+1] == undefined ? 1 : postfix[i+1])
  }
  for (let i = 0; i < nums.length; i++) {
    nums[i] = (nums[i-1] == undefined ? 1 : prefix[i-1]) * (nums[i+1] == undefined ? 1 : postfix[i+1]) 
  }
  return nums
}

function productExceptSelf(nums: number[]): number[] {
  /* prefix postfix 
89 ms
59.5 MB
  */
  let result: number[] = []

  for (let i = 0; i < nums.length; i++) {
    // store prefix in results
    result[i] = nums[i] * (result[i-1] !== undefined ? result[i-1] : 1)
  }
  for (let i = nums.length - 1; i >= 0; i--) {
    // calculate postfix simultaneously with the result
    let prefix = nums[i-1] == undefined ? 1 : result[i-1]
    let postfix = nums[i+1] = (nums[i+1] == undefined ? 1 : nums[i+1]) * (nums[i+2] == undefined ? 1 : nums[i+2])
    result[i] = prefix * postfix
  }
  return result
}


test("[1,2,3,4]", () => {
  const rv = productExceptSelf([1,2,3,4])
  const output = [24,12,8,6]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[0,1,2]", () => {
  const rv = productExceptSelf([0,1,2])
  const output = [2,0,0]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[-1,1,0,-3,3]", () => { 
  const rv = productExceptSelf([-1,1,0,-3,3])
  const output = [0,0,9,0,0]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[0,0,0]", () => {
  const rv = productExceptSelf([0,0,0])
  const output = [0,0,0]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
