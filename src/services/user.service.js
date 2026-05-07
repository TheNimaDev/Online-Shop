const userRepo = require("../repositories/user.repository")
const favoriteRepo = require("../repositories/favorite.repository")
const commentRepo = require("../repositories/comment.repository")
const productRepo = require("../repositories/product.repository")
const bcrypt = require("bcrypt")

const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #UserRepo;
    #FavoriteRepo;
    #ProductRepo;
    #CommentRepo;
    constructor() {
        autoBind(this);
        this.#UserRepo = userRepo
        this.#FavoriteRepo = favoriteRepo
        this.#ProductRepo = productRepo
        this.#CommentRepo = commentRepo
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

    async deleteFavoriteService(userId, productId) {
        const theFavorite = await this.#FavoriteRepo.findUserFavorite(userId, productId)

        if (!theFavorite) return "FAVORITE_NOT_FOUND"

        await this.#FavoriteRepo.deleteFavorite(theFavorite.id)
    }

    async createFavoriteService(userId, productId) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"

        const isFavorite = await this.#FavoriteRepo.findUserFavorite(userId, productId)
        if (isFavorite) return "FAVORITE_IS_EXISTS"

        await this.#FavoriteRepo.createFavorite(userId, productId)
    }

    async createCommmentService(userId, productId, text, positivePoints, negetivePoints, rate) {
        const theProduct = await this.#ProductRepo.findProduct({ id: productId })
        if (!theProduct) return "PRODUCT_NOT_FOUND"

        const isUserCommentedBefore = await this.#CommentRepo.findUserComment(userId, productId)
        if (isUserCommentedBefore) return "USER_COMMENTED_BEFORE"

        await this.#CommentRepo.createComment(userId, productId, text, positivePoints, negetivePoints, rate)
        await this.#ProductRepo.updateRateOfProduct(productId)
    }

})