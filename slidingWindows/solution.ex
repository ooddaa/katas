defmodule Test do

  def fun(), do: IO.inspect "lol"
  # Kadane's algorithm. Because variables are immutable, we can define the accumulator of a reduce function as a tuple holding both values we need (cur for current sum and max for max sum thus far). I initialized those values to 0 and -10000 as defined by the constraints in the problem
  def max_sub_array(nums) do
  Enum.reduce(nums, {0, -10000}, fn n, {cur, max} ->
    {Enum.max([n] ++ [cur + n]), Enum.max([max] ++ [Enum.max([n] ++ [cur + n])])}
  end)
  |> elem(1)
end
  
  def sum(list), do: Enum.sum(list)

  def solution(list) do
  # [1,2,3,4]
  # [{1, 2}]
  # https://hexdocs.pm/elixir/Enum.html#chunk_every/2
  # for count <- 1..length(list) do
      
  # end
    IO.inspect("begin")
  result = for count <- 1..length(list), step <- 1..length(list) do

      # IO.inspect(count, label: "count")
      # IO.inspect(step, label: "step")
    list
    # |> Enum.chunk_every(4)
    |> Enum.chunk_every(count, step)
    # |> IO.inspect 
    end

  # IO.inspect(result, label: "result")  

  # result = if whatever, do: 1 + whatever
  end 
  
# 
# # Given an array of integers (both positive and negative), return the max contiguous sum of a subsequence in the array. 

# Examples: 
# (1,2,-4,1,3,-2,3,-1)   -> 5
# (-2,-3,4,-1,-2,1,5,-3) -> 7
def erl() do
  # :timer.sleep(3000)
end
end



# [1,2,3,4]
# [1,2,-4,1,3,-2,3,-1]
[-2,-3,4,-1,-2,1,5,-3]
|> Test.solution()
|> IO.inspect()
# # |> Enum.map(fn subset -> List.flatten(subset) end)
# |> Enum.map(fn subset -> Enum.map(subset, &Enum.sum(&1)) end)
# # |> Enum.map(fn subset -> Enum.map(subset, fn x -> Enum.sum(x) end) end)
# # |> IO.inspect()
# |> List.flatten()
# |> Enum.max()
# |> IO.inspect()

# 2n + 1 

# [
#   [1],
#   [1,2],
#   [1,2,3],
#   [2]
#   [2,3]
#   [3],
#   [1,3]  
# ]


# Test.sum([1,2,-4,1,3,-2,3,-1])
# Test.sum([1,3,-2,3])
# Test.sum([1,2,-4,1,3,-2,3,-1])
# |> IO.inspect(label: "res")

# |> IO.inspect(label: "res")
# |> IO.inspect(label: "res")
# |> IO.inspect(label: "res")

