const userRepo = require("../repositories/user.repository.js")
const bcrypt = require("bcrypt")

module.exports = new (class {
    #userRepo;
    constructor() {
        this.#userRepo = userRepo
    }

    async registerService(name, email, password) {
        const theUser = await this.#userRepo.findUser({ email })

        if (theUser) {
            return "USER_EXISTS"
        } else {
            const salt = await bcrypt.genSalt(3)
            const cryptedPass = await bcrypt.hash(password, salt)

            const newUser = await this.#userRepo.createUser(name, email, cryptedPass)

            return true
        }
    }
})()