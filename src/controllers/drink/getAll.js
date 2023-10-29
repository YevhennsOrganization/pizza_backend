const { Product } = require("../../models");

const getAll = async (req, res) => {
  const drink = await Product.find({ category: "drinks" });
  res
    .status(200)
    .json({ status: "success", code: 200, data: { result: drink } });
};

module.exports = getAll;
