const express = require("express")

const adminController = require("../controllers/admin.controller")
const checkAuthMiddleware = require("../middlewares/checkAuth.middleware")
const authenticationGuard = require("../guards/authentication.guard")
const authorizationGuard = require("../guards/authorization.guard")
const validatorMiddleware = require("../middlewares/validator.middleware")
const adminValidator = require("../validator/admin.validator")

const router = express.Router()

router.use(checkAuthMiddleware)
router.use(authenticationGuard())
router.use(authorizationGuard())

router.get("/users", adminController.getUsers)

router.post("/category",
    adminValidator.createCategory(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    adminController.createCategory
)
router.post("/category/:categoryId", adminController.deleteCategory)
router.post("/category/:categoryId/update",
    adminValidator.updateCategory(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    adminController.updateCategory
)
router.get("/category/:categoryId", adminController.getCategory)
router.get("/categories", adminController.getCategories)

router.get("/products", adminController.getProducts)
router.get("/product/:productId", adminController.getProduct)
router.post("/product",
    adminValidator.createProduct(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    adminController.createProduct
)
router.post("/product/:productId", adminController.deleteProduct)
router.post("/product/:productId/update",
    adminValidator.updateProduct(),
    validatorMiddleware.validate().bind(validatorMiddleware),
    adminController.updateProduct
)

router.get("/orders", adminController.getOrders)
router.get("/orders/:userId", adminController.getUserOrders)

module.exports = router