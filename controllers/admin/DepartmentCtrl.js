const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Department = require("../../models/adminModels/Department");
const Teacher = require("../../models/teachersModels/Teacher");

// TODO: change the logic of the backend to ensure that the departmentId is stored not the 
// TODO: get the students that are in the department
// TODO: Add the feature of counting the number of students and the teachers in a dept

const departmentController = {
    createDepartment: asyncHandler(async(req, res)=> {
        const {name, code, description, profileImage, headOfDepartment} = req.body;
        if(!name || !code || !description || !profileImage){
            throw new Error("All required to create departments")
        }
        const deptExist = await Department.findOne({name})
        if(deptExist){
            throw new Error("Department already Exist")
        }
        await Department.create({
            name,
            code,
            description,
            profileImage,
            headOfDepartment
        })
        res.status(200).json({
            message: "Department created Successfully"
        })

    }),
    viewInfo: asyncHandler(async(req, res)=> {
        const {deptId} = req.params;
        const dept = await Department.findById(deptId);
        const teachers = await Teacher.find({department: dept.name}).select("-password")
        res.status(200).json({
            dept,
            teachers
        })
        
    }),
    editDept: asyncHandler(async(req, res)=> {
        const {description,profileImage, headOfDepartment, name} = req.body;
        const {deptId} = req.params;
        const dept = await Department.findById(deptId);
        if (!dept) {
            res.status(404)
            throw new Error("Department not found")
          }          
        if(description) dept.description = description
        if(profileImage) dept.profileImage = profileImage
        if(headOfDepartment) dept.headOfDepartment = headOfDepartment
        if(name) dept.name = name
        await dept.save();
        res.status(200).json({
            message: `${dept.name} was updated`
        })
        
    }),
    getAllDepartment: asyncHandler(async(req,res)=> {
        const depts = await Department.find().populate("headOfDepartment", "firstName lastName gender email").lean();
        if(depts.length === 0){
            res.status(404)
            throw new Error("No Department present. please create departments");
        }
        res.json({
            message: "All departments fetched",
            depts
        })
    })
}

module.exports = departmentController