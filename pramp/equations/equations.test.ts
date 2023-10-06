import {test, expect} from "bun:test"
import {flattenDeep, isNumber, isArray} from "lodash"

/* 
{
  a: [
    [ "b", 2 ], [ "z", 6 ]
  ],
  b: [
    [ "a", 2 ], [ "c", 3 ]
  ],
  c: [
    [ "b", 3 ]
  ],
  z: [ "a", 6 ]
} 
*/
function buildTree(equations, values): Map {
  return equations.reduce((acc, eq, i) => {
    let [left, right] = eq
    if (left in acc) {
      acc[left].push([right, values[i]])
    } else {
      acc[left] = [[right, values[i]]]
    }

    if (right in acc) {
      acc[right].push([left, 1/values[i]])
    } else {
      acc[right] = [[left, 1/values[i]]]
    }
    return acc
  }, {})
}

function solution(equations, values, input) {
  const tree = buildTree(equations, values) 
  // console.log({tree})
  // console.log({tree});
  
  return input.map(([from, target]) => {
    if (!(from in tree) || !(target in tree)) return null
    if (from == target) return 1.0
    return recur(tree[from], [from,target], tree, new Set(from))
  })
}

type Rel = [string, number]
function recur(rels, [from, target], tree, seen = new Set(), path: Rel[] = [], acc: Rel[][] = []) {
  // if (rels == undefined) return acc
  /* 
  ["a", "c"]
  [["a", "b"], ["b", "c"]]
  [ "a", "b", "c" ]
  [ 2, 3 ] 
  6
  */
  if (!rels.length) {
    // in case there is no solution
    if(flattenDeep(acc).includes([from, target])) return acc
    return []
  }

  const [head, ...tail] = rels
  const [node, val] = head

  // stop when we find the target
  if (node == target) {
    path.push(head)
    acc.push(path)
    return acc
  }

  // process new node 
  if (!seen.has(node)) {
    seen.add(node)
    return recur(tree[node], [from, target], tree, seen, [...path, head], acc)
  } 
  
  return recur(tail, [from, target], tree, seen, path, acc)
}

test("first", () => {
  const rv = solution([["a", "b"], ["b", "c"]], [2.0, 3.0], [["a", "c"], ["a", "e"], ["a", "a"] ,["x", "x"]])
  // console.log(rv)
  const res = rv.map(path => path !== null ? flattenDeep(path).filter(isNumber).reduce((a, b) => a *= b, 1) : path)
  const output = [6.0, null, 1.0, null]
  expect(JSON.stringify(res)).toBe(JSON.stringify(output))
})
test("second", () => {
  const rv = solution([["a", "b"], ["b", "c"], ["a", "z"]], [2.0, 3.0, 6.0], [["a", "c"], ["a", "e"], ["a", "a"], ["x", "x"], ["b", "z"]])
  const res = rv.map(path => path !== null ? flattenDeep(path).filter(isNumber).reduce((a, b) => a *= b, 1) : path)
  const output = [6.0, null, 1.0, null, 3.0]
  expect(JSON.stringify(res)).toBe(JSON.stringify(output))
})
test("third - empty inputs", () => {
  const rv = solution([["a", "b"], ["b", "c"], ["a", "z"]], [2.0, 3.0, 6.0], [])
  const res = rv.map(path => path !== null ? flattenDeep(path).filter(isNumber).reduce((a, b) => a *= b, 1) : path)
  const output = []
  expect(JSON.stringify(res)).toBe(JSON.stringify(output))
})
test("fourth - no solution", () => {
  const res = solution([["a", "b"], ["b", "c"], ["a", "z"], ["y", "w"]], [2.0, 3.0, 6.0, 7.0], [["a", "y"]])
  const output = []
  expect(JSON.stringify(flattenDeep(res))).toBe(JSON.stringify(output))
})
