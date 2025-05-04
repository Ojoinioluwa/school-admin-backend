const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    SubjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    teacherID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    deadline: {
        type: Date,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    title: {
        type: String,
        required: true,
    },
    task: {
        type: String,
    },
    taskDoc: {
        type: String,
    },
    active:{
            type: Boolean,
            required: true,
            default: true,
    },
    submittedStudents: [{
        studentID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },
        assignmentDoc: {
            type: String,
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
    }]


},
{
    timestamps: true
}
)


module.exports = mongoose.model("Assignment", assignmentSchema);
