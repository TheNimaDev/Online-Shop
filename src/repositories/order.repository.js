const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Order;
    #User;
    #Checkout;
    constructor() {
        autoBind(this);
        this.#Order = models.Order
        this.#User = models.User
        this.#Checkout = models.Checkout
    }

    async createOrder(userId, checkoutId) {
        const theOrder = await this.#Order.create({
            user_id: userId,
            checkout_id: checkoutId
        })
        return theOrder
    }

})