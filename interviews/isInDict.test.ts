import {test, expect} from "bun:test"


class Dictionary {
  list: Set<string>
  constructor(list: string[]) {
    this.list = new Set(list)
  }

  static setup(list: string[]): Dictionary {
    return new Dictionary(list)
  }
  isInDict(word: string): boolean {
    // cat -> *at
    // cater -> *at == false
    return [...this.list]
      .filter(item => item.length == word.length)
      .map((item: string) => {
        const wordArr = word.split("")
        const itemArr = item.split("")
        return wordArr.map((el,i) => {
          // console.log({i, el})
          if (el == `*`) return true
          if (el == itemArr[i]) return true
          return false
        }).every(el => el == true)
      }).some(el => el == true)
  }
  isInDict2(word: string): boolean {
    const regexTemplate = word.replaceAll("*", ".")
    const regex = new RegExp(`^${regexTemplate}$`)
    return [...this.list].some(item => regex.test(item))
  }
}

test("true", () => {
  const test = new Dictionary(["cat", "lol"])
  const rv = test.isInDict("cat")
  expect(rv).toBe(true)
})
test("true", () => {
  const test = Dictionary.setup(["cat"])
  const rv = test.isInDict("cat")
  expect(rv).toBe(true)
})
test("false", () => {
  const rv = new Dictionary(["cat", "lol"]).isInDict("lsdfasd")
  expect(rv).toBe(false)
})
test("wildcard true", () => {
  const rv = 
    new Dictionary(["cat", "car", "bat"])
    .isInDict("*at")
  expect(rv).toBe(true)
})
test("wildcard false", () => {
  const rv = 
    new Dictionary(["cater"])
    .isInDict("*at")
  expect(rv).toBe(false)
})
test("wildcard true", () => {
  const rv = 
    new Dictionary(["cat"])
    .isInDict("*a*")
  expect(rv).toBe(true)
})



