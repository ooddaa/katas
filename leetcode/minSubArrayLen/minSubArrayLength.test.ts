import {test, expect} from "bun:test"
// import solution from "./minSubArrayLength"

function solution1(target, nums) {
  if (!nums.length) return 0
  const total = sum(nums, [0, nums.length])
  if (total < target) return 0
  if (total == target) return nums.length
  if (nums.includes(target)) return 1

  return recur(nums, target)
}

function recur(nums, target, count: number = 0, [from, to] = [0, 1]): number {
  /* 
  [7,1,1,8,2,3,2,1]   finding the first array
  [[7],1,1,8,2,3,2,1]
  [[7,1],1,8,2,3,2,1]
  [[7,1,1],8,2,3,2,1] 
  [[7,1,1,8],2,3,2,1] 17 4 see if we can minimize it
  [7,[1,1,8],2,3,2,1] 10 no, use 4 and see if there is a 3 window (sliding) further 
  [7,1,[1,8,2],3,2,1] nope, keep sliding right
  [7,1,1,[8,2,3],2,1] nope, slide right till the end, if no => 4, if yes, use 3 and repeat minimization+sliding
  */
  // termination
  const newCount = to - from
  // console.dir({count, newCount, "from_to": [from, to], acc})
  if (to > nums.length) return count
  const subarraySum = sum(nums, [from, to])
  if (subarraySum < target) {
    // are we sliding?
    if (newCount < count) {
      // yes we are
      return recur(nums, target, count, [from + 1, to + 1])
    }
    // increase window
    return recur(nums, target, newCount, [from, to + 1])
  }
  // we found a subarraySum containing target, now work on minimizing it
  // if (subarraySum >= target) {
    if (newCount === 0) return 0
    if (newCount === 1) return 1
    // try to minimize
    return recur(nums, target, newCount, [from + 1, to])
  // }
}

function sum(nums, [from, to] = [0, nums.length]) {
  let total = 0
  for (let i = from; i < to; i++) {
    total += nums[i]
  }
  return total
}

function solution2(target: number, nums: number[]): number {
  let sum = 0, i = 0, j = 0, result = Infinity;

  while (j < nums.length) {
    while (i < nums.length && sum < target) {
      sum += nums[i]
      // looking for the first window
      // its length i - j
      i++
    }

    // if there were no windows found
    if (sum < target) break

    // if there were, we put its length into result
    result = Math.min(result, i - j)
    // and prepare for the next interation cycle
    
    // slide beginning one element right
    sum -= nums[j]
    j++
  
  }
  return result === Infinity ? 0 : result
}

function solution(target: number, nums: number[]): number {
  let sum = 0, left = 0, result = Infinity;
  
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]
    while (sum >= target) {
      result = Math.min(result, right - left + 1)
      sum -= nums[left]
      left++
    }
  }
  return result === Infinity ? 0 : result
}


test("4 [1,4,4]", () => {
  const target = 4
  const nums = [1,4,4]
  const rv = solution(target, nums)
  expect(rv).toBe(1)
})
test("7 [2,3,1,2,4,3]", () => {
  const target = 7
  const nums = [2,3,1,2,4,3]
  const rv = solution(target, nums)
  expect(rv).toBe(2)
})
test("11 [1,1,1,1,1,1]", () => {
  const target = 11
  const nums = [1,1,1,1,1,1]
  const rv = solution(target, nums)
  expect(rv).toBe(0)
})
test("11 [21,1,1,1,1,1]", () => {
  const target = 11
  const nums = [21,1,1,1,1,1]
  const rv = solution(target, nums)
  expect(rv).toBe(1)
})
test("11 [1,21,1,1,1,1]", () => {
  const target = 11
  const nums = [1,21,1,1,1,1]
  const rv = solution(target, nums)
  expect(rv).toBe(1)
})
test("0 []", () => {
  const target = 0
  const nums = []
  const rv = solution(target, nums)
  expect(rv).toBe(0)
})
test("17 [7,1,1,8,2,3,2,1]", () => {
  const target = 17
  const nums = [7,1,1,8,2,3,2,1]
  const rv = solution(target, nums)
  expect(rv).toBe(4)
})

function recur1(nums, target, count: number = 0, [from, to] = [0, 1], acc: number[][] = []): number {
  /* 
  [7,1,1,8,2,3,2,1]   finding the first array
  [[7],1,1,8,2,3,2,1]
  [[7,1],1,8,2,3,2,1]
  [[7,1,1],8,2,3,2,1] 
  [[7,1,1,8],2,3,2,1] 17 4 see if we can minimize it
  [7,[1,1,8],2,3,2,1] 10 no, use 4 and see if there is a 3 window (sliding) further 
  [7,1,[1,8,2],3,2,1] nope, keep sliding right
  [7,1,1,[8,2,3],2,1] nope, slide right till the end, if no => 4, if yes, use 3 and repeat minimization+sliding
  */
  // termination
  const newCount = to - from
  // console.dir({count, newCount, "from_to": [from, to], acc})
  if (to > nums.length) return count
  const subarraySum = sum(nums, [from, to])
  if (subarraySum < target) {
    // are we sliding?
    if (newCount < count) {
      // yes we are
      return recur(nums, target, count, [from + 1, to + 1], [...acc, nums.slice(from, to)])
    }
    // increase window
    return recur(nums, target, newCount, [from, to + 1], [...acc, nums.slice(from, to)])
  }
  // we found a subarraySum containing target, now work on minimizing it
  if (subarraySum >= target) {
    if (newCount === 0) return 0
    if (newCount === 1) return 1
    // try to minimize
    return recur(nums, target, newCount, [from + 1, to], [...acc, nums.slice(from, to)])
  }
}