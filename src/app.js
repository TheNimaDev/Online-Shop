const express = require("express")

const app = express()

const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const session = require("express-session")


app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors())
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: process.env.SESSION_SECRET,
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