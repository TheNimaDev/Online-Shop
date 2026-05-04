const authService = require("../services/auth.service")
const createHttpError = require("http-errors");

module.exports = new (class {
    #authService;
    constructor() {
        this.#authService = authService
    }

    async register(req, res) {
        const { name, email, password } = req.body
        const result = await authService.registerService(name, email, password)

        if (result === "USER_EXISTS") {
            throw new createHttpError.Conflict("A User With This Email Already Exists.");
        }

        return res.send(result)
    }

})()