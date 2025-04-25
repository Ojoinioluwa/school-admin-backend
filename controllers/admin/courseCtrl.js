const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler");
const Subject = require("../../models/adminModels/Subject");

const subjectController = {
    createCourse: asyncHandler(async(req, res)=> {
        const {courseCode, courseTitle, year, semester, creditUnit, level, description} = req.body
        const {departmentId, levelId} = req.params
        if(!courseCode || !courseTitle || ! year || !semester || !creditUnit || !level || !description ){
            res.status(404)
            throw new Error("All fields  are required");
        }
        await Subject.create({
            courseCode,
            courseTitle,
            year,
            semester,
            creditUnit,
            level,
            description,
            departmentId,
            levelId
        })
        res.status(200).json({
            message: "Course created succesfully",
        })
    })
}


module.exports = subjectController