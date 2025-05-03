const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler");
const Notice = require("../models/Notice");

const noticeController = {
    createNotice: asyncHandler(async(req,res)=> {
        const {title, description, date} = req.body;
        if(!title || !description || !date){
            res.status(400)
            throw new Error("All fields are required to create Notice");
        }
        const noticeExist = await Notice.findOne({$and: [{title}, {date}]})
        if(noticeExist){
            res.status(400)
            throw new Error("Notice already Exist");
        }
        await Notice.create({
            title,
            description,
            date,
            profileImage: req.file.path,
        })
        res.status(201).json({
            message: "Notice created Successfully",
        })
    }),
    editNotice: asyncHandler(async(req,res)=> {
        const {title, description, date} = req.body;
        const {noticeId} = req.params
        const notice = await Notice.findById(noticeId);
        if(!notice){
            res.status(400)
            throw new Error("Notice does not exist")
        }
        if(title) notice.title = title
        if(description) notice.description = description
        if(date) notice.date = date
        await notice.save()
        res.status(200).json({
            message: "Notice edited succesfully"
        })
    }),
    getAllNotice: asyncHandler(async(req,res)=> {
        const notices = await Notice.find({ date: { $gte: new Date() } }).sort({ date: 1 });
        if(notices.length === 0){
            res.status(400)
            throw new Error("Notice is empty please create")
        }
        res.status(200).json({
            message: "All Notices Fetched Successfully",
            notices
        })
    }),
    noticeInfo: asyncHandler(async(req, res)=> {
        const {noticeId}= req.params
        const notice = await Notice.findById(noticeId).lean()
        if(!notice){
            res.status(400)
            throw new Error("Notice does not exist");
        }
        res.status(200).json({
            message: "All Notices fetched Successfully",
            notice
        })
    }),
    deleteNotice: asyncHandler(async(req,res)=>{
        const {noticeId} = req.params;
        if(req.user.role !== admin){
            throw new Error("You are not authorized to delete this notice")
        }
        const notice = await Notice.findByIdAndDelete(noticeId);
        if(!notice){
            res.status(400)
            throw new Error("Notice does not exist")
        }
        res.status(200).json({
            message: "Notice deleted Successfully"
        })
    })
}

module.exports = noticeController