const tokenHelper = require("../helpers/token.helper")
const userRepo = require("../repositories/user.repository")
const authService = require("../services/auth.service")
const cookieHelper = require("../helpers/cookie.helper")

module.exports = async (req, res, next) => {
    const theAccessToken = req.signedCookies.access_token

    if (theAccessToken) {
        const decryptedToken = await tokenHelper.verifyAccessToken(theAccessToken)

        if (decryptedToken != "TOKEN_IS_INVALID") {
            const theRefreshToken = req.signedCookies.refresh_token

            if (theRefreshToken) {
                const theUser = await userRepo.findUser({ id: decryptedToken.id })
                if (theUser) {
                    req.isLogin = true
                    req.user = theUser
                    return next()
                }
            }else{
                await cookieHelper.clearAccessTokenCookie(res)
            }
        }
    } else {
        const theRefreshToken = req.signedCookies.refresh_token

        if (theRefreshToken) {
            const result = await authService.accessTokenService(theRefreshToken)

            await cookieHelper.setRefreshTokenCookie(res, result.refreshToken)
            await cookieHelper.setAccessTokenCookie(res, result.accessToken)

            req.isLogin = true
            req.user = result.theUser

            return next()
        }
    }
    req.isLogin = false
    return next()
}