# https://www.codewars.com/kata/56f3a1e899b386da78000732/train/python

# Write a function partlist that gives all the ways to divide a list (an array) 
# of at least two elements into two non-empty parts.

# Each two non empty parts will be in a pair (or an array for languages without 
# tuples or a structin C - C: see Examples test Cases - )
# Each part will be in a string
# Elements of a pair must be in the same order as in the original array.

def partlist(arr):
  # rv = []
  # for i in range(1, len(arr)):
  #   rv.append((" ".join(arr[:i]), " ".join(arr[i:])))
  # return rv
    
  return [
    (" ".join(arr[:i]), " ".join(arr[i:])) for i in range(1, len(arr))
  ]
    
def test():
  assert partlist(
    ["I", "wish", "I", "hadn't", "come"]
    ) == [
      ("I", "wish I hadn't come"), 
      ("I wish", "I hadn't come"), 
      ("I wish I", "hadn't come"), 
      ("I wish I hadn't", "come")
      ]
  assert partlist(
    ["foo", "bar", "baz", "kek"]
    ) == [
      ("foo", "bar baz kek"), 
      ("foo bar", "baz kek"), 
      ("foo bar baz", "kek"), 
      ]
  print("ok")
  
test()