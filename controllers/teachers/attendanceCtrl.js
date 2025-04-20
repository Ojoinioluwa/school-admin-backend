const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Student = require("../../models/studentsModels/Student");
const studentAttendance = require("../../models/studentsModels/studentAttendance");
const Level = require("../../models/adminModels/Level");


const attendance = {
    markAttendance: asyncHandler(async(req, res)=> {
        const {studentId, classLevel} = req.params;
        const {status, remarks, subject} = req.body
        if(!status){
            throw new Error("Please ensure ro fill all required fields");
        }
        const studentExist = await Student.findById(studentId);
        const classExist = await Level.findById(classLevel);
        if(!studentExist){
            throw new Error("Student does not exist");
        }
        if(!classExist){
            throw new Error("Class does not exist");
        }
        await studentAttendance.create({
            recordedBy: req.user,
            status,
            student: studentId,
            remarks,
            subject,
            classLevel
        });
    })
}


