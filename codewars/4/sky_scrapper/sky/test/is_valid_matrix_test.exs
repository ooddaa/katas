ExUnit.start()

defmodule IsValidMatrixTest do
  @moduledoc false
  use ExUnit.Case

  test "valid" do
    matrix = [
      [1, 3, 4, 2],
      [4, 2, 1, 3],
      [3, 4, 2, 1],
      [2, 1, 3, 4]
    ]

    actual = Puzzle.Solver.is_valid_matrix?(matrix)
    assert actual == true
  end

  test "invalid" do
    matrix = [
      [1, 3, 4, 2],
      [1, 2, 4, 3], # wrong
      [3, 4, 2, 1],
      [2, 1, 3, 4]
    ]
    # o = [
    #   [2, 3, 1, 4],
    #   [4, 4, 2, 3],
    #   [3, 2, 4, 1],
    #   [1, 1, 3, 2]
    # ]

    actual = Puzzle.Solver.is_valid_matrix?(matrix)
    assert actual == false
  end

  test "invalid 2" do
    matrix = [
      [1, 3, 4, 2],
      [4, 2, 1, 3], # wrong
      [3, 1, 2, 1],
      [2, 1, 3, 4]
    ]

    actual = Puzzle.Solver.is_valid_matrix?(matrix)
    assert actual == false
  end

  test "invalid 3" do
    matrix = [
      [1, 2, 3, 4],
      [1, 2, 3, 4],
      [4, 3, 2, 1],
      [4, 3, 2, 1]
    ]

    actual = Puzzle.Solver.is_valid_matrix?(matrix)
    assert actual == false
  end

  test "invalid 4" do
    matrix = [
      [1, 2, 3, 4],
      [1, 2, 4, 3],
      [4, 3, 1, 2],
      [4, 3, 2, 1]
    ]
    # [
    #   [1, 1, 4, 4],
    #   [2, 2, 3, 3],
    #   [3, 4, 1, 2],
    #   [4, 3, 2, 1]
    # ]

    actual = Puzzle.Solver.is_valid_matrix?(matrix)
    assert actual == false
  end
end
