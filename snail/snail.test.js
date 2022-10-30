// function snail(matrix) {
//   const rv = []
//   while (matrix.length) {
//     rv.push(matrix.shift)
//     matrix.map(row => rv.push(row.pop()))
//     matrix.reverse().map()
//     // rv.push(...matrix.map(row => row.pop()))
//     // rv.push(...matrix.reverse().map(row.reverse() =>))
//   }
//   return rv
// }

// function snail(array) {
//   var vector = [];
//   while (array.length) {
//     console.log('init', 'vector', vector, 'array', array)
//     vector.push(...array.shift());
//     console.log('first', 'vector', vector, 'array', array)
//     array.map(row => vector.push(row.pop()));
//     console.log('second', 'vector', vector, 'array', array)
//     array.reverse().map(row => row.reverse());
//     console.log('last', 'vector', vector, 'array', array)
//   }
//   return vector;
// }

function snail(array) {
  const vector = []

  while (array.length) {
    vector.push(...array.shift())
    array.map(row => vector.push(row.pop()))
    array.reverse().map(row => row.reverse())
  }

  return vector
}

describe("Tests", () => {
  test("test", () => {
    
    // expect(snail([[]])).toEqual([])
    // expect(snail([[1]])).toEqual([1])

    const a = snail([
      [1, 2, 3], 
      [4, 5, 6], 
      [7, 8, 9]]
    )

    expect(a).toEqual([1, 2, 3, 6, 9, 8, 7, 4, 5])

    const b = [
      [1,   2,  3,  4,  5], 
      [6,   7,  8,  9, 10], 
      [11, 12, 13, 14, 15], 
      [16, 17, 18, 19, 20], 
      [21, 22, 23, 24, 25]]

    // expect(snail(b)).toEqual([1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13])
    
    const c = [[1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 7], [19, 32, 33, 34, 25, 8], [18, 31, 36, 35, 26, 9], [17, 30, 29, 28, 27, 10], [16, 15, 14, 13, 12, 11]]
    
    expect(snail(c)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36])

  });
});



function snail2(matrix /* :number[][] */, acc = []) {

  if (!matrix.length || !matrix[0].length) return acc
  if (matrix[0].length === 1) return [...acc, matrix[0][0]]

  const [firstRow, mid, lastRow] = [
    matrix.slice(0, 1), 
    matrix.slice(1, matrix.length-1), 
    matrix.slice(matrix.length-1, matrix.length)
  ]

  const takeFirst = (arr) => arr[0]
  const takeLast = (arr) => arr[arr.length-1]
  const trim = (matrix) => matrix.map(row => row.slice(1, row.length-1))
  const newAcc = [
    ...acc, 
    ...takeFirst(firstRow), 
    ...mid.map(takeLast), 
    ...takeFirst(lastRow).reverse(), 
    ...(mid.map(takeFirst).reverse())
  ]

  return snail(trim(mid), newAcc)
}
