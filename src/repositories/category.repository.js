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

    async findCategory({ slug = null, id = null }) {
        const theCategory = await this.#Category.findOne({
            where: {
                [Op.or]: [
                    { id },
                    { slug }
                ]
            },
            include: [
                {
                    model: this.#Product,
                    as: "products"
                }
            ]
        })

        return theCategory
    }

    async createCategory(slug, title, description) {
        await this.#Category.create({
            slug,
            title,
            description
        })
    }

    async deleteCategory(categoryId) {
        await this.#Category.destroy({
            where: {
                id: categoryId
            }
        })
    }

})()