const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Checkout;
    constructor() {
        autoBind(this);
        this.#Checkout = models.Checkout
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

})()