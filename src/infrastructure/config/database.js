const { env } = require("./env");

module.exports = {
    dialect: env.DB_TYPE,
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
