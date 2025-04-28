const mongoose = require("mongoose");



// TODO: make changes to the subject or course controller based on the changes to the model
const subjectSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: [true, 'Course code is required'],
        unique: true,
        trim: true
      },
      courseTitle: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true
      },
      teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
    students: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },
        role: {
            type: String,
            enum: ["captain", "assistant captain", "member"]
        }
    }],
    year: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        enum: ['First', 'Second'],
        required: [true, 'Semester is required']
      },
      creditUnit: {
        type: Number,
        required: [true, 'Credit unit is required']
      },
      departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: [true, 'Department is required']
      },
      levelId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Level is required']
      },
    description: {
        type: String,
        required: true
    },
    material: {
        type:String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
      }
},
{
    timestamps: true
})

// this line of code to ensure that no two subject are the same
subjectSchema.index({ name: 1, year: 1 }, { unique: true });


module.exports = mongoose.model("Subject", subjectSchema);


