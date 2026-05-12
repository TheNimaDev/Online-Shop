const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #User;
    #Comment;
    #Order;
    constructor() {
        autoBind(this);
        this.#User = models.User
        this.#Comment = models.Comment
        this.#Order = models.Order
    }

    async findUser({ email = null, id = null, returnWithPassword = false, include = false }) {
        const theUser = await this.#User.findOne({
            where: {
                [Op.or]: [
                    { id },
                    { email }
                ]
            },
            attributes: {
                exclude: [returnWithPassword ? null : "password"],
                include: include ? [
                    {
                        model: this.#Comment,
                        as: "comments"
                    }, {
                        model: this.#Order,
                        as: "orders"
                    }
                ] : null
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

    async findUsers(include = false) {
        const theUsers = await this.#User.findAll({
            attributes: {
                exclude: ["password"]
            },
            include: include ? [
                {
                    model: this.#Comment,
                    as: "comments"
                }, {
                    model: this.#Order,
                    as: "orders"
                }
            ] : null
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