const express = require("express");
const attendanceRouter = express.Router()
const attendanceController = require("../../controllers/attendanceCtrl");


// ======================Teachers===============================
// marking students attendace
attendanceRouter.post("/api/v1/teachers/attendance/:classId/:subjectID", attendanceController.markStudentAttendance)

// get students attendance per subject 
attendanceRouter.get("/api/v1/teachers/attendance/:subjectId", attendanceController.getStudentAttendancePerSubject)

attendanceRouter.get("/api/v1/teachers/attendance", attendanceController.filterStudentAttendance)
attendanceRouter.get("/api/v1/teachers/attendance/:classId", attendanceController.getStudentsAttendancePerClass)

// ======================admin and teachers=========================




// ======================admin=========================
// marking teachers attendance 
attendanceRouter.post("/api/v1/admin/attendance", attendanceController.markTeacherAttendance);

// filter attendance
attendanceRouter.get("/api/v1/admin/attendance/", attendanceController.filterTeacherAttendance)

// 

module.exports = attendanceRouter