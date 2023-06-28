const Box = (x) => ({
  map: (f) => Box(f(x)),
  inpect: `Box(${x})`,
  value: x,
});

const nextCharForNumberString_ = (str) => {
  const trimmed = str.trim();
  const number = parseInt(trimmed);
  const nextNumber = new Number(number + 1);
  return String.fromCharCode(nextNumber);
};

//const result = nextCharForNumberString(" 64 ");

//const result1 = () =>
//  Box("b")
//    .map((x) => x.toUpperCase())
//    .map((x) => String.fromCharCode(x))
//    .map((x) => x[0]);

const nextCharForNumberString = (str) =>
  Box(str)
    .map((x) => x.trim())
    .map((trimmed) => parseInt(trimmed, 10))
    .map((number) => new Number(number + 1))
    .map(String.fromCharCode);

console.log(nextCharForNumberString(" 64 "));
