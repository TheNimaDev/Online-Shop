const userRepo = require("../repositories/user.repository")
const favoriteRepo = require("../repositories/favorite.repository")
const commentRepo = require("../repositories/comment.repository")
const productRepo = require("../repositories/product.repository")
const noteRepo = require("../repositories/note.repository")
const cartRepo = require("../repositories/cart.repository")
const cartItemRepo = require("../repositories/cartItem.repository")
const checkoutRepo = require("../repositories/checkout.repository")
const orderRepo = require("../repositories/order.repository")
const orderItemRepo = require("../repositories/orderItem.repository")
const { v4: uuidV4 } = require('uuid')
const config = require("../core/config");
const bcrypt = require("bcrypt")

const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #UserRepo;
    #FavoriteRepo;
    #ProductRepo;
    #CommentRepo;
    #NoteRepo;
    #CartRepo;
    #CartItemRepo;
    #CheckoutRepo;
    #OrderRepo;
    #OrderItemRepo;
    constructor() {
        autoBind(this);
        this.#UserRepo = userRepo
        this.#FavoriteRepo = favoriteRepo
        this.#ProductRepo = productRepo
        this.#CommentRepo = commentRepo
        this.#NoteRepo = noteRepo
        this.#CartRepo = cartRepo
        this.#CartItemRepo = cartItemRepo
        this.#CheckoutRepo = checkoutRepo
        this.#OrderRepo = orderRepo
        this.#OrderItemRepo = orderItemRepo
    }

    async changePasswordService(userId, current_password, new_password) {
        const theUser = await this.#UserRepo.findUser({ id: userId }, true)

        const isPasswordCorrect = await bcrypt.compare(current_password, theUser.password)
        if (!isPasswordCorrect) return "PASSWORD_IS_INCORRECT"

        const isPasswordMatch = await bcrypt.compare(new_password, theUser.password)
        if (isPasswordMatch) return "NEW_PASSWORD_IS_MATCH_WITH_CURRENT_PASSWORD"

        const salt = await bcrypt.genSalt(3)
        const cryptedPass = await bcrypt.hash(new_password, salt)

        await this.#UserRepo.changePassword(theUser, cryptedPass)
    }

    async changeInfoService(userId, name) {
        const theUser = await this.#UserRepo.findUser({ id: userId })

        await this.#UserRepo.changeInfo(theUser, name)
    }

    async getFavoritesService(userId) {
        const theFavorites = await this.#FavoriteRepo.findAllUserFavorites(userId)

        return theFavorites
    }

    async deleteFavoriteService(userId, productId) {
        const theFavorite = await this.#FavoriteRepo.findUserFavorite(userId, productId)

        if (!theFavorite) return "FAVORITE_NOT_FOUND"

        await this.#FavoriteRepo.deleteFavorite(theFavorite.id)
    }

    async createFavoriteService(userId, productId) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"

        const isFavorite = await this.#FavoriteRepo.findUserFavorite(userId, productId)
        if (isFavorite) return "FAVORITE_IS_EXISTS"

        await this.#FavoriteRepo.createFavorite(userId, productId)
    }

    async createCommmentService(userId, productId, text, positivePoints, negetivePoints, rate) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"

        const isUserCommentedBefore = await this.#CommentRepo.findUserComment(userId, productId)
        if (isUserCommentedBefore) return "USER_COMMENTED_BEFORE"

        await this.#CommentRepo.createComment(userId, productId, text, positivePoints, negetivePoints, rate)
        await this.#ProductRepo.updateRateOfProduct(productId)
    }

    async createNoteService(userId, productId, text) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"

        const isUserNoteExists = await this.#NoteRepo.findUserNote(userId, productId)
        if (isUserNoteExists) return "NOTE_IS_EXISTS"

        await this.#NoteRepo.createNote(userId, productId, text)
    }

    async updateNote(userId, productId, text) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"

        const theNote = await this.#NoteRepo.findUserNote(userId, productId)
        if (!theNote) return "NOTE_NOT_FOUND"

        await this.#NoteRepo.updateNote(theNote, text)
    }

    async deleteNote(userId, productId) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"

        const isUserNoteExists = await this.#NoteRepo.findUserNote(userId, productId)
        if (!isUserNoteExists) return "NOTE_NOT_FOUND"

        await this.#NoteRepo.deleteNote(userId, productId)
    }

    async getNote(userId, productId) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"

        const theNote = await this.#NoteRepo.findUserNote(userId, productId)
        if (!theNote) return "NOTE_NOT_FOUND"

        return theNote
    }

    async getNotes(userId) {
        const theNotes = await this.#NoteRepo.findUserNotes(userId)

        return theNotes
    }

    async getCart(userId) {
        const theCart = await this.#CartRepo.findCart(userId)

        return theCart
    }

    async addProductToCartService(userId, productId, count) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"
        if (theProduct.inventory < count) return "INVENTORY_IS_NOT_ENOUGH"

        let theCart = await this.#CartRepo.findCart(userId)

        if (!theCart) {
            await this.#CartRepo.createCart(userId)
            theCart = await this.#CartRepo.findCart(userId)
        }

        const isItemExistsInCart = await this.#CartItemRepo.findCartItem({ cartId: theCart.id, productId })
        if (isItemExistsInCart) return "CART_ITEM_EXISTS"

        await this.#CartItemRepo.createCartItem(theCart.id, productId, count)
    }

    async deleteProductToCartService(userId, productId) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"

        const theCart = await this.#CartRepo.findCart(userId)
        if (!theCart) return "CART_NOT_FOUND"

        const isItemExistsInCart = await this.#CartItemRepo.findCartItem({ cartId: theCart.id, productId })
        if (!isItemExistsInCart) return "CART_ITEM_NOT_FOUND"

        await this.#CartItemRepo.deleteCartItem(theCart.id, productId)
    }

    async updateProductToCartService(userId, productId, count) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"

        const theCart = await this.#CartRepo.findCart(userId)
        if (!theCart) return "CART_NOT_FOUND"

        const isItemExistsInCart = await this.#CartItemRepo.findCartItem({ cartId: theCart.id, productId })
        if (!isItemExistsInCart) return "CART_ITEM_NOT_FOUND"
        if (theProduct.inventory < count) return "INVENTORY_IS_NOT_ENOUGH"

        await this.#CartItemRepo.updateCartItem(isItemExistsInCart, count)
    }

    async createCheckoutService(userId) {
        const theCart = await this.#CartRepo.findCart(userId)
        if (!theCart) return "CART_NOT_FOUND"
        if (!theCart.items.length) return "CART_IS_EMPTY"

        const theCheckout = await this.#CheckoutRepo.createCheckout(theCart, config.getAppConfig().checkout_expire, uuidV4())

        return theCheckout.authority
    }

    async verifyCheckoutService(userId, authority, status) {
        const checkout = await this.#CheckoutRepo.findCheckout({ authority })
        if (!checkout) return "CHECKOUT_NOT_FOUND"
        if (checkout.status != "pending") return "CHECKOUT_IS_VERIFIED"

        if (status == "NOK") {
            await this.#CheckoutRepo.updateStatus(checkout, "unpaid")
        } else if (status == "OK") {
            await this.#CheckoutRepo.updateStatus(checkout, "paid")

            const theCart = await this.#CartRepo.findCart(userId)
            if (!theCart) return "CART_NOT_FOUND"
            if (!theCart.items.length) return "CART_IS_EMPTY"

            const theOrder = await this.#OrderRepo.createOrder(userId, checkout.id)

            theCart.items.forEach(async product => {
                const theProduct = await this.#ProductRepo.findProduct({ id: product.product_id })
                if (!theProduct) return "PRODUCT_NOT_FOUND"

                await this.#ProductRepo.updateInventoryOfProduct(theProduct, product.count)
                await this.#OrderItemRepo.createOrderItem(theOrder.id, product.product_id, product.count, product.product.price)
                await this.#CartItemRepo.clearCartItems(theCart.id)
            })
        } else {
            return "STATUS_NOT_VALID"
        }
    }

    async getCheckoutsService(userId) {
        const theCart = await this.#CartRepo.findCart(userId)
        if (!theCart) return "CART_NOT_FOUND"

        const theCheckouts = await this.#CheckoutRepo.findUserCheckouts(theCart.id)
        return theCheckouts
    }

    async getOrdersService(userId) {
        const theOrders = await this.#OrderRepo.findUserOrders(userId)
        return theOrders
    }

})