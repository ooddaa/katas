import {test, expect} from "bun:test"


/* 
https://leetcode.com/problems/valid-sudoku/
tc - O(2n) - we loop over whole board to check rows/cols & then over whole board 
      again to build squares 🫣
sc - we use 2 maps, holding max 9 elements at a time, then coord list (max 81 elements)
     + acc list (9 items) and map (9 items) == O (9 + 9 + 81 + 9 + 9) = O(127)
*/
function isValidSudoku1(board: string[][]): boolean {
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

/* 
tc - O(n) == O(81) as we walk the board once
sc - we use 3 maps with 27 sets total, each can hold 9 items max => O(27*9)
66ms
Beats 77.97%of users with TypeScript
46.79MB
Beats 47.70%of users with TypeScript
*/
function isValidSudoku(board: string[][]): boolean {
  let rows = {}, cols = {}, squares = {}
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      let el = board[row][col]
      if (el == ".") continue
      let ind = `${Math.floor(row/3)},${Math.floor(col/3)}`
      if (rows[row]?.has(el) || cols[col]?.has(el) || squares[ind]?.has(el)) {
        // console.dir({
        //   rows,
        //   "rows[row]?.has(el)": rows[row]?.has(el)
        // })
        return false
      }
      if (row in rows) {
        rows[row].add(el)
      } 
      else {
        rows[row] = new Set(el)
      }

      if (col in cols) {
        cols[col].add(el)
      } 
      else {
        cols[col] = new Set(el)
      }
      if (ind in squares) {
        squares[ind].add(el)
      } 
      else {
        squares[ind] = new Set(el)
      }
    }
  }
  
  return true
}

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
