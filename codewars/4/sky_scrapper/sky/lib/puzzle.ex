defmodule Puzzle.Solver do
  @moduledoc false

  # ok
  def matcher(x) do
    case x do
      [4, _, _, _] -> 1
      [1, 4, _, _] -> 2
      [2, 1, 4, _] -> 2
      [2, 4, _, _] -> 2
      [3, _, _, 4] -> 2
      [3, _, 4, _] -> 2
      [3, 4, _, _] -> 2
      [1, 2, 4, _] -> 3
      [1, 3, _, 4] -> 3
      [1, 3, 4, _] -> 3
      [2, 3, 4, _] -> 3
      [2, 3, 1, 4] -> 3
      [2, _, _, 4] -> 3
      [2, 3, 4, _] -> 3
      [1, 2, 3, 4] -> 4
    end
  end
  # def make_rows(seq) do
  #   for a <- seq,
  #       b <- seq,
  #       c <- seq,
  #       d <- seq,
  #       is_row_uniq?([a, b, c, d]) do
  #     [a, b, c, d]
  #   end
  # end

  # ok
  def make_rows([]), do: [[]]
  def make_rows(seq) do
    for head <- seq,
        tail <- make_rows(seq -- [head])
        do
          [head|tail]
        end
  end

  # ok
  @spec make_clues(any) :: list
  def make_clues(matrix) do
    # directions
    directions = [
      matrix |> Stream.zip() |> Enum.map(&Tuple.to_list/1),
      matrix |> Stream.map(&Enum.reverse/1),
      matrix
      |> Enum.reverse()
      |> Stream.map(&Enum.reverse/1)
      |> Stream.zip()
      |> Stream.map(&Tuple.to_list/1),
      matrix |> Enum.reverse()
    ]

    for matrix <- directions,
        clues <- Enum.map(matrix, &matcher/1) do
      clues
    end
  end
  # def make_clues(matrix) do
  #   # directions
  #   directions = [
  #     matrix |> Enum.zip() |> Enum.map(&Tuple.to_list/1),
  #     matrix |> Enum.map(&Enum.reverse/1),
  #     matrix
  #     |> Enum.reverse()
  #     |> Enum.map(&Enum.reverse/1)
  #     |> Enum.zip()
  #     |> Enum.map(&Tuple.to_list/1),
  #     matrix |> Enum.reverse()
  #   ]

  #   for matrix <- directions,
  #       clues <- Enum.map(matrix, &matcher/1) do
  #     clues
  #   end
  # end

  # ok
  def make_matrices(rows) do
    Stream.flat_map(rows, fn a ->
      Stream.flat_map(rows, fn b ->
        Stream.flat_map(rows, fn c ->
          Stream.flat_map(rows, fn d ->
            [[a, b, c, d]]
          end)
        end)
      end)
    end)
  end

#   Enumerable.List.reduce/3              439858  4.71  97939    0.22
#    1 :lists.reverse/2                   741076  5.56 115708    0.16
# 545  Stream.zip_list/4                  410380  9.63 200407    0.49
#    1 :lists.reverse/1                   855229 10.62 220847    0.26
#    2 Stream.zip_list_heads_tails/3     1723596 16.40 341215    0.20
  def solve(clues) do
    rows = make_rows(Enum.to_list(1..4))

    # 1 lazily ask for one matrix
    # 2 evaluate it
    # 3 if it's correct, return, if not go to step 1

    Enum.reduce_while(make_matrices(rows), nil, fn matrix, _acc ->

      if is_valid_matrix?(matrix) && clues == mask(clues, make_clues(matrix)) do
        {:halt, matrix}
      else
        {:cont, nil}
      end
    end)
  end

  # ok
  # def is_valid_matrix?([first, second, third, fourth])
  #     when first == second or first == third or first == fourth or second == third or second == fourth or third == fourth do
  #   false
  # end

  def is_valid_matrix?(matrix) do
    [first, second, third, fourth] =
      matrix
      |> Stream.zip()
      |> Enum.map(&Tuple.to_list/1)

    case is_row_uniq?(first) == true and
           is_row_uniq?(second) == true and
           is_row_uniq?(third) == true and
           is_row_uniq?(fourth) == true do
      true ->
        # reducer = fn x, y, acc -> if x !== y, do: x - y + acc, else: 123 + acc end
        # a = Enum.zip_reduce(first, second, 0, reducer)
        # b = Enum.zip_reduce(second, third, 0, reducer)
        # c = Enum.zip_reduce(third, fourth, 0, reducer)
        # d = Enum.zip_reduce(fourth, first, 0, reducer)

        reducer = fn {x, y}, acc -> if x !== y, do: x - y + acc, else: 123 + acc end
        a = Enum.reduce(Stream.zip(first, second), 0, reducer)
        b = Enum.reduce(Stream.zip(second, third), 0, reducer)
        c = Enum.reduce(Stream.zip(third, fourth), 0, reducer)
        d = Enum.reduce(Stream.zip(fourth, first), 0, reducer)
        a == 0 && b == 0 && c == 0 && d == 0

      false ->
        false
    end
  end

  def is_row_uniq?([a, b, c, d]) do
    a + b + c + d == 10 and
      a !== b && a !== c && a !== d && b !== c && b !== d && c !== d
  end

  def mask(masker, maskee) do
    Enum.zip(masker, maskee)
    |> Enum.map(fn
      {0, _} -> 0
      {_, x} -> x
    end)
  end

  def test do
    clues = [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0]
    solve(clues)
  end
end

# Puzzle.Solver.test()

# def check_ll(map_set, []), do: map_set

#   def check_ll(map_set, [head | tail]) do
#     check_ll(
#       map_set |> MapSet.put(head),
#       tail
#     )
#   end

#   def rotate_90(matrix) do
#     matrix
#     |> Enum.zip()
#     |> Enum.map(fn x -> Tuple.to_list(x) end)
#   end

#   def is_valid_matrix?(matrix) do
#     rv =
#       for row <- rotate_90(matrix),
#           MapSet.size(check_ll(MapSet.new([]), row)) == 4 do
#         row
#       end

#     length(rv) == 4
#   end
