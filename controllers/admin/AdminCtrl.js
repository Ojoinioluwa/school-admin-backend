const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler");
const Student = require("../../models/studentsModels/Student");
const Teacher = require("../../models/teachersModels.js/Teacher");

const countGender = (array)=> {
    const count = {};
    array.forEach((arr)=> {
        count[arr.gender] = (count[arr.gender] || 0) + 1
    })

    return count

}

const adminController = {
    getCountsAndInfo: asyncHandler(async(req,res)=> {
         const students = await Student.find()
         const teachers = await Teacher.find()
         const numOfStudents = students.length
         const numOfTeachers = teachers.length
         const studentGender = countGender(students)
         const teacherGender = countGender(teachers)

         res.json({
            numOfStudents,
            numOfTeachers,
            studentGender,
            teacherGender,
         })
    })
}