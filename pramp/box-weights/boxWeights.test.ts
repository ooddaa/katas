import { test, expect } from "bun:test";
// https://www.pramp.com/challenge/L3wQBnQYAEh5K97W9ONK

function solution1(nums: number[], limit: number): [number, number] | [] {
  let left: number;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < limit) {
      left = i;
      for (let j = 0; j < nums.length; j++) {
        if (i !== j && nums[i] + nums[j] == limit) return i > j ? [i, j] : [j, i];
      }
    }
  }
  return [];
}

function solution(nums: number[], limit: number): [number, number] | [] {
  const acc = {}
  for (let i = 0; i < nums.length; i++) {
    const complement = limit - nums[i]
    if (complement in acc) return i > acc[complement] ? [i, acc[complement]] : [acc[complement], i]
    acc[nums[i]] = i
   }
  return [];
}


test("[] 21", () => {
  const nums = [];
  const limit = 21;
  const rv = solution(nums, limit);
  expect(JSON.stringify(rv)).toBe(JSON.stringify([]));
});
test("[14, 16, 10, 15, 16] 21", () => {
  const nums = [14, 16, 10, 15, 16];
  const limit = 21;
  const rv = solution(nums, limit);
  expect(JSON.stringify(rv)).toBe(JSON.stringify([]));
});
test("[4,4] 8", () => {
  const nums = [4,4];
  const limit = 8;
  const rv = solution(nums, limit);
  expect(JSON.stringify(rv)).toBe(JSON.stringify([1,0]));
});
test("[4, 6, 10, 15, 16] 21", () => {
  const nums = [4, 6, 10, 15, 16];
  const limit = 21;
  const rv = solution(nums, limit);
  expect(JSON.stringify(rv)).toBe(JSON.stringify([3, 1]));
});
test("[12,6,7,14,19,3,0,25,40] 7", () => {
  const nums = [12,6,7,14,19,3,0,25,40];
  const limit = 7;
  const rv = solution(nums, limit);
  expect(JSON.stringify(rv)).toBe(JSON.stringify([6, 2]));
});

