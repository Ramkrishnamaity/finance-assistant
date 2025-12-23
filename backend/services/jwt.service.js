import jwt from 'jsonwebtoken';
import envs from '../configs/env.config.js';

const jwtService = {

    getToken: (payload, expiresIn = envs.jwt.expiresIn) => {
        return jwt.sign({ ...payload }, envs.jwt.secret, {
            expiresIn
        });
    },

};

export default jwtService;