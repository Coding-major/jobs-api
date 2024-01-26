const mongoose = require("mongoose")

const connectionString = "mongodb://localhost:27017/JOBS-API"
const connectDB = (url) => {
    return mongoose.connect(connectionString)
}

module.exports = connectDB