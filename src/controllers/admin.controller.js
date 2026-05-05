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

        return res.status(200).send({
            data: result
        })
    }

})()