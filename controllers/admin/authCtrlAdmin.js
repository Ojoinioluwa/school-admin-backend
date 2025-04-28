const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminUser = require("../../models/adminModels/AdminUser");
const Teacher = require("../../models/teachersModels/Teacher");
const Student = require("../../models/studentsModels/Student");

const countGender = (array)=> {
    const count = {};
    array.forEach((arr)=> {
        count[arr.gender] = (count[arr.gender] || 0) + 1
    })

    return count

}


  const authAdminController = {
    // TODO: apply more security concious approach
    login: asyncHandler(async(req,res)=> {
        const {email, password} = req.body;
        if(!email || !password){
            throw new Error("Fill in all neccessary fields")
        }
        const admin = await AdminUser.findOne({email})
        if(!admin){
            throw new Error("Admin does not exist")
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            throw new Error("Invalid Login credentials")
        }
        const token = jwt.sign({id: admin._id, role: admin.role}, "OjayKey", {expiresIn: "3d"})
        res.status(200).json({
            message: "Admin Login succesful",
            token,
            admin: {
                _id: admin._id,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email,
                role: admin.role
            }
        })

    }),

    register: asyncHandler(async(req,res)=> {
        const {firstName, lastName, email, phone,gender, dateOfBirth,address, profileImage, password } = req.body
        if(!firstName || !lastName || !email || !phone || !gender || !dateOfBirth || !address ||!profileImage || !password){
            throw new Error("Fill all required Fields");
        }
        const adminExist = await AdminUser.findOne({email});
        if(adminExist){
            throw new Error("Admin already exisit in the database");
        }
        const salt =  await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password, salt)
        const admin = await AdminUser.create({
            firstName, 
            lastName, 
            email, 
            phone,
            gender,
            dateOfBirth,
            address, 
            profileImage, 
            password: hashedPassword,
        })
        res.status(200).json({
            message: "admin created Successfully",
        })
    }),
    getCountsAndInfo: asyncHandler(async(req,res)=> {
        const students = await Student.find()
        const teachers = await Teacher.find()
        const numOfStudents = students.length
        const numOfTeachers = teachers.length
        const studentGender = countGender(students)
        const teacherGender = countGender(teachers)

       const studentData = [
        {name: "male", value: studentGender.male},
        {name: "female", value: studentGender.female}
       ]
       const teacherData = [
        {name: "male", value: teacherGender.male},
        {name: "female", value: teacherGender.female}
       ]

        res.json({
           numOfStudents,
           numOfTeachers,
           studentData,
           teacherData,
        })
   })
  };

  module.exports = authAdminController;


