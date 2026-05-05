const express = require("express")

const authController = require("../controllers/auth.controller")
const checkAuthMiddleware = require("../middlewares/checkAuth.middleware")
const authenticationGuard = require("../guards/authentication.guard")

const router = express.Router()

router.post("/register", authController.register)

router.post("/login", authController.login)

router.post("/logout",
    checkAuthMiddleware,
    authenticationGuard(),
    authController.logout
)

module.exports = router