const { Drink } = require("../../models");

const getAll = async (req, res) => {
  const drink = await Drink.find();
  res
    .status(200)
    .json({ status: "success", code: 200, data: { result: drink } });
};

module.exports = getAll;
