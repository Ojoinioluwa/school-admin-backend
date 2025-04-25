const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler");
const Subject = require("../../models/adminModels/Subject");

const courseController = {
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
        res.status(201).json({
            message: "Course created succesfully",
        })
    }),
    listCourseAdmin: asyncHandler(async(req,res)=>{
        const {levelId, departmentId} = req.params;
        const filters = {};
        if(levelId) filters.levelId = levelId
        if(departmentId) filters.departmentId = departmentId
        const subjects =  await Subject.find(filters);
        if(subjects.length === 0){
            res.status(400);
            throw new Error("No subjects created yet");
        }
        rs.status(200).json({
            message: "Subjects fetched Succesfully",
            subjects
        })
        
    }),
    editCourse: asyncHandler(async(req,res)=> {
        const {teacherId} = req.body
        const { courseId } = req.params
        const course = await Subject.findById(courseId);
        if(!course){
            res.status(400);
            throw new Error("Course not found");
        }
        if(!teacherId){
            throw new Error("Couldn't edit the course information");
        }
        course.teacherId = teacherId;
        await Subject.save()
        res.json({
            message: "Subject information has been updated",
        })
    })

}


module.exports = courseController