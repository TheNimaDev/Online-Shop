const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Order;
    #User;
    #Checkout;
    #OrderItem;
    #Product;
    constructor() {
        autoBind(this);
        this.#Order = models.Order
        this.#User = models.User
        this.#Checkout = models.Checkout
        this.#OrderItem = models.OrderItem
        this.#Product = models.Product
    }

    async createOrder(userId, checkoutId) {
        const theOrder = await this.#Order.create({
            user_id: userId,
            checkout_id: checkoutId
        })
        return theOrder
    }

    async findUserOrders(userId) {
        const theOrders = await this.#Order.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: this.#OrderItem,
                    as: "items",
                    include: [
                        {
                            model: this.#Product,
                            as: "product"
                        }
                    ]
                }
            ]
        })

        theOrders.forEach(order => {
            let orderTotalPrice = 0
            order.items.map(item => {
                item.dataValues.itemTotalPrice = (item.count * item.productPriceAtTimeOfPurchase)
            })

            order.items.map(item => {
                orderTotalPrice += item.dataValues.itemTotalPrice
            })
            order.dataValues.orderTotalPrice = orderTotalPrice
        })

        return theOrders

    }

    async getOrders() {
        const theOrders = await this.#Order.findAll({
            include: [
                {
                    model: this.#OrderItem,
                    as: "items",
                    include: [
                        {
                            model: this.#Product,
                            as: "product"
                        }
                    ]
                }
            ]
        })

        theOrders.forEach(order => {
            let orderTotalPrice = 0
            order.items.map(item => {
                item.dataValues.itemTotalPrice = (item.count * item.productPriceAtTimeOfPurchase)
            })

            order.items.map(item => {
                orderTotalPrice += item.dataValues.itemTotalPrice
            })
            order.dataValues.orderTotalPrice = orderTotalPrice
        })

        return theOrders

    }

})