const { models, Op } = require("../core/db")

module.exports = new (class {
    #User;
    constructor() {
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
})()