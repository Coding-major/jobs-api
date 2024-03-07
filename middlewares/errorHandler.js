const {StatusCodes} = require("http-status-codes")
const {customError} = require("../errors")


const errorHandler = (err, req, res, next) => {
      let statusCode = StatusCodes.INTERNAL_SERVER_ERROR
      let message = err.message;

      if (err instanceof customError) {
          return res.status(err.statusCode).json({msg: err.message})
      }

      if (err.name === "ValidationError") {
          statusCode = 400
          message = "email or password or name is blank"
      }

      if (err.code === 11000) {
        statusCode = 400
        message = "user with that emailsss already exist"
        //return res.status(StatusCodes.BAD_REQUEST).json({errorName: err.name, msg: "user with that email already exist"})
    }

      if (err.name === "CastError") {
          statusCode = 400;
          message = `Invalid params of ${err.value}`
      }

      
      return res.status(statusCode).json({msg: message})
}

  


module.exports = errorHandler

