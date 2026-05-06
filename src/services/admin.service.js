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
        const theProduct = await this.#Product.findProduct({ id: productId })

        if (!theProduct) return "PRODUCT_NOT_FOUND"

        return theProduct
    }

    async createProductService(slug, title, price, description, inventory, categoryId) {
        const isCategoryExists = await this.#Category.findCategory({ id: categoryId })
        if (!isCategoryExists) return "CATEGORY_NOT_FOUND"

        const isProductExists = await this.#Product.findProduct({ slug })
        if (isProductExists) return "PRODUCT_IS_EXISTS"

        await this.#Product.createProduct(slug, title, price, description, inventory, categoryId)
    }

    async deleteProductService(productId) {
        const isProductExists = await this.#Product.findProduct({ id: productId })
        if (!isProductExists) return "PRODUCT_NOT_FOUND"

        await this.#Product.deleteProduct(productId)
    }

    async updateProductService(productId, slug, title, price, description, inventory, categoryId) {
        const isProductExists = await this.#Product.findProduct({ id: productId })
        if (!isProductExists) return "PRODUCT_NOT_FOUND"

        if (slug && slug != isProductExists.slug) {
            const isProductExistsWithThisSlug = await this.#Product.findProduct({ slug })
            if (isProductExistsWithThisSlug) return "SLUG_IS_EXISTS"
        }

        if (categoryId && categoryId != isProductExists.category_id) {
            const isCategoryExists = await this.#Category.findCategory({ id: categoryId })
            if (!isCategoryExists) return "CATEGORY_NOT_FOUND"
        }

        await this.#Product.updateProduct(isProductExists, slug, title, price, description, inventory, categoryId)
    }

})()