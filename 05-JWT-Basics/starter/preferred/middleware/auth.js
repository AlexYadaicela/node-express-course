// import and create asynchorouns functions with a
// callback jwt.sign and jwt.verify
const jwt = require("jsonwebtoken");

jwt.sign(
  { foo: "bar" },
  "privateKey",
  { algorithm: "RS256" },
  function (err, token) {
    console.log(token);
  }
);
