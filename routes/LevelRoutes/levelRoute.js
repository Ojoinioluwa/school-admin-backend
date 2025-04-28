const express = require("express")
const levelController = require("../../controllers/admin/LevelCtrl")

const levelRouter = express.Router()

levelRouter.get('/api/v1/admin/level/get', levelController.getAllLevelsForAdmin);


module.exports = levelRouter