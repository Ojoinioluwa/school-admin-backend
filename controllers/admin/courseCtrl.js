const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler");

const courseController = {
    createCourse: asyncHandler(async(req, res)=> {
        const {} = req.body
    })
}