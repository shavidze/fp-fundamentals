const findColor = (name) => {
  const found = {
    red: "#ff4444",
    blue: "#3b5998",
    yellow: "#fff68f",
  }[name];
  return found ? Right(found) : Left("dunno");
};

//const res = findColor("redd").toUpperCase();

//console.log(res);

const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x),
  toString: `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => f(x),
  map: (f) => Left(f(x)),
  fold: (f, g) => f(x),
  toString: `Left(${x})`,
});

const res = () =>
  findColor("red")
    .map((x) => x.toUpperCase())
    .fold(
      () => "no color",
      (x) => `founded ${x}`
    );

console.log(res());
