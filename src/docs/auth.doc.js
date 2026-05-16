/**
 * @swagger
 * 
 * tags:
 *  name: Auth
 *  description: Auth Routes
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      register:
 *          type: object
 *          required:
 *              -   name
 *              -   email
 *              -   password
 *          properties:
 *              name: 
 *                  type: string
 *                  example: nima
 *              email: 
 *                  type: string
 *                  example: nima@gmail.com
 *              password: 
 *                  type: string
 *                  example: nima123
 *      login:
 *          type: object
 *          required:
 *              -   email
 *              -   password
 *          properties:
 *              email: 
 *                  type: string
 *                  example: nima@gmail.com
 *              password: 
 *                  type: string
 *                  example: nima123
 */

/**
 * @swagger
 * 
 * /auth/register:
 *  post:
 *      summary: Register With (Name, Email, Password)
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/register"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/register"
 *      responses:
 *          201:
 *              description: Success
 *          400:
 *              description: Validation Error
 *          409:
 *              description: Conflict Error (Email Is Exists)
 * 
 * /auth/login:
 *  post:
 *      summary: Login With (Email, Password)
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Validation Error
 *          401:
 *              description: Unauthorized Error (Email Or Password Is Incorrect)
 * 
 * /auth/logout:
 *  post:
 *      summary: Logout
 *      tags:
 *          -   Auth
 *      responses:
 *          200:
 *              description: Success
 *          401:
 *              description: Unauthorized Error (Authentication Error)
 */