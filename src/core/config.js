module.exports = new (class {
    constructor() {
        this.config = {
            db: {
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                host: process.env.DB_HOST,
                dialect: process.env.DB_DIALECT,
                port: process.env.DB_PORT,
                pool: {
                    min: parseInt(process.env.DB_POOL_MIN),
                    max: parseInt(process.env.DB_POOL_MAX),
                    acquire: parseInt(process.env.DB_POOL_ACQUIRE),
                    idle: parseInt(process.env.DB_POOL_IDLE)
                }
            },

            app: {
                port: process.env.PORT,
                cookie_secret: process.env.COOKIE_SECRET,
                session_secret: process.env.SESSION_SECRET,
            }
        };

    }

    getDBConfig() {
        return this.config.db;
    }

    getAppConfig() {
        return this.config.app;
    }
})()