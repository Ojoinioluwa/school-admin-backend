const mongoose = require("mongoose")

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    views: {
        type: Number,
        required: true,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Notice", noticeSchema)