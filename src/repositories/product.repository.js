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

    async findProduct({ id = null, slug = null }) {
        const theProduct = await this.#Product.findOne({
            where: {
                [Op.or]: [
                    { id },
                    { slug }
                ]
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

    async createProduct(slug, title, price, description, inventory, categoryId) {
        await this.#Product.create({
            slug,
            title,
            price,
            description,
            inventory,
            category_id: categoryId
        })
    }

    async deleteProduct(productId) {
        await this.#Product.destroy({
            where: {
                id: productId
            }
        })
    }

})()