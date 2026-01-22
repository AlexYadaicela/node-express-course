const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Not authorized to access this route" });
    }
    const { name } = decoded;
    req.user = { name };
  });
  next();
};

module.exports = authenticationMiddleware;
