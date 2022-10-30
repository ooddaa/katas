const cloneDeep = require("lodash/cloneDeep")
/**
 * Inspired by Elixir's Enum.chunk_every/3
 * pure function
 */
function chunk_every(arr_, size, step) {
  const arr = cloneDeep(arr_)
  const holder = []
  if (!step) {
    while (arr.length > 0) holder.push(arr.splice(0, size))
    return holder
  } 

  /* with step */
  const gap = size - step
  let left = 0
  let right = left + size

  holder.push(arr.slice(left, right))

  while (right < arr.length) {
    left = right - gap
    right = right > arr.length ? arr.length : left + size
    holder.push(arr.slice(left, right))
  }

  return holder
}

const arr = [1, 2, 3, 4]
describe('test', () => {
  test('simple', () => {
    expect(chunk_every([1, 2, 3, 4], 1)).toEqual([[1], [2], [3], [4]])
    expect(chunk_every([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]])
    expect(chunk_every([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]])
    expect(chunk_every([1, 2, 3, 4], 4)).toEqual([[1, 2, 3, 4]])
    expect(chunk_every([1, 2, 3, 4], 5)).toEqual([[1, 2, 3, 4]])
  })
  test('with steps', () => {
    expect(chunk_every([1, 2, 3, 4], 2, 1)).toEqual([[1, 2], [2, 3], [3, 4]])
    expect(chunk_every([1, 2, 3, 4, 5], 2, 1)).toEqual([[1, 2], [2, 3], [3, 4], [4, 5]])

    expect(chunk_every([1, 2, 3, 4], 2, 2)).toEqual([[1, 2], [3, 4]])
    expect(chunk_every([1, 2, 3, 4, 5], 2, 2)).toEqual([[1, 2], [3, 4], [5]])
    expect(chunk_every([1, 2, 3, 4], 2, 3)).toEqual([[1, 2], [4]])
  })
})