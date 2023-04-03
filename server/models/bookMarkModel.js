const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  userId: { type: String },
  recipeId: { type: String },
});

const Bookmark = mongoose.model("bookmark", bookmarkSchema);

module.exports = Bookmark;
