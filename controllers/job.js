const Job = require("../models/jobs")
const {StatusCodes} = require('http-status-codes')
const { badRequest, customError, notFound} = require("../errors/index")


const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort("createdAt")
    res.status(StatusCodes.OK).json({jobs})
}

const getJob = async (req, res) => {
    const {user:{userId}, params: {id}} = req
    const job = await Job.findOne({
        _id: id, createdBy: userId
    })

    if (!job) {
        throw new notFound("no job found with the specified id")
    }

    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {

    req.body.createdBy = req.user.userId
    const job = await Job.create({...req.body})
    res.status(StatusCodes.CREATED).json({job});

}

const updateJob = async (req, res) => {
    const {body:{company, position}, user: {userId}, params: {id}} = req

    if (!company || !position) {
        throw new badRequest("please insert company name or position to update")
    }

    const job = await Job.findByIdAndUpdate(
        {_id: id, createdBy: userId}, 
        req.body, 
        {new: true, runValidators: true}
    )
    
    if (!job || id.length != 24) {
        throw new notFound("No job with that id")
    }
    
    console.log(id.length);
    res.status(StatusCodes.OK).json({job})

}

const deleteJob = async (req, res) => {
    
}
  
module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}