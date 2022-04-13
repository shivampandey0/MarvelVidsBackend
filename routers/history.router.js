const express = require("express");
const router = express.Router();
const {findUserHistory, getUserHistory, addToHistory, removeFromHistory, clearHistory} = require("../controllers/history.controller");

router.use(findUserHistory);

router.route("/")
.get(getUserHistory)
.post(addToHistory)
.put(removeFromHistory)
.delete(clearHistory);

module.exports = router;