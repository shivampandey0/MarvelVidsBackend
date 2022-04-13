const express = require("express");
const router = express.Router();

const {
  findUserPlaylist,
  findPlaylistById,
  getUserPlaylist,
  createPlaylist,
  updatePlaylistName,
  getPlaylistVideos,
  deletePlaylist,
  updatePlaylistVideo,
} = require("../controllers/playlist.controller");


router.use(findUserPlaylist);

router
  .route("/")
  .get(getUserPlaylist)
  .post(createPlaylist);

  
router.param("playlistId", findPlaylistById);
router
  .route("/:playlistId")
  .get(getPlaylistVideos)
  .post(updatePlaylistVideo)
  .put(updatePlaylistName)
  .delete(deletePlaylist);

module.exports = router;
