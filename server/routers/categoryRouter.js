const auth = require("../middleware/auth");
const Category = require("../models/categoryModel");
const router = require("express").Router();

// Get All Categories
router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Create Category
router.post("/create", auth, async (req, res) => {
  try {
    const { id, name } = req.body;

    const newCategory = new Category({
      id,
      name,
    });

    const savedCategory = await newCategory.save();

    res.json(savedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
module.exports = router;
