export default function solution(target: number, nums: number[], config?: {returnPointers: boolean}): number| number[][] {
  /*  
    [2,3,1,2,4,3]
    [[2],3,1,2,4,3] sum < target
    [[2,3],1,2,4,3] sum < target
    [[2,3,1],2,4,3] sum < target
    [[2,3,1,2],4,3] sum > target
    [2,[3,1,2],4,3] sum < target
    [2,[3,1,2,4],3] sum > target
    [2,3,[1,2,4],3] sum == target ok1 
    [2,3,1,[2,4,3]] sum > target  
    [2,3,1,2,[4,3]] sum == target ok2
    ok1 > ok2 => ok2
  */
    const total = sum(nums, [0, nums.length])
    if (total < target) return 0
    if (total == target) return nums.length
    // 
    const rv = recur(nums, target, [])
    if (config?.returnPointers) return rv
    const result = rv.sort((a,b) => a.length - b.length)
    // console.log(result)
    if (result.length) return result[0].length 
    return 0
  };
  
  function recur(nums: number[], target: number, acc: number[][]| [], [from, to] = [0,1]): number[][]|[] {
    // const subarray = nums.slice(from, to)
    // console.log(subarray)
    if (from == to) {
      // console.log("empty", acc)
      return acc
    }
    const total = sum(nums, [from, to])
    // console.log(total)
    if (total < target) {
      if (to >= nums.length) return acc
      return recur(nums, target, acc, [from, to + 1])
    }
    // if (total > target) return recur(nums.slice(1), target, acc, ind - 1)
    if (total >= target) {
      return recur(nums, target, [...acc, [from, to]], [from + 1, to]) 
    }
  }
  
  function sum(nums, [from, to]) {
    let total = 0
    for (let i = from; i < to; i++) {
      total += nums[i]
    }
    return total
  }
