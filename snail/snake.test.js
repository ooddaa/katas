

const inputMatrix  = [ [1,    2,   3,  4,    5],
                         [6,    7,   8,  9,   10],
                         [11,  12,  13,  14,  15],
                         [16,  17,  18,  19,  20] ]

const output = [1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12]

function snake(array) {
  const vector = []
  while (array.length) {
    vector.push(...array.shift())
    array.map(row => vector.push(row.pop()))
    array.reverse().map(row => row.reverse())
  }
  return vector
}

test("test", () => {
  const rv = snake(inputMatrix)
  expect(rv).toEqual(output)
})


