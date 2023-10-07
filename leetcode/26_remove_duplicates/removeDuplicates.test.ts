import {test, expect} from "bun:test"
// import solution from "./minSubArrayLength"

function solutionForNonSortedArr(nums: (number)[]): number {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i+1; j < nums.length; j++) {
      if (nums[j] === nums[i]) nums[j] = Infinity
    }
  }
  nums = nums.sort((a, b) => a - b).filter(x => x !== Infinity)
  return nums.length
}

/* 
[1,2,1,3]
j 1 i 1 => [1,[2],1,3] 
if i != i - 1 => [[1] != [2],1,3] 
nums[j] == nums[1] == [1,[2],1,3] == 2
= nums[i] == nums[1] == [1,[2],1,3] == [1,2,1,3]

j 2 i 2 => [1,2,[1],3]
2 != 1
nums[j] == nums[2] == [1, 2, [1], 3]

[1,2,3]

INSIGHT - this only works if list is asc sorted

[1,1,2,3]
j 1 => [1,[1],2,3] 
i 1 => [1,[1],2,3] 
if i == i - 1 => [1 == 1,2,3]
[1,1,2,3]
j 1 => [1,[1],2,3]
i 1 => [1,1,[2],3]
if i == i - 1 => [1,1 != 2,3]
nums[j] => nums[1] == [1,[1],2,3] == 1
nums[i] == nums[1] == [1,1,[2],3] == 2
nums[j] = nums[i] => nums[1] = nums[2] => [_, [here], _, _] <- [_,_,[this_moves],_]
[1,2,2,3]
j 2 = [1,2,[2],3]
i 3 = [1,2,2,[3]]
nums[2] = nums[3] && j = 3
j is the pointer to the end of unique section of the list.

*/
function solution(nums: (number)[]): number {
  let j = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] !== nums[i]) {
      nums[j] = nums[i]
      j++
    }
  }
  return j
}

test("[1,1,2,3]", () => {
  const nums = [1,1,2,3]
  const rv = solution(nums)
  expect(rv).toBe(3)
})
test("[1,2,1,3]", () => {
  const nums = [1,2,1,3]
  const rv = solutionForNonSortedArr(nums)
  expect(rv).toBe(3)
})
test.skip("[1,1,2]", () => {
  const nums = [1,1,2]
  const rv = solution(nums)
  expect(rv).toBe(2)
})
test.skip("[0,0,1,1,1,2,2,3,3,4]", () => {
  const nums = [0,0,1,1,1,2,2,3,3,4]
  const rv = solution(nums)
  expect(rv).toBe(5)
})
test.skip("[-3,-1,0,0,0,3,3]", () => {
  const nums = [-3,-1,0,0,0,3,3]
  const rv = solution(nums)
  expect(rv).toBe(4)
})