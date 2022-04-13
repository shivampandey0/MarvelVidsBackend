const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    videos: [{_id:{ type: mongoose.Schema.Types.ObjectId, ref:"Video"}, active:Boolean}]
})

const History = mongoose.model("History", historySchema);

module.exports = History;