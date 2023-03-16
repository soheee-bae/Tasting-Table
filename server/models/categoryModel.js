const mongoose = require("mongoose");

export const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  category: { type: String, required: true },
});
``;

const Category = mongoose.model("recipe", categorySchema);

module.exports = Category;
