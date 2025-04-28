const express = require("express")
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
adminRouter.post("/api/v1/admin/register", authAdminController.register);
// register teacher
adminRouter.post("/api/v1/admin/AddTeacher", teacherUserController.register);
// register students
adminRouter.post("/api/v1/admin/AddStudent", StudentUserControl.register);

// departments logic
adminRouter.post("/api/v1/admin/department/create-department", departmentController.createDepartment);
adminRouter.get("/api/v1/admin/department/viewInfo/:deptId", departmentController.viewInfo);
adminRouter.get("/api/v1/admin/department/allDepts", departmentController.getAllDepartment);
adminRouter.put("/api/v1/admin/department/editDepartment/:deptId", departmentController.editDept);


// Levels logic
// create Level for a department
adminRouter.post("/api/v1/admin/department/:departmentId/createLevel", levelController.create);

// get Levels for the departments
adminRouter.get("/api/v1/admin/department/:departmentId/getLevels", levelController.getLevelsForDepartment);

// get level for info for admin get all levels
adminRouter.put("/api/v1/admin/department/:departmentId/level/", levelController.editLevel);


// get basic info about the school to be displayed on the dashboard
adminRouter.get("/api/v1/admin/getBasicInfo", authAdminController.getCountsAndInfo)

// get the list of teachers
adminRouter.get("/api/v1/admin/filterTeachers", adminTeacherController.filterTeachers)





module.exports = adminRouter