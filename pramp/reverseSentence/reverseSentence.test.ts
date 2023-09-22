import {test, expect} from "bun:test"

/* 
*/
function solution(input: string[]) {
  const result: string[][] = []
  let inWord = true
  let word: string[] = []
  for (let i = 0; i < input.length; i++) {
    if (inWord) {
      if (input[i+1] == " " || input[i+1] == undefined) {
        word.push(input[i])
        result.push(word)
        word = []
        inWord = false
        // console.dir({action: "reset to inWord", i, word, result})
      } else {
        word.push(input[i])
        // console.dir({action: "push char", i, word, result})
      }
    } else {
      if (input[i+1] != " " || input[i+1] == undefined) {
        word.push(input[i])
        result.push(word)
        word = []
        inWord = true
        // console.dir({action: "reset to inWord", i, word, result})
      } else {
        word.push(input[i])
        // console.dir({action: "push space", i, word, result})
      }
    }
  }
  return flatten(result.reverse())
}

function flatten(list: any, acc: any[] = []): any[] {
  if (!list.length) return acc
  if (typeof list[0] !== "object") return [...acc, list[0], ...flatten(list.slice(1))]
  return [...acc, ...flatten(list[0]), ...flatten(list.slice(1))]
}

test(`[" ", " "]`, () => {
  const rv = solution([" ", " "])
  const output = [" ", " "]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})
test(`["a", "b", " ", " ", "c", "d", " ", " ", "e", "f"]`, () => {
  const rv = solution(["a", "b", " ", " ", "c", "d", " ", " ", "e", "f"])
  const output = ["e", "f", " ", " ", "c", "d", " ", " ", "a", "b"]
  expect(JSON.stringify(rv)).toBe(JSON.stringify(output))
})