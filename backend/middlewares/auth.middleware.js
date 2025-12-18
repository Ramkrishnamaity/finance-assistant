const jwt = require('jsonwebtoken');
const StatusError = require('../common/helpers/statusError');
const User = require('../models/user.model');

/**
 * JWT Authentication Middleware
 * Validates JWT token and attaches user to request
 */
const JWTUser = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new StatusError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists and is not frozen
    const user = await User.findOne({ _id: decoded.userId, freezed: 0 });

    if (!user) {
      throw new StatusError('User not found or inactive', 401);
    }

    // Attach user to request
    req.user = {
      userId: user._id,
      email: user.email,
      name: user.name
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new StatusError('Invalid token', 401));
    } else if (error.name === 'TokenExpiredError') {
      next(new StatusError('Token expired', 401));
    } else {
      next(error);
    }
  }
};

module.exports = { JWTUser };
