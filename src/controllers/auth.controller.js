const authService = require("../services/auth.service")
const createHttpError = require("http-errors");
const cookieHelper = require("../helpers/cookie.helper")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #AuthService;
    #CookieHelper;
    constructor() {
        autoBind(this);
        this.#AuthService = authService;
        this.#CookieHelper = cookieHelper;
    }

    async register(req, res) {
        const { name, email, password } = req.body
        const result = await this.#AuthService.registerService(name, email, password)

        if (result === "USER_EXISTS") {
            throw new createHttpError.Conflict("A User With This Email Already Exists.")
        }

        await this.#CookieHelper.setRefreshTokenCookie(res, result.refreshToken)
        await this.#CookieHelper.setAccessTokenCookie(res, result.accessToken)

        return res.status(201).send({
            messgae: "The User Registered Successfullly!"
        })
    }

    async login(req, res) {
        const { email, password } = req.body
        const result = await this.#AuthService.loginService(email, password)

        if (result === "INCORRECT_DATA") {
            throw new createHttpError.Conflict("Email Or Password Is Incorrect.")
        }

        await this.#CookieHelper.setRefreshTokenCookie(res, result.refreshToken)
        await this.#CookieHelper.setAccessTokenCookie(res, result.accessToken)

        return res.status(201).send({
            message: "The User Logined Successfullly!"
        })
    }

})()