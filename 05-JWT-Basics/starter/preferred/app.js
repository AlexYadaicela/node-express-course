require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/main.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Working Page</h1>");
});

app.use("/api/v1", authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
