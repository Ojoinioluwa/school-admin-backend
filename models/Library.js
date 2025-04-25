const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({}, {timestamps: true});

module.exports = mongoose.model("Library", librarySchema)