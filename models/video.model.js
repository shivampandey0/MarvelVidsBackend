const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    vid: {
      type: String,
      required: "Video ID is a required attribute",
      unique: true,
    },
    title: {
      type: String,
      required: "Name of the video is a required attribute",
    },
    author: String,
    subscribers: Number,
    image: String,
    views: Number,
    date: Date,
    description: {
      type: String,
      minLength: [100, "Description should be atleast of 100 characters"],
      maxLength: [800, "Description should be atmost of 800 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
