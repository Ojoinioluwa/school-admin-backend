const express = require("express");
const taskController = require("../../controllers/taskCtrl");
const isAuthenticated = require("../../middlewares/isAuth");
const authorizeRoles = require("../../middlewares/authorizeRole");
const taskRouter = express.Router()

// get all or filter tasks for all users
taskRouter.get("/api/v1/tasks/getStudentTasks", taskController.filterStudentTask)
taskRouter.get("/api/v1/tasks/getTeacherTasks", taskController.filterTeacherTask)
taskRouter.get("/api/v1/tasks/getAdminTasks", taskController.filterAdminTask)

// delete task
taskRouter.delete("/api/v1/tasks/deleteTask/:taskId", taskController.deleteTask);

// update task
taskRouter.put("/api/v1/tasks/updateTask/:taskId", taskController.updateTask);

// create task for students
taskRouter.post("/api/v1/tasks/createStudentTask", taskController.addStudentTask);
// create task for teachers
taskRouter.post("/api/v1/tasks/createTeacherTask", taskController.addTeacherTask);
// create task for admin
taskRouter.post("/api/v1/tasks/createAdminTask", isAuthenticated, authorizeRoles("admin"),  taskController.addAdminTask);

module.exports = taskRouter
