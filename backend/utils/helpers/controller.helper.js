/**
 * Wrapper for async route handlers to catch errors
 * This follows the same pattern as the demo project
 */
const controller = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};

export { controller };
