import { StatusCodes } from "http-status-codes";
import customError from "./custom-errors";

class notFound extends customError {

    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = notFound;