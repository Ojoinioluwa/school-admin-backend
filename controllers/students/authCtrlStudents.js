const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { nanoid } = require('nanoid');
const Student = require("../../models/studentsModels/Student");
const Level = require("../../models/adminModels/Level");



const StudentUserControl = {
    // the register logic for the Student
    register: asyncHandler(async(req, res)=> {
        // gettimg the info from the info from the req.body
        const {firstName, lastName, email, password, gender, dateOfBirth, address, profileImage, classLevel, classYear} = req.body
        // making an instance of the student Id 
        const studentId = nanoid(8); 
        // checking if all the required fields are present
        if(!firstName || !lastName || !email || !password || !gender || !dateOfBirth || !address |!profileImage || !classLevel || !classYear){
            // throwing an error to be caught by the errorHandler consumed in the server.js poage
            throw new Error("All fields are required");
        }

        // checking if the Student already exist before creating the Student
        const existingStudent = await Student.findOne({ email });
        // if the Student exist throw an
        if (existingStudent) {
            throw new Error("Student with this email already exists");
        }


        // creating the salt for the password and hashing the password making use bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // finding the class based on the classLevel and the year 
        const classInfo = await Level.findOne({name: classLevel, year: classYear});


        // checking if the info is present to determine whether there will be an error
        if(!classInfo){
            // throwing the error if the classInfo is not present
            throw new Error("The class is not found")
        }

        // creating the Student and storing it in the database
        const Student = await Student.create({
            firstName, 
            lastName,
            email,
            password: hashedPassword,
            gender,
            dateOfBirth, 
            address,
            profileImage,
            studentId,
            classId: classInfo._id,
        })


        // sending the response and setting the status
        res.status(200).json({
            message: "Student created succesfully"
        })
    }),

    login: asyncHandler(async(req, res)=> {
        // getting the user from the req.body 
        // remember to add the logic of also logining with the student id later
        const {email, password} = req.body

        // check if all neccessary fields are present
        if(!email || !password){
            throw new Error("All fields are required to login");
        }
        // find the user in the database
        const user = await Student.findOne({email});
        // ijf the user does not exist throw an error
        if(!user){
            throw new Error("Student does not exist. please login to continue");
        }

        // compare the passwords from the user and the database using bcrypt to verify
        const isPasswordValid =  await bcrypt.compare(password, user.password)
        // check if the user passowrd is the same if not throw an error 
        if(!isPasswordValid){
            throw new Error("Invalid Login credentials. Try again with the correct login credentials")
        }

        // create a token for the user using jsonwebtoken
        const token = jwt.sign({id: user._id, role: user.role}, "OjayKey", {expiresIn: "3d"});m

        // send to the frontend the token
        res.status(200).json({
            message: "Login Succesfully",
            token,
            student: { _id: user._id, firstName: user.firstName, lastName: user.lastName, studentId: user.studentId, email }
        })

    }),

    updateUserProfile: asyncHandler(async(req,res)=> {
        const {  email, address, profileImage } = req.body
        const student = await Student.findById(req.user);
        if(!student){
            throw new Error("Student not found please try again later")
        }
        if(email){
            student.email = email;
        }
        if(address){
            student.address = address;
        }
        if(profileImage){
            student.profileImage = profileImage;
        }

        await student.save();
        res.status(200).json({
            message: "user Profile update successfully"
        })


    }),

    viewInfo: async(async(req,res)=> {
        const user = await Student.findById(req.user).select("-password");

        if(!user){
            throw new Error("user information not found. Plese try again later");
        }

        res.status(200).json({
            message: "userInfo found",
            user
        })
    })
}

module.exports = StudentUserControl;
