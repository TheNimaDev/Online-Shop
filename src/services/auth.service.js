const userRepo = require("../repositories/user.repository")
const refreshTokenRepo = require("../repositories/refreshToken.repository")
const tokenHelper = require("../helpers/token.helper")
const config = require("../core/config")
const bcrypt = require("bcrypt")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #UserRepo;
    #RefreshTokenRepo;
    #TokenHelper;
    constructor() {
        autoBind(this);
        this.#UserRepo = userRepo
        this.#RefreshTokenRepo = refreshTokenRepo
        this.#TokenHelper = tokenHelper
    }

    async registerService(name, email, password) {
        const theUser = await this.#UserRepo.findUser({ email })

        if (theUser) return "USER_EXISTS"

        const salt = await bcrypt.genSalt(3)
        const cryptedPass = await bcrypt.hash(password, salt)

        const newUser = await this.#UserRepo.createUser(name, email, cryptedPass)


        const refreshToken = await this.#TokenHelper.createRefreshToken(newUser.id)
        const accessToken = await this.#TokenHelper.createAccessToken(newUser.id)

        await this.#RefreshTokenRepo.createRefreshToken(refreshToken, newUser.id, (Date.now() + config.getAppConfig().refresh_token_expire))

        return { refreshToken, accessToken }
    }

    async loginService(email, password) {
        const theUser = await this.#UserRepo.findUser({ email }, true)

        if (!theUser) return "INCORRECT_DATA"
        const isPasswordCorrect = await bcrypt.compare(password, theUser.password)

        if (!isPasswordCorrect) return "INCORRECT_DATA"
        const theUerRefreshToken = await this.#RefreshTokenRepo.findByUserId(theUser.id)

        const refreshToken = await this.#TokenHelper.createRefreshToken(theUser.id, theUerRefreshToken?.version)
        const accessToken = await this.#TokenHelper.createAccessToken(theUser.id)

        if (theUerRefreshToken) {
            await this.#RefreshTokenRepo.updateRefreshToken(refreshToken, theUser.id, (Date.now() + config.getAppConfig().refresh_token_expire), theUerRefreshToken.version)
        } else {
            await this.#RefreshTokenRepo.createRefreshToken(refreshToken, theUser.id, (Date.now() + config.getAppConfig().refresh_token_expire))
        }

        return { refreshToken, accessToken }
    }
})()