const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {nanoid} = require("nanoid");
const Teacher = require("../../models/teachersModels.js/Teacher");
const Level = require("../../models/adminModels/Level");
const Student = require("../../models/studentsModels/Student");




const teacherUserController = {
    register: asyncHandler(async(req, res)=> {
        // getting all the neccessary information from the req.body
        const {firstName, lastName, email, password, phone, gender, department, dateOfBirth,address, profileImage, yearsOfExperience } = req.body;


        // validating that all the fields are field in other to ensure that no error in inserting into the database
        if(!firstName || !lastName || !email || !password || !phone || !gender || !department || !dateOfBirth || !address || !profileImage || !yearsOfExperience){
            // throwing the error to the errorHandler
            throw new Error("All fields are required for registeration to be succesfull");
        }

        // checking if the staff already exist in the database
        const teacherFound = await Teacher.findOne({email})
        if(teacherFound){
            throw new Error("Techear already exists. Can't create a duplicate");
        }

        // generate the staff id using nanoid()
        const staffId = nanoid(8);
        // const generate salt 
        const salt = await bcrypt.genSalt(10);
        // hash the user password
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const teacher = await Teacher.create({
            firstName, 
            lastName, 
            email, 
            password: hashedPassword, 
            phone, 
            gender, 
            department, 
            dateOfBirth,
            address, 
            profileImage, 
            yearsOfExperience,
            staffId
        })


        res.status(200).json({
            message: "Teacher created Successfully",
            teacher: {
                firstName: teacher.firstName, 
                lastName: teacher.lastName, 
                email: teacher.email, 
                phone: teacher.phone, 
                gender: teacher.gender, 
                department: teacher.department, 
                dateOfBirth: teacher.dateOfBirth,
                address: teacher.address, 
                profileImage: teacher.profileImage, 
                yearsOfExperience: teacher.yearsOfExperience,
                staffId: teacher.staffId
            }
        })

    }),
    login: asyncHandler(async(req,res)=> {
        // get the info from the req.body
        const {email, password} = req.body;
        // checking if all infos are present
        if(!email || !password){
            throw new Error("All fields required");
        }

        // find if the teacher exist in the database
        const teacher = await Teacher.findOne({email});
        // throwing an error if the teacher does not exist
        if(!teacher){
            throw new Error("Teacher does not exist, ask the admin to create teacher");
        }

        // verify the password that was provided
        const isValidPassword = await  bcrypt.compare(password, teacher.password);
        // throw an error if the password is not valid
        if(!isValidPassword){
            throw new Error("Invalid login credentials please try again");
        }

         // create a token for the user using jsonwebtoken
         const token = jwt.sign({id: teacher._id, role: teacher.role}, "OjayKey", {expiresIn: "3d"});

         res.json({
            message: "User logged in successfully",
            token,
            teacher: {
                _id: teacher._id,
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email,
                role: teacher.role
            }
         })



    }),
    viewInfo: asyncHandler(async(req,res)=> {
        const teacher = await Teacher.findById(req.user).select("-password -__v -createdAt -updatedAt");
        if(!teacher){
            throw new Error("Teacher not found");
        }
        res.status(200).json(teacher);
    }),
    updateProfile: asyncHandler(async(req,res)=> {
        const {lastName, email,  phone, address, profileImage} = req.body
        const teacher = await Teacher.findById(req.user).select("-password");

        if(!teacher){
            throw new Error("teacher not found")
        }

        if(email && email !== teacher.email){
            const existingEmail = await Teacher.findOne({ email });
            if(existingEmail){
                throw new Error("Email Already assocoiated with another account")
            }
        }

       
        if(lastName) teacher.lastName = lastName;
        if(email) teacher.email = email;
        if(phone) teacher.phone = phone;
        if(address) teacher.address = address;
        if(profileImage) teacher.profileImage = profileImage;

        await teacher.save();

        res.status(200).json({
            message: "Teacher info updated successfully",
            teacher: {
                _id: teacher._id,
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email: teacher.email,
                phone: teacher.phone,
                address: teacher.address,
                profileImage: teacher.profileImage,
            }
        });
        
        


    }),
    listOfStudents: asyncHandler(async(req, res)=> {
        const levels = await  Level.find({teacher: req.user}).populate("student.studentId", "firstName lastName email address gender guardianInfo classId dateOfBirth");
        if (!levels || levels.length === 0) {
            throw new Error("Class info not found");
        }

        const allStudents = levels.flatMap(level => 
            level.student.map(student => ({
                studentId: student.studentId, 
                role: student.role             
            }))
        );

        res.status(200).json({
            students: allStudents
        })
    }),

    getStudentInfo: asyncHandler(async(req, res)=> {
        const {studentId} = req.params;
        if(!studentId){
            throw new Error("The student Id must be present")
        }

        const student = await Student.findById(studentId).select("-password");
        if(!student){
            throw new Error("student not found");
        }

        res.status(200).json({
            message: "Student info retieved succesfully",
            student
        })
    }),
}


module.exports = teacherUserController



