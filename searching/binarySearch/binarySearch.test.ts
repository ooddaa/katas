import {test, expect} from "bun:test"

/* 
https://en.wikipedia.org/wiki/Binary_search_algorithm
works only on sorted lists
Tasks: 
- `shifted array` - get an array that is sorted, but 
  shifted left/right/etc. Idea: unshift list and bs it.

⏰ O log n <- halves input list into left <- mid -> right
🛸 O 1 <- done on the input list
*/

function bs(list: number[], target: number): number | null {
  let left = 0, right = list.length -1, mid = Math.floor(list.length/2)
  while (left <= right) {
    if (target == list[mid]) return mid
    if (target < list[mid]) right = mid - 1 // go left
    if (target > list[mid]) left = mid + 1  // go right
    mid = Math.floor((left + right)/2)      // adjust pivot
  }
  return null
}

test(`[1,2,3,4,5]`, () => {
  const rv = bs([1,2,3,4,5], 2)
  expect(rv).toBe(1)
})
test(`[1,2,3,4,5]`, () => {
  const rv = bs([1,2,3,4,5], 5)
  expect(rv).toBe(4)
})
test(`[1,2,3,5,8,9,12,23,55,99]`, () => {
  const rv = bs([1,2,3,5,8,9,12,23,55,99], 23)
  expect(rv).toBe(7)
})

