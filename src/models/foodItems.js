const { Schema, model } = require("mongoose");

const foodItemsSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    dimension: { type: String },
    price: { type: Number },
    photo: { type: String },
    favorite: { type: Boolean },
    promotion: { type: Boolean },
  },
  {
    versionKey: false,
  }
);

const Pizza = model("pizza", foodItemsSchema);
const Appetizer = model("appetizer", foodItemsSchema);
const Drink = model("drink", foodItemsSchema);

module.exports = { Pizza, Appetizer, Drink };
