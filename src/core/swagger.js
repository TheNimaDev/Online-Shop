const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

module.exports = (app) => {
    const swaggerDocument = swaggerJsDoc({
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
    })

    const swagger = swaggerUi.setup(swaggerDocument, {})
    app.use("/", swaggerUi.serve, swagger)
}