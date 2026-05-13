const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Favorite;
    #User;
    #Category;
    #Product;
    constructor() {
        autoBind(this);
        this.#Favorite = models.Favorite
        this.#User = models.User
        this.#Category = models.Category
        this.#Product = models.Product
    }

    async findAllUserFavorites(userId, include = false) {
        const theFavorites = await this.#Favorite.findAll({
            where: {
                user_id: userId
            },
            include: include ? [
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
            ] : null
        })

        return theFavorites
    }

    async findUserFavorite(userId, productId, include) {
        const theFavorite = await this.#Favorite.findOne({
            where: {
                product_id: productId,
                user_id: userId
            },
            include: include ? [
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
            ] : null
        })

        return theFavorite
    }

    async deleteFavorite(favoriteId) {
        await this.#Favorite.destroy({
            where: {
                id: favoriteId
            }
        })
    }

    async createFavorite(userId, productId) {
        await this.#Favorite.create({
            user_id: userId,
            product_id: productId
        })
    }

})()