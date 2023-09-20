// const fn1 = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(console.log(1))
//     }, 1000)
//   })
// }
// const fn2 = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(console.log(2))
//     }, 500)
//   })
// }
// const fn3 = () => {
//     setTimeout(() => {
//       console.log('done')
//     }, 300)
// }

// fn1().then(x => {
//   // console.log("x", x)
//   fn2().then(() => fn3())
// })

const f1 = (cb) => {
  setTimeout(() => {
      console.log(1)
      cb()
    }, 1000)
}

const f2 = (cb) => {
  setTimeout(() => {
    console.log(2)
    cb()
  }, 500)
}
const done = (cb) => {
    console.log("done")
    if (typeof cb =="function") return cb()
}

// f1(() => f2(done))

// Write a function `magic`.
function magic(list) {
  // f1(() => f2(() => done(() => console.log("yay")))) 
  if (!list.length) return 
  const head = list[0]
  const tail = list.slice(1)
  return head(() => magic(tail))
}
// magic([]);
// magic([f1, f2, done, done]);

function magic1(...list) {
  // f1(() => f2(() => done(() => console.log("yay")))) 
  if (!list.length) return 
  const head = list[0]
  const tail = list.slice(1)
  return head(() => magic(tail))
}

// magic1(f1, f2, done)