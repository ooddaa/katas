import {test, expect} from "bun:test"

/* 
https://en.wikipedia.org/wiki/Insertion_sort
is a simple in-place sorting algorithm that builds the final sorted array (or list) one item at a time by comparisons. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. 

scans backwards

worst/avg On^2 for comparisons & swaps

Adaptive, i.e., efficient for data sets that are already substantially sorted: the time complexity is O(kn) when each element in the input is no more than k places away from its sorted position (sortKMessedArray)

asc, in-place
0. start with i=1
1. compare it with i-1
2. if i > i-1, i++
    else find i's correct position, and replace it
3. i++
*/
function insertionSort1(nums: number[]): number[] {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i-1] > nums[i]) {
      const num = nums[i]
      // here is where we can optimise - search for position
      // in a bounded range
      const pos = findPosition(nums.slice(0, i), num)
      // move number into appropriate spot
      nums = [...insertAt(nums.slice(0, i+1), pos, num), ...nums.slice(i+1)]
    } 
  }
  return nums
}

function insertAt(nums: number[], pos: number, num: number): number[] {
  for (let i = nums.length-1; i >= pos; i--) {
    if (i > pos) {
      nums[i] = nums[i-1]
    } else {
      nums[i] = num
    }
  }
  return nums
}

function findPosition(nums: number[], num: number): number {
  let position = 0;
  if (!nums.length) return 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < num) position = i+1
  }
  return position
}

function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let x = arr[i]
      let j = i-1

      while(j >= 0 && arr[j] > x) {
        arr[j+1] = arr[j]
        j-- 
      }
      arr[j+1] = x
    }
    return arr
}

test("[1, 4, 10, 2, 3, 7, 8, 6, 5, 9]", () => {
  const nums = [1, 4, 10, 2, 3, 7, 8, 6, 5, 9]
  const output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const rv = insertionSort(nums)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[0, 1, 2, 3, 4]", () => {
  const nums = [0, 1, 2, 3, 4]
  const output = [0, 1, 666, 2, 3]
  const rv = insertAt(nums, 2, 666)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[0, 4, 3, 2]", () => {
  const nums = [0, 4, 3, 2]
  const output = [0, 2, 4, 3]
  const rv = insertAt(nums, 1, 2)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[0, 1, 3, 4]", () => {
  const nums = [0, 1, 3, 4]
  const output = 2
  const rv = findPosition(nums, 2)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[0, 4, 3, 2]", () => {
  const nums = [0, 4, 3, 2]
  const output = 1
  const rv = findPosition(nums, 1)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[0, 3, 1, 2, 5, 6, 4, 8, 10, 7, 9 ]", () => {
  const nums = [0, 3, 1, 2, 5, 6, 4, 8, 10, 7, 9 ]
  const output = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const rv = insertionSort(nums)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})