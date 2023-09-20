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

INSIGHT - this only works if list is asc sorted

[1,1,1,2,2,3]
j 2 [1,1,[1],2,2,3]
i 2 [1,1,[1],2,2,3]
if i-1 == i-2 && (nums[i] == nums[i-1])
leave j

j 2 [1,1,[1],2,2,3]
i 2 [1,1,1,[2],2,3]
if i-1 == i-2 && (nums[i] !== nums[i-1])
nums[j] = nums[i]
j++

j 3 [1,1,2,[2],2,3]
i 3 [1,1,2,2,[2],3]


r [1,[1],1,2,2,3]
l [1,[1],1,2,2,3]

*/
function solution(nums: (number)[]): number {
  let replace = 2
  let lookup = 3
  // max two
  // let curr = {[nums[0]]: 1}
  for (; lookup < nums.length; lookup++) {
    // [0,0,1,1,1,1,2,3,3]
    /* 
    [0,0,1,1,1,1,2,3,3]
    r [0,0,[1],1,1,1,2,3,3]
    l [0,0,1,[1],1,1,2,3,3]
    
    r [0,0,[0],1,1,1,2,3,3]
    l [0,0,0,[0],1,1,2,3,3]
    leave r
    move l

    r [0,0,[0],1,1,1,2,3,3]
    l [0,0,0,[1],1,1,2,3,3]
    copy l to r
    move r
    move l
    r [0,0,1,[1],1,1,2,3,3]
    l [0,0,1,1,[1],1,2,3,3]
    move r
    move l
    r [0,0,1,1,[1],1,2,3,3]
    l [0,0,1,1,1,[1],2,3,3]
    leave r
    move l
    r [0,0,1,1,[1],1,2,3,3]
    l [0,0,1,1,1,1,[2],3,3]
    copy l to r
    move r
    move l
    r [0,0,1,1,2,[1],2,3,3]
    l [0,0,1,1,1,1,[2],3,3]

    r [0,0,1,[1],1,1,2,3,3]
    l [0,0,1,[1],1,1,2,3,3]
    */
    if (nums[lookup - 1] == nums[lookup - 2] && nums[lookup - 2] == nums[lookup - 3]) {
      nums[replace] = nums[lookup]
      replace ++
    }
  }
  console.log({replace, lookup, nums})
  return replace
}

test.skip("[1,1,1,2,2,3]", () => {
  const nums = [1,1,1,2,2,3]
  const rv = solution(nums)
  expect(rv).toBe(5)
})
test("[0,0,1,1,1,1,2,3,3]", () => {
  const nums = [0,0,1,1,1,1,2,3,3]
  const rv = solution(nums)
  expect(rv).toBe(7)
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