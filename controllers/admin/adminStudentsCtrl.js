const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Student = require("../../models/studentsModels/Student");

const adminStudentsController = {
    filterStudent: asyncHandler(async(req,res)=> {
        const {gender, level} = req.query
        const filters = {}
        if(gender) filters.gender = gender;
        if(level) filters.level = level;
        
        const students = await Student.find(filters).select("-password").lean();
        if(students.length === 0){
            res.status(404)
            throw new Error("No Student Present")
        }
        res.status(200).json({
            message: "Students fetched successfully",
            students
        })
    }),
}

module.exports = adminStudentsController