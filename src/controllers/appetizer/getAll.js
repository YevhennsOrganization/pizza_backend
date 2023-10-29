const { Product } = require("../../models");

const getAll = async (req, res) => {
  const appetizer = await Product.find({ category: "appetizers" });
  res
    .status(200)
    .json({ status: "success", code: 200, data: { result: appetizer } });
};

module.exports = getAll;
