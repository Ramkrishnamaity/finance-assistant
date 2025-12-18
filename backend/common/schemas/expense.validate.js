const { celebrate, Joi, Segments } = require('celebrate');

const expenseValidation = {
  /**
   * Validation for creating expense
   */
  createExpense: celebrate({
    [Segments.BODY]: Joi.object().keys({
      amount: Joi.number().required().min(0)
        .messages({
          'number.base': 'Amount must be a number',
          'number.min': 'Amount cannot be negative',
          'any.required': 'Amount is required'
        }),
      description: Joi.string().required().trim().min(2).max(200)
        .messages({
          'string.empty': 'Description is required',
          'string.min': 'Description must be at least 2 characters',
          'string.max': 'Description cannot exceed 200 characters'
        }),
      date: Joi.date().optional().max('now')
        .messages({
          'date.max': 'Date cannot be in the future'
        }),
      categoryId: Joi.string().required().hex().length(24)
        .messages({
          'string.empty': 'Category is required',
          'string.hex': 'Invalid category ID format',
          'string.length': 'Invalid category ID length'
        }),
      notes: Joi.string().optional().trim().max(500)
        .messages({
          'string.max': 'Notes cannot exceed 500 characters'
        })
    })
  }),

  /**
   * Validation for updating expense
   */
  updateExpense: celebrate({
    [Segments.BODY]: Joi.object().keys({
      amount: Joi.number().optional().min(0)
        .messages({
          'number.base': 'Amount must be a number',
          'number.min': 'Amount cannot be negative'
        }),
      description: Joi.string().optional().trim().min(2).max(200)
        .messages({
          'string.min': 'Description must be at least 2 characters',
          'string.max': 'Description cannot exceed 200 characters'
        }),
      date: Joi.date().optional().max('now')
        .messages({
          'date.max': 'Date cannot be in the future'
        }),
      categoryId: Joi.string().optional().hex().length(24)
        .messages({
          'string.hex': 'Invalid category ID format',
          'string.length': 'Invalid category ID length'
        }),
      notes: Joi.string().optional().trim().max(500)
        .messages({
          'string.max': 'Notes cannot exceed 500 characters'
        })
    })
  }),

  /**
   * Validation for expense ID parameter
   */
  expenseIdParam: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required().hex().length(24)
        .messages({
          'string.empty': 'Expense ID is required',
          'string.hex': 'Invalid expense ID format',
          'string.length': 'Invalid expense ID length'
        })
    })
  })
};

module.exports = expenseValidation;
