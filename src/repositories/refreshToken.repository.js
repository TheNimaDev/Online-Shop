const { models, Op } = require("../core/db")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #Refreshtoken;
    constructor() {
        autoBind(this);
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

    async findByUserId(userId) {
        const refreshTokenFound = await this.#Refreshtoken.findOne({
            where: {
                user_id: userId
            }
        });

        return refreshTokenFound
    }

    async updateRefreshToken(refreshToken, userId, expire, version) {
        const theUserRefreshToken = await this.findByUserId(userId)

        await theUserRefreshToken.update({
            refresh_token: refreshToken,
            user_id: userId,
            expire_time: expire,
            version: ++version
        })
    }

    async deleteRefreshToken(userId) {
        await this.#Refreshtoken.destroy({
            where: {
                user_id: userId
            }
        })
    }

})