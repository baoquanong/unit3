const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    // phoneNumber: { type: String, required: true },
    skills: { type:[String] },
    description: { type: String },
    // dob: { type:Date },
    img: { type: String }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
