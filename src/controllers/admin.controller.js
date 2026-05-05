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

})()