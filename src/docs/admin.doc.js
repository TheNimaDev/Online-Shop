/**
 * @swagger
 * 
 * tags:
 *  name: Admin
 *  description: Admin Routes
 */


// ?----------------- Users Routes
/**
 * @swagger
 * 
 * /admin/users:
 *  get:
 *      summary: Get Users List
 *      tags:
 *          -   Admin
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 */


// ?----------------- Categories Routes
/**
 * @swagger
 * components:
 *  schemas:
 *      createCategory:
 *          type: object
 *          required:
 *              -   slug
 *              -   title
 *              -   description
 *          properties:
 *              slug: 
 *                  type: string
 *                  example: cars
 *              title: 
 *                  type: string
 *                  example: The Cars
 *              description: 
 *                  type: string
 *                  example: Modern Cars Of The World
 *      updateCategory:
 *          type: object
 *          required:
 *              -   slug
 *              -   title
 *              -   description
 *          properties:
 *              slug: 
 *                  type: string
 *                  example: cars
 *              title: 
 *                  type: string
 *                  example: The Cars
 *              description: 
 *                  type: string
 *                  example: Modern Cars Of The World
 */

 /** 
 * @swagger
 * /admin/category:
 *  post:
 *      summary: Create Category With (Slug, Title, Description)
 *      tags:
 *          -   Admin
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/createCategory"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/createCategory"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 *          409:
 *              description: Conflict Error (Category Is Exists)
 * 
 * /admin/category/{categoryId}:
 *  post:
 *      summary: Delete Category With (categoryId)
 *      tags:
 *          -   Admin
 *      parameters:
 *          -   in: path        
 *              name: categoryId
 *              type: string
 *      responses:
 *          201:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 *          404:
 *              description: NotFound Error (Category Not Found)
 *  get:
 *       summary: Get Category With (categoryId)
 *       tags:
 *           -   Admin
 *       parameters:
 *           -   in: path        
 *               name: categoryId
 *               type: string
 *       responses:
 *           200:
 *               description: Success
 *           401:
 *               description: Unauthorized Error (Authentication Error)
 *           403:
 *               description: Forbidden Error (Authorization Error)
 *           404:
 *               description: NotFound Error (Category Not Found)
 * 
 * /admin/category/{categoryId}/update:
 *  post:
 *      summary: Update Category With (categoryId, Slug, Title, Description)
 *      tags:
 *          -   Admin
 *      parameters:
 *          -   in: path        
 *              name: categoryId
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/updateCategory"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/updateCategory"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 *          404:
 *              description: NotFound Error (Category Not Found)
 *          409:
 *              description: Conflict Error (New Slug Is Exists)
 * 
 * /admin/categories:
 *  get:
 *     summary: Get Categories
 *     tags:
 *         -   Admin
 *     responses:
 *         200:
 *             description: Success
 *         401:
 *             description: Unauthorized Error (Authentication Error)
 *         403:
 *             description: Forbidden Error (Authorization Error)
 */


// ?----------------- Products Routes
/**
 * @swagger
 * components:
 *  schemas:
 *      createProduct:
 *          type: object
 *          required:
 *              -   slug
 *              -   title
 *              -   price
 *              -   description
 *              -   inventory
 *              -   categoryId
 *          properties:
 *              slug: 
 *                  type: string
 *                  example: Bmw-730li
 *              title: 
 *                  type: string
 *                  example: The Bmw 730li
 *              price: 
 *                  type: number
 *                  example: 31500000000
 *              description: 
 *                  type: string
 *                  example: Bmw 730li Vip Black Optional
 *              inventory: 
 *                  type: number
 *                  example: 3
 *              categoryId: 
 *                  type: string
 *                  example: ""
 *      updateProduct:
 *          type: object
 *          required:
 *              -   slug
 *              -   title
 *              -   price
 *              -   description
 *              -   inventory
 *              -   categoryId
 *          properties:
 *              slug: 
 *                  type: string
 *                  example: Bmw-730li
 *              title: 
 *                  type: string
 *                  example: The Bmw 730li
 *              price: 
 *                  type: number
 *                  example: 31500000000
 *              description: 
 *                  type: string
 *                  example: Bmw 730li Vip Black Optional
 *              inventory: 
 *                  type: number
 *                  example: 3
 *              categoryId: 
 *                  type: string
 *                  example: ""
 */

 /**
 * @swagger
 * 
 * /admin/products:
 *  get:
 *      summary: Get Products List
 *      tags:
 *          -   Admin
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 * 
 * /admin/product/{productId}:
 *  get:
 *      summary: Get Product With (productId)
 *      tags:
 *          -   Admin
 *      parameters:
 *          -   in: path        
 *              name: productId
 *              type: string
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 *          404:
 *              description: NotFound Error (Product Not Found)
 * 
 *  post:
 *      summary: Delete Product With (productId)
 *      tags:
 *          -   Admin
 *      parameters:
 *          -   in: path        
 *              name: productId
 *              type: string
 *      responses:
 *          201:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 *          404:
 *              description: NotFound Error (Product Not Found)
 * 
 * /admin/product:
 *  post:
 *      summary: Create Product With (Slug, Title, Price, Description, Inventory, CategoryId)
 *      tags:
 *          -   Admin
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/createProduct"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/createProduct"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 *          404:
 *              description: NotFound Error (Product Not Found)
 *          409:
 *              description: Conflict Error (Product Is Exists)
 * 
 * /admin/product/{productId}/update:
 *  post:
 *      summary: Update Product With (productId, Slug, Title, Price, Description, Inventory, CategoryId)
 *      tags:
 *          -   Admin
 *      parameters:
 *          -   in: path        
 *              name: productId
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/updateProduct"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/updateProduct"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 *          404:
 *              description: NotFound Error (Product Or Category Not Found)
 *          409:
 *              description: Conflict Error (Slug Is Exists)
 */


// ?----------------- Orders Routes
/**
 * @swagger
 * 
 * /admin/orders:
 *  get:
 *      summary: Get Users Orders List
 *      tags:
 *          -   Admin
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 * 
 * /admin/orders/{userId}:
 *  get:
 *      summary: Get User Orders List With (userId)
 *      tags:
 *          -   Admin
 *      parameters:
 *          -   in: path        
 *              name: userId
 *              type: string
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          403:
 *              description: Forbidden Error (Authorization Error)
 *          404:
 *              description: NotFound Error (User Not Found)
 */