const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Subject = require("../../models/adminModels/Subject");
const TeachersAnnouncement = require("../../models/teachersModels.js/TeachersAnnouncement");



const teacherController = {
    getAssignedCourse: asyncHandler(async(req, res)=> {
        const assignedCourses = await Subject.find({teachers: {$elemMatch: {teacherId: req.user}}}).lean()
        if(assignedCourses.length === 0){
            res.status(404);
            throw new Error("No course assigned yet, consult with the admin")
        }
        res.status(200).json({
            message: "assigned courses Fetched successfully",
            assignedCourses
        })
    }), 
    makeAnnoucemnet: asyncHandler(async(req, res)=> {
        const {title, description, deadline} = req.body
        const {classId} = req.params
        if(!title || !description){
            throw new Error("Fill in required details")
        }
        await TeachersAnnouncement.create({
            title,
            description,
            sentBy: req.user,
            classId,
            deadline
        });

        res.status(200).json({
            message: "Annoucement sent successfully"
        })
    }),
    getCreatedAnnoucement: asyncHandler(async(req, res)=> {
        const {startDate, endDate, deadline} = req.body;
        const filters ={sentBy: req.user}
        if(startDate || endDate){
            filters.date = {}
            if(startDate) filters.date.$gte = new Date(startDate);
            if(endDate) filters.date.$lte = new Date(endDate);
        }
        if(deadline) filters.deadline = {$lte: new Date(deadline)}
        const annoucements = await TeachersAnnouncement.find(filters).sort({date: -1}).lean();

        if(annoucements.length === 0) {
            res.status(404)
            throw new Error("No created Announcement available");
        }
        res.status(200).json({
            message: "Fetched all created Announcement",
            annoucements
        })


    }),
    // TODO: create annoucements by course
    // TODO: 
    
}