const express = require("express");

const router = express.Router();
const { logon, user } = require("../controllers/main.js");
const authMiddleware = require("../middleware/auth.js");

router.route("/hello").get(authMiddleware, user);
router.route("/logon").post(logon);

module.exports = router;
