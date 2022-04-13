const History = require("../models/history.model");
const { concat, remove } = require("lodash");


const findUserHistory = async (req, res, next) => {
  try {
    const {user} = req;
    let history = await History.findOne({ userId: user._id });

    if (!history) {
      history = new History({ userId: user._id, videos: [] });
      history = await history.save();
    }
    req.history = history;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive user's watch history",
      errorMessage: error.message,
    });
  }
};

const getHistoryItems = async (history) => {
  history.videos = history.videos.filter((video) => video.active);
  history = await history.populate("videos._id").execPopulate();
  return history.videos.map((video) => video._id);
};

const getUserHistory = async (req, res) => {
  try {
    let { history } = req;
    let historyItems = await getHistoryItems(history);
    res.json({ success: true, historyItems });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive the history",
      errMessage: err.message,
    });
  }
};

const addToHistory = async (req, res) => {
  const { _id } = req.body;
  const { history } = req;
  let resStatus;
  const videoExists = history.videos.some((video) => video._id == _id);
  if (videoExists) {
    resStatus = 200;
    remove(history.videos, (video) => video._id == _id);
    history.videos = concat(history.videos, { _id, active: true });
  } else {
    resStatus = 201;
    history.videos.push({ _id, active: true });
  }

  let updatedHistory = await history.save();
  let historyItems = await getHistoryItems(updatedHistory);
  res.status(resStatus).json({ success: true, history: historyItems });
};

const removeFromHistory = async (req, res) => {
  const { _id } = req.body;
  const { history } = req;
  for (let video of history.videos) {
    if (video._id == _id) {
      video.active = false;
      break;
    }
  }
  let updatedHistory = await history.save();
  let historyItems = await getHistoryItems(updatedHistory);
  res.json({ success: true, history: historyItems });
};

const clearHistory = async (req, res) => {
  let { history } = req;
  for (let video of history.videos) {
    video.active = false;
  }
  let emptyHistory = await history.save();
  emptyHistory = await getHistoryItems(emptyHistory);
  res.json({ success: true, history: emptyHistory });
};

module.exports = {
  findUserHistory,
  getUserHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
};
