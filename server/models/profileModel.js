const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: String },
  profileImg: { type: String },
  email: { type: String },
  name: { type: String },
  nickname: { type: String },
  birthdate: { type: String },
  intro: { type: String },
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
