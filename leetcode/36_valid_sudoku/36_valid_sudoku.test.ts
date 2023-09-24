import {test, expect} from "bun:test"

/* 
https://leetcode.com/problems/valid-sudoku/
*/

function isValidSudoku(board: string[][]): boolean {
  for (let row = 0; row < board.length; row++) {
    let acc = {}, acc2 = {}
    for (let i = 0; i < board.length; i++) {
      if (board[row][i] != "." && board[row][i] in acc) return false
      acc[board[row][i]] = 1
      if (board[i][row] != "." && board[i][row] in acc2) return false
      acc2[board[i][row]] = 1
    }
  }
  /* 3*3 */
  const coord: number[][] = []
  for (let row = 1; row < 9; row += 3) {
    for (let col = 1; col < 9; col += 3) {
      coord.push([row, col])
    }
  }

  for (let s = 0; s < coord.length; s++) {
    let acc: number[][] = []
    let map = {}
    acc.push([coord[s][0] - 1, coord[s][1] - 1]) 
    acc.push([coord[s][0] - 1, coord[s][1]]) 
    acc.push([coord[s][0] - 1, coord[s][1] + 1]) 
    acc.push([coord[s][0], coord[s][1] - 1]) 
    acc.push([coord[s][0], coord[s][1]]) 
    acc.push([coord[s][0], coord[s][1] + 1]) 
    acc.push([coord[s][0] + 1, coord[s][1] - 1]) 
    acc.push([coord[s][0] + 1, coord[s][1]]) 
    acc.push([coord[s][0] + 1, coord[s][1] + 1])   
    for (let i = 0; i < acc.length; i++) {
      const square = board[acc[i][0]][acc[i][1]]
      if (square !== "." && square in map) return false
      map[square] = 1
    }
  }
  return true
};

test("true", () => {
  const board = [
  ["5","3",".",".","7",".",".",".","."]
  ,["6",".",".","1","9","5",".",".","."]
  ,[".","9","8",".",".",".",".","6","."]
  ,["8",".",".",".","6",".",".",".","3"]
  ,["4",".",".","8",".","3",".",".","1"]
  ,["7",".",".",".","2",".",".",".","6"]
  ,[".","6",".",".",".",".","2","8","."]
  ,[".",".",".","4","1","9",".",".","5"]
  ,[".",".",".",".","8",".",".","7","9"]]
  const rv = isValidSudoku(board)
  expect(rv).toBe(true)
})
test("false", () => {
  const board = [["8","3",".",".","7",".",".",".","."]
  ,["6",".",".","1","9","5",".",".","."]
  ,[".","9","8",".",".",".",".","6","."]
  ,["8",".",".",".","6",".",".",".","3"]
  ,["4",".",".","8",".","3",".",".","1"]
  ,["7",".",".",".","2",".",".",".","6"]
  ,[".","6",".",".",".",".","2","8","."]
  ,[".",".",".","4","1","9",".",".","5"]
  ,[".",".",".",".","8",".",".","7","9"]]
  const rv = isValidSudoku(board)
  expect(rv).toBe(false)
})
test("false", () => {
  const board = [
    [".",".",".",".","5",".",".","1","."],
    [".","4",".","3",".",".",".",".","."],
    [".",".",".",".",".","3",".",".","1"],
    ["8",".",".",".",".",".",".","2","."],
    [".",".","2",".","7",".",".",".","."],
    [".","1","5",".",".",".",".",".","."],
    [".",".",".",".",".","2",".",".","."],
    [".","2",".","9",".",".",".",".","."],
    [".",".","4",".",".",".",".",".","."]]
  const rv = isValidSudoku(board)
  expect(rv).toBe(false)
})
