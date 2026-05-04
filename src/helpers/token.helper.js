const config = require("../core/config")
const jwt = require("jsonwebtoken")

module.exports = new (class {
    async createRefreshToken(userId, version = 1) {
        const refreshToken = jwt.sign(
            {
                id: userId,
                expire: (Date.now() + (config.getAppConfig().refresh_token_expire)),
                version
            },
            config.getAppConfig().refresh_token_secret,
            {
                expiresIn: (Date.now() + (config.getAppConfig().refresh_token_expire))
            }
        )

        return refreshToken
    }

    async createAccessToken(userId) {
        const accessToken = jwt.sign(
            {
                id: userId,
                expire: (Date.now() + (config.getAppConfig().access_token_expire)),
            },
            config.getAppConfig().access_token_secret,
            {
                expiresIn: (Date.now() + (config.getAppConfig().access_token_expire))
            }
        )

        return accessToken
    }

    async verifyRefreshToken(refreshToken) {
        try {
            const theRefreshToken = jwt.verify(refreshToken, config.getAppConfig().refresh_token_secret)

            return theRefreshToken
        } catch (error) {
            return "TOKEN_IS_INVALID"
        }
    }

    async verifyAccessToken(accessToken) {
        try {
            const theAccessToken = jwt.verify(accessToken, config.getAppConfig().access_token_secret)

            return theAccessToken
        } catch (error) {
            return "TOKEN_IS_INVALID"
        }
    }
})