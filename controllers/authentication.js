const User = require("../models/user")
const { badRequest, unAuthenticatedError} = require('../errors/index')
const {StatusCodes} = require("http-status-codes")


const register = async(req, res) => {
    try {
        
        const user = await User.create({...req.body})
        const named = user.getName()

        res.status(StatusCodes.CREATED).json({username: named})

    } catch (error) {
        console.log(error)
    }
    
    //console.log(user.name)
    // if(!name || !email || password) {
    //     throw new badRequest("please provide a name or email or password")
    // } 

    // const {name, email, password} = req.body
}



const login = async (req, res) => {

    const {email, password} = req.body

    if(!email || !password) {
        throw new badRequest("please provide email or password")
    }
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