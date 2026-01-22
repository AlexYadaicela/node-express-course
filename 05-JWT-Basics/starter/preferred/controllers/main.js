const logon = (req, res) => {
  console.log(req.body);
  const { name, password } = req.body;
  res.status(200).json({
    name: name,
    password: password,
  });
};

const user = (req, res) => {
  res.status(200).json({ message: "this is entering user" });
};

module.exports = {
  logon,
  user,
};
