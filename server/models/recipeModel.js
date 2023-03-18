const mongoose = require("mongoose");

const ingredientsSchema = new mongoose.Schema({
  name: String,
  ingredient: [{ name: String, mensuration: String }],
});

const stepsSchema = new mongoose.Schema({
  //image
  details: String,
});

const recipeSchema = new mongoose.Schema({
  //image, comments
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  level: { type: Number, min: 1, max: 5 },
  duration: Number,
  categoryType: { id: Number, name: String },
  createdDate: Date,
  amounts: { min: Number, max: Number },
  ingredients: [ingredientsSchema],
  steps: [stepsSchema],
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
