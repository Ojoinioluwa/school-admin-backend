const mongoose = require("mongoose")


const adminUserSchema = new mongoose.Schema({
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
        default: "admin",
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
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
    password: {
        type: String,
        require: true,
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model("Admin", adminUserSchema)


  