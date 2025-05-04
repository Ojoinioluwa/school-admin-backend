const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminUser"
    },
    eventTitle: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
    },
},
{timestamps:true}
)

module.exports = mongoose.model("Event", eventSchema)