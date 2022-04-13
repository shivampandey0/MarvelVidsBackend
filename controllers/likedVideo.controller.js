const LikedVideo = require("../models/likedVideo.model");

const findUserLikedVideo = async (req, res, next) => {
  try {
    const {user} = req;
    let likedVideo = await LikedVideo.findOne({ userId: user._id });

    if (!likedVideo) {
      likedVideo = new LikedVideo({ userId: user._id, videos: [] });
      likedVideo = await likedVideo.save();
    }
    req.likedVideo = likedVideo;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive user's liked videos",
      errorMessage: error.message,
    });
  }
};

const getLikedVideoItems = async (likedVideo) => {
  likedVideo.videos = likedVideo.videos.filter((video) => video.active);
  likedVideo = await likedVideo.populate("videos._id").execPopulate();
  return likedVideo.videos.map((video) => video._id);
};

const getUserLikedVideo = async (req, res) => {
  try {
    let { likedVideo } = req;
    let likedVideoItems = await getLikedVideoItems(likedVideo);
    res.json({ success: true, likedVideoItems });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to retrive the likedVideo",
      errMessage: err.message,
    });
  }
};

const updateLikedVideo = async (req, res) => {
  const { _id } = req.body;
  const { likedVideo } = req;
  let resStatus;
  const videoExists = likedVideo.videos.some((video) => video._id == _id);
  if (videoExists) {
    resStatus = 200;
    for (let video of likedVideo.videos) {
      if (video._id == _id) {
        video.active = !video.active;
        break;
      }
    }
  } else {
    resStatus = 201;
    likedVideo.videos.push({ _id, active: true });
  }

  let updatedLikedVideo = await likedVideo.save();
  let likedVideoItems = await getLikedVideoItems(updatedLikedVideo);
  res.status(resStatus).json({ success: true, likedVideo: likedVideoItems });
};

module.exports = {
  findUserLikedVideo,
  getUserLikedVideo,
  updateLikedVideo,
};
