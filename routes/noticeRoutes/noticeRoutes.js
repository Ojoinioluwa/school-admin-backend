const express = require("express")
const noticeController = require("../../controllers/noticeCtrl")
const noticeRouter = express.Router()


// create notice
noticeRouter.post("/api/v1/notice/create", noticeController.createNotice);

// get all notice
noticeRouter.get("/api/v1/notice/get", noticeController.getAllNotice);


// notice info on the selected notice
noticeRouter.get("/api/v1/notice/info/:noticeId", noticeController.noticeInfo);

// edit notice
noticeRouter.get("/api/v1/notice/edit/:noticeId", noticeController.editNotice);


// ensure that only the admin can edit notice
//  delete notice
noticeRouter.delete("/api/v1/notice/delete", noticeController.deleteNotice);
