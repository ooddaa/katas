var v = 1;

function f1() {
  console.log(v);
}
const f3 = () => console.log(v);

function f2() {
  var v = 2;
  f1(); // 1
  f3(); // 1
}

f2();
