const config = {
    PORT: process.env.PORT,
    MONGO_PATH: process.env.MONGO_PATH,
    JWT_SECRET: process.env.JWT_SECRET,
    AWS_REGION: process.env.AWS_REGION,
    AWS_POOL_ID: process.env.AWS_POOL_ID,
    AWS_POOL_CLIENT_ID: process.env.AWS_POOL_CLIENT_ID,
};

module.exports = config;
