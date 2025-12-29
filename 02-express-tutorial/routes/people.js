const { addPerson, getPeople } = require("../controllers/people");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  getPeople(req, res);
});

router.post("/", (req, res) => {
  addPerson(req, res);
});

module.exports = router;
