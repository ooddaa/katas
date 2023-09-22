import {test, expect} from "bun:test"

/* 
https://leetcode.com/problems/top-k-frequent-elements/solutions/3551664/typescript-frequency-count-and-then-sort-runtime-97-memory-70/

space O(2n) => 
  1 we might have all unique elements => build hashmap with keys = n
  2 Node.js sort is quicksort => worst case id O(n)
time  O n^2 (sort) + O 2n (reducing and mapping) = On^2
*/
function topKFrequent(nums: number[], k: number): number[] {
  const rv = nums.reduce((acc, val) => {
    if (val in acc) {
      acc[val] += 1
      return acc
    }
    acc[val] = 1
    return acc
  }, {})
  const x: [string, number][] = Object.entries(rv)
  return x.sort((a: [string, number], b: [string, number]) => b[1] - a[1]).map(([elm, _])=>  Number.parseInt(elm)).slice(0, k)
};


test("[1,1,1,2,2,3] 2", () => {
  const rv = topKFrequent([1,1,1,2,2,3], 2)
  const output = [1,2]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[1] 1", () => {
  const rv = topKFrequent([1], 1)
  const output = [1]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[1] 2", () => {
  const rv = topKFrequent([1], 2)
  const output = [1]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[] 2", () => {
  const rv = topKFrequent([], 2)
  const output = []
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})