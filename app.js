require("dotenv").config()
require("express-async-errors")

// extra security packages
const helmet = require("helmet")
const cors = require("cors")
const xss = require('xss-clean')
const rateLimiter = require("express-rate-limit")


const express = require("express")
const app = express()

//db
const connectDB = require("./db/connect")

const authenticateUser = require("./middlewares/authentication")

const authRoute = require("./routes/auth")
const jobsRoute = require("./routes/jobs")


//error handler
const notFoundMiddleware = require("./middlewares/notFound")
const errorHandler = require("./middlewares/errorHandler")

app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100
    })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


app.use("/api/v1/jobs", authenticateUser, jobsRoute)
app.use("/api/v1/auth", authRoute)


app.use(notFoundMiddleware)
app.use(errorHandler)





const port = process.env.PORT || 3000




//connection
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`server is running on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()