const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #OrderItem;
    #Order;
    #Product;
    constructor() {
        autoBind(this);
        this.#OrderItem = models.OrderItem
        this.#Order = models.Order
        this.#Product = models.Product
    }

    async createOrderItem(orderId, productid, count, price) {
        await this.#OrderItem.create({
            order_id: orderId,
            product_id: productid,
            count,
            productPriceAtTimeOfPurchase: price,
        })
    }

})