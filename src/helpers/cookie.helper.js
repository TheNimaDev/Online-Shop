const config = require("../core/config")

module.exports = new (class {
    async setRefreshTokenCookie(res, token) {
        res.cookie("refresh_token", token, {
            path: "/",
            maxAge: config.getAppConfig().refresh_token_expire,
            httpOnly: true,
            sameSite: "strict",
            priority: "high",
            signed: true,
        })
    }

    async setAccessTokenCookie(res, token) {
        res.cookie("access_token", token, {
            maxAge: config.getAppConfig().access_token_expire,
            httpOnly: true,
            sameSite: "strict",
            priority: "medium",
            signed: true,
        })
    }

    async clearRefreshTokenCookie(res) {
        res.clearCookie("refresh_token")
    }

    async clearAccessTokenCookie(res) {
        res.clearCookie("access_token")
    }

})