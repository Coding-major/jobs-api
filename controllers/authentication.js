const User = require("../models/user")
const { badRequest, unAuthenticatedError, customError} = require('../errors/index')
const {StatusCodes} = require("http-status-codes")


const register = async(req, res) => {


        const {name, email, password} = req.body
        const emailAlreadyExist = await User.findOne({email})

        if(emailAlreadyExist) {
            throw new badRequest("Email already exist naaaa")
        }
    
        const user = await User.create({...req.body})
        const token = user.createJWT()

        res.status(StatusCodes.CREATED).json({user:{username: user.name}, token})
 
}



const login = async (req, res) => {

    const {email, password} = req.body

    // if(!email || !password) {
    //     throw new badRequest("please provide email or password")
    // }
    const user = await User.findOne({email})

    
    if(!user) {
        throw new unAuthenticatedError("Not a user")
    }

    const isCorrect = await user.comparePassword(password)

    if (!isCorrect) {
        throw new unAuthenticatedError("password is incorrect")
    }


    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user: {name: user.name}, token})

}


 
module.exports = {
    register,
    login
}