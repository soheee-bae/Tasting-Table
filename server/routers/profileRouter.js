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
router.put("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndUpdate({ userId: req.user }, req.body);

    res.status(200).json({ message: "Success", status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Create Profile
router.post("/", auth, async (req, res) => {
  try {
    const newProfile = new Profile({ ...req.body, userId: req.user });
    await newProfile.save();
    res.status(200).json({ message: "Success", status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
module.exports = router;
