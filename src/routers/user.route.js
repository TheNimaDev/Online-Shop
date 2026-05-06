const express = require("express")

const userController = require("../controllers/user.controller")
const checkAuthMiddleware = require("../middlewares/checkAuth.middleware")
const authenticationGuard = require("../guards/authentication.guard")

const router = express.Router()

router.use(checkAuthMiddleware)
router.use(authenticationGuard())

router.post("/change/password", userController.changePassword)
router.post("/change/info", userController.changeInfo)

router.get("/favorites", userController.getFavorites)

module.exports = router