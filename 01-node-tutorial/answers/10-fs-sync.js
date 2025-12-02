const { readFileSync, writeFileSync } = require("fs");

const first = readFileSync("./content/first.txt", "utf8");
const second = readFileSync("./content/second.txt", "utf8");
const third = "this is another line";

console.log(first, second);

writeFileSync(
  "./temporary/fileA.txt",
  `Here is the result: ${first}, ${second}, ${third}`,
  { flag: "a" }
);
