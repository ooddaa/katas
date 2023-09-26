import {test, expect} from "bun:test"

/* 
*/
function solution(nums: number[], target: number): number|null {
  // find min
  let offset: number = Infinity
  for (let i=0; i < nums.length; i++) {
    if (nums[i] < offset) offset = i
  }
  let sorted = [...nums.slice(offset), ...nums.slice(0, offset)]

  let rv = bs(sorted, target)
  if (rv == null) return null 
  return rv + offset
}

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
test(`[4,5,1,2,3]`, () => {
  const rv = solution([4,5,1,2,3], 1)
  expect(rv).toBe(2)
})
test(`[4,8,9,88,1,2,3]`, () => {
  const rv = solution([4,8,9,88,1,2,3], 88)
  expect(rv).toBe(3)
})
// test(`["a", "b", " ", " ", "c", "d", " ", " ", "e", "f"]`, () => {
//   const rv = solution(["a", "b", " ", " ", "c", "d", " ", " ", "e", "f"])
//   const output = ["e", "f", " ", " ", "c", "d", " ", " ", "a", "b"]
//   expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
// })

// function bs(list: number[], target: number) {
//   let left = 0, right = list.length - 1
//   let mid = Math.floor(list.length/2)
//   while (left <= right) {
//     if (target == list[mid]) return mid
//     if (target < list[mid]) {
//       right = mid - 1
//       mid = Math.floor((left+right)/2)
//     }
//     if (target > list[mid]) {
//       left = mid + 1
//       mid = Math.floor((left + right)/2)
//     }
//   }
//   return null
// }

// function bs(list: number[], target: number, pivots = []) {
//   // console.dir({list})
//   if (!list.length) return sum(pivots)
//   if (list.length == 1) return sum(pivots)
//   let pivot = Math.floor(list.length/2)
//   let [left, right] = [list.slice(0, pivot), list.slice(pivot)]
//   console.dir({list, left, right, pivot})
//   if (right[0] == target) {
//     // console.dir({list, left, right, pivot})
//     return sum([pivot, ...pivots])
//   }
//   if (right[0] > target) return  [-bs(left, target), ...pivots]
//   return [bs(right, target), ...pivots]
// }

// function bs(list: number[], target: number, acc: number[] = []): number[] {
//   const middle = Math.floor(list.length/2)
//   if (target == list[middle]) return [...acc, middle]
//   // if (target == list[middle]) return sum([...acc, middle])
//   if (target < list[middle]) return bs(list.slice(0, middle), target, [middle, ...acc])
//   return bs(list.slice(middle), target, [...acc, middle])
// }