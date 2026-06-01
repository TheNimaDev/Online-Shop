/**
 * @swagger
 *
 * tags:
 *  name: User
 *  description: User Routes
 */


// ?----------------- Change Routes
/**
 * @swagger
 * components:
 *  schemas:
 *      changePassword:
 *          type: object
 *          required:
 *              -   current_password
 *              -   new_password
 *          properties:
 *              current_password:
 *                  type: string
 *                  example: myCurrentPassword
 *              new_password:
 *                  type: string
 *                  example: myNewPassword
 *
 *      changeInfo:
 *          type: object
 *          required:
 *              -   name
 *          properties:
 *              name:
 *                  type: string
 *                  example: Nima
 */

/**
 * @swagger
 *
 * /user/change/password:
 *  post:
 *      summary: Change Password With (current_password, new_password)
 *      tags:
 *          -   User
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/changePassword"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/changePassword"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error
 *          401:
 *              description: Unauthorized Error (Authentication Error Or Password Is Incorrect)
 *          409:
 *              description: Conflict Error (New Password Is Match With Current Password)
 *
 * /user/change/info:
 *  post:
 *      summary: Change Info With (Name)
 *      tags:
 *          -   User
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/changeInfo"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/changeInfo"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *
 */


// ?----------------- Favorite Routes
/**
 * @swagger
 * /user/favorites:
 *  get:
 *      summary: Get Favorites
 *      tags:
 *          -   User
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *
 * /user/favorites/delete/{productId}:
 *  post:
 *      summary: Delete Favorite With (productId)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: productId
 *              type: string
 *      responses:
 *          201:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Favorite Not Found)
 *
 * /user/favorites/create/{productId}:
 *  post:
 *      summary: Create Favorite With (productId)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: productId
 *              type: string
 *      responses:
 *          201:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Favorite Not Found)
 *          409:
 *              description: Conflict Error (Product Already Is Favorite)
 */


// ?----------------- Comment Routes
/**
 * @swagger
 * components:
 *  schemas:
 *      createComment:
 *          type: object
 *          required:
 *              -   text
 *              -   positivePoints
 *              -   negetivePoints
 *              -   rate
 *          properties:
 *              text:
 *                  type: string
 *                  example: "its perfect"
 *              positivePoints:
 *                  type: object
 *              negetivePoints:
 *                  type: object
 *              rate:
 *                  type: number
 *                  example: 5
 */

/**
 * @swagger
 * /user/comment/{productId}:
 *  post:
 *      summary: Create Comment With (productId, Text, PositivePoints, NegetivePoints, Rate)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: productId
 *              type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/createComment"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Product Not Found)
 *          409:
 *              description: Conflict Error (Already Have Comment In This Product)
 */


// ?----------------- Note Routes
/**
 * @swagger
 * components:
 *  schemas:
 *      createNote:
 *          type: object
 *          required:
 *              -   text
 *          properties:
 *              text:
 *                  type: string
 *                  example: "its perfect"
 *
 *      updateNote:
 *          type: object
 *          required:
 *              -   text
 *          properties:
 *              text:
 *                  type: string
 *                  example: "its perfect"
 */

/**
 * @swagger
 * /user/note/create/{productId}:
 *  post:
 *      summary: Create Note With (productId, Text)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: productId
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/createNote"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/createNote"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Product Not Found)
 *          409:
 *              description: Conflict Error (Already Have Note For This Product)
 *
 * /user/note/update/{productId}:
 *  post:
 *      summary: Update Note With (productId, Text)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: productId
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/updateNote"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/updateNote"
 *      responses:
 *          201:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Product Not Found Or Note Not Found)
 *
 * /user/note/delete/{productId}:
 *  post:
 *      summary: Delete Note With (productId)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: productId
 *              type: string
 *      responses:
 *          201:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Product Not Found Or Note Not Found)
 *
 * /user/note/{productId}:
 *  get:
 *      summary: Get Note With (productId)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: productId
 *              type: string
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Product Not Found Or Note Not Found)
 *
 * /user/notes:
 *  get:
 *      summary: Get Notes
 *      tags:
 *          -   User
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 */


// ?----------------- Cart Routes
/**
 * @swagger
 * components:
 *  schemas:
 *      addProductToCart:
 *          type: object
 *          required:
 *              -   count
 *          properties:
 *              count:
 *                  type: number
 *                  example: 2
 *
 *      updateProductToCart:
 *          type: object
 *          required:
 *              -   count
 *          properties:
 *              count:
 *                  type: number
 *                  example: 2
 */

/**
 * @swagger
 * /user/cart:
 *  get:
 *      summary: Get Cart
 *      tags:
 *          -   User
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *
 * /user/cart/add/{productId}:
 *  post:
 *      summary: Add Product To Cart With (productId, Count)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: productId
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/addProductToCart"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/addProductToCart"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error Or Bad Request Error (Products Quantity Is Not Available)
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Product Not Found)
 *          409:
 *              description: Conflict Error (Already Product In Cart)
 *
 * /user/cart/delete/{productId}:
 *  post:
 *      summary: Delete Product In Cart With (productId)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: productId
 *              type: string
 *      responses:
 *          201:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Product Not Found Or Cart Not Found Or Product In Cart Not Found)
 *
 * /user/cart/update/{productId}:
 *  post:
 *      summary: Update Product In Cart With (productId, Count)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: path
 *              name: productId
 *              type: string
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/updateProductToCart"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/updateProductToCart"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error Or Bad Request Error (Products Quantity Is Not Available)
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Product Not Found Or Cart Not Found Or Product In Cart Not Found)
 */


// ?----------------- Checkout Routes
/**
 * @swagger
 * /user/checkouts:
 *  get:
 *      summary: Get Checkouts
 *      tags:
 *          -   User
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Cart Not Found)
 * 
 * /user/checkout:
 *  post:
 *      summary: Create Checkout
 *      tags:
 *          -   User
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad Request Error (Cart Is Empty)
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Cart Not Found)
 * 
 * /user/checkout/verify:
 *  post:
 *      summary: Verify Checkout With (Authority, Status)
 *      tags:
 *          -   User
 *      parameters:
 *          -   in: query
 *              name: authority
 *              type: string
 *          -   in: query
 *              name: status
 *              type: string
 *              description: OK Or NOK
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Bad Request Error (Cart Is Empty Or Status Not Valid)
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 *          404:
 *              description: NotFound Error (Checkout Not Found Or Cart Not Found)
 *          409:
 *              description: Conflict Error (Checkout Already Verified)
 */ 


// ?----------------- Order Routes
/**
 * @swagger
 * /user/orders:
 *  get:
 *      summary: Get Orders
 *      tags:
 *          -   User
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 */ 