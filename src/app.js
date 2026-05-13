const express = require("express")
const app = express()

const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const createHttpError = require("http-errors")

const config = require("./core/config")
const errorHandler = require("./middlewares/errorHandler.middleware")

const authRouter = require("./routers/auth.route")
const adminRouter = require("./routers/admin.route")
const userRouter = require("./routers/user.route")


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

app.use("/auth", authRouter)
app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.use((req,res)=>{
    throw new createHttpError.NotFound("Route Not Found - 404")
})
app.use(errorHandler)

app.get("/", (req, res) => {
    res.send("ok")
})

module.exports = app