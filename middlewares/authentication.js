const User = require('../models/user')
const { unAuthenticatedError} = require('../errors/index')
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new unAuthenticatedError("Authentication invalid")
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userID, userName: payload.name}
        
        next()
    } catch (error) {
        throw new unAuthenticatedError("invalid Authentication")
    }
}

module.exports = auth;