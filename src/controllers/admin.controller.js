const adminService = require("../services/admin.service")
const createHttpError = require("http-errors");
const { default: autoBind } = require("auto-bind")

module.exports = new (class {
    #AdminService;
    constructor() {
        autoBind(this);
        this.#AdminService = adminService
    }

    async getUsers(req, res) {
        const result = await this.#AdminService.getUsersService()

        return res.status(200).send(result)
    }

    async createCategory(req, res) {
        const { slug, title, description } = req.body

        const result = await this.#AdminService.createCategoryService(slug, title, description)

        if (result == "CATEGORY_EXISTS") {
            throw new createHttpError.Conflict("The Category Already Exists.")
        }

        return res.status(201).send({
            messgae: "The Category Created Successfully!"
        })
    }

    async deleteCategory(req, res) {
        const { categoryId } = req.params

        const result = await this.#AdminService.deleteCategoryService(categoryId)

        if (result == "CATEGORY_NOT_FOUND") {
            throw new createHttpError.NotFound("The Category Not Found.")
        }

        return res.status(200).send({
            messgae: "The Category Deleted Successfully!"
        })
    }

    async updateCategory(req, res) {
        const { categoryId } = req.params
        const { slug, title, description } = req.body

        const result = await this.#AdminService.updateCategoryService(categoryId, slug, title, description)

        if (result == "CATEGORY_NOT_FOUND") {
            throw new createHttpError.NotFound("The Category Not Found.")
        } else if (result == "SLUG_IS_EXISTS") {
            throw new createHttpError.Conflict("The Slug Already Exists.")
        }

        return res.status(201).send({
            messgae: "The Category Updated Successfully!"
        })
    }

    async getCategory(req, res) {
        const { categoryId } = req.params

        const result = await this.#AdminService.getCategoryService(categoryId)

        if (result == "CATEGORY_NOT_FOUND") {
            throw new createHttpError.NotFound("The Category Not Found.")
        }

        return res.status(200).send(result)
    }

    async getCategories(req, res) {
        const result = await this.#AdminService.getCategoriesService()

        return res.status(200).send(result)
    }

    async getProducts(req, res) {
        const result = await this.#AdminService.getProductsService()

        return res.status(200).send(result)
    }

    async getProduct(req, res) {
        const { productId } = req.params

        const result = await this.#AdminService.getProductService(productId)

        if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        }

        return res.status(200).send(result)
    }

    async createProduct(req, res) {
        const { slug, title, price, description, inventory, categoryId } = req.body
        const result = await this.#AdminService.createProductService(slug, title, price, description, inventory, categoryId)

        if (result == "CATEGORY_NOT_FOUND") {
            throw new createHttpError.NotFound("The Category Not Found.")
        } else if (result == "PRODUCT_IS_EXISTS") {
            throw new createHttpError.Conflict("The Slug Already Exists.")
        }

        return res.status(201).send({
            messgae: "The product Created Successfully!"
        })
    }

    async deleteProduct(req, res) {
        const { productId } = req.params
        const result = await this.#AdminService.deleteProductService(productId)

        if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        }

        return res.status(201).send({
            messgae: "The product Deleted Successfully!"
        })
    }

    async updateProduct(req, res) {
        const { slug, title, price, description, inventory, categoryId } = req.body
        const { productId } = req.params
        const result = await this.#AdminService.updateProductService(productId, slug, title, price, description, inventory, categoryId)

        if (result == "CATEGORY_NOT_FOUND") {
            throw new createHttpError.NotFound("The Category Not Found.")
        } else if (result == "PRODUCT_NOT_FOUND") {
            throw new createHttpError.NotFound("The Product Not Found.")
        } else if (result == "SLUG_IS_EXISTS") {
            throw new createHttpError.Conflict("The Slug Already Exists.")
        }

        return res.status(201).send({
            messgae: "The product Updated Successfully!"
        })
    }

    async getOrders(req, res) {
        const result = await this.#AdminService.getOrdersService()

        return res.status(200).send(result)
    }

    async getUserOrders(req, res) {
        const { userId } = req.params

        const result = await this.#AdminService.getUserOrdersService(userId)
        if (result == "USER_NOT_FOUND") {
            throw new createHttpError.NotFound("The User Not Found.")
        }

        return res.status(200).send(result)
    }

})()