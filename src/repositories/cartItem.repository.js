const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Cart;
    #CartItem;
    #Product;
    constructor() {
        autoBind(this);
        this.#Cart = models.Cart
        this.#CartItem = models.CartItem
        this.#Product = models.Product
    }

    async findCartItem({ id = null, cartId = null, productId = null }) {
        const theCart = await this.#CartItem.findOne({
            where: {
                [Op.or]: [
                    { id },
                    {
                        cart_id: cartId,
                        product_id: productId,
                    }
                ]
            }
        })

        return theCart
    }

    async createCartItem(cartId, productId, count) {
        await this.#CartItem.create({
            cart_id: cartId,
            product_id: productId,
            count
        })
    }

})()