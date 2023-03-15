const auth = require("../middleware/auth");
const Profile = require("../models/profileModel");
const router = require("express").Router();

// Get Profile
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
    const profile = await Profile.findOneAndUpdate(req.user, req.body);
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Create Profile
router.post("/create", auth, async (req, res) => {
  try {
    const { userId, email, name, nickname, birthdate } = req.body;

    const newProfile = new Profile({
      userId,
      email,
      name,
      nickname,
      birthdate,
    });

    const savedProfile = await newProfile.save();

    res.json(savedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
module.exports = router;
