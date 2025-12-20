import { celebrate, Joi, Segments } from 'celebrate';

const authValidation = {
  /**
   * Validation for user registration
   */
  register: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().trim().min(2).max(50)
        .messages({
          'string.empty': 'Name is required',
          'string.min': 'Name must be at least 2 characters',
          'string.max': 'Name cannot exceed 50 characters'
        }),
      email: Joi.string().required().email().trim().lowercase()
        .messages({
          'string.empty': 'Email is required',
          'string.email': 'Please provide a valid email'
        }),
      password: Joi.string().required().min(6)
        .messages({
          'string.empty': 'Password is required',
          'string.min': 'Password must be at least 6 characters'
        })
    })
  }),

  /**
   * Validation for user login
   */
  login: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email().trim().lowercase()
        .messages({
          'string.empty': 'Email is required',
          'string.email': 'Please provide a valid email'
        }),
      password: Joi.string().required()
        .messages({
          'string.empty': 'Password is required'
        })
    })
  })
};

export default authValidation;
