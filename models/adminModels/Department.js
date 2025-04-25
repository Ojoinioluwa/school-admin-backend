const  mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    unique: true,
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Department code is required'],
    unique: true,
    uppercase: true
  },
  description: {
    type: String,
    required: true
  },
  headOfDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profileImage: {
    type: String,
    required: true,
  },
  Levels: [{levelId: {type: mongoose.Schema.Types.ObjectId, ref: "Level"}}]
});



module.exports =  mongoose.model('Department', departmentSchema);
