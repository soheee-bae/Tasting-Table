const mongoose = require("mongoose");

const ingredientsSchema = new mongoose.Schema({
  id: Number,
  name: String,
  ingredient: [{ id: Number, name: String, mensuration: String }],
});

const stepsSchema = new mongoose.Schema({
  id: Number,
  img: String,
  details: String,
});

const reviewSchema = new mongoose.Schema({
  rating: Number,
  img: [String],
  review: String,
  dateCreated: Date,
  userId: String,
  profileImg: String,
  nickname: String,
});

const recipeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  img: String,
  name: String,
  rating: Number,
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
  reviews: [reviewSchema],
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
