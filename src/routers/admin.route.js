const express = require("express")

const adminController = require("../controllers/admin.controller")
const checkAuthMiddleware = require("../middlewares/checkAuth.middleware")
const authenticationGuard = require("../guards/authentication.guard")
const authorizationGuard = require("../guards/authorization.guard")

const router = express.Router()

router.use(checkAuthMiddleware)
router.use(authenticationGuard())
router.use(authorizationGuard())

router.get("/users",adminController.getUsers)

module.exports = router