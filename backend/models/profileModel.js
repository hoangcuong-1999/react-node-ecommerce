const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  city: { type: String, required: true },
  province: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
