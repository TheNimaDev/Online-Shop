const userRepo = require("../repositories/user.repository")
const favoriteRepo = require("../repositories/favorite.repository")
const bcrypt = require("bcrypt")

const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #UserRepo;
    #FavoriteRepo;
    constructor() {
        autoBind(this);
        this.#UserRepo = userRepo
        this.#FavoriteRepo = favoriteRepo
    }

    async changePasswordService(userId, current_password, new_password) {
        const theUser = await this.#UserRepo.findUser({ id: userId }, true)

        const isPasswordCorrect = await bcrypt.compare(current_password, theUser.password)
        if (!isPasswordCorrect) return "PASSWORD_IS_INCORRECT"

        const isPasswordMatch = await bcrypt.compare(new_password, theUser.password)
        if (isPasswordMatch) return "NEW_PASSWORD_IS_MATCH_WITH_CURRENT_PASSWORD"

        const salt = await bcrypt.genSalt(3)
        const cryptedPass = await bcrypt.hash(new_password, salt)

        await this.#UserRepo.changePassword(theUser, cryptedPass)
    }

    async changeInfoService(userId, name) {
        const theUser = await this.#UserRepo.findUser({ id: userId })

        await this.#UserRepo.changeInfo(theUser, name)
    }

    async getFavoritesService(userId) {
        const theFavorites = await this.#FavoriteRepo.findAllUserFavorites(userId)

        return theFavorites
    }

})