import { celebrate, Joi, Segments } from 'celebrate';

const categoryValidation = {
  /**
   * Validation for creating category
   */
  createCategory: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().trim().min(2).max(50)
        .messages({
          'string.empty': 'Category name is required',
          'string.min': 'Category name must be at least 2 characters',
          'string.max': 'Category name cannot exceed 50 characters'
        }),
      type: Joi.string().required().valid('expense', 'income')
        .messages({
          'string.empty': 'Category type is required',
          'any.only': 'Type must be either expense or income'
        })
    })
  }),

  /**
   * Validation for updating category
   */
  updateCategory: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().optional().trim().min(2).max(50)
        .messages({
          'string.min': 'Category name must be at least 2 characters',
          'string.max': 'Category name cannot exceed 50 characters'
        })
    })
  }),

  /**
   * Validation for category ID parameter
   */
  categoryIdParam: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required().hex().length(24)
        .messages({
          'string.empty': 'Category ID is required',
          'string.hex': 'Invalid category ID format',
          'string.length': 'Invalid category ID length'
        })
    })
  })
};

export default categoryValidation;
