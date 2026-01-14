import rootPaths from './modules/index.js';

export default {
  openapi: '3.0.1',
  info: {
    title: 'Finance Assistant APIs',
    description: 'AI-assisted personal finance application API documentation',
    contact: {
      email: 'support@finance-assistant.com'
    },
    version: '1.0.0'
  },
  servers: [
    {
      url: '/api/v1',
      description: 'API Version 1'
    }
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Endpoints related to authentication'
    },
    {
      name: 'Categories',
      description: 'Endpoints related to expense/income categories'
    },
    {
      name: 'Expenses',
      description: 'Endpoints related to expense management'
    },
    {
      name: 'Incomes',
      description: 'Endpoints related to income management'
    },
    {
      name: 'Transactions',
      description: 'Endpoints related to transactions'
    },
    {
      name: 'Statistics',
      description: 'Endpoints related to financial statistics and analytics'
    }
  ],
  paths: rootPaths,
  components: {
    schemas: {
      serverSuccessResponse: {
        title: 'Server Success Response',
        type: 'object',
        properties: {
          status: {
            type: 'boolean'
          },
          message: {
            type: 'string'
          },
          data: {
            type: 'object'
          }
        },
        required: ['status', 'message'],
        example: {
          status: true,
          message: 'Data fetched successfully!',
          data: {}
        }
      },
      serverErrorResponse: {
        title: 'Server Error Response',
        type: 'object',
        properties: {
          status: {
            type: 'boolean'
          },
          error: {
            type: 'string'
          }
        },
        required: ['status', 'error'],
        example: {
          status: false,
          error: 'Server Error, Please try again later!'
        }
      },
      badRequestResponse: {
        title: 'Bad Request Response',
        type: 'object',
        properties: {
          status: {
            type: 'boolean'
          },
          error: {
            type: 'string'
          }
        },
        required: ['status', 'error'],
        example: {
          status: false,
          error: 'Invalid Data!'
        }
      },
      notFoundResponse: {
        title: 'Not Found Response',
        type: 'object',
        properties: {
          status: {
            type: 'boolean'
          },
          error: {
            type: 'string'
          }
        },
        required: ['status', 'error'],
        example: {
          status: false,
          error: 'Resource not found!'
        }
      },
      unauthorizedResponse: {
        title: 'Unauthorized Response',
        type: 'object',
        properties: {
          status: {
            type: 'boolean'
          },
          error: {
            type: 'string'
          }
        },
        required: ['status', 'error'],
        example: {
          status: false,
          error: 'Unauthorized access!'
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};
