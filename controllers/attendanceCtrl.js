const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentsModels/Student");
const studentAttendance = require("../models/studentsModels/studentAttendance");
const Level = require("../models/adminModels/Level");
const TeacherAttendance = require("../models/teachersModels.js/TeacherAttendance");

const countAttendance = (array, prop) => {
    const count = {};
    array.forEach((arr)=> count[arr[prop]] = (count[arr[prop]] || 0) + 1)
    return count
}

const attendanceController = {
    markStudentAttendance: asyncHandler(async(req, res)=> {
        const {attendanceArr} = req.body
        const {subjectId, classId} = req.params
        if(attendanceArr.length === 0) throw new Error("Can't mark the attendance because it is empty");
        await studentAttendance.insertMany(
            attendanceArr.map(a => ({ recordedBy: req.user, status: a.status, studentId: a.studentId, subjectId, classId }))
          );
          
        res.status(200).json({
            message: "Attendance Marked for the day"
        })
        
    }),
    markTeacherAttendance: asyncHandler(async(req,res)=> {
        const {attendanceArr} = req.body;
        if(attendanceArr.length === 0) throw new Error("Can't mark the attendance because it is empty")
        await TeacherAttendance.insertMany(
            attendanceArr.map((a)=> ({recordedBy: req.user, status: a.status, teacherId: a.teacherId}))
        )
        res.status(200).json({
            message: "Attendance marked for the day"
        })
    }),
    getStudentAttendancePerSubject: asyncHandler(async(req,res)=>{
        const {subjectId} = req.params
        const attendance = await studentAttendance.find({studentId: req.user, subjectId}).sort({date: -1}).lean()
        if(attendance.length === 0){
            res.status(404)
            throw new Error("No attendance record for this subject")
        }
        const countAttendance = countAttendance(attendance, "status")
        res.status(200).json({
            message: "Attendnace fetched Successfully",
            attendance,
            countAttendance
        })
    }),
    // getTeacherAttendance: asyncHandler(async(req,res)=>{
    //     const attendance = await TeacherAttendance.find({teacherId: req.user}).sort({date: -1}).lean();
    //     if(attendance.length === 0){
    //         res.status(404)
    //         throw new Error("No Attendnance record yet");
    //     }
    //     const countAttendance = countAttendance(attendance, "status")
    //     res.status(200).json({
    //         message: "Attendance Fetched Succesfully",
    //         attendance
    //     })
    // }),
    filterStudentAttendance: asyncHandler(async(req,res)=> {
        const {startDate, endDate, subjectID} = req.body
        const {subjectId: paramSubjectId} = req.params
        
        const filters = {studentId: req.user};
        if (startDate || endDate) {
            filters.date = {};
            if (startDate) filters.date.$gte = new Date(startDate);
            if (endDate) filters.date.$lte = new Date(endDate);
        }
    const subjectId = subjectID || paramSubjectId;
    if (subjectId) {
        filters.subjectId = subjectId;
    }
    const filteredAttendance = await  studentAttendance.find(filters).sort({date: -1}).lean();

    if (filteredAttendance.length === 0) {
        res.status(404);
        throw new Error("No attendance record found.");
    }
    const attendanceCount = countAttendance(filteredAttendance, "status")
    res.status(200).json({
        message: "Filtered Attendance fetched Successfully",
        filteredAttendance,
        attendanceCount
    })
        
    }),
    filterTeacherAttendance: asyncHandler(async(req,res)=> {
        const {startDate, endDate, status} = req.body
        const filters = {teacherId: req.user}
        if(startDate || endDate){
            filters.date = {}
         if(startDate)   filters.date.$gte = new Date(startDate)
         if(endDate)   filters.date.$lte = new Date(endDate)
        }
    if(status) {
        filters.status = status
    }
    const filteredAttendance = await TeacherAttendance.find(filters).sort({date: -1}).lean()
    if(filteredAttendance.length === 0) {
        res.status(404) 
        throw new Error("Attendance record is empty");
    }
    const attendanceCount = countAttendance(filteredAttendance, "status")   

    res.status(200).json({
        message: "Attendnaced fetched Succesfully",
        filteredAttendance,
        attendanceCount
    })
    })
    // TODO:   pagination and indexing 
};


module.exports = attendance