const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.status(500).json({
    message: "It workded!",
  });
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>page not found</h1>");
});

app.listen(port, () => {
  console.log(`server live at: http://localhost:${port}`);
});
