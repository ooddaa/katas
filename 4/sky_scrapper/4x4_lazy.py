import functools

def main(clues):
  rows = make_rows((range(1,5)))
  for matrix in make_matrix(rows):
    if masker(clues, produce_clues(matrix)) == clues: 
      return matrix

def compute_permutations():
  # compute all possible permutations
  # that make sense
  elements = (range(1, 5))

  rows = [
      (a, b, c, d)

      for a in elements
      for b in elements
      for c in elements
      for d in elements

      if a + b + c + d == 10 and
      len(set((a, b, c, d))) == 4
  ]

  rv = (
      (a, b, c, d)

      for a in rows
      for b in rows
      for c in rows
      for d in rows

      if sum((set(tuple(zip(a, b, c, d))[0]))) == 10 and
      sum((set(tuple(zip(a, b, c, d))[1]))) == 10 and
      sum((set(tuple(zip(a, b, c, d))[2]))) == 10 and
      sum((set(tuple(zip(a, b, c, d))[3]))) == 10
  )
  return rv

def make_rows(elements):

  return [
      (a, b, c, d)

      for a in elements
      for b in elements
      for c in elements
      for d in elements

            
      if a + b + c + d == 10 and
      len(set((a, b, c, d))) == 4

  ]

def make_matrix(rows):
  for a in rows:
    for b in rows:
      for c in rows:
        for d in rows:
          if sum((set(tuple(zip(a, b, c, d))[0]))) == 10 and \
            sum((set(tuple(zip(a, b, c, d))[1]))) == 10 and\
            sum((set(tuple(zip(a, b, c, d))[2]))) == 10 and\
            sum((set(tuple(zip(a, b, c, d))[3]))) == 10:
              yield (a,b,c,d)


def produce_clues(matrices):
  # prepare directions
  directions = [
    (x for x in zip(*matrices)), # from top
    (tuple(reversed(row)) for row in matrices), # from right
    (y for y in zip(*[tuple(reversed(x)) for x in tuple(reversed(matrices))])), # from bottom
    (reversed(matrices)) # from left
  ]
  
  # compute clues per each direction
  clues = map(lambda matrix: [matcher(row) for row in matrix], directions)
  
  # flatten
  return tuple(item for sublist in clues for item in sublist)
  

def matcher(list):
  match list:
    case (4, _, _, _): return 1
    case (1, 4, _, _): return 2
    case (2, 1, 4, _): return 2
    case (2, 4, _, _): return 2
    case (3, _, _, 4): return 2
    case (3, _, 4, _): return 2
    case (3, 4, _, _): return 2

    case (1, 2, 4, _): return 3
    case (1, 3, _, 4): return 3
    case (1, 3, 4, _): return 3
    case (2, 3, 4, _): return 3
    case (2, 3, 1, 4): return 3
    case (2, _, _, 4): return 3
    case (2, 3, 4, _): return 3

    case (1, 2, 3, 4): return 4

    case x: raise Exception("no match", x)

def masker(masker, maskee):
  return functools.reduce(
      lambda acc, val: ( *acc, 0 if val[0] == 0 else val[1] ),
      zip(masker, maskee),
      ()
      )      
      

# print(
#   tuple(produce_clues(((1, 3, 4, 2), (4, 2, 1, 3), (3, 4, 2, 1), (2, 1, 3, 4))))
# )
def test_make_rows():
  seq = (range(1,5))
  # for i in range(1):
  #   print(list(make_rows(seq)))
  rows = list(make_rows(seq))
  print(len(rows))
  print(rows)

# test_make_rows()

def test_make_matrix():
  rows = make_rows((range(1,5)))
  for i in range(1):
    # print(list(make_matrix(seq)))
    for matrix in make_matrix(rows):
      print(matrix)

# test_make_matrix()

r = [
  (1, 2, 3, 4), 
  (1, 2, 4, 3), 
  (1, 3, 2, 4), 
  (1, 3, 4, 2), 
  (1, 4, 2, 3), 
  (1, 4, 3, 2), 
  (2, 1, 3, 4), 
  (2, 1, 4, 3), 
  (2, 3, 1, 4), 
  (2, 3, 4, 1),
  (2, 4, 1, 3),
  (2, 4, 3, 1),
  (3, 1, 2, 4),
  (3, 1, 4, 2),
  (3, 2, 1, 4),
  (3, 2, 4, 1),
  (3, 4, 1, 2),
  (3, 4, 2, 1),
  (4, 1, 2, 3),
  (4, 1, 3, 2),
  (4, 2, 1, 3),
  (4, 2, 3, 1),
  (4, 3, 1, 2),
  (4, 3, 2, 1)
  ]

def test1():
  
  clues = (
      2, 2, 1, 3,
      2, 2, 3, 1,
      1, 2, 2, 3,
      3, 2, 1, 3
  )
  outcomes = (
  ( 1, 3, 4, 2 ),       
  ( 4, 2, 1, 3 ),       
  ( 3, 4, 2, 1 ),
  ( 2, 1, 3, 4 ) )
  
  rv = produce_clues(outcomes)
  print(rv)
  assert rv == clues

  print("ok 1")

# test1()


def test2():
  clues = (
  ( 2, 2, 1, 3,  
  2, 2, 3, 1,  
  1, 2, 2, 3,  
  3, 2, 1, 3 )
) 

  outcomes = (
  ( 1, 3, 4, 2 ),       
  ( 4, 2, 1, 3 ),       
  ( 3, 4, 2, 1 ),
  ( 2, 1, 3, 4 ) )


  rv = main(clues)
  assert rv == outcomes

  print("ok 2")

