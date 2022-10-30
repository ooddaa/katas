def is_pangram(s):
  # count = 0
  # for l in s:
  #   count += 1 if ord(l) in range(65, 91) or ord(l) in range(97, 123) else 0
  # return count >= 26
  # rv = [1 if ord(l) in range(65, 91) or ord(l) in range(97, 123) else 0 for l in s]
  # return sum(rv) >= 26
  
  # alph = { chr(k):False for k in range(65, 91) }
  # alph.update({ chr(k):False for k in range(97, 123) })
  # print(alph)
  # for l in s:
  #   if l in alph:
  #     alph[l] = True
  # # print(alph)
  # print(alph.values())
  # rv = sum(alph.values())
  # print(rv)
  # return rv >= 26
  
  # holder = [(x, x+32, False) for x in  range(65, 91)]
  # print(holder)
  # for l in s:
  #   rv = list(filter(lambda x: x[0] == ord(l) or x[1] == ord(l), holder))
  #   if len(rv) == 1:
  #     rv[0][2] = True
  
  # THIS ALSO WORKS
  # def is_pangram(s):
  #   s = s.lower()
  #   for char in 'abcdefghijklmnopqrstuvwxyz':
  #       if char not in s:
  #           return False
  #   return True
      
  holder = { x.lower() for x in s if ord(x) in range(65, 91) or ord(x) in range(97, 123) }
  return len(holder) >= 26
  
  
def test():
    assert is_pangram("The quick, brown fox jumps over the lazy dog!") == True
    assert is_pangram("Pack my box with five dozen liquor jugs.") == True
    assert is_pangram("lol") == False
    assert is_pangram("Aacdefghijklmnopqrstuvwxyz.") == False

    print("ok")

test()