const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const {
  getUsers,
  updateFollowers,
  registerUser,
  findUser,
  getUserById,
  updateUser,
} = require("../controllers/user.controller");

router.route("/all").get(getUsers);

router.route("/login").post(findUser);

router.route("/signup").post(registerUser);

router.use(authenticate);

router.route("/").get(getUserById).post(updateUser).put(updateFollowers);

module.exports = router;
