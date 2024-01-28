const mongoose = require("mongoose")

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

userSchema.pre("save", async function)

module.exports = mongoose.model("user", userSchema)