const userRepo = require("../repositories/user.repository")
const categoryRepo = require("../repositories/category.repository")
const productRepo = require("../repositories/product.repository")
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #UserRepo;
    #Category;
    #Product;
    constructor() {
        autoBind(this);
        this.#UserRepo = userRepo
        this.#Category = categoryRepo
        this.#Product = productRepo
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

    async updateCategoryService(categoryId, slug, title, description) {
        const theCategory = await this.#Category.findCategory({ id: categoryId })

        if (!theCategory) return "CATEGORY_NOT_FOUND"

        if (slug && slug != theCategory.slug) {
            const isCategoryExistsWithThisSlug = await this.#Category.findCategory({ slug })
            if (isCategoryExistsWithThisSlug) return "SLUG_IS_EXISTS"
        }

        await this.#Category.updateCategory(theCategory, slug, title, description)
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

    async getProductsService() {
        const theProducts = await this.#Product.findProducts()

        return theProducts
    }

    async getProductService(productId) {
        const theProduct = await this.#Product.findProduct(productId)

        if (!theProduct) return "PRODUCT_NOT_FOUND"
        
        return theProduct
    }

})()