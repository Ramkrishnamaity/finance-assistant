import commonValidation from "../utils/schemas/common.validate.js";

const { error, value: validatedEnv } = commonValidation.envSchema.validate(process.env, {
    abortEarly: false,
});

if (error) {
    console.error(`❌ Environment file validation error: ${error.message}`);
    process.exit(1);
} else {
    console.log(`✔️ Environment file validated successfully.`);
}

const envs = {
    node_env: validatedEnv.NODE_ENV,
    server: {
        port: validatedEnv.PORT,
        serverUrl: validatedEnv.SERVER_BASE_URL,
        clientUrl: validatedEnv.CLIENT_BASE_URL,
    },
    db: {
        url: validatedEnv.MONGODB_URI,
    },
    jwt: {
        secret: validatedEnv.JWT_SECRET,
        expiresIn: validatedEnv.JWT_EXPIRY,
    },
};

export default envs;
