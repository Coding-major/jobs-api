require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()

const authRoute = require("./routes/auth")
const jobsRoute = require("./routes/jobs")


//error handler
const notFoundMiddleware = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/errorHandler")

//routes
app.use(express.json())
app.use("")
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000

const start = async () => {
    try {
        app.listen(port, console.log(`server is running on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()