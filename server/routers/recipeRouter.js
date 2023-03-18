const auth = require("../middleware/auth");
const Recipe = require("../models/recipeModel");
const router = require("express").Router();

// // Get Recipes
// router.get("/", async (req, res) => {
//   try {
//     const category = await Category.find();
//     res.json(category);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send();
//   }
// });

// // Get Recipe by Id
// router.get("/", async (req, res) => {
//   try {
//     const category = await Category.find();
//     res.json(category);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send();
//   }
// });

router.get("/hello", auth, async (req, res) => {
  try {
    console.log("hello");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Create Recipe
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
