const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const SchoolCalender = require("../../models/adminModels/SchoolCalender");

const schoolCalenderController = {
    createEvent: asyncHandler(async(req,res)=> {
        const {eventTitle, eventDesc, date} = req.body;
        if(!eventTitle || !eventDesc || !date){
            res.status(400);
            throw new Error("All fields are required to create events")
        }

        await SchoolCalender.create({
            eventDesc,
            eventTitle,
            date
        })
        res.status(200).json({
            message: "Evented Created Succesfully"
        })
    }),
    getEvent: asyncHandler(async(req,res)=> {
        const schoolCalender = await SchoolCalender.find().lean();
        if(schoolCalender.length === 0){
            throw new Error("Schoool calender is empty");
        }
        res.status(200).json({
            message: "School calender fetched Succesfully",
            schoolCalender
        })
    }),
    editEvent: asyncHandler(async(req,res)=> {
        const {eventTitle, eventDesc, date} = req.body;
        const {schoolCalenderId} = req.params;
        const event = await SchoolCalender.findById(schoolCalenderId);
        if(!event){
            res.status(400)
            throw new Error("Event does not exist")
        }
        if(eventTitle) event.eventTitle = eventTitle;
        if(eventDesc) event.eventDesc = eventDesc;
        if(date) event.date = date;
        await event.save()
        res.status(200).json({
            message: "School Calender editted successfully",
        })
    })
}