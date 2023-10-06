import {test, expect} from "bun:test"

/* 

[4, 5, 6]
[4, 2, 3]

1. max(day) == max(bank)


d [4, 5, 6]
b [4, 5, 6]

p  [4, 2, 3]
b0 [4, 1, 2]
b1 [0, 1, 2]

p  [4, 2, 3]
b0 [4, 5, 4]
b1 [4, 3, 1]
*/

function zip(a, b) {
  const list: [number, number][] = []
  for (let i = 0; i < a.length; i++) {
    list.push([a[i], b[i]])
  }
  return list
}

function solution1(days: number[], prices: number[]) {
  return recur(zip(days, prices), days[0], [])
}
/* 
0 
[[4,4], [5,2], [6,3]]  []
[4,4]                  [[[4,4], _, _], [_, [5,2], [6,3]], [_, _, [6,3]]]
*/
function recur(list: number[][], bank: number, acc: number[][]) {
  if (!list.length) return acc
  const [day, price] = list[0]
  // I want to branch into 2 branches
  // a. we didn't buy it
  // b. we bought it (if we can)
  if (price >= bank) {
    return [
      // we make purchase
      [...recur(list.slice(1), bank - price + 1, [...acc, [day, price]])],
      // we don't make purchase
      [...recur(list.slice(1), bank + 1, acc)],
    ]
  } 
  return [
    // we don't make purchase coz we don't have the money
    [...recur(list.slice(1), bank + 1, acc)]
  ]
}

function shouldBuy(list, [day, price], bank) {
  // console.dir({fun: "shouldBuy", item: [day, price], bank, list})
  if (!list.length && bank >= price) return true
  // looks further down the list
  // if finds an item that is 
  // a. cheaper  
  //   newItemPrice < price
  //   and could not be bought if we spend on price
  //   (bank - price) < newItemPrice
  //  then we will lose money and should skip buying => false
  // [
  //   [ 2, 3 ], [ 4, 4 ], [ 5, 2 ], [ 6, 3 ]
  // ]
  // [ [ 4, 4 ], [ 5, 2 ], [ 6, 3 ] ]
  // const list = [[ 5, 2 ], [ 6, 3 ]]
  // const day = 4
  // const price = 4
  // const bank = 4
  let buy = true
  let i = 0
  while (buy && i < list.length) {
    const is_cheaper = list[i][1] < price
    const would_be_affordable = (bank - price + (list[i][0] - day)) < list[i][1]
    // console.dir({ curItem: [day, price], nextItem: list[i], is_cheaper, would_be_affordable})
    if (is_cheaper && would_be_affordable) {
      // should buy this
      buy = false
    }
    // if ()
    i++
    
  } 
  return buy
}

function solution(days: number[], prices: number[]) {
  // find all cheapest ones and buy them
  // we assume days/prices are sorted by days in asc
  let list = zip(days, prices)//.sort((a, b) => {return a[1] - b[1]})
  if (!list.length) return []
  const gifts: number[][] = []
  let min = 0
  let bank = list[0][0] 
  
  for (let i = 0; i < list.length; i++) {
    let [day, price] = list[i]
    // adjust bank by diff in days
    bank += list[i-1] == undefined ? 0 : list[i][0] - list[i-1][0]
    // console.dir({day, bank, list, item: list[i], shouldBuy: shouldBuy(list.slice(1), list[i], bank)})
    // do we have bank to buy it?
    if (bank < price) continue
     
    // if price <= min, buy
    if (shouldBuy(list.slice(i), list[i], bank)) {
    // if (price <= min ) {
      gifts.push(list[i])
      // update min
      min = price
      // decrease bank
      bank -= price  
    }
  }

  return gifts
}

test("first", () => {
  const rv = solution([2, 4, 5, 6], [3, 4, 2, 3])
  const output = [[5,2], [6,3]]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("second", () => {
  const rv = solution([2,3,10,12,15], [2,1,5,4,3])
  const output = [[2,2], [3,1], [10,5], [12,4], [15,3]]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("third", () => {
  const rv = solution([], [])
  const output = []
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})