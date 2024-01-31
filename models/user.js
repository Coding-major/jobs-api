const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            min: [5, "letter must be more than 4"],
            max: 30,
            required: true
        },

        email: {
            type: String,
            required: [true, "Email must be provided"],
            min: 10,
            match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            `Please fill valid email address`
            ],
            unique: true
        },

        password: {
            type: String,
            required: [true, "please provide password"],
            min: [6, "password too short"]
        }
    }
)

// creating password
userSchema.pre("save", async function() {
    
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

})


//creating token
userSchema.methods.createJWT = function() {
    return jwt.sign({name: this.name, userID: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
} 

//comparing password
userSchema.methods.comparePassword = function(loginPassword) {
    return bcrypt.compare(loginPassword, this.password)
}


module.exports = mongoose.model("User", userSchema)