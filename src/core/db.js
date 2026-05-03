const { Sequelize, Op } = require("sequelize")

const config = require("./config")
const { modelsLoader } = require("./../sequelize/models/index")

const database = new Sequelize({
    ...config.getDBConfig(),
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

module.exports = { connectToDB, models, database,Op }