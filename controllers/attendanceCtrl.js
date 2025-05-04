const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentsModels/Student");
const studentAttendance = require("../models/studentsModels/studentAttendance");
const Level = require("../models/adminModels/Level");
const TeacherAttendance = require("../models/teachersModels/TeacherAttendance");


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
            attendanceArr.map(att => ({ recordedBy: req.user, status: att.status, studentId: att.studentId, subjectId, classId, date: new Date() }))
          );
          
        res.status(200).json({
            message: "Attendance Marked for the day"
        })
        
    }),
    markTeacherAttendance: asyncHandler(async(req,res)=> {
        const {attendanceArr} = req.body;
        if(attendanceArr.length === 0) throw new Error("Can't mark the attendance because it is empty")
        await TeacherAttendance.insertMany(
            attendanceArr.map((a)=> ({recordedBy: req.user, status: a.status, teacherId: a.teacherId, date: new Date()}))
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
    getStudentsAttendancePerClass: asyncHandler(async(req,res)=> {
        const {classId} = req.params
        const attendance = await studentAttendance.find({classId}).sort({date: -1}).lean()
        if(attendance.length === 0){
            res.status(404)
            throw new Error("No attendance record for this class")
        }
        const attendanceCount = countAttendance(attendance, "status")
        res.status(200).json({
            message: "Attendance fetched Successfully",
            attendance,
            attendanceCount
        })
    }),
    filterStudentAttendance: asyncHandler(async(req,res)=> {
        const {startDate, endDate, subjectID} = req.query
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
        const {startDate, endDate, status} = req.query
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


module.exports = attendanceController