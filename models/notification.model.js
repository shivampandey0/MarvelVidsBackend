const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  actionedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notifiedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  actionType: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  active: Boolean,
});

const Notification = new mongoose.model("Notification", notificationSchema);

module.exports = Notification;
