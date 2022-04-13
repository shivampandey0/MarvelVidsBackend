const { extend } = require("lodash");
const faker = require("faker");
const Video = require("../models/video.model");

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.json({ success: true, videos });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get the list of videos",
      errMessage: err.message,
    });
  }
};

const addVideo = async (req, res) => {
  try {
    const video = req.body;
    video.date = faker.date.past();
    const newVideo = new Video(video);
    const savedVideo = await newVideo.save();
    res.status(201).json({ success: true, video: savedVideo });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to add new video",
      errMessage: err.message,
    });
  }
};

const findVideo = async (req, res, next, vId) => {
  try {
    const video = await Video.findById(vId);
    if (!video) {
      throw Error("Unable to fetch the video");
    }
    req.video = video;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrive the video" });
  }
};

const getVideoById = async (req, res) => {
  const { video } = req;
  video.__v = undefined;
  res.json({ success: true, video });
};

const updateVideo = async (req, res) => {
  let { video } = req;
  const videoUpdates = req.body;
  if(videoUpdates._id){
    return res.status(400).json({success: false, message:"Forbidden request. Video id cannot be updated."})
  }
  video = extend(video, videoUpdates);
  video = await video.save();
  res.json({ success: true, video });
};

module.exports = { getVideos, addVideo, findVideo, getVideoById, updateVideo };
