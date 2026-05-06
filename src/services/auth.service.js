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

        const now = Date.now()
        const refreshToken = await this.#TokenHelper.createRefreshToken(newUser.id, now)
        const accessToken = await this.#TokenHelper.createAccessToken(newUser.id, now)

        await this.#RefreshTokenRepo.createRefreshToken(refreshToken, newUser.id, (now + config.getAppConfig().refresh_token_expire))

        return { refreshToken, accessToken }
    }

    async loginService(email, password) {
        const theUser = await this.#UserRepo.findUser({ email }, true)

        if (!theUser) return "INCORRECT_DATA"
        const isPasswordCorrect = await bcrypt.compare(password, theUser.password)

        if (!isPasswordCorrect) return "INCORRECT_DATA"
        const theRefreshToken = await this.#RefreshTokenRepo.findByUserId(theUser.id)

        const now = Date.now()
        const refreshToken = await this.#TokenHelper.createRefreshToken(theUser.id, now, theRefreshToken?.version + 1 || undefined)
        const accessToken = await this.#TokenHelper.createAccessToken(theUser.id, now)

        if (theRefreshToken) {
            await this.#RefreshTokenRepo.updateRefreshToken(refreshToken, theUser.id, (now + config.getAppConfig().refresh_token_expire), theRefreshToken.version)
        } else {
            await this.#RefreshTokenRepo.createRefreshToken(refreshToken, theUser.id, (now + config.getAppConfig().refresh_token_expire))
        }

        return { refreshToken, accessToken }
    }

    async accessTokenService(token) {
        const decryptedToken = await this.#TokenHelper.verifyRefreshToken(token)

        if (decryptedToken == "TOKEN_IS_INVALID") return "TOKEN_IS_INVALID"

        const theRefreshToken = await this.#RefreshTokenRepo.findByUserId(decryptedToken.id)

        if (!theRefreshToken) return "TOKEN_IS_INVALID"
        if (!(theRefreshToken.version == decryptedToken.version && Date.now() < theRefreshToken.expire_time)) return "TOKEN_IS_INVALID"

        const theUser = await this.#UserRepo.findUser({ id: decryptedToken.id })

        if (!theUser) return "TOKEN_IS_INVALID"

        const now = Date.now()
        const accessToken = await this.#TokenHelper.createAccessToken(theUser.id, now)
        const refreshToken = await this.#TokenHelper.createRefreshToken(theUser.id, now, theRefreshToken.version + 1)

        await this.#RefreshTokenRepo.updateRefreshToken(refreshToken, theUser.id, (now + config.getAppConfig().refresh_token_expire), theRefreshToken.version)

        return { refreshToken, accessToken, theUser }
    }

    async logoutService(userId) {
        await this.#RefreshTokenRepo.deleteRefreshToken(userId)
    }

})()