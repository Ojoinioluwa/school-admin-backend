const mongoose = require("mongoose");


const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Date, 
        required: true,
        default: Date.now
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }, 
    student: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            },
            role: {
                type: String,
                enum: ["captain", "assistant captain", "member"]
            }
        }
    ],
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    }
}, 
 {
    timestamps: true
 })

 levelSchema.index({departmentId: 1, name: 1, year: 1}, {unique: true})

 module.exports = mongoose.model("Level", levelSchema)

