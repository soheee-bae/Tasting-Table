const auth = require("../middleware/auth");
const Bookmark = require("../models/bookMarkModel");
const router = require("express").Router();

// Get bookmarks by userId
router.get("/", auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user });
    res.json(bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Add bookmark
router.post("/", auth, async (req, res) => {
  try {
    const newBookmark = new Bookmark({
      userId: req.user,
      recipeId: req.recipeId,
    });
    await newBookmark.save();
    res.status(200).json({ message: "Success", status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Delete Recipe
router.delete("/:bookmarkId", auth, async (req, res) => {
  try {
    var ObjectId = require("mongodb").ObjectId;
    var id = req.params.bookmarkId;
    var _id = new ObjectId(id);

    await Bookmark.findOneAndDelete(_id);
    res.status(200).json({ message: "Success", status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
