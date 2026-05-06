const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Comment;
    #User;
    #Product;
    constructor() {
        autoBind(this);
        this.#Comment = models.Comment
        this.#User = models.User
        this.#Product = models.Product
    }

    async createComment(userId, productId, text, positivePoints, negetivePoints, rate) {
        await this.#Comment.create({
            user_id: userId,
            product_id: productId,
            text,
            positivePoints,
            negetivePoints,
            rate
        })
    }

})()