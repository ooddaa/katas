import {test, expect} from "bun:test"

/* 
Breadth-first search
level-order traversal
bfs => queue (FIFO)
Breadth-first search is less space efficient than depth-first search because BFS keeps a priority queue of the entire frontier while DFS maintains a few pointers at each level.
https://brilliant.org/wiki/breadth-first-search-bfs/
https://en.wikipedia.org/wiki/Breadth-first_search
https://www.youtube.com/watch?v=TIbUeeksXcI&list=PLiQ766zSC5jMZgWWdqy_6TpLivRGQaFD-&index=23&ab_channel=BackToBackSWE
C worst case - O (V + E) E = V * 2 + 1
T wc - O(V) as needs to store visited nodes
If it is known that an answer will likely be found far into a tree, DFS is a better option than BFS. BFS is good to use when the depth of the tree can vary or if a single answer is needed — for example, the shortest path in a tree. If the entire tree should be traversed, DFS is a better option.

BFS always returns an optimal answer, but this is not guaranteed for DFS.
*/


/* 
Iteration with a Queue (FIFO) data structure 
with hashmap for seen nodes 
*/
function bfs_iteration(tree: Node): Node[] {
  // init queue
  // unshift(val) => pop(val)
  const queue: Node[] = [tree]
  const seen = new Set()
  const acc: Node[] = []
  while (queue.length) {
    const node = queue.pop()
    if (!seen.has(node!.id)) {
      seen.add(node!.id)
      acc.push(node!)
    }
    for (let child of node!.children) {
      if (!seen.has(child!.id)) {
        queue.unshift(child)
      }
    }
  }
  return acc
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

test("returns all children in correct order", () => {
  const rv = bfs_iteration(tree)
  const output = ["root", "a", "c", "i", "b", "d", "g", "j", "k", "e", "h", "f"]
  expect(JSON.stringify(rv.map(({id})=>id))).toBe(JSON.stringify(output))
})

