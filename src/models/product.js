const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: { type: String, required: [true, "Введіть назву продукту"] },
    description: { type: String, required: [true, "Введіть опис продукту"] },
    dimension: { type: String, required: [true, "Введіть розміри продукту"] },
    price: { type: Number, required: [true, "Введіть ціну продукту"] },
    photo: {
      type: String,
      required: [true, "Введіть посилання на фото продукту"],
    },
    category: { type: String, required: [true, "Введіть категорію продукту"] },
    promotion: { type: Boolean, default: false },
  },
  {
    versionKey: false,
  }
);

const Product = model("product", productSchema);

module.exports = { Product };
