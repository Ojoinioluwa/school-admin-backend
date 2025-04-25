const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Department = require("../../models/adminModels/Department");
const Level = require("../../models/adminModels/Level");



const levelController = {
    // create the department to be done only by the admin
    create: asyncHandler(async(req,res)=> {
        const {name, year} = req.body;
        const {departmentId} = req.params
        // checking if the client passes the necessary informations
        if(!name || !year){
            res.status(400)
            throw new Error("All fields are required to create a level")
        }
        if(!departmentId){
            res.status(404)
            throw new Error("PLease go through the correct Url")
        }
        // checking if the department exist before creating the level for that department
        const departmentExist = await Department.findById(departmentId);
        if(!departmentExist){
            res.status(400)
            throw new Error("Department Does not exist");
        }
        // creating the department
        const level = await Level.create({
            name,
            year,
            departmentId
        });

        // pushing the levelId to the department
        departmentExist.Levels.push({levelId: level._id})
        // saving the changes made to the department
        await departmentExist.save()
        res.status(200).json({
            message: "Level Created Succesfully"
        })
    }),
    getLevelsForDepartment: asyncHandler(async(req,res)=> {
        const {departmentId} = req.params
        if(!departmentId){
            throw new Error("Incorrect Url do not modify the url")
        }
        // checking if the department exist
        const departmentExist = await Department.findById(departmentId);
        if(!departmentExist) {
            res.status(400)
            throw new Error("Department does not exist");
        }
        // finding the levels by the department id
        const levels = await Level.find({departmentId})

        res.json({
            message: `Levels fetched succesffully ${departmentExist.name}`,
            levels
        })

    }),
    editLevel: asyncHandler(async(req,res)=> {
        const {levelId} = req.params
        const level = await Level.findById(levelId)

        if(!level){
            throw new Error("Level does not exist")
        }

    }),
    leveinfo: asyncHandler(async(req,res)=> {
        const {levelId} = req.params
        const levelInfo =  await Level.findById(levelId);
        if(!levelInfo){
            res.status(400)
            throw new Error("Level Not found can't display information");
        }
        res.status(200).json({
            message: "Level info fetched succesfully",
            levelInfo
        })
    })
}


module.exports = levelController