/**
 * took me about 30min to write.
 * first approach stalled, as immediately started using reduce which
 * complicated things 
 * 
 * second approach was easier as I wrote terminating conditions first
 * then the rest of simple logic.
 */

const tree = {
  name: "root",
  value: 0,
  children: [
    {
      name: "child1",
      value: 1,
      children: [
        {
          name: "child2",
          value: 2,
          children: [
            {
              name: "child3",
              value: 3,
              children: []
            }
          ]
        }
      ]
    }
  ]
}

function buildTree1(arr/* : Object[] */, initAcc/*? : Object */)/* : Object */ {
  let acc_ = initAcc || { ...arr[0], children: [] }
  
  const rv = arr.reduce((acc, val) => {
    // console.log('acc', acc)
    const [head, ...tail] = arr
    // const tail = arr.slice(1)
    // log(arr)
    if (tail) {
      const newAcc = { ...acc, children: [...acc.children, buildTree(tail, acc)] }
      return newAcc
    }
    return acc
  }, acc_)

  return rv
}

function buildTree2(arr/* : Object[] */, initAcc/*? : Object */)/* : Object */ {
  if (arr.length === 0) return initAcc // no elements to work with, terminate
  const [head, ...tail] = arr
  const acc_ = initAcc || { ...head, children: [] } // if no acc, take first el as acc and remove it from array
  if (tail && tail.length && tail.length > 0) {
    const newAcc = { ...acc_, children: [buildTree2(tail)] }

    return newAcc
  }
  return acc_
  
}

function buildTree3(arr/* : Object[] */, initAcc/*? : Object */)/* : Object */ {
  if (arr.length === 0) return initAcc // no elements to work with, terminate
  const [head, ...tail] = arr
  const acc = initAcc || { ...head, children: [] } // if no acc, take first el as acc and remove it from array
  if (tail) return { ...acc, children: [buildTree(tail)] }

  return acc
}

function buildTree(arr/* : Object[] */)/* : Object */ {
  const [head, ...tail] = arr
  const acc = { ...head, children: [] } // if no acc, take first el as acc and remove it from array
  if (tail) return { ...acc, children: [buildTree(tail)] }

  return acc
}

test("first", () => {
  const arr = [
    {
      name: "root",
      value: 0,
    },
    {
      name: "child1",
      value: 1,
    },
    {
      name: "child2",
      value: 2,
    },
    {
      name: "child3",
      value: 3,
    },
  ]
  const rv = buildTree2(arr)
  // console.log('result', rv)
  expect(rv).toMatchObject(tree)
})

