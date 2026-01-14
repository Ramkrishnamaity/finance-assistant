import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.model.js';

const initializePassport = (passport) => {

  // JWT validation strategy through header (Bearer token)
  passport.use(
    'user-jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      async (payload, done) => {
        try {
          if (!payload?.userId) {
            return done(null, false, { message: 'Invalid token' });
          }

          const user = await User.findOne({ _id: payload.userId, freezed: 0 });

          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          // Remove sensitive data
          const userObj = user.toObject();
          delete userObj.password;
          delete userObj.freezed;

          return done(null, userObj);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

};

export default initializePassport;
