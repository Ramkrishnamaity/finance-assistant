/**
 * Custom error class for HTTP status errors
 * This follows the same pattern as the demo project
 */
class StatusError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'StatusError';
  }
}

module.exports = StatusError;
