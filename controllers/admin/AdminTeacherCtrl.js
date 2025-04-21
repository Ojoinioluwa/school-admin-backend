const mongoose = requjire("mongoose");
const asyncHandler = require("express-async-handler");
const { nanoid } = require("nanoid");

const adminTeacherSchema = {
    createTeacher: asyncHandler(async(req,res)=> {
        const {firstName, lastName, dateOfBirth,department, gender, email, phone } = req.body;
        const staffId = nanoid(8)
        if(!firstName || !lastName || !dateOfBirth || !department || !gender || !email || !phone){
            throw new Error("All required credentials are required to create a Teacher")
        }
    })
}