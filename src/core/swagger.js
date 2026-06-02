let express = require("express")
let router = express.Router()

const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

router.use(swaggerUi.serve)
router.get("/",
    swaggerUi.setup(
        swaggerJsDoc(
            {
                swaggerDefinition: {
                    openapi: "3.0.1",
                    info: {
                        title: "Online Shop - Backend",
                        description: "Online Shop Backend Documentation",
                        version: "1.0.0",
                        contact: {
                            name: "GitHub",
                            url: "https://github.com/TheNimadev"
                        }
                    }
                },
                apis: [process.cwd() + "/src/docs/*.doc.js"],
            }
        ),
        {}
    )
)

module.exports = router