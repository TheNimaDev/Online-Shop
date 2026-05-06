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

})