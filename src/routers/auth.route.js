const express = require("express")

const authController = require("../controllers/auth.controller")
const checkAuthMiddleware = require("../middlewares/checkAuth.middleware")
const authenticationGuard = require("../guards/authentication.guard")
const validatorMiddleware = require("../middlewares/validator.middleware")
const authValidator = require("../validator/auth.validator")

const router = express.Router()

router.post("/register",
    authValidator.register(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    authController.register
)

router.post("/login",
    authValidator.login(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    authController.login
)

router.post("/logout",
    checkAuthMiddleware,
    authenticationGuard(),
    authController.logout
)

module.exports = router