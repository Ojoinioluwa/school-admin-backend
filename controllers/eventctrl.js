const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Event = require("../models/Event");

// TODO: make changes to the pulling of events to ensure that only events that are to be done soon show up or do it in the frontend

const eventController = {
        createStudentEvent: asyncHandler(async(req,res)=> {
                const {eventTitle, eventDesc, date} = req.body;

                if(!eventTitle || !eventDesc || !date){
                    res.status(400);
                    throw new Error("All fields are required to create events")
                }
                // check if the events exist already
                const EventExist = await Event.findOne({eventTitle, eventDesc, date, studentId: req.user.id});
                if(EventExist){
                    res.status(400);
                    throw new Error("Event already exist")
                }
        
            const event =  await Event.create({
                    eventDesc,
                    eventTitle,
                    date,
                    studentId: req.user.id,
                    profileImage: req.file.path,
                })
                res.status(201).json({
                    message: "Evented Created Succesfully",
                    event
                })
        }),
        createTeacherEvent: asyncHandler(async(req,res)=> {
                const {eventTitle, eventDesc, date} = req.body;

                // check if the events exist already
                const EventExist = await Event.findOne({eventTitle, eventDesc, date, teacherId: req.user.id});
                if(EventExist){
                    res.status(400);
                    throw new Error("Event already exist")
                }

                if(!eventTitle || !eventDesc || !date){
                    res.status(400);
                    throw new Error("All fields are required to create events")
                }
                // filters out undefined/null
        
            const event =  await Event.create({
                    eventDesc,
                    eventTitle,
                    date,
                    teacherID: req.user.id,
                })

                res.status(201).json({
                    message: "Evented Created Succesfully",
                    event
                })
        }),
        createAdminEvent: asyncHandler(async(req,res)=> {
                const {eventTitle, eventDesc, date} = req.body;

                if(!eventTitle || !eventDesc || !date){
                    res.status(400);
                    throw new Error("All fields are required to create events")
                }
                // check if the events exist already
                const EventExist = await Event.findOne({eventTitle, eventDesc, date, adminId: req.user.id});    
                if(EventExist){
                    res.status(400);
                    throw new Error("Event already Exist")
                }
        
            const event =  await Event.create({
                    eventDesc,
                    eventTitle,
                    date,
                    studentId: req.user.id,
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
        }),
        deleteEvent: asyncHandler(async(req,res)=> {
            const {eventId} = req.params;
            const event = await Event.findById(eventId);
            if(!event){
                res.status(400)
            }   
            await event.remove()
            res.status(200).json({
                message: "Event deleted successfully",
            })  
        }),
}

module.exports = eventController


