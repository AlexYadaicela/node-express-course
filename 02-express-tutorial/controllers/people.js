const { people } = require("../data");

const addPerson = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a name" });
  }
  people.push({ id: people.length + 1, name: req.body.name });
  res.status(201).json({ success: true, name: req.body.name });
};

const getPeople = (req, res) => {
  res.json(people);
};

const getPersonById = (req, res) => {
  const personId = people.find((p) => p.id === Number(req.params.id));

  if (!personId) {
    return res.status(404).json({
      success: false,
      message: "Entry not found",
    });
  }

  res.status(200).json({
    success: true,
    entry: personId,
  });
};

const updatePerson = (req, res) => {
  const entryFound = people.findIndex((p) => p.id === Number(req.params.id));
  if (entryFound < 0) {
    return res.status(404).json({
      success: false,
      message: "Entry not found",
    });
  }

  if (!req.body.name) {
    return res.status("400").json({
      success: false,
      message: "Please provide a name",
    });
  }

  people[entryFound] = { ...people[entryFound], name: req.body.name };

  res.status(200).json(people[entryFound]);
};

module.exports = { addPerson, getPeople, getPersonById, updatePerson };
