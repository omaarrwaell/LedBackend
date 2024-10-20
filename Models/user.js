const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  passwrod: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"] },
  mobileNumber: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
