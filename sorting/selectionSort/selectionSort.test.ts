import {test, expect} from "bun:test"

/* 
https://en.wikipedia.org/wiki/Selection_sort
selection sort is an in-place comparison sorting algorithm.
scans forwards.
ok for small datasets. For bigger use quicksort/merge 
O(n^2) comparisons 
O(n) swaps
1. create sorted[] and unsorted[]
2. scan unsorted for min or max
3. remove from unsorted[] & push it to sorted
4. repeat until unsorted[] is empty
*/
function selectionSort1(nums: number[]): number[] {
  const sorted: number[] = []
  while (nums.length > 0) {
    let minIndex = min(nums)
    sorted.push(nums[minIndex])
    // remove from nums
    nums.splice(minIndex, 1)
  }
  return sorted
}

function min(nums: number[]): number {
  let min = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < nums[min]) min = i
  }
  return min
}

function selectionSort(nums: number[]): number[] {
  return recur(nums, [])
}
function recur(nums: number[], acc: number[]): number[] {
  if (!nums.length) return acc
  let minInd = min(nums)
  let newAcc = [...acc, nums[minInd]] 
  nums.splice(minInd, 1)
  return recur(nums, newAcc)
}

test("[1, 4, 10, 2, 3, 7, 8, 6, 5, 9]", () => {
  const nums = [1, 4, 10, 2, 3, 7, 8, 6, 5, 9]
  const output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const rv = selectionSort(nums)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[0, 3, 1, 2, 5, 6, 4, 8, 10, 7, 9 ]", () => {
  const nums = [0, 3, 1, 2, 5, 6, 4, 8, 10, 7, 9 ]
  const output = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const rv = selectionSort(nums)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})