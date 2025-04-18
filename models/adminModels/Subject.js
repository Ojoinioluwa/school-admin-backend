const mongoose = require("mongoose");



const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teachers: [{ 
        teacherId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Teacher"
            },
        teacherRole: {
            type: String,
            enum: ["Main Teacher", "Assistant Teacher"]
        }
    }],
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
    }
},
{
    timestamps: true
})

// this line of code to ensure that no two subject are the same
subjectSchema.index({ name: 1, year: 1 }, { unique: true });


module.exports = mongoose.model("Subject", subjectSchema);