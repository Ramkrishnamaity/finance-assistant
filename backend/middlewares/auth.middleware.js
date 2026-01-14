import passport from 'passport';
import StatusError from '../utils/helpers/statusError.helper.js';

/**
 * JWT Authentication Middleware using Passport
 * Validates JWT token and attaches user to request
 */
const JWTUser = (req, res, next) => {
  passport.authenticate('user-jwt', { session: false }, (err, user, info) => {
    console.log("---------------", err, user, info);
    if (err) {
      throw StatusError.unauthorized('Invalid or expired token');
    }

    if (!user) {
      throw StatusError.unauthorized('Invalid or expired token');
    }

    // Attach user to request
    req.user = {
      userId: user._id,
      email: user.email,
      name: user.name
    };

    next();
  })(req, res, next);
};

export { JWTUser };
