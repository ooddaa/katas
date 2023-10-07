import {test, expect} from "bun:test"

/* 
time complexity
Naive approach
Not O(n)
We sort nums - O(n^2) + walk them once O(n)
althoug 106ms
Beats 76.33%of users with TypeScript

space complexity: 
2 additional arrays to hold n elements => O(2n) 


*/
function longestConsecutive1(nums: number[]): number[] {
  if (nums.length == 1) return nums
  let max: number[] = []
  let currMax: number[] = []
  let sorted = Array.from(new Set(nums)).sort((a,b) => a-b)
  for (let i = 0; i < sorted.length; i++) {
    currMax.push(sorted[i])
    if (sorted[i+1] - sorted[i] != 1) {
      if (max.length <= currMax.length) {
        max = currMax
      }
      currMax = []
    } 
  }
  return max
};

/* 
O(n) approach????
it runs 3x longer than my "naive" solution

304 ms
62.6 MB
292 ms
62.9 MB
*/
function longestConsecutive(nums: number[]): number {
  //  convert to set
  const set = new Set(nums)
  let max = 0
  // walk nums identifying start of each seq
  for (let i = 0; i < nums.length; i++) {
    // is it start of the sequence?
    if (!set.has(nums[i] - 1)) {
      // yes it is, start counting the seq length
      let j = 0
      let localMax = 0
      while (j < nums.length && set.has(nums[i]+j)) {
        localMax += 1
        j++
      }
      max = Math.max(max, localMax)
    }
  }
  return max
};

test("[100,4,200,1,3,2]", () => {
  const nums = [100,4,200,1,3,2]
  const seq = longestConsecutive(nums)
  const rv = seq
  expect(rv).toBe(4)
})
test("[0,3,7,2,5,8,4,6,0,1]", () => {
  const nums = [0,3,7,2,5,8,4,6,0,1]
  const seq = longestConsecutive(nums)
  const rv = seq
  expect(rv).toBe(9)
})
test("[0]", () => {
  const nums = [0]
  const seq = longestConsecutive(nums)
  const rv = seq
  expect(rv).toBe(1)
})
test("[0,0]", () => {
  const nums = [0,0]
  const seq = longestConsecutive(nums)
  const rv = seq
  expect(rv).toBe(1)
})
test("[1,2,0,1]", () => {
  const nums = [1,2,0,1]
  const seq = longestConsecutive(nums)
  const rv = seq
  expect(rv).toBe(3)
})
test("[9,1,-3,2,4,8,3,-1,6,-2,-4,7]", () => {
  const nums = [9,1,-3,2,4,8,3,-1,6,-2,-4,7]
  const seq = longestConsecutive(nums)
  const rv = seq
  expect(rv).toBe(4)
})
test("[-7,-1,3,-9,-4,7,-3,2,4,9,4,-9,8,-7,5,-1,-7]", () => {
  const nums = [-7,-1,3,-9,-4,7,-3,2,4,9,4,-9,8,-7,5,-1,-7]
  const seq = longestConsecutive(nums)
  const rv = seq
  expect(rv).toBe(4)
})