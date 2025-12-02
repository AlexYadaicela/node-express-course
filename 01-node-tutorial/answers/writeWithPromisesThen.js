const { writeFile, readFile } = require("fs").promises;
const fileName = "temp.txt";
try {
  writeFile(fileName, "This is new content added to the file.", {
    flag: "a",
  })
    .then(() => {
      return writeFile(fileName, "\nmore content", { flag: "a" });
    })
    .then(() => {
      return writeFile(fileName, "\nmore content added", { flag: "a" });
    })
    .then(() => {
      return readFile(fileName, "utf8");
    })
    .then((result) => {
      console.log(result);
    });
} catch (error) {
  console.log(error);
}
