const userRepo = require("../repositories/user.repository")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #UserRepo;
    constructor() {
        autoBind(this);
        this.#UserRepo = userRepo
    }

    async getUsersService(){
        const users=await this.#UserRepo.findUsers()

        return users
    }
    
})()