const express = require("express");
const router = express.Router();
const {
  getVideoNotes,
  createNewNote,
  findNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");
const { findVideo } = require("../controllers/video.controller");

router.param("videoId", findVideo);
router.route("/notes/:videoId").get(getVideoNotes).post(createNewNote);

router.param("noteId", findNoteById);
router.route("/:noteId").post(updateNote).put(deleteNote);

module.exports = router;
