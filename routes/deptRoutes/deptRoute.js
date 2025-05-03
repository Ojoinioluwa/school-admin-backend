const express = require("express");
const multer = require('multer');
const { storage } = require('../../utils/cloudinary');
const upload = multer({ storage });
const { cloudinary } = require('../../utils/cloudinary');
const departmentController = require("../../controllers/admin/DepartmentCtrl");

const deptRouter = express.Router()


//  TODO: endure that the routes are protected for admin level of manipulation
// departments logic

// create the department for only admins alone
deptRouter.post("/api/v1/admin/department/create-department", upload.single("profileImage"), departmentController.createDepartment);

// for both admin and teacher to get the department info
// view info of the department
deptRouter.get("/api/v1/admin/department/viewInfo/:deptId", departmentController.viewInfo);


// for admin alone
// get all departments
deptRouter.get("/api/v1/admin/department/allDepts", departmentController.getAllDepartment);


// for admin alone
// edit Department
deptRouter.put("/api/v1/admin/department/editDepartment/:deptId", departmentController.editDept);

module.exports = deptRouter