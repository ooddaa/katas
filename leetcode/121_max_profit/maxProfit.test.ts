import {test, expect} from "bun:test"

// function solution(prices: number[]): number {
//   let buy = 0, sell = 1, profit = prices[sell] - prices[buy]
//   for (; sell < prices.length; sell++) {
//     if (prices[sell] < prices[buy]) {
//       buy = sell
//     } else {
//       profit = Math.max(profit, prices[sell] - prices[buy])
//     }
//   } 
//   return profit > 0 ? profit : 0
// };
// function solution(prices: number[]): number {
//   let min = prices[0]
//   let max = 0
  
//   for (let i = 1; i < prices.length; i++) {
//     min = Math.min(min, prices[i])
//     max = Math.max(max, prices[i] - min)
//   }
  
//   return max
// }
/* 
[8,3,2,3,7,1,3]

[8,3]
min = 8
max = 0

i = 1
min = Math.min(8, 3) = 3
max = Math.max(0, 3 - 3) = 0

i = 2
min = Math.min(3, 2) = 2
max = Math.max(0, 2 - 2) = 0

i = 3
min = Math.min(2, 3) = 2
max = Math.max(0, 3 - 2) = 1

i = 4
min = Math.min(2, 7) = 2
max = Math.max(1, 7 - 2) = 5
*/

function solution(prices: number[]): number {
  let buy = prices[0], i = 1, profit = 0;
  for (; i < prices.length; i++) {
    buy = Math.min(buy, prices[i])
    profit = Math.max(profit, prices[i] - buy)
  }
  return profit
};

test("[7,1,5,3,6,4]", () => {
  const nums = [7,1,5,3,6,4]
  const rv = solution(nums)
  expect(rv).toBe(5)
})
test("[7,6,4,3,1]", () => {
  const nums = [7,6,4,3,1]
  const rv = solution(nums)
  expect(rv).toBe(0)
})
test("[8,3,2,3,7,1,3]", () => {
  const nums = [8,3,2,3,7,1,3]
  const rv = solution(nums)
  expect(rv).toBe(5)
})
test("[]", () => {
  const nums = []
  const rv = solution(nums)
  expect(rv).toBe(0)
})