const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { nanoid } = require("nanoid");
const Teacher = require("../../models/teachersModels.js/Teacher");
const Student = require("../../models/studentsModels/Student");

const adminTeacherController = {
    filterTeachers: asyncHandler(async(req,res)=> {
        const {department, gender} = req.query

        const filters = {}

        if(department) filters.department = department

        if(gender) filters.gender = gender;

        const teachers = await Teacher.find(filters).lean()

        res.status(200).json({
            message: "teachers Fetched Successfully",
            teachers
        })
    }),


}

module.exports = adminTeacherController
