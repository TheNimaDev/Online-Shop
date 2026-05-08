const express = require("express")

const userController = require("../controllers/user.controller")
const checkAuthMiddleware = require("../middlewares/checkAuth.middleware")
const authenticationGuard = require("../guards/authentication.guard")
const validatorMiddleware = require("../middlewares/validator.middleware")
const userValidator = require("../validator/user.validator")

const router = express.Router()

router.use(checkAuthMiddleware)
router.use(authenticationGuard())

router.post("/change/password",
    userValidator.changePassword(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    userController.changePassword
)
router.post("/change/info",
    userValidator.changeInfo(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    userController.changeInfo
)

router.get("/favorites", userController.getFavorites)
router.post("/favorites/delete/:productId", userController.deleteFavorite)
router.post("/favorites/create/:productId", userController.createFavorite)

router.post("/comment/:productId",
    userValidator.createComment(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    userController.createComment
)

router.post("/note/create/:productId",
    userValidator.createNote(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    userController.createNote
)
router.post("/note/update/:productId", userController.updateNote)
router.post("/note/delete/:productId", userController.deleteNote)
router.get("/note/:productId", userController.getNote)
router.get("/notes", userController.getNotes)

router.get("/cart", userController.getCart)
router.post("/cart/add/:productId",
    userValidator.addProductToCart(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    userController.addProductToCart
)
router.post("/cart/delete/:productId", userController.deleteProductToCart)
router.post("/cart/update/:productId",
    userValidator.updateProductToCart(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    userController.updateProductToCart
)

module.exports = router