const express = require("express");
const router = express.Router();
const {findUserLikedVideo, getUserLikedVideo, updateLikedVideo} = require("../controllers/likedVideo.controller");
 
router.use(findUserLikedVideo);

router.route("/")
.get(getUserLikedVideo)
.post(updateLikedVideo);

module.exports = router;