const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
      }

}, 

{timestamps: true})


module.exports = mongoose.model("Task", taskSchema);