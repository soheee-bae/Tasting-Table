const auth = require("../middleware/auth");
const Bookmark = require("../models/bookMarkModel");
const router = require("express").Router();

// Get Bookmark by userId
router.get("/:userId", auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.params.userId });
    res.json(bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Add Bookmark
router.post("/", auth, async (req, res) => {
  try {
    const newBookmark = new Bookmark({
      ...req.body,
    });
    await newBookmark.save();
    res
      .status(200)
      .json({ message: "Success", status: 200, bookmarkId: newBookmark._id });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Delete Bookmark
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
