const mongoose = require("mongoose");

const teacherUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensuring uniqueness for email
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'], // Email validation regex
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
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
  staffId: {
    type: String,
    required: true,
    unique: true, // Ensure staff ID is unique
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  isClassTeacher: {
    type: Boolean,
    default: false,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0, // Ensure the years of experience is not negative
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "teacher",
    required: true,
  },
  subjectsAssigned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject", // Assuming you have a Subject model for better subject handling
  }],
  classesAssigned: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level", // Assuming you have a Class model for better class handling
  }],
  attendanceRecords: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendance", // Assuming you have an Attendance model
  }],
  qualifications: [{
    type: String, // Array of qualifications for the teacher
  }],
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  }
}, 
{
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Teacher", teacherUserSchema);
