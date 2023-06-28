const { curry } = require("rambda");

const replace = curry((regex, replacement, str) =>
  str.replace(regex, replacement)
);

const replaceVowels = replace(/[AEIOU]/gi, "!");
const result = replaceVowels("Hey Bro, I have words where are vowels");

console.log(result);

//

const split = curry((delimiter, string) => string.split(delimiter));

//exercies

const words = split(" ");

console.log(words("xs, as,"));

//

const slice = curry((start, end, xs) => xs.slice(start, end));

const sliceNormal = (s) => (e) => (xs) => xs.slice(s, e);
const takeNormal = sliceNormal(0);

console.log(sliceNormal(0)(2)(["a", "b", "c"]));

const take = slice(0);

console.log(takeNormal(4)(["a", "b", "c", "d", "e", "f", "g", "h"]));
