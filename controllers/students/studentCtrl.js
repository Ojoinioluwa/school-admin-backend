const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Subject = require("../../models/adminModels/Subject");
const Assignment = require("../../models/Assignment");
const Level = require("../../models/adminModels/Level");
const TeachersAnnouncement = require("../../models/teachersModels.js/TeachersAnnouncement");
const Task = require("../../models/Task");

const studentController = {
   
    // getting the enrolled courses for each user
    getCourses: asyncHandler(async(req, res) => {
        // const find the enrolled courses making use of the elemMatch and then using populate to get more info dfor sections like the teachers and student sice we onluy have the objectId of mongoose 
        const enrolledCourses = await Subject.find({
            students: { $elemMatch: { studentId: req.user } } 
        })
        .populate("teachers.teacherId", "firstName lastName email")  
        .populate("students.studentId", "firstName lastName email");  

        // sending the enrolled colurses 
        res.status(200).json({
            enrolledCourses
        })
    }), 

    //    - GET teachers for enrolled courses for the student
    getTeacher: asyncHandler(async(req, res)=> {
        // getting the enrolled courses same as the above logic but only populating the teacher field
        const enrolledCourses = await Subject.find({
            students:{ $elemMatch: {studentId: req.user}}
        }).populate("teachers.teacherId", "firstName lastName email");


        // getting the teacher information by looping throught the enrolled Courses and getting the infirmation of the teachers
        const teachersInfo = enrolledCourses.map(course => 
                course.teachers.map((teacher)=> (
                    {
                        teacherId: teacher.teacherId._id,
                        teacherName: `${teacher.teacherId.firstName} ${teacher.teacherId.lastName}`,
                        teacherEmail: teacher.teacherId.email,
                        role: teacher.teacherRole
                    }
                ))
        ).flat(); 
        // make sure to look into the .flat() method


        // sending the response
        res.status(200).json({
            teachersInfo
        })
    }),

    // get all assigmnets
    getAssignment: asyncHandler(async(req, res)=> {
        const enrolledCourses = await Subject.find({
            students: { $elemMatch: { studentId: req.user } } 
        }).select("_id")
        if(enrolledCourses.length === 0){
            throw new Error("No Enrolled coursee please enroll for courses");
        }

        const subjectIds = enrolledCourses.map(s => s._id);
        const assignments = await Assignment.find({SubjectId: {$in: subjectIds}})

        if(assignments.length === 0 ) throw new Error("No assignment present");

        res.status(200).json({
            message: "Assignments fetched successfully",
            assignments
        })
    }),

    // submit the assignments
    submitAssignment: asyncHandler(async(req, res)=> {
        const {assignmentDoc} = req.body;
        if(!assignmentDoc) throw new Error("Need to submit the docs to be able to submit");

    }),

 

    getTeachersAnnoucement: asyncHandler(async(req,res)=> {
        const getCourses = await Level.find({student: {$elemMatch: {studentId: req.user}}}).select("_id").lean();
        if(getCourses.length === 0) {
            res.status(404)
            throw new Error("Courses not found for the student");
        }
        const classId = getCourses.map((course)=> course._id)
        const annoucements = await TeachersAnnouncement.find({classId: {$in: classId}}).sort({date: -1}).lean();
        if(annoucements.length === 0){
            res.status(404)
            throw new Error("No Annoucement yet");
        }
        res.status(200).json({
            message: "Fetched Annoucements Successfully",
            annoucements
        })
    })
    // TODO: Pagination

}