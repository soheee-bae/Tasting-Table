const auth = require("../middleware/auth");
const Recipe = require("../models/recipeModel");
const router = require("express").Router();

// Get all recipes
router.get("/all", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Get specific recipe by recipeId
router.get("/recipeId/:recipeId", async (req, res) => {
  try {
    var ObjectId = require("mongodb").ObjectId;
    var id = req.params.recipeId;
    var _id = new ObjectId(id);
    const recipes = await Recipe.findById(_id);
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Get recipes by userId
router.get("/userId/:userId", async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.params.userId });

    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Create recipe
router.post("/create", auth, async (req, res) => {
  try {
    const newRecipe = new Recipe({
      ...req.body,
      createdDate: Date.now(),
    });

    const savedRecipe = await newRecipe.save();

    res.json(savedRecipe);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
module.exports = router;
