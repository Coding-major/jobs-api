const mongoose = require("mongoose")
const connectDB = require("../../store-api/db/connect")
const connectionString = "mongodb://localhost:27017/mystore"


const connectDB = (url) => {
    return mongoose.connect(connectionString, {
        useNewUrlParser: true,//
        useCreateIndex: true,
        useUnifiedTopology: true,//
        useFindAndModify: false
    })
}

module.exports = connectDB