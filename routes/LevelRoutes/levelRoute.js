const express = require("express")
const levelController = require("../../controllers/admin/LevelCtrl")

const levelRouter = express.Router()

levelRouter.get('/api/v1/admin/level/info/:levelId', levelController.leveinfo);
// levelRouter.get('/api/v1/admin/department/:departmentId/level/info/:levelId', levelController.getLevelsForDepartment);




// ================== Admin Routes functionality =================== //
// Levels logic
// create Level for a department
levelRouter.post("/api/v1/admin/department/:departmentId/createLevel", levelController.create);

// get Levels for the departments
levelRouter.get("/api/v1/admin/department/:departmentId/getLevels", levelController.getLevelsForDepartment);

// edit events
levelRouter.put("/api/v1/admin/department/:departmentId/level/:levelId", levelController.editLevel);

levelRouter.get('/api/v1/admin/level/getAllforAdmin', levelController.getAllLevelsForAdmin);


module.exports = levelRouter