require("dotenv").config;
const jwt = require("jsonwebtoken");

const logon = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    throw new Error("Please provide name and password");
  }
  const payload = {
    name: name,
  };
  jwt.sign(
    payload,
    process.env.PRIVATE_KEY,
    { expiresIn: "24h" },
    (err, token) => {
      if (err) {
        return res.status(500).json({ err });
      }
      res.status(200).json({ token });
    }
  );
};

const user = async (req, res) => {
  res.status(200).json({
    message: `${req.user.name}`,
  });
};

module.exports = {
  logon,
  user,
};
