const fs = require("fs");

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
    .map((x) => x.slice(1))
    .fold(
      () => "no color",
      (x) => `founded ${x}`
    );

//console.log(res());

//==================================

const fromNullable = (x) => (x != null ? Right(x) : Left(null));

const tryCatch = (f) => {
  try {
    return Right(f);
  } catch (e) {
    return Left(e);
  }
};

const getPort_ = () => {
  try {
    const str = fs.readFileSync("packae.json");
    const config = JSON.parse(str);
    return config.dependencies;
  } catch (error) {
    return {};
  }
};

const getPort = () =>
  tryCatch(fs.readFileSync("package.json"))
    .map((contents) => JSON.parse(contents))
    .map((config) => config.dependencies)
    .map((stringify) => JSON.stringify(stringify, null, 3))
    .fold(
      (error) => `Error occured ${error}`,
      (res) => `here is it ${res}`
    );

const result = getPort();

console.log(result);
