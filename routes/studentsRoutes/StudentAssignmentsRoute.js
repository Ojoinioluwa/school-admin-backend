const express = require('express');
const studAssRouter = express.Router();

const assignmentController = require('../../controllers/students/StudentAssignmentCtrl');
const authStudentController = require('../../controllers/students/authCtrlStudents');
const multer = require('multer');
const { storage } = require('../../utils/cloudinary');
const upload = multer({ storage });
