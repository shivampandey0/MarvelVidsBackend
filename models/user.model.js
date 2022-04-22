const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: 'Firstname of the user is required',
    },
    lastname: {
      type: String,
      required: 'LastName of the user is required',
    },
    username: {
      type: String,
      required: 'Firstname of the user is required',
    },
    password: {
      type: String,
      required: 'Password is a required attribute',
    },
    email: {
      type: String,
      required: 'Email is a mandatory attribute',
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
