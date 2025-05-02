const express = require("express");
const eventController = require("../../controllers/eventctrl");

const eventRouter = express.Router();

// create event routes for student, teacher and admin
eventRouter.post("/api/v1/student/event/create", eventController.createStudentEvent);
eventRouter.post("/api/v1/teacher/event/create", eventController.createTeacherEvent);
eventRouter.post("/api/v1/admin/event/create", eventController.createAdminEvent);



// get event routes for student, teacher and admin
eventRouter.get("/api/v1/student/event/get", eventController.getStudentEvent);
eventRouter.get("/api/v1/teacher/event/get", eventController.getTeacherEvent);
eventRouter.get("/api/v1/admin/event/get", eventController.getAdminEvents);
eventRouter.delete("/api/v1/student/event/delete/:eventId", eventController.deleteEvent);




