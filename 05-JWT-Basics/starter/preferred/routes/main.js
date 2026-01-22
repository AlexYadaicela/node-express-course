const express = require("express");

const router = express.Router();
const { logon, user } = require("../controllers/main.js");

router.route("/logon").post(logon);
router.route("/hello").get(user);

module.exports = router;
