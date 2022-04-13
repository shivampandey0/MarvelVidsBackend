const Note = require("../models/note.model");
const { extend } = require("lodash");

const getVideoNotes = async (req, res) => {
  try {
    const { video } = req;
    let notes = await Note.find({ videoId: video._id });
    notes = notes.filter((note) => note.active);
    res.json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false, errMessage: err.message });
  }
};

const createNewNote = async (req, res) => {
  try {
    const { user, video } = req;
    const { title, description } = req.body;
    let note = new Note({
      userId: user._id,
      videoId: video._id,
      title,
      description,
      active: true,
    });
    note = await note.save();
    res.status(201).json({ success: true, note });
  } catch (err) {
    res.status(500).json({
      success: false,
      errMessage: "Unable to add new note to this video.",
    });
  }
};

const findNoteById = async (req, res, next, noteId) => {
  const note = await Note.findOne({ _id: noteId });
  if (!note) {
    throw Error("Unable to find note. Invalid reference value");
  }
  req.note = note;
  next();
};

const updateNote = async (req, res) => {
  try {
    let { note } = req;
    const noteUpdates = req.body;
    if (note.active) {
      note = extend(note, noteUpdates);
      note = await note.save();
      res.json({ success: true, note });
    } else {
      throw Error("Failed to update, note not available");
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, errMessage: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    let { note } = req;
    note.active = false;
    note = await note.save();
    res.json({ success: true, note });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, errMessage: "Failed to update the note." });
  }
};

module.exports = {
  getVideoNotes,
  createNewNote,
  findNoteById,
  updateNote,
  deleteNote,
};
