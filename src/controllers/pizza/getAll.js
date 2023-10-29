const { Product } = require("../../models");

const getAll = async (req, res) => {
  const pizza = await Product.find({ category: "pizzas" });
  res
    .status(200)
    .json({ status: "success", code: 200, data: { result: pizza } });
};

module.exports = getAll;
