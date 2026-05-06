const config = require("../core/config")
const jwt = require("jsonwebtoken")

module.exports = new (class {
    async createRefreshToken(userId, now, version = 1) {
        const expire = now + config.getAppConfig().refresh_token_expire

        const refreshToken = jwt.sign(
            {
                id: userId,
                expire,
                version
            },
            config.getAppConfig().refresh_token_secret,
            {
                expiresIn: expire
            }
        )

        return refreshToken
    }

    async createAccessToken(userId, now) {
        const expire = now + config.getAppConfig().access_token_expire

        const accessToken = jwt.sign(
            {
                id: userId,
                expire
            },
            config.getAppConfig().access_token_secret,
            {
                expiresIn: expire
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