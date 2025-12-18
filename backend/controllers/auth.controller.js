const { controller } = require('../common/helpers/controller');
const authService = require('../services/auth.service');

const authController = {
  /**
   * Register new user
   */
  register: controller(async (req, res) => {
    const result = await authService.register(req.body);

    res.status(201).json({
      status: true,
      message: 'User registered successfully',
      data: result
    });
  }),

  /**
   * Login user
   */
  login: controller(async (req, res) => {
    const result = await authService.login(req.body);

    res.json({
      status: true,
      message: 'Login successful',
      data: result
    });
  }),

  /**
   * Get user profile
   */
  getProfile: controller(async (req, res) => {
    const result = await authService.getProfile(req.user.userId);

    res.json({
      status: true,
      message: 'Profile fetched successfully',
      data: result
    });
  })
};

module.exports = authController;
