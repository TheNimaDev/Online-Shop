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

router.post("/category",adminController.createCategory)
router.post("/category/:categoryId",adminController.deleteCategory)
router.post("/category/:categoryId/update",adminController.updateCategory)
router.get("/category/:categoryId",adminController.getCategory)
router.get("/categories",adminController.getCategories)

router.get("/products",adminController.getProducts)
router.get("/product/:productId",adminController.getProduct)
router.post("/product",adminController.createProduct)
router.post("/product/:productId",adminController.deleteProduct)

module.exports = router