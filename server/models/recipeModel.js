const mongoose = require("mongoose");

const ingredientsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  ingredient: [{ id: Number, name: String, mensuration: String }],
});

const stepsSchema = new mongoose.Schema({
  id: Number,
  //image
  details: String,
});

const recipeSchema = new mongoose.Schema({
  //image, comments
  userId: { type: String, required: true },
  name: String,
  description: String,
  duration: Number,
  amounts: Number,
  createdDate: Date,
  level: { type: Number, min: 1, max: 5 },
  categoryType: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  ingredients: [ingredientsSchema],
  steps: [stepsSchema],
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
