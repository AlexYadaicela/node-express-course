import { createServer } from "http";

const server = createServer((req, res) => {
  res.write("Welcome to our home page");
  res.end();
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
