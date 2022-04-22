const User = require('../models/user.model');
const { extend } = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { postUserNotification } = require('./notification.controller');

// const getUsers = async (req, res) => {
//   try {
//     let users = await User.find({});
//     users = users.map((user) => {
//       user.password = undefined;
//       return user;
//     });
//     res.json({ success: true, users });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Unable to get the list of users',
//       errMessage: err.message,
//     });
//   }
// };

const findUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      });
      res.status(200).json({
        firstname: user.firstname,
        token,
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Username and password does not match',
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: 'Username or password is incorrect',
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await User.findOne({ email: userData.email });
    console.log(userData)
    if (user) {
      res.status(409).json({
        message: 'Account already exists for this email',
      });
      return;
    }

    const NewUser = new User(userData);
    NewUser.username = NewUser.email.split('@')[0];
    const salt = await bcrypt.genSalt(10);
    NewUser.password = await bcrypt.hash(NewUser.password, salt);
    console.log(NewUser)
    await NewUser.save();

    const token = jwt.sign({ _id: NewUser._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
    res.status(201).json({
      firstname: NewUser.firstname,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong!',
      errorMessage: error.message,
    });
  }
};

const getUserDetailsFromDb = async (req, res) => {
  try {
    const { user } = req;

    res.status(200).json({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Request failed please check errorMessage key for more details',
      errorMessage: error.message,
    });
  }
};

// const getUserById = async (req, res) => {
//   let { user } = req;
//   user = await User.findOne({ _id: user._id });
//   user.password = undefined;
//   res.json({ success: true, user });
// };

// const updateUser = async (req, res) => {
//   let { user } = req;
//   user = await User.findOne({ _id: user._id });
//   const userUpdates = req.body;
//   const userWithSameUsername = await User.findOne({
//     username: userUpdates.username,
//   });
//   if (userWithSameUsername) {
//     return res.status(403).json({
//       success: false,
//       message:
//         'Username updation failed. Another user exists with the same username.',
//     });
//   }
//   const userWithSameEmail = await User.findOne({ email: userUpdates.email });
//   if (userWithSameEmail) {
//     return res.status(403).json({
//       success: false,
//       message:
//         'Email updation failed. Another user exists with the same email.',
//     });
//   }
//   user = extend(user, userUpdates);
//   user = await user.save();
//   user.password = undefined;
//   res.json({ success: true, user });
// };

// const updateFollowers = async (req, res) => {
//   try {
//     let { user } = req;
//     const { viewerId } = req.body;
//     user = await User.findOne({ _id: user._id });
//     let viewer = await User.findOne({ _id: viewerId });

//     if (
//       user.following.includes(viewerId) ||
//       viewer.followers.includes(user._id)
//     ) {
//       user.following = user.following.filter(
//         (data) => data._id.toString() !== viewerId.toString()
//       );
//       viewer.followers = viewer.followers.filter(
//         (data) => data._id.toString() !== user._id.toString()
//       );
//     } else {
//       user.following.push(viewerId);
//       viewer.followers.push(user._id);
//     }

//     user = await user.save();
//     viewer = await viewer.save();
//     res.json({ success: true, user, viewer });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Unable to update user followers/following',
//       errMessage: err.message,
//     });
//   }
// };

module.exports = {
  registerUser,
  findUser,
  getUserDetailsFromDb,
};
