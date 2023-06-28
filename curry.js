const { curry } = require("rambda");

const replace = curry((regex, replacement, str) =>
  str.replace(regex, replacement)
);

const replaceVowels = replace(/[AEIOU]/gi, "!");
const result = replaceVowels("Hey Bro, I have words where are vowels");

console.log(result);
