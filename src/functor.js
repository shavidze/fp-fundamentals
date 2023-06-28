const Box = (x) => ({
  map: (f) => Box(f(x)),
  inpect: `Box(${x})`,
  fold: (f) => f(x),
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
    .fold(String.fromCharCode);

//console.log(nextCharForNumberString(" 64 "));

// Second example

const first = (xs) => xs[0];
const answer = (ans) => `The answer is ${ans}`;
const halfTheFirstLargeNumber = (xs) =>
  Box(xs)
    .map((xs) => xs.filter((x) => (x) => 20))
    .map((x) => first(x) / 2)
    .fold(answer);

//console.log(halfTheFirstLargeNumber([1, 3, 50]));

// Composition

const compostion = (f, g) => (x) => Box(x).map(g).fold(f);

// Example, moving to Monads
// applyDiscount
const percentToFloat = (str) =>
  Box(str)
    .map((s) => s.replace(/\$/, ""))
    .map((s) => parseFloat(s))
    .fold((f) => f * 0.01);
const moneyToFloat = (str) =>
  Box(str)
    .map((s) => s.replace(/\$/, ""))
    .fold((s) => parseFloat(s));

/**
 *
 * @param {string} price
 * @param {string} discount
 * @returns number
 *
 * Example: `applyDiscount_('$5.00','20%') => 4`
 */
const applyDiscount_ = (price, discount) => {
  const cents = moneyToFloat(price);
  const savings = percentToFloat(discount);
  return cents - cents * savings;
};
const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price)).map((cents) =>
    Box(percentToFloat(discount)).map(
      (cents) => cents - cents * percentToFloat(discount)
    )
  );

console.log("answer" - applyDiscount("$5.00", "20%"));
