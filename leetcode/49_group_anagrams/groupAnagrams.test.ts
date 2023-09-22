import {test, expect} from "bun:test"

/* 
Use a sorted string as hash. Group by this hash.
Could also check if str in acc to deal with duplicates a bit quicker.

NB
Don't use {...acc, newKey} <- this copies the acc
instead, add new key in-place: 
`acc[newKey] = blabla
return acc`
*/
function solution(input: string[]): string[][] {
  const rv = input.reduce((acc, str) => {
    const hash = str.split("").sort().join("")
    if (hash in acc) {
      acc[hash][acc[hash].length] = str
      return acc
    }
    acc[hash] = [str]
    return acc
  }, {}) as {[key: string]: string[]}

  return Object.values(rv).map((arr: string[]) => arr.sort()).sort((a: string[], b: string[]) => a.length - b.length)
};

test(`["eat","tea","tan","ate","nat","bat"]`, () => {
  const input = ["eat","tea","tan","ate","nat","bat"]
  const output = [["bat"],["nat","tan"],["ate","eat","tea"]]
  const rv = solution(input)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test(`[""]`, () => {
  const input = [""]
  const output = [[""]]
  const rv = solution(input)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test(`["a"]`, () => {
  const input = ["a"]
  const output = [["a"]]
  const rv = solution(input)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test(`["cab","tin","pew","duh","may","ill","buy","bar","max","doc"]`, () => {
  const input = ["cab","tin","pew","duh","may","ill","buy","bar","max","doc"]
  const output = [["cab"],["tin"],["pew"],["duh"],["may"],["ill"],["buy"],["bar"],["max"],["doc"]]
  const rv = solution(input)
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})