const mongoose = require('mongoose');

const studentsAttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },

  classLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: true
  },

  date: {
    type: Date,
    required: true,
    default: Date.now
  },

  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'excused'],
    default: 'present'
  },

  recordedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },

  subject: {
    type: String,
    default: null
  },

  remarks: {
    type: String, 
    trim: true
  },

 },
 {
  timestamps: true
 }
);

attendanceSchema.index({ student: 1, date: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model("StudentAttendance", studentsAttendanceSchema);

