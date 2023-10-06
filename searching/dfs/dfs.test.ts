import {test, expect} from "bun:test"
import { flatten, flattenDeep, uniq } from "lodash"

/* 
https://en.wikipedia.org/wiki/Depth-first_search
https://www.youtube.com/watch?v=TIbUeeksXcI&list=PLiQ766zSC5jMZgWWdqy_6TpLivRGQaFD-&index=23&ab_channel=BackToBackSWE
https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
Depth-first search: [n1,..,n] are r's children, n1 is exhaustively traversed before n2
can be: 
0. pre-order <- implemented below
1. in-order
2. post-order

DFS => stack (LIFO)
C worst case - O (V + E) E = V * 2 + 1
T wc - O(V) as needs to store visited nodes
Breadth-first search is less space efficient than depth-first search because BFS keeps a priority queue of the entire frontier while DFS maintains a few pointers at each level.
If it is known that an answer will likely be found far into a tree, DFS is a better option than BFS. BFS is good to use when the depth of the tree can vary or if a single answer is needed — for example, the shortest path in a tree. If the entire tree should be traversed, DFS is a better option.
BFS always returns an optimal answer, but this is not guaranteed for DFS.
*/

function dfs_iteration(tree: Node): Node[] {
  // init stack
  const stack: Node[] = [tree]
  const seen = new Set()
  const acc: Node[] = []
  while (stack.length) {
    const node = stack.pop()
    if (!seen.has(node!.id)) {
      seen.add(node!.id)
      acc.push(node!)
    }
    for (let child of node!.children.reverse()) {
      if (!seen.has(child.id)) {
        stack.push(child)
      }
    }
  }
  return acc
}

function dfs_recursion(tree: Node): Node[] {
  return recur(tree, ["root"])//.map(arr => flatten(arr))
  // return tree.children.map(node => recur(node, ["root"]))
}

// how do I return acc [[a],[b,c,d],[f,g]]
// we don't track seen/visited nodes as we are sure
// there is a tree and no circular dependencies
function recur(node, acc: string[] = []) {
  // stack is the callstack
  // explores all paths and returns Node[][] each path is a list
  // we can flatten + unique things and this will give us the correct order
  if (!node.children.length) return acc
  return node.children.map(child => recur(child, [...acc, getId(child)]))
}

function chunk(list, delim) {
  let rv: string[][] = []
  let chunk: string[] = []
  list.forEach((element: string)  => {
    if (element == delim) {
      chunk.length && rv.push(chunk)
      chunk = [element]
    } else {
      chunk.push(element)
    }
  });
  rv.push(chunk)
  return rv
}


type Node = {
  id: string,
  value: number,
  children: Node[]
}
const tree = { 
  id: 'root', value: 0, children: [
  { id: 'a', value: 5, children: [
    { id: 'b', value: 4, children: []},
  ]},
  { id: 'c', value: 3, children: [
       { id: 'd', value: 2, children: [
         { id: 'e', value: 1, children: [
            { id: 'f', value: 1, children: []},
         ]},
       ]},
       { id: 'g', value: 0, children: [
        { id: 'h', value: 10, children: []},
       ]},
  ]},
  { id: 'i', value: 6, children: [
     { id: 'j', value: 1, children: []},
     { id: 'k', value: 5, children: []},
  ]},
]}

test("returns all children in correct order recursion", () => {
  const rv = uniq(flattenDeep(dfs_recursion(tree)))
  const output = ["root", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("all_paths", () => {
  const rv1 = dfs_recursion(tree)
  const rv = chunk(flattenDeep(rv1), "root")
  const output = [["root", "a", "b"], ["root", "c", "d", "e", "f"], ["root", "c", "g", "h"], ["root","i", "j"], ["root", "i", "k"]]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test("returns all children in correct order iteration", () => {
  const rv = dfs_iteration(tree).map(getId)
  const output = ["root", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})

function getId(node) {
  return node.id
}

// /* 
// Iteration with a Stack (LIFO) data structure 
// with hashmap for seen nodes 
// */
// function dfs_iteration(tree: Node): Node[] {
//   const seen = new Set()
//   const stack: Node[] = [tree]
//   const acc: Node[] = []
  
//   // put node on stack
//   while (stack.length) {
//     // console.dir({stack})
//     // pull the node off the top of the stack
//     let node = stack.pop()

//     // process if not seen
//     if (!(node!.id in seen)) {
//       // add to seen
//       seen.add(node!.id)
//       // just add to acc
//       acc.push(node!)
//     } 
//     // go deeper - put its children on stack
//     // don't forget that to add children to 
//     // to stack in reverse order LIFO
//     for (let kid of node!.children.reverse()) {
//       if (!seen.has(kid.id)) stack.push(kid)
//     }
//   }
//   return acc
// }

// function dfs_recursion(tree: Node, fn: Function): Node[] {
//   return recur(tree, new Set(), [], fn) 
// }

// function recur(node, seen, acc, fn) {
//   let {id, children} = node
//   if (!children.length) { 
//     // console.dir({node, seen, acc})
//     return [...acc, node].map(fn)
//   }
//   if (!(id in seen)) {
//     // process
//     console.dir({ id })
//     seen.add(id)
//     return children.map(child => recur(child, seen, [...acc, node], fn))
//   }
//   return children.map(child => recur(child, seen, acc, fn))
// }