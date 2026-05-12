const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Admin;
    #User;
    constructor() {
        autoBind(this);
        this.#Admin = models.Admin
        this.#User = models.User
    }

    async findAdmin({ id = null, userId = null, include = false }) {
        const theAdmin = await this.#Admin.findOne({
            where: {
                [Op.or]: [
                    { id },
                    { user_id: userId }
                ]
            },
            include: include ? [
                {
                    model: this.#User,
                    as: "user",
                    attributes: {
                        exclude: ["password"]
                    }
                }
            ] : null
        })

        return theAdmin
    }
})()