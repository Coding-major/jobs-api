require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()

//db
const connectDB = require("./db/connect")

const authRoute = require("./routes/auth")
const jobsRoute = require("./routes/jobs")


//error handler
const notFoundMiddleware = require("./middlewares/notFound")
const errorHandlerMiddleware = require("./middlewares/errorHandler")

//routes
app.use(express.json())
app.use("/api/v1/jobs", jobsRoute)
app.use("/api/v1/auth", authRoute)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)





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