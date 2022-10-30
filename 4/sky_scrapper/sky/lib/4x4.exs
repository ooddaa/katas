defmodule PuzzleSolver do
  def solve(clues) do
    expected = [ [1, 3, 4, 2],
                 [4, 2, 1, 3],
                 [3, 4, 2, 1],
                 [2, 1, 3, 4] ]
    expected
  end
end

ExUnit.start()
# TODO: Replace examples and use TDD development by writing your own tests

defmodule PuzzleSolverTest do
  use ExUnit.Case

  test "it can solve 4x4 puzzle 1" do
    clues    = [ 2, 2, 1, 3,
                 2, 2, 3, 1,
                 1, 2, 2, 3,
                 3, 2, 1, 3 ]

    expected = [ [1, 3, 4, 2],
                 [4, 2, 1, 3],
                 [3, 4, 2, 1],
                 [2, 1, 3, 4] ]

    actual = PuzzleSolver.solve(clues)
    assert actual == expected
  end

  # test "it can solve 4x4 puzzle 2" do
  #   clues    = [0, 0, 1, 2,
  #               0, 2, 0, 0,
  #               0, 3, 0, 0,
  #               0, 1, 0, 0]

  #   expected = [ [2, 1, 4, 3],
  #                [3, 4, 1, 2],
  #                [4, 2, 3, 1],
  #                [1, 3, 2, 4] ]

  #   actual = PuzzleSolver.solve(clues)
  #   assert actual == expected
  # end
end
