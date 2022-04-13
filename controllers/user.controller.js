const User = require("../models/user.model");
const { extend } = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { postUserNotification } = require("./notification.controller");

const getUsers = async (req, res) => {
  try {
    let users = await User.find({});
    users = users.map((user) => {
      user.password = undefined;
      return user;
    });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get the list of users",
      errMessage: err.message,
    });
  }
};

const findUser = async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        { _id: user._id, name: user.name, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.json({ success: true, token });
    } else {
      res.status(401).json({
        success: false,
        message: "Username and password does not match",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Username or password is incorrect",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    let userData = req.body;
    const usernameExsists = await User.exists({ username: userData.username });
    const emailExsists = await User.exists({ email: userData.email });
    if (usernameExsists) {
      res.status(409).json({ success: false, message: "Username is taken." });
      return usernameExsists;
    }
    if (emailExsists) {
      res
        .status(409)
        .json({ success: false, message: "Email is already registered." });
      return emailExsists;
    }
    userData.password = bcrypt.hashSync(userData.password, 10);
    let newUser = new User(userData);
    newUser = await newUser.save();

    res.json({ success: true, message: "Successfully added new user" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to add new user",
      errMessage: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  let { user } = req;
  user = await User.findOne({ _id: user._id });
  user.password = undefined;
  res.json({ success: true, user });
};

const updateUser = async (req, res) => {
  let { user } = req;
  user = await User.findOne({ _id: user._id });
  const userUpdates = req.body;
  const userWithSameUsername = await User.findOne({
    username: userUpdates.username,
  });
  if (userWithSameUsername) {
    return res.status(403).json({
      success: false,
      message:
        "Username updation failed. Another user exists with the same username.",
    });
  }
  const userWithSameEmail = await User.findOne({ email: userUpdates.email });
  if (userWithSameEmail) {
    return res.status(403).json({
      success: false,
      message:
        "Email updation failed. Another user exists with the same email.",
    });
  }
  user = extend(user, userUpdates);
  user = await user.save();
  user.password = undefined;
  res.json({ success: true, user });
};

const updateFollowers = async (req, res) => {
  try {
    let { user } = req;
    const { viewerId } = req.body;
    user = await User.findOne({ _id: user._id });
    let viewer = await User.findOne({ _id: viewerId });

    if (
      user.following.includes(viewerId) ||
      viewer.followers.includes(user._id)
    ) {
      user.following = user.following.filter(
        (data) => data._id.toString() !== viewerId.toString()
      );
      viewer.followers = viewer.followers.filter(
        (data) => data._id.toString() !== user._id.toString()
      );
    } else {
      user.following.push(viewerId);
      viewer.followers.push(user._id);
    }

    user = await user.save();
    viewer = await viewer.save();
    res.json({ success: true, user, viewer });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to update user followers/following",
      errMessage: err.message,
    });
  }
};

module.exports = {
  getUsers,
  updateFollowers,
  registerUser,
  findUser,
  getUserById,
  updateUser,
};
