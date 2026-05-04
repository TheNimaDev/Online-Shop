const { models, Op } = require("../core/db")

module.exports = new (class {
    #Refreshtoken;
    constructor() {
        this.#Refreshtoken = models.Refreshtoken
    }

    async createRefreshToken(refreshToken, userId, expire, version = 1) {
        await this.#Refreshtoken.create({
            refresh_token: refreshToken,
            user_id: userId,
            expire_time: expire,
            version
        })
    }

})