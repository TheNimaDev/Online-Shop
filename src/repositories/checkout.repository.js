const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Checkout;
    #Cart;
    #User;
    constructor() {
        autoBind(this);
        this.#Checkout = models.Checkout
        this.#Cart = models.Cart
        this.#User = models.User
    }

    async createCheckout(theCart, expire, authority) {
        const theCheckout = await this.#Checkout.create({
            cart_id: theCart.id,
            expire,
            authority,
            total_price: theCart.dataValues.cartTotalPrice,
        })
        return theCheckout
    }

    async findCheckout({ authority = null, cartId = null }) {
        const theCheckout = await this.#Checkout.findOne({
            where: {
                [Op.or]: [
                    { cart_id: cartId },
                    { authority }
                ]
            },
            include: [
                {
                    model: this.#Cart,
                    as: "cart"
                }
            ]
        })

        return theCheckout
    }

    async updateStatus(checkout, status) {
        await checkout.update({
            status
        })
    }

    async findUserCheckouts(cartId, status = null) {
        const theCheckouts = await this.#Checkout.findAll({
            where: {
                cart_id: cartId
            }
        })

        const result = []
        if (theCheckouts && status) {
            theCheckouts.map(checkout => {
                if (checkout.status == status) {
                    result.push(checkout)
                }
            })
        }

        return status ? result : theCheckouts
    }

})()