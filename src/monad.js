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
  map: (f) => Left(x),
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
    return Right(f());
  } catch (e) {
    debugger;
    return Left(e);
  }
};

const getPort_ = () => {
  try {
    const str = fs.readFileSync("package.json");
    const config = JSON.parse(str);
    return config.dependencies;
  } catch (error) {
    return 4000;
  }
};

const readFileSync = (path) => tryCatch(() => fs.readFileSync(path));
const getPort = () =>
  readFileSync("packge.json")
    .map((contents) => JSON.parse(contents))
    .map((config) => config.dependencies)
    .fold(
      () => 404,
      (res) => `here is it ${JSON.stringify(res, null, 3)}`
    );

const result = getPort();

console.log(result);
