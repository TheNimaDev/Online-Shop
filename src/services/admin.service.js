const userRepo = require("../repositories/user.repository")
const categoryRepo = require("../repositories/category.repository")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #UserRepo;
    #Category;
    constructor() {
        autoBind(this);
        this.#UserRepo = userRepo
        this.#Category = categoryRepo
    }

    async getUsersService() {
        const users = await this.#UserRepo.findUsers()

        return users
    }

    async createCategoryService(slug, title, description) {
        const isCategoryExists = await this.#Category.findCategory({ slug })

        if (isCategoryExists) return "CATEGORY_EXISTS"

        await this.#Category.createCategory(slug, title, description)
    }

    async deleteCategoryService(categoryId) {
        const isCategoryExists = await this.#Category.findCategory({ id: categoryId })

        if (!isCategoryExists) return "CATEGORY_NOT_FOUND"

        await this.#Category.deleteCategory(categoryId)
    }

    async getCategoryService(categoryId) {
        const theCategory = await this.#Category.findCategory({ id: categoryId })

        if (!theCategory) return "CATEGORY_NOT_FOUND"

        return theCategory
    }

    async getCategoriesService() {
        const theCategory = await this.#Category.findCategories()

        return theCategory
    }

})()