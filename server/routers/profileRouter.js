const auth = require("../middleware/auth");
const Profile = require("../models/profileModel");
const router = require("express").Router();

// Get User Profile
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Edit Profile
router.put("/edit", auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user },
      req.body
    );
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Create Profile
router.post("/create", auth, async (req, res) => {
  try {
    const newProfile = new Profile({ ...req.body, userId: req.user });
    const savedProfile = await newProfile.save();
    res.json(savedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
module.exports = router;
