const mongoose = require('mongoose');

const likedVideoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    videos: [{_id:{ type: mongoose.Schema.Types.ObjectId, ref:"Video"}, active:Boolean}]
})

const LikedVideo = mongoose.model("LikedVideo", likedVideoSchema);

module.exports = LikedVideo;