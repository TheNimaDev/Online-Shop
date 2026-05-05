const createHttpError = require("http-errors")
const adminRepo = require("./../repositories/admin.repository")

module.exports = (handlerFunc = null) => {
    return async function (req, res, next) {
        const theUser = req.user

        const theAdmin = await adminRepo.findAdmin({ userId: theUser.id })

        if (theAdmin) return next();

        if (handlerFunc) {
            handlerFunc(req, res)
        } else {
            throw new createHttpError.Forbidden("This Path Is Protected, You Dont Have Access!")
        }
    }
}