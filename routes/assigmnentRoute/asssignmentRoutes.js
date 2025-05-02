const express = require("express");
const assignmentController = require("../../controllers/teachers/AssignmentCtrl");
const assRouter = express.Router();

// =========Teacher============
// create assignments teachers
assRouter.post("/api/v1/teachers/assignments/create", assignmentController.getCreatedAssignments)

// get created assignments teachers
assRouter.get("/api/v1/teachers/assignments/getCreatedAssignments", assignmentController.getCreatedAssignments);

// update assignments
assRouter.put("/api/v1/teachers/assignments/update/:assignmentId", assignmentController.updateAssigment);

// delete assignments
assRouter.delete("/api/v1/teachers/assignments/delete/:assignmentId", assignmentController.deleteAssignment)


// \================Student===========


assRouter.get("/api/v1/students/")


