const path = require("path");
const filePath = path.join(
  "/desktop",
  "node-express-course",
  "01-node-tutorial"
);

const base = path.basename(filePath);

console.log(path.sep);
console.log(filePath);
console.log(base);
