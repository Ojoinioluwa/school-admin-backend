const express = require("express");
const StudentUserControl = require("../../controllers/students/authCtrlStudents");
const studentsRouter = express.Router();

// login students
studentsRouter.post("/api/v1/student/login", StudentUserControl.login)





module.exports = studentsRouter