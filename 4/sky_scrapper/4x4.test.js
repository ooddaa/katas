// https://www.codewars.com/kata/5671d975d81d6c1c87000022/train/javascript
const util = require("util");

const log = (...items/* : any */) =>
  items.forEach((item) =>
    console.log(util.inspect(item, { depth: null, colors: true }))
  );


function solvePuzzle(clues) {
  /**
   * 1. generate all 4x4 matrix permutations - 
   * treeBuilder(children: string[]): Tree
   * 
   * Tree = { value: string, children: Tree[] }
   * 
   */
}

// function treeBuilder(children/* : string[] */)/* : Tree */ {
//   const [parent, ...kids] = children
//   return {
//     value: parent,
//     children: kids.map(kid => )
//   }
// }

function nodeBuilder(siblings) {
  const [parent, ...children] = siblings
  return {
    value: parent,
    children: children.length ? children.map(child => nodeBuilder([child])) : []
  }
}

function treeBuilder(siblings) {
  const [parent, ...children] = siblings
  return {
    value: parent,
    children: children.length ? children.map(child => treeBuilder([child, ...children.filter(x => x != child)])) : []
  }
}

function matricesPermutations(size = 3) {
  const children = ["root", "a", "b", "c"] // size 3
  const tree = treeBuilder(children)
  // now walk three depth-first
  function walkDF(children, fn, acc = []) {
    if (!children.length) return acc
    const rv = children.map(child => walkDF(child.children, fn, [...acc, fn(child)]))
    return rv
  }
  const rv = walkDF(tree.children, child => child.value, [])
  return rv
}

test("nodeBuilder - no children", () => {
  const children = ["a"]
  const tree = {
    value: "a", children: []
  }
  const rv = nodeBuilder(children)
  expect(rv).toMatchObject(tree)
})

test("nodeBuilder with children", () => {
  const children = ["a", "b", "c", "d"]
  const tree = {
    value: "a", children: [
      { value: "b", children: [] },
      { value: "c", children: [] },
      { value: "d", children: [] },
    ]
  }
  expect(nodeBuilder(children)).toMatchObject(tree)
})

test("treeBuilder with children", () => {
  const children = ["a", "b", "c"]
  const tree = {
    value: "a", children: [
      { value: "b", children: [
        { value: "c", children: [] }
      ] },
      { value: "c", children: [
        { value: "b", children: [] }
      ] },
    ]
  } 
  const rv = treeBuilder(children)
  expect(rv).toMatchObject(tree)
})

test("treeBuilder with children root", () => {
  const children = ["root", "b", "c", "d"] // size 3
  const tree = {
    value: "root", children: [
      { value: "b", children: [
        { value: "c", children: [
          { value: "d", children: [] }
        ] },
        { value: "d", children: [
          { value: "c", children: [] }
        ] }
      ] },
      { value: "c", children: [
        { value: "b", children: [
          { value: "d", children: [] }
        ] },
        { value: "d", children: [
          { value: "b", children: [] }
        ] }
      ] },
      { value: "d", children: [
        { value: "b", children: [
          { value: "c", children: [] }
        ] },
        { value: "c", children: [
          { value: "b", children: [] }
        ] }
      ] },
    ]
  } 
  const rv = treeBuilder(children)
  expect(rv).toMatchObject(tree)
})

