const mongoose = require("mongoose");

const teacherAttendanceSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Excused", "Late"],
    required: true,
  },
  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
}, {
  timestamps: true,
  versionKey: false
});

teacherAttendanceSchema.index({ teacherId: 1,  date: 1 }, { unique: true });

module.exports = mongoose.model("TeacherAttendance", teacherAttendanceSchema);
