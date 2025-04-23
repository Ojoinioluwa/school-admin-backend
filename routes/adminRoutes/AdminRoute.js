const express = require("express")
const adminTeacherController = require("../../controllers/admin/AdminTeacherCtrl");
const adminStudentsController = require("../../controllers/admin/adminStudentsCtrl");
const authAdminController = require("../../controllers/admin/authCtrlAdmin");
const teacherUserController = require("../../controllers/teachers/authCtrlTeachers");
const StudentUserControl = require("../../controllers/students/authCtrlStudents");
const departmentController = require("../../controllers/admin/DepartmentCtrl");

const adminRouter = express.Router()


adminRouter.get("/api/v1/admin/teachers", adminTeacherController.filterTeachers);
adminRouter.get("/api/v1/admin/students", adminStudentsController.filterStudent);
adminRouter.post("/api/v1/admin/login", authAdminController.login);
adminRouter.post("/api/v1/admin/register", authAdminController.register);
adminRouter.post("/api/v1/admin/AddTeacher", teacherUserController.register);
adminRouter.post("/api/v1/admin/AddStudent", StudentUserControl.register);
adminRouter.post("/api/v1/admin/create-department", departmentController.createDepartment);

module.exports = adminRouter