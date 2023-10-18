const Pizza = require("../../models");

const getAll = async (req, res) => {
  const pizza = await Pizza.find();
  res.json({ status: "success", code: 200, data: { result: pizza } });
  console.log(pizza)
};

module.exports = getAll;
