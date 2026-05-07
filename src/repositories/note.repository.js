const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Note;
    #User;
    #Product;
    #Category;
    constructor() {
        autoBind(this);
        this.#Note = models.Note
        this.#User = models.User
        this.#Product = models.Product
        this.#Category = models.Category
    }

    async findUserNote(userId, productId) {
        const theNote = await this.#Note.findOne({
            where: {
                user_id: userId,
                product_id: productId
            },
            include: [
                {
                    model: this.#User,
                    as: "user",
                    attributes: {
                        exclude: ["password"]
                    }
                }, {
                    model: this.#Product,
                    as: "product",
                    include: [
                        {
                            model: this.#Category,
                            as: "category"
                        }
                    ]
                }
            ]
        })

        return theNote
    }

    async findUserNotes(userId) {
        const theNote = await this.#Note.findAll({
            where: {
                user_id: userId,
            },
            include: [
                {
                    model: this.#User,
                    as: "user",
                    attributes: {
                        exclude: ["password"]
                    }
                }, {
                    model: this.#Product,
                    as: "product",
                    include: [
                        {
                            model: this.#Category,
                            as: "category"
                        }
                    ]
                }
            ]
        })

        return theNote
    }

    async createNote(userId, productId, text) {
        await this.#Note.create({
            user_id: userId,
            product_id: productId,
            text
        })
    }

    async updateNote(theNote, text) {
        await theNote.update({
            text
        })
    }

    async deleteNote(userId, productId) {
        await this.#Note.destroy({
            where: {
                user_id: userId,
                product_id: productId
            }
        })
    }

})()