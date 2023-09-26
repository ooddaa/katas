import {test, expect} from "bun:test"

function reverseList(list: any[]): any[] {
  let temp;
  for (let left = 0, right = list.length - 1; left <= right;) {
    temp = list[left]
    list[left] = list[right]
    list[right] = temp
    left++
    right--
  }
  return list
};

test("[1,2,3,4,5]", () => {
  const list = [1,2,3,4,5]
  const rv = reverseList(list)
  expect(JSON.stringify(rv)).toBe(JSON.stringify([5,4,3,2,1]))
})
test("[0,1,2,3,4,5]", () => {
  const list = [0,1,2,3,4,5]
  const rv = reverseList(list)
  expect(JSON.stringify(rv)).toBe(JSON.stringify([5,4,3,2,1,0]))
})

function reverseList1(list: any[]): any[] {
  let temp;
  for (let i=0; i < Math.floor(list.length/2); i++) {
    temp = list[i]
    list[i] = list[list.length - 1 - i]
    list[list.length - 1 - i] = temp
  }
  return list
};