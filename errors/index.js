const customError = require("./custom-errors")
const badRequest = require("./badRequest")
const unAuthenticated = require("./authenticationError")
const notFound = require("./notFound")


module.exports = {
    customError,
    badRequest,
    unAuthenticated,
    notFound
}