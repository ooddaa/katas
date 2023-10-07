import {test, expect} from "bun:test"

function isAnagram(s: string, t: string): boolean {
  const s2 = s.split('').sort()
  const t2 = t.split('').sort()
  return s2.map((str, i) => str == t2[i]).every((x) => x)
};


test("cat rat", () => {
  const rv = isAnagram('cat', 'rat')
  expect(rv).toBe(false)
})
test("cat tca", () => {
  const rv = isAnagram('cat', 'tca')
  expect(rv).toBe(true)
})