import {test, expect} from "bun:test"

/* 
https://leetcode.com/problems/3sum/
https://www.youtube.com/watch?v=jzZsG8n2R9A&ab_channel=NeetCode
Given an integer array nums, return all the triplets 
[nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, 
and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

⏰ time complexity:
O(n^2) as I have nested loops looping over n*n times

🛸 space complexity: 
O(dohera) - 2 lists wc n + 2 sets wc n + freq obj wc n = 5n 
*/
function threeSum(nums: number[]): number[][] {
  /* 
    [ a b c ] = 0 = 
    a+b = -c    
    a = -(b+c)
    one is 0, others are x + -x
    [ -1 ]
    a = -1
    b+c = -a => [0, -a], [b, - a - b]
    a = -5
    b = 2, c = 5 - 2 = 3

    algo:
    0. sort nums
    1. iterate thru nums
    2. a = nums[i]
    3. b = nums[i+1]
    4. c = -a - b
    5. check if c exists: 
        yes - return [a,b,c], check its == 0
        no - i++
  */
  const result: number[][] = []
  const set = new Set(nums)
  const uniq = [...set]
  const triplets = new Set()
  const freq = nums.reduce((acc, num) => {
    num in acc ? acc[num] += 1 : acc[num] = 1
    return acc
  }, {})
  for (let i = 0; i < uniq.length; i++) {
    let a = uniq[i] 
    for (let j = 0; j < uniq.length; j++) {
      let b = uniq[j]   
      let c = -(a + b)
      if (!set.has(c)) continue
      if (a == b && freq[a] < 2) continue 
      if (a == c && freq[a] < 2) continue 
      if (b == c && freq[b] < 2) continue 
      if (a == b && b == c && freq[b] < 3) continue 
      let triplet = [a,b,c].sort()
      let hash = triplet.map(String).join("-")
      if (!triplets.has(hash)) {
        result.push(triplet)
        triplets.add(hash)
      }
    }
  }
  return result
};

test("[-1,0,1,2,-1,-4]", () => {
  const nums = [-1,0,1,2,-1,-4]
  const rv = threeSum(nums)
  expect(rv.length).toBe(2)
})
test("[-1,0,1,0, 0, 2,-1,-4]", () => {
  const nums = [-1,0,1,0, 0, 2,-1,-4]
  const rv = threeSum(nums)
  expect(rv.length).toBe(3)
})
test("[3,-2,1,0]", () => {
  const nums = [3,-2,1,0]
  const rv = threeSum(nums)
  expect(rv.length).toBe(0)
})
test("[-2,0,0,2,2]", () => {
  const nums = [-2,0,0,2,2]
  const rv = threeSum(nums)
  expect(rv.length).toBe(1)
})
test("[-1,0,1,2,-1,-4,-2,-3,3,0,4]", () => {
  const nums = [-1,0,1,2,-1,-4,-2,-3,3,0,4]
  const rv = threeSum(nums)
  expect(rv.length).toBe(9)
})
test("big", () => {
  const nums = [
    -13,5,13,12,-2,-11,-1,12,-3,0,-3,-7,-7,-5,-3,-15,-2,14,14,13,6,-11,-11,5,
    -15,-14,5,-5,-2,0,3,-8,-10,-7,11,-5,-10,-5,-7,-6,2,5,3,2,7,7,3,-10,-2,2,-12,-11,-1,14,10,-9,-15,-8,-7,-9,7,3,-2,5,11,-13,-15,8,-3,-7,-12,7,5,-2,-6,-3,-10,4,2,-5,14,-3,-1,-10,-3,-14,-4,-3,-7,-4,3,8,14,9,-2,10,11,-10,-4,-15,-9,-1,-1,3,
    4,1,8,1]
  const rv = threeSum(nums)
  expect(rv.length).toBe(118)
})

