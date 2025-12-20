import { isCelebrateError } from 'celebrate';
import StatusError from './statusError.helper.js';
import commonHelpers from './common.helper.js';

function validationErrorHandler(err, res) {

  const error = [];
  for (const [, joiError] of err.details.entries()) {
    error.push(joiError.message);
  }

  const message = error.map((e) => e.split("\"").join("")).join(", ");

  return res.status(400).json({
    status: false,
    message
  });

}

/**
 * Global error handler middleware
 * This follows the same pattern as the demo project
 */
const errorHandler = (err, req, res, next) => {

  // Handle validation error
  if (isCelebrateError(err)) {
    return validationErrorHandler(err, res);
  }

  let statusCode;
  let message;

  // Handle custom StatusError
  if (err instanceof StatusError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (!statusCode) {
    statusCode = 500;
    message = err?.message || "Server error. Please try again later.";
  }

  commonHelpers.logError({ statusCode, message });

  res.status(statusCode).json({
    status: false,
    message
  });

};

export default errorHandler;
