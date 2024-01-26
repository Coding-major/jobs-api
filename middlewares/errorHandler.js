const {StatusCodes} = require("http-status-codes")
const {customError} = require("../errors/index")


const errorHandler = async (err, req, res, next) => {
    if(err instanceof customError) {
        return res.status(err.statusCode).json({msg: err.message})
    } else {
        console.log(err);
        return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({msg: "Error from the server, we wil be back shortly"})
    }
}

module.exports = errorHandler

