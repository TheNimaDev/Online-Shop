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
 * 
 */