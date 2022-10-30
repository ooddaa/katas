# https://realpython.com/python-testing/#unit-tests-vs-integration-tests 


def snail(snail_map):
    result = []
    result += snail_map.pop(0) # shave off top row
    while len(snail_map) != 0:
      snail_map = list(zip(*snail_map))
      # snail_map = [
      #   [row[i] for row in snail_map] for i in range(len(snail_map[0]))
      #   ]
      snail_map.reverse()
      result += snail_map.pop(0)
    return result
    
# import numpy as np

# def snail(array):
#     m = []
#     array = np.array(array)
#     while len(array) > 0:
#         m += array[0].tolist()
#         array = np.rot90(array[1:])
#     return m

    # [
    # [1,2,3],
    # [4,5,6],
    # [7,8,9]
    # ]
    
    # [
    # [4,5,6],
    # [7,8,9]
    # ]
    
    # zip & reverse
    # [
    # [6,9],
    # [5,8],
    # [4,7],
    # ]
    
    # [
    # [5,8],
    # [4,7],
    # ]
    
    # [
    # [8,7],
    # [5,4],
    # ]
    
    # [
    # [5,4],
    # ]
    
    # [
    # [4,5],
    # ]
    
    # []
array = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
    ]
    
# print(
#   snail(array)
# )

def test():
  expected = [1,2,3,6,9,8,7,4,5]
  assert snail(array) == expected
  print('ok 1')
  
test()

def test2():
  array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
  expected = [1,2,3,4,5,6,7,8,9]
  assert snail(array) == expected
  print('ok 2')
  
test2()