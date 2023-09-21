import {test, expect} from "bun:test"

function solution(input: string[]): string[][] {
  const rv = input.reduce((acc, str) => {
    const hash = str.split("").map(s => s.charCodeAt(0)).reduce((sum, val) => sum += val, 0)
    if (hash in acc) return {...acc, [hash]: [str, ...acc[hash]]}
    return {...acc, [hash]: [str]}
  }, {})

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