const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Assignment = require("../../models/Assignment");


const assignmentController = {
    create: asyncHandler(async(req,res)=> {
        const {title,deadline, task, taskDoc} = req.body;
        const {SubjectId} = req.params
        if(!title || !deadline || !task){
            throw new Error("Fill in the required fields to create an assignment");
        }
        if(!SubjectId){
            throw new Error("Need the subject to create the assignmnet");
        }
        await Assignment.create({
            title,
            task,
            deadline,
            taskDoc,
            teacherID: req.user,
            SubjectId,
        })

        res.json({
            message: "Assignment created successfully",
        })
    }),
    getCreatedAssignments: asyncHandler(async(req,res)=> {
        const assignments = await Assignment.find({teacherID: req.user})
        if(assignments.length === 0) {
            throw new Error("No assignments found");
        }
        res.status(200).json({
            message: "Assignment fetched succesfully",
            assignments
        })
    }),
    updateAssigment: asyncHandler(async(req, res)=> {
        const {assignmentId} = req.params
        const {title, deadline, task, taskDoc} = req.body
        const assignment = await Assignment.findById(assignmentId);
        if(!assignment) throw new Error("Assignment does not exist");
        if(title) assignment.title = title;
        if(deadline) assignment.deadline = deadline;
        if(task) assignment.task = task;
        if(taskDoc) assignment.taskDoc = taskDoc;
    

        await assignment.save()
        res.status(200).json({
            message: "Assignment updated successfully",
        })
        
    }),
    deleteAssignment: asyncHandler(async(req,res)=> {
        const {assignmentId} = req.params;
        const assignment = await Assignment.findByIdAndDelete(assignmentId);
        if(!assignment) throw new Error("assignment not found");

        res.status(200).json({
            message: "Assignment deleted successfully"
        })
    })
}

module.exports = assignmentController