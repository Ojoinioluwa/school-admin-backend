const express = require("express");
const schoolCalenderController = require("../../controllers/admin/schoolCalenderCtrl");

// TODO: ensure that only the admin has access to some of this methods such as create, delete and edit
const schoolCalenderRouter = express.Router()

// get school calender
schoolCalenderRouter.get("/api/v1/schoolCalender/all", schoolCalenderController.getEvents);





// ================== Admin Routes functionality =================== //
// TODO: ensure that only the admin has access to some of this methods such as create, delete and edit
// create an event 
schoolCalenderRouter.post("/api/v1/admin/schoolCalender/create", schoolCalenderController.createEvent)

// edit the event
schoolCalenderRouter.put("/api/v1/admin/schooolCalender/editEvent/:schoolCalenderId", schoolCalenderController.editEvent);

// delete the event 
schoolCalenderRouter.delete("/api/v1/admin/schooolCalender/deleteEvent/:schoolCalenderId", schoolCalenderController.deleteEvent);


module.exports = schoolCalenderRouter