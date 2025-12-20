import { Joi } from 'celebrate';

const commonValidation = {

    envSchema: Joi.object({

        NODE_ENV: Joi.string().valid('local', 'prod', 'test').required(),
        PORT: Joi.number().default(5000).required(),
        SERVER_BASE_URL: Joi.string().max(100).required(),
        CLIENT_BASE_URL: Joi.string().max(100).required(),
        MONGODB_URI: Joi.string().max(100).required(),
        JWT_SECRET: Joi.string().max(100).required(),
        JWT_EXPIRY: Joi.string().max(100).required(),

    }).unknown(true).required(),

};

export default commonValidation;
