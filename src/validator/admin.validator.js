const { check } = require("express-validator")

module.exports = new (class {
    createCategory() {
        return [
            check("slug").not().isEmpty().withMessage("The slug must not be empty"),
            check("slug").isLength({ min: 3 }).withMessage("The slug length must be more than 3 characters"),
            check("title").not().isEmpty().withMessage("The title must not be empty"),
            check("title").isLength({ min: 3 }).withMessage("The title length must be more than 3 characters"),
            check("description").not().isEmpty().withMessage("The description must not be empty"),
            check("description").isLength({ min: 10 }).withMessage("The description length must be more than 10 characters"),
        ]
    }

    updateCategory() {
        return [
            check("slug").not().isEmpty().withMessage("The slug must not be empty"),
            check("slug").isLength({ min: 3 }).withMessage("The slug length must be more than 3 characters"),
            check("title").not().isEmpty().withMessage("The title must not be empty"),
            check("title").isLength({ min: 3 }).withMessage("The title length must be more than 3 characters"),
            check("description").not().isEmpty().withMessage("The description must not be empty"),
            check("description").isLength({ min: 10 }).withMessage("The description length must be more than 10 characters"),
        ]
    }

    updateCategory() {
        return [
            check("slug").not().isEmpty().withMessage("The slug must not be empty"),
            check("slug").isLength({ min: 3 }).withMessage("The slug length must be more than 3 characters"),
            check("title").not().isEmpty().withMessage("The title must not be empty"),
            check("title").isLength({ min: 3 }).withMessage("The title length must be more than 3 characters"),
            check("description").not().isEmpty().withMessage("The description must not be empty"),
            check("description").isLength({ min: 10 }).withMessage("The description length must be more than 10 characters"),
        ]
    }

    createProduct() {
        return [
            check("slug").not().isEmpty().withMessage("The slug must not be empty"),
            check("slug").isLength({ min: 3 }).withMessage("The slug length must be more than 3 characters"),
            check("title").not().isEmpty().withMessage("The title must not be empty"),
            check("title").isLength({ min: 3 }).withMessage("The title length must be more than 3 characters"),
            check("price").not().isEmpty().withMessage("The price must not be empty"),
            check("price").isNumeric().withMessage("The price must be Number"),
            check("description").not().isEmpty().withMessage("The description must not be empty"),
            check("description").isLength({ min: 10 }).withMessage("The description length must be more than 10 characters"),
            check("inventory").not().isEmpty().withMessage("The inventory must not be empty"),
            check("inventory").isNumeric().withMessage("The inventory must be Number"),
            check("categoryId").not().isEmpty().withMessage("The categoryId must not be empty"),
            check("categoryId").isUUID(4).withMessage("The categoryId must be a valid id")
        ]
    }

    updateProduct() {
        return [
            check("slug").not().isEmpty().withMessage("The slug must not be empty"),
            check("slug").isLength({ min: 3 }).withMessage("The slug length must be more than 3 characters"),
            check("title").not().isEmpty().withMessage("The title must not be empty"),
            check("title").isLength({ min: 3 }).withMessage("The title length must be more than 3 characters"),
            check("price").not().isEmpty().withMessage("The price must not be empty"),
            check("price").isNumeric().withMessage("The price must be Number"),
            check("description").not().isEmpty().withMessage("The description must not be empty"),
            check("description").isLength({ min: 10 }).withMessage("The description length must be more than 10 characters"),
            check("inventory").not().isEmpty().withMessage("The inventory must not be empty"),
            check("inventory").isNumeric().withMessage("The inventory must be Number"),
        ]
    }
})()