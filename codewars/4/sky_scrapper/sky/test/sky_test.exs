defmodule PuzzleSolver.Test0 do
  @moduledoc false


ExUnit.start()

defmodule PuzzleSolverTest do
  @moduledoc """
  test
  """
  use ExUnit.Case

  # test "make lazy matrices" do
  #     rows = PuzzleSolver.make_rows()
  #     matrices = PuzzleSolver.make_matrices(rows) |> Enum.take(2) |> IO.inspect()
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

    actual = PuzzleSolver.solve(clues)
    assert actual == expected
  end

  test "matcher" do
    assert PuzzleSolver.matcher([1, 2, 3, 4]) == 4
  end

  test "make rows" do
    assert PuzzleSolver.make_rows()
           |> length() == 24
  end

  test "check_ll" do
    a = [1, 2, 3, 4]
    b = [2, 3, 1, 4]
    assert MapSet.size(PuzzleSolver.check_ll(MapSet.new([]), [a, a, b, b])) == 2
  end

  test "rotate 90" do
    a = [1, 2, 3, 4]
    b = [2, 3, 4, 1]
    c = [3, 4, 1, 2]
    d = [4, 1, 2, 3]

    assert PuzzleSolver.rotate_90([a, b, c, d]) == [a, b, c, d]

    assert PuzzleSolver.rotate_90([a, a, a, a]) == [
             [1, 1, 1, 1],
             [2, 2, 2, 2],
             [3, 3, 3, 3],
             [4, 4, 4, 4]
           ]
  end

  test "same numbers in same positions" do
    a = [1, 2, 3, 4]
    b = [1, 3, 4, 2]
    c = [3, 4, 1, 2]
    d = [4, 1, 2, 3]

    rv =
      for row <-
            PuzzleSolver.rotate_90([a, b, c, d]),
          MapSet.size(PuzzleSolver.check_ll(MapSet.new([]), row)) == 4 do
        row
      end

    assert rv == [
             [2, 3, 4, 1],
             [3, 4, 1, 2]
           ]
  end

  # test "make matrices" do
  #   rows = PuzzleSolver.make_rows()

  #   matrices = PuzzleSolver.make_matrices(rows)

  #   assert matrices |> length() == 576
  # end

  test "directions" do
    matrix = [
      [1, 3, 4, 2],
      [4, 2, 1, 3],
      [3, 4, 2, 1],
      [2, 1, 3, 4]
    ]

    assert matrix |> Enum.zip() |> Enum.map(&Tuple.to_list/1) == [
             [1, 4, 3, 2],
             [3, 2, 4, 1],
             [4, 1, 2, 3],
             [2, 3, 1, 4]
           ]

    assert matrix |> Enum.map(&Enum.reverse/1) == [
             [2, 4, 3, 1],
             [3, 1, 2, 4],
             [1, 2, 4, 3],
             [4, 3, 1, 2]
           ]

    assert matrix
           |> Enum.reverse()
           |> Enum.map(&Enum.reverse/1)
           |> Enum.zip()
           |> Enum.map(&Tuple.to_list/1) == [
             [4, 1, 3, 2],
             [3, 2, 1, 4],
             [1, 4, 2, 3],
             [2, 3, 4, 1]
           ]

    assert matrix |> Enum.reverse() == [
             [2, 1, 3, 4],
             [3, 4, 2, 1],
             [4, 2, 1, 3],
             [1, 3, 4, 2]
           ]
  end

  test "make clues" do
    matrix = [
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

    rv = PuzzleSolver.make_clues(matrix)
    assert rv == clues
  end

  test "mask" do
    masker = [ 1, 0, 0, 0, 2 ]
    maskee = [ 5, 5, 5, 5, 5 ]
    rv = PuzzleSolver.mask(masker, maskee)
    assert rv = [ 5, 0, 0, 0, 5]
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

    actual = PuzzleSolver.solve(clues)
    assert actual == expected
  end
end
