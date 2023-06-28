const add = (x, y) => x + y;

const toUpper = (str) => str.toUpperCase();

const exclaim = (str) => str + "!";

const first = (xs) => xs[0];

const compose = (f, g) => (x) => f(g(x));

const shout = compose(first, compose(exclaim, toUpper));

//associative
const shoutAssociative = compose(compose(first, exclaim), toUpper);

console.log(shout("tears"));
console.log(shoutAssociative("tears")); // same

console.log(compose(first, exclaim, toUpper));