test.only("matrices", () => {
  // const children = ["root", "a", "b", "c"] // size 3
  // const tree = treeBuilder(children)
  const expected = [
    [
      ["a","b","c"],
      ["b","c","a"],
      ["c","a","b"],
    ],
    [
      ["a","b","c"],
      ["c","a","b"],
      ["b","c","a"],
    ],
    [
      ["a","c","b"],
      ["c","b","a"],
      ["b","a","c"],
    ],
    [
      ["a","c","b"],
      ["b","a","c"],
      ["c","b","a"],
    ],


    [
      ["b","a","c"],
      ["a","c","b"],
      ["c","b","a"],
    ],
    [
      ["b","a","c"],
      ["c","b","a"],
      ["a","c","b"],
    ],
    [
      ["b","c","a"],
      ["a","b","c"],
      ["c","a","b"],
    ],
    [
      ["b","c","a"],
      ["c","a","b"],
      ["a","b","c"],
    ],


    [
      ["c","a","b"],
      ["a","b","c"],
      ["b","c","a"],
    ],
    [
      ["c","a","b"],
      ["b","c","a"],
      ["a","b","c"],
    ],
    [
      ["c","b","a"],
      ["a","c","b"],
      ["b","a","c"],
    ],
    [
      ["c","b","a"],
      ["b","a","c"],
      ["a","c","b"],
    ],
    
    
  ]
  const rv = matricesPermutations(4)
  log(rv)
  expect(rv).toMatchObject(expected)
})

const ob = {
  value: 'root',
  children: [
    // abcd
    // abdc
    // acbd
    // acdb
    // adbc
    // adcb
    {
      value: 'a',
      children: [
        {
          value: 'b',
          children: [
            { value: 'c', children: [ { value: 'd', children: [] } ] },
            { value: 'd', children: [ { value: 'c', children: [] } ] }
          ]
        },
        {
          value: 'c',
          children: [
            { value: 'b', children: [ { value: 'd', children: [] } ] },
            { value: 'd', children: [ { value: 'b', children: [] } ] }
          ]
        },
        {
          value: 'd',
          children: [
            { value: 'b', children: [ { value: 'c', children: [] } ] },
            { value: 'c', children: [ { value: 'b', children: [] } ] }
          ]
        }
      ]
    },

    // bacd
    // badc
    // bcad
    // bcda
    // bdac
    // bdca
    {
      value: 'b',
      children: [
        {
          value: 'a',
          children: [
            { value: 'c', children: [ { value: 'd', children: [] } ] },
            { value: 'd', children: [ { value: 'c', children: [] } ] }
          ]
        },
        {
          value: 'c',
          children: [
            { value: 'a', children: [ { value: 'd', children: [] } ] },
            { value: 'd', children: [ { value: 'a', children: [] } ] }
          ]
        },
        {
          value: 'd',
          children: [
            { value: 'a', children: [ { value: 'c', children: [] } ] },
            { value: 'c', children: [ { value: 'a', children: [] } ] }
          ]
        }
      ]
    },
    {
      value: 'c',
      children: [
        {
          value: 'a',
          children: [
            { value: 'b', children: [ { value: 'd', children: [] } ] },
            { value: 'd', children: [ { value: 'b', children: [] } ] }
          ]
        },
        {
          value: 'b',
          children: [
            { value: 'a', children: [ { value: 'd', children: [] } ] },
            { value: 'd', children: [ { value: 'a', children: [] } ] }
          ]
        },
        {
          value: 'd',
          children: [
            { value: 'a', children: [ { value: 'b', children: [] } ] },
            { value: 'b', children: [ { value: 'a', children: [] } ] }
          ]
        }
      ]
    },
    {
      value: 'd',
      children: [
        {
          value: 'a',
          children: [
            { value: 'b', children: [ { value: 'c', children: [] } ] },
            { value: 'c', children: [ { value: 'b', children: [] } ] }
          ]
        },
        {
          value: 'b',
          children: [
            { value: 'a', children: [ { value: 'c', children: [] } ] },
            { value: 'c', children: [ { value: 'a', children: [] } ] }
          ]
        },
        {
          value: 'c',
          children: [
            { value: 'a', children: [ { value: 'b', children: [] } ] },
            { value: 'b', children: [ { value: 'a', children: [] } ] }
          ]
        }
      ]
    }
  ]
}

test("first", () => {
  var clues = [
    2, 2, 1, 3,
    2, 2, 3, 1,
    1, 2, 2, 3,
    3, 2, 1, 3
  ];

  var expected = [
    [1, 3, 4, 2],
    [4, 2, 1, 3],
    [3, 4, 2, 1],
    [2, 1, 3, 4]
  ];

  expect(solvePuzzle(clues)).toEqual(expected)

});


