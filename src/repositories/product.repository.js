const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Category;
    #Product;
    #Comment;
    #User;
    constructor() {
        autoBind(this);
        this.#Category = models.Category
        this.#Product = models.Product
        this.#Comment = models.Comment
        this.#User = models.User
    }

    async findProducts() {
        const theProducts = await this.#Product.findAll({
            include: [
                {
                    model: this.#Category,
                    as: "category"
                }, {
                    model: this.#Comment,
                    as: "comments",
                    include: [
                        {
                            model: this.#User,
                            as: "user",
                            attributes: {
                                exclude: ["password"]
                            }
                        }
                    ]
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
                }, {
                    model: this.#Comment,
                    as: "comments",
                    include: [
                        {
                            model: this.#User,
                            as: "user",
                            attributes: {
                                exclude: ["password"]
                            }
                        }
                    ]
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

    async updateProduct(theProduct, slug, title, price, description, inventory, categoryId) {
        await theProduct.update({
            slug: slug || theProduct.slug,
            title: title || theProduct.title,
            price: price || theProduct.price,
            description: description || theProduct.description,
            inventory: inventory || theProduct.inventory,
            categoryId: categoryId || theProduct.categoryId
        })
    }

    async updateRateOfProduct(productId) {
        const theProduct = await this.findProduct({ id: productId })

        if (theProduct.comments) {
            let rate = 0
            let totalRatesNumber = 0

            theProduct.comments.forEach(comment => {
                totalRatesNumber += comment.rate
            })

            rate = totalRatesNumber / theProduct.comments.length

            await theProduct.update({
                rate: rate.toFixed(1)
            })
        }
    }

})()