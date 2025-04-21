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
        updateTask: asyncHandler(async(req, res)=> {
            const {status, priority} = req.body
            const {taskId} = req.params
            const task = await Task.findById(taskId);
            if(status) task.status = status;
            if(priority) task.priority = priority

            await task.save();
            res.status(200).json({message: "Task updated successfully"})
        }),
        filterTask: asyncHandler(async(req, res)=> {
            const filters = {studentId: req.user};

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