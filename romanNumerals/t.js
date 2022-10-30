const arr = [10, 9, 5, 4, 1]


/* kinda works */
function t2(num) {
  let s = ''

  while (num > 0) {

    for (let v of arr) {
      if (num >= v) {
        s += `${v}+`
        num -= v
        break
      }
    }
  }
  return s
}

function t(num) {
  let s = ''


  /* my dumb attempt */
  // arr.forEach(v => {
  //   if (num >= v) {
  //     s += `${v}+`
  //     num -= v
  //   }
  // })


  /* correct way - repeat at every element as many times as needed */
  arr.forEach(v => {
    while (num >= v) {
      s += `${v}+`
      num -= v
    }
  })


  return s
}

console.log(t(19))
