const mongoose = require("mongoose")


const teacherUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "teacher",
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    department: {
        type: String,
        required: true,
        enum: [
            "Mathematics",
            "English Language",
            "Science",
            "Social Studies",
            "Computer Science",
            "Physical and Health Education",
            "Religious Studies",
            "Agricultural Science",
            "Civic Education",
            "Business Studies",
            "Home Economics",
            "Arts and Crafts",
            "Technical Drawing",
            "Music",
            "French",
            "Literature in English",
            "Economics",
            "Geography",
            "Biology",
            "Physics",
            "Chemistry",
            "History",
            "Government",
            "Commerce",
            "Guidance and Counselling",
            "Special Education"
          ],
    },
    staffId: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true
    },
    isClassTeacher: {
        type: Boolean,
        default: false,
        enum: [true, false],
      },
    yearsOfExperience: {
    type: Number,
    require: true
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model("Teacher", teacherUserSchema)


// some of this are to be added at other times when needed
// {
//     subjectsAssigned: [subjectId], // or detailed objects
//     classesAssigned: [classId],
//     attendanceRecords: [attendanceId], // optional
//     qualifications,
//     createdAt,
//     updatedAt
//   }
  