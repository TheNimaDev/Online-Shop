const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Category;
    #Product;
    constructor() {
        autoBind(this);
        this.#Category = models.Category
        this.#Product = models.Product
    }

    async findProducts() {
        const theProducts = await this.#Product.findAll({
            include: [
                {
                    model: this.#Category,
                    as: "category"
                }
            ]
        })

        return theProducts
    }

    async findProduct(productId) {
        const theProduct = await this.#Product.findOne({
            where: {
                id: productId
            },
            include: [
                {
                    model: this.#Category,
                    as: "category"
                }
            ]
        })

        return theProduct
    }

})()