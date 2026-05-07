const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Note;
    constructor() {
        autoBind(this);
        this.#Note = models.Note
    }

    async findUserNote(userId, productId) {
        const theNote = await this.#Note.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
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