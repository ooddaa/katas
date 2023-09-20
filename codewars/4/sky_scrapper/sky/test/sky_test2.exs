ExUnit.start()

defmodule Test2 do
  @moduledoc """
  test
  """
  use ExUnit.Case
  # import Puzzle.Solver

  # test "make lazy matrices" do
  #     rows = Puzzle.Solver.make_rows()
  #     matrices = Puzzle.Solver.make_matrices(rows) |> Enum.take(2) |> IO.inspect()
  # end
  test "it can solve 4x4 puzzle 1" do
    expected = [
      [1, 3, 4, 2],
      [4, 2, 1, 3],
      [3, 4, 2, 1],
      [2, 1, 3, 4]
    ]

    clues = [
      2,
      2,
      1,
      3,
      2,
      2,
      3,
      1,
      1,
      2,
      2,
      3,
      3,
      2,
      1,
      3
    ]

    actual = Puzzle.Solver.solve(clues)
    assert actual == expected
  end

   test "it can solve 4x4 puzzle 2" do
    clues    = [0, 0, 1, 2,
                0, 2, 0, 0,
                0, 3, 0, 0,
                0, 1, 0, 0]

    expected = [ [2, 1, 4, 3],
                 [3, 4, 1, 2],
                 [4, 2, 3, 1],
                 [1, 3, 2, 4] ]

    actual = Puzzle.Solver.solve(clues)
    assert actual == expected
  end

  # test "matcher" do
  #   assert Puzzle.Solver.matcher([1, 2, 3, 4]) == 4
  # end

  # test "make rows" do
  #   assert Puzzle.Solver.make_rows()
  #          |> length() == 24
  # end

  # test "directions" do
  #   matrix = [
  #     [1, 3, 4, 2],
  #     [4, 2, 1, 3],
  #     [3, 4, 2, 1],
  #     [2, 1, 3, 4]
  #   ]

  #   assert matrix |> Enum.zip() |> Enum.map(&Tuple.to_list/1) == [
  #            [1, 4, 3, 2],
  #            [3, 2, 4, 1],
  #            [4, 1, 2, 3],
  #            [2, 3, 1, 4]
  #          ]

  #   assert matrix |> Enum.map(&Enum.reverse/1) == [
  #            [2, 4, 3, 1],
  #            [3, 1, 2, 4],
  #            [1, 2, 4, 3],
  #            [4, 3, 1, 2]
  #          ]

  #   assert matrix
  #          |> Enum.reverse()
  #          |> Enum.map(&Enum.reverse/1)
  #          |> Enum.zip()
  #          |> Enum.map(&Tuple.to_list/1) == [
  #            [4, 1, 3, 2],
  #            [3, 2, 1, 4],
  #            [1, 4, 2, 3],
  #            [2, 3, 4, 1]
  #          ]

  #   assert matrix |> Enum.reverse() == [
  #            [2, 1, 3, 4],
  #            [3, 4, 2, 1],
  #            [4, 2, 1, 3],
  #            [1, 3, 4, 2]
  #          ]
  # end

  # test "make clues" do
  #   matrix = [
  #     [1, 3, 4, 2],
  #     [4, 2, 1, 3],
  #     [3, 4, 2, 1],
  #     [2, 1, 3, 4]
  #   ]

  #   clues = [
  #     2,
  #     2,
  #     1,
  #     3,
  #     2,
  #     2,
  #     3,
  #     1,
  #     1,
  #     2,
  #     2,
  #     3,
  #     3,
  #     2,
  #     1,
  #     3
  #   ]

  #   rv = Puzzle.Solver.make_clues(matrix)
  #   assert rv == clues
  # end

  # test "mask" do
  #   masker = [ 1, 0, 0, 0, 2 ]
  #   maskee = [ 5, 5, 5, 5, 5 ]
  #   rv = Puzzle.Solver.mask(masker, maskee)
  #   assert rv = [ 5, 0, 0, 0, 5]
  # end
end
