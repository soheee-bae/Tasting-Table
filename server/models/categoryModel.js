const mongoose = require("mongoose");

export const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
