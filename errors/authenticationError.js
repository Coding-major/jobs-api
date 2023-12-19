const {StatusCodes} = require("http-status-codes")
const customError = require("./custom-errors")
class unAuthenticated extends customError {

    constructor(message, statusCode) {
        super(message)
        this.message = message
        this.statusCode = StatusCodes.UNAUTHORIZED
    }

}

module.exports = unAuthenticated