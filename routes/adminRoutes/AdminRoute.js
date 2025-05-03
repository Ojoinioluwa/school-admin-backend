const express = require("express")
const multer = require('multer');
const { storage } = require('../../utils/cloudinary');
const upload = multer({ storage });
const adminTeacherController = require("../../controllers/admin/AdminTeacherCtrl");
const adminStudentsController = require("../../controllers/admin/adminStudentsCtrl");
const authAdminController = require("../../controllers/admin/authCtrlAdmin");
const teacherUserController = require("../../controllers/teachers/authCtrlTeachers");
const StudentUserControl = require("../../controllers/students/authCtrlStudents");
const departmentController = require("../../controllers/admin/DepartmentCtrl");
const levelController = require("../../controllers/admin/LevelCtrl");
const schoolCalenderController = require("../../controllers/admin/schoolCalenderCtrl");

const adminRouter = express.Router()
// TODO: make a sepearte place for departments and RBAC for editing dept and creating Departments others can be viewed by others

// Filter teachers
adminRouter.get("/api/v1/admin/teachers", adminTeacherController.filterTeachers);
// Filter students
adminRouter.get("/api/v1/admin/students", adminStudentsController.filterStudent);
// login admin
adminRouter.post("/api/v1/admin/login", authAdminController.login);
// reguster admin
adminRouter.post("/api/v1/admin/register", upload.single("profileImage"), authAdminController.register);
// register teacher
adminRouter.post("/api/v1/admin/AddTeacher", upload.single("profileImage"), teacherUserController.register);
// register students
adminRouter.post("/api/v1/admin/AddStudent", upload.single("profileImage"), StudentUserControl.register);


// get basic info about the school to be displayed on the dashboard
adminRouter.get("/api/v1/admin/getBasicInfo", authAdminController.getCountsAndInfo)







module.exports = adminRouter