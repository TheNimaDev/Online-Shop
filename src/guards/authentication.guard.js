const createHttpError = require("http-errors");

module.exports = (handlerFunc = null) => {
    return function (req, res, next) {
        if (req.isLogin) {
            return next()
        } else {
            if (handlerFunc) {
                handlerFunc(req, res)
            } else {
                throw new createHttpError.Unauthorized("Please Login First!")
            }
        }
    }
}