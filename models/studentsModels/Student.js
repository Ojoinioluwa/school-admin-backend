const mongoose = require("mongoose")

const guidianceSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["parent", "sponsor", "relative"]
    }
})



const studentUserSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: true,
        default: "student",
    },
    studentId: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    admissionDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    guardianInfo: [guidianceSchema],
    address: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
      },
    password: {
        type: String,
        require: true,
    }
      


}, 
{
    timestamps: true
}, 
)

module.exports = mongoose.model("Student", studentUserSchema)


