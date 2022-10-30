// https://www.codewars.com/kata/52774a314c2333f0a7000688/train/javascript
function validParentheses1(parens) {
  // your code here ..
  // if length is odd - false
  // if length is even - check positioning
  // positioning - 
  // eliminate all () replace with "". 
  // recusively check if new () were formed - match ()
  // return length == 0

  if (parens.length % 2 !== 0) return false

  const regex = /\(\)/g
  function replacer(s) {
    const newS = s.replace(regex, "")
    if (newS.match(regex)) return replacer(newS) 
    return newS
  }

  return replacer(parens).length === 0
}

function validParentheses2(parens){
  var n = 0;
  for (var i = 0; i < parens.length; i++) {
    if (parens[i] == '(') n++;
    if (parens[i] == ')') n--;
    if (n < 0) return false;
  }
  
  return n == 0;
}

function validParentheses(parens){
  var re = /\(\)/;
  while (re.test(parens)) parens = parens.replace(re, "");
  return !parens;
}

describe("Tests", () => {
  test(`test`, () => {
    expect(validParentheses("(")).toEqual(false)
    expect(validParentheses(")")).toEqual(false)
    expect(validParentheses("())")).toEqual(false)
    expect(validParentheses(")()()()(")).toEqual(false)

    expect(validParentheses("")).toEqual(true)
    expect(validParentheses("()")).toEqual(true)
    expect(validParentheses("(())")).toEqual(true)
    expect(validParentheses("(()())")).toEqual(true)
    expect(validParentheses("(())((()())())")).toEqual(true)

  });
});