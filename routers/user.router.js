const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const {
  registerUser,
  findUser,
  getUserDetailsFromDb,
} = require('../controllers/user.controller');

router.route('/login').post(findUser);

router.route('/signup').post(registerUser);

router.route('/self').get(authenticate, getUserDetailsFromDb);

module.exports = router;
