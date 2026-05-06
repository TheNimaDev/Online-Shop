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
        }

        return res.status(201).send({
            message: "The Comment Created Successfully!"
        })
    }

})