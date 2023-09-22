import {test, expect} from "bun:test"

/* 
https://en.wikipedia.org/wiki/Depth-first_search
Depth-first search
DFS
C worst case - O (V + E) E = V * 2 + 1
T wc - O(V) as needs to store visited nodes
*/
function solutionz(node: Node): number[] {
  // return recur(node, [])
  return dfs(node, [])
}

function flatten(list: any, acc: any[] = []): any[] {
  if (!list.length) return acc
  if (typeof list[0] !== "object") return [...acc, list[0], ...flatten(list.slice(1))]
  return [...acc, ...flatten(list[0]), ...flatten(list.slice(1))]
}

function dfs({value, children}: Node, acc: number[]) {
  if (!children.length) return [...acc, value].reduce((a,b) => a += b, 0)
  return flatten(children.map(node => dfs(node, [...acc, value])))
}

function solution(node: Node): number[] {
  return recur(node, [])
}

function recur({value, children}, acc: number[]): number[] {
  if (!children.length) return [...acc, value]
  return children.map((child) => recur(child, [...acc, value]))
}

type Node = {
  value: number,
  children: Node[]
}

const tree1: Node = {
  value: 0, children: [
    {value: 1, children: [
      {value: 4, children: [
        {value: 5, children: []},
      ]},
    ]},
    {value: 2, children: [
      {value: 1, children: [
        {value: 1, children: [
          {value: 1, children: []},
        ]},
      ]},
      {value: 0, children: [
        {value: 10, children: []},
      ]},
    ]},
    {value: 3, children: [
      {value: 1, children: []},
    ]},  
  ]}
/* 
[[0, 1, 4, 5], [0, 2, 1, 1, 1], [0, 2, 0, 10], [0, 3, 1]]
*/

const tree = { 
  value: 0, children: [
   { value: 5, children: [
    { value: 4, children: []},
  ]},
  { value: 3, children: [
       { value: 2, children: [
         { value: 1, children: [
            { value: 1, children: []},
         ]},
       ]},
       { value: 0, children: [
        { value: 10, children: []},
       ]},
  ]},
  { value: 6, children: [
     { value: 1, children: []},
     { value: 5, children: []},
  ]},
]}

test("flatten", () => {
  const rv = flatten([1, [2], 3, [4, [5,[6]], 7], 8])
  const output = [1,2,3,4,5,6,7,8]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("empty", () => {
  const rv = solution({value: 456, children: []})
  expect(rv).toBe(456)
})
test("largest", () => {
  const paths = solution(tree1)
  const [rv] = paths.sort((a,b) => b-a)
  expect(rv).toBe(12)
})
test("smallest", () => {
  const paths = solution(tree)
  const [rv] = paths.sort((a,b) => a-b)
  expect(rv).toBe(7)
})

// function recur({value, children}, acc: number[]): number[] {
//   if (!children.length) return [...acc, value].reduce((a,b) => a+=b, 0)
//   return flatten(children.map(node => recur(node, [...acc, value])))
// }