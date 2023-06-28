const { curry } = require("rambda");

const add = curry((x, y) => x + y);

const concat = curry((y, x) => x + y);

const toUpper = (str) => str.toUpperCase();

const exclaim = (str) => str + "!";

const first = (xs) => xs[0];

const compose = (f, g) => (x) => f(g(x));

const loud = compose(toUpper, first);
const shout = compose(loud, exclaim);

//associativeness
const shoutAssociative = compose(compose(toUpper, first), exclaim);

console.log(shout("tears"));
console.log(shoutAssociative("tears")); // same

console.log(compose(toUpper, first, exclaim)("tears"));

const shout2 = compose(concat("!"), loud)("tears");

console.log({ shout2 });

// logger
// (console.log(x),x) => ეს სინტაქსი ლოგავს და აბრუნებს x;
//const log = (tag) => (x) => (console.log(tag, x), x);

const log = curry((tag, x) => (console.log(tag, x), x));

const shout3 = compose(concat("!"), log, loud);
console.log(shout3("tears"));
