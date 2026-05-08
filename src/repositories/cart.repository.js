const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Cart;
    #CartItem;
    #User;
    #Product;
    constructor() {
        autoBind(this);
        this.#Cart = models.Cart
        this.#CartItem = models.CartItem
        this.#User = models.User
        this.#Product = models.Product
    }

    async findCart(userId) {
        const theCart = await this.#Cart.findOne({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: this.#CartItem,
                    as: "items",
                    include: [
                        {
                            model: this.#Product,
                            as: "product",
                        }
                    ]
                },
                {
                    model: this.#User,
                    as: "user",
                    attributes: {
                        exclude: ["password"]
                    }
                }
            ]
        })        
        
        return theCart
    }

    async createCart(userId) {
        await this.#Cart.create({
            user_id: userId
        })
    }

})()