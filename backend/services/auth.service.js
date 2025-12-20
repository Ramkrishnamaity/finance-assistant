import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import StatusError from '../utils/helpers/statusError.helper.js';

const authService = {
  /**
   * Register a new user
   */
  async register({ name, email, password }) {
    // Check if user already exists
    const existingUser = await User.findOne({ email, freezed: 0 });
    if (existingUser) {
      throw new StatusError('Email already registered', 400);
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };
  },

  /**
   * Login user
   */
  async login({ email, password }) {
    // Find user with password field
    const user = await User.findOne({ email, freezed: 0 }).select('+password');

    if (!user) {
      throw new StatusError('Invalid email or password', 401);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new StatusError('Invalid email or password', 401);
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };
  },

  /**
   * Get user profile
   */
  async getProfile(userId) {
    const user = await User.findOne({ _id: userId, freezed: 0 });

    if (!user) {
      throw new StatusError('User not found', 404);
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
  }
};

export default authService;
