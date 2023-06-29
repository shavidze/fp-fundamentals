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

//const getPort_ = () => {
//  try {
//    const str = fs.readFileSync("package.json");
//    const config = JSON.parse(str);
//    return config.dependencies;
//  } catch (error) {
//    return 4000;
//  }
//};

const parseJSON = (contents) => tryCatch(() => JSON.parse(contents));

const readFileSync = (path) => tryCatch(() => fs.readFileSync(path));
const getPort = () =>
  readFileSync("package.json")
    .chain((contents) => parseJSON(contents))
    .map((config) => config.dependencies)
    .fold(
      () => 404,
      (res) => `here is it ${JSON.stringify(res, null, 3)}`
    );

const result = getPort();

console.log(result);

// Examples

//const street_ = (user) => {
//  const address = user.address;
//  if (address) {
//    return address.street;
//  } else {
//    return "no street";
//  }
//};

//const street = (user) =>
//  fromNullable(user.address)
//    .map((address) => address.street)
//    .fold(
//      () => `no street`,
//      (res) => res
//    );

//console.log(
//  street({
//    name: "Saba",
//    address: { street: "Todria" },
//  })
//);

//console.log(
//  street({
//    name: "Saba",
//  })
//);
const DB_REGEX = "";
const parseDbUrl_ = (config) => {
  try {
    const c = JSON.parse(config);
    return c.url.match(DB_REGEX);
  } catch (error) {
    return null;
  }
};

const parseDbUrl = (config) =>
  Right(config)
    .chain((c) => tryCatch(() => JSON.parse(config)))
    .map((c) => c.url.match(DB_REGEX))
    .fold(
      () => null,
      (res) => res
    );

console.log(
  parseDbUrl({
    url: "",
  })
);
