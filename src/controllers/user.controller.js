const userService = require("../services/user.service")
const createHttpError = require("http-errors");

const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #UserService;
    constructor() {
        autoBind(this);
        this.#UserService = userService
    }

    async changePassword(req, res) {
        const { current_password, new_password } = req.body
        const theUser = req.user

        const result = await userService.changePasswordService(theUser.id, current_password, new_password)

        if (result == "PASSWORD_IS_INCORRECT") {
            throw new createHttpError.Unauthorized("Password Is Incorrect.")
        } else if (result == "NEW_PASSWORD_IS_MATCH_WITH_CURRENT_PASSWORD") {
            throw new createHttpError.Conflict("Please Send A New Password.")
        }

        return res.status(201).send({
            message: "The User Password Changed Successfully!"
        })
    }

    async changeInfo(req, res) {
        const { name } = req.body
        const theUser = req.user

        const result = await userService.changeInfoService(theUser.id, name)

        return res.status(201).send({
            message: "The User Info Changed Successfully!"
        })
    }

    async getFavorites(req, res) {
        const theUser = req.user

        const result = await userService.getFavoritesService(theUser.id)

        return res.status(200).send(result)
    }

    async deleteFavorite(req, res) {
        const theUser = req.user
        const { productId } = req.params

        const result = await userService.deleteFavoriteService(theUser.id, productId)

        if (result == "FAVORITE_NOT_FOUND") {
            throw new createHttpError.NotFound("The Favorite Not Found.")
        }

        return res.status(201).send({
            message: "The Favorite Deleted Successfully!"
        })
    }

    async createFavorite(req, res) {
        const theUser = req.user
        const { productId } = req.params

        const result = await userService.createFavoriteService(theUser.id, productId)

        if (result == "FAVORITE_IS_EXISTS") {
            throw new createHttpError.Conflict("The Favorite Already Exists.")
        } else if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        }

        return res.status(201).send({
            message: "The Favorite Created Successfully!"
        })
    }

    async createComment(req, res) {
        const theUser = req.user
        const { productId } = req.params
        const { text, positivePoints, negetivePoints, rate } = req.body

        const result = await userService.createCommmentService(theUser.id, productId, text, positivePoints, negetivePoints, rate)

        if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        } else if (result == "USER_COMMENTED_BEFORE") {
            throw new createHttpError.Conflict("You Have Already Commented This Product.")
        }

        return res.status(201).send({
            message: "The Comment Created Successfully!"
        })
    }

    async createNote(req, res) {
        const theUser = req.user
        const { productId } = req.params
        const { text } = req.body

        const result = await userService.createNoteService(theUser.id, productId, text)

        if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        } else if (result == "NOTE_IS_EXISTS") {
            throw new createHttpError.Conflict("You Already Have A Note For This Product.")
        }

        return res.status(201).send({
            message: "The Note Created Successfully!"
        })
    }

    async updateNote(req, res) {
        const theUser = req.user
        const { productId } = req.params
        const { text } = req.body

        const result = await userService.updateNote(theUser.id, productId, text)

        if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        } else if (result == "NOTE_NOT_FOUND") {
            throw new createHttpError.NotFound("The Note Not Found.")
        }

        return res.status(201).send({
            message: "The Note Updated Successfully!"
        })
    }

    async deleteNote(req, res) {
        const theUser = req.user
        const { productId } = req.params

        const result = await userService.deleteNote(theUser.id, productId)

        if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        } else if (result == "NOTE_NOT_FOUND") {
            throw new createHttpError.NotFound("The Note Not Found.")
        }

        return res.status(201).send({
            message: "The Note Deleted Successfully!"
        })
    }

    async getNote(req, res) {
        const theUser = req.user
        const { productId } = req.params

        const result = await userService.getNote(theUser.id, productId)

        if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        } else if (result == "NOTE_NOT_FOUND") {
            throw new createHttpError.NotFound("The Note Not Found.")
        }

        return res.status(200).send(result)
    }

    async getNotes(req, res) {
        const theUser = req.user

        const result = await userService.getNotes(theUser.id)

        return res.status(200).send(result)
    }

    async getCart(req, res) {
        const theUser = req.user

        const result = await userService.getCart(theUser.id)

        return res.status(200).send(result)
    }

    async addProductToCart(req, res) {
        const theUser = req.user
        const { productId } = req.params
        const { count } = req.body

        const result = await userService.addProductToCartService(theUser.id, productId, count)

        if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        } else if (result == "CART_ITEM_EXISTS") {
            throw new createHttpError.Conflict("This Product Is Already In Your Cart.")
        } else if (result == "INVENTORY_IS_NOT_ENOUGH") {
            throw new createHttpError.BadRequest("The Quantity Of The Product You Need Is Not Available.")
        }

        return res.status(201).send({
            message: "The Product Added To Your Cart Successfully!"
        })
    }

    async deleteProductToCart(req, res) {
        const theUser = req.user
        const { productId } = req.params

        const result = await userService.deleteProductToCartService(theUser.id, productId)

        if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        } else if (result == "CART_NOT_FOUND") {
            throw new createHttpError.NotFound("The Cart Not Found.")
        } else if (result == "CART_ITEM_NOT_FOUND") {
            throw new createHttpError.NotFound("The Item Not Found In Cart.")
        }

        return res.status(201).send({
            message: "The Product Deleted from Your Cart Successfully!"
        })
    }

    async updateProductToCart(req, res) {
        const theUser = req.user
        const { productId } = req.params
        const { count } = req.body

        const result = await userService.updateProductToCartService(theUser.id, productId, count)

        switch (result) {
            case "PRODUCT_NOT_FOUND":
                throw new createHttpError.NotFound("The Product Not Found.")
                break;
            case "CART_NOT_FOUND":
                throw new createHttpError.NotFound("The Cart Not Found.")
                break;
            case "CART_ITEM_NOT_FOUND":
                throw new createHttpError.NotFound("The Item Not Found In Cart.")
                break;
            case "INVENTORY_IS_NOT_ENOUGH":
                throw new createHttpError.BadRequest("The Quantity Of The Product You Need Is Not Available.")
                break;
        }

        return res.status(201).send({
            message: "The Product Updated In Your Cart Successfully!"
        })
    }

    async createCheckout(req, res) {
        const theUser = req.user

        const result = await userService.createCheckoutService(theUser.id)

        if (result == "CART_NOT_FOUND") {
            throw new createHttpError.NotFound("The Cart Not Found.")
        } else if (result == "CART_IS_EMPTY") {
            throw new createHttpError.BadRequest("The Cart Is Empty.")
        }

        return res.status(201).send({
            message: "The Checkout Created Successfully!",
            data: {
                success: `http://localhost:5005/user/checkout/verify/?authority=${result}&status=OK`,
                fail: `http://localhost:5005/user/checkout/verify/?authority=${result}&status=NOK`
            }
        })
    }

})