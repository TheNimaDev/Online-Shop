const http = require("http")
const app = require("./app")
const { connectToDB } = require("./core/db")
const config = require("./core/config")

const server = http.createServer(app)
const port = config.getAppConfig().port

connectToDB()

server.listen(port, () => {
    console.log(`The APP Run Successfully On Port ${port}`)
})