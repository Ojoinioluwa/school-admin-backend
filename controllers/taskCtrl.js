const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

const taskController = {
    
       addStudentTask: asyncHandler(async(req,res)=> {
            const {title, description, status, priority,} = req.body
            if(!title || !description){
                throw new Error("Fill in the required fields to create task");
            }
            await Task.create({
                title,
                description,
                status,
                priority,
                studentId: req.user,
            })
            res.status(200).json({
                message: "Task Created Successfully"
            })
        }),
       addTeacherTask: asyncHandler(async(req,res)=> {
            const {title, description, status, priority,} = req.body
            if(!title || !description){
                throw new Error("Fill in the required fields to create task");
            }
            await Task.create({
                title,
                description,
                status,
                priority,
                teacherId: req.user.id,
            })
            res.status(200).json({
                message: "Task Created Successfully"
            })
        }),
        addAdminTask: asyncHandler(async(req,res)=> {
            const {title, description, status, priority,} = req.body
            if(!title || !description){
                throw new Error("Fill in the required fields to create task");
            }
            await Task.create({
                title,
                description,
                status,
                priority,
                adminId: req.user.id,
            })
            res.status(200).json({
                message: "Task Created Successfully"
            })
        }),
        updateTask: asyncHandler(async(req, res)=> {
            const {status, priority} = req.body
            const {taskId} = req.params
            const task = await Task.findById(taskId);
            if(status) task.status = status;
            if(priority) task.priority = priority

            await task.save();
            res.status(200).json({message: "Task updated successfully"})
        }),
        filterStudentTask: asyncHandler(async(req, res)=> {
            const { status, priority,} = req.body
            const filters = {studentId: req.user};

            if(status) filters.status = status;
            if(priority) filters.priority = priority;
            const tasks = await Task.find(filters)
            if(tasks.length === 0){
                res.status(400)
                throw new Error("No task Present yet")
            }
            res.status(200).json({
                message: "fetched all tasks successfully",
                tasks
            })


        }),
        filterTeacherTask: asyncHandler(async(req, res)=> {
            const { status, priority,} = req.body
            const filters = {teacherId: req.user, };

            if(status) filters.status = status;
            if(priority) filters.priority = priority;
            const tasks = await Task.find(filters)
            if(tasks.length === 0){
                res.status(400)
                throw new Error("No task Present yet")
            }
            res.status(200).json({
                message: "fetched all tasks successfully",
                tasks
            })


        }),
        filterAdminTask: asyncHandler(async(req, res)=> {
            const { status, priority,} = req.body
            const filters = {adminId: req.user, };

            if(status) filters.status = status;
            if(priority) filters.priority = priority;
            const tasks = await Task.find(filters)
            if(tasks.length === 0){
                res.status(400)
                throw new Error("No task Present yet")
            }
            res.status(200).json({
                message: "fetched all tasks successfully",
                tasks
            })


        }),
        deleteTask: asyncHandler(async(req,res)=> {
            const {taskId} = req.params;
            if(!taskId){
                throw new Error("Must select a task to be deleted");
            }
            await Task.findByIdAndDelete(taskId);
            res.json({
                message: "Task as been  delted successfully"
            })
        })
}

module.exports = taskController;