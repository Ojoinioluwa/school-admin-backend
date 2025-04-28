const express = require("express");
const departmentController = require("../../controllers/admin/DepartmentCtrl");

const deptRouter = express.Router()


//  TODO: endure that the routes are protected for sdmin level of manipulation
// departments logic

// create the department
deptRouter.post("/api/v1/admin/department/create-department", departmentController.createDepartment);

// view info of the department
deptRouter.get("/api/v1/admin/department/viewInfo/:deptId", departmentController.viewInfo);

// get all departments
deptRouter.get("/api/v1/admin/department/allDepts", departmentController.getAllDepartment);

// edit Department
deptRouter.put("/api/v1/admin/department/editDepartment/:deptId", departmentController.editDept);

module.exports = deptRouter