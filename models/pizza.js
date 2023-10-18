const { Schema, model } = require("mongoose");

const pizzaSchema = new Schema({
  title: String,
  description: String,
  dimension: String,
  price: Number,
  photo: String,
});

const Pizza = model("pizza", pizzaSchema);

module.exports = Pizza;
