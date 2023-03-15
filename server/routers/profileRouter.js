const auth = require("../middleware/auth");
const Profile = require("../models/profileModel");
const router = require("express").Router();

// Get Profile
router.get("/", auth, (req, res) => {
  try {
    const cookie = req.cookies;
    console.log(req.user);

    console.log(cookie);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Edit Profile
router.put("/", auth, (req, res) => {
  try {
    const cookie = req.cookies;
    console.log(req.user);

    console.log(cookie);
    res.json(user);
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
