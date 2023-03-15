const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String },
  name: { type: String },
  nickname: { type: String },
  birthdate: { type: Number },
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
