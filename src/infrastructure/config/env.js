import "dotenv/config";

export const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
};
