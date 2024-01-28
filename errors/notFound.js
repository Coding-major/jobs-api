const { StatusCodes} = require("http-status-codes")
const customError = require("./custom-errors")

class notFound extends customError {

    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = notFound;