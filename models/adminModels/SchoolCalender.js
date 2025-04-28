const mongoose = require("mongoose");


const schoolCalenderSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    eventTitle: {
        type:String,
        required: true
    },
    eventDesc: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

schoolCalenderSchema.index({date: 1, eventTitle: 1}, {unique: true})
module.exports = mongoose.model("SchoolCalender", schoolCalenderSchema)