const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Subject = require("../../models/adminModels/Subject");

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
    })

}