/**
 * @swagger
 * 
 * tags:
 *  name: Admin
 *  description: Admin Routes
 */

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
 * 
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