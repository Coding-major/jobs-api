const {StatusCodes} = require("http-status-codes")
const {customError} = require("../errors")


const errorHandler = (err, req, res, next) => {
    if (err instanceof customError) {
        return res.status(err.statusCode).json({msg: err.message})
    }

    // if (err.code && err.code === 11000) {
    //     return res.status(StatusCodes.BAD_REQUEST).json({err: "mmmmmmmmmm"})
    // }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
}

module.exports = errorHandler

