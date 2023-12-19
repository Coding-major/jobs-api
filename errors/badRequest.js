const {StatusCodes} = require("http-status-codes")
const customError = require("./custom-errors")

class badRequest extends customError {

    constructor(message, statusCode) {
        super(message)
        this.message = message
        this.statusCode = StatusCodes.BAD_REQUEST
    }

}

module.exports = badRequest