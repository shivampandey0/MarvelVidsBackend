const express = require("express");
const {
  getUserNotifications,
  postUserNotification,
  clearOneNotification,
  clearAllNotifications,
} = require("../controllers/notification.controller");
const router = express.Router();

router
  .route("/")
  .get(getUserNotifications)
  .post(postUserNotification)
  .put(clearOneNotification)
  .delete(clearAllNotifications);

module.exports = router;
