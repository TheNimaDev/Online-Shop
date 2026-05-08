const { check } = require("express-validator")

module.exports = new (class {
    changePassword() {
        return [
            check("current_password").not().isEmpty().withMessage("The current_password must not be empty"),
            check("current_password").isLength({ min: 5, max: 24 }).withMessage("The current_password length must be between 5 and 24 characters"),
            check("new_password").not().isEmpty().withMessage("The new_password must not be empty"),
            check("new_password").isLength({ min: 5, max: 24 }).withMessage("The new_password length must be between 5 and 24 characters")
        ]
    }

    changeInfo() {
        return [
            check("name").not().isEmpty().withMessage("The name must not be empty"),
            check("name").isLength({ min: 3 }).withMessage("The name length must be more than 3 characters")
        ]
    }

    createComment() {
        return [
            check("text").not().isEmpty().withMessage("The text must not be empty"),
            check("text").isLength({ min: 5 }).withMessage("The text length must be more than 5 characters"),
            check("positivePoints").not().isEmpty().withMessage("The positivePoints must not be empty"),
            check("positivePoints").isObject().withMessage("The positivePoints must be Object"),
            check("negetivePoints").not().isEmpty().withMessage("The negetivePoints must not be empty"),
            check("negetivePoints").isObject().withMessage("The negetivePoints must be Object"),
            check("rate").not().isEmpty().withMessage("The rate must not be empty"),
            check("rate").isNumeric().withMessage("The rate must be Number"),
        ]
    }

    createNote() {
        return [
            check("text").not().isEmpty().withMessage("The text must not be empty"),
            check("text").isLength({ min: 5 }).withMessage("The text length must be more than 5 characters")
        ]
    }

})()