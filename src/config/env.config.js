import dotenv from 'dotenv';

dotenv.config();

export const {
    NODE_ENV,
    PORT,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX,
} = process.env;
