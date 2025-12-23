import * as yup from 'yup';

const commonValidation = {
    // Frontend environment schema - validates VITE_ prefixed vars and PORT
    envSchema: yup.object({
        PORT: yup.number().positive().integer().default(3000).required(),
        VITE_NODE_ENV: yup.string().oneOf(['local', 'prod', 'test']).required(),
        VITE_API_URL: yup.string().max(200).required(),
    }),
};

export default commonValidation;
