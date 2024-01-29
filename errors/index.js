const customError = require("./custom-errors")
const badRequest = require("./badRequest")
const unAuthenticatedError = require("./authenticationError")
const notFound = require("./notFound")


module.exports = {
    customError,
    badRequest,
    unAuthenticatedError,
    notFound
}