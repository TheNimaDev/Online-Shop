const { Sequelize, Op } = require("sequelize")

const { modelsLoader } = require("./../sequelize/models/index")

const database = new Sequelize({
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
    },
    logging: false
})

const models = modelsLoader(database)

const connectToDB = async () => {
    try {
        await database.authenticate()
        console.log("The APP Connected To The DB Successfully")
    } catch (error) {
        console.log("The APP Could'nt Connect To The DB And Had Error : ", error)
    }
}

module.exports = { connectToDB, models, database, Op }