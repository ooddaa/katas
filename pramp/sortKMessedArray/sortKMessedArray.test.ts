import {test, expect} from "bun:test"

/* 
https://www.pramp.com/question/XdMZJgZoAnFXqwjJwnBZ
Given an array of integers arr where each element is at most k places away from its sorted position, code an efficient function sortKMessedArray that sorts arr. For instance, for an input array of size 10 and k = 2, an element belonging to index 6 in the sorted array will be located at either index 4, 5, 6, 7 or 8 in the input array.

Analyze the time and space complexities of your solution.
input:  arr = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9], k = 2

output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

Insertion Sort and Heapsort
https://en.wikipedia.org/wiki/Insertion_sort
https://en.wikipedia.org/wiki/Heapsort

https://en.wikipedia.org/wiki/Implicit_data_structure
https://en.wikipedia.org/wiki/Binary_heap#Heap_implementation
*/

function quicksort(nums: number[]): number[] {
  if (nums.length < 2) return nums
  const pivot = Math.floor(nums.length/2)
  const pivotVal = nums[pivot]
  const left = nums.filter(val => val < pivotVal)
  const right = nums.filter(val => val > pivotVal)
  return [...quicksort(left), pivotVal, ...quicksort(right)]
};

function solution(nums: number[], k: number): number[] {
  for (let i = 1; i < nums.length; i++) {
    let x = nums[i]
    let j = i - 1

    while (j >= i - k && nums[j] > x) {
      nums[j+1] = nums[j]
      j--
    }
    nums[j+1] = x
  }
  return nums
}
// function solution(nums: number[], k: number): number[] {
//   for (let i = 1; i < nums.length; i++) {
//     let x = nums[i]
//     let j = i - 1

//     while (j >= 0 && nums[j] > x) {
//       nums[j+1] = nums[j]
//       j--
//     }
//     nums[j+1] = x
//   }
//   return nums
// }
// function solution(nums: number[], k: number): number[] {
//   for (let i = 0; i < nums.length; i++) {
//     const next = i + 1
//     if (nums[i] > nums[next]) {
//       // i+1
//       const left = next - k/2
//       const right = next + k/2 + 1// slice end index is exclusive
//       nums = [...nums.slice(0, left), ...quicksort(nums.slice(left, right)), ...nums.slice(right)]
//       i = 0
//     }
//   }
//   return nums
// }

test("[1, 4, 5, 2, 3, 7, 8, 6, 10, 9]", () => {
  const nums = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9]
  const output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const rv = solution(nums, 2)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("[0, 3, 1, 2, 5, 6, 4, 8, 10, 7, 9 ]", () => {
  const nums = [0, 3, 1, 2, 5, 6, 4, 8, 10, 7, 9 ]
  const output = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const rv = solution(nums, 2)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})