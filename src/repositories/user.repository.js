const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #User;
    constructor() {
        autoBind(this);
        this.#User = models.User
    }

    async findUser({ email = null, id = null }, returnWithPassword = false) {
        const theUser = await this.#User.findOne({
            where: {
                [Op.or]: [
                    { id },
                    { email }
                ]
            },
            attributes: {
                exclude: [returnWithPassword ? null : "password"]
            }
        })

        return theUser
    }

    async createUser(name, email, cryptedPass) {
        const newUser = await this.#User.create({
            name,
            email,
            password: cryptedPass
        })

        return newUser ? {
            ...newUser.dataValues,
            password: undefined
        } : null
    }

    async findUsers() {
        const theUsers = await this.#User.findAll({
            attributes: {
                exclude: ["password"]
            }
        })

        return theUsers
    }

    async changePassword(theUser, cryptedPass) {
        await theUser.update({
            password: cryptedPass
        })
    }

    async changeInfo(theUser, name) {
        await theUser.update({
            name
        })
    }

})()