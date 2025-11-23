const { writeFile, write } = require("fs");

console.log("at start");
const filePath = "./temporary/fileB.txt";
const line1 = "this is printing in line 1";
const line2 = "this is printing in line 2";
const line3 = "this is pringint in line 3";
writeFile(filePath, line1, (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    writeFile(filePath, line2, { flag: "a" }, (err) => {
      console.log("at point 2");
      if (err) {
        console.log("This error happend", err);
      } else {
        console.log("at point 3");
        writeFile(filePath, line3, { flag: "a" }, (err) => {
          if (err) {
            console.log("This error happend", err);
          }
        });
      }
    });
  }
});

console.log("at end");
