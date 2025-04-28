const mongoose = require("mongoose");

const teacherAnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Level"
    },
    date: {
        type: Date,
        defualt: Date.now,
        required: true
    },
    deadline: {
        type: Date
    }
}, {
    timestamps: true
})

// TODO: create annoucements by Course

module.exports = mongoose.model("TeacherAnnoucement", teacherAnnouncementSchema);