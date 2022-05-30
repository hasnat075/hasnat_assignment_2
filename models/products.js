const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  type: { type: String },
});

module.exports = mongoose.model("Products", productSchema);
