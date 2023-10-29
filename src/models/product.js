const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    dimension: { type: String },
    price: { type: Number },
    photo: { type: String },
    category: { type: String },
    promotion: { type: Boolean },
  },
  {
    versionKey: false,
  }
);

const Product = model("product", productSchema);

module.exports = { Product };
