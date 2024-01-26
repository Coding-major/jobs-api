const User = require("../models/user")
const { badRequest } = require("../errors/badRequest")
const {StatusCodes} = require("http-status-codes")
const bcrypt = require("bcryptjs")


const register = async(req, res) => {
    try {
        const {name, email, password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPasssword = await bcrypt.hash(password, salt)


        const redefinedUser = {name, email, password: hashedPasssword}
        const user = await User.create({...redefinedUser})

        res.status(StatusCodes.CREATED).json({user})

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