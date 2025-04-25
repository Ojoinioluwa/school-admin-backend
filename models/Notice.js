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
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Notice", noticeSchema)