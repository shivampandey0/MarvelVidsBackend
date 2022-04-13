const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is a mandatory attribute",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is a required attribute",
    },
    email: {
      type: String,
      required: "Email is a mandatory attribute",
      unique: true,
    },
    name: {
      type: String,
      required: "Name of the user is required",
    },
    bio: { type: String },
    link: { type: String },
    image: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
