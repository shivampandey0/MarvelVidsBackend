const express = require("express");
const router = express.Router();
const { getVideos, addVideo, findVideo, getVideoById, updateVideo } = require("../controllers/video.controller");

router
  .route("/")
  .get(getVideos)
  .post(addVideo);

router.param("videoId",findVideo);

router
  .route("/:videoId")
  .get(getVideoById)
  .post(updateVideo);

module.exports = router;
