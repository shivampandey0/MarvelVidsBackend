const Notification = require("../models/notification.model");

const getUserNotifications = async (req, res) => {
  const { user } = req;
  let notifications = await Notification.find({ notifiedUser: user._id });
  notifications = notifications.filter((item) => item.active);
  res.json({
    success: true,
    notifications,
  });
};

const postUserNotification = async (req, res) => {
  const { user } = req;
  let notification = req.body;
  notification = new Notification({
    ...notification,
    active: true,
    actionedUser: user._id,
  });
  notification = await notification.save();
  res.json({ success: true, notification });
};

const clearOneNotification = async (req, res) => {
  const { user } = req;
  const { notificationId } = req.body;
  let notification = await Notification.findOne({
    _id: notificationId,
    notifiedUser: user._id,
  });
  if (!notification) {
    res.status(400).json({
      success: false,
      message: "Unabe to update the status of this notification",
    });
  }
  notification.active = false;
  notification = await notification.save();
  res.json({ success: true, notification });
};

const clearAllNotifications = async (req, res) => {
  const { user } = req;
  let notifications = await Notification.find({ notifiedUser: user._id });
  for (let item of notifications) {
    item.active = false;
    await item.save();
  }
  res.json({ success: true, message: "No new notifications" });
};

module.exports = {
  getUserNotifications,
  postUserNotification,
  clearOneNotification,
  clearAllNotifications,
};
