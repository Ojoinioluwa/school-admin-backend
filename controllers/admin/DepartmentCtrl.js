const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { default: Department } = require("../../models/adminModels/Department");

// TODO: change the logic of the backend to ensure that the departmentId is stored not the 

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
    findInfo: asyncHandler(async(req, res)=> {
        const {deptId} = req.params;
        const dept = await Department.findById(deptId);
        res.status(200).json({

        })
        
    })
}

module.exports = departmentController