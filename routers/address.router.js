const express = require("express");
const router = express.Router();
const { findUserAddress, getUserAddress, updateUserAddress, removeUserAddress} = require("../controllers/address.controller");

router.use(findUserAddress);

router.route("/")
.get(getUserAddress)
.post(updateUserAddress)
.put(removeUserAddress);

module.exports = router;