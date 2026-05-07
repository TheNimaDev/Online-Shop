const { check } = require("express-validator")

module.exports = new (class {
    register() {
        return [
            check("name").not().isEmpty().withMessage("The name must not be empty"),
            check("name").isLength({ min: 3, max: 15 }).withMessage("The name length must be between 3 and 15 characters"),
            check("email").not().isEmpty().withMessage("Email must not be empty"),
            check("email").isEmail().withMessage("The email entered is not a valid email"),
            check("password").not().isEmpty().withMessage("Password must not be empty"),
            check("password").isLength({ min: 5, max: 24 }).withMessage("Password length must be between 5 and 24 characters")
        ]
    }

    login() {
        return [
            check("email").not().isEmpty().withMessage("Email must not be empty"),
            check("email").isEmail().withMessage("The email entered is not a valid email"),
            check("password").not().isEmpty().withMessage("Password must not be empty"),
            check("password").isLength({ min: 5, max: 24 }).withMessage("Password length must be between 5 and 24 characters")
        ]
    }
})()