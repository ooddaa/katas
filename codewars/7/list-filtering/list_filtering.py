# https://www.codewars.com/kata/53dbd5315a3c69eed20002dd
# In this kata you will create a function that takes a list 
# of non-negative integers and strings and returns a new 
# list with the strings filtered out.

# filter_list([1,2,'a','b']) == [1,2]
# filter_list([1,'a','b',0,15]) == [1,0,15]
# filter_list([1,2,'aasf','1','123',123]) == [1,2,123]

def filter_list(l):
    # return [x for x in l if not isinstance(x, str)]
    # return [x for x in l if type(x) is not str]
    return [x for x in l if type(x) is int]
  

def test():
  assert filter_list([1,2,'a','b']) == [1,2]
  assert filter_list([1,'a','b',0,15]) == [1,0,15]
  assert filter_list([1,2,'aasf','1','123',123]) == [1,2,123]
  print("ok")
  
test()