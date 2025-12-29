const { writeFile, readFile } = require("fs").promises;
const fileName = "temp.txt";
console.log("Entering writeFile function");
writeFile(fileName, "This is new content added to the file.", {
  flag: "a",
})
  .then(() => {
    console.log("first then function");
    return writeFile(fileName, "\nmore content", { flag: "a" });
  })
  .then(() => {
    console.log("second then function");
    return writeFile(fileName, "\nmore content added", { flag: "a" });
  })
  .then(() => {
    console.log("third then function");
    return readFile(fileName, "utf8");
  })
  .then((result) => {
    console.log("fourth then function");
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