# test2()


def test3():
  clues = ( 0, 0, 1, 2,   
  0, 2, 0, 0,   
  0, 3, 0, 0, 
  0, 1, 0, 0 )
  
  outcomes = (
    ( 2, 1, 4, 3 ), 
    ( 3, 4, 1, 2 ), 
    ( 4, 2, 3, 1 ), 
    ( 1, 3, 2, 4 ))
              
  rv = main(clues)
  assert rv == outcomes

  print("ok 3")

# test3()

# ((), (), (), ()) should equal ((1, 3, 4, 2), (4, 2, 1, 3), (3, 4, 2, 1), (2, 1, 3, 4))
# ((), (), (), ()) should equal ((2, 1, 4, 3), (3, 4, 1, 2), (4, 2, 3, 1), (1, 3, 2, 4))
# ((), (), (), ()) should equal ((4, 2, 1, 3), (3, 1, 2, 4), (1, 4, 3, 2), (2, 3, 4, 1))
# ((), (), (), ()) should equal ((1, 3, 4, 2), (4, 2, 1, 3), (3, 4, 2, 1), (2, 1, 3, 4))
# ((), (), (), ()) should equal ((3, 2, 1, 4), (4, 1, 3, 2), (1, 4, 2, 3), (2, 3, 4, 1))
# ((), (), (), ()) should equal ((3, 4, 2, 1), (1, 2, 3, 4), (2, 1, 4, 3), (4, 3, 1, 2))
# ((), (), (), ()) should equal ((2, 3, 1, 4), (4, 1, 2, 3), (3, 2, 4, 1), (1, 4, 3, 2))
# ((), (), (), ()) should equal ((3, 2, 1, 4), (4, 1, 3, 2), (1, 4, 2, 3), (2, 3, 4, 1))
# ((), (), (), ()) should equal ((1, 4, 3, 2), (2, 3, 4, 1), (4, 2, 1, 3), (3, 1, 2, 4))
# ((), (), (), ()) should equal ((4, 3, 1, 2), (1, 2, 4, 3), (3, 1, 2, 4), (2, 4, 3, 1))
# ((), (), (), ()) should equal ((4, 2, 3, 1), (1, 3, 2, 4), (2, 1, 4, 3), (3, 4, 1, 2))
# ((), (), (), ()) should equal ((1, 4, 3, 2), (2, 3, 4, 1), (4, 2, 1, 3), (3, 1, 2, 4))
# ((), (), (), ()) should equal ((2, 3, 4, 1), (1, 4, 2, 3), (3, 2, 1, 4), (4, 1, 3, 2))
# ((), (), (), ()) should equal ((1, 4, 3, 2), (3, 2, 4, 1), (2, 3, 1, 4), (4, 1, 2, 3))
# ((), (), (), ()) should equal ((2, 1, 3, 4), (3, 4, 1, 2), (4, 3, 2, 1), (1, 2, 4, 3))
# ((), (), (), ()) should equal ((2, 3, 4, 1), (1, 4, 2, 3), (3, 2, 1, 4), (4, 1, 3, 2))

def test4():
  clues = (
    2, 2, 1, 3, 
    2, 2, 3, 1, 
    1, 2, 2, 3, 
    3, 2, 1, 3)
  
  outcomes = (
    (1, 3, 4, 2), 
    (4, 2, 1, 3), 
    (3, 4, 2, 1), 
    (2, 1, 3, 4)
    )
              
  rv = main(clues)
  assert rv == outcomes

  print("ok 4")

# test4()

def test5():
  clues = [1, 1, 1, 2,
            1, 2, 1, 1,
            1, 3, 1, 1,
            1, 1, 1, 1]
  expected = [True, True, 1, 2,
            True, 2, True, True,
            True, 3, True, True,
            True, 1, True, True]

  assert clues == expected
  assert expected == clues
  assert [True, True, 1, 2, True, 2, True, True, True, 3, True, True, True, 1, True, True] != [5, 5, 1, 2, 5, 2, 5, 5, 5, 3, 5, 5, 5, 1, 5, 5]

  print("ok 5")
  
# test5()

def test6():
  clues = [
    0, 0, 1, 2,
    0, 2, 0, 0,
    0, 3, 0, 0,
    0, 1, 0, 0]
    
  expected = [
    5, 5, 1, 2,
    5, 2, 5, 5,
    5, 3, 5, 5,
    5, 1, 5, 5]

  masked = [
    True, True, 1, 2,
    True, 2, True, True,
    True, 3, True, True,
    True, 1, True, True]
    
  assert masker(clues, clues) == masked
  assert masker(clues, expected) == masked
  assert masker(expected, expected) == expected

  print("ok 6")

# test6()


import time
def uniq(matrices):
    rv = [
        "".join([str(i) for i in m])
        for m in matrices
    ]
    return len(set(rv)) == len(rv)

def time_test():
  clues = (
    2, 2, 1, 3, 
    2, 2, 3, 1, 
    1, 2, 2, 3, 
    3, 2, 1, 3)
    
  t1 = time.time()
  rv = []
  for i in range(100):
    rv.append(main(clues))
    
  t2 = time.time()
  return print(f"{len(rv)} results took {t2 - t1}")  
  
# time_test()

# 10 results took 2.54880690574646
# 100 results took 25.3020339012146
# vs
# with lazy version
# 10 results took 0.44591498374938965 
# 100 results took 4.160962820053101