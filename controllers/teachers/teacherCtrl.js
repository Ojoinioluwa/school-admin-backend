const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Subject = require("../../models/adminModels/Subject");



const teacherController = {
    getAssignedCourse: asyncHandler(async(req, res)=> {
        const assignedCourses = await Subject.find({teachers: {$elemMatch: {teacherId: req.user}}}).lean()
        if(assignedCourses.length === 0){
            res.status(404);
            throw new Error("No course assigned yet, consult with the admin")
        }
        res.status(200).json({
            message: "assigned courses Fetched successfully",
            assignedCourses
        })
    }), 
    makeAnnoucemnet: asyncHandler(async(req, res)=> {}),
    getRelatedAnnoucement: asyncHandler((req, res)=> {}),
    
}