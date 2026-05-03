const express = require("express")
const app = express()

const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const config = require("./core/config")


app.use(cookieParser(config.getAppConfig().cookie_secret))
app.use(cors())
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: config.getAppConfig().session_secret,
    cookie: {
        secure: false
    }
}))
app.use(helmet());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.send("ok")
})

module.exports = app