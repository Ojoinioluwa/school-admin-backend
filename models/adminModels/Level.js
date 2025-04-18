const mongoose = require(mongoose);


const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String, 
        required: true,
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
    ]
}, 
 {
    timestamps: true
 })


 module.exports = mongoose.model("Level", classSchema)

