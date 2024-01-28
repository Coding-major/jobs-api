const User = require("../models/user")
const { badRequest } = require("../errors/badRequest")
const {StatusCodes} = require("http-status-codes")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const register = async(req, res) => {
    try {
        
        const user = await User.create({...req.body})
        const token = jwt.sign({name:user.name, userID:user._id}, "secret", {expiresIn: "30d"})

        res.status(StatusCodes.CREATED).json({user:{name: user.name},token})


    

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

}



module.exports = {
    register,
    login
}