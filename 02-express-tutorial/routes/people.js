const {
  addPerson,
  getPeople,
  getPersonById,
  updatePerson,
} = require("../controllers/people");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  getPeople(req, res);
});

router.get("/:id", (req, res) => {
  getPersonById(req, res);
});

router.post("/", (req, res) => {
  addPerson(req, res);
});

router.put("/:id", (req, res) => {
  updatePerson(req, res);
});

module.exports = router;
