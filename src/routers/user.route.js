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
router.post("/favorites/delete/:productId", userController.deleteFavorite)
router.post("/favorites/create/:productId", userController.createFavorite)

router.post("/comment/:productId",userController.createComment)

router.post("/note/create/:productId",userController.createNote)
router.post("/note/update/:productId",userController.updateNote)
router.post("/note/delete/:productId",userController.deleteNote)
router.get("/note/:productId",userController.getNote)
router.get("/notes",userController.getNotes)

module.exports = router