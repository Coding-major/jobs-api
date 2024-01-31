const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "please provide the company name"],
            max: 30
        },

        position: {
            type: String,
            required: [true, "please provide position"],
            maxlength: 31
        },

        status: {
            type: String,
            enum: ['interview', 'declined', 'pending'],
            default: "pending"
        },

        createdBy : {
            type: mongoose.Types.ObjectId,
            ref: "User",

        }
    }, 
    
    {timestamps: true}
)

module.exports = mongoose.model("Job", jobsSchema)