const http = require("http")
const app = require("./app")
const { connectToDB } = require("./core/db")

const server = http.createServer(app)
const port = process.env.PORT

connectToDB()

server.listen(port, () => {
    console.log(`The APP Run Successfully On Port ${port}`)
})