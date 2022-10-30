# https://www.codewars.com/kata/598106cb34e205e074000031/train/python
def count_deaf_rats(town):
  # remove whitespace
  # town = town.replace(" ", "")
  
  # # split on P
  # [left, right] = town.split("P")
  ## left, right = town.split("P")
  
  # # chunk in 2s
  # left = [left[i:i+2] for i in range(0, len(left), 2)]
  # right = [right[i:i+2] for i in range(0, len(right), 2)]
  
  # # count O~ as deaf rats in left
  # # count ~O as deaf rats in right
  # total = 0
  # total += left.count("O~")
  # total += right.count("~O")

  # # print(town)
  # # print(left)
  # # print(right)
  # # print(total)
  # return total
  
  # THIS ONE OWNS!
  x = town.replace(' ', '')
  # ~O~O~O~OP -> ~~~~P
  # PO~O~~OO~ -> P~~O~
  # ~O~O~O~OP~O~OO~ -> ~~~~POO~
  y = x[::2]
  return y.count('O')

def test():
    # assert count_deaf_rats("~O~O~O~O P") == 0
    # assert count_deaf_rats("P O~ O~ ~O O~") == 1
    assert count_deaf_rats("~O~O~O~OP~O~OO~") == 2

    print("ok")

test()