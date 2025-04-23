const express = require("express")
const teacherUserController = require("../../controllers/teachers/authCtrlTeachers")

const teacherRouter = express.Router()


teacherRouter.post(`/api/v1/teachers/login`, teacherUserController.login)


module.exports = teacherRouter