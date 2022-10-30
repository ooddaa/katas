const util = require('util')
const log = (...items/* : any */) =>
  items.forEach((item) =>
    console.log(util.inspect(item, { depth: null, colors: true }))
  );
const arr = [
    {
      labels: ["Node"],
      properties: {
        name: "root",
        value: 0,
      },
    },
    {
      labels: ["Node"],
      properties: {
        name: "child1",
        value: 1,
      },
    },
    {
      labels: ["Node"],
      properties: {
        name: "child2",
        value: 2,
      },
    },
    {
      labels: ["Node"],
      properties: {
        name: "child3",
        value: 3,
      },
    },
  ]
const enode = {
  labels: ["Node"],
  properties: {
    name: "root",
    value: 0,
  },
  relationships: [
    {
      labels: ['CUSTOM_NEXT'],
      properties: {
        startName: "root",
        endName: "child1"
      },
      partnerNode: {
        labels: ["Node"],
        properties: {
          name: "child1",
          value: 1,
        },
        relationships: [
          {
            labels: ['CUSTOM_NEXT'],
            properties: {
              startName: "child1",
              endName: "child2"
            },
            partnerNode: {
              labels: ["Node"],
              properties: {
                name: "child2",
                value: 2,
              },
              relationships: [
                {
                  labels: ['CUSTOM_NEXT'],
                  properties: {
                    startName: "child2",
                    endName: "child3"
                  },
                  partnerNode: {
                    labels: ["Node"],
                    properties: {
                      name: "child3",
                      value: 3,
                    }
                  },
                }
              ]
            },
          }
        ]
      },
    }
  ]
}

/**
 * 
 * @param {*} arr 
 * @param {(startEnode, endEnode) => { labels: string[], properties?: Object }} fn - receives parent and child nodes and returns an object to use to describe relationship between them
 * @returns 
 */
function buildDeepEnode(arr/* : Object[] */, fn /*? : (startEnode, endEnode) => Object */)/* : Object */ {
  const [startNode, ...descendants] = arr

  let acc = { ...startNode, relationships: [] } // if no acc, take first el as acc and remove it from array
  if (descendants && descendants.length) {

    // describe relationship
    if (fn && typeof fn === 'function') {
      return {
        ...acc,
        relationships: [
          {
            ...fn(startNode, descendants[0]),
            partnerNode: buildDeepEnode(descendants, fn)
          }
        ]
      }
    }
    return {
      ...acc,
      relationships: [
        {
          labels: ['NEXT'],
          partnerNode: buildDeepEnode(descendants, fn)
        }
      ]
    }
  }

  return acc
}


function describeRel(start, end) {
  return {
    labels: ['CUSTOM_NEXT'],
    properties: { startName: start.properties.name, endName: end.properties.name },
  }
}

test("with relationship description function", () => {
  const rv = buildDeepEnode(arr, describeRel)
  // log('result', rv)
  expect(rv).toMatchObject(enode)
})

test("with filter function to make custom relationships", () => {

  function describeCustomRel(start, end) {
    if (start.properties.name === 'root') {
      return {
        labels: ['SPECIAL_CASE'],
        properties: { superProp: 'hey' },
      }
    }
    return {
      labels: ['CUSTOM_NEXT'],
      properties: { startName: start.properties.name, endName: end.properties.name },
    }
  }
  const rv = buildDeepEnode(arr, describeCustomRel)
  // log('result', rv)
  expect(rv.relationships[0].labels).toEqual(['SPECIAL_CASE'])
})

