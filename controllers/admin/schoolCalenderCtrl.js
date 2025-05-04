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
        const existingEvent = await SchoolCalender.findOne({eventTitle});
        if (existingEvent) {
            res.status(400);
            throw new Error("An event with the same title already exists on this date");
        }
        await SchoolCalender.create({
            eventDesc,
            eventTitle,
            date
        })
        res.status(201).json({ message: "Event created successfully" });

    }),
    getEvents: asyncHandler(async(req,res)=> {
        const events = await SchoolCalender.find().lean();
        if(events.length === 0){
            throw new Error("Schoool calender is empty");
        }
        res.status(200).json({
            message: "School calender fetched Succesfully",
            events
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
    }),
    deleteEvent: asyncHandler(async(req,res)=> {
        const {schoolCalenderId} = req.params
      const event =  await SchoolCalender.findByIdAndDelete(schoolCalenderId);
      if(!event){
        res.status(400)
        throw new Error("Event not found")
      }
      res.status(200).json({
        message: "Event Deleted Succesfully"
      })

    })
}


module.exports = schoolCalenderController