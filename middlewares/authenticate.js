const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        errorMessage: 'Unauthorized. Token not passed.',
      });
    }
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decodedValue._id });
    if (!user) {
      return res.status(401).json({
        success: false,
        errorMessage:
          'Unauthorized. Either user is not registered or Token is invalid.',
      });
    }
    req.user = {
      _id: decodedValue._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
    next();
  } catch (error) {
    res.status(401).json({ success: false, errMessage: error.message });
  }
};

module.exports = authenticate;
