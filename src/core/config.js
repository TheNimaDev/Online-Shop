const Joi = require("joi")

const validation = Joi.object({
    db: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().allow("").required(),
        database: Joi.string().required(),
        host: Joi.string().required(),
        dialect: Joi.string().required(),
        port: Joi.number().required(),
        pool: Joi.object({
            min: Joi.number().required(),
            max: Joi.number().required(),
            acquire: Joi.number().required(),
            idle: Joi.number().required()
        })
    }),

    app: Joi.object({
        port: Joi.number().required(),
        cookie_secret: Joi.string().required(),
        session_secret: Joi.string().required(),
        refresh_token_secret: Joi.string().required(),
        access_token_secret: Joi.string().required(),
        refresh_token_expire: Joi.number().required(),
        access_token_expire: Joi.number().required(),
        checkout_expire: Joi.number().required(),
    })
})

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
                refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
                access_token_secret: process.env.ACCESS_TOKEN_SECRET,
                refresh_token_expire: +process.env.REFRESH_TOKEN_EXPIRE,
                access_token_expire: +process.env.ACCESS_TOKEN_EXPIRE,
                checkout_expire: +process.env.CHECKOUT_EXPIRE,
            }
        }

        const { error } = validation.validate(this.config)

        if (error) {
            throw new Error(`Invalid Configuration: ${error.message}`)
        }
    }

    getDBConfig() {
        return this.config.db;
    }

    getAppConfig() {
        return this.config.app;
    }
})()