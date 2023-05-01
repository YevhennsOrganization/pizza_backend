const { Schema, model } = require("mongoose");

const cartSchema = Schema({
  name: {
    type: String,
  },
  sum: {
    type: Number,
  },
});

const Cart = model("cartItem", cartSchema);

module.exports = { Cart };
