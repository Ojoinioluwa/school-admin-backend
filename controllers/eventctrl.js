const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Event = require("../models/Event");

const eventController = {
    createEvent: asyncHandler(async(req,res)=> {
            const {eventTitle, eventDesc, date} = req.body;
            const {studentId, teacherId, adminId} = req.params
            if(!eventTitle || !eventDesc || !date){
                res.status(400);
                throw new Error("All fields are required to create events")
            }
            // filters out undefined/null
            const ids = [studentId, teacherId, adminId].filter(Boolean); 

            if (ids.length !== 1) {
                res.status(400);
                throw new Error("Exactly one of studentId, teacherId, or adminId must be provided");
            }
    
           const event =  await Event.create({
                eventDesc,
                eventTitle,
                date,
                studentId,
                adminId,
                teacherId
            })
            res.status(201).json({
                message: "Evented Created Succesfully",
                event
            })
        }),
        getStudentEvent: asyncHandler(async(req,res)=> {
            const events = await Event.find({studentId: req.user.id}).lean();
            if(events.length === 0){
                throw new Error("No events found");
            }
            res.status(200).json({
                message: "Events fecthed succesfully",
                events
            })
        }),
        getAdminEvents: asyncHandler(async(req,res)=> {
            const events = await Event.find({adminId: req.user.id}).lean();
            if(events.length === 0){
                throw new Error("No events found");
            }
            res.status(200).json({
                message: "Events fecthed succesfully",
                events
            })
        }),
        getTeacherEvent: asyncHandler(async(req,res)=> {
            const events = await Event.find({teacherId: req.user.id}).lean();
            if(events.length === 0){
                throw new Error("No events found");
            }
            res.status(200).json({
                message: "Events fecthed succesfully",
                events
            })
        }),
        editEvent: asyncHandler(async(req,res)=> {
            const {eventTitle, eventDesc, date} = req.body;
            const {eventId} = req.params;
            const event = await Event.findById(eventId);
            if(!event){
                res.status(400)
            }
            if(eventTitle) event.eventTitle = eventTitle;
            if(eventDesc) event.eventDesc = eventDesc;
            if(date) event.date = date;
            await event.save()
            res.status(200).json({
                message: "Event editted successfully",
            })
        })
}

module.exports = eventController


