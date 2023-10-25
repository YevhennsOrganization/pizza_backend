const { Appetizer } = require("../../models");

const getAll = async (req, res) => {
  const appetizer = await Appetizer.find();
  res.json({ status: "success", code: 200, data: { result: appetizer } });
};

module.exports = getAll;
