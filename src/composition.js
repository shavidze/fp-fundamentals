const { curry } = require("rambda");

const add = curry((x, y) => x + y);

const concat = curry((y, x) => x + y);

const toUpper = (str) => str.toUpperCase();

const exclaim = (str) => str + "!";

const first = (xs) => xs[0];

const compose = (f, g) => (x) => f(g(x));

const loud = compose(toUpper, first);
const shout = compose(loud, exclaim);

//associative
const shoutAssociative = compose(compose(toUpper, first), exclaim);

console.log(shout("tears"));
console.log(shoutAssociative("tears")); // same

console.log(compose(toUpper, first, exclaim)("tears"));

const shout2 = compose(concat("!"), loud)("tears");

console.log({ shout2 });
